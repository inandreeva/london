/* Part 3 — agent tools and multi-agent orchestration. */
(function () {
  var PY = window.PY;
  var T_TOOLS = "Agent Tools";
  var T_ORCH = "Orchestration & Async";

  PY(T_TOOLS, `
from azure.ai.agents.models import FilePurpose

file = agents_client.files.upload_and_poll(
    file_path="./manual.pdf", purpose=FilePurpose.[BLANK]
)`,
    "The file will be indexed for agent file search. What replaces [BLANK]?",
    ["AGENTS", "ASSISTANTS", "FINE_TUNE", "BATCH"],
    0,
    "FilePurpose.AGENTS marks the upload for use by the Foundry Agent Service.");

  PY(T_TOOLS, `
vector_store = agents_client.vector_stores.[BLANK](
    file_ids=[file.id], name="product-manuals"
)`,
    "The call must wait until indexing has finished. What replaces [BLANK]?",
    ["create_and_poll", "create", "create_async", "build"],
    0,
    "create_and_poll blocks until the vector store finishes ingesting the files.");

  PY(T_TOOLS, `
from azure.ai.agents.models import FileSearchTool

file_search = FileSearchTool([BLANK]=[vector_store.id])`,
    "What replaces [BLANK]?",
    ["vector_store_ids", "store_ids", "index_ids", "file_ids"],
    0,
    "FileSearchTool binds to one or more vector stores by ID.");

  PY(T_TOOLS, `
agent = agents_client.create_agent(
    model=MODEL,
    tools=file_search.definitions,
    [BLANK]=file_search.resources,
)`,
    "What replaces [BLANK]?",
    ["tool_resources", "resources", "tool_config", "attachments"],
    0,
    "A tool contributes both a definition (its schema) and tool_resources (the data it points at).");

  PY(T_TOOLS, `
from azure.ai.agents.models import [BLANK]

tool = [BLANK]()
agent = agents_client.create_agent(model=MODEL, tools=tool.definitions)
# the agent must write and execute Python to compute a result`,
    "What replaces [BLANK]?",
    ["CodeInterpreterTool", "FunctionTool", "PythonTool", "ComputeTool"],
    0,
    "CodeInterpreterTool runs generated Python in a managed sandbox and returns real computed results.");

  PY(T_TOOLS, `
def get_stock(sku: str) -> str:
    """Return the stock level for a SKU."""
    return json.dumps({"sku": sku, "in_stock": 42})

functions = FunctionTool(functions={[BLANK]})`,
    "What replaces [BLANK]?",
    ["get_stock", '"get_stock"', "get_stock()", "get_stock.__doc__"],
    0,
    "FunctionTool takes the callables themselves; it derives the JSON schema from type hints and the docstring.");

  PY(T_TOOLS, `
def get_stock(sku: str) -> str:
    """Return the stock level for a SKU.

    :param sku: The product SKU.
    :return: JSON with the stock level.
    """`,
    "Why does FunctionTool require type hints and a docstring?",
    [
      "They are converted into the JSON schema the model sees",
      "They are only used by the linter",
      "They set the tool's retry policy",
      "They determine the tool's execution order"
    ],
    0,
    "The SDK generates the function-calling schema from the signature and docstring, so the model can only call the tool correctly if they are present.");

  PY(T_TOOLS, `
toolset = ToolSet()
toolset.add(file_search)
toolset.add(functions)
agents_client.[BLANK](toolset)`,
    "Local Python functions must be executed automatically by the SDK during a run. What replaces [BLANK]?",
    ["enable_auto_function_calls", "register_tools", "attach_toolset", "auto_execute"],
    0,
    "enable_auto_function_calls lets create_and_process resolve function tool calls without manual submit_tool_outputs.");

  PY(T_TOOLS, `
from azure.ai.agents.models import BingGroundingTool

conn = project.connections.get(name="bing-conn")
bing = BingGroundingTool([BLANK]=conn.id)`,
    "What replaces [BLANK]?",
    ["connection_id", "connection_name", "endpoint", "resource_id"],
    0,
    "BingGroundingTool is wired to the project connection by its connection_id.");

  PY(T_TOOLS, `
# Requirement: answer from the latest public web content with citations,
# without building a scraping pipeline.
tool = [BLANK]`,
    "Which tool should be used?",
    ["BingGroundingTool", "FileSearchTool", "CodeInterpreterTool", "AzureAISearchTool"],
    0,
    "Grounding with Bing Search is the managed tool for public web content with attribution.");

  PY(T_TOOLS, `
from azure.ai.agents.models import AzureAISearchTool, AzureAISearchQueryType

search = AzureAISearchTool(
    index_connection_id=conn.id,
    index_name="products",
    query_type=AzureAISearchQueryType.[BLANK],
    top_k=5,
)`,
    "Complex questions must combine keyword, vector and semantic ranking. What replaces [BLANK]?",
    ["VECTOR_SEMANTIC_HYBRID", "SIMPLE", "VECTOR", "SEMANTIC"],
    0,
    "VECTOR_SEMANTIC_HYBRID runs keyword plus vector retrieval and then re-ranks semantically.");

  PY(T_TOOLS, `
search = AzureAISearchTool(
    index_connection_id=conn.id, index_name="legal-docs",
    top_k=[BLANK],
)
# users report that answers omit clauses from long documents`,
    "How should the parameter be changed?",
    [
      "increase it so more chunks reach the prompt",
      "decrease it to reduce noise",
      "set it to 1 for precision",
      "leave it and lower the temperature"
    ],
    0,
    "Missing content is a recall problem; retrieving more chunks puts the relevant passages into the context.");

  PY(T_TOOLS, `
from azure.ai.agents.models import OpenApiTool, OpenApiConnectionAuthDetails, OpenApiConnectionSecurityScheme

auth = OpenApiConnectionAuthDetails(
    security_scheme=OpenApiConnectionSecurityScheme(connection_id=conn.id)
)
tool = OpenApiTool(name="weather", spec=spec, description="...", [BLANK]=auth)`,
    "What replaces [BLANK]?",
    ["auth", "authentication", "security", "credential"],
    0,
    "OpenApiTool takes auth, which binds the stored connection to the tool so its key is injected automatically.");

  PY(T_TOOLS, `
# The external API returns HTTP 401 and traces show the API key header
# is never sent, although Connection1 holds the key.
FIX = "[BLANK]"`,
    "What is the correct fix?",
    [
      "Connect the OpenAPI tool to Connection1",
      "Paste the key into the OpenAPI specification",
      "Enable identity passthrough for the caller token",
      "Switch the tool to the project default connection"
    ],
    0,
    "A stored connection is only injected once the tool is explicitly bound to it.");

  PY(T_TOOLS, `
# In the OpenAPI 3.0 document, the key must travel in an HTTP header.
components:
  securitySchemes:
    apiKeyAuth:
      type: [BLANK]
      in: header
      name: x-api-key`,
    "What replaces [BLANK]?",
    ["apiKey", "http", "oauth2", "openIdConnect"],
    0,
    "An apiKey security scheme with in: header tells Foundry where to inject the connection's key.");

  PY(T_TOOLS, `
from azure.ai.agents.models import OpenApiAnonymousAuthDetails

tool = OpenApiTool(name="public", spec=spec, description="...",
                   auth=OpenApiAnonymousAuthDetails())`,
    "When is anonymous auth appropriate?",
    [
      "The external API requires no credentials at all",
      "The key is stored in a project connection",
      "The API uses Microsoft Entra tokens",
      "The API is called only from the portal"
    ],
    0,
    "OpenApiAnonymousAuthDetails is only for genuinely unauthenticated endpoints.");

  PY(T_TOOLS, `
from azure.ai.agents.models import McpTool

mcp = McpTool(
    server_label="knowledge",
    server_url="https://mcp.contoso.com/sse",
    [BLANK]=["search_kb"],
)`,
    "Only one of the server's tools may be exposed to the agent. What replaces [BLANK]?",
    ["allowed_tools", "tools", "whitelist", "enabled_tools"],
    0,
    "allowed_tools restricts which MCP server tools the agent can invoke.");

  PY(T_TOOLS, `
mcp.set_approval_mode("[BLANK]")
# a trusted first-party MCP server, no human approval per call`,
    "What replaces [BLANK]?",
    ["never", "always", "auto", "none"],
    0,
    "Approval mode 'never' skips the per-call human approval prompt; 'always' requires it.");

  PY(T_TOOLS, `
from azure.ai.agents.models import ConnectedAgentTool

policy_tool = ConnectedAgentTool(
    id=policy_agent.id, name="policy_lookup",
    [BLANK]="Answers policy questions from internal content.",
)`,
    "What replaces [BLANK]?",
    ["description", "instructions", "summary", "purpose"],
    0,
    "The description tells the orchestrating agent when to delegate to the connected agent.");

  PY(T_TOOLS, `
main_agent = agents_client.create_agent(
    model=MODEL,
    instructions="Route the request to the right specialist.",
    tools=policy_tool.definitions + action_tool.definitions,
)`,
    "What pattern is this?",
    [
      "Connected agents, where specialists are exposed as tools",
      "A deterministic YAML workflow",
      "A group chat between peer agents",
      "Client-side orchestration"
    ],
    0,
    "Connected Agents expose other agents as callable tools of a single orchestrator.");

  PY(T_ORCH, `
# Requirement: a deterministic, step-based process with conditional
# branching and shared state across three agents, minimal custom code.
SOLUTION = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "a multi-agent workflow",
      "threads and runs without a workflow",
      "a group chat session",
      "separate runs coordinated in application code"
    ],
    0,
    "Workflows give declarative steps, conditions and shared state; hand-rolled coordination is the opposite of minimal effort.");

  PY(T_ORCH, `
import asyncio

results = await asyncio.[BLANK](
    fetch_orders(user), fetch_invoices(user), fetch_tickets(user)
)`,
    "Three independent tool calls currently run sequentially and users complain about latency. What replaces [BLANK]?",
    ["gather", "wait_for", "sleep", "run"],
    0,
    "asyncio.gather runs independent coroutines concurrently and returns their results in order.");

  PY(T_ORCH, `
async def call_tool(name, args):
    async with semaphore:
        return await invoke(name, args)

semaphore = asyncio.[BLANK](5)`,
    "Parallel tool calls must not exceed five in flight to stay inside the rate limit. What replaces [BLANK]?",
    ["Semaphore", "Lock", "Event", "Queue"],
    0,
    "An asyncio.Semaphore bounds the number of concurrent operations.");

  PY(T_ORCH, `
tasks = [asyncio.create_task(run_agent(a)) for a in agents]
done, pending = await asyncio.wait(tasks, [BLANK]=asyncio.FIRST_COMPLETED)`,
    "What replaces [BLANK]?",
    ["return_when", "when", "mode", "policy"],
    0,
    "asyncio.wait takes return_when with FIRST_COMPLETED, FIRST_EXCEPTION or ALL_COMPLETED.");

  PY(T_ORCH, `
results = await asyncio.gather(*tasks, [BLANK]=True)
for r in results:
    if isinstance(r, Exception):
        log.warning("tool failed: %s", r)`,
    "One failing tool must not abort the whole batch. What replaces [BLANK]?",
    ["return_exceptions", "ignore_errors", "suppress", "continue_on_error"],
    0,
    "return_exceptions=True turns failures into returned exception objects instead of cancelling the gather.");

  PY(T_TOOLS, `
from azure.ai.agents.models import AzureFunctionTool, AzureFunctionStorageQueue

tool = AzureFunctionTool(
    name="charge_card", description="...", parameters=SCHEMA,
    input_queue=AzureFunctionStorageQueue(queue_name="in", storage_service_endpoint=EP),
    [BLANK]=AzureFunctionStorageQueue(queue_name="out", storage_service_endpoint=EP),
)`,
    "What replaces [BLANK]?",
    ["output_queue", "result_queue", "reply_queue", "response_queue"],
    0,
    "The Azure Function tool communicates through an input_queue and an output_queue.");

  PY(T_TOOLS, `
# Requirement: download diagnostic logs from an internal web app that
# exposes no API, then analyse the files for bottlenecks.
TOOLS = ["[BLANK]", "code interpreter"]`,
    "What replaces [BLANK]?",
    ["computer use", "file search", "Bing grounding", "Microsoft Fabric"],
    0,
    "With no API available the agent must drive the UI, which is the computer use tool; analysis is then done by the code interpreter.");

  PY(T_TOOLS, `
for path, file_id in run_output.image_contents:
    agents_client.files.[BLANK](file_id=file_id, target_dir="./out")`,
    "The code interpreter produced a chart that must be written to disk. What replaces [BLANK]?",
    ["save", "download", "get_content", "export"],
    0,
    "files.save(file_id=..., file_name=..., target_dir=...) writes a generated file locally.");

  PY(T_TOOLS, `
content = agents_client.files.[BLANK](file_id=file_id)
with open("out.csv", "wb") as f:
    for chunk in content:
        f.write(chunk)`,
    "What replaces [BLANK] to stream the raw bytes of a generated file?",
    ["get_content", "download", "read", "open"],
    0,
    "files.get_content returns an iterable of byte chunks.");

  PY(T_TOOLS, `
# Compliance workflow requirements:
#  * every run must retrieve before answering
#  * tool calls authenticate as the published agent
#  * the identity is isolated from other project resources
tool_choice = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["required", "auto", "none", "optional"],
    0,
    "tool_choice='required' guarantees the retrieval step runs on every execution.");

  PY(T_TOOLS, `
from azure.ai.agents.models import SharepointTool

tool = SharepointTool(connection_id=conn.id)`,
    "What does this tool ground the agent in?",
    [
      "Documents in a connected SharePoint site",
      "Public web results",
      "Files uploaded in the current chat",
      "Rows in a Fabric lakehouse"
    ],
    0,
    "The SharePoint tool retrieves from a connected SharePoint document library.");

  PY(T_TOOLS, `
from azure.ai.agents.models import FabricTool

tool = FabricTool(connection_id=conn.id)
# the analysts ask natural-language questions over curated warehouse data`,
    "Which capability does this add?",
    [
      "Grounded answers over Microsoft Fabric data",
      "Image generation",
      "Real-time speech transcription",
      "PDF layout extraction"
    ],
    0,
    "The Microsoft Fabric tool lets the agent query curated Fabric data through natural language.");

  PY(T_TOOLS, `
tool_defs = search_tool.definitions + file_search.definitions + code.definitions
agent = agents_client.create_agent(model=MODEL, tools=[BLANK])`,
    "What replaces [BLANK]?",
    ["tool_defs", "[tool_defs]", "tool_defs.definitions", "str(tool_defs)"],
    0,
    "tools takes a flat list of tool definitions; the per-tool .definitions lists are concatenated.");

  PY(T_ORCH, `
# TriageAgent classifies, PolicyAgent answers, ActionAgent creates tickets.
# The ticket step must run only when triage returns "incident".
condition: [BLANK]`,
    "What replaces [BLANK] in the workflow YAML?",
    ['triage.output == "incident"', "true", "triage.output != null", "always"],
    0,
    "A conditional edge evaluates the upstream step's output before the downstream step runs.");

  PY(T_ORCH, `
# Requirement: pause the refund workflow for human approval.
- id: approval
  type: ask_question
- id: execute_refund
  type: agent
  agent: PaymentAgent
  condition: [BLANK]`,
    "What replaces [BLANK]?",
    ['approval == "approved"', "propose_refund.output != null", "true", "approval != null"],
    0,
    "The refund must be gated on the approval result, not merely on the approval step having produced any output.");

  PY(T_ORCH, `
# Power Fx expression in a workflow node
condition = "[BLANK]"
# must be true only when Local.Var01 holds a value`,
    "What replaces [BLANK]?",
    [
      "Not(IsBlank(Local.Var01))",
      "IsBlank(Local.Var01)",
      "IsEmpty(Local.Var01)",
      "Local.Var01 = true"
    ],
    0,
    "Not(IsBlank(...)) is true when the variable contains a value; IsEmpty applies to tables.");

  PY(T_ORCH, `
# Send message expression returning the stored answer in upper case
message = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["{Upper(Local.Var01)}", "{Upper(Var01)}", "Upper(Local.Var01)", "{Local.Var01.Upper()}"],
    0,
    "Message expressions are wrapped in braces and must use the Local scope prefix.");

  PY(T_TOOLS, `
from azure.ai.agents.models import DeepResearchTool

tool = DeepResearchTool(
    bing_grounding_connection_id=conn.id,
    deep_research_model=RESEARCH_DEPLOYMENT,
)`,
    "What is this tool designed for?",
    [
      "Long-running multi-source web research that produces a cited report",
      "Executing SQL against a warehouse",
      "Transcribing long audio files",
      "Editing images with masks"
    ],
    0,
    "Deep Research performs extended, multi-step web investigation and returns a report with citations.");

  PY(T_TOOLS, `
agent = agents_client.create_agent(
    model=MODEL, tools=functions.definitions,
    tool_choice={"type": "function", "function": {"name": "[BLANK]"}},
)`,
    "The run must always call get_order_status first. What replaces [BLANK]?",
    ["get_order_status", "function", "auto", "required"],
    0,
    "A function-typed tool_choice names the exact function that must be invoked.");

  PY(T_ORCH, `
async def worker(item):
    try:
        return await call_agent(item)
    except HttpResponseError as ex:
        if ex.status_code == 429:
            await asyncio.sleep(float(ex.response.headers.get("[BLANK]", 1)))
            return await call_agent(item)
        raise`,
    "Which response header tells the client how long to wait before retrying?",
    ["Retry-After", "X-RateLimit-Reset", "Backoff", "X-Retry-Delay"],
    0,
    "Azure services return Retry-After on 429 responses; honouring it is better than a fixed sleep.");

  PY(T_TOOLS, `
definition = {
    "type": "function",
    "function": {
        "name": "create_ticket",
        "parameters": {
            "type": "object",
            "properties": {"title": {"type": "string"}, "priority": {"type": "string"}},
            "[BLANK]": ["title"],
        },
    },
}`,
    "What replaces [BLANK]?",
    ["required", "mandatory", "needed", "requires"],
    0,
    "JSON Schema uses a required array listing the mandatory property names.");

  PY(T_TOOLS, `
"priority": {"type": "string", "[BLANK]": ["low", "normal", "high"]}`,
    "The model must choose from a fixed set of values. What replaces [BLANK]?",
    ["enum", "oneOf", "values", "choices"],
    0,
    "enum constrains a JSON Schema property to a fixed list of allowed values.");

  PY(T_TOOLS, `
"function": {
    "name": "create_ticket",
    "[BLANK]": "Create a support ticket. Call this only after the user confirms.",
    "parameters": {...},
}`,
    "What replaces [BLANK], and why does it matter?",
    [
      "description — the model decides when to call the tool from it",
      "summary — it is shown in the portal only",
      "docstring — it is used by the linter",
      "instructions — it overrides the agent system message"
    ],
    0,
    "The function description is the model's only signal about when the tool is appropriate.");

  PY(T_ORCH, `
loop = asyncio.get_running_loop()
result = await loop.[BLANK](None, blocking_sdk_call, arg)`,
    "A synchronous SDK call must not block the event loop. What replaces [BLANK]?",
    ["run_in_executor", "call_soon", "create_task", "run_until_complete"],
    0,
    "run_in_executor offloads blocking work to a thread pool.");

  PY(T_TOOLS, `
agents_client.vector_stores.[BLANK](vector_store_id=vs.id)
# the uploaded chat attachments must not persist after the session`,
    "What replaces [BLANK]?",
    ["delete", "purge", "expire", "clear"],
    0,
    "vector_stores.delete removes the store and its indexed content.");

  PY(T_TOOLS, `
vs = agents_client.vector_stores.create_and_poll(
    file_ids=[f.id],
    [BLANK]={"anchor": "last_active_at", "days": 7},
)`,
    "Stores must be cleaned up automatically. What replaces [BLANK]?",
    ["expires_after", "ttl", "retention", "expiry"],
    0,
    "expires_after sets an automatic expiry policy relative to creation or last activity.");

  PY(T_TOOLS, `
batch = agents_client.vector_store_file_batches.create_and_poll(
    vector_store_id=vs.id, file_ids=[f1.id, f2.id, f3.id]
)
print(batch.[BLANK])`,
    "What replaces [BLANK] to confirm every file was indexed?",
    ["file_counts", "count", "files", "total"],
    0,
    "A batch reports file_counts with completed, failed, in_progress and total.");

  PY(T_ORCH, `
# Agent1 must resume exactly where it stopped days later and reference
# previous tool invocations and uploaded documents.
ACTION = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "persist the thread ID and reuse the existing thread",
      "create a new thread and copy the previous responses",
      "store summaries and start a new thread each session",
      "save only the final assistant response"
    ],
    0,
    "The thread is the server-side store of the full state, including tool calls and attachments.");
})();
