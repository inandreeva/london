/* Part 2 — agent lifecycle, threads, runs, messages, memory. */
(function () {
  var PY = window.PY;
  var T_AGENT = "Agent Lifecycle & Runs";
  var T_THREAD = "Threads, Messages & Memory";

  PY(T_AGENT, `
from azure.ai.agents import AgentsClient

agent = agents_client.[BLANK](
    model="gpt-4o",
    name="triage-agent",
    instructions="Classify incoming support requests.",
)`,
    "What replaces [BLANK]?",
    ["create_agent", "create", "new_agent", "agents.create"],
    0,
    "AgentsClient.create_agent() returns the agent definition, whose .id is used for every run.");

  PY(T_AGENT, `
agent = agents_client.create_agent(
    model=MODEL,
    name="policy-agent",
    [BLANK]="Answer only from the retrieved policy documents. Refuse otherwise.",
)`,
    "The system-level behaviour and refusal boundary go into which parameter?",
    ["instructions", "system_message", "prompt", "description"],
    0,
    "Agent behaviour, scope and refusal rules belong in instructions, the agent's system message.");

  PY(T_AGENT, `
thread = agents_client.threads.[BLANK]()
print(thread.id)`,
    "What replaces [BLANK]?",
    ["create", "new", "start", "open"],
    0,
    "threads.create() starts a new conversation thread.");

  PY(T_AGENT, `
message = agents_client.messages.create(
    thread_id=thread.id,
    [BLANK]="user",
    content="My device will not start.",
)`,
    "What replaces [BLANK]?",
    ["role", "sender", "author", "type"],
    0,
    "Messages carry a role of 'user' or 'assistant'.");

  PY(T_AGENT, `
run = agents_client.runs.[BLANK](thread_id=thread.id, agent_id=agent.id)
print(run.status)`,
    "The call must block until the run reaches a terminal state and must execute tool calls automatically. What replaces [BLANK]?",
    ["create_and_process", "create", "create_and_poll", "submit"],
    0,
    "create_and_process both polls to completion and resolves registered function tool calls; create() returns immediately.");

  PY(T_AGENT, `
run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id)
while run.status in ["queued", "in_progress", "requires_action"]:
    time.sleep(1)
    run = agents_client.runs.[BLANK](thread_id=thread.id, run_id=run.id)`,
    "What replaces [BLANK] in the manual polling loop?",
    ["get", "retrieve", "poll", "refresh"],
    0,
    "runs.get(thread_id, run_id) re-reads the current run state.");

  PY(T_AGENT, `
if run.status == "failed":
    print(run.[BLANK])`,
    "What replaces [BLANK] to show why the run failed?",
    ["last_error", "error", "failure_reason", "exception"],
    0,
    "A failed run carries last_error with a code and message.");

  PY(T_AGENT, `
from azure.ai.agents.models import ListSortOrder

messages = agents_client.messages.list(
    thread_id=thread.id, order=ListSortOrder.[BLANK]
)`,
    "The transcript must be printed oldest-first. What replaces [BLANK]?",
    ["ASCENDING", "DESCENDING", "OLDEST", "CHRONOLOGICAL"],
    0,
    "ListSortOrder.ASCENDING returns the messages in the order they were created.");

  PY(T_AGENT, `
for message in messages:
    if message.[BLANK]:
        print(message.role, message.[BLANK][-1].text.value)`,
    "What replaces [BLANK] to read the textual parts of a message?",
    ["text_messages", "contents", "text", "parts"],
    0,
    "Message content is a list; text_messages exposes only the text parts, and .text.value holds the string.");

  PY(T_AGENT, `
agents_client.[BLANK](agent.id)
# clean-up after a sample run`,
    "What replaces [BLANK]?",
    ["delete_agent", "agents.delete", "remove_agent", "destroy_agent"],
    0,
    "delete_agent(agent_id) removes the agent definition.");

  PY(T_AGENT, `
from azure.ai.agents.models import MessageRole

last = agents_client.messages.get_last_message_by_role(
    thread_id=thread.id, role=MessageRole.[BLANK]
)`,
    "The code needs the agent's final answer. What replaces [BLANK]?",
    ["AGENT", "USER", "SYSTEM", "TOOL"],
    0,
    "MessageRole.AGENT identifies the assistant's messages in the Foundry Agents SDK.");

  PY(T_AGENT, `
if run.status == "requires_action":
    tool_calls = run.required_action.[BLANK].tool_calls`,
    "What replaces [BLANK]?",
    ["submit_tool_outputs", "tool_outputs", "function_calls", "actions"],
    0,
    "A requires_action run exposes required_action.submit_tool_outputs.tool_calls.");

  PY(T_AGENT, `
outputs = []
for call in tool_calls:
    args = json.loads(call.function.[BLANK])
    outputs.append({"tool_call_id": call.id, "output": run_tool(call.function.name, args)})`,
    "What replaces [BLANK]?",
    ["arguments", "parameters", "args", "input"],
    0,
    "The model returns the call arguments as a JSON string in call.function.arguments.");

  PY(T_AGENT, `
agents_client.runs.[BLANK](
    thread_id=thread.id, run_id=run.id, tool_outputs=outputs
)`,
    "What replaces [BLANK]?",
    ["submit_tool_outputs", "complete_tool_calls", "resume", "post_outputs"],
    0,
    "submit_tool_outputs hands the results back so the run can continue.");

  PY(T_AGENT, `
agent = agents_client.create_agent(
    model=MODEL, name="ticket-triage", tools=tools,
    [BLANK]="required",
)`,
    "The agent sometimes answers without calling any tool. What replaces [BLANK] to force a tool call on every run?",
    ["tool_choice", "force_tools", "tool_mode", "require_tools"],
    0,
    "tool_choice='required' makes the model call at least one tool per run; the default 'auto' lets it skip them.");

  PY(T_AGENT, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    tool_choice=[BLANK],
)`,
    "The run must deterministically invoke the MCP tool. What replaces [BLANK]?",
    ['{"type": "mcp"}', '{"required"}', '"any"', '{"tool": "mcp"}'],
    0,
    "Naming the tool type in the tool_choice object pins the run to that specific tool.");

  PY(T_AGENT, `
agent = agents_client.create_agent(
    model=MODEL, instructions=INSTRUCTIONS,
    [BLANK]=0.1,
)`,
    "Responses must be as deterministic as possible. What replaces [BLANK]?",
    ["temperature", "top_k", "seed", "determinism"],
    0,
    "A low temperature reduces sampling randomness; top_k is not a parameter of this API.");

  PY(T_AGENT, `
agent = agents_client.create_agent(
    model=MODEL,
    response_format={"type": "[BLANK]", "json_schema": SCHEMA},
)`,
    "The agent must always return an object matching a strict schema. What replaces [BLANK]?",
    ["json_schema", "json_object", "structured", "schema"],
    0,
    "response_format type json_schema enforces the supplied schema; json_object only guarantees valid JSON.");

  PY(T_AGENT, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    [BLANK]={"scenario": "ticket-triage", "tenant": "contoso"},
)`,
    "Arbitrary key/value tags must be attached to the run for later filtering. What replaces [BLANK]?",
    ["metadata", "tags", "labels", "context"],
    0,
    "Runs accept a metadata dictionary of up to 16 key/value pairs.");

  PY(T_AGENT, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    [BLANK]=4000,
)`,
    "The cost per run must be capped on the input side. What replaces [BLANK]?",
    ["max_prompt_tokens", "max_completion_tokens", "max_tokens", "context_limit"],
    0,
    "max_prompt_tokens caps the context sent to the model; max_completion_tokens caps the generated output.");

  PY(T_AGENT, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    [BLANK]=False,
)`,
    "Tool calls must be executed strictly one at a time for auditability. What replaces [BLANK]?",
    ["parallel_tool_calls", "concurrent_tools", "async_tools", "batch_tools"],
    0,
    "parallel_tool_calls=False forces sequential tool execution.");

  PY(T_AGENT, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    [BLANK]="Reply in German for this run only.",
)`,
    "The extra guidance must apply to this run without changing the agent definition. What replaces [BLANK]?",
    ["additional_instructions", "instructions", "system_message", "override_instructions"],
    0,
    "additional_instructions is appended for a single run; instructions would replace the agent's own system message.");

  PY(T_AGENT, `
