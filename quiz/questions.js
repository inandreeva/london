/* AI-103 quiz question bank.
   Sourced from the markdown study material in this repository. */
window.QUESTION_BANK = [
  /* ---------- mock-tests/model-selection-quiz.md ---------- */
  {
    id: "ms-1",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A retail company wants an agent that reads product photos uploaded by customers and identifies visible defects. Which model type should be used?",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry code-interpreter tool"
    ],
    answer: 2,
    explanation: "The input is an image; no text-only model can process visual defect detection directly."
  },
  {
    id: "ms-2",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A manufacturing line needs real-time anomaly classification running on an edge device with no internet connectivity, using short structured sensor readings.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry file search tool"
    ],
    answer: 1,
    explanation: "On-device / offline plus a narrow, well-defined classification task equals SLM."
  },
  {
    id: "ms-3",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A legal team needs a solution that answers questions grounded in the latest public web content, with citations, and does not want to build a custom web-scraping/retrieval pipeline.",
    options: [
      "LLM alone",
      "SLM alone",
      "Multimodal model",
      "Foundry Bing grounding tool"
    ],
    answer: 3,
    explanation: "This is a pre-built Foundry Tool use case; do not hand-build web retrieval when the tool exists."
  },
  {
    id: "ms-4",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A support desk wants to summarize a 40-page policy document and answer open-ended, multi-step follow-up questions about it.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry computer-use tool"
    ],
    answer: 0,
    explanation: "Long-context synthesis and open-ended multi-step reasoning favors an LLM."
  },
  {
    id: "ms-5",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A cost-sensitive startup needs to tag thousands of short customer reviews per day as positive/negative/neutral, on a tight budget.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry grounding tool"
    ],
    answer: 1,
    explanation: "Narrow, high-volume, cost-constrained classification equals SLM."
  },
  {
    id: "ms-6",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "An agent must watch uploaded video clips and generate timestamped captions describing on-screen action.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry file search tool"
    ],
    answer: 2,
    explanation: "Video input requires multimodal capability."
  },
  {
    id: "ms-7",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A developer wants an agent that can write and execute Python code to solve a user's data analysis question, returning computed results.",
    options: [
      "LLM alone, prompted to 'pretend' to run code",
      "SLM",
      "Multimodal model",
      "Foundry code interpreter tool"
    ],
    answer: 3,
    explanation: "Actual code execution should use the managed Foundry code interpreter tool rather than relying on the model to simulate execution."
  },
  {
    id: "ms-8",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A scenario states the solution must run fully offline on a mobile device with strict latency under 200 ms, performing simple intent classification.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry Tool"
    ],
    answer: 1,
    explanation: "Offline plus strict latency plus a narrow task is the textbook SLM trigger, even though 'intent classification' sounds like it could use an LLM."
  },
  {
    id: "ms-9",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A scenario describes a task that is broad and ambiguous in scope, requiring the model to plan multiple steps, but includes no cost, latency, offline, or modality constraints.",
    options: [
      "LLM",
      "SLM",
      "Multimodal model",
      "Foundry Tool"
    ],
    answer: 0,
    explanation: "Absent any constraint, default to the model matching the reasoning complexity: LLM."
  },
  {
    id: "ms-10",
    domain: "Domain 2 — Model Selection",
    source: "mock-tests/model-selection-quiz.md",
    question: "A distractor option offers 'a more powerful LLM' for a task that requires reading a scanned image of a handwritten form. Why is this wrong?",
    options: [
      "LLMs are always more expensive than multimodal models",
      "Modality mismatch — no LLM reasoning capability substitutes for the ability to process image input",
      "Foundry Tools are always required for scanned documents",
      "SLMs are cheaper so they are always preferred"
    ],
    answer: 1,
    explanation: "This is the modality-mismatch trap: capability does not fix a model that cannot accept the input type at all."
  },

  /* ---------- mock-tests/infra-design-quiz.md ---------- */
  {
    id: "infra-1",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A company has five departments building separate AI agents. Leadership wants all departments to share the same Azure AI Search connection and the same compute pool, with central governance.",
    options: [
      "Five standalone Foundry projects",
      "One hub with five projects underneath",
      "One project shared by all five departments with no separation",
      "Five separate Foundry resources in different regions"
    ],
    answer: 1,
    explanation: "Shared connections/compute across teams with central governance is the textbook hub scenario."
  },
  {
    id: "infra-2",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A healthcare startup building a single, isolated clinical assistant app states the solution must never be publicly reachable from the internet.",
    options: [
      "Standalone project, public endpoint",
      "Standalone project, private endpoint / VNet injection",
      "Hub-based project, public endpoint by default",
      "Any project type, since networking does not affect reachability"
    ],
    answer: 1,
    explanation: "Single isolated app equals standalone project; 'must never be publicly reachable' equals private endpoint / VNet injection."
  },
  {
    id: "infra-3",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A retail company expects highly variable, bursty traffic on its new chatbot — heavy during sales events, near-zero overnight — and wants to avoid paying for unused reserved capacity.",
    options: [
      "Provisioned throughput",
      "Serverless / pay-per-token deployment",
      "On-premises deployment",
      "A dedicated hub for the chatbot alone"
    ],
    answer: 1,
    explanation: "Bursty/variable load with a cost-avoidance goal points to serverless, not reserved capacity."
  },
  {
    id: "infra-4",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A financial services company runs a production agent with steady, predictable high-volume traffic and needs guaranteed low-latency responses at a fixed monthly cost.",
    options: [
      "Serverless / pay-per-token deployment",
      "Provisioned throughput (reserved capacity)",
      "Standalone project with public endpoint",
      "No deployment needed — use the free tier"
    ],
    answer: 1,
    explanation: "Steady, predictable, high-volume traffic plus cost predictability is the reserved-capacity trigger."
  },
  {
    id: "infra-5",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A single small internal tool, built and owned by one team, needs its own dedicated quota so other teams' workloads cannot affect its performance.",
    options: [
      "Hub-based project sharing quota with other teams",
      "Standalone Foundry project",
      "A shared public endpoint with no isolation",
      "Multiple hubs for redundancy"
    ],
    answer: 1,
    explanation: "Single team plus isolated dedicated quota points to standalone."
  },
  {
    id: "infra-6",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A scenario states that connections to Azure AI Search and Bing grounding should be defined once and reused by multiple project teams without duplicating configuration.",
    options: [
      "Each team configures its own separate connection",
      "Connections are defined at the hub level and inherited by projects underneath",
      "Connections must be hardcoded into application code",
      "Connections are not reusable across projects"
    ],
    answer: 1,
    explanation: "Reusable, centrally defined connections shared across projects is a hub-level concern."
  },
  {
    id: "infra-7",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A company operating in a regulated industry must ensure AI workload data never traverses the public internet and must use identity-based access instead of stored secrets.",
    options: [
      "Public endpoint with API key authentication",
      "Private endpoint / VNet injection with managed identity and keyless credentials",
      "Public endpoint with managed identity only",
      "Private endpoint with hardcoded connection strings"
    ],
    answer: 1,
    explanation: "Both requirements together point to private networking plus managed identity / keyless credentials."
  },
  {
    id: "infra-8",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A scenario describes multiple teams that each want isolated budgets and quotas, but still want to share the same underlying compute infrastructure for cost efficiency.",
    options: [
      "Fully separate Foundry resources per team, no sharing at all",
      "Hub-based projects with per-project quota controls",
      "One project with no per-team separation",
      "Standalone projects with no relationship to each other"
    ],
    answer: 1,
    explanation: "Sharing infrastructure plus isolating cost/quota: hub-based projects support per-project quota while still sharing the underlying hub compute."
  },
  {
    id: "infra-9",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A startup is prototyping quickly, has no compliance requirements, and wants the fastest possible path to a working demo.",
    options: [
      "Private endpoint, provisioned throughput, hub-based project",
      "Public endpoint, serverless deployment, standalone project",
      "VNet injection required by default",
      "Multi-region hub deployment"
    ],
    answer: 1,
    explanation: "No stated constraints means default to the simplest/fastest option: public endpoint, serverless, standalone."
  },
  {
    id: "infra-10",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    trap: true,
    question: "EXAM TRAP: A scenario mentions both 'multiple departments will use this platform' and 'each department must have a strictly isolated budget with no shared quota whatsoever.'",
    options: [
      "Single hub, shared quota pool across all departments",
      "Standalone projects per department, but they can still share some centrally-governed connections via policy",
      "One shared project with manual cost tracking",
      "No infrastructure planning needed since departments are separate companies"
    ],
    answer: 1,
    explanation: "'Multiple departments' alone would suggest a hub, but 'strictly isolated budget, no shared quota' overrides that and points to standalone projects per department."
  },

  /* ---------- mock-tests/model-selection-quiz-hardmode.md ---------- */
  {
    id: "hard-1",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A retail company receives 500,000 product reviews per day. Each review must be assigned one of five predefined sentiment categories. The categories rarely change. The company requires very low latency and wants to minimize inference cost.",
    options: [
      "Large language model with few-shot prompting",
      "Small language model optimized for classification",
      "Multimodal language model",
      "Large language model with retrieval-augmented generation"
    ],
    answer: 1,
    explanation: "Fixed categories, high volume, low latency/cost priority equals SLM."
  },
  {
    id: "hard-2",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A legal application receives a 150-page contract. Users can ask arbitrary questions such as 'What obligations does the supplier have if delivery is delayed?' The application must provide detailed answers grounded in the contract.",
    options: [
      "Small language model performing classification",
      "Large language model combined with retrieval",
      "Azure AI Language sentiment analysis",
      "Azure AI Vision Image Analysis"
    ],
    answer: 1,
    explanation: "Open-ended grounded Q&A over long text equals LLM plus retrieval."
  },
  {
    id: "hard-3",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company needs to process scanned invoices from many different vendors and layouts, extracting vendor name, invoice number, date, line items, and totals.",
    options: [
      "Azure AI Language",
      "Azure AI Search",
      "Azure AI Document Intelligence",
      "Small language model"
    ],
    answer: 2,
    explanation: "Structured extraction from scanned / varied-layout documents is Document Intelligence's purpose-built job."
  },
  {
    id: "hard-4",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A customer-service app receives either text ('Why is my device not working?') or an image (photo of a damaged device: 'What's wrong with this?'). It must reason about both and generate a natural-language response.",
    options: [
      "Text-only LLM",
      "SLM",
      "Multimodal model",
      "Embedding model"
    ],
    answer: 2,
    explanation: "Mixed text/image input requires multimodal support."
  },
  {
    id: "hard-5",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company wants to summarize millions of short internal status messages (under 100 tokens each) into a fixed format with no complex reasoning required.",
    options: [
      "Large reasoning model",
      "Small language model",
      "Multimodal model",
      "Document Intelligence"
    ],
    answer: 1,
    explanation: "Short input, fixed format, high volume, low complexity equals SLM."
  },
  {
    id: "hard-6",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A RAG application must find documents semantically related to a user's question even when exact words do not match.",
    options: [
      "Speech recognition",
      "Embeddings and vector search",
      "Sentiment analysis",
      "OCR"
    ],
    answer: 1,
    explanation: "Semantic (meaning-based) matching is what embeddings plus vector search are for."
  },
  {
    id: "hard-7",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A hospital wants to analyze medical images and produce a natural-language description of findings for physician review.",
    options: [
      "Text-only SLM",
      "Multimodal model capable of image understanding",
      "Text embedding model",
      "Azure AI Language key phrase extraction"
    ],
    answer: 1,
    explanation: "Image input plus generated natural-language description equals multimodal model."
  },
  {
    id: "hard-8",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company has a fixed list of 20 document categories and classifies 10 million text-only documents per month. Accuracy matters more than explanations.",
    options: [
      "LLM with a large prompt",
      "Multimodal LLM",
      "SLM or specialized classification model",
      "Speech model"
    ],
    answer: 2,
    explanation: "Fixed categories, huge volume, no explanation needed equals SLM / classification model, not a general LLM."
  },
  {
    id: "hard-9",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A developer needs to convert customer phone conversations into text, which is then passed to an LLM.",
    options: [
      "Azure AI Language",
      "Azure AI Speech",
      "Azure AI Search",
      "Document Intelligence"
    ],
    answer: 1,
    explanation: "Audio-to-text conversion is Azure AI Speech's job, upstream of the LLM."
  },
  {
    id: "hard-10",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "An application must translate customer messages from Japanese to English in real time, with no reasoning or explanation needed.",
    options: [
      "LLM",
      "Azure AI Translator",
      "Multimodal LLM",
      "Azure AI Search"
    ],
    answer: 1,
    explanation: "Pure translation with no reasoning requirement is a purpose-built Translator task, not an LLM task."
  },
  {
    id: "hard-11",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company wants an AI assistant that understands a complex request, determines what information it needs, calls multiple tools, reasons over results, and generates a final response.",
    options: [
      "Simple SLM classifier",
      "Large language model with tool/function-calling capabilities",
      "OCR model",
      "Sentiment analysis model"
    ],
    answer: 1,
    explanation: "Multi-step planning, tool orchestration, and reasoning is core LLM agentic capability."
  },
  {
    id: "hard-12",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "An application receives a photo of a restaurant menu and the user asks 'Which dishes contain mushrooms?'",
    options: [
      "Text-only LLM",
      "Multimodal model",
      "SLM classifier",
      "Text embedding model"
    ],
    answer: 1,
    explanation: "Reading and reasoning over an image requires multimodal capability."
  },
  {
    id: "hard-13",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company wants to detect person names, locations, organizations, and dates in millions of customer messages, with no generated responses needed.",
    options: [
      "Large language model",
      "Azure AI Language named entity recognition",
      "Multimodal model",
      "Azure AI Speech"
    ],
    answer: 1,
    explanation: "Named entity recognition is a purpose-built Azure AI Language capability, not a generation task."
  },
  {
    id: "hard-14",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A developer needs to extract text characters from photos of street signs and product labels, with no need to understand meaning.",
    options: [
      "OCR",
      "LLM reasoning",
      "Sentiment analysis",
      "Embeddings"
    ],
    answer: 0,
    explanation: "Pure character extraction from images is OCR, not a reasoning task."
  },
  {
    id: "hard-15",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A startup is building a technical support chatbot. Users describe problems many different ways; the system must reason through troubleshooting and produce customized explanations. Traffic is low and answer quality is prioritized over cost.",
    options: [
      "SLM",
      "LLM",
      "Traditional classifier",
      "OCR model"
    ],
    answer: 1,
    explanation: "Open-ended reasoning, variable phrasing, and quality-over-cost priority all point to LLM."
  },
  {
    id: "hard-16",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A financial organization processes millions of documents and needs a yes/no check for whether each contains a specific known phrase.",
    options: [
      "Large language model",
      "Multimodal model",
      "Traditional text processing/search or lightweight model",
      "Large reasoning model with chain-of-thought prompting"
    ],
    answer: 2,
    explanation: "Exact-phrase matching at scale does not need reasoning at all; a lightweight / search-based approach is most cost-efficient."
  },
  {
    id: "hard-17",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A developer building an image Q&A app discovers the selected text-only model cannot accept image input.",
    options: [
      "Convert the image directly into an embedding and send it to the text-only model",
      "Select a multimodal model that supports image input",
      "Increase the model's context window",
      "Use a larger system prompt"
    ],
    answer: 1,
    explanation: "Modality-mismatch trap: no prompt or context-window trick fixes a model that cannot accept the input type."
  },
  {
    id: "hard-18",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A company wants to search 5 million internal documents and generate answers based on retrieved content.",
    options: [
      "LLM alone",
      "Azure AI Search + embeddings/vector or hybrid retrieval + LLM",
      "SLM alone",
      "Azure AI Speech + LLM"
    ],
    answer: 1,
    explanation: "Large-scale grounded retrieval-augmented generation needs the full search + retrieval + LLM stack."
  },
  {
    id: "hard-19",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    question: "A developer needs to determine whether text violates a company's content policy, using a specialized Azure AI capability rather than a general-purpose LLM judgment call.",
    options: [
      "Azure AI Content Safety",
      "Azure AI Speech",
      "Azure AI Search",
      "Azure AI Document Intelligence"
    ],
    answer: 0,
    explanation: "Content moderation has a dedicated, purpose-built service: Azure AI Content Safety."
  },
  {
    id: "hard-20",
    domain: "Domain 2 — Model Selection (Hard)",
    source: "mock-tests/model-selection-quiz-hardmode.md",
    trap: true,
    question: "EXAM TRAP: A company reads incoming customer emails and produces a structured JSON object (category, priority, customer_issue, recommended_action) from a fixed set of 8 categories and predefined actions. Millions of emails monthly; cost minimization and consistent output are priorities.",
    options: [
      "Use the largest available multimodal model for every email",
      "Use an SLM or specialized classification/extraction model with structured output",
      "Use OCR followed by a multimodal model",
      "Use Azure AI Speech followed by an LLM"
    ],
    answer: 1,
    explanation: "Fixed categories/actions, high volume, cost priority, consistent structured output equals SLM / specialized extraction model — not a large multimodal model ('bigger model' trap)."
  },

  /* ---------- topics/domain-2-generative-agentic/model-selection.md ---------- */
  {
    id: "topic-ms-1",
    domain: "Domain 2 — Model Selection",
    source: "topics/domain-2-generative-agentic/model-selection.md",
    question: "A chatbot must reason through complex customer issues and call multiple APIs to resolve them. Which model type fits best?",
    options: [
      "LLM with tool / function calling",
      "SLM classifier",
      "OCR model",
      "Text embedding model"
    ],
    answer: 0,
    explanation: "Complex reasoning plus agentic tool use equals LLM."
  },
  {
    id: "topic-ms-2",
    domain: "Domain 2 — Model Selection",
    source: "topics/domain-2-generative-agentic/model-selection.md",
    question: "Classify 10 million short customer messages into five predefined categories at minimal cost.",
    options: [
      "LLM with chain-of-thought prompting",
      "SLM",
      "Multimodal model",
      "Azure AI Speech"
    ],
    answer: 1,
    explanation: "Simple, repetitive, high-volume classification equals SLM."
  },
  {
    id: "topic-ms-3",
    domain: "Domain 2 — Model Selection",
    source: "topics/domain-2-generative-agentic/model-selection.md",
    question: "Analyze a photograph of a damaged product and explain the problem in natural language.",
    options: [
      "Text-only LLM",
      "SLM",
      "Multimodal model",
      "Embedding model"
    ],
    answer: 2,
    explanation: "The model needs to understand an image and generate text."
  },
  {
    id: "topic-ms-4",
    domain: "Domain 2 — Model Selection",
    source: "topics/domain-2-generative-agentic/model-selection.md",
    question: "Extract fields from thousands of standardized business documents.",
    options: [
      "A general-purpose LLM with a long prompt",
      "A specialized Foundry / Azure AI document-processing capability",
      "A text embedding model",
      "Azure AI Translator"
    ],
    answer: 1,
    explanation: "This is a specialized document-processing task rather than open-ended reasoning."
  },
  {
    id: "topic-ms-5",
    domain: "Domain 2 — Model Selection",
    source: "topics/domain-2-generative-agentic/model-selection.md",
    question: "An agent needs to understand a complex user request, retrieve company documentation, decide which tool to call, and explain the result.",
    options: [
      "A single SLM",
      "LLM + knowledge retrieval + tools",
      "OCR + Translator",
      "A multimodal model alone"
    ],
    answer: 1,
    explanation: "Model selection is not always one model — a production AI system may combine multiple capabilities."
  },

  /* ---------- topics/domain-3-computer-vision/image-editing-inpainting.md ---------- */
  {
    id: "vision-edit-1",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A user wants to remove a person from an existing photograph without changing the rest of the image.",
    options: [
      "Text-to-image generation",
      "Inpainting with a mask",
      "Outpainting",
      "Image-to-video generation"
    ],
    answer: 1,
    explanation: "Modifying only part of an existing image, with an exact region identified, equals inpainting with a mask."
  },
  {
    id: "vision-edit-2",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A user wants to replace the red car in an image with a blue electric vehicle.",
    options: [
      "Generate a brand-new image from text only",
      "Mask the car and provide an editing prompt",
      "Outpaint beyond the image boundaries",
      "Increase the model's context window"
    ],
    answer: 1,
    explanation: "MASK = where the change happens, PROMPT = what the change should be."
  },
  {
    id: "vision-edit-3",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A user wants to make an image wider by generating content beyond the original edges.",
    options: [
      "Inpainting with a mask",
      "Outpainting",
      "Text-to-video",
      "OCR"
    ],
    answer: 1,
    explanation: "Extending beyond the existing image boundaries is outpainting."
  },
  {
    id: "vision-edit-4",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A user wants to change the entire image from daytime to nighttime.",
    options: [
      "Mask-based inpainting of a single region",
      "A whole-image transformation / image-to-image generation workflow",
      "Outpainting",
      "Text-to-video generation"
    ],
    answer: 1,
    explanation: "The requested change affects the overall image, so it is not a mask-based inpainting problem."
  },

  /* ---------- topics/domain-3-computer-vision/image-video-generation.md ---------- */
  {
    id: "vision-gen-1",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A marketing team wants to create a completely new product image from a written description.",
    options: [
      "Text-to-image",
      "Reference-image generation",
      "Inpainting with a mask",
      "Image-to-video"
    ],
    answer: 0,
    explanation: "No source image exists — generation starts from text alone."
  },
  {
    id: "vision-gen-2",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A designer provides an existing product photograph and wants the model to create variations while maintaining the product's visual characteristics.",
    options: [
      "Text-to-image",
      "Reference-image generation",
      "Outpainting",
      "Text-to-video"
    ],
    answer: 1,
    explanation: "The reference image provides the starting visual context; the prompt specifies the transformation."
  },
  {
    id: "vision-gen-3",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A company wants to turn a still photograph into a short animated video.",
    options: [
      "Text-to-video",
      "Image-to-video",
      "Inpainting with a mask",
      "Reference-image generation"
    ],
    answer: 1,
    explanation: "An existing image is the input and video is the output: image-to-video."
  },
  {
    id: "vision-gen-4",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A developer wants to create a short video entirely from a natural-language description.",
    options: [
      "Image-to-video",
      "Text-to-video",
      "Outpainting",
      "Text-to-image"
    ],
    answer: 1,
    explanation: "No source media is supplied — the video is generated from text alone."
  },
  {
    id: "vision-gen-5",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A user wants to remove one object from an existing photograph while preserving the surrounding image.",
    options: [
      "Text-to-image",
      "Inpainting with a mask",
      "Outpainting",
      "Image-to-video"
    ],
    answer: 1,
    explanation: "Localized edit on an existing image with the region identified by a mask."
  }
];
