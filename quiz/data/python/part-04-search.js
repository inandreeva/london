/* Part 4 — Azure AI Search, RAG indexing, embeddings and inference parameters. */
(function () {
  var PY = window.PY;
  var T_SEARCH = "Azure AI Search & RAG";
  var T_INDEX = "Indexing & Skillsets";
  var T_INFER = "Models & Inference Parameters";

  PY(T_SEARCH, `
from azure.search.documents import SearchClient

client = SearchClient(
    endpoint=SEARCH_ENDPOINT, [BLANK]="products", credential=cred
)`,
    "What replaces [BLANK]?",
    ["index_name", "index", "name", "collection"],
    0,
    "SearchClient targets exactly one index, named through index_name.");

  PY(T_SEARCH, `
results = client.search(search_text="wireless mouse", [BLANK]=5)`,
    "Only the five best documents are needed. What replaces [BLANK]?",
    ["top", "limit", "size", "count"],
    0,
    "top limits the number of returned documents; include_total_count returns the match count.");

  PY(T_SEARCH, `
from azure.search.documents.models import VectorizedQuery

vq = VectorizedQuery(
    vector=embedding, [BLANK]=3, fields="contentVector"
)
results = client.search(search_text=None, vector_queries=[vq])`,
    "What replaces [BLANK]?",
    ["k_nearest_neighbors", "top_k", "k", "neighbors"],
    0,
    "VectorizedQuery uses k_nearest_neighbors to set how many vectors are retrieved.");

  PY(T_SEARCH, `
from azure.search.documents.models import [BLANK]

vq = [BLANK](text="how do I reset the device", k_nearest_neighbors=5, fields="contentVector")`,
    "The index has an integrated vectorizer, so the query text must be embedded by the service. What replaces [BLANK]?",
    ["VectorizableTextQuery", "VectorizedQuery", "TextQuery", "SemanticQuery"],
    0,
    "VectorizableTextQuery sends raw text and lets the index vectorizer create the embedding server-side.");

  PY(T_SEARCH, `
results = client.search(
    search_text="battery life",
    vector_queries=[vq],
)`,
    "What kind of retrieval does this perform?",
    [
      "Hybrid — keyword and vector results fused",
      "Vector only, because vector_queries overrides search_text",
      "Keyword only, because search_text takes priority",
      "Semantic re-ranking only"
    ],
    0,
    "Supplying both search_text and vector_queries triggers hybrid retrieval with reciprocal rank fusion.");

  PY(T_SEARCH, `
from azure.search.documents.models import QueryType

results = client.search(
    search_text=q, query_type=QueryType.SEMANTIC,
    [BLANK]="default-semantic-config",
)`,
    "What replaces [BLANK]?",
    ["semantic_configuration_name", "semantic_config", "config_name", "ranker"],
    0,
    "Semantic queries must name the semantic configuration defined on the index.");

  PY(T_SEARCH, `
results = client.search(search_text=q, [BLANK]=["id", "title", "content"])`,
    "Only three fields should be returned to keep the payload small. What replaces [BLANK]?",
    ["select", "fields", "projection", "include"],
    0,
    "select controls which stored fields come back with each hit.");

  PY(T_SEARCH, `
results = client.search(
    search_text=q, [BLANK]="category eq 'policy' and year ge 2024"
)`,
    "What replaces [BLANK]?",
    ["filter", "where", "query_filter", "odata"],
    0,
    "filter takes an OData expression evaluated against filterable fields.");

  PY(T_SEARCH, `
for r in results:
    print(r["@search.score"], r["[BLANK]"])`,
    "Semantic ranking is enabled and the re-ranked relevance is needed. What replaces [BLANK]?",
    ["@search.reranker_score", "@search.semantic_score", "@search.rank", "@search.relevance"],
    0,
    "@search.reranker_score carries the semantic re-ranker result; @search.score is the BM25/fusion score.");

  PY(T_SEARCH, `
results = client.search(
    search_text=q, query_type=QueryType.SEMANTIC,
    semantic_configuration_name=CFG,
    [BLANK]=QueryAnswerType.EXTRACTIVE,
)
print(results.get_answers())`,
    "What replaces [BLANK]?",
    ["query_answer", "answers", "answer_type", "extractive"],
    0,
    "query_answer requests semantic answers, retrievable with get_answers().");

  PY(T_SEARCH, `
client.[BLANK](documents=[{"id": "1", "content": "..."}])`,
    "New documents must be inserted and existing ones updated in one call. What replaces [BLANK]?",
    ["merge_or_upload_documents", "upload_documents", "merge_documents", "index_documents"],
    0,
    "merge_or_upload_documents upserts; merge_documents fails when the key does not exist.");

  PY(T_SEARCH, `
client.[BLANK](documents=[{"id": "1"}])`,
    "What removes a document from the index by key?",
    ["delete_documents", "remove_documents", "drop_documents", "purge_documents"],
    0,
    "delete_documents removes documents identified by their key field.");

  PY(T_SEARCH, `
print(client.[BLANK]())
# confirm that indexing produced the expected number of chunks`,
    "What replaces [BLANK]?",
    ["get_document_count", "count_documents", "document_count", "get_count"],
    0,
    "get_document_count returns the number of documents currently in the index.");

  PY(T_INDEX, `
from azure.search.documents.indexes import SearchIndexClient

index_client = SearchIndexClient(endpoint=EP, credential=cred)
index_client.[BLANK](index)`,
    "What replaces [BLANK]?",
    ["create_or_update_index", "create_index", "save_index", "put_index"],
    0,
    "create_or_update_index is idempotent and is what deployment scripts use.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SearchField, SearchFieldDataType

SearchField(
    name="contentVector",
    type=SearchFieldDataType.Collection(SearchFieldDataType.[BLANK]),
    searchable=True,
    vector_search_dimensions=1536,
    vector_search_profile_name="hnsw-profile",
)`,
    "What replaces [BLANK] for an embedding field?",
    ["Single", "Double", "Int32", "String"],
    0,
    "Embeddings are stored as Collection(Edm.Single), a collection of 32-bit floats.");

  PY(T_INDEX, `
SearchField(
    name="contentVector", type=VECTOR_TYPE, searchable=True,
    [BLANK]=1536,
    vector_search_profile_name="hnsw-profile",
)`,
    "The embedding model is text-embedding-3-small at default size. What replaces [BLANK]?",
    ["vector_search_dimensions", "dimensions", "vector_size", "embedding_length"],
    0,
    "vector_search_dimensions must match the embedding model's output size exactly.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import VectorSearch, VectorSearchProfile, [BLANK]

vector_search = VectorSearch(
    algorithms=[[BLANK](name="hnsw-config")],
    profiles=[VectorSearchProfile(name="hnsw-profile", algorithm_configuration_name="hnsw-config")],
)`,
    "What replaces [BLANK] for approximate nearest-neighbour search?",
    ["HnswAlgorithmConfiguration", "ExhaustiveKnnAlgorithmConfiguration", "IvfAlgorithmConfiguration", "AnnConfiguration"],
    0,
    "HNSW is the approximate ANN algorithm; ExhaustiveKnn performs an exact but slower scan.");

  PY(T_INDEX, `
vector_search = VectorSearch(
    algorithms=[...], profiles=[...],
    [BLANK]=[AzureOpenAIVectorizer(
        vectorizer_name="openai-vec",
        parameters=AzureOpenAIVectorizerParameters(
            resource_url=AOAI_EP, deployment_name="text-embedding-3-small",
            model_name="text-embedding-3-small",
        ),
    )],
)`,
    "What replaces [BLANK] so query text can be embedded by the service?",
    ["vectorizers", "embedders", "encoders", "models"],
    0,
    "A vectorizer attached to the profile lets the index embed query text, enabling VectorizableTextQuery.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SemanticConfiguration, SemanticPrioritizedFields, SemanticField

SemanticConfiguration(
    name="default-semantic-config",
    prioritized_fields=SemanticPrioritizedFields(
        title_field=SemanticField(field_name="title"),
        [BLANK]=[SemanticField(field_name="content")],
    ),
)`,
    "What replaces [BLANK]?",
    ["content_fields", "body_fields", "text_fields", "prioritized_content"],
    0,
    "SemanticPrioritizedFields takes title_field, content_fields and keywords_fields.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SimpleField, SearchFieldDataType

SimpleField(name="id", type=SearchFieldDataType.String, [BLANK]=True)`,
    "Every index needs exactly one of these. What replaces [BLANK]?",
    ["key", "primary", "unique", "identifier"],
    0,
    "key=True marks the document key field.");

  PY(T_INDEX, `
SimpleField(name="category", type=SearchFieldDataType.String,
            filterable=True, [BLANK]=True)`,
    "The UI must show counts per category. What replaces [BLANK]?",
    ["facetable", "groupable", "aggregatable", "countable"],
    0,
    "facetable enables faceted navigation with per-value counts.");

  PY(T_INDEX, `
from azure.search.documents.indexes import SearchIndexerClient

indexer_client = SearchIndexerClient(endpoint=EP, credential=cred)
indexer_client.[BLANK](indexer)`,
    "What replaces [BLANK]?",
    ["create_or_update_indexer", "create_indexer", "run_indexer", "save_indexer"],
    0,
    "create_or_update_indexer registers the indexer; run_indexer triggers an on-demand run.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import IndexingParameters, IndexingParametersConfiguration

params = IndexingParameters(
    configuration=IndexingParametersConfiguration(
        [BLANK]="generateNormalizedImages",
        parsing_mode="default",
        query_timeout=None,
    )
)`,
    "Embedded images must be extracted so the OCR skill can read them. What replaces [BLANK]?",
    ["image_action", "ocr_action", "extract_images", "media_action"],
    0,
    "image_action='generateNormalizedImages' produces the normalized_images collection required by the OCR skill.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import OcrSkill, InputFieldMappingEntry

OcrSkill(
    inputs=[InputFieldMappingEntry(name="image", source="[BLANK]")],
    outputs=[OutputFieldMappingEntry(name="text", target_name="ocrText")],
    context="/document/normalized_images/*",
)`,
    "What replaces [BLANK]?",
    [
      '"/document/normalized_images/*"',
      '"/document/content"',
      '"/document/images"',
      '"/document/metadata_storage_path"'
    ],
    0,
    "The OCR skill consumes the normalized_images collection produced during document cracking, not the content field.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SplitSkill

SplitSkill(
    text_split_mode="[BLANK]",
    maximum_page_length=2000,
    page_overlap_length=200,
)`,
    "Long documents must be chunked into passages. What replaces [BLANK]?",
    ["pages", "sentences", "paragraphs", "tokens"],
    0,
    "text_split_mode='pages' produces overlapping chunks sized by maximum_page_length.");

  PY(T_INDEX, `
SplitSkill(
    text_split_mode="pages", maximum_page_length=2000,
    [BLANK]=200,
)`,
    "Sentences must not be cut in half between chunks. What replaces [BLANK]?",
    ["page_overlap_length", "overlap", "stride", "margin"],
    0,
    "page_overlap_length repeats text between adjacent chunks so context is not lost at the boundary.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import AzureOpenAIEmbeddingSkill

AzureOpenAIEmbeddingSkill(
    resource_url=AOAI_EP,
    deployment_name="text-embedding-3-small",
    inputs=[InputFieldMappingEntry(name="text", source="/document/pages/*")],
    outputs=[OutputFieldMappingEntry(name="embedding", target_name="vector")],
)`,
    "What does this skill do inside the skillset?",
    [
      "Generates embeddings for each chunk during indexing",
      "Calls the chat model to summarize each chunk",
      "Translates each chunk",
      "Runs OCR on each chunk"
    ],
    0,
    "Integrated vectorization embeds chunks at index time so no separate embedding pipeline is needed.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SearchIndexerIndexProjection, SearchIndexerIndexProjectionSelector

projection = SearchIndexerIndexProjection(
    selectors=[SearchIndexerIndexProjectionSelector(
        target_index_name="chunks",
        [BLANK]="parent_id",
        source_context="/document/pages/*",
        mappings=[...],
    )]
)`,
    "What replaces [BLANK] so each chunk can be traced back to its source document?",
    ["parent_key_field_name", "parent_field", "source_key", "document_key"],
    0,
    "Index projections write one row per chunk and store the originating document key in parent_key_field_name.");

  PY(T_INDEX, `
indexer = SearchIndexer(
    name="pdf-indexer", data_source_name=DS, target_index_name=IDX,
    skillset_name=SKILLSET,
    [BLANK]=[FieldMapping(source_field_name="metadata_storage_path",
                          target_field_name="filepath")],
)`,
    "Blob metadata must be copied into an index field before the skillset runs. What replaces [BLANK]?",
    ["field_mappings", "output_field_mappings", "projections", "mappings"],
    0,
    "field_mappings apply to raw source fields; output_field_mappings apply to enriched values produced by skills.");

  PY(T_INDEX, `
indexer = SearchIndexer(
    ...,
    [BLANK]=[FieldMapping(source_field_name="/document/ocrText",
                          target_field_name="ocr_text")],
)`,
    "The value produced by the OCR skill must land in the index. What replaces [BLANK]?",
    ["output_field_mappings", "field_mappings", "skill_mappings", "enrichment_mappings"],
    0,
    "Enriched values from the skillset are written through output_field_mappings.");

  PY(T_INDEX, `
status = indexer_client.[BLANK]("pdf-indexer")
print(status.last_result.status, status.last_result.error_message)`,
    "What replaces [BLANK]?",
    ["get_indexer_status", "get_status", "indexer_status", "check_indexer"],
    0,
    "get_indexer_status reports execution history and failures, the first place to look when retrieval degrades.");

  PY(T_INDEX, `
from azure.search.documents.indexes.models import SearchIndexerDataSourceConnection

ds = SearchIndexerDataSourceConnection(
    name="pdf-blobs",
    type="[BLANK]",
    connection_string=CONN,
    container=SearchIndexerDataContainer(name="product-sheets"),
)`,
    "Source PDFs live in Azure Blob Storage. What replaces [BLANK]?",
    ["azureblob", "blob", "azurestorage", "storage"],
    0,
    "The data source type string for Blob Storage is azureblob.");

  PY(T_SEARCH, `
embedding = aoai.embeddings.create(
    model="text-embedding-3-small", input=chunk
).data[0].[BLANK]`,
    "What replaces [BLANK]?",
    ["embedding", "vector", "values", "data"],
    0,
    "Each item in .data exposes .embedding, the list of floats.");

  PY(T_SEARCH, `
resp = aoai.embeddings.create(
    model="text-embedding-3-large", input=chunks, [BLANK]=256
)`,
    "The vectors must be shortened to cut index size. What replaces [BLANK]?",
    ["dimensions", "size", "length", "truncate"],
    0,
    "text-embedding-3 models support the dimensions parameter for Matryoshka truncation.");

  PY(T_SEARCH, `
resp = aoai.embeddings.create(model=MODEL, input=[BLANK])`,
    "Two hundred chunks must be embedded with as few HTTP calls as possible. What replaces [BLANK]?",
    ["chunks", "chunks[0]", 'str(chunks)', '"".join(chunks)'],
    0,
    "The embeddings API accepts a list of strings and returns one vector per element.");

  PY(T_SEARCH, `
# Complex questions must draw on several chunks, multi-turn context must
# influence planning, and sub-queries must run in parallel.
APPROACH = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["agentic retrieval", "classic RAG", "iterative retrieval", "chain of thought"],
    0,
    "Agentic retrieval decomposes the question using conversation history and executes the sub-queries in parallel.");

  PY(T_INDEX, `
# Scanned PDFs with multi-page tables. Requirements: OCR, structure-aware
# chunks that keep tables and headings, page numbers stored per chunk.
INGESTION = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "advanced data parsing",
      "basic parsing with fixed-size chunking",
      "one chunk per page",
      "plain text extraction"
    ],
    0,
    "Advanced parsing performs OCR plus layout-aware chunking and preserves page metadata.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT,
    messages=messages,
    [BLANK]=0,
)`,
    "The same prompt must produce the same classification every time. What replaces [BLANK]?",
    ["temperature", "top_p", "frequency_penalty", "presence_penalty"],
    0,
    "temperature=0 makes sampling greedy and as deterministic as the service allows.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages, temperature=0, [BLANK]=42
)`,
    "Reproducibility across runs should be improved further. What replaces [BLANK]?",
    ["seed", "random_state", "nonce", "run_id"],
    0,
    "seed requests best-effort deterministic sampling; the response returns system_fingerprint to detect backend changes.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages,
    response_format={"type": "[BLANK]"},
)`,
    "The answer must be syntactically valid JSON, with the shape described in the prompt. What replaces [BLANK]?",
    ["json_object", "json", "text", "structured_output"],
    0,
    "json_object guarantees parsable JSON; json_schema additionally enforces a supplied schema.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages,
    response_format={
        "type": "json_schema",
        "json_schema": {"name": "ticket", "schema": SCHEMA, "[BLANK]": True},
    },
)`,
    "The service must reject any output that deviates from the schema. What replaces [BLANK]?",
    ["strict", "enforce", "validate", "required"],
    0,
    "strict=True switches on constrained decoding against the schema.");

  PY(T_INFER, `
stream = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages, [BLANK]=True
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,
    "What replaces [BLANK]?",
    ["stream", "streaming", "incremental", "sse"],
    0,
    "stream=True returns an iterator of delta chunks instead of one complete response.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages, [BLANK]=800
)`,
    "The answer must never exceed roughly 800 tokens. What replaces [BLANK]?",
    ["max_tokens", "max_length", "token_limit", "max_prompt_tokens"],
    0,
    "max_tokens (max_completion_tokens on newer models) caps the generated output, not the prompt.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages, [BLANK]=["\\nUser:"]
)`,
    "Generation must halt at a marker string. What replaces [BLANK]?",
    ["stop", "stop_words", "terminator", "end_token"],
    0,
    "stop accepts up to four sequences that end generation when produced.");

  PY(T_INFER, `
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage

response = client.[BLANK](
    model=DEPLOYMENT,
    messages=[SystemMessage("You are terse."), UserMessage("Define RAG.")],
)`,
    "What replaces [BLANK] in the azure-ai-inference SDK?",
    ["complete", "create", "chat", "generate"],
    0,
    "ChatCompletionsClient exposes complete(); the OpenAI SDK uses chat.completions.create().");

  PY(T_INFER, `
print(response.choices[0].message.[BLANK])`,
    "What replaces [BLANK] to read the generated text?",
    ["content", "text", "value", "output"],
    0,
    "The assistant message carries the answer in .content.");

  PY(T_INFER, `
print(response.usage.prompt_tokens, response.usage.[BLANK])
# investigating a cost increase with unchanged traffic volume`,
    "What replaces [BLANK]?",
    ["completion_tokens", "output_size", "generated_tokens", "answer_tokens"],
    0,
    "Splitting prompt_tokens from completion_tokens shows whether input growth or output growth drives cost.");

  PY(T_INFER, `
# High-volume chat app: most traffic is simple FAQ, some needs reasoning.
# Costs and latency must drop without hurting the hard questions.
STRATEGY = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "a model cascade routing requests to different deployments",
      "route everything to the smallest model",
      "route everything to the largest model",
      "raise max_tokens for every request"
    ],
    0,
    "A cascade sends cheap traffic to a small model and escalates only complex requests.");

  PY(T_INFER, `
response = client.chat.completions.create(
    model=DEPLOYMENT, messages=messages, [BLANK]=0.9
)
# temperature is left at its default`,
    "Which nucleus-sampling parameter is being set?",
    ["top_p", "top_k", "typical_p", "nucleus"],
    0,
    "top_p is nucleus sampling; it is generally tuned instead of temperature, not alongside it.");

  PY(T_INFER, `
messages = [
    {"role": "[BLANK]", "content": "You answer only questions about Contoso products."},
    {"role": "user", "content": question},
]`,
    "The scope and refusal boundary belong in which role?",
    ["system", "user", "assistant", "developer"],
    0,
    "The system message is the highest-priority instruction and is where operating boundaries go.");
})();
