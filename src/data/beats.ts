// The pinned split stage is one act. These windows are fractions of its
// progress (0..1); the markup turns them into engine cues and the controller
// reads the same numbers, so the copy and the divider can never disagree.
export const STAGE_SPAN = 7;

export const beats = {
  hero: [0, 0.075],
  don: [0.075, 0.23],
  hen: [0.23, 0.36],
  tien: [0.36, 0.49],
  ca: [0.49, 0.65],
  // The question stays up through the tear; the first stretch, before the
  // sheet moves, is the page's one authored silence.
  hush: [0.65, 0.885],
  tear: [0.695, 0.87],
  resolve: [0.87, 1],
} as const;

export type BeatId = keyof typeof beats;

// Engine cue string: "from to rampIn rampOut", ramps as fractions of the window.
export function cue(id: BeatId, rampIn = 0.15, rampOut = 0.15) {
  const [from, to] = beats[id];
  return `${from} ${to} ${rampIn} ${rampOut}`;
}

// Step `index` of `count` inside a beat: it arrives in its slot and stays
// until the beat itself fades, so the lines of a list accumulate.
export function stepHold(id: BeatId, index: number, count: number) {
  const [from, to] = beats[id];
  const width = (to - from) / count;
  const a = from + width * index * 0.72;
  const rampIn = Math.min(1, (width * 0.45) / (to - a));
  return `${a.toFixed(4)} ${to} ${index === 0 ? 0 : rampIn.toFixed(3)} 0`;
}
