# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| serviceops (2026-11-05) | Split stage (top/bottom on phone, left/right ≥860px) | No bar; the zigzag divider is the chrome, carrying four pain pips that tick | 50/50 split: typographic "vở ô ly" old side vs real-screenshot hero with two depth planes | 1 pinned act (span 8) with 7 internal beats: split hero, sequence flip, reveal, parallax pair, 4-step cue chain, kinetic hush, tear; then 3 flow sections; ~11.4vh total | Divider collapses (old sheet torn off), full-width resolve screen, then a ticket form whose choices compose the Zalo/trial message | Receipt-edge divider tips toward the old way per solved pain, red-pen strikes the old line, then the sheet tears off | Real app screenshots on white + exercise-book paper; Be Vietnam Pro; #075EE5 | Next.js 16 app router (engine vendored in src/vendor) |
| serviceops v2 (2026-11-05, supersedes the row above before shipping; app screenshots removed at the owner's request) | Split stage (same as above) | Same zigzag divider with four pain pips | 50/50 split: "vở ô ly" old side vs two layered paper laundry tickets (empty boxes) | 1 pinned act (span 7) with 7 beats: split hero, status-track sequence, ink reveal, parallax ticket pair, 4-line cue chain, kinetic hush, tear + printed ticket; then 3 flow sections; ~10vh on a phone | Torn-off sheet, a ticket printed with four ticks, then the sign-up ticket that composes the Zalo/trial message | Same divider move, plus the resolve ticket printing out | Paper only: exercise book vs laundry tickets in real markup; no photography; Be Vietnam Pro; #075EE5 | Next.js 16 app router |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Split stage with a torn-sheet collapse** (serviceops). A later split stage needs a different collapse.
- **Pain pips on the divider** as the progress readout (serviceops).
- **Closing ticket that composes the outbound message** from on-page choices (serviceops).
- Act shape "one long pin holding every beat, then flow" at ~10–11.4vh (serviceops, v2).
- **Paper-object world**: exercise book against laundry tickets as the only imagery (serviceops v2).

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
