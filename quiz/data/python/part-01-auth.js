/* Part 1 — authentication, identity, project client, connections, RBAC. */
(function () {
  var PY = window.PY;
  var T_AUTH = "Authentication & Identity";
  var T_PROJ = "AIProjectClient & Connections";
  var T_RBAC = "RBAC & Secure Access";

  PY(T_AUTH, `
import os
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=[BLANK],
)`,
    "The app runs on Azure Container Apps with a managed identity, and company policy forbids API keys. What replaces [BLANK]?",
    ['DefaultAzureCredential()', 'AzureKeyCredential(os.environ["KEY"])', 'None', '"DefaultAzureCredential"'],
    0,
    "DefaultAzureCredential resolves the managed identity at runtime and requires no stored key.");

  PY(T_AUTH, `
from azure.identity import ManagedIdentityCredential

credential = ManagedIdentityCredential([BLANK]="8f1a2b3c-...-e2")`,
    "The container has two user-assigned managed identities, so the correct one must be selected. What replaces [BLANK]?",
    ["client_id", "tenant_id", "principal_name", "object_name"],
    0,
    "ManagedIdentityCredential selects a user-assigned identity by its client_id.");

  PY(T_AUTH, `
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential([BLANK])`,
    "A CI job authenticates with a service principal. Which argument list is correct?",
    [
      'tenant_id=TENANT, client_id=CLIENT, client_secret=SECRET',
      'client_id=CLIENT, client_secret=SECRET, subscription_id=SUB',
      'tenant_id=TENANT, principal_id=PRINCIPAL, secret=SECRET',
      'endpoint=ENDPOINT, client_id=CLIENT, key=SECRET'
    ],
    0,
    "ClientSecretCredential takes tenant_id, client_id and client_secret in that order.");

  PY(T_AUTH, `
credential = DefaultAzureCredential()
token = credential.get_token([BLANK])`,
    "The token must be valid for a Microsoft Foundry / Azure AI Services data-plane call. What replaces [BLANK]?",
    [
      '"https://cognitiveservices.azure.com/.default"',
      '"https://management.azure.com/.default"',
      '"https://graph.microsoft.com/.default"',
      '"https://vault.azure.net/.default"'
    ],
    0,
    "Azure AI Services data-plane tokens use the cognitiveservices.azure.com scope; management.azure.com is the control plane.");

  PY(T_AUTH, `
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import AzureOpenAI

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default"
)
client = AzureOpenAI(
    azure_endpoint=ENDPOINT,
    api_version="2024-10-21",
    [BLANK]=token_provider,
)`,
    "What replaces [BLANK] so the OpenAI client uses Microsoft Entra tokens?",
    ["azure_ad_token_provider", "api_key", "credential", "bearer_token"],
    0,
    "AzureOpenAI accepts azure_ad_token_provider, a callable that returns a fresh bearer token for each request.");

  PY(T_AUTH, `
import asyncio
from [BLANK] import DefaultAzureCredential

async def main():
    async with DefaultAzureCredential() as credential:
        ...`,
    "The application is fully asynchronous. What replaces [BLANK]?",
    ["azure.identity.aio", "azure.identity", "azure.identity.async", "azure.core.identity"],
    0,
    "Async credentials live in azure.identity.aio; the synchronous classes cannot be used with async with.");

  PY(T_AUTH, `
from azure.identity import ChainedTokenCredential, ManagedIdentityCredential, AzureCliCredential

credential = [BLANK](ManagedIdentityCredential(), AzureCliCredential())`,
    "The app should try the managed identity first and fall back to the Azure CLI login locally. What replaces [BLANK]?",
    ["ChainedTokenCredential", "DefaultAzureCredential", "ClientSecretCredential", "CompositeTokenCredential"],
    0,
    "ChainedTokenCredential tries each credential in the given order and returns the first token it obtains.");

  PY(T_AUTH, `
from azure.identity import EnvironmentCredential

credential = EnvironmentCredential()`,
    "Which set of environment variables makes EnvironmentCredential work for a service principal with a secret?",
    [
      "AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET",
      "AZURE_SUBSCRIPTION_ID, AZURE_CLIENT_ID, AZURE_KEY",
      "AZURE_TENANT, AZURE_APP_ID, AZURE_PASSWORD",
      "AZURE_ENDPOINT, AZURE_API_KEY",
    ],
    0,
    "EnvironmentCredential reads AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET (or certificate variables).");

  PY(T_AUTH, `
from azure.identity import [BLANK]

# developer workstation, already signed in with: az login
credential = [BLANK]()`,
    "Which credential reuses the local Azure CLI sign-in and nothing else?",
    ["AzureCliCredential", "InteractiveBrowserCredential", "DeviceCodeCredential", "SharedTokenCacheCredential"],
    0,
    "AzureCliCredential shells out to the az CLI token cache; the others start a new interactive sign-in.");

  PY(T_AUTH, `
from azure.identity import [BLANK]

# pod on AKS with a federated service-account token
credential = [BLANK]()`,
    "The workload runs on AKS with Microsoft Entra Workload ID. What replaces [BLANK]?",
    ["WorkloadIdentityCredential", "ManagedIdentityCredential", "ClientSecretCredential", "AzurePipelinesCredential"],
    0,
    "WorkloadIdentityCredential exchanges the projected Kubernetes service-account token for an Entra token.");

  PY(T_AUTH, `
from azure.identity import CertificateCredential

credential = CertificateCredential(
    tenant_id=TENANT, client_id=CLIENT, [BLANK]="/secrets/app.pem"
)`,
    "What replaces [BLANK]?",
    ["certificate_path", "certificate", "cert_file", "pem_path"],
    0,
    "CertificateCredential accepts certificate_path (or certificate_data for in-memory bytes).");

  PY(T_AUTH, `
credential = DefaultAzureCredential(
    [BLANK]=os.environ["AZURE_CLIENT_ID"]
)`,
    "DefaultAzureCredential must bind to a specific user-assigned managed identity. What replaces [BLANK]?",
    ["managed_identity_client_id", "client_id", "identity_id", "user_assigned_id"],
    0,
    "DefaultAzureCredential exposes managed_identity_client_id for user-assigned identities.");

  PY(T_AUTH, `
credential = DefaultAzureCredential()
try:
    client.do_work()
finally:
    credential.[BLANK]()`,
    "The credential holds an HTTP transport that must be released. What replaces [BLANK]?",
    ["close", "dispose", "release", "shutdown"],
    0,
    "Azure SDK credentials expose close(); using them as a context manager does the same.");

  PY(T_AUTH, `
from [BLANK] import AzureKeyCredential

credential = AzureKeyCredential(os.environ["SEARCH_KEY"])`,
    "What replaces [BLANK]?",
    ["azure.core.credentials", "azure.identity", "azure.ai.projects", "azure.core.pipeline"],
    0,
    "AzureKeyCredential ships in azure.core.credentials; azure.identity only contains Entra credentials.");

  PY(T_AUTH, `
token = credential.get_token(SCOPE)
if token.[BLANK] - time.time() < 300:
    token = credential.get_token(SCOPE)`,
    "What replaces [BLANK] to read the token expiry as a POSIX timestamp?",
    ["expires_on", "expires_in", "expiry", "valid_until"],
    0,
    "AccessToken exposes token and expires_on, an epoch-seconds integer.");

  PY(T_AUTH, `
from azure.identity import DefaultAzureCredential, [BLANK]

try:
    token = DefaultAzureCredential().get_token(SCOPE)
except [BLANK]:
    raise SystemExit("No Azure identity is available in this environment.")`,
    "Which exception is raised when no credential in the chain can produce a token?",
    ["CredentialUnavailableError", "ClientAuthenticationError", "HttpResponseError", "ServiceRequestError"],
    0,
    "CredentialUnavailableError means the credential could not even attempt authentication; ClientAuthenticationError means it tried and was rejected.");

  PY(T_AUTH, `
from azure.identity import [BLANK]

# GitHub Actions workflow with an OIDC federated credential
credential = [BLANK](
    tenant_id=TENANT, client_id=CLIENT, func=get_github_oidc_token
)`,
    "The pipeline must authenticate without any stored secret. What replaces [BLANK]?",
    ["ClientAssertionCredential", "ClientSecretCredential", "DeviceCodeCredential", "EnvironmentCredential"],
    0,
    "ClientAssertionCredential exchanges an OIDC federated token for an Entra token, so no secret is stored in GitHub.");

  PY(T_AUTH, `
credential = DefaultAzureCredential()
token = credential.get_token([BLANK])
# used against https://mysearch.search.windows.net`,
    "What replaces [BLANK] for Azure AI Search data-plane calls?",
    [
      '"https://search.azure.com/.default"',
      '"https://cognitiveservices.azure.com/.default"',
      '"https://management.azure.com/.default"',
      '"https://search.windows.net/.default"'
    ],
    0,
    "The Azure AI Search data-plane audience is https://search.azure.com/.default.");

  PY(T_AUTH, `
from azure.search.documents import SearchClient
from azure.identity import DefaultAzureCredential

client = SearchClient(
    endpoint=SEARCH_ENDPOINT,
    index_name="products",
    credential=[BLANK],
)`,
    "Key-based access is disabled on the search service. What replaces [BLANK]?",
    ['DefaultAzureCredential()', 'AzureKeyCredential(ADMIN_KEY)', 'SEARCH_KEY', 'None'],
    0,
    "With keys disabled the client must present an Entra token, which DefaultAzureCredential supplies.");

  PY(T_AUTH, `
from azure.storage.blob import BlobServiceClient

client = BlobServiceClient(
    [BLANK]="https://storage1.blob.core.windows.net",
    credential=DefaultAzureCredential(),
)`,
    "What replaces [BLANK]?",
    ["account_url", "endpoint", "blob_endpoint", "url"],
    0,
    "BlobServiceClient takes account_url; most other Azure SDK clients use endpoint.");

  PY(T_AUTH, `
from azure.keyvault.secrets import SecretClient

client = SecretClient(
    [BLANK]="https://kv-contoso.vault.azure.net",
    credential=DefaultAzureCredential(),
)
secret = client.get_secret("external-api-key")`,
    "What replaces [BLANK]?",
    ["vault_url", "endpoint", "account_url", "vault_endpoint"],
    0,
    "SecretClient is constructed with vault_url.");

  PY(T_AUTH, `
delegation_key = blob_service.get_user_delegation_key(start, expiry)
sas = generate_blob_sas(
    account_name=ACCOUNT, container_name=CONTAINER, blob_name=BLOB,
    [BLANK]=delegation_key,
    permission=BlobSasPermissions(read=True), expiry=expiry,
)`,
    "The SAS must be signed with Entra, not the account key. What replaces [BLANK]?",
    ["user_delegation_key", "account_key", "credential", "signing_key"],
    0,
    "A user delegation SAS is signed with the user delegation key obtained from Entra, so no account key is needed.");

  PY(T_PROJ, `
from [BLANK] import AIProjectClient`,
    "What replaces [BLANK]?",
    ["azure.ai.projects", "azure.ai.foundry", "azure.ai.agents", "azure.ai.ml"],
    0,
    "AIProjectClient lives in the azure-ai-projects package.");

  PY(T_PROJ, `
project = AIProjectClient(
    endpoint="[BLANK]",
    credential=DefaultAzureCredential(),
)`,
    "Which endpoint format does AIProjectClient expect?",
    [
      "https://contoso.services.ai.azure.com/api/projects/project1",
      "https://contoso.openai.azure.com/",
      "https://contoso.cognitiveservices.azure.com/project1",
      "https://project1.services.ai.azure.com/"
    ],
    0,
    "The project endpoint includes the /api/projects/<project-name> path segment.");

  PY(T_PROJ, `
conn = project.connections.get(
    name="search-conn",
    [BLANK]=True,
)
key = conn.credentials.key`,
    "The code must read the secret stored in the connection. What replaces [BLANK]?",
    ["include_credentials", "with_secrets", "reveal_keys", "include_secrets"],
    0,
    "connections.get only returns metadata unless include_credentials=True is passed.");

  PY(T_PROJ, `
from azure.ai.projects.models import ConnectionType

for conn in project.connections.list([BLANK]=ConnectionType.AZURE_AI_SEARCH):
    print(conn.name, conn.id)`,
    "What replaces [BLANK]?",
    ["connection_type", "type", "kind", "category"],
    0,
    "connections.list filters by connection_type using the ConnectionType enum.");

  PY(T_PROJ, `
with project.[BLANK](api_version="2025-04-01-preview") as openai_client:
    response = openai_client.responses.create(model=DEPLOYMENT, input="hi")`,
    "What replaces [BLANK] to obtain an OpenAI SDK client pre-wired to the project?",
    ["get_openai_client", "openai_client", "get_inference_client", "inference.get_openai_client"],
    0,
    "AIProjectClient.get_openai_client() returns a configured AzureOpenAI client with the project's auth already applied.");

  PY(T_PROJ, `
from azure.monitor.opentelemetry import configure_azure_monitor

connection_string = project.telemetry.[BLANK]()
configure_azure_monitor(connection_string=connection_string)`,
    "What replaces [BLANK]?",
    [
      "get_application_insights_connection_string",
      "get_connection_string",
      "get_app_insights",
      "get_monitor_connection"
    ],
    0,
    "The project exposes the linked Application Insights connection string through telemetry.get_application_insights_connection_string().");

  PY(T_PROJ, `
agent = project.[BLANK].create_agent(
    model="gpt-4o",
    name="support-agent",
    instructions="You are a helpful support agent.",
)`,
    "What replaces [BLANK]?",
    ["agents", "agent", "assistants", "foundry_agents"],
    0,
    "AIProjectClient exposes the agent operations through the .agents property.");

  PY(T_PROJ, `
dataset = project.datasets.[BLANK](
    name="eval-data", version="1", file_path="./data.jsonl"
)`,
    "What replaces [BLANK] to upload a single local file as a dataset version?",
    ["upload_file", "create", "upload", "add_file"],
    0,
    "datasets.upload_file uploads one file; upload_folder handles a directory.");

  PY(T_PROJ, `
chat = project.inference.[BLANK]()
response = chat.complete(model=DEPLOYMENT, messages=[UserMessage("hi")])`,
    "What replaces [BLANK]?",
    ["get_chat_completions_client", "get_chat_client", "chat_completions", "get_client"],
    0,
    "project.inference exposes get_chat_completions_client(), get_embeddings_client() and get_image_embeddings_client().");

  PY(T_PROJ, `
import asyncio
from [BLANK] import AIProjectClient

async def main():
    async with AIProjectClient(endpoint=EP, credential=cred) as project:
        ...`,
    "What replaces [BLANK]?",
    ["azure.ai.projects.aio", "azure.ai.projects", "azure.ai.projects.asyncio", "azure.ai.aio.projects"],
    0,
    "The asynchronous client is exported from azure.ai.projects.aio.");

  PY(T_PROJ, `
for deployment in project.[BLANK].list():
    print(deployment.name, deployment.model_name, deployment.model_version)`,
    "What replaces [BLANK] to enumerate the model deployments of the project?",
    ["deployments", "models", "model_deployments", "endpoints"],
    0,
    "project.deployments lists the model deployments available to the project.");

  PY(T_PROJ, `
project.indexes.create_or_update(
    name="product-index",
    version="1",
    index=AzureAISearchIndex(
        connection_name="search-conn",
        [BLANK]="products",
    ),
)`,
    "What replaces [BLANK]?",
    ["index_name", "name", "search_index", "target_index"],
    0,
    "AzureAISearchIndex points at an existing search index by index_name through a named connection.");

  PY(T_RBAC, `
# The developers call the deployment with the Azure OpenAI v1 API and
# DefaultAzureCredential, but receive HTTP 403.
ROLE = "[BLANK]"`,
    "Which least-privilege built-in role allows model inference?",
    [
      "Cognitive Services OpenAI User",
      "Cognitive Services User",
      "Contributor",
      "Cognitive Services OpenAI Contributor"
    ],
    0,
    "Cognitive Services OpenAI User grants data-plane inference only; the Contributor roles add management or deployment rights that are not needed.");

  PY(T_RBAC, `
# The agent's managed identity reads grounding documents from Blob Storage
# and must not be able to write or delete them.
ROLE = "[BLANK]"`,
    "Which role should be assigned?",
    [
      "Storage Blob Data Reader",
      "Storage Blob Data Contributor",
      "Storage Blob Data Owner",
      "Reader"
    ],
    0,
    "Storage Blob Data Reader is the read-only data-plane role; Reader alone does not grant blob data access.");

  PY(T_RBAC, `
# The application only issues queries against an existing search index.
ROLE = "[BLANK]"`,
    "Which least-privilege role should the app's identity receive?",
    [
      "Search Index Data Reader",
      "Search Index Data Contributor",
      "Search Service Contributor",
      "Search Service Reader"
    ],
    0,
    "Search Index Data Reader allows querying documents; Data Contributor would also allow writing them.");

  PY(T_RBAC, `
# The indexer pipeline uploads and merges documents into the index.
ROLE = "[BLANK]"`,
    "Which role is required?",
    [
      "Search Index Data Contributor",
      "Search Index Data Reader",
      "Search Service Contributor",
      "Storage Blob Data Contributor"
    ],
    0,
    "Writing documents into an index is the Search Index Data Contributor data-plane role.");

  PY(T_RBAC, `
from azure.mgmt.authorization import AuthorizationManagementClient
from azure.mgmt.authorization.models import RoleAssignmentCreateParameters
import uuid

client.role_assignments.create(
    scope=SCOPE,
    role_assignment_name=[BLANK],
    parameters=RoleAssignmentCreateParameters(
        role_definition_id=ROLE_DEF_ID,
        principal_id=PRINCIPAL_ID,
        principal_type="ServicePrincipal",
    ),
)`,
    "What replaces [BLANK]?",
    ["str(uuid.uuid4())", '"agent-role-assignment"', "PRINCIPAL_ID", "ROLE_DEF_ID"],
    0,
    "A role assignment name must be a GUID that is unique within the scope.");

  PY(T_RBAC, `
parameters = RoleAssignmentCreateParameters(
    role_definition_id=ROLE_DEF_ID,
    principal_id=AGENT_MI_OBJECT_ID,
    [BLANK]="ServicePrincipal",
)`,
    "The assignment targets a managed identity. What replaces [BLANK]?",
    ["principal_type", "identity_type", "object_type", "principal_kind"],
    0,
    "Setting principal_type='ServicePrincipal' avoids replication delays when assigning to a brand-new managed identity.");

  PY(T_RBAC, `
SCOPE = "[BLANK]"
client.role_assignments.create(scope=SCOPE, ...)`,
    "The role must apply only to one storage account. Which scope string is correct?",
    [
      "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/storage1",
      "/subscriptions/<sub>",
      "/subscriptions/<sub>/resourceGroups/<rg>",
      "storage1"
    ],
    0,
    "Least privilege means scoping the assignment to the individual resource ID, not the resource group or subscription.");

  PY(T_RBAC, `
import logging

logging.getLogger("azure").setLevel(logging.[BLANK])
# Detailed HTTP logging must never be enabled in production because it
# can emit Authorization headers.`,
    "Which level keeps request/response bodies and headers out of the logs?",
    ["WARNING", "DEBUG", "NOTSET", "INFO"],
    0,
    "Azure SDK header/body logging happens at DEBUG; WARNING keeps credentials out of the log stream.");

  PY(T_RBAC, `
client = SearchClient(
    endpoint=EP, index_name=IDX, credential=cred,
    [BLANK]=5,
)`,
    "Which keyword raises the number of automatic retries on transient failures?",
    ["retry_total", "max_retries", "retry_count", "retries"],
    0,
    "azure-core clients accept retry_total (plus retry_backoff_factor) to tune the built-in retry policy.");

  PY(T_RBAC, `
from azure.core.exceptions import HttpResponseError

try:
    client.complete(...)
except HttpResponseError as ex:
    if ex.[BLANK] == 429:
        backoff_and_retry()`,
    "What replaces [BLANK]?",
    ["status_code", "code", "http_status", "response_code"],
    0,
    "HttpResponseError exposes status_code; 429 signals throttling.");

  PY(T_RBAC, `
from tenacity import retry, wait_random_exponential, stop_after_attempt

@retry(wait=[BLANK], stop=stop_after_attempt(6))
def call_model():
    return client.complete(...)`,
    "The retry policy must use exponential backoff with jitter. What replaces [BLANK]?",
    [
      "wait_random_exponential(min=1, max=60)",
      "wait_fixed(2)",
      "wait_none()",
      "wait_incrementing(start=1, increment=1)"
    ],
    0,
    "wait_random_exponential combines exponential growth with random jitter, the recommended mitigation for HTTP 429.");

  PY(T_RBAC, `
key = os.environ["EXTERNAL_API_KEY"]
payload = {"prompt": user_text, "api_key": [BLANK]}`,
    "Security review requires that no secret ever reaches a prompt, a tool argument or a span attribute. What should the code do?",
    [
      "Remove the key from the payload and let the tool connection inject it",
      "Send key but mark the span as private",
      "Send key[:4] + '***' so it is partially masked",
      "Base64-encode key before adding it to the payload"
    ],
    0,
    "Secrets belong in a project connection or Key Vault; masking or encoding still places credential material in model-visible data.");

  PY(T_RBAC, `
credential = DefaultAzureCredential()
project = AIProjectClient(endpoint=EP, credential=credential)
# The security group SC_Agent1_Dev must be granted access to the project.
ROLE = "[BLANK]"`,
    "Which Foundry role lets the group's members use the project's agents and models without managing the resource?",
    ["Azure AI User", "Owner", "Azure AI Account Owner", "Reader"],
    0,
    "Azure AI User (project-scoped) grants day-to-day use of project resources; Owner and Account Owner add management rights.");

  PY(T_AUTH, `
client = AzureOpenAI(
    azure_endpoint=ENDPOINT,
    azure_ad_token_provider=token_provider,
    [BLANK]="2024-10-21",
)`,
    "What replaces [BLANK]?",
    ["api_version", "version", "service_version", "api_ver"],
    0,
    "The Azure flavour of the OpenAI client always requires api_version.");

  PY(T_AUTH, `
provider = get_bearer_token_provider(credential, SCOPE)
token = [BLANK]`,
    "How is a fresh token obtained from the provider returned by get_bearer_token_provider?",
    ["provider()", "provider.get_token()", "provider.token", "await provider"],
    0,
    "get_bearer_token_provider returns a plain callable; calling it returns a cached-or-refreshed token string.");

  PY(T_AUTH, `
# Local development, no managed identity available, no CLI login,
# a browser is available.
credential = [BLANK]()`,
    "What replaces [BLANK]?",
    ["InteractiveBrowserCredential", "ManagedIdentityCredential", "EnvironmentCredential", "WorkloadIdentityCredential"],
    0,
    "InteractiveBrowserCredential opens a browser sign-in; the other options all require an environment that is not present.");

  PY(T_PROJ, `
agent_id = agent.id
# Later, in a completely different process:
agent = project.agents.[BLANK](agent_id)`,
    "What replaces [BLANK] to fetch an existing agent by ID?",
    ["get_agent", "get", "retrieve_agent", "load_agent"],
    0,
    "AgentsClient.get_agent(agent_id) returns an already-created agent definition.");
})();
