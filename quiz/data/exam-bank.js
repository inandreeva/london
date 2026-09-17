/* Quiz #3 — questions transcribed from the supplied AI-103 practice PDFs
   (ExamTopics Topic 1, the practice-questions compilation and the pass4success demo).
   Items that already appear in data/foundry-scenarios.js were left out. */
(function () {
  "use strict";

  var CONTOSO = [
    "CASE STUDY — Contoso, Ltd",
    "Contoso is a multinational retailer that builds, deploys and manages generative AI and agent-based solutions by using Microsoft Foundry. Contoso uses Microsoft Entra ID for identity. The Agent1Dev Team optimizes and maintains AI solutions; the Agent1Test Team validates solutions before deployment.",
    "",
    "Generative environment — the Foundry deployment contains Project1 and Project2.",
    "• Project1 contains a customer support agent named Agent1. Agent1 uses a base model deployment. A safety evaluation pipeline is NOT enabled, tool invocation approval workflows are NOT enabled and conversation memory constraints are NOT configured. Agent1 answers general questions about Contoso products. Project1 is deployed to an Azure region located in the European Union (EU).",
    "• Project2 contains a deployed video generation model used by the marketing department. Development of the solution is incomplete.",
    "",
    "Data environment — an Azure Blob Storage account named storage1 stores the product detail sheets for all Contoso products as PDFs (specifications, feature descriptions and support information).",
    "",
    "Problem statements",
    "• Agent1 has only general knowledge of the Contoso products and does NOT use the detailed product sheets in storage1.",
    "• A recent chat interaction with Agent1 was analyzed for sentiment; the results have NOT been processed.",
    "• Finance must review vendor invoices manually to confirm they match the vendor contract terms. The invoices contain tables, logos and varied layouts that make them difficult to process consistently.",
    "",
    "Technical requirements",
    "• The model deployment used by Agent1 must support scalable, high-throughput generative AI workloads and dynamically scale to handle variable customer support traffic, without requiring reserved throughput capacity.",
    "• The product sheets must be processed by an indexing pipeline that enables semantic and vector search.",
    "• Responses generated from the product sheet information must be relevant, complete and accurate.",
    "• Agent1 must answer natural language questions about product details by using the product sheets.",
    "• The model version used by Agent1 must remain consistent to ensure stable responses.",
    "• The data processed by the model must remain within the EU.",
    "",
    "Security and compliance requirements",
    "• API keys must NOT be used to access Foundry-deployed models.",
    "• Access to Azure resources must follow the principle of least privilege.",
    "• Developers must authenticate to Microsoft Foundry resources by using Microsoft Entra authentication.",
    "• Access to Project1 is assigned to Agent1Dev Team via SC_Agent1_Dev and to Agent1Test Team via SC_Agent1_Test.",
    "• Agent1 must never reveal customer information, even if a document containing customer data is added to storage1 erroneously.",
    "• The product sheets might contain images with embedded text. Agent1 must be protected from malicious instructions hidden within the images.",
    "",
    "Business requirements",
    "• Users must have a personalized experience in future interactions, including retained conversation context and recall of previous interactions.",
    "• Agent1 must answer questions only about the products sold by Contoso."
  ].join("\n");

  (window.AI103_QUIZZES = window.AI103_QUIZZES || []).push({
    id: "exam-bank",
    title: "Case Study & Exam Bank #3",
    subtitle: "20 questions from AI-103 practice PDFs",
    description: "The Contoso, Ltd case study plus standalone exam items on deployments, RBAC, SDK code, evaluation, indexing and cost control. Includes HOTSPOT/DRAG-DROP items reworked as fill-in questions.",
    source: "AI-103 practice PDFs",
    questions: [
      {
        kind: "match",
        topic: "Model Deployment",
        context: CONTOSO,
        prompt: "You need to configure the model deployment for Agent1 to meet the technical requirements.\nWhat should you configure?",
        rows: [
          { label: "Deployment type:", answer: "Standard" },
          { label: "Version update policy:", answer: "Opt out of automatic model version upgrades" }
        ],
        pool: [
          "Standard",
          "Global Standard",
          "Global Provisioned",
          "Once the current version expires",
          "Opt out of automatic model version upgrades",
          "Upgrade once a new default version becomes available"
        ],
        explanation: "'Without requiring reserved throughput capacity' rules out Global Provisioned, and 'the data processed by the model must remain within the EU' rules out Global Standard, whose traffic can be routed to any region — leaving the regional Standard (pay-as-you-go) deployment. 'The model version must remain consistent' means opting out of automatic version upgrades."
      },
      {
        kind: "match",
        topic: "SDK & Authentication",
        prompt: "You have a Python application named App1 that integrates with a Microsoft Foundry project named Project1.\nApp1 must authenticate by using a Microsoft Entra managed identity and send prompts to a deployed model by using the Azure OpenAI Responses API.\nHow should you complete the Python code?",
        hint: [
          "from azure.identity import DefaultAzureCredential",
          "from azure.ai.projects import AIProjectClient",
          "",
          "credential = [BLANK 1]()",
          "project_client = AIProjectClient(",
          '    endpoint="https://contosoai.services.ai.azure.com/api/projects/project1",',
          "    credential=credential,",
          ")",
          "with project_client.get_openai_client() as openai_client:",
          "    response = openai_client.responses.[BLANK 2](",
          '        model="trail-guide-chat",',
          '        input="Create a 3-day hiking itinerary near Seattle.",',
          "    )",
          "    print(response.output_text)"
        ].join("\n"),
        code: true,
        rows: [
          { label: "Blank 1 — credential class:", answer: "DefaultAzureCredential" },
          { label: "Blank 2 — Responses API method:", answer: "create" }
        ],
        pool: ["AzureKeyCredential", "ClientSecretCredential", "DefaultAzureCredential", "compact", "create", "retrieve"],
        explanation: "DefaultAzureCredential picks up the managed identity without storing secrets; the Responses API generates a new response with responses.create()."
      },
      {
        kind: "match",
        topic: "Responsible AI & Safety",
        prompt: "You have a Microsoft Foundry project that contains a customer support agent built by using the Foundry Agent Service.\nThe agent uploads user-provided screenshots to Azure Storage through a ticketing tool and receives a blob URL for additional reasoning.\nYou need to use image moderation during agent runs and prevent harmful content from being returned during runs. Azure AI Content Safety must access the images by using the blob URL. The solution must follow the principle of least privilege.\nWhat should you configure for Content Safety?",
        rows: [
          { label: "Guardrails:", answer: "Select User input, Output, Tool response, and Tool call and set Action to Block." },
          { label: "Storage access:", answer: "A system-assigned managed identity that is assigned the Storage Blob Data Reader role" }
        ],
        pool: [
          "Select Tool call and set Action to Block.",
          "Select User input and Output and set Action to Annotate.",
          "Select User input and Tool response and set Action to Annotate.",
          "Select User input, Output, Tool response, and Tool call and set Action to Block.",
          "Storage account access keys",
          "A user-assigned identity that is assigned the Storage Queue Data Contributor role",
          "A system-assigned managed identity that is assigned the Storage Blob Data Reader role",
          "A system-assigned managed identity that is assigned the Storage Blob Data Contributor role"
        ],
        explanation: "Harmful content must be stopped, not just annotated, and it can enter on any surface of the run — user input, tool call, tool response and output. Content Safety only needs to read the blobs, so Storage Blob Data Reader with a managed identity is the least-privilege keyless option."
      },
      {
        kind: "single",
        topic: "Speech & Audio",
        prompt: "You have an Azure Speech in Foundry Tools resource that hosts a custom speech to text model deployed to a custom endpoint. An agent uses the endpoint to perform real-time speech recognition.\nYou are approaching the expiration date of the custom speech to text model.\nWhat is the expected behavior when the model expires?",
        options: [
          "The custom model will be deleted automatically when the model expires.",
          "Speech recognition requests will fall back to the most recent base model for the same locale.",
          "Speech recognition requests will continue to use the expired custom model until the model is removed manually.",
          "Speech recognition requests will return a 4xx error until a new custom model is deployed."
        ],
        answer: 1,
        explanation: "Real-time custom endpoints degrade gracefully: once the custom model's lifecycle ends, requests are served by the latest base model for that locale instead of failing."
      },
      {
        kind: "single",
        topic: "Security & RBAC",
        prompt: "You have a Microsoft Foundry project that contains a model deployment.\nYou have an application that calls the deployment by using the Azure OpenAI v1 API and DefaultAzureCredential.\nThe developers receive HTTP 403 errors when they send inference requests, even after running az login.\nYou need to ensure that the developers can perform model inference. The solution must follow the principle of least privilege.\nWhich role-based access control (RBAC) role should you assign to the developers?",
        options: [
          "Cognitive Services User",
          "Cognitive Services OpenAI User",
          "Contributor",
          "Cognitive Services Data Reader"
        ],
        answer: 1,
        explanation: "Cognitive Services OpenAI User grants data-plane inference rights on Azure OpenAI deployments and nothing more; Contributor is management-plane and far broader."
      },
      {
        kind: "single",
        topic: "Agent Tools",
        prompt: "You have a Microsoft Foundry project that contains an agent. The agent has a Model Context Protocol (MCP) tool that queries a knowledge base stored in Azure AI Search.\nSome agent runs return answers from the base model without invoking the knowledge base, which results in responses without grounded citations.\nThe agent is started with:\n\nrun = project_client.agents.runs.create_and_process(\n    thread_id=thread.id,\n    agent_id=agent.id\n)\n\nYou need to add the correct tool_choice parameter to deterministically force the agent to invoke the MCP tool on each run.\nWhat should you add?",
        options: [
          'tool_choice={"required"}',
          'tool_choice={"auto"}',
          'tool_choice={"type":"knowledge_base"}',
          'tool_choice={"type":"mcp"}'
        ],
        answer: 3,
        explanation: "Naming the tool type in the tool_choice object forces that specific tool on every run; 'auto' leaves it to the model and the other values are not valid tool_choice objects."
      },
      {
        kind: "single",
        topic: "Cost & Performance",
        prompt: "You have a Microsoft Foundry project that serves a high-volume chat app.\nMost requests are simple FAQs, but some require advanced reasoning.\nYou need to reduce costs and latency for common queries, without degrading the quality of the responses to complex questions.\nWhat should you do?",
        options: [
          "Route all the requests to a smaller model.",
          "Use a model cascade that routes the requests to different models.",
          "Increase the value of the max_tokens parameter for all the requests.",
          "Route all the requests to the most capable model."
        ],
        answer: 1,
        explanation: "A cascade sends cheap FAQ traffic to a small model and escalates only the hard requests to a larger one, so cost drops without hurting complex answers."
      },
      {
        kind: "single",
        topic: "Agent Tools",
        prompt: "You have a Microsoft Foundry project named Project1 that contains an OpenAPI tool calling an external API, and a project connection named Connection1 that stores the API key of that external API.\nWhen an agent calls the OpenAPI tool, the API returns a 401 unauthorized error, and traces show that the API key header is NOT being sent.\nYou need to ensure that the OpenAPI tool automatically includes the API key from Connection1 on all requests.\nWhat should you do?",
        options: [
          "Enable identity passthrough so that the tool uses the Microsoft Entra token of the caller.",
          "Add the API key header manually to the OpenAPI specification.",
          "Configure the tool to use the default connection of Project1.",
          "Connect the tool to Connection1."
        ],
        answer: 3,
        explanation: "A stored connection is only injected once the tool is explicitly bound to it; the runtime then adds the authentication header on every call."
      },
      {
        kind: "single",
        topic: "Evaluation",
        context: CONTOSO,
        prompt: "You need to recommend a solution to assess the responses generated by Agent1 when the agent uses the product information stored in storage1. The solution must meet the technical requirements.\nWhat should you include in the recommendation?",
        options: [
          "a Retrieval Augmented Generation (RAG) evaluator",
          "a custom guardrail",
          "model fine-tuning",
          "a groundedness evaluator"
        ],
        answer: 0,
        explanation: "The requirement covers relevance, completeness and accuracy together. The RAG evaluator group measures all of them (retrieval, relevance, response completeness and groundedness), whereas a groundedness evaluator alone only checks support from the retrieved content."
      },
      {
        kind: "single",
        topic: "Prompt Engineering",
        context: CONTOSO,
        prompt: "You need to configure Agent1 to answer customer questions about only the Contoso products. The solution must meet the business requirements.\nWhat should you do?",
        options: [
          "Modify the system message instructions.",
          "Add few-shot examples.",
          "Apply top-p sampling.",
          "Increase the value of the temperature parameter."
        ],
        answer: 0,
        explanation: "Scope and refusal behavior are a behavioral boundary, which belongs in the highest-priority system instructions. Top-p and temperature only control randomness, and few-shot examples are weaker than an explicit instruction."
      },
      {
        kind: "single",
        topic: "Model Selection",
        prompt: "You have a Microsoft Foundry project. You plan to build a customer support solution that contains an agent. The solution must meet the following requirements:\n• Provide accurate, context-aware responses grounded in internal product documentation stored in Azure AI Search.\n• Require deep, multi-step reasoning across long contexts.\n• Generate detailed natural language responses.\nWhich type of model should you use to power the agent?",
        options: [
          "a multimodal model",
          "a small language model (SLM)",
          "a key phrase extraction model",
          "a large language model (LLM)"
        ],
        answer: 3,
        explanation: "Deep multi-step reasoning over long contexts with detailed generated prose is exactly what an LLM provides; the input is text-only, so multimodal adds nothing."
      },
      {
        kind: "multi",
        topic: "RAG & Indexing",
        pick: 2,
        prompt: "You are developing an autonomous customer support agent using Microsoft Foundry.\nThe agent must answer customer inquiries based on internal product documentation while strictly preventing indirect prompt injection attacks and ensuring the model does not generate answers outside the provided data scope.\nWhich two actions should you perform? (Each correct answer presents part of the solution.)",
        options: [
          "Implement Prompt Shield in Azure AI Content Safety to detect malicious user inputs.",
          "Configure a Groundedness detection policy in Azure AI Content Safety to evaluate model outputs against the context dataset.",
          "Use Azure AI Search to build a vector and keyword hybrid index of the internal documentation for data retrieval.",
          "Deploy an Azure API Management gateway with rate-limiting policies directly in front of the model endpoint.",
          "Configure Role-Based Access Control (RBAC) using the Contributor role for user authentication to the agent."
        ],
        answers: [1, 2],
        explanation: "A RAG pattern needs a hybrid (vector plus keyword) Azure AI Search index for retrieval, and a groundedness detection policy to validate outputs against the context dataset so the model cannot answer outside that scope. Rate limiting and Contributor RBAC address neither goal."
      },
      {
        kind: "single",
        topic: "Speech & Audio",
        prompt: "You have an application named App1 that uses Azure Speech in Foundry Tools to transcribe live calls.\nTranscript segments often contain both English and Spanish. App1 sends each segment to Azure Translator in Foundry Tools to translate to another language.\nSometimes, mixed-language segments result in incomplete or incorrect translations.\nYou need to reduce translation errors. The solution must ensure that the entire transcript is translated successfully.\nWhat should you do before sending the segments to Translator?",
        options: [
          "Use document translation to translate the entire transcript as a single document.",
          "Enable automatic language detection for the translation request.",
          "Split the mixed-language segments into single-language segments and translate each segment separately.",
          "Specify English as the source language in the translation request for all the segments."
        ],
        answer: 2,
        explanation: "Translation quality drops when two languages are interleaved in one chunk. Auto-detect picks a single language per request, so it still drops the other one — splitting into pure single-language segments keeps the whole transcript translatable."
      },
      {
        kind: "single",
        topic: "Prompt Engineering",
        prompt: "You have a Microsoft Foundry project that contains an agent. The agent generates summaries from retrieved policy documents.\nYou need to improve response completeness. The solution must be implemented in the logic of the application code before responses are returned.\nWhat should you do?",
        options: [
          "Add a reflection pass before the responses are returned.",
          "Decrease the value of the max_tokens parameter.",
          "Decrease the value of the temperature parameter.",
          "Switch to Retrieval Augmented Generation (RAG)."
        ],
        answer: 0,
        explanation: "A reflection pass makes the app critique its own draft against the source documents and fill in gaps before returning it. Lowering max_tokens would truncate more, and the agent is already retrieving documents."
      },
      {
        kind: "single",
        topic: "Agent Memory",
        prompt: "You have a Microsoft Foundry project that contains an agent. You need to enable long-term memory so the agent can recall user preferences across separate conversations. Stored memories must be isolated per authenticated user without the client application manually generating user IDs.\n\nmemory_tool = MemorySearchTool(\n    memory_store_name=mem_store_name,\n    scope=[BLANK]\n)\n\nWhat should you set the scope parameter to?",
        options: [
          '"{{$userId}}"',
          '"global"',
          '"{{$threadId}}"',
          "a user ID string generated by the client application"
        ],
        answer: 0,
        explanation: "The {{$userId}} template macro is resolved by the runtime from the authenticated principal, so memories are sandboxed per user without the client inventing IDs. A thread scope would not survive across conversations."
      },
      {
        kind: "single",
        topic: "RAG & Indexing",
        prompt: "You have a Microsoft Foundry project that contains an agent. The agent uses Azure AI Search as the retriever. You plan to ingest PDFs into an Azure AI Search index so the agent can ground responses in text from both documents and embedded images. Users require citations that link to the source files.\nYou need to ensure that during indexing, the images are extracted into a structure that can be used as input for the built-in optical character recognition (OCR) skill.\nWhich indexing approach should you use?",
        options: [
          "the outputFieldMappings parameter to write image data to a searchable field",
          "a skillset to run the OCR skill directly against the content field of the index",
          "a Shaper skill to restructure the OCR input",
          "an indexer to extract image data into a normalized_images collection"
        ],
        answer: 3,
        explanation: "Document cracking in the indexer (imageAction / generateNormalizedImages) produces the normalized_images collection, which is the required input for the OCR skill. The OCR skill cannot read the content field directly."
      },
      {
        kind: "single",
        topic: "Evaluation",
        prompt: "You have a Microsoft Foundry project that contains an agent. You need to enable evaluation of the agent using a chat conversation. The solution must minimize the effort required to collect data and run evaluations automatically.\nWhich type of evaluation should you use?",
        options: ["continuous", "manual", "batch", "policy"],
        answer: 0,
        explanation: "Continuous evaluation samples live production conversations and scores them automatically, so no dataset has to be assembled and no run has to be triggered by hand."
      },
      {
        kind: "match",
        topic: "SDK & Authentication",
        context: CONTOSO,
        prompt: "You need to ensure that Agent1Dev Team can access Agent1. The solution must meet the security and compliance requirements.\nHow should you complete the Python code?",
        hint: [
          "from azure.identity import DefaultAzureCredential",
          "from azure.ai.projects import AIProjectClient",
          "from azure.core.credentials import AzureKeyCredential",
          "",
          'myEndpoint = "https://contoso.services.ai.azure.com/api/projects/project1"',
          "project_client = AIProjectClient(",
          "    endpoint=myEndpoint,",
          "    credential=[BLANK 1],",
          ")",
          'myAgent = "Agent1"',
          "agent = project_client.agents.[BLANK 2](agent_name=myAgent)",
          'print(f"Retrieved agent: {agent.name}")'
        ].join("\n"),
        code: true,
        rows: [
          { label: "Blank 1 — credential:", answer: "DefaultAzureCredential()" },
          { label: "Blank 2 — agent operation:", answer: "get" }
        ],
        pool: ["AzureKeyCredential()", "DefaultAzureCredential()", "None", "create_version", "get", "get_version"],
        explanation: "API keys are forbidden and developers must use Microsoft Entra authentication, so DefaultAzureCredential() is the only valid credential. The task is to retrieve an existing agent by name, which is get() — not creating or fetching a specific version."
      },
      {
        kind: "single",
        topic: "Content Understanding",
        context: CONTOSO,
        prompt: "You need to recommend an invoice review solution that resolves the issue reported by the finance department.\nWhat should you include in the recommendation?",
        options: [
          "Azure Content Understanding in Foundry Tools",
          "chat completions",
          "Azure Document Intelligence in Foundry Tools",
          "Image Analysis"
        ],
        answer: 0,
        explanation: "The planned change requires evaluating both the visual layout and the textual content of invoices with tables, logos and varied layouts. Content Understanding is the multimodal Foundry Tool that turns such content into structured output; Image Analysis only returns visual features and chat completions cannot reliably extract fields."
      },
      {
        kind: "single",
        topic: "RAG & Indexing",
        context: CONTOSO,
        prompt: "You need to recommend a solution to support the planned changes and technical requirements for Agent1 to use the product information stored in storage1.\nWhat should you include in the recommendation?",
        options: [
          "Azure AI Search",
          "Azure Translator in Foundry Tools",
          "Azure Document Intelligence in Foundry Tools",
          "Grounding with Bing Search"
        ],
        answer: 0,
        explanation: "Azure AI Search indexes the PDFs from Blob Storage and supports semantic, hybrid and vector retrieval for RAG. Bing grounding retrieves public web content, not Contoso's private product sheets."
      }
    ]
  });
})();
