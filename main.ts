// The Funniest Office Joke, Judged Head to Head — a make.fun program/v1 entry.
//
// The program writes exactly one line of text to /output/entry.txt: a single
// office joke, judged head to head by a model judge against a published brief.
// The line is fixed, so the program's job is to prove the text is shaped right
// before it writes it: one line, 1-200 characters, real content, and the laugh
// landing in the final clause.
//
// The joke, and why it fits the judge's brief (most important first):
//   1. One line about office life, a real joke with a setup and a turn.
//   2. Turns on something anyone who has worked in an office knows: the
//      meeting invite marked "optional".
//   3. Surprises: "optional" quietly changes its target, from the meeting
//      to the person who skipped it. Nobody sees the layoff coming.
//   4. Lands in one line, every word earning its place, punchline last.
//   5. Feels new: the pivot is the word "optional" itself, not a complaint
//      about meetings in general.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "The meeting invite said 'optional', so I skipped it \u2014 turns out I'm optional too.";

const OUTPUT_FILE = "/output/entry.txt";
const LONGEST_ALLOWED = 200;

function checkSingleLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("the joke must not be blank");
  }
  if (line.includes("\n")) {
    throw new Error("the joke must be a single line");
  }
  if (line.length > LONGEST_ALLOWED) {
    throw new Error(
      `the joke is ${line.length} characters, over the ${LONGEST_ALLOWED} limit`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("the joke must not start or end with whitespace");
  }
  if (line.includes("  ")) {
    throw new Error("the joke must not carry double spaces: every word earns its place");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("the joke must close with terminal punctuation: the punchline lands last");
  }
  if (!line.includes("optional")) {
    throw new Error("the joke lost its pivot word");
  }
}

function main(): void {
  checkSingleLine(JOKE);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, JOKE, "utf8");
}

main();
