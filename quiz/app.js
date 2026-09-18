(function () {
  "use strict";

  /* ---------------- quiz registry ---------------- */

  var QUIZZES = (window.AI103_QUIZZES || []).map(function (quiz) {
    return {
      id: quiz.id,
      title: quiz.title,
      subtitle: quiz.subtitle || "",
      description: quiz.description || "",
      source: quiz.source || "",
      questions: quiz.questions.map(normalize)
    };
  });

  if (QUIZZES.length > 1) {
    QUIZZES.push({
      id: "__mixed__",
      title: "Mixed exam",
      subtitle: "Random draw from every quiz",
      description: "Pulls questions at random from all quizzes above — the closest thing to sitting the real exam.",
      source: "all quizzes",
      mixed: true,
      questions: QUIZZES.reduce(function (all, q) { return all.concat(q.questions); }, [])
    });
  }

  /* Accepts both the legacy single-choice shape and the richer multi-format shape. */
  function normalize(q) {
    var n = {
      kind: q.kind || "single",
      prompt: q.prompt || q.question,
      hint: q.hint || "",
      code: !!q.code,
      context: q.context || "",
      topic: q.topic || q.domain || "General",
      source: q.source || "",
      explanation: q.explanation || "",
      noShuffle: !!q.noShuffle
    };
    if (n.kind === "single") {
      n.options = q.options;
      n.answer = q.answer;
    } else if (n.kind === "multi") {
      n.options = q.options;
      n.answers = q.answers;
      n.pick = q.pick || q.answers.length;
    } else if (n.kind === "yesno" || n.kind === "truefalse") {
      n.statements = q.statements;
      n.labels = n.kind === "truefalse" ? ["True", "False"] : ["Yes", "No"];
    } else if (n.kind === "match") {
      n.rows = q.rows;
      n.pool = q.pool;
    }
    return n;
  }

  var KIND_LABEL = {
    single: "Single answer",
    multi: "Multiple answers",
    yesno: "Yes / No",
    truefalse: "True / False",
    match: "Fill in / match"
  };

  /* ---------------- dom ---------------- */

  var el = {
    library: document.getElementById("library-screen"),
    setup: document.getElementById("setup-screen"),
    quiz: document.getElementById("quiz-screen"),
    result: document.getElementById("result-screen"),
    librarySummary: document.getElementById("library-summary"),
    quizGrid: document.getElementById("quiz-grid"),
    resetProgressBtn: document.getElementById("reset-progress-btn"),
    setupTitle: document.getElementById("setup-title"),
    setupDesc: document.getElementById("setup-desc"),
    topicSelect: document.getElementById("topic-select"),
    countSelect: document.getElementById("count-select"),
    shuffleAnswers: document.getElementById("shuffle-answers"),
    instantFeedback: document.getElementById("instant-feedback"),
    startBtn: document.getElementById("start-btn"),
    progressLabel: document.getElementById("progress-label"),
    topicLabel: document.getElementById("topic-label"),
    kindBadge: document.getElementById("kind-badge"),
    progressBar: document.getElementById("progress-bar"),
    questionText: document.getElementById("question-text"),
    questionContext: document.getElementById("question-context"),
    questionContextBody: document.getElementById("question-context-body"),
    questionHint: document.getElementById("question-hint"),
    questionBody: document.getElementById("question-body"),
    feedback: document.getElementById("feedback"),
    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    resultTitle: document.getElementById("result-title"),
    scoreRing: document.getElementById("score-ring"),
    scorePercent: document.getElementById("score-percent"),
    scoreDetail: document.getElementById("score-detail"),
    scoreVerdict: document.getElementById("score-verdict"),
    breakdownTable: document.getElementById("breakdown-table"),
    reviewList: document.getElementById("review-list"),
    retryBtn: document.getElementById("retry-btn"),
    retryWrongBtn: document.getElementById("retry-wrong-btn")
  };

  var LETTERS = ["A", "B", "C", "D", "E", "F", "G"];
  var activeQuiz = null;
  var state = null;

  /* ---------------- progress (localStorage) ---------------- */

  var PROGRESS_KEY = "ai103-quiz-progress-v1";
  var progress = readProgress();

  function readProgress() {
    try {
      var raw = window.localStorage.getItem(PROGRESS_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeProgress() {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) { /* storage unavailable or full — progress stays in-memory only */ }
  }

  function recordResult(quizId, percent) {
    var entry = progress[quizId] || { attempts: 0, best: 0 };
    entry.attempts++;
    entry.last = percent;
    entry.best = Math.max(entry.best || 0, percent);
    entry.at = Date.now();
    progress[quizId] = entry;
    writeProgress();
  }

  function formatDate(ms) {
    if (!ms) return "";
    var d = new Date(ms);
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }

  /* ---------------- helpers ---------------- */

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function show(section) {
    [el.library, el.setup, el.quiz, el.result].forEach(function (s) {
      s.classList.toggle("hidden", s !== section);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function topicsOf(questions) {
    var seen = [];
    questions.forEach(function (q) {
      if (seen.indexOf(q.topic) === -1) seen.push(q.topic);
    });
    return seen.sort();
  }

  function kindsOf(questions) {
    var seen = [];
    questions.forEach(function (q) {
      var label = KIND_LABEL[q.kind];
      if (seen.indexOf(label) === -1) seen.push(label);
    });
    return seen;
  }

  /* ---------------- library ---------------- */

  function buildLibrary() {
    var totalQuestions = QUIZZES
      .filter(function (q) { return !q.mixed; })
      .reduce(function (n, q) { return n + q.questions.length; }, 0);
    var realQuizzes = QUIZZES.filter(function (q) { return !q.mixed; }).length;
    var doneCount = QUIZZES.filter(function (q) { return !q.mixed && progress[q.id]; }).length;
    el.librarySummary.textContent =
      realQuizzes + " quizzes · " + totalQuestions + " questions · " +
      doneCount + " of " + realQuizzes + " taken. Every run reshuffles the draw.";
    el.resetProgressBtn.classList.toggle("hidden", Object.keys(progress).length === 0);

    el.quizGrid.innerHTML = "";
    QUIZZES.forEach(function (quiz) {
      var done = progress[quiz.id];
      var card = document.createElement("button");
      card.type = "button";
      card.className = "quiz-card" + (quiz.mixed ? " mixed" : "") + (done ? " done" : "");

      var title = document.createElement("h3");
      title.textContent = quiz.title;
      if (done) {
        var check = document.createElement("span");
        check.className = "done-check";
        check.textContent = "✓";
        title.appendChild(check);
      }
      card.appendChild(title);

      if (quiz.subtitle) {
        var sub = document.createElement("p");
        sub.className = "quiz-card-sub";
        sub.textContent = quiz.subtitle;
        card.appendChild(sub);
      }

      var desc = document.createElement("p");
      desc.className = "quiz-card-desc";
      desc.textContent = quiz.description;
      card.appendChild(desc);

      if (done) {
        var status = document.createElement("p");
        status.className = "quiz-card-status " + scoreClass(done.best);
        status.textContent = "Completed · best " + done.best + "% · last " + done.last + "%" +
          " · " + done.attempts + (done.attempts === 1 ? " attempt" : " attempts") +
          (done.at ? " · " + formatDate(done.at) : "");
        card.appendChild(status);
      }

      var meta = document.createElement("div");
      meta.className = "quiz-card-meta";
      meta.appendChild(tag(quiz.questions.length + " questions"));
      kindsOf(quiz.questions).forEach(function (k) { meta.appendChild(tag(k)); });
      card.appendChild(meta);

      card.addEventListener("click", function () { openSetup(quiz); });
      el.quizGrid.appendChild(card);
    });
  }

  function tag(text) {
    var s = document.createElement("span");
    s.className = "tag";
    s.textContent = text;
    return s;
  }

  function scoreClass(p) {
    if (p >= 80) return "score-ok";
    if (p >= 60) return "score-warn";
    return "score-bad";
  }

  /* ---------------- setup ---------------- */

  function openSetup(quiz) {
    activeQuiz = quiz;
    el.setupTitle.textContent = quiz.title;
    el.setupDesc.textContent = quiz.description;

    var topics = topicsOf(quiz.questions);
    el.topicSelect.innerHTML = "";
    var all = document.createElement("option");
    all.value = "__all__";
    all.textContent = "All topics (" + quiz.questions.length + " questions)";
    el.topicSelect.appendChild(all);
    topics.forEach(function (t) {
      var n = quiz.questions.filter(function (q) { return q.topic === t; }).length;
      var o = document.createElement("option");
      o.value = t;
      o.textContent = t + " (" + n + ")";
      el.topicSelect.appendChild(o);
    });
    el.topicSelect.parentElement.classList.toggle("hidden", topics.length < 2);

    refreshCountOptions();
    show(el.setup);
  }

  function pool() {
    var topic = el.topicSelect.value;
    return topic === "__all__"
      ? activeQuiz.questions
      : activeQuiz.questions.filter(function (q) { return q.topic === topic; });
  }

  function refreshCountOptions() {
    var max = pool().length;
    var choices = [5, 10, 15, 20, 30, 40, 50].filter(function (n) { return n < max; });
    choices.push(max);

    el.countSelect.innerHTML = "";
    choices.forEach(function (n) {
      var o = document.createElement("option");
      o.value = String(n);
      o.textContent = n === max ? "All " + n + " questions" : n + " questions";
      el.countSelect.appendChild(o);
    });
    var preferred = choices.indexOf(10) !== -1 ? 10 : max;
    el.countSelect.value = String(preferred);
  }

  /* ---------------- question preparation ---------------- */

  function prepare(q) {
    var item = { ref: q, kind: q.kind };

    if (q.kind === "single" || q.kind === "multi") {
      var order = q.options.map(function (_, i) { return i; });
      if (el.shuffleAnswers.checked && !q.noShuffle) order = shuffle(order);
      item.options = order.map(function (i) { return q.options[i]; });
      if (q.kind === "single") {
        item.answer = order.indexOf(q.answer);
        item.picked = null;
      } else {
        item.answers = q.answers.map(function (a) { return order.indexOf(a); }).sort(numeric);
        item.picked = [];
      }
    } else if (q.kind === "yesno" || q.kind === "truefalse") {
      item.statements = q.statements;
      item.labels = q.labels;
      item.picked = q.statements.map(function () { return null; });
    } else if (q.kind === "match") {
      item.rows = q.rows;
      item.pool = el.shuffleAnswers.checked ? shuffle(q.pool) : q.pool.slice();
      item.picked = q.rows.map(function () { return ""; });
    }
    return item;
  }

  function numeric(a, b) { return a - b; }

  function isAnswered(item) {
    switch (item.kind) {
      case "single": return item.picked !== null;
      case "multi": return item.picked.length > 0;
      case "yesno":
      case "truefalse": return item.picked.every(function (p) { return p !== null; });
      case "match": return item.picked.every(function (p) { return p !== ""; });
    }
    return false;
  }

  function isCorrect(item) {
    switch (item.kind) {
      case "single":
        return item.picked === item.answer;
      case "multi":
        return item.picked.slice().sort(numeric).join(",") === item.answers.join(",");
      case "yesno":
      case "truefalse":
        return item.statements.every(function (s, i) { return item.picked[i] === s.answer; });
      case "match":
        return item.rows.every(function (r, i) { return item.picked[i] === r.answer; });
    }
    return false;
  }

  /* ---------------- quiz flow ---------------- */

  function startQuiz(questions) {
    state = {
      items: questions.map(prepare),
      index: 0,
      instant: el.instantFeedback.checked,
      revealed: questions.map(function () { return false; })
    };
    show(el.quiz);
    renderQuestion();
  }

  function current() { return state.items[state.index]; }

  function renderQuestion() {
    var item = current();
    var total = state.items.length;

    el.progressLabel.textContent = "Question " + (state.index + 1) + " of " + total;
    el.topicLabel.textContent = item.ref.topic;
    el.kindBadge.textContent = KIND_LABEL[item.kind];
    el.kindBadge.className = "badge badge-" + item.kind;
    el.progressBar.style.width = (state.index / total * 100) + "%";
    el.questionText.textContent = item.ref.prompt;

    el.questionContextBody.textContent = item.ref.context;
    el.questionContext.classList.toggle("hidden", !item.ref.context);
    el.questionContext.open = false;

    el.questionHint.textContent = item.ref.hint;
    el.questionHint.className = "hint" + (item.ref.code ? " code" : "");
    el.questionHint.classList.toggle("hidden", !item.ref.hint);

    el.prevBtn.disabled = state.index === 0;

    renderBody();
    refreshState();
  }

  function renderBody() {
    var item = current();
    el.questionBody.innerHTML = "";

    if (item.kind === "single" || item.kind === "multi") {
      var list = document.createElement("ul");
      list.className = "options";
      item.options.forEach(function (text, i) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option";
        btn.dataset.index = String(i);

        var letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = LETTERS[i];
        var label = document.createElement("span");
        label.textContent = text;
        btn.appendChild(letter);
        btn.appendChild(label);

        btn.addEventListener("click", function () { pickOption(i); });
        li.appendChild(btn);
        list.appendChild(li);
      });
      el.questionBody.appendChild(list);

      if (item.kind === "multi") {
        var note = document.createElement("p");
        note.className = "hint";
        note.textContent = "Select " + item.ref.pick + " answers.";
        el.questionBody.appendChild(note);
      }
      return;
    }

    if (item.kind === "yesno" || item.kind === "truefalse") {
      var table = document.createElement("table");
      table.className = "statements";
      var head = document.createElement("tr");
      head.innerHTML = "<th>Statement</th><th></th>";
      table.appendChild(head);

      item.statements.forEach(function (s, ri) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.textContent = s.text;
        var td2 = document.createElement("td");
        td2.className = "choice-cell";

        item.labels.forEach(function (label, li) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice";
          btn.textContent = label;
          btn.dataset.row = String(ri);
          btn.dataset.value = li === 0 ? "true" : "false";
          btn.addEventListener("click", function () { pickStatement(ri, li === 0); });
          td2.appendChild(btn);
        });

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
      });
      el.questionBody.appendChild(table);
      return;
    }

    if (item.kind === "match") {
      var mt = document.createElement("table");
      mt.className = "match";
      item.rows.forEach(function (row, ri) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.className = "match-label";
        td1.textContent = row.label;
        var td2 = document.createElement("td");

        var sel = document.createElement("select");
        sel.dataset.row = String(ri);
        var blank = document.createElement("option");
        blank.value = "";
        blank.textContent = "— choose —";
        sel.appendChild(blank);
        item.pool.forEach(function (p) {
          var o = document.createElement("option");
          o.value = p;
          o.textContent = p;
          sel.appendChild(o);
        });
        sel.value = item.picked[ri];
        sel.addEventListener("change", function () { pickMatch(ri, sel.value); });

        td2.appendChild(sel);
        tr.appendChild(td1);
        tr.appendChild(td2);
        mt.appendChild(tr);
      });
      el.questionBody.appendChild(mt);
    }
  }

  /* ---------------- answering ---------------- */

  function locked() {
    return state.instant && state.revealed[state.index];
  }

  function pickOption(i) {
    if (locked()) return;
    var item = current();
    if (item.kind === "single") {
      item.picked = i;
    } else {
      var at = item.picked.indexOf(i);
      if (at === -1) item.picked.push(i);
      else item.picked.splice(at, 1);
    }
    refreshState();
  }

  function pickStatement(row, value) {
    if (locked()) return;
    current().picked[row] = value;
    refreshState();
  }

  function pickMatch(row, value) {
    if (locked()) return;
    current().picked[row] = value;
    refreshState();
  }

  function refreshState() {
    var item = current();
    var reveal = locked();

    if (item.kind === "single" || item.kind === "multi") {
      el.questionBody.querySelectorAll(".option").forEach(function (btn, i) {
        var chosen = item.kind === "single" ? item.picked === i : item.picked.indexOf(i) !== -1;
        var right = item.kind === "single" ? item.answer === i : item.answers.indexOf(i) !== -1;
        btn.classList.toggle("selected", !reveal && chosen);
        btn.classList.toggle("correct", reveal && right);
        btn.classList.toggle("incorrect", reveal && chosen && !right);
        btn.disabled = reveal;
      });
    } else if (item.kind === "yesno" || item.kind === "truefalse") {
      el.questionBody.querySelectorAll(".choice").forEach(function (btn) {
        var ri = Number(btn.dataset.row);
        var value = btn.dataset.value === "true";
        var chosen = item.picked[ri] === value;
        var right = item.statements[ri].answer === value;
        btn.classList.toggle("selected", !reveal && chosen);
        btn.classList.toggle("correct", reveal && right);
        btn.classList.toggle("incorrect", reveal && chosen && !right);
        btn.disabled = reveal;
      });
    } else if (item.kind === "match") {
      el.questionBody.querySelectorAll("select").forEach(function (sel) {
        var ri = Number(sel.dataset.row);
        var right = item.picked[ri] === item.rows[ri].answer;
        sel.classList.toggle("correct", reveal && right);
        sel.classList.toggle("incorrect", reveal && !right);
        sel.disabled = reveal;
      });
    }

    if (reveal) {
      var ok = isCorrect(item);
      el.feedback.className = "feedback " + (ok ? "correct" : "incorrect");
      el.feedback.innerHTML = "";
      var head = document.createElement("strong");
      head.textContent = ok ? "Correct" : "Incorrect — correct answer: " + correctAnswerText(item);
      el.feedback.appendChild(head);
      if (item.ref.explanation) {
        var body = document.createElement("span");
        body.textContent = item.ref.explanation;
        el.feedback.appendChild(body);
      }
    } else {
      el.feedback.className = "feedback hidden";
      el.feedback.textContent = "";
    }

    var last = state.index === state.items.length - 1;
    el.nextBtn.textContent = state.instant && !state.revealed[state.index]
      ? "Check answer"
      : (last ? "Finish & see score" : "Next");
    el.nextBtn.disabled = !isAnswered(item);
  }

  function correctAnswerText(item) {
    switch (item.kind) {
      case "single":
        return item.options[item.answer];
      case "multi":
        return item.answers.map(function (i) { return item.options[i]; }).join(" · ");
      case "yesno":
      case "truefalse":
        return item.statements.map(function (s) {
          return s.answer ? item.labels[0] : item.labels[1];
        }).join(" / ");
      case "match":
        return item.rows.map(function (r) { return r.answer; }).join(" · ");
    }
    return "";
  }

  function answerGivenText(item) {
    switch (item.kind) {
      case "single":
        return item.picked === null ? "(no answer)" : item.options[item.picked];
      case "multi":
        return item.picked.length
          ? item.picked.slice().sort(numeric).map(function (i) { return item.options[i]; }).join(" · ")
          : "(no answer)";
      case "yesno":
      case "truefalse":
        return item.picked.map(function (p) {
          return p === null ? "—" : (p ? item.labels[0] : item.labels[1]);
        }).join(" / ");
      case "match":
        return item.picked.map(function (p) { return p || "—"; }).join(" · ");
    }
    return "";
  }

  function next() {
    if (!isAnswered(current())) return;
    if (state.instant && !state.revealed[state.index]) {
      state.revealed[state.index] = true;
      refreshState();
      return;
    }
    if (state.index === state.items.length - 1) finish();
    else { state.index++; renderQuestion(); }
  }

  function prev() {
    if (state.index === 0) return;
    state.index--;
    renderQuestion();
  }

  /* ---------------- results ---------------- */

  function finish() {
    var total = state.items.length;
    var correct = state.items.filter(isCorrect).length;
    var percent = Math.round(correct / total * 100);

    el.resultTitle.textContent = activeQuiz.title + " — your result";
    el.scorePercent.textContent = percent + "%";
    el.scoreDetail.textContent = correct + " of " + total + " correct";
    el.scoreRing.style.background =
      "conic-gradient(" + ringColor(percent) + " " + (percent * 3.6) + "deg, var(--card-2) 0deg)";
    el.scoreVerdict.textContent = verdict(percent);

    renderBreakdown();
    renderReview();

    recordResult(activeQuiz.id, percent);
    buildLibrary();

    el.retryWrongBtn.classList.toggle("hidden", correct === total);
    show(el.result);
  }

  function ringColor(p) {
    if (p >= 80) return "var(--ok)";
    if (p >= 60) return "var(--warn)";
    return "var(--bad)";
  }

  function verdict(p) {
    if (p >= 90) return "Exam-ready on this material. Move on to a harder quiz.";
    if (p >= 80) return "Solid. Review the missed items and the exam traps below.";
    if (p >= 60) return "Passing range, but shaky. Re-read the explanations before retrying.";
    return "Work through the review below, then retry only the ones you missed.";
  }

  function renderBreakdown() {
    var stats = {};
    state.items.forEach(function (it) {
      var t = it.ref.topic;
      if (!stats[t]) stats[t] = { correct: 0, total: 0 };
      stats[t].total++;
      if (isCorrect(it)) stats[t].correct++;
    });

    var html = "<tr><th>Topic</th><th>Score</th></tr>";
    Object.keys(stats).sort().forEach(function (t) {
      var s = stats[t];
      html += "<tr><td>" + escapeHtml(t) + "</td><td>" +
        s.correct + " / " + s.total + " (" + Math.round(s.correct / s.total * 100) + "%)</td></tr>";
    });
    el.breakdownTable.innerHTML = html;
  }

  function renderReview() {
    el.reviewList.innerHTML = "";
    state.items.forEach(function (it, idx) {
      var ok = isCorrect(it);
      var div = document.createElement("div");
      div.className = "review-item " + (ok ? "ok" : "bad");

      var q = document.createElement("div");
      q.className = "q";
      q.textContent = (idx + 1) + ". " + it.ref.prompt;
      div.appendChild(q);

      div.appendChild(reviewLine(ok ? "tag-correct" : "tag-wrong", "Your answer:", answerGivenText(it)));
      if (!ok) div.appendChild(reviewLine("tag-correct", "Correct answer:", correctAnswerText(it)));

      if (it.ref.explanation) {
        var why = document.createElement("div");
        why.className = "line muted";
        why.textContent = it.ref.explanation;
        div.appendChild(why);
      }

      if (it.ref.source) {
        var src = document.createElement("div");
        src.className = "src";
        src.textContent = "Source: " + it.ref.source;
        div.appendChild(src);
      }

      el.reviewList.appendChild(div);
    });
  }

  function reviewLine(cls, label, value) {
    var d = document.createElement("div");
    d.className = "line";
    var strong = document.createElement("span");
    strong.className = cls;
    strong.textContent = label + " ";
    d.appendChild(strong);
    d.appendChild(document.createTextNode(value));
    return d;
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /* ---------------- wiring ---------------- */

  el.topicSelect.addEventListener("change", refreshCountOptions);

  el.startBtn.addEventListener("click", function () {
    var n = parseInt(el.countSelect.value, 10);
    startQuiz(shuffle(pool()).slice(0, n));
  });

  el.nextBtn.addEventListener("click", next);
  el.prevBtn.addEventListener("click", prev);
  el.retryBtn.addEventListener("click", function () { openSetup(activeQuiz); });

  el.retryWrongBtn.addEventListener("click", function () {
    var missed = state.items.filter(function (it) { return !isCorrect(it); })
      .map(function (it) { return it.ref; });
    if (missed.length) startQuiz(shuffle(missed));
  });

  document.querySelectorAll('[data-goto="library"]').forEach(function (btn) {
    btn.addEventListener("click", function () { show(el.library); });
  });

  el.resetProgressBtn.addEventListener("click", function () {
    if (!window.confirm("Clear the completed marks for every quiz?")) return;
    progress = {};
    writeProgress();
    buildLibrary();
  });

  document.addEventListener("keydown", function (e) {
    if (el.quiz.classList.contains("hidden")) return;
    var item = current();
    if (e.key === "Enter" && !el.nextBtn.disabled) { next(); return; }
    if (item.kind !== "single" && item.kind !== "multi") return;
    var i = LETTERS.indexOf(e.key.toUpperCase());
    if (i !== -1 && i < item.options.length) pickOption(i);
  });

  buildLibrary();
  show(el.library);
})();
