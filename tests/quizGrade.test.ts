import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeQuiz, sanitizeCompleted, computeProgress } from "../lib/quizGrade";

const quiz = [
  { q: "a", options: ["x", "y", "z"], answer: 1 },
  { q: "b", options: ["x", "y"], answer: 0 },
  { q: "c", options: ["x", "y"], answer: 1 },
  { q: "d", options: ["x", "y"], answer: 1 },
];

test("grades correct and wrong answers", () => {
  const r = gradeQuiz(quiz, { 0: 1, 1: 0, 2: 1, 3: 0 })!;
  assert.equal(r.score, 75);
  assert.equal(r.passed, true);
  assert.deepEqual(r.results, [true, true, true, false]);
});
test("below the pass mark does not pass", () => {
  assert.equal(gradeQuiz(quiz, { 0: 0, 1: 1, 2: 0, 3: 0 })!.passed, false);
});
test("rejects missing, out of range and non-integer answers", () => {
  assert.equal(gradeQuiz(quiz, { 0: 1, 1: 0, 2: 1 }), null);
  assert.equal(gradeQuiz(quiz, { 0: 9, 1: 0, 2: 1, 3: 1 }), null);
  assert.equal(gradeQuiz(quiz, { 0: 1.5, 1: 0, 2: 1, 3: 1 }), null);
  assert.equal(gradeQuiz(quiz, { 0: "1", 1: 0, 2: 1, 3: 1 }), null);
  assert.equal(gradeQuiz(quiz, null), null);
  assert.equal(gradeQuiz([], {}), null);
});
test("sanitizeCompleted keeps only real keys", () => {
  const c = { modules: [{}, {}], materials: [{}], videos: [], practical: {} };
  assert.deepEqual(sanitizeCompleted([0, 1, 2, -1, "mats", "vids", "demo", "quiz", "x", 0], c), [0, 1, "mats"]);
});
test("progress cannot reach 100 without passing the quiz", () => {
  const c = { modules: [{}, {}], materials: [], videos: [], practical: {}, quiz };
  assert.equal(computeProgress(c, [0, 1], null), 67);
  assert.equal(computeProgress(c, [0, 1], 60), 67);
  assert.equal(computeProgress(c, [0, 1], 80), 100);
});
test("videos do not count towards progress", () => {
  const c = { modules: [{}], materials: [], videos: [{}], practical: {}, quiz: [] };
  assert.equal(computeProgress(c, ["vids"], null), 0);
  assert.equal(computeProgress(c, [0, "vids"], null), 100);
});
