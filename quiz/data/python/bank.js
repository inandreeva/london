/* Shared bank + helper for the Python coding quiz.
   PY(topic, code, prompt, options, answerIndex, explanation) */
window.PY_BANK = [];
window.PY = function (topic, code, prompt, options, answer, explanation) {
  window.PY_BANK.push({
    kind: "single",
    topic: topic,
    hint: code.replace(/^\n/, "").replace(/\s+$/, ""),
    code: true,
    prompt: prompt,
    options: options,
    answer: answer,
    explanation: explanation
  });
};
