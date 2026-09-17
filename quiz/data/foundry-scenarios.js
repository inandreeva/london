/* Quiz #2 — Microsoft Foundry scenario questions (Q1-Q50), exam-style mixed formats. */
(window.AI103_QUIZZES = window.AI103_QUIZZES || []).push({
  id: "foundry-scenarios",
  title: "Foundry Scenarios #2",
  subtitle: "50 exam-format scenario questions",
  description: "Agents, orchestration, Content Understanding, Speech, observability and safety. Mixed question formats: single answer, multiple answers, Yes/No statements and fill-in/matching.",
  source: "ai103_quiz2.html",
  questions: [
    {
      kind: "single",
      topic: "Speech & Audio",
      prompt: "You are building a speech processing solution in Microsoft Foundry for a customer support platform.\nThe platform will transcribe live phone calls, so that supervisors at your company can view call transcripts and detect issues while the calls are in progress. The call audio will arrive as a continuous stream from the telephony system.\nYou need to ensure that the call transcripts appear within only a few seconds of the audio stream.\nWhat should you do?",
      options: [
        "Use text to speech by using a custom neural voice.",
        "Use speech translation to generate the transcripts into multiple languages.",
        "Run a batch transcription job on recorded audio files.",
        "Use real-time speech to text to process streaming audio input."
      ],
      answer: 3,
      explanation: "Live streaming audio with a few seconds of delay requires real-time speech to text; batch transcription only works on completed recordings."
    },
    {
      kind: "single",
      topic: "Content Understanding",
      prompt: "You have a Microsoft Foundry project that contains an agent.\nThe agent ingests scanned PDF vendor invoices that contain tables and embedded QR codes.\nThe agent must preserve the PDF layout in the extracted output to ensure that downstream processing can reference sections and tables.\nYou plan to call Azure Content Understanding in Foundry Tools.\nYou need to extract content and layout elements and detect QR codes without requiring a language model deployment.\nWhich built-in analyzer should you use?",
      options: [
        "prebuilt-documentFieldSchema",
        "prebuilt-read",
        "prebuilt-documentSearch",
        "prebuilt-layout"
      ],
      answer: 3,
      explanation: "prebuilt-layout preserves structure (sections, tables, barcodes/QR) and needs no model deployment; prebuilt-read returns plain text only."
    },
    {
      kind: "match",
      topic: "Responsible AI & Safety",
      prompt: "You have a Microsoft Foundry project that contains an agent.\nThe agent accepts user-uploaded screenshots and uses a multimodal chat model. Some screenshots contain potentially malicious embedded text.\nYou need to prevent a prompt injection attack and ensure that third-party content is treated as lower trust.\nHow should you configure prompt shields for document attacks?",
      rows: [
        { label: "Prompt shields action:", answer: "Set action to block." },
        { label: "Additional mitigation:", answer: "Enable Spotlighting." }
      ],
      pool: ["Disable the shield.", "Set action to block.", "Set action to annotate.", "Enable Spotlighting.", "Create a custom blocklist.", "Use optical character recognition (OCR) to extract the text from the images first."],
      explanation: "Blocking stops the injection outright; Spotlighting marks third-party content so the model treats it as lower trust."
    },
    {
      kind: "single",
      topic: "Project Setup & Connections",
      prompt: "You are building a web app named App1 that generates responses by using a model deployed to a Microsoft Foundry project named Project1.\nBefore sending the prompts to the model, App1 must retrieve documents by using Azure AI Search. You need to integrate Project1 and App1.\nThe solution must meet the following requirements:\n• Multiple client applications must use the same search configuration.\n• A security policy must prevent key-based authentication.\n• Administrative effort must be minimized.\nWhat should you do?",
      options: [
        "Create a custom HTTP connection in Foundry and manually configure Azure AI Search endpoints per application.",
        "Configure an Azure AI Search connection in Project1 and reference the connection in each application.",
        "Call Azure AI Search directly from each application by using Microsoft Entra authentication.",
        "Enable a managed identity for each application and call Azure AI Search directly."
      ],
      answer: 1,
      explanation: "A project-level connection is defined once, reused by every client, supports Entra/keyless auth and minimizes admin effort."
    },
    {
      kind: "single",
      topic: "Observability",
      prompt: "You have a Microsoft Foundry project that contains a customer support agent. The agent calls an internal knowledge API tool before generating responses.\nUsers report the following issues:\n• Some requests take more than 15 seconds to complete.\n• Some responses are incorrect, even when the knowledge API returns the expected data.\nYou need to inspect individual agent runs to view the ordered sequence of large language model (LLM) calls, tool invocations, and timing information.\nWhich observability capability should you use?",
      options: ["token usage", "monitoring", "safety metrics", "tracing"],
      answer: 3,
      explanation: "Tracing is the only capability that shows the ordered span tree of LLM calls and tool invocations with timings for a single run."
    },
    {
      kind: "match",
      topic: "Agent Tools",
      prompt: "You have a Microsoft Foundry project that contains an agent used by the financial analysts at your company. You need to optimize the agent workflow by providing additional data access and processing capabilities.",
      hint: "Each tool may be used once, more than once, or not at all.",
      rows: [
        { label: "Access up-to-date information from public websites", answer: "Grounding with Bing Search" },
        { label: "Perform calculations during conversations", answer: "Code interpreter" },
        { label: "Retrieve information from documents uploaded directly to the agent", answer: "File search" }
      ],
      pool: ["Code interpreter", "Computer use", "File search", "Grounding with Bing Search", "Microsoft Fabric"],
      explanation: "Public web = Bing grounding; computation = code interpreter; user-uploaded documents = file search."
    },
    {
      kind: "single",
      topic: "Agent Tools",
      prompt: "You have a Microsoft Foundry project named Project1 that contains an agent. The agent uses an OpenAPI 3.0 specification to call an external weather service.\nThe weather service requires a key to be passed in an HTTP header. The key value is stored as a connection in Project1.\nYou need to ensure that the key value from the connection is included automatically whenever the OpenAPI tool is invoked.\nWhat should you configure in the OpenAPI specification?",
      options: [
        "a header parameter defined for each operation",
        "an Azure Key Vault connection",
        "an API key security scheme",
        "a Bearer token security scheme"
      ],
      answer: 2,
      explanation: "An apiKey security scheme lets Foundry inject the connection's key into the header automatically on every call."
    },
    {
      kind: "single",
      topic: "Agent Orchestration",
      prompt: "You have a Microsoft Foundry project that contains three agents: TriageAgent (classifies incoming customer requests), PolicyAgent (answers policy questions by searching internal content), and ActionAgent (creates or updates tickets by calling an HTTP API).\nYou need to orchestrate the agents to ensure that the customer requests meet the following requirements:\n• Support a deterministic, step-based process that uses conditional branching and shared state across the agents.\n• Optionally trigger a ticket action based on the triage result.\n• The solution must minimize development effort.\nWhat should you include in the solution?",
      options: [
        "a workflow",
        "threads and runs without a workflow",
        "a multi-agent group chat session",
        "separate agent runs coordinated in the application code"
      ],
      answer: 0,
      explanation: "Multi-Agent Workflows give deterministic steps, conditional branching and shared state declaratively — no custom coordination code."
    },
    {
      kind: "match",
      topic: "CI/CD & Evaluation",
      prompt: "You have a Microsoft Foundry project that contains a customer support agent. The agent is deployed by using a GitHub Actions workflow.\nThe organization has the following requirements:\n• Every deployment to the production environment must use the latest approved evaluation baseline.\n• Deployments must stop automatically if the current evaluation scores regress beyond the configured tolerance.\nHow should you configure the workflow?",
      rows: [
        { label: "Evaluation comparison:", answer: "Compare against the latest approved baseline" },
        { label: "If evaluation regression exceeds the configured tolerance:", answer: "Fail the workflow" }
      ],
      pool: ["Compare against the latest approved baseline", "Compare against the previous workflow run", "Compare against the production deployment logs", "Compare against the repository default branch", "Continue deployment and send an alert", "Fail the workflow", "Retry the evaluation automatically", "Lock the target branch"],
      explanation: "'Stop automatically' means the job must fail — alerting alone would let the regression ship."
    },
    {
      kind: "yesno",
      topic: "Observability",
      prompt: "Your company is piloting a customer support agent in a Microsoft Foundry project named Project1. Project1 is connected to an existing Application Insights resource, and the support team reviews runs in the Traces tab.\nThe Foundry Agent Service retrieves the Application Insights connection string by calling project_client.telemetry.get_application_insights_connection_string() and calls configure_azure_monitor(connection_string=...) to enable telemetry.\nA separate LangChain service is configured to use OpenTelemetry: it uses AzureAIOpenTelemetryTracer(connection_string=..., enable_content_recording=False) and passes the tracer by using config={\"callbacks\":[azure_tracer]}.\nCompany policy requires that telemetry from LangChain and OpenTelemetry must be distinguishable within the same Application Insights resource, and that secrets must NOT be stored in prompts, tool arguments, or span attributes.\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      statements: [
        { text: "The LangChain service will appear in Traces without configuring a tracer.", answer: false },
        { text: "Setting different OTEL_SERVICE_NAME values separates the services in Application Insights.", answer: true },
        { text: "When using enable_content_recording=False, prompts and tool data will be captured in the telemetry.", answer: false }
      ],
      explanation: "A tracer must be explicitly configured; OTEL_SERVICE_NAME distinguishes services; enable_content_recording=False deliberately suppresses prompt/tool content."
    },
    {
      kind: "single",
      topic: "Image Generation & Editing",
      prompt: "You have a Microsoft Foundry project that contains an agent and an image generation model deployment. The agent generates original images from user-supplied product photos.\nYou need to ensure that the generated images maintain the product identity and visual characteristics of the provided photo.\nWhat should you do?",
      options: [
        "Set the input_fidelity parameter to high.",
        "Apply a groundedness detection filter.",
        "Include a prompt and input image in the request.",
        "Decrease the value of the temperature parameter."
      ],
      answer: 0,
      explanation: "input_fidelity=high tells the image model to preserve the identity and visual characteristics of the supplied reference image."
    },
    {
      kind: "single",
      topic: "Agent Memory & Threads",
      prompt: "You are developing a travel planning agent by using Microsoft Foundry Agent Service.\nThe solution must meet the following requirements:\n• Remember each user's preferred airline and hotel chain across future conversations.\n• Ensure that payment card details are discarded after the conversation ends.\n• Minimize custom development.\nWhich implementation should you recommend?",
      options: [
        "Store both preferences and payment information in persistent agent memory.",
        "Store preferences in persistent agent memory and retain payment information only in orchestration-managed session context.",
        "Store both preferences and payment information in conversation history.",
        "Store payment information in Azure AI Search and preferences in session context."
      ],
      answer: 1,
      explanation: "Long-lived preferences belong in persistent memory; sensitive payment data must live only in session context so it is discarded."
    },
    {
      kind: "match",
      topic: "Agent Tools",
      prompt: "You have a Microsoft Foundry project that contains an agent. The agent uses tools to retrieve internal content and call external APIs. The agent is configured to let the model decide when to call the tools.\nYou need to publish the agent for a compliance workflow.\nThe solution must meet the following requirements:\n• Each workflow run must include a retrieval step before generating a response.\n• Tool calls must authenticate by using the published agent's own identity.\n• Tool access must use an identity isolated from other project resources.\n• Tool access must support audit tracing.\nWhat should you do?",
      rows: [
        { label: "Set tool_choice to:", answer: "required" },
        { label: "Configure the tool to authenticate by:", answer: "Using a distinct agent identity bound to the client application" }
      ],
      pool: ["auto", "none", "required", "Storing API keys in prompts", "Using the shared project agent identity", "Using a distinct agent identity bound to the client application"],
      explanation: "tool_choice=required guarantees the retrieval step runs; a distinct agent identity gives isolation plus auditable traces."
    },
    {
      kind: "single",
      topic: "RAG & Retrieval",
      prompt: "You have a chat app in a Microsoft Foundry project and an Azure AI Search vectorized index.\nYou need to connect to the index to meet the following requirements:\n• Complex questions must retrieve information from multiple chunks.\n• Multi-turn conversations must influence retrieval planning.\n• Retrievals must run in parallel to reduce latency.\nWhich retrieval approach should you use?",
      options: [
        "iterative retrieval",
        "agentic Retrieval Augmented Generation (RAG)",
        "chain of thought",
        "classic Retrieval Augmented Generation (RAG)"
      ],
      answer: 1,
      explanation: "Agentic RAG decomposes the question using conversation history and runs the resulting subqueries in parallel."
    },
    {
      kind: "single",
      topic: "Content Understanding",
      prompt: "You have a Microsoft Foundry project that contains an agent. The agent processes scanned employee identification cards from multiple countries.\nThe solution must meet the following requirements:\n• Extract structured fields such as employee ID, full name, and expiration date.\n• Return the extracted values as a structured schema instead of raw text.\n• Minimize custom post-processing.\nYou plan to call Azure Content Understanding in Foundry Tools.\nWhich built-in analyzer should you use?",
      options: [
        "prebuilt-layout",
        "prebuilt-documentSearch",
        "prebuilt-documentFieldSchema",
        "prebuilt-read"
      ],
      answer: 2,
      explanation: "prebuilt-documentFieldSchema returns named fields as a structured schema; layout/read return structure or text that still needs parsing."
    },
    {
      kind: "match",
      topic: "Agent Tools",
      prompt: "You have a Microsoft Foundry project that contains a deployed ticket-triage agent. You discover that sometimes the agent responds without calling any tools, even when a tool is required. You need to ensure that the agent calls a tool during execution.\nHow should you complete the Python code?",
      hint: 'run_payload = {"assistant_id": agent_id, ___: ___, "metadata": {"scenario": "ticket-triage"}}',
      code: true,
      rows: [
        { label: "Key to add to run_payload", answer: "tool_choice" },
        { label: "Value that forces the agent to call a tool", answer: "required" }
      ],
      pool: ["auto", "required", "response_format", "tool_choice", "tools", "type"],
      explanation: "tool_choice=\"required\" forces at least one tool call per run; auto leaves the decision to the model."
    },
    {
      kind: "single",
      topic: "Quotas & Reliability",
      prompt: "You have a customer support agent built by using the Microsoft Foundry Agent Service. The agent calls an Azure OpenAI model deployment.\nDuring load testing, calls intermittently fail and return an HTTP 429 rate limit exceeded error.\nYou need to handle throttling to reduce call failures and improve reliability under load. The solution must remain within the service and model limits.\nWhat should you do?",
      options: [
        "Create a new thread and retry the calls immediately.",
        "Reduce the number of registered tools.",
        "Implement a retry policy that uses exponential backoff and jitter.",
        "Split uploaded content into smaller files."
      ],
      answer: 2,
      explanation: "Exponential backoff with jitter is the standard 429 mitigation; immediate retries make throttling worse."
    },
    {
      kind: "single",
      topic: "Project Setup & Connections",
      prompt: "You are planning a Microsoft Foundry project named Project1 that will contain several prompt flow applications and agents.\nEach application must use the same Azure AI Foundry Model deployment hosted in another Azure resource.\nYou need to recommend a solution that enables all applications in Project1 to reuse the model configuration without duplicating connection settings.\nWhat should you recommend?",
      options: [
        "Create a connection to the model resource.",
        "Configure a managed private endpoint.",
        "Enable role-based access control (RBAC) on the model deployment.",
        "Configure diagnostic settings for the model deployment."
      ],
      answer: 0,
      explanation: "A connection centralizes endpoint and credential configuration so every app in the project reuses it."
    },
    {
      kind: "match",
      topic: "CI/CD & Evaluation",
      prompt: "You have a Microsoft Foundry project that contains an agent that answers questions by using Retrieval-Augmented Generation (RAG). A GitHub Actions workflow automatically deploys updates whenever a pull request is approved.\nThe organization has the following requirements:\n• Validate that responses remain grounded in the retrieved documents before deployment.\n• Prevent pull requests from being merged if the evaluation does not satisfy the required quality thresholds.\nHow should you configure the workflow?",
      rows: [
        { label: "Evaluation to execute:", answer: "Groundedness evaluation" },
        { label: "Pull request policy:", answer: "Require the evaluation workflow to succeed before merging" }
      ],
      pool: ["Groundedness evaluation", "Fluency evaluation", "Similarity evaluation", "Content Safety evaluation", "Require the evaluation workflow to succeed before merging", "Automatically rerun failed evaluations until they pass", "Notify reviewers when evaluations fail", "Allow the merge and run evaluations after deployment"],
      explanation: "Groundedness measures whether answers are supported by retrieved documents; a required status check blocks the merge."
    },
    {
      kind: "single",
      topic: "Image Generation & Editing",
      prompt: "You are creating an image-processing workflow in a Microsoft Foundry project. The workflow must meet the following requirements:\n• Generate multiple alternative versions of an existing product image for marketing campaigns.\n• Preserve the overall composition, lighting, and subject.\n• Use the built-in image generation capabilities without training a custom model.\nYou need to configure the workflow to generate several stylistic alternatives from the original image.\nHow should you configure the workflow?",
      options: [
        "Enable image_variation mode and provide the original image as the input.",
        "Enable mask_inpainting and provide a mask that covers the entire image.",
        "Enable text_to_image mode and describe the original image in the prompt.",
        "Enable image_to_image mode with the strength parameter set to 1.0."
      ],
      answer: 0,
      explanation: "image_variation produces alternates of a source image while keeping composition; strength 1.0 would discard the original."
    },
    {
      kind: "single",
      topic: "RAG & Retrieval",
      prompt: "You have a Microsoft Foundry project that contains an agent. The agent uses a knowledge source built from documents stored in Azure Blob Storage. The documents include digitally scanned PDFs that contain multipage tables.\nYou have an ingestion job that extracts only plain text, causing loss of table structure, headings, and page-number metadata. Users frequently ask questions that require the retrieval of specific table rows across the pages.\nYou need to configure an ingestion job for a Retrieval Augmented Generation (RAG) pipeline that performs optical character recognition (OCR) on scanned PDFs, preserves tables and headings as structure-aware chunks, and stores page-number metadata with each chunk.\nHow should you configure the ingestion job?",
      options: [
        "Use advanced data parsing to reingest the documents.",
        "Use OCR and page-level chunking.",
        "Use page-level OCR extraction and store each page as a single chunk.",
        "Use basic parsing and fixed-size chunking."
      ],
      answer: 0,
      explanation: "Advanced data parsing does OCR plus structure-aware chunking and retains page metadata; fixed-size or page chunks lose table structure."
    },
    {
      kind: "single",
      topic: "Agent Tools",
      prompt: "A Microsoft Foundry agent helps engineers troubleshoot production systems. The solution must meet the following requirements:\n• Download diagnostic logs from an internal web application that does not expose APIs.\n• Analyze the downloaded log files to identify performance bottlenecks.\nWhich combination of tools should you recommend?",
      options: [
        "Computer use and Code interpreter",
        "File search and Microsoft Fabric",
        "Grounding with Bing Search and Code interpreter",
        "Computer use and File search"
      ],
      answer: 0,
      explanation: "No API means the agent must drive the UI (computer use); analyzing the downloaded logs requires code execution."
    },
    {
      kind: "match",
      topic: "Observability",
      prompt: "You have a Microsoft Foundry project that contains an internal Q&A agent.\nUsers report the following issues when they ask the agent questions:\n• An increase in the following response: \"No relevant information found\"\n• Periodic HTTP 429 rate limit exceeded errors during peak hours\nYou need to identify whether each issue is caused by model unavailability, resource limits, or inference failures. What should you do?",
      rows: [
        { label: "Metrics to enable:", answer: "Model Availability Rate and Provisioned Utilization" },
        { label: "Diagnostic log to collect:", answer: "RequestResponse" }
      ],
      pool: ["Model Availability Rate and Provisioned Utilization", "Only Tokens Cache Match Rate", "Only Total Requests filtered to status code 200", "Time To Response and Total Tokens", "AllMetrics", "audit", "RequestResponse", "trace"],
      explanation: "Availability plus provisioned utilization separates outages from capacity limits; RequestResponse logs expose the failing inference calls."
    },
    {
      kind: "multi",
      topic: "Observability",
      pick: 2,
      prompt: "You have a Microsoft Foundry project that contains a prompt agent used by a customer support web app. The agent is invoked from a Python service that does NOT run in the Foundry portal.\nYou need to implement end-to-end tracing to capture latency breakdowns and exceptions across agent runs.\nWhich two components can you use?",
      options: [
        "a Log Analytics workspace",
        "Application Insights",
        "OpenTelemetry",
        "the Azure Monitor Agent",
        "Microsoft Sentinel"
      ],
      answers: [1, 2],
      explanation: "Foundry tracing is OpenTelemetry-based and exports spans to Application Insights; the other services are not tracing backends for agent runs."
    },
    {
      kind: "single",
      topic: "Agent Orchestration",
      prompt: "You have a Microsoft Foundry project that contains a customer support agent. The agent uses multiple tools during execution. Users report that responses are delayed because the agent waits for several independent tool calls to complete.\nYou need to reduce the overall response time. The solution must be implemented in the application logic.\nWhat should you do?",
      options: [
        "Execute independent tool calls in parallel before generating the response.",
        "Increase the maximum completion tokens.",
        "Replace the language model with a larger deployment.",
        "Enable persistent agent memory."
      ],
      answer: 0,
      explanation: "Independent tool calls have no ordering dependency, so running them concurrently removes the serial wait."
    },
    {
      kind: "match",
      topic: "Observability",
      prompt: "You have a Microsoft Foundry project that contains a customer support agent grounded in internal documentation. After a recent update, users report the following issues:\n• Some answers are unsupported by retrieved documents.\n• A small number of responses are flagged for policy violations.\nYou need to evaluate each issue. Which observability signals should you use for each issue?",
      rows: [
        { label: "Unsupported responses:", answer: "Groundedness evaluation metrics" },
        { label: "Policy violations:", answer: "Risk and safety metrics" }
      ],
      pool: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"],
      explanation: "Groundedness measures support from retrieved context; risk and safety metrics surface content policy violations."
    },
    {
      kind: "single",
      topic: "Image Generation & Editing",
      prompt: "You are creating an image-editing workflow in a Microsoft Foundry project. The workflow must meet the following requirements:\n• Ensure that background objects can be removed by applying a mask-based inpainting edit.\n• Preserve the original lighting and style of the edited images.\n• Use the built-in image editing controls, NOT a custom model.\nYou need to ensure that image edits apply exclusively inside the masked area.\nHow should you configure the workflow?",
      options: [
        "Set generation mode to image_variation and provide the original image as a reference.",
        "Enable text_to_image mode and a prompt describing the desired background removal.",
        "Enable image_to_image mode and a high-strength value to regenerate the full image based on the prompt.",
        "Enable mask_inpainting and supply both the input image and a mask indicating which part of the image to modify."
      ],
      answer: 3,
      explanation: "Only mask-based inpainting restricts regeneration to the masked region and leaves everything else untouched."
    },
    {
      kind: "single",
      topic: "RAG & Retrieval",
      prompt: "You have a Microsoft Foundry project that contains an agent. The agent uses Azure AI Search in Foundry Tools to retrieve documents from a search index.\nThe application returns an error indicating that the specified index cannot be found. You verify that the Azure AI Search service is reachable and authentication succeeds.\nYou need to configure the request to reference the correct search index.\nTo what should you set the index property?",
      options: [
        "The Azure AI Search service name",
        "The Azure AI Search endpoint URL",
        "The Azure AI Search index name",
        "The Microsoft Foundry project name"
      ],
      answer: 2,
      explanation: "The index property takes the index name; the service and endpoint are configured separately in the connection."
    },
    {
      kind: "match",
      topic: "Agent Memory & Threads",
      prompt: "You need to recommend a plan to create a customer support agent by using the Microsoft Foundry Agent Service. The agent must meet the following requirements:\n• Retain user preferences across multiple conversations.\n• Enable users to provide contextual grounding by directly uploading documents during a chat.\nWhich Foundry capability should you recommend for each requirement?",
      rows: [
        { label: "To retain user preferences across conversations, use:", answer: "Agent memory that uses persistent storage" },
        { label: "To enable users to provide contextual grounding during chats, use the:", answer: "File search tool" }
      ],
      pool: ["Agent memory that uses persistent storage", "Conversation history", "Orchestration-managed session context", "Azure AI Search tool", "Code interpreter tool", "File search tool"],
      explanation: "Cross-conversation state needs persistent memory; documents uploaded inside a chat are grounded through the file search tool."
    },
    {
      kind: "single",
      topic: "Image Generation & Editing",
      prompt: "You are developing an image-editing workflow in a Microsoft Foundry project.\nThe workflow must meet the following requirements:\n• Replace the sky in landscape photographs with a sunset.\n• Modify only the selected sky region.\n• Preserve all foreground objects without regeneration.\n• Use the built-in image editing capabilities.\nYou need to configure the workflow.\nHow should you configure the workflow?",
      options: [
        "Enable image_variation mode and provide the original image.",
        "Enable mask_inpainting and provide the original image together with a mask covering the sky.",
        "Enable text_to_image mode and describe the desired landscape.",
        "Enable image_to_image mode with a high-strength value."
      ],
      answer: 1,
      explanation: "A localized edit that must leave the foreground untouched is mask-based inpainting."
    },
    {
      kind: "single",
      topic: "Project Setup & Connections",
      prompt: "You are planning a Microsoft Foundry project named Project1 that will contain multiple agents. Each agent will access the same Azure AI Search resource.\nYou need to recommend a solution to centrally manage the Azure AI Search credentials within Project1. The solution must be implemented across all the agents.\nWhat should you recommend?",
      options: [
        "Enable role-based access control (RBAC) for the Azure AI Search resource.",
        "Disable key-based access control on the Azure AI Search resource.",
        "Add a connection to the Azure AI Search resource.",
        "Create a managed private endpoint that connects to the Azure AI Search resource."
      ],
      answer: 2,
      explanation: "A project connection is the central place where credentials are stored once and shared by all agents."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      prompt: "You are deploying a support agent that enables users to upload photos.\nYou need to automatically classify uploaded images for harmful content. The solution must block content based on severity levels.\nWhat should you do?",
      options: [
        "Apply keyword scanning to optical character recognition (OCR) output by using Azure Vision in Foundry Tools.",
        "Enable prompt shields.",
        "Use blocklists.",
        "Implement image moderation."
      ],
      answer: 3,
      explanation: "Content Safety image moderation classifies images into harm categories with severity levels that can be blocked."
    },
    {
      kind: "match",
      topic: "Agent Orchestration",
      prompt: "You have a Microsoft Foundry project that contains an agent named PaymentAgent.\nPaymentAgent includes a function tool that issues customer refunds by using an external API. You are creating a workflow in YAML.\nYou need to ensure that the workflow pauses for human approval and continues with the refund step only after approval is granted.\nHow should you complete the workflow definition?\n\nsteps:\n  - id: propose_refund\n    type: agent\n    agent: PaymentAgent\n\n  - id: approval\n    type: [Blank 1]\n\n  - id: execute_refund\n    type: agent\n    agent: PaymentAgent\n    condition: [Blank 2]",
      rows: [
        { label: "Blank 1 (type of the approval step):", answer: "ask_question" },
        { label: "Blank 2 (condition on execute_refund):", answer: 'approval == "approved"' }
      ],
      pool: ["ask_question", "basic_chat", "data_transformation", 'approval == "approved"', "propose_refund.output != null", "true"],
      explanation: "ask_question pauses the workflow for human input; the condition gates the refund on the approval result."
    },
    {
      kind: "single",
      topic: "Observability",
      prompt: "You have a Microsoft Foundry project that uses Azure AI Search to ground an agent in internal documentation. After a recent content update, users report that the agent's answers have become less accurate.\nYou need to identify whether the retrieved content is negatively influencing the model's generated responses.\nWhich observability signal should you review?",
      options: [
        "indexer status and failure history",
        "latency breakdown traces",
        "prediction drift metrics",
        "groundedness evaluation metrics"
      ],
      answer: 3,
      explanation: "Groundedness directly measures whether generated answers are supported by the retrieved content."
    },
    {
      kind: "single",
      topic: "RAG & Retrieval",
      prompt: "You have a Microsoft Foundry project that contains an agent used by a legal department. The agent generates answers by using documents retrieved from an Azure AI Search index.\nUsers report that some answers omit important clauses from lengthy legal documents.\nYou need to improve the completeness of responses. The solution must be implemented in the application logic without changing the search index or replacing the deployed model.\nWhat should you do?",
      options: [
        "Increase the number of retrieved document chunks before constructing the prompt.",
        "Enable Prompt Shields for document attacks.",
        "Configure Content Safety to annotate responses.",
        "Use a lower temperature value."
      ],
      answer: 0,
      explanation: "Missing clauses is a recall problem: retrieve more chunks (higher top-k) so the relevant passages reach the prompt."
    },
    {
      kind: "match",
      topic: "Content Understanding",
      prompt: "You have a Microsoft Foundry project that processes procurement documents submitted by suppliers.\nYou need to implement two pipelines by using Azure Content Understanding in Foundry Tools.\nThe solution must meet the following requirements:\n• Include a pipeline named Pipeline1 that supports cost-effective, high-volume processing of standalone PDF invoices.\n• Include a pipeline named Pipeline2 that supports cross-document validation by using multi-step reasoning and reference data.\nHow should you configure each pipeline?",
      hint: "Each configuration may be used once, more than once, or not at all.",
      rows: [
        { label: "Pipeline1:", answer: "Single-file task in standard mode" },
        { label: "Pipeline2:", answer: "Multi-file task in pro mode" }
      ],
      pool: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"],
      explanation: "Standard mode on single files is the cheap high-volume path; pro mode on multi-file tasks adds cross-document multi-step reasoning."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      noShuffle: true,
      prompt: "You have a multimodal AI generative model that accepts image uploads and uses extracted image text to generate responses.\nYou discover that users can upload unsafe images and embed hidden instructions into images to manipulate the model.\nYou need to implement controls to mitigate the risk.\n\nSolution: You configure a prompt shield for user prompts.\n\nDoes this meet the goal?",
      options: ["Yes", "No"],
      answer: 1,
      explanation: "A user-prompt shield inspects the user's direct text, not instructions hidden inside uploaded content."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      noShuffle: true,
      prompt: "You have a multimodal AI generative model that accepts image uploads and uses extracted image text to generate responses.\nYou discover that users can upload unsafe images and embed hidden instructions into images to manipulate the model.\nYou need to implement controls to mitigate the risk.\n\nSolution: You configure image moderation to block unsafe content before processing the images.\n\nDoes this meet the goal?",
      options: ["Yes", "No"],
      answer: 1,
      explanation: "Image moderation blocks harmful imagery but does not detect benign-looking images that carry hidden injected instructions."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      noShuffle: true,
      prompt: "You have a multimodal AI generative model that accepts image uploads and uses extracted image text to generate responses.\nYou discover that users can upload unsafe images and embed hidden instructions into images to manipulate the model.\nYou need to implement controls to mitigate the risk.\n\nSolution: You configure a prompt shield for documents.\n\nDoes this meet the goal?",
      options: ["Yes", "No"],
      answer: 0,
      explanation: "Uploaded content is third-party/document input, so the document prompt shield is the control that detects indirect injection."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      noShuffle: true,
      prompt: "You have a multimodal AI generative model that accepts image uploads and uses extracted image text to generate responses.\nYou discover that users can upload unsafe images and embed hidden instructions into images to manipulate the model.\nYou need to implement controls to mitigate the risk.\n\nSolution: You configure protected material detection.\n\nDoes this meet the goal?",
      options: ["Yes", "No"],
      answer: 1,
      explanation: "Protected material detection finds copyrighted content, which is unrelated to prompt injection."
    },
    {
      kind: "single",
      topic: "Content Understanding",
      prompt: "You have a Microsoft Foundry project that ingests scanned PDF invoices stored in Azure Blob Storage. Each invoice contains printed line items and has a table-based layout.\nExtracted results are stored as structured JSON and used as grounding data for an agent in a Retrieval Augmented Generation (RAG) solution.\nYou need to create a single analyzer that meets the following requirements:\n• Extracts the invoice number, invoice date, vendor name, and total amount across varying templates.\n• Returns confidence scores so that results with confidence below 0.80 can be routed for supervisor review.\nWhat should you use?",
      options: [
        "a Foundry agent that has groundedness guardrails enabled to extract invoice fields and confidence scores",
        "a custom Azure Content Understanding in Foundry Tools analyzer that defines the required fields as the extracted fields and returns confidence scores for routing",
        "the Azure Content Understanding in Foundry Tools prebuilt-layout analyzer",
        "the Azure Content Understanding in Foundry Tools prebuilt-documentSearch analyzer and search.score from the Azure AI Search results for routing"
      ],
      answer: 1,
      explanation: "A custom analyzer defines the exact field schema across varying templates and returns per-field confidence for review routing."
    },
    {
      kind: "single",
      topic: "Responsible AI & Safety",
      prompt: "A Microsoft Foundry agent retrieves content from external websites by using Grounding with Bing Search.\nSecurity administrators want to:\n• Detect indirect prompt injection attempts.\n• Review detections before deciding whether to block requests.\nWhich configuration should you recommend?",
      options: [
        "Disable Prompt Shields.",
        "Configure Prompt Shields to Block.",
        "Configure Prompt Shields to Annotate and enable Spotlighting.",
        "Configure Content Safety to Block Hate content."
      ],
      answer: 2,
      explanation: "'Review before blocking' means annotate rather than block; Spotlighting marks the untrusted external content."
    },
    {
      kind: "match",
      topic: "Agent Orchestration",
      prompt: "You have a Microsoft Foundry project that contains a workflow for a customer support triage process.\nYou have an Ask a question node that stores user responses in a local variable named Var01.\nYou need to create the following Power Fx expressions:\n• An if/else condition expression that ensures that Var01 contains a value.\n• A Send message expression that returns the stored user response in uppercase.\nHow should you configure the expressions?",
      rows: [
        { label: "If/else condition expression:", answer: "Not(IsBlank(Local.Var01))" },
        { label: "Send message expression:", answer: "{Upper(Local.Var01)}" }
      ],
      pool: ["IsBlank(Local.Var01)", "IsEmpty(Local.Var01)", "Not(IsBlank(Local.Var01))", "{Local.Var01}", "{Upper(Local.Var01)}", "{Upper(Var01)}"],
      explanation: "Not(IsBlank(...)) is true when a value exists; message expressions are wrapped in braces and must use the Local scope prefix."
    },
    {
      kind: "single",
      topic: "Agent Memory & Threads",
      prompt: "You have a customer support agent that uses the Microsoft Foundry Agent Service.\nSometimes, customers return to a session days later to continue the same support case, and the agent must resume with the full historical context.\nThe agent must provide the following:\n• Multi-turn continuity within the session and cross-session continuity for the same case.\n• Access to the full interaction history, including user messages, agent messages, tool calls, and tool outputs.\nYou need to ensure that the agent automatically reloads the complete history on each new turn.\nWhat should you do?",
      options: [
        "Create and reuse a conversation by storing the conversation's ID and supplying the ID on subsequent requests.",
        "Persist only the final model response stored in the client application and prepend the response to future prompts.",
        "Enable memory summarization on the agent definition to persist the context automatically."
      ],
      answer: 0,
      explanation: "The service already stores the full conversation; reusing its ID reloads every message, tool call and tool output automatically."
    },
    {
      kind: "single",
      topic: "Agent Memory & Threads",
      prompt: "You have a Microsoft Foundry Agent Service project that contains an HR onboarding agent. Employees frequently pause conversations and continue them several days later.\nThe solution must meet the following requirements:\n• Resume the conversation exactly where it ended.\n• Ensure that the agent can reference previous tool invocations and uploaded documents.\n• Avoid manually reconstructing conversation history.\nWhat should you do?",
      options: [
        "Create a new thread for each user request and copy previous responses into the prompt.",
        "Persist the thread ID and continue subsequent requests by using the existing thread.",
        "Store conversation summaries in persistent memory and start a new thread for every session.",
        "Save only the final assistant response and include it as context in future requests."
      ],
      answer: 1,
      explanation: "The thread holds the full state including tool invocations and uploaded files, so reusing its ID avoids manual reconstruction."
    },
    {
      kind: "match",
      topic: "Content Understanding",
      prompt: "You have a Microsoft Foundry project that processes regulatory compliance documents submitted by regional offices.\nYou need to implement two pipelines by using Content Understanding in Microsoft Foundry Tools.\nThe solution must meet the following requirements:\n• Include a pipeline named Pipeline1 that extracts key compliance information from individual audit reports while minimizing processing costs.\n• Include a pipeline named Pipeline2 that analyzes multiple related audit reports together to identify inconsistencies across reporting periods by using advanced reasoning.\nHow should you configure each pipeline?",
      hint: "Each configuration may be used once, more than once, or not at all.",
      rows: [
        { label: "Pipeline1:", answer: "Single-file task in standard mode" },
        { label: "Pipeline2:", answer: "Multi-file task in pro mode" }
      ],
      pool: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"],
      explanation: "Cost minimization on individual documents equals standard single-file; cross-document reasoning equals pro multi-file."
    },
    {
      kind: "single",
      topic: "Observability",
      prompt: "You have a Microsoft Foundry project that contains a high-traffic agent. After a recent update, operational costs increase significantly.\nMonitoring confirms that the volume of user traffic to the agent remains unchanged.\nYou suspect that changes to the request or response characteristics are causing the increase.\nYou need to identify whether the additional costs are driven by the model input size, the model output size, or expanded tool usage.\nWhich observability capability should you use?",
      options: ["latency", "evaluation metrics", "run success rate", "token usage"],
      answer: 3,
      explanation: "Token usage breaks cost down into prompt tokens, completion tokens and tool-related token consumption."
    },
    {
      kind: "single",
      topic: "Security & RBAC",
      prompt: "You have a Microsoft Foundry project that contains an Azure Storage account used to store documents for Retrieval-Augmented Generation (RAG).\nThe agents authenticate by using managed identities.\nThe agents must be able to read blob data but must not upload, modify, or delete files.\nWhich role-based access control (RBAC) role should you assign to the managed identities?",
      options: [
        "Storage Blob Data Owner",
        "Storage Blob Data Contributor",
        "Storage Blob Data Reader",
        "Contributor"
      ],
      answer: 2,
      explanation: "Least privilege for read-only blob access is Storage Blob Data Reader."
    },
    {
      kind: "match",
      topic: "CI/CD & Evaluation",
      prompt: "You have a Microsoft Foundry project that contains an agent. You use a GitHub Actions workflow for CI/CD.\nYou need to configure the workflow to automatically evaluate the agent when a pull request (PR) is created and prevent branches from merging if the evaluation results do NOT meet the defined thresholds.\nHow should you configure the workflow?",
      rows: [
        { label: "Authentication method:", answer: "An Azure Login action that uses OpenID Connect (OIDC)" },
        { label: "If the evaluation results are NOT met, configure the workflow to:", answer: "Fail" }
      ],
      pool: ["A personal access token (PAT)", "A user-assigned managed identity", "An Azure Login action that uses OpenID Connect (OIDC)", "Lock the target branch", "Send an alert", "Fail"],
      explanation: "OIDC federated credentials avoid stored secrets in GitHub Actions; a failing job blocks the merge through a required check."
    },
    {
      kind: "single",
      topic: "Speech & Audio",
      prompt: "You have a Microsoft Foundry project that contains an agent. The agent uses Azure Speech in Foundry Tools. You fine-tune a baseline speech to text model for the en-us locale and publish the model.\nThe agent calls the Speech to text REST API and returns an error message indicating that the project ID is invalid. You need to set the project property to the correct ID.\nTo what should you set the project property?",
      options: [
        "the project URL",
        "the custom speech project ID",
        "the project ID",
        "the custom speech endpoint URL"
      ],
      answer: 2,
      explanation: "The REST API expects the project ID value itself, not a URL or a differently named identifier."
    }
  ]
});
