/* Part 6 — vision, image generation and editing, video, document processing,
   content safety, observability and evaluation. */
(function () {
  var PY = window.PY;
  var T_VISION = "Vision & Image Analysis";
  var T_IMGGEN = "Image Generation & Editing";
  var T_VIDEO = "Video Processing";
  var T_DOC = "Document Intelligence & Content Understanding";
  var T_SAFETY = "Content Safety & Guardrails";
  var T_OBS = "Observability & Tracing";
  var T_EVAL = "Evaluation";

  PY(T_VISION, `
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures

result = client.analyze(
    image_data=data, visual_features=[VisualFeatures.[BLANK]]
)
print(result.caption.text, result.caption.confidence)`,
    "One sentence describing the whole image is needed. What replaces [BLANK]?",
    ["CAPTION", "DENSE_CAPTIONS", "TAGS", "READ"],
    0,
    "CAPTION returns a single description; DENSE_CAPTIONS describes individual regions.");

  PY(T_VISION, `
result = client.analyze(
    image_data=data, visual_features=[VisualFeatures.[BLANK]]
)
for block in result.read.blocks:
    for line in block.lines:
        print(line.text)`,
    "Printed text must be extracted from a photo of a street sign, with no need to understand meaning. What replaces [BLANK]?",
    ["READ", "CAPTION", "OBJECTS", "SMART_CROPS"],
    0,
    "The READ feature is OCR; captioning would describe the scene instead of transcribing the characters.");

  PY(T_VISION, `
result = client.[BLANK](
    image_url="https://contoso.com/product.png",
    visual_features=[VisualFeatures.TAGS],
)`,
    "The image is already hosted publicly. What replaces [BLANK]?",
    ["analyze_from_url", "analyze", "analyze_url", "analyze_remote"],
    0,
    "analyze_from_url takes a URL; analyze takes raw bytes through image_data.");

  PY(T_VISION, `
result = client.analyze(
    image_data=data,
    visual_features=[VisualFeatures.CAPTION],
    [BLANK]=True,
)`,
    "The caption must avoid gendered nouns. What replaces [BLANK]?",
    ["gender_neutral_caption", "neutral_language", "inclusive_caption", "anonymize"],
    0,
    "gender_neutral_caption replaces terms such as 'man' or 'woman' with 'person'.");

  PY(T_VISION, `
result = client.analyze(
    image_data=data, visual_features=[VisualFeatures.SMART_CROPS],
    [BLANK]=[0.9, 1.33],
)`,
    "Thumbnails are required in two aspect ratios. What replaces [BLANK]?",
    ["smart_crops_aspect_ratios", "aspect_ratios", "crop_ratios", "thumbnails"],
    0,
    "smart_crops_aspect_ratios asks the service for one region of interest per requested ratio.");

  PY(T_VISION, `
# A support agent receives either text or a photo of a damaged device and
# must reason about both and reply in natural language.
MODEL = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["a multimodal model", "a text-only LLM with OCR", "an embedding model", "a small language model"],
    0,
    "Mixed text and image input with generated prose requires multimodal support; no prompt trick fixes a model that cannot accept images.");

  PY(T_IMGGEN, `
result = client.images.generate(
    model="gpt-image-1",
    prompt="A studio photo of a red running shoe on white background",
    [BLANK]="1024x1024",
)`,
    "What replaces [BLANK]?",
    ["size", "resolution", "dimensions", "shape"],
    0,
    "size takes a WIDTHxHEIGHT string supported by the deployed image model.");

  PY(T_IMGGEN, `
result = client.images.generate(
    model=DEPLOYMENT, prompt=PROMPT, response_format="[BLANK]"
)
image_bytes = base64.b64decode(result.data[0].b64_json)`,
    "The bytes must come back inline instead of as a temporary URL. What replaces [BLANK]?",
    ["b64_json", "url", "binary", "base64"],
    0,
    "response_format='b64_json' embeds the image in the response as base64.");

  PY(T_IMGGEN, `
result = client.images.[BLANK](
    model=DEPLOYMENT,
    image=open("room.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="Replace the masked sofa with a green velvet armchair",
)`,
    "What replaces [BLANK]?",
    ["edit", "generate", "inpaint", "variation"],
    0,
    "images.edit performs mask-based inpainting on an existing image.");

  PY(T_IMGGEN, `
# The mask PNG must mark the region the model is allowed to repaint.
MASK_RULE = "[BLANK]"`,
    "How must the mask be prepared?",
    [
      "Fully transparent pixels mark the area to be regenerated; opaque pixels are preserved",
      "White pixels are preserved and black pixels are regenerated",
      "The mask must be a JPEG the same size as the prompt",
      "The mask must be smaller than the source image"
    ],
    0,
    "The edit API repaints the transparent (alpha = 0) region and must have exactly the same dimensions as the source image.");

  PY(T_IMGGEN, `
# Requirement: remove a person from a photograph without changing anything
# else in the image.
TECHNIQUE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["inpainting with a mask", "outpainting", "text-to-image", "image-to-video"],
    0,
    "A localized edit that must leave the rest of the frame untouched is mask-based inpainting.");

  PY(T_IMGGEN, `
# Requirement: extend the canvas so the image becomes wider, generating
# plausible content beyond the original edges.
TECHNIQUE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["outpainting", "inpainting with a mask", "smart crop", "image variation"],
    0,
    "Outpainting generates content outside the original boundaries; inpainting only works inside them.");

  PY(T_IMGGEN, `
# Requirement: produce several stylistic alternatives of an existing
# product photo while keeping composition, lighting and subject.
MODE = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "image_variation with the original image as input",
      "mask_inpainting with a mask covering the whole image",
      "text_to_image describing the original photo",
      "image_to_image with strength set to 1.0"
    ],
    0,
    "Variations keep the composition; strength 1.0 would discard the original entirely.");

  PY(T_IMGGEN, `
result = client.images.edit(
    model=DEPLOYMENT, image=photo, prompt=PROMPT,
    [BLANK]="high",
)`,
    "The generated image must retain the product's identity and visual characteristics. What replaces [BLANK]?",
    ["input_fidelity", "similarity", "strength", "guidance"],
    0,
    "input_fidelity='high' instructs the image model to stay close to the supplied reference.");

  PY(T_IMGGEN, `
# The sky in a landscape photo must become a sunset while every
# foreground object is preserved untouched.
PLAN = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "supply the original image plus a mask covering only the sky",
      "regenerate the image from a text prompt",
      "use image_variation on the original",
      "use image_to_image with a high strength value"
    ],
    0,
    "Only a mask restricts regeneration to the selected region.");

  PY(T_IMGGEN, `
result = client.images.generate(
    model=DEPLOYMENT, prompt=PROMPT, [BLANK]=4
)`,
    "Four candidate images are needed in one call. What replaces [BLANK]?",
    ["n", "count", "batch_size", "images"],
    0,
    "n controls how many images the request returns, where the model supports it.");

  PY(T_IMGGEN, `
try:
    client.images.generate(model=DEPLOYMENT, prompt=user_prompt)
except BadRequestError as ex:
    if ex.code == "[BLANK]":
        show_friendly_message()`,
    "Which error code signals that the prompt was rejected by the safety system?",
    ["content_policy_violation", "invalid_prompt", "rate_limit_exceeded", "model_error"],
    0,
    "Image generation returns content_policy_violation when the prompt trips the content filters.");

  PY(T_VIDEO, `
# A 40-minute recording must be described with timestamped captions.
# The pipeline first does:
STEP_1 = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "segment the video and sample keyframes per segment",
      "send the whole file to a text-only LLM",
      "convert the video to a single JPEG",
      "run sentiment analysis on the audio"
    ],
    0,
    "Video is processed by splitting it into segments and sampling representative frames, because models accept frames, not arbitrary-length video.");

  PY(T_VIDEO, `
import cv2

capture = cv2.VideoCapture("clip.mp4")
fps = capture.get(cv2.CAP_PROP_FPS)
frame_index = int(fps * seconds)
capture.set(cv2.[BLANK], frame_index)
ok, frame = capture.read()`,
    "What replaces [BLANK] to seek to a specific frame?",
    ["CAP_PROP_POS_FRAMES", "CAP_PROP_POS_MSEC", "CAP_PROP_FRAME_COUNT", "CAP_PROP_FPS"],
    0,
    "CAP_PROP_POS_FRAMES sets the next frame index; CAP_PROP_POS_MSEC seeks by milliseconds.");

  PY(T_VIDEO, `
total = capture.get(cv2.CAP_PROP_FRAME_COUNT)
fps = capture.get(cv2.CAP_PROP_FPS)
duration_seconds = [BLANK]`,
    "What replaces [BLANK]?",
    ["total / fps", "total * fps", "fps / total", "total / 1000"],
    0,
    "Duration in seconds is the frame count divided by the frame rate.");

  PY(T_VIDEO, `
segments = []
for start in range(0, duration, 30):
    segments.append({"start": start, "end": min(start + 30, duration)})
# each segment is then captioned by a multimodal model`,
    "Why is the video chunked into fixed windows before analysis?",
    [
      "To keep each request inside the model's input limits and to produce timestamped output",
      "Because multimodal models cannot read MP4 containers",
      "To reduce the video resolution",
      "Because captions must be shorter than 30 characters"
    ],
    0,
    "Segmenting bounds the payload per request and lets every caption carry a start and end timestamp.");

  PY(T_VIDEO, `
content = [{"type": "text", "text": "Describe what happens in this segment."}]
for frame in keyframes:
    content.append({
        "type": "[BLANK]",
        "image_url": {"url": f"data:image/jpeg;base64,{b64(frame)}"},
    })`,
    "What replaces [BLANK] in a multimodal chat message?",
    ["image_url", "image", "frame", "media"],
    0,
    "Multimodal content parts use type 'image_url', which also accepts inline data URIs.");

  PY(T_VIDEO, `
job = start_video_generation(prompt=PROMPT, n_seconds=10)
while job["status"] not in ("succeeded", "failed", "cancelled"):
    time.sleep(5)
    job = get_job(job["id"])`,
    "Why is video generation modelled as a polled job rather than a single synchronous call?",
    [
      "Rendering takes far longer than an HTTP request may stay open",
      "Because the prompt must be re-sent on every poll",
      "Because video models do not support authentication",
      "Because the result is streamed frame by frame"
    ],
    0,
    "Video generation is a long-running operation: you submit a job, poll its status and then download the asset.");

  PY(T_VIDEO, `
# Requirement: turn an existing still photograph into a short animated clip.
TECHNIQUE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["image-to-video", "text-to-video", "outpainting", "reference-image generation"],
    0,
    "An existing image as input plus video as output is image-to-video.");

  PY(T_DOC, `
from azure.ai.documentintelligence import DocumentIntelligenceClient

poller = client.begin_analyze_document(
    "[BLANK]", AnalyzeDocumentRequest(url_source=SAS_URL)
)`,
    "Tables, sections and barcodes must be preserved, without deploying a language model. What replaces [BLANK]?",
    ["prebuilt-layout", "prebuilt-read", "prebuilt-documentSearch", "prebuilt-documentFieldSchema"],
    0,
    "prebuilt-layout returns structure (tables, sections, barcodes); prebuilt-read returns plain text only.");

  PY(T_DOC, `
poller = client.begin_analyze_document("prebuilt-invoice", request)
invoice = poller.result().documents[0]
print(invoice.fields["InvoiceTotal"].[BLANK])`,
    "Results below 0.80 must be routed for supervisor review. What replaces [BLANK]?",
    ["confidence", "score", "certainty", "probability"],
    0,
    "Every extracted field carries a confidence value that can drive human-in-the-loop routing.");

  PY(T_DOC, `
from azure.ai.documentintelligence.models import DocumentContentFormat

poller = client.begin_analyze_document(
    "prebuilt-layout", request, [BLANK]=DocumentContentFormat.MARKDOWN
)`,
    "The extracted content will be chunked for RAG and must keep headings and tables. What replaces [BLANK]?",
    ["output_content_format", "content_format", "format", "output_format"],
    0,
    "Markdown output keeps the document hierarchy, which makes structure-aware chunking possible.");

  PY(T_DOC, `
# Requirement: employee ID cards from many countries; return employee ID,
# full name and expiration date as a structured schema, minimal
# post-processing.
ANALYZER = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["prebuilt-documentFieldSchema", "prebuilt-layout", "prebuilt-read", "prebuilt-documentSearch"],
    0,
    "The field-schema analyzer returns named fields directly instead of text that still needs parsing.");

  PY(T_DOC, `
# Requirement: extract invoice number, date, vendor and total across many
# vendor templates, with confidence scores for routing.
SOLUTION = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "a custom Content Understanding analyzer defining those fields",
      "the prebuilt-layout analyzer",
      "an agent with groundedness guardrails",
      "prebuilt-documentSearch plus the search score"
    ],
    0,
    "A custom analyzer defines the exact field schema across varying templates and returns per-field confidence.");

  PY(T_DOC, `
# Pipeline1: cost-effective, high-volume processing of standalone PDFs.
# Pipeline2: cross-document validation with multi-step reasoning.
PIPELINE_1 = "[BLANK]"
PIPELINE_2 = "multi-file task in pro mode"`,
    "What replaces [BLANK]?",
    [
      "single-file task in standard mode",
      "multi-file task in standard mode",
      "single-file task in pro mode",
      "multi-file task in pro mode"
    ],
    0,
    "Standard mode on single files is the cheap high-volume path; pro mode adds cross-document reasoning.");

  PY(T_DOC, `
result = poller.result()
for table in result.[BLANK]:
    for cell in table.cells:
        print(cell.row_index, cell.column_index, cell.content)`,
    "What replaces [BLANK]?",
    ["tables", "documents", "pages", "blocks"],
    0,
    "The layout result exposes tables, each with cells carrying row and column indexes.");

  PY(T_DOC, `
for page in result.pages:
    for word in page.words:
        print(word.content, word.[BLANK])`,
    "The bounding box of each word is needed to draw an overlay. What replaces [BLANK]?",
    ["polygon", "bounding_box", "rect", "coordinates"],
    0,
    "Words expose polygon, a flat list of x/y points in page units.");

  PY(T_DOC, `
# The invoices contain tables, logos and varied layouts, and the solution
# must evaluate both the visual layout and the textual content.
SERVICE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["Azure Content Understanding", "chat completions", "Image Analysis", "Azure AI Search"],
    0,
    "Content Understanding is the multimodal Foundry Tool that turns layout plus text into structured output.");

  PY(T_SAFETY, `
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions

response = client.[BLANK](AnalyzeTextOptions(text=user_text))`,
    "What replaces [BLANK]?",
    ["analyze_text", "detect_text", "moderate_text", "classify_text"],
    0,
    "analyze_text returns a severity per harm category.");

  PY(T_SAFETY, `
from azure.ai.contentsafety.models import TextCategory

for item in response.categories_analysis:
    if item.category == TextCategory.[BLANK] and item.severity >= 4:
        block()`,
    "Which category name is valid?",
    ["HATE", "TOXIC", "ABUSE", "OFFENSIVE"],
    0,
    "Content Safety categories are Hate, SelfHarm, Sexual and Violence.");

  PY(T_SAFETY, `
from azure.ai.contentsafety.models import AnalyzeImageOptions, ImageData

response = client.analyze_image(
    AnalyzeImageOptions(image=ImageData([BLANK]=base64_bytes))
)`,
    "What replaces [BLANK]?",
    ["content", "data", "bytes", "image"],
    0,
    "ImageData carries either content (base64 bytes) or blob_url.");

  PY(T_SAFETY, `
# Users upload photos to a support agent. Harmful images must be blocked
# based on severity levels.
CONTROL = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["image moderation", "prompt shields", "a blocklist", "OCR plus keyword scanning"],
    0,
    "Image moderation classifies uploads into harm categories with severities that can be blocked.");

  PY(T_SAFETY, `
# Screenshots uploaded by users may carry instructions hidden in the
# embedded text of the image.
CONTROL = "[BLANK]"`,
    "Which control mitigates the indirect prompt-injection risk?",
    [
      "a prompt shield for documents",
      "a prompt shield for user prompts",
      "protected material detection",
      "self-harm content filtering"
    ],
    0,
    "Uploaded content is third-party input, so the document (indirect attack) shield is the relevant control.");

  PY(T_SAFETY, `
# Security administrators must review indirect prompt-injection detections
# before deciding whether to block requests.
ACTION = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "set prompt shields to annotate and enable Spotlighting",
      "set prompt shields to block",
      "disable prompt shields",
      "block the Hate category"
    ],
    0,
    "Reviewing before blocking means annotate; Spotlighting additionally marks untrusted third-party content.");

  PY(T_SAFETY, `
client.[BLANK](
    blocklist_name="competitors",
    options=AddOrUpdateTextBlocklistItemsOptions(blocklist_items=items),
)`,
    "A fixed list of forbidden terms must be enforced. What replaces [BLANK]?",
    [
      "add_or_update_blocklist_items",
      "create_blocklist",
      "analyze_text",
      "add_terms"
    ],
    0,
    "Blocklists handle exact terms that the general harm categories do not cover.");

  PY(T_SAFETY, `
# The agent retrieves documents from Azure AI Search. A file with customer
# data was added to the repository by mistake.
GUARDRAIL = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "PII detection on the output",
      "a groundedness evaluator",
      "a lower temperature",
      "protected material detection"
    ],
    0,
    "Output-side PII detection is what stops customer data leaking out of the retrieved context.");

  PY(T_OBS, `
from azure.monitor.opentelemetry import configure_azure_monitor

configure_azure_monitor(
    connection_string=project.telemetry.get_application_insights_connection_string()
)`,
    "What does this enable?",
    [
      "OpenTelemetry spans are exported to Application Insights",
      "The agent starts writing its own log files",
      "Content filtering is activated",
      "Model responses are cached"
    ],
    0,
    "Foundry tracing is OpenTelemetry-based and exports spans to the linked Application Insights resource.");

  PY(T_OBS, `
os.environ["[BLANK]"] = "payments-service"
configure_azure_monitor(connection_string=CONN)`,
    "Two services share one Application Insights resource and must stay distinguishable. What replaces [BLANK]?",
    ["OTEL_SERVICE_NAME", "APP_NAME", "AZURE_SERVICE_NAME", "OTEL_RESOURCE"],
    0,
    "OTEL_SERVICE_NAME sets the cloud role name each span is attributed to.");

  PY(T_OBS, `
tracer = AzureAIOpenTelemetryTracer(
    connection_string=CONN, [BLANK]=False
)`,
    "Prompts and tool arguments must never be written to span attributes. What replaces [BLANK]?",
    ["enable_content_recording", "record_prompts", "capture_content", "log_payloads"],
    0,
    "enable_content_recording=False suppresses prompt and tool payloads in the telemetry.");

  PY(T_OBS, `
with tracer.start_as_current_span("[BLANK]") as span:
    span.set_attribute("ticket.id", ticket_id)
    answer = run_agent(question)`,
    "Custom business context must appear alongside the SDK spans. Which call creates the span?",
    [
      "tracer.start_as_current_span",
      "tracer.log",
      "tracer.create_event",
      "tracer.record"
    ],
    0,
    "start_as_current_span opens a span that the SDK's own spans nest inside.");

  PY(T_OBS, `
# Requests take more than 15 seconds and some answers are wrong even when
# the tool returned the right data.
CAPABILITY = "[BLANK]"`,
    "Which observability capability shows the ordered LLM calls, tool invocations and timings of one run?",
    ["tracing", "token usage", "monitoring", "safety metrics"],
    0,
    "Only tracing exposes the ordered span tree for an individual run.");

  PY(T_EVAL, `
from azure.ai.evaluation import evaluate, GroundednessEvaluator

result = evaluate(
    data="test.jsonl",
    evaluators={"groundedness": GroundednessEvaluator(model_config=cfg)},
    [BLANK]={"groundedness": {"response": "\${data.answer}", "context": "\${data.context}"}},
)`,
    "The JSONL column names do not match the evaluator's inputs. What replaces [BLANK]?",
    ["evaluator_config", "column_mapping", "field_map", "inputs"],
    0,
    "evaluator_config carries a per-evaluator column_mapping from dataset columns to evaluator inputs.");

  PY(T_EVAL, `
evaluator = [BLANK](model_config=cfg)
# checks whether the answer is supported by the retrieved documents`,
    "What replaces [BLANK]?",
    ["GroundednessEvaluator", "FluencyEvaluator", "SimilarityEvaluator", "CoherenceEvaluator"],
    0,
    "Groundedness measures support from the supplied context; fluency and coherence judge the prose only.");

  PY(T_EVAL, `
evaluator = [BLANK](azure_ai_project=PROJECT, credential=cred)
# flags hateful, sexual, violent and self-harm content in responses`,
    "What replaces [BLANK]?",
    ["ContentSafetyEvaluator", "GroundednessEvaluator", "RelevanceEvaluator", "F1ScoreEvaluator"],
    0,
    "Safety evaluators run as a service-backed check and require the project plus a credential.");

  PY(T_EVAL, `
# The GitHub Actions workflow must block the merge when quality drops.
- name: Evaluate
  run: python eval.py
# and the job must [BLANK] when thresholds are not met`,
    "What replaces [BLANK]?",
    ["fail", "warn", "retry until it passes", "continue and send an alert"],
    0,
    "Only a failing required status check prevents the pull request from being merged.");

  PY(T_EVAL, `
# Requirement: evaluate the agent from live chat conversations with the
# least effort to collect data and run the evaluations.
TYPE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["continuous", "batch", "manual", "policy"],
    0,
    "Continuous evaluation samples production traffic and scores it automatically, with no dataset to assemble.");
})();
