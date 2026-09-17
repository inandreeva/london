/* Part 5 — Speech, translation and language services. */
(function () {
  var PY = window.PY;
  var T_SPEECH = "Speech: STT & TTS";
  var T_TRANS = "Translation";
  var T_LANG = "Azure AI Language";

  PY(T_SPEECH, `
import azure.cognitiveservices.speech as speechsdk

speech_config = speechsdk.SpeechConfig(
    [BLANK]=token_credential_string, region="westeurope"
)`,
    "Which keyword supplies the resource key when key-based auth is allowed?",
    ["subscription", "key", "api_key", "credential"],
    0,
    "SpeechConfig(subscription=..., region=...) is the key-based constructor.");

  PY(T_SPEECH, `
speech_config = speechsdk.SpeechConfig(
    [BLANK]=f"aad#{resource_id}#{aad_token}", region=REGION
)`,
    "The Speech resource must be accessed with a Microsoft Entra token. Which keyword carries the authorization token?",
    ["auth_token", "subscription", "bearer", "credential"],
    0,
    "SpeechConfig accepts auth_token in the aad#<resourceId>#<token> format for keyless access.");

  PY(T_SPEECH, `
audio_config = speechsdk.audio.AudioConfig([BLANK]=True)
recognizer = speechsdk.SpeechRecognizer(speech_config, audio_config)`,
    "The audio comes from the machine's microphone. What replaces [BLANK]?",
    ["use_default_microphone", "microphone", "default_input", "use_mic"],
    0,
    "AudioConfig(use_default_microphone=True) binds to the system default capture device.");

  PY(T_SPEECH, `
audio_config = speechsdk.audio.AudioConfig([BLANK]="call.wav")`,
    "What replaces [BLANK] to read from a file on disk?",
    ["filename", "file_path", "path", "source"],
    0,
    "AudioConfig(filename=...) reads a local WAV file.");

  PY(T_SPEECH, `
result = recognizer.[BLANK]().get()
print(result.text)`,
    "A single short utterance must be transcribed. What replaces [BLANK]?",
    ["recognize_once_async", "start_continuous_recognition", "recognize_all", "transcribe_async"],
    0,
    "recognize_once_async handles a single utterance and stops at the first silence.");

  PY(T_SPEECH, `
# Live phone calls arrive as a continuous stream and transcripts must
# appear within a few seconds.
recognizer.[BLANK]()`,
    "What replaces [BLANK]?",
    [
      "start_continuous_recognition_async",
      "recognize_once_async",
      "start_batch_transcription",
      "synthesize_speech_async"
    ],
    0,
    "Continuous recognition streams partial and final results in near real time; batch transcription only runs on completed recordings.");

  PY(T_SPEECH, `
recognizer.[BLANK].connect(lambda evt: print(evt.result.text))`,
    "Only final recognized segments should be printed. What replaces [BLANK]?",
    ["recognized", "recognizing", "session_started", "canceled"],
    0,
    "recognizing fires for interim hypotheses; recognized fires once a segment is final.");

  PY(T_SPEECH, `
recognizer.[BLANK].connect(lambda evt: log.error(evt.error_details))`,
    "Which event carries the failure reason when recognition stops unexpectedly?",
    ["canceled", "session_stopped", "recognized", "speech_end_detected"],
    0,
    "The canceled event exposes reason and error_details.");

  PY(T_SPEECH, `
if result.reason == speechsdk.ResultReason.[BLANK]:
    print(result.text)`,
    "What replaces [BLANK] for a successful transcription?",
    ["RecognizedSpeech", "SynthesizingAudioCompleted", "NoMatch", "Canceled"],
    0,
    "ResultReason.RecognizedSpeech indicates text was produced.");

  PY(T_SPEECH, `
speech_config.[BLANK] = "en-US"`,
    "The source language of the audio must be fixed. What replaces [BLANK]?",
    ["speech_recognition_language", "language", "locale", "source_language"],
    0,
    "speech_recognition_language sets the input locale for speech to text.");

  PY(T_SPEECH, `
auto_detect = speechsdk.[BLANK](languages=["en-US", "es-ES", "de-DE"])
recognizer = speechsdk.SpeechRecognizer(
    speech_config=cfg, auto_detect_source_language_config=auto_detect
)`,
    "What replaces [BLANK]?",
    [
      "AutoDetectSourceLanguageConfig",
      "SourceLanguageConfig",
      "LanguageDetectionConfig",
      "MultiLanguageConfig"
    ],
    0,
    "AutoDetectSourceLanguageConfig performs language identification across a candidate list.");

  PY(T_SPEECH, `
speech_config.[BLANK] = "my-custom-model-endpoint-id"`,
    "A fine-tuned custom speech model must serve the requests. What replaces [BLANK]?",
    ["endpoint_id", "custom_model_id", "model_id", "deployment_id"],
    0,
    "endpoint_id routes recognition to a deployed custom speech endpoint.");

  PY(T_SPEECH, `
# The custom speech to text model reaches its expiration date.
BEHAVIOR = "[BLANK]"`,
    "What happens to real-time requests on the custom endpoint?",
    [
      "They fall back to the most recent base model for the same locale",
      "They return HTTP 4xx until a new model is deployed",
      "They keep using the expired model until it is deleted",
      "The custom model is deleted automatically"
    ],
    0,
    "Custom endpoints degrade gracefully onto the latest base model for the locale rather than failing.");

  PY(T_SPEECH, `
synthesizer = speechsdk.SpeechSynthesizer(speech_config=cfg, audio_config=None)
result = synthesizer.[BLANK]("Your order has shipped.").get()
audio = result.audio_data`,
    "What replaces [BLANK]?",
    ["speak_text_async", "synthesize_async", "say_async", "speak_async"],
    0,
    "speak_text_async renders plain text; speak_ssml_async renders SSML.");

  PY(T_SPEECH, `
speech_config.[BLANK] = "en-US-AvaMultilingualNeural"`,
    "What replaces [BLANK]?",
    ["speech_synthesis_voice_name", "voice", "voice_name", "synthesis_voice"],
    0,
    "speech_synthesis_voice_name selects the neural voice.");

  PY(T_SPEECH, `
speech_config.set_speech_synthesis_output_format(
    speechsdk.SpeechSynthesisOutputFormat.[BLANK]
)`,
    "The audio must be 16 kHz, 128 kbit/s MP3. What replaces [BLANK]?",
    [
      "Audio16Khz128KBitRateMonoMp3",
      "Riff24Khz16BitMonoPcm",
      "Ogg48Khz16BitMonoOpus",
      "Raw8Khz8BitMonoMULaw"
    ],
    0,
    "The enum member names encode sample rate, bit rate and container.");

  PY(T_SPEECH, `
ssml = f'''
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="en-US-AvaNeural">
    <[BLANK] rate="-10%">Please hold while I check your order.</[BLANK]>
  </voice>
</speak>'''`,
    "The speaking rate must be slowed down. What replaces [BLANK]?",
    ["prosody", "emphasis", "say-as", "mstts:express-as"],
    0,
    "The prosody element controls rate, pitch and volume.");

  PY(T_SPEECH, `
<voice name="en-US-AvaNeural">
  <[BLANK] style="empathetic">I am sorry to hear that.</[BLANK]>
</voice>`,
    "A speaking style must be applied. What replaces [BLANK]?",
    ["mstts:express-as", "prosody", "emphasis", "style"],
    0,
    "mstts:express-as applies a neural speaking style and requires the mstts namespace on the speak element.");

  PY(T_SPEECH, `
result = synthesizer.[BLANK](ssml).get()`,
    "What replaces [BLANK]?",
    ["speak_ssml_async", "speak_text_async", "synthesize_ssml", "render_ssml_async"],
    0,
    "speak_ssml_async parses SSML markup; speak_text_async would read the tags aloud.");

  PY(T_SPEECH, `
audio_config = speechsdk.audio.AudioOutputConfig([BLANK]="answer.wav")`,
    "The synthesized audio must go to a file. What replaces [BLANK]?",
    ["filename", "file_path", "output_file", "path"],
    0,
    "AudioOutputConfig(filename=...) writes the rendered audio to disk.");

  PY(T_SPEECH, `
stream = speechsdk.audio.[BLANK]()
audio_config = speechsdk.audio.AudioConfig(stream=stream)
stream.write(pcm_bytes)`,
    "Audio arrives from a telephony socket in chunks. What replaces [BLANK]?",
    ["PushAudioInputStream", "PullAudioInputStream", "AudioDataStream", "AudioInputStream"],
    0,
    "A push stream lets the application write bytes as they arrive; a pull stream requires a callback the SDK drives.");

  PY(T_SPEECH, `
transcriber = speechsdk.transcription.[BLANK](speech_config, audio_config)
transcriber.transcribed.connect(lambda e: print(e.result.speaker_id, e.result.text))`,
    "Each phrase must be attributed to a speaker in a meeting recording. What replaces [BLANK]?",
    ["ConversationTranscriber", "SpeechRecognizer", "MeetingRecognizer", "DiarizationRecognizer"],
    0,
    "ConversationTranscriber performs diarization and exposes speaker_id per phrase.");

  PY(T_SPEECH, `
config = speechsdk.PronunciationAssessmentConfig(
    reference_text="Hello world",
    grading_system=speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
    granularity=speechsdk.PronunciationAssessmentGranularity.[BLANK],
)`,
    "Per-word scores are required. What replaces [BLANK]?",
    ["Word", "FullText", "Phoneme", "Sentence"],
    0,
    "Granularity.Word returns a score per word; Phoneme goes one level deeper, FullText only scores the whole utterance.");

  PY(T_SPEECH, `
translation_config = speechsdk.[BLANK](
    subscription=KEY, region=REGION
)
translation_config.speech_recognition_language = "en-US"
translation_config.add_target_language("de")`,
    "What replaces [BLANK]?",
    ["SpeechTranslationConfig", "SpeechConfig", "TranslationConfig", "TranslatorConfig"],
    0,
    "Speech translation uses SpeechTranslationConfig together with TranslationRecognizer.");

  PY(T_SPEECH, `
recognizer = speechsdk.translation.[BLANK](
    translation_config=cfg, audio_config=audio
)
result = recognizer.recognize_once()
print(result.translations["de"])`,
    "What replaces [BLANK]?",
    ["TranslationRecognizer", "SpeechRecognizer", "TranslatingRecognizer", "SpeechTranslator"],
    0,
    "TranslationRecognizer returns a translations dictionary keyed by target language.");

  PY(T_SPEECH, `
# A short audio prompt must be produced from a script that includes a
# postal code that must be read digit by digit.
<say-as interpret-as="[BLANK]">98052</say-as>`,
    "What replaces [BLANK]?",
    ["characters", "cardinal", "ordinal", "telephone"],
    0,
    "interpret-as='characters' spells the value out one symbol at a time.");

  PY(T_SPEECH, `
# Requirement: transcribe 5,000 archived call recordings overnight,
# cost matters more than latency.
APPROACH = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "batch transcription over the stored files",
      "real-time speech to text per file",
      "continuous recognition with a push stream",
      "speech translation"
    ],
    0,
    "Batch transcription processes stored audio asynchronously and is the cost-efficient option when latency is irrelevant.");

  PY(T_TRANS, `
from azure.ai.translation.text import TextTranslationClient

client = TextTranslationClient(endpoint=EP, credential=cred)
result = client.translate(body=["Hello"], [BLANK]=["de", "fr"])`,
    "What replaces [BLANK]?",
    ["to_language", "target_languages", "to", "targets"],
    0,
    "translate takes to_language as the list of target locales.");

  PY(T_TRANS, `
result = client.translate(
    body=[text], to_language=["en"], [BLANK]="ja"
)`,
    "The source locale is known, so detection should be skipped. What replaces [BLANK]?",
    ["from_language", "source_language", "from", "src"],
    0,
    "from_language pins the source and avoids an extra detection step.");

  PY(T_TRANS, `
# Transcript segments mix English and Spanish, and translations come back
# incomplete.
FIX = "[BLANK]"`,
    "What replaces [BLANK]?",
    [
      "split the segments into single-language segments before translating",
      "enable automatic language detection on the request",
      "always declare English as the source language",
      "translate the whole transcript as one document"
    ],
    0,
    "Auto-detection still picks one language per request, so the other language is dropped; splitting first keeps the whole transcript translatable.");

  PY(T_TRANS, `
result = client.translate(
    body=[html], to_language=["de"], [BLANK]="html"
)`,
    "Markup must be preserved. What replaces [BLANK]?",
    ["text_type", "content_type", "format", "mode"],
    0,
    "text_type='html' tells Translator to leave tags intact.");

  PY(T_TRANS, `
result = client.translate(
    body=[text], to_language=["de"], [BLANK]="contoso-glossary"
)`,
    "Brand terms must follow a trained custom model. Which parameter selects it?",
    ["category", "glossary", "model_id", "profanity_action"],
    0,
    "category carries the Custom Translator category ID.");

  PY(T_TRANS, `
from azure.ai.translation.document import DocumentTranslationClient

poller = client.[BLANK](source_url=SRC_SAS, target_url=TGT_SAS, target_language="de")
result = poller.result()`,
    "An entire container of PDFs must be translated while keeping the layout. What replaces [BLANK]?",
    ["begin_translation", "translate", "start_translation", "begin_translate_documents"],
    0,
    "Document Translation is a long-running operation started with begin_translation and awaited through a poller.");

  PY(T_LANG, `
from azure.ai.textanalytics import TextAnalyticsClient

client = TextAnalyticsClient(endpoint=EP, credential=cred)
result = client.[BLANK](documents)[0]
print(result.sentiment, result.confidence_scores.positive)`,
    "What replaces [BLANK]?",
    ["analyze_sentiment", "detect_sentiment", "get_sentiment", "sentiment"],
    0,
    "analyze_sentiment returns the document sentiment plus per-class confidence scores.");

  PY(T_LANG, `
result = client.analyze_sentiment(documents, [BLANK]=True)
for sentence in result[0].sentences:
    for op in sentence.mined_opinions:
        print(op.target.text, op.assessments[0].sentiment)`,
    "Aspect-level opinions are required. What replaces [BLANK]?",
    ["show_opinion_mining", "opinion_mining", "include_opinions", "aspects"],
    0,
    "show_opinion_mining=True enables aspect-based sentiment analysis.");

  PY(T_LANG, `
# Millions of customer messages: extract person names, locations,
# organizations and dates. No generated text is needed.
result = client.[BLANK](documents)`,
    "What replaces [BLANK]?",
    ["recognize_entities", "extract_key_phrases", "analyze_sentiment", "recognize_linked_entities"],
    0,
    "Named entity recognition is a purpose-built Language capability and far cheaper than an LLM for this task.");

  PY(T_LANG, `
result = client.[BLANK](documents, categories_filter=["USSocialSecurityNumber"])
print(result[0].redacted_text)`,
    "Customer identifiers must be masked before storage. What replaces [BLANK]?",
    ["recognize_pii_entities", "recognize_entities", "redact_text", "detect_pii"],
    0,
    "recognize_pii_entities returns detected PII entities plus a redacted_text version.");

  PY(T_LANG, `
result = client.[BLANK](documents)
print(result[0].primary_language.iso6391_name)`,
    "What replaces [BLANK]?",
    ["detect_language", "recognize_language", "identify_language", "get_language"],
    0,
    "detect_language returns the primary language with its ISO 639-1 code and confidence.");

  PY(T_LANG, `
result = client.[BLANK](documents)
print(result[0].key_phrases)`,
    "What replaces [BLANK]?",
    ["extract_key_phrases", "recognize_entities", "summarize", "analyze_topics"],
    0,
    "extract_key_phrases returns the salient phrases of each document.");

  PY(T_LANG, `
poller = client.[BLANK](documents, actions=[ExtractiveSummaryAction(max_sentence_count=3)])`,
    "Several analyses must run over the same batch in one long-running job. What replaces [BLANK]?",
    ["begin_analyze_actions", "analyze", "run_actions", "begin_actions"],
    0,
    "begin_analyze_actions submits a multi-action batch job and returns a poller.");

  PY(T_LANG, `
poller = client.begin_analyze_actions(
    documents, actions=[[BLANK](sentence_count=3)]
)`,
    "The summary must be written in the model's own words rather than copied sentences. What replaces [BLANK]?",
    ["AbstractiveSummaryAction", "ExtractiveSummaryAction", "KeyPhraseExtractionAction", "SummaryAction"],
    0,
    "Abstractive summarization generates new sentences; extractive selects existing ones.");

  PY(T_LANG, `
from azure.ai.language.questionanswering import QuestionAnsweringClient

output = client.[BLANK](question="How do I reset the device?", project_name=P, deployment_name=D)`,
    "What replaces [BLANK]?",
    ["get_answers", "answer", "query", "ask"],
    0,
    "QuestionAnsweringClient.get_answers queries a deployed custom question answering project.");

  PY(T_LANG, `
from azure.ai.language.conversations import ConversationAnalysisClient

result = client.analyze_conversation(task={
    "kind": "[BLANK]",
    "analysisInput": {"conversationItem": {"id": "1", "text": utterance, "participantId": "1"}},
    "parameters": {"projectName": P, "deploymentName": D},
})`,
    "A CLU project must classify the utterance intent and extract entities. What replaces [BLANK]?",
    ["Conversation", "CustomConversationalTask", "Intent", "Orchestration"],
    0,
    "The Conversation kind invokes Conversational Language Understanding for intent and entity prediction.");

  PY(T_LANG, `
prediction = result["result"]["prediction"]
print(prediction["[BLANK]"], prediction["entities"])`,
    "What replaces [BLANK] to read the winning intent?",
    ["topIntent", "intent", "bestIntent", "label"],
    0,
    "CLU returns topIntent plus a ranked intents list.");

  PY(T_LANG, `
# Requirement: translate customer messages from Japanese to English in
# real time, with no reasoning or explanation required.
SERVICE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["Azure AI Translator", "an LLM", "a multimodal model", "Azure AI Search"],
    0,
    "Pure translation without reasoning is a purpose-built Translator task and far cheaper than an LLM call.");

  PY(T_SPEECH, `
# A chatbot must speak its answers in a cloned brand voice that Contoso
# recorded and trained.
FEATURE = "[BLANK]"`,
    "What replaces [BLANK]?",
    ["custom neural voice", "a prebuilt neural voice", "speech translation", "pronunciation assessment"],
    0,
    "Custom neural voice is the trained brand-specific TTS voice; prebuilt voices are the stock catalogue.");

  PY(T_SPEECH, `
result = synthesizer.speak_text_async(text).get()
if result.reason == speechsdk.ResultReason.[BLANK]:
    write(result.audio_data)`,
    "What replaces [BLANK] after successful synthesis?",
    ["SynthesizingAudioCompleted", "RecognizedSpeech", "SynthesizingAudioStarted", "NoMatch"],
    0,
    "SynthesizingAudioCompleted means the full audio buffer is available in audio_data.");

  PY(T_SPEECH, `
stream = speechsdk.AudioDataStream(result)
stream.[BLANK]("reply.mp3")`,
    "What replaces [BLANK]?",
    ["save_to_wav_file", "write_file", "to_file", "export"],
    0,
    "AudioDataStream.save_to_wav_file writes the buffered audio to disk in the configured output format.");

  PY(T_SPEECH, `
# A call-centre agent assist tool must transcribe the caller and then send
# the text to an LLM.
PIPELINE = ["[BLANK]", "LLM"]`,
    "What replaces [BLANK]?",
    ["Azure AI Speech", "Azure AI Language", "Azure AI Search", "Document Intelligence"],
    0,
    "Audio-to-text conversion is Azure AI Speech's job, upstream of the language model.");

  PY(T_LANG, `
client = TextAnalyticsClient(
    endpoint=EP, credential=cred, [BLANK]="2023-04-01"
)`,
    "The service version must be pinned so behaviour does not drift. What replaces [BLANK]?",
    ["api_version", "version", "service_version", "release"],
    0,
    "Pinning api_version keeps model and schema behaviour stable across deployments.");
})();