for step in agents_client.run_steps.list(thread_id=thread.id, run_id=run.id):
    print(step.type, step.[BLANK])`,
    "What replaces [BLANK] to inspect the inputs and outputs of each step?",
    ["step_details", "details", "payload", "data"],
    0,
    "Run steps expose step_details, which contains either message_creation or tool_calls.");

  PY(T_AGENT, `
with agents_client.runs.stream(thread_id=thread.id, agent_id=agent.id) as stream:
    stream.until_done()
# handler receives incremental deltas`,
    "Which base class do you subclass to react to streamed run events?",
    ["AgentEventHandler", "StreamHandler", "RunListener", "EventCallback"],
    0,
    "AgentEventHandler (or AsyncAgentEventHandler) exposes on_message_delta, on_thread_run and related hooks.");

  PY(T_AGENT, `
agents_client.[BLANK](
    agent_id=agent.id, instructions=NEW_INSTRUCTIONS
)`,
    "The agent's instructions must be changed in place. What replaces [BLANK]?",
    ["update_agent", "patch_agent", "modify_agent", "set_agent"],
    0,
    "update_agent applies changes to an existing agent definition.");

  PY(T_AGENT, `
with project:
    with project.agents as agents_client:
        ...`,
    "Why is the with statement used here?",
    [
      "It closes the underlying HTTP transport when the block exits",
      "It starts a transaction that is committed on exit",
      "It is required before any agent can be created",
      "It enables automatic retries"
    ],
    0,
    "Azure SDK clients hold a connection pool; the context manager releases it deterministically.");

  PY(T_THREAD, `
# The customer returns three days later to continue the same case.
thread_id = load_from_database(case_id)
run = agents_client.runs.create_and_process(
    [BLANK]=thread_id, agent_id=agent.id
)`,
    "What replaces [BLANK] so the full history, including tool calls and outputs, is reloaded automatically?",
    ["thread_id", "conversation", "history_id", "session_id"],
    0,
    "Persisting and reusing the thread ID is what gives cross-session continuity without rebuilding the transcript.");

  PY(T_THREAD, `
# Anti-pattern
new_thread = agents_client.threads.create()
agents_client.messages.create(
    thread_id=new_thread.id, role="user",
    content=previous_answer + "\\n" + new_question,
)`,
    "Why is this approach wrong for resuming a support case?",
    [
      "Tool calls and uploaded files from the earlier turns are lost",
      "Threads cannot contain more than one message",
      "The model cannot read concatenated strings",
      "Creating a thread per request is not allowed by the service"
    ],
    0,
    "Only the thread stores the complete interaction history; copying the last answer discards tool calls, tool outputs and attachments.");

  PY(T_THREAD, `
from azure.ai.agents.models import MemorySearchTool

memory_tool = MemorySearchTool(
    memory_store_name=STORE,
    scope=[BLANK],
)`,
    "Memories must be isolated per authenticated user without the client generating IDs. What replaces [BLANK]?",
    ['"{{$userId}}"', '"global"', '"{{$threadId}}"', "user_id_from_client"],
    0,
    "The {{$userId}} macro is resolved by the runtime from the authenticated principal.");

  PY(T_THREAD, `
# Requirement: remember the preferred airline across conversations,
# but discard the payment card after the conversation ends.
PREFERENCES_STORE = [BLANK]
PAYMENT_STORE = "session context"`,
    "What replaces [BLANK]?",
    [
      "persistent agent memory",
      "the same session context",
      "the thread metadata",
      "an environment variable"
    ],
    0,
    "Long-lived preferences belong in persistent memory; sensitive data stays in session context so it is dropped at the end.");

  PY(T_THREAD, `
thread = agents_client.threads.create(
    [BLANK]=[{"role": "user", "content": "Summarize my open tickets."}]
)`,
    "The thread should be created with an initial message. What replaces [BLANK]?",
    ["messages", "content", "history", "initial"],
    0,
    "threads.create accepts a messages list to seed the conversation.");

  PY(T_THREAD, `
thread = agents_client.threads.create(
    tool_resources=ToolResources(
        file_search=FileSearchToolResource(vector_store_ids=[vs.id])
    )
)`,
    "What does attaching tool_resources at the thread level achieve?",
    [
      "Only this conversation can search that vector store",
      "Every agent in the project gains access to the store",
      "The vector store is deleted when the thread ends",
      "The agent no longer needs the file search tool definition"
    ],
    0,
    "Thread-scoped tool resources limit the attached files to a single conversation, which is how per-chat uploads are handled.");

  PY(T_THREAD, `
run = agents_client.runs.create(
    thread_id=thread.id, agent_id=agent.id,
    truncation_strategy={"type": "[BLANK]", "last_messages": 10},
)`,
    "Only the most recent turns should be sent to the model. What replaces [BLANK]?",
    ["last_messages", "truncate", "window", "recent"],
    0,
    "The last_messages truncation strategy keeps a sliding window of the newest turns.");

  PY(T_THREAD, `
print(run.usage.[BLANK], run.usage.completion_tokens)`,
    "What replaces [BLANK] to read the input-side token count?",
    ["prompt_tokens", "input_tokens", "context_tokens", "request_tokens"],
    0,
    "Run usage exposes prompt_tokens, completion_tokens and total_tokens.");

  PY(T_THREAD, `
agents_client.threads.[BLANK](thread_id=thread.id)
# GDPR deletion request for one customer`,
    "What replaces [BLANK]?",
    ["delete", "purge", "remove", "clear"],
    0,
    "threads.delete removes the conversation and its messages.");

  PY(T_AGENT, `
run = agents_client.runs.[BLANK](thread_id=thread.id, run_id=run.id)
# the user pressed Stop in the UI`,
    "What replaces [BLANK]?",
    ["cancel", "stop", "abort", "terminate"],
    0,
    "runs.cancel requests cancellation of an in-flight run.");

  PY(T_AGENT, `
TERMINAL = {"completed", "failed", "cancelled", "[BLANK]"}
while run.status not in TERMINAL:
    ...`,
    "Which additional terminal run status is missing?",
    ["expired", "queued", "in_progress", "requires_action"],
    0,
    "Runs end in completed, failed, cancelled or expired; the other values are non-terminal.");

  PY(T_AGENT, `
agents = agents_client.[BLANK]()
for a in agents:
    print(a.id, a.name)`,
    "What replaces [BLANK]?",
    ["list_agents", "get_agents", "agents.all", "query_agents"],
    0,
    "list_agents enumerates the agents in the project.");

  PY(T_AGENT, `
import asyncio
from azure.ai.agents.aio import AgentsClient

async def main():
    async with AgentsClient(endpoint=EP, credential=cred) as client:
        run = [BLANK] client.runs.create_and_process(
            thread_id=thread.id, agent_id=agent.id
        )`,
    "What replaces [BLANK]?",
    ["await", "yield", "async", "return"],
    0,
    "Async client methods are coroutines and must be awaited.");

  PY(T_AGENT, `
agent = agents_client.create_agent(
    model=MODEL,
    name="refund-agent",
    [BLANK]="Handles refunds for the billing workflow.",
)`,
    "A human-readable summary shown in the portal goes into which parameter?",
    ["description", "instructions", "summary", "notes"],
    0,
    "description documents the agent; instructions drive its behaviour.");

  PY(T_THREAD, `
messages = agents_client.messages.list(thread_id=thread.id)
for m in messages:
    for ann in m.[BLANK]:
        print(ann.file_citation.file_id, ann.text)`,
    "What replaces [BLANK] to read file citations returned by file search?",
    ["file_citation_annotations", "annotations", "citations", "references"],
    0,
    "Text content exposes file_citation_annotations (and url_citation_annotations for web grounding).");

  PY(T_THREAD, `
for ann in message.[BLANK]:
    print(ann.url_citation.title, ann.url_citation.url)`,
    "The agent used Grounding with Bing Search. What replaces [BLANK]?",
    ["url_citation_annotations", "file_citation_annotations", "web_annotations", "links"],
    0,
    "Bing grounding results are surfaced as url_citation_annotations, which carry the required attribution links.");

  PY(T_AGENT, `
run = agents_client.runs.create_and_process(
    thread_id=thread.id, agent_id=agent.id
)
print(run.[BLANK])  # "gpt-4o"`,
    "What replaces [BLANK] to confirm which deployment served the run?",
    ["model", "deployment", "engine", "model_name"],
    0,
    "The run records the model deployment name it executed against.");

  PY(T_AGENT, `
# Requirement: the same agent definition must be reproducible across
# dev, test and production environments.
agent = agents_client.create_agent(model=os.environ["[BLANK]"], ...)`,
    "Which value should be externalized so the code is environment-independent?",
    ["MODEL_DEPLOYMENT_NAME", "MODEL_FAMILY", "AGENT_ID", "THREAD_ID"],
    0,
    "The deployment name differs per environment, so it is configuration, not code.");

  PY(T_THREAD, `
agents_client.messages.create(
    thread_id=thread.id,
    role="user",
    content="Summarize this file.",
    [BLANK]=[MessageAttachment(file_id=f.id, tools=CodeInterpreterTool().definitions)],
)`,
    "What replaces [BLANK]?",
    ["attachments", "files", "file_ids", "resources"],
    0,
    "Per-message files are passed through attachments, each binding a file to the tools that may read it.");

  PY(T_AGENT, `
handler = MyEventHandler()
with agents_client.runs.stream(
    thread_id=thread.id, agent_id=agent.id, [BLANK]=handler
) as stream:
    stream.until_done()`,
    "What replaces [BLANK]?",
    ["event_handler", "handler", "callback", "listener"],
    0,
    "The streaming API takes event_handler, an AgentEventHandler subclass.");

  PY(T_AGENT, `
class MyHandler(AgentEventHandler):
    def [BLANK](self, delta: MessageDeltaChunk) -> None:
        print(delta.text, end="", flush=True)`,
    "Which hook receives incremental text as the answer is generated?",
    ["on_message_delta", "on_message", "on_token", "on_text"],
    0,
    "on_message_delta fires for every streamed chunk of assistant text.");

  PY(T_THREAD, `
# Agent1 must never reveal customer information, even if a document that
# contains customer data is added to the grounding store by mistake.
guardrail = [BLANK]`,
    "Which control belongs here?",
    [
      "PII detection on the model output",
      "a lower temperature value",
      "a larger context window",
      "tool_choice set to required"
    ],
    0,
    "Output-side PII detection catches customer data that slipped into the retrieved context; sampling parameters cannot enforce it.");

  PY(T_AGENT, `
run = agents_client.runs.create_and_process(
    thread_id=thread.id, agent_id=agent.id,
    [BLANK]=30,
)`,
    "Which keyword controls how often create_and_process re-checks the run status?",
    ["polling_interval", "timeout", "retry_after", "sleep"],
    0,
    "create_and_process accepts polling_interval in seconds.");

  PY(T_THREAD, `
# The finance workflow must pause until a human approves the refund.
# In the YAML workflow definition the approval step type is:
STEP_TYPE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["ask_question", "basic_chat", "data_transformation", "human_review"],
    0,
    "ask_question suspends the workflow and waits for external human input.");
})();
