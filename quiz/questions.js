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
  {
    id: "infra-11",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "An EU bank must guarantee that inference data is processed only inside the European Union, but still wants Microsoft to handle capacity routing across EU datacenters rather than pinning a single region.",
    options: [
      "Global Standard deployment",
      "Data Zone Standard deployment",
      "Standard (regional) deployment in North Europe only",
      "Provisioned throughput in a single region"
    ],
    answer: 1,
    explanation: "Data Zone deployments route within a defined geography (EU or US). Global Standard may route anywhere worldwide; a single regional deployment satisfies residency but gives up cross-region capacity pooling."
  },
  {
    id: "infra-12",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A team has bought provisioned throughput units (PTU) sized for normal load, but occasional traffic spikes exceed the reservation and return 429 errors. They want the overflow served without buying more PTU.",
    options: [
      "Increase the PTU reservation to cover peak load",
      "Enable spillover so traffic above the provisioned capacity is served by a standard (pay-per-token) deployment",
      "Switch the whole workload to serverless",
      "Add a second Foundry hub"
    ],
    answer: 1,
    explanation: "Spillover routes overflow from a provisioned deployment to a standard deployment, so you size PTU for the baseline and pay per token only for the bursts."
  },
  {
    id: "infra-13",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A compliance team requires that agent threads, message history and uploaded files are stored in resources the company owns and can audit, rather than in Microsoft-managed multitenant storage.",
    options: [
      "Basic agent setup — platform-managed storage is always customer-auditable",
      "Standard agent setup — bring your own Azure Cosmos DB, Azure Storage account and Azure AI Search",
      "Disable the agent service and call the model API directly",
      "Enable customer-managed keys on the basic setup, which moves data into your subscription"
    ],
    answer: 1,
    explanation: "The standard agent setup uses BYO Cosmos DB (threads), Storage (files) and AI Search (vector store) in your own subscription. Basic setup keeps that state in Microsoft-managed resources."
  },
  {
    id: "infra-14",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "An agent must reach an internal API that is only resolvable inside the corporate VNet, and its outbound traffic must originate from that VNet.",
    options: [
      "Add a private endpoint to the Foundry resource — that is enough for outbound calls",
      "Use network-injected agents with a delegated subnet so agent egress runs inside your VNet",
      "Expose the internal API publicly and restrict it by API key",
      "Peer the VNet to the Microsoft-managed network from the portal"
    ],
    answer: 1,
    explanation: "A private endpoint only secures inbound access to the Foundry resource. Outbound agent traffic entering your VNet requires network injection into a delegated subnet."
  },
  {
    id: "infra-15",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "Developers need to create agents, manage connections and run evaluations in a Foundry project, but must not be able to change the project's own RBAC assignments or delete the resource.",
    options: [
      "Owner on the resource group",
      "Azure AI Developer on the project",
      "Contributor on the subscription",
      "Cognitive Services OpenAI User on the resource"
    ],
    answer: 1,
    explanation: "Azure AI Developer grants full authoring inside a project without resource-management or role-assignment rights. Cognitive Services OpenAI User only allows calling deployed models."
  },
  {
    id: "infra-16",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A policy requires that all data at rest be encrypted with keys the customer controls and can revoke. What must be configured before the Foundry resource is created?",
    options: [
      "A storage account with infrastructure encryption enabled",
      "An Azure Key Vault with soft delete and purge protection enabled, holding the customer-managed key",
      "A Key Vault with public network access disabled and no purge protection",
      "Nothing — customer-managed keys can be enabled at any time on any resource"
    ],
    answer: 1,
    explanation: "CMK requires a Key Vault with soft delete AND purge protection enabled; without purge protection Azure rejects the CMK configuration because key loss would make the data unrecoverable."
  },
  {
    id: "infra-17",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "After adding a private endpoint to a Foundry resource, on-premises clients connected over ExpressRoute still resolve the endpoint to a public IP address.",
    options: [
      "The private endpoint failed to provision — recreate it",
      "DNS is missing: the privatelink private DNS zone must be linked to the VNet and reachable from on-premises (for example via a DNS forwarder)",
      "Private endpoints do not work over ExpressRoute",
      "Public network access must be re-enabled for private endpoints to resolve"
    ],
    answer: 1,
    explanation: "Private endpoints only change resolution if the privatelink DNS zone is linked and on-premises resolvers forward to Azure DNS. Otherwise the public CNAME wins."
  },
  {
    id: "infra-18",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A workload has hit the maximum tokens-per-minute quota for a model in West Europe and the business will not accept throttling. No additional quota is available in that region.",
    options: [
      "Create a second Foundry resource in West Europe — quota is per resource",
      "Deploy the same model in another region and distribute traffic across both deployments, since quota is per subscription per region per model",
      "Upgrade the subscription to a higher support plan",
      "Switch from managed identity to API keys to bypass the rate limit"
    ],
    answer: 1,
    explanation: "Model quota is scoped to subscription + region + model family, so extra resources in the same region do not help. Adding a second region (or requesting an increase) does."
  },
  {
    id: "infra-19",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A production chat application must stay available if an entire Azure region becomes unavailable, and the client code should not change when failover happens.",
    options: [
      "A single Global Standard deployment, which is inherently region-redundant for availability",
      "Two deployments in different regions behind a gateway such as Azure API Management with load balancing and retry on 429/5xx",
      "A geo-redundant storage account attached to the Foundry resource",
      "Provisioned throughput, which includes automatic cross-region failover"
    ],
    answer: 1,
    explanation: "Global Standard affects capacity routing, not your resource's regional availability. Cross-region resilience with a stable client endpoint requires a gateway fronting multiple regional deployments."
  },
  {
    id: "infra-20",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A nightly job must classify 4 million archived documents. Results are only needed by the next morning, and cost is the dominant concern.",
    options: [
      "Standard deployment with high concurrency",
      "Batch deployment, which processes a submitted job asynchronously within a 24-hour target at a reduced per-token price",
      "Provisioned throughput sized for the peak",
      "Fine-tune a model to make each request cheaper"
    ],
    answer: 1,
    explanation: "Large, latency-tolerant offline workloads are the batch deployment scenario — roughly half the token cost in exchange for asynchronous completion."
  },
  {
    id: "infra-21",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "One deployment serves an internal red-team tool that needs relaxed content filtering, while every other deployment in the same resource must keep the default filters.",
    options: [
      "Content filters are set per resource, so a second Foundry resource is required",
      "Create a custom content filter configuration and assign it to that single model deployment",
      "Disable content filtering at the subscription level",
      "Content filtering can only be changed in code via request parameters"
    ],
    answer: 1,
    explanation: "Content filter configurations are created once and then assigned per model deployment, so different deployments in the same resource can carry different policies."
  },
  {
    id: "infra-22",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "An operations team needs end-to-end traces of agent runs — tool calls, latency per step and token usage — queryable months later alongside the rest of the application telemetry.",
    options: [
      "Read the run steps from the Foundry portal when an incident is reported",
      "Connect an Application Insights resource to the project and enable tracing, then query the data in Log Analytics",
      "Enable activity log alerts on the Foundry resource",
      "Store the chat transcripts in the agent's Cosmos DB thread store"
    ],
    answer: 1,
    explanation: "Agent observability is delivered by connecting Application Insights to the project; the activity log only records control-plane operations, not run-level traces."
  },
  {
    id: "infra-23",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A security baseline states that no application may authenticate to the Foundry resource with a shared key, and the control must be enforced by the platform rather than by code review.",
    options: [
      "Rotate the API keys every 30 days with an automation runbook",
      "Disable local authentication on the resource so only Microsoft Entra ID tokens are accepted, and assign RBAC roles to managed identities",
      "Store the API keys in Key Vault and reference them from App Configuration",
      "Restrict the resource to a private endpoint, which disables key auth"
    ],
    answer: 1,
    explanation: "Disabling local auth is the platform-enforced control; Key Vault storage and rotation still leave key-based authentication possible, and private endpoints do not change the auth model."
  },
  {
    id: "infra-24",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A Foundry resource was deleted by mistake. Recreating it in the same region with the same name fails with a name-conflict error.",
    options: [
      "The name is permanently reserved — choose a different one",
      "The resource is in the soft-delete retention window; either restore it or purge it before reusing the name",
      "The region is out of capacity for new resources",
      "A support ticket is the only way to release the name"
    ],
    answer: 1,
    explanation: "Azure AI / Cognitive Services resources are soft-deleted for a retention period. Until you restore or purge them, the name stays taken."
  },
  {
    id: "infra-25",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "Within a hub, one project must use a private Azure AI Search index that no other project may see, while all projects continue to use the shared Bing grounding connection.",
    options: [
      "Impossible — everything in a hub is shared by definition",
      "Define the Search connection at the project scope and leave the Bing connection at the hub scope",
      "Move the project out of the hub into a standalone project",
      "Define both connections at the hub scope and control access with RBAC on the Search service only"
    ],
    answer: 1,
    explanation: "Connections can be created at either hub scope (inherited by all projects) or project scope (visible only to that project), so the two requirements coexist in one hub."
  },
  {
    id: "infra-26",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "Three App Service apps and two Container Apps must all call the same Foundry deployment, and the security team wants one identity to audit and one set of role assignments to maintain.",
    options: [
      "A system-assigned managed identity on each app",
      "One user-assigned managed identity shared by all five workloads, granted the required role once",
      "A single service principal with a client secret stored in Key Vault",
      "A shared API key distributed through App Configuration"
    ],
    answer: 1,
    explanation: "System-assigned identities are per resource and would need five role assignments. A user-assigned managed identity is shared across workloads with a single assignment and no secret."
  },
  {
    id: "infra-27",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A deployment is configured with a fixed tokens-per-minute (TPM) allocation. The team reports that short prompts are being throttled long before the token budget is exhausted.",
    options: [
      "TPM only limits output tokens, so input tokens must be reduced",
      "The requests-per-minute limit is derived from the TPM allocation, so very small requests hit the RPM ceiling first",
      "Throttling is unrelated to quota and indicates a networking failure",
      "TPM is enforced per day, not per minute"
    ],
    answer: 1,
    explanation: "Azure derives an RPM limit from the assigned TPM. Workloads with many tiny requests exhaust RPM while TPM still has headroom — the fix is raising TPM or batching requests."
  },
  {
    id: "infra-28",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "An architect must document every dependent Azure resource that a hub-based Foundry workspace provisions or requires.",
    options: [
      "Only a storage account",
      "Storage account, Key Vault, and optionally Application Insights and a container registry",
      "Cosmos DB, Event Hubs and Service Bus",
      "No dependencies — a hub is fully self-contained"
    ],
    answer: 1,
    explanation: "A hub always needs a storage account and Key Vault; Application Insights (telemetry) and Container Registry (custom environments/images) are optional additions."
  },
  {
    id: "infra-29",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    question: "A managed-VNet workspace must prevent an untrusted prompt from causing the environment to upload data to an arbitrary external endpoint, while still allowing calls to two approved SaaS APIs.",
    options: [
      "Allow internet outbound and monitor egress with diagnostic logs",
      "Use the allow-only-approved-outbound isolation mode and add explicit FQDN outbound rules for the two APIs",
      "Disable public network access on the workspace, which also blocks outbound traffic",
      "Route all traffic through a public NAT gateway"
    ],
    answer: 1,
    explanation: "Allow-only-approved-outbound is the data-exfiltration-protection mode: everything is blocked unless an explicit FQDN, private endpoint or service-tag rule permits it. Inbound controls do not restrict egress."
  },
  {
    id: "infra-30",
    domain: "Domain 1 — Infrastructure Design",
    source: "mock-tests/infra-design-quiz.md",
    trap: true,
    question: "EXAM TRAP: A scenario asks for 'the highest available throughput and the best global capacity utilisation' and, two paragraphs later, states that 'customer data must not leave Germany.'",
    options: [
      "Global Standard deployment, because throughput is the primary requirement",
      "A regional (or EU data zone) deployment in Germany, because the residency constraint overrides the throughput preference",
      "Global Batch deployment, which keeps data in the submitting region",
      "Provisioned throughput with global routing enabled"
    ],
    answer: 1,
    explanation: "Residency is a hard constraint; throughput is a preference. Global Standard may process the request in any region, so it fails the requirement no matter how attractive the capacity story is."
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
  {
    id: "vision-edit-5",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A team has been generating marketing art with DALL·E 3 and now needs to erase a logo from an existing rendering by supplying a mask. The edits call keeps failing.",
    options: [
      "The mask must be a JPEG",
      "DALL·E 3 only exposes image generation — mask-based editing requires an image model that supports the edits endpoint, such as GPT-image-1",
      "Editing requires a provisioned deployment",
      "Masks are only supported for square images"
    ],
    answer: 1,
    explanation: "Not every image model supports every operation. DALL·E 3 is generation-only; inpainting/outpainting needs a model with an edits endpoint."
  },
  {
    id: "vision-edit-6",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "An inpainting request returns an error about the mask. What does a valid mask look like?",
    options: [
      "A black-and-white JPEG of any size, where white marks the region to keep",
      "A PNG with an alpha channel and the same dimensions as the source image, where the transparent pixels mark the region to be regenerated",
      "A bounding box expressed as x, y, width and height in the request body",
      "A text description of the region to change"
    ],
    answer: 1,
    explanation: "The mask is an image file, not coordinates: same size as the source, PNG with alpha, and the cleared (transparent) area is what the model repaints."
  },
  {
    id: "vision-edit-7",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A square 1024×1024 product shot must be reused as a wide website banner without cropping the product or stretching it.",
    options: [
      "Inpaint the product into a larger canvas",
      "Outpaint the image to the wider aspect ratio so the model invents plausible scene content on the left and right",
      "Regenerate the product from text at the banner size",
      "Upscale the image and crop the middle"
    ],
    answer: 1,
    explanation: "Changing aspect ratio while keeping the original subject intact is outpainting — the model extends the scene past the original boundaries."
  },
  {
    id: "vision-edit-8",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A brand team supplies a packshot, a fabric swatch and a logo file, and wants a single composed lifestyle image that reuses all three visual assets.",
    options: [
      "Three separate text-to-image calls that are combined in Photoshop",
      "One edits request to an image model that accepts multiple reference images, with a prompt describing how to combine them",
      "Outpainting each asset until they overlap",
      "Image-to-video, then export a frame"
    ],
    answer: 1,
    explanation: "Models such as GPT-image-1 accept several input images in one editing request, which is the intended path for composing multiple brand assets."
  },
  {
    id: "vision-edit-9",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "An e-commerce pipeline needs generated product images with no background, ready to drop onto any page colour.",
    options: [
      "Request a white background and key it out afterwards",
      "Set the background parameter to transparent and request an output format that supports alpha, such as PNG or WebP",
      "Use outpainting to remove the background",
      "Transparency is only available through Azure AI Vision"
    ],
    answer: 1,
    explanation: "Transparent output requires both the transparent background option and a container format with an alpha channel — JPEG cannot carry transparency."
  },
  {
    id: "vision-edit-10",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A legal review requires that the unmasked area of an edited photograph be bit-for-bit identical to the original file.",
    options: [
      "Use a smaller mask — unmasked pixels are always returned unchanged",
      "The edits endpoint returns a newly rendered image, so composite the masked region from the result back over the untouched original",
      "Set the quality parameter to high, which preserves the source pixels",
      "Use outpainting instead, which never alters existing pixels"
    ],
    answer: 1,
    explanation: "Inpainting preserves the unmasked region visually, not byte-exactly. A pixel-identical guarantee requires compositing the edited region onto the original yourself."
  },
  {
    id: "vision-edit-11",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A support tool must read a photo a customer uploaded and answer questions about what is damaged in it. No new imagery is produced.",
    options: [
      "Inpainting with a mask",
      "A multimodal model performing image understanding, or Azure AI Vision image analysis",
      "Reference-image generation",
      "Image-to-video"
    ],
    answer: 1,
    explanation: "Reading an image is an analysis task, not an editing or generation task — the exam mixes these deliberately."
  },
  {
    id: "vision-edit-12",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "An image generation request is rejected with a content policy violation before any image is produced.",
    options: [
      "Retry the identical request until it succeeds",
      "The prompt was blocked by the content filter — rewrite the prompt, or request an approved content filter modification for the deployment",
      "Increase the deployment quota",
      "Switch from a private endpoint to a public endpoint"
    ],
    answer: 1,
    explanation: "Image models filter both the prompt and the generated image. A blocked prompt is a policy outcome, not a capacity or networking problem."
  },
  {
    id: "vision-edit-13",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    question: "A newsroom must be able to prove downstream that a published picture was produced by a generative model.",
    options: [
      "Add a visible watermark manually before publishing",
      "Rely on the C2PA content credentials that Azure OpenAI embeds in the metadata of generated images",
      "Store the prompt in a database",
      "Nothing is available — provenance must be tracked out of band"
    ],
    answer: 1,
    explanation: "Azure OpenAI image models attach C2PA provenance metadata to generated images, which is the platform-provided answer to 'prove this was AI generated'."
  },
  {
    id: "vision-edit-14",
    domain: "Domain 3 — Image Editing",
    source: "topics/domain-3-computer-vision/image-editing-inpainting.md",
    trap: true,
    question: "EXAM TRAP: A scenario says 'the customer wants the photograph enhanced — brighter, sharper and with the sensor dust removed' and adds 'the processing must be deterministic and repeatable for an audit.'",
    options: [
      "Mask-based inpainting, because dust removal is a localized edit",
      "Conventional deterministic image processing, because a generative model produces a different result on every run and cannot satisfy a repeatability requirement",
      "Reference-image generation with the original as the reference",
      "Outpainting with a high quality setting"
    ],
    answer: 1,
    explanation: "'Deterministic and repeatable' rules out generative editing entirely. Not every image task on the exam is a generative-AI task."
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
  },
  {
    id: "vision-gen-6",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A batch job asks DALL·E 3 for four variations of a concept in a single call by setting n to 4, and the call fails.",
    options: [
      "The quota is too low for four images",
      "DALL·E 3 generates one image per request — issue four separate calls (or use a model that supports n greater than 1)",
      "Variations require the edits endpoint",
      "n is only valid together with a reference image"
    ],
    answer: 1,
    explanation: "DALL·E 3 is limited to n=1. Knowing the per-model parameter limits is a recurring exam detail."
  },
  {
    id: "vision-gen-7",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "Generated images are returned as URLs and archived by a nightly job. The next morning many downloads return 404.",
    options: [
      "The images were removed by the content filter after generation",
      "Generated image URLs are short-lived (about 24 hours) — request base64 output, or download and persist the image immediately",
      "The deployment must be recreated",
      "URLs only work from the same IP address that made the request"
    ],
    answer: 1,
    explanation: "Azure does not host generated images permanently. If you need to keep them, take the b64_json response or copy the file to your own storage right away."
  },
  {
    id: "vision-gen-8",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A team notices that the image returned by DALL·E 3 reflects a longer, more detailed prompt than the one they sent, and they need to log exactly what was rendered.",
    options: [
      "Disable prompt rewriting in the deployment settings",
      "Read the revised_prompt value returned in the response, which contains the rewritten prompt the model actually used",
      "Re-send the prompt with temperature set to 0",
      "Prompt rewriting only happens when the content filter triggers"
    ],
    answer: 1,
    explanation: "DALL·E 3 automatically expands prompts for safety and quality and surfaces the result as revised_prompt — that is the value to log for reproducibility."
  },
  {
    id: "vision-gen-9",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "An architecture firm wants photorealistic, understated renderings rather than the hyper-dramatic look the model produces by default.",
    options: [
      "Lower the quality parameter",
      "Set the style parameter to natural instead of vivid",
      "Use a smaller image size",
      "Switch to image-to-video"
    ],
    answer: 1,
    explanation: "DALL·E 3 exposes style with two values: vivid (hyper-real, dramatic) and natural (more subdued, realistic)."
  },
  {
    id: "vision-gen-10",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A campaign needs posters where a slogan is rendered legibly inside the artwork itself.",
    options: [
      "Any image model will render text reliably if the prompt quotes it",
      "Choose an image model known for accurate in-image text rendering, such as GPT-image-1, rather than assuming every generator handles typography equally",
      "Generate the art, then outpaint the slogan",
      "Use OCR to add the text"
    ],
    answer: 1,
    explanation: "In-image text quality differs sharply between image models; picking the model for the capability is the decision the exam is testing."
  },
  {
    id: "vision-gen-11",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A developer calls the video generation API and the HTTP response contains no video, only an identifier and a status.",
    options: [
      "The request failed silently — retry it",
      "Video generation is asynchronous: create a job, poll it until it succeeds, then retrieve the generated content by id",
      "Videos are only returned over a WebSocket connection",
      "The deployment is missing a storage connection"
    ],
    answer: 1,
    explanation: "Unlike image generation, video generation uses a job-based create/poll/retrieve pattern because rendering takes far longer than a synchronous request allows."
  },
  {
    id: "vision-gen-12",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A studio wants a two-minute generated promotional film, but the video model enforces a maximum clip length of a few seconds.",
    options: [
      "Request a higher duration limit through quota management",
      "Generate a sequence of shorter clips and assemble them, keeping continuity through consistent prompts and reference frames",
      "Generate at a lower resolution, which lifts the duration limit",
      "Use image-to-video, which has no duration limit"
    ],
    answer: 1,
    explanation: "Clip duration and resolution are hard model limits. Long-form output is produced by stitching multiple generations, not by raising a quota."
  },
  {
    id: "vision-gen-13",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A media archive needs to find every clip in 40,000 existing videos where a forklift appears near a pedestrian.",
    options: [
      "Text-to-video generation",
      "Video analysis and search — Azure AI Video Indexer or a video retrieval index — because the content already exists",
      "Image-to-video on each keyframe",
      "Outpainting each frame"
    ],
    answer: 1,
    explanation: "Searching existing footage is an analysis/retrieval problem. Generative video models create new content and cannot index an archive."
  },
  {
    id: "vision-gen-14",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "A catalogue search must let shoppers upload a photo of a chair and find visually similar chairs, with no labels or captions involved.",
    options: [
      "Reference-image generation",
      "Azure AI Vision multimodal embeddings — vectorize the images and the query image, then search the vector index",
      "OCR followed by keyword search",
      "Text-to-image with the photo as the prompt"
    ],
    answer: 1,
    explanation: "Visual similarity search is an embeddings + vector index problem; generation models are not retrieval systems."
  },
  {
    id: "vision-gen-15",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    question: "An image generation deployment is throttling at a steady rate although the token usage dashboard shows almost nothing.",
    options: [
      "Token quota is misreported — open a support case",
      "Image model capacity is allocated in requests per minute rather than tokens per minute, so the request rate is the limit being hit",
      "Image generation consumes no quota at all",
      "The content filter is rate limiting the deployment"
    ],
    answer: 1,
    explanation: "Image deployments are governed by request-rate capacity, so token dashboards look idle while the deployment throttles."
  },
  {
    id: "vision-gen-16",
    domain: "Domain 3 — Image & Video Generation",
    source: "topics/domain-3-computer-vision/image-video-generation.md",
    trap: true,
    question: "EXAM TRAP: A scenario asks for 'a video of our CEO delivering the quarterly message, generated from her headshot and a script'.",
    options: [
      "Image-to-video, because a source image plus a prompt is supplied",
      "Not permitted as described — generating a realistic likeness of an identifiable real person is restricted by the content policy, so the requirement must change",
      "Text-to-video, because the script is the prompt",
      "Reference-image generation followed by image-to-video"
    ],
    answer: 1,
    explanation: "The workflow keywords fit image-to-video perfectly, which is exactly the bait. Responsible-AI restrictions on synthesising real, identifiable people override the workflow match."
  }
];
