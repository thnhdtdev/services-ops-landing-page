"use client";

import { useEffect } from "react";
import { beats } from "@/data/beats";
import { pains } from "@/data/site";

type ScrollCraftApi = { destroy: () => void };
declare global {
  interface Window {
    ScrollCraft?: { mount: (root: string | Element) => ScrollCraftApi };
  }
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
// 0 before `a`, 1 after `b`, eased in between.
const ramp = (p: number, a: number, b: number) => smooth(clamp((p - a) / (b - a)));
const local = (p: number, id: keyof typeof beats) =>
  clamp((p - beats[id][0]) / (beats[id][1] - beats[id][0]));

// The divider's resting place after each fix. It tips toward the old way one
// step per pain, then the tear takes the old sheet off entirely.
const SPLIT_HERO = { narrow: 0.46, wide: 0.5 };
const SPLIT_STEPS = [0.37, 0.29, 0.21, 0.13];
const ROUNDS = ["don", "hen", "tien", "ca"] as const;

function splitAt(p: number, wide: boolean) {
  let split = wide ? SPLIT_HERO.wide : SPLIT_HERO.narrow;
  ROUNDS.forEach((id, i) => {
    const end = beats[id][1];
    const t = ramp(p, end - 0.035, end + 0.005);
    split += (SPLIT_STEPS[i] - split) * t;
  });
  return split;
}

/**
 * Mounts the scrollcraft engine on the page, then runs the one behaviour the
 * engine does not have: the receipt-edge divider that tips toward the old way
 * as each pain is solved, strikes the old line through, and finally tears the
 * old sheet off. Everything is written as CSS variables on the stage.
 */
export function StageController() {
  useEffect(() => {
    let api: ScrollCraftApi | undefined;
    let dead = false;
    import("@/vendor/scrollcraft.js").then(() => {
      if (!dead && window.ScrollCraft) api = window.ScrollCraft.mount("#trang");
    });

    const act = document.getElementById("tiem");
    const stage = act?.querySelector<HTMLElement>("[data-split-stage]");
    if (!act || !stage) return () => void (dead = true);

    const tracks = stage.querySelectorAll<HTMLElement>("[data-steps]");
    const pips = new Map(
      pains.map((pain) => [
        pain.id,
        stage.querySelector<HTMLElement>(`[data-pip="${pain.id}"]`),
      ]),
    );
    const wideMQ = matchMedia("(min-width: 860px)");
    const reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = "";
    const render = () => {
      frame = 0;
      const rect = act.getBoundingClientRect();
      const travel = Math.max(rect.height - innerHeight, 1);
      const p = clamp(-rect.top / travel);
      const wide = wideMQ.matches;

      const tear = ramp(p, beats.tear[0], beats.tear[1]);
      const resting = splitAt(p, wide);
      const split = resting * (1 - tear);
      // The sheet keeps its size while the layout under it collapses, so it
      // reads as being pulled away rather than squashed.
      const sheet = Math.max(resting, SPLIT_STEPS[3]);
      const resolve = ramp(p, beats.resolve[0], beats.resolve[0] + 0.07);

      let beat: string = "hero";
      (Object.keys(beats) as (keyof typeof beats)[]).forEach((id) => {
        if (p >= beats[id][0]) beat = id;
      });

      const vars: Record<string, string> = {
        "--split": split.toFixed(4),
        "--sheet": sheet.toFixed(4),
        "--tear": (reduceMQ.matches ? 0 : tear).toFixed(4),
        "--tear-fade": tear.toFixed(4),
        "--tear-gone": ramp(p, beats.tear[1] - 0.03, beats.tear[1]).toFixed(4),
        "--resolve": resolve.toFixed(4),
        "--hero": ramp(p, 0, beats.hero[1]).toFixed(4),
        "--tien": local(p, "tien").toFixed(4),
      };
      let done = 0;
      ROUNDS.forEach((id) => {
        const end = beats[id][1];
        const strike = ramp(p, end - 0.06, end - 0.02);
        vars[`--s-${id}`] = strike.toFixed(4);
        const solved = p >= end - 0.03;
        if (solved) done++;
        const pip = pips.get(id);
        pip?.toggleAttribute("data-done", solved);
        pip?.toggleAttribute("data-now", beat === id);
      });
      for (const [name, value] of Object.entries(vars))
        stage.style.setProperty(name, value);
      stage.dataset.beat = beat;

      // The order status track walks forward as the beat plays.
      let trackStep = "";
      tracks.forEach((track) => {
        const id = track.dataset.steps as keyof typeof beats;
        const items = track.children;
        const t = clamp((local(p, id) - 0.12) / 0.7);
        const now = Math.min(items.length - 1, Math.floor(t * items.length));
        trackStep += now;
        Array.from(items).forEach((item, index) =>
          item.setAttribute(
            "data-state",
            index < now ? "past" : index === now ? "now" : "next",
          ),
        );
      });


      // What actually paints, for the verification harness: the divider, the
      // solved count, the status track and the tear, rounded.
      const state = `${split.toFixed(3)}|${done}|${trackStep}|${tear.toFixed(2)}|${resolve.toFixed(2)}`;
      if (state !== last) {
        stage.setAttribute("data-sc-verify-state", state);
        last = state;
      }
      stage.toggleAttribute("data-sc-verify-hold", p >= beats.resolve[0] + 0.08);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    // The resolve screen is driven here, not by an engine cue, so keyboard
    // focus landing on its button has to bring the page to where it is lit.
    const onFocus = (event: FocusEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.("[data-resolve]")) return;
      const rect = act.getBoundingClientRect();
      const travel = Math.max(rect.height - innerHeight, 1);
      const want = beats.resolve[0] + 0.1;
      if (Math.abs(-rect.top / travel - want) < 0.03) return;
      scrollTo({ top: scrollY + rect.top + travel * want, behavior: "instant" });
    };
    render();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    wideMQ.addEventListener("change", schedule);
    addEventListener("focusin", onFocus);
    return () => {
      removeEventListener("focusin", onFocus);
      dead = true;
      api?.destroy();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      wideMQ.removeEventListener("change", schedule);
    };
  }, []);
  return null;
}
