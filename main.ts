// One-Liner Marathon — entry program (Node 22, stdlib only).
//
// Writes a single one-line comedy joke to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). The joke is a fixed, hand-written line:
// short, self-contained, with its punchline landing on the first read.
// The grader runs this program twice; both runs must produce the same
// file, so the output is fully deterministic — no randomness, no clock,
// no network, no environment input beyond the output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. 69 characters, one line, no trailing newline in the file.
const JOKE =
  "I told an AI my best joke and it laughed so hard it retrained itself.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // Gate sanity: the entry must be 1-280 characters, not only whitespace.
  if (JOKE.length < 1 || JOKE.length > 280 || JOKE.trim().length === 0) {
    throw new Error(`joke fails the gate: ${JOKE.length} characters`);
  }
  if (JOKE.includes("\n")) {
    throw new Error("joke must be a single line");
  }

  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
  // No trailing newline: the file is exactly the joke, byte for byte.
  console.log(`wrote ${JOKE.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
