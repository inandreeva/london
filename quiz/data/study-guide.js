/* Groups the question bank in questions.js into standalone quizzes. */
(function () {
  "use strict";

  var bank = window.QUESTION_BANK || [];

  /* The markdown files the bank was written from are no longer in the repo. */
  function pick(domains) {
    return bank
      .filter(function (q) { return domains.indexOf(q.domain) !== -1; })
      .map(function (q) {
        var copy = {};
        Object.keys(q).forEach(function (k) {
          if (k !== "source") copy[k] = q[k];
        });
        return copy;
      });
  }

  var quizzes = [
    {
      id: "model-selection",
      title: "Model Selection",
      subtitle: "Domain 2 — choose the right model or service",
      description: "LLM vs SLM vs multimodal vs purpose-built Azure AI service. Scenario reasoning based on requirement, scale, modality and latency.",
      domains: ["Domain 2 — Model Selection"]
    },
    {
      id: "model-selection-hard",
      title: "Model Selection — Hard Mode",
      subtitle: "Domain 2 — confusable near-miss distractors",
      description: "Intentionally designed to expose the subtle distinctions Microsoft likes to test. Do not look for the keyword alone.",
      domains: ["Domain 2 — Model Selection (Hard)"]
    },
    {
      id: "infra-design",
      title: "Infrastructure Design",
      subtitle: "Domain 1 — hubs, projects, networking, deployment",
      description: "Hub vs standalone projects, serverless vs provisioned throughput, private endpoints, managed identity and quota isolation.",
      domains: ["Domain 1 — Infrastructure Design"]
    },
    {
      id: "computer-vision",
      title: "Image & Video Workflows",
      subtitle: "Domain 3 — generation, editing, inpainting",
      description: "Text-to-image, reference-image generation, image-to-video, masked inpainting and outpainting decision signals.",
      domains: ["Domain 3 — Image & Video Generation", "Domain 3 — Image Editing"]
    }
  ];

  quizzes.forEach(function (q) {
    var questions = pick(q.domains);
    if (!questions.length) return;
    (window.AI103_QUIZZES = window.AI103_QUIZZES || []).push({
      id: q.id,
      title: q.title,
      subtitle: q.subtitle,
      description: q.description,
      questions: questions
    });
  });
})();
