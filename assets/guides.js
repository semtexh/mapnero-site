(function () {
  "use strict";

  const STORAGE = {
    locale: "mapnero-guide-locale",
    progress: "mapnero-guide-progress",
    platform: "mapnero-guide-platform"
  };

  const locales = window.MAPNERO_GUIDE_LOCALES || [];
  const guides = window.MAPNERO_GUIDES || {};
  const platformIds = ["apple", "android", "web"];
  let locale = selectInitialLocale();
  let platform = storageGet(STORAGE.platform) || "apple";
  let topicId = "";
  let query = "";
  let toastTimer;
  let screenshotRequest = 0;
  let motionRequest = 0;

  const elements = {
    language: document.getElementById("language-select"),
    search: document.getElementById("guide-search"),
    platformTabs: document.getElementById("platform-tabs"),
    topicList: document.getElementById("topic-list"),
    topicCount: document.getElementById("topic-count"),
    emptySearch: document.getElementById("empty-search"),
    content: document.getElementById("guide-content"),
    access: document.getElementById("guide-access"),
    title: document.getElementById("guide-title"),
    summary: document.getElementById("guide-summary"),
    note: document.getElementById("guide-note"),
    noteText: document.getElementById("guide-note-text"),
    screenshot: document.getElementById("guide-screenshot"),
    screenshotImage: document.getElementById("guide-screenshot-image"),
    motion: document.getElementById("guide-motion"),
    motionVideo: document.getElementById("guide-motion-video"),
    motionCaption: document.getElementById("guide-motion-caption"),
    steps: document.getElementById("step-list"),
    tipsSection: document.getElementById("tips-section"),
    tips: document.getElementById("tips-list"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    previous: document.getElementById("previous-guide"),
    next: document.getElementById("next-guide"),
    copyLink: document.getElementById("copy-link"),
    print: document.getElementById("print-guide"),
    reset: document.getElementById("reset-progress"),
    toast: document.getElementById("toast")
  };

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // The guide remains fully usable when private browsing blocks storage.
    }
  }

  function storageRemove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_) {
      // Nothing to remove when storage is unavailable.
    }
  }

  function selectInitialLocale() {
    const saved = storageGet(STORAGE.locale);
    if (saved && guides[saved]) return saved;
    const browserLocale = (navigator.language || "en").toLowerCase().split("-")[0];
    return guides[browserLocale] ? browserLocale : "en";
  }

  function readHash() {
    const match = window.location.hash.match(/^#\/?(apple|android|web)(?:\/([a-z0-9-]+))?/i);
    if (!match) return;
    platform = match[1].toLowerCase();
    topicId = match[2] || "";
  }

  function text(key) {
    return guides[locale]?.ui?.[key] || guides.en.ui[key] || key;
  }

  function format(value, fields) {
    return Object.entries(fields).reduce((result, [key, fieldValue]) => result.replaceAll(`{${key}}`, fieldValue), value);
  }

  function currentPlatform() {
    return guides[locale]?.platforms?.[platform] || guides.en.platforms[platform];
  }

  function currentTopics() {
    return currentPlatform()?.topics || [];
  }

  function progressKey(topic, index) {
    return `${platform}:${topic.id}:${index}`;
  }

  function loadProgress() {
    try {
      const stored = JSON.parse(storageGet(STORAGE.progress) || "{}");
      return stored && typeof stored === "object" ? stored : {};
    } catch (_) {
      return {};
    }
  }

  function saveProgress(progress) {
    storageSet(STORAGE.progress, JSON.stringify(progress));
  }

  function topicComplete(topic, progress) {
    return topic.steps.length > 0 && topic.steps.every((_, index) => progress[progressKey(topic, index)]);
  }

  function setLocale(nextLocale) {
    if (!guides[nextLocale]) return;
    locale = nextLocale;
    storageSet(STORAGE.locale, locale);
    render();
  }

  function setPlatform(nextPlatform, keepTopic) {
    if (!platformIds.includes(nextPlatform)) return;
    platform = nextPlatform;
    storageSet(STORAGE.platform, platform);
    if (!keepTopic || !currentTopics().some((topic) => topic.id === topicId)) {
      topicId = currentTopics()[0]?.id || "";
    }
    updateHash();
    render();
  }

  function setTopic(nextTopic, focus) {
    if (!currentTopics().some((topic) => topic.id === nextTopic)) return;
    topicId = nextTopic;
    updateHash();
    renderTopics();
    renderArticle();
    if (focus) {
      elements.content.focus({ preventScroll: true });
      elements.content.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateHash() {
    const nextHash = `#${platform}/${topicId}`;
    if (window.location.hash !== nextHash) history.replaceState(null, "", nextHash);
  }

  function renderLanguage() {
    elements.language.innerHTML = "";
    locales.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.label;
      option.selected = item.id === locale;
      option.disabled = !guides[item.id];
      elements.language.append(option);
    });
  }

  function renderUI() {
    const localeInfo = locales.find((item) => item.id === locale) || locales[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = localeInfo?.dir || "ltr";
    document.title = text("pageTitle");
    document.querySelectorAll("[data-ui]").forEach((node) => {
      node.textContent = text(node.dataset.ui);
    });
    document.querySelectorAll("[data-ui-placeholder]").forEach((node) => {
      node.placeholder = text(node.dataset.uiPlaceholder);
    });
    document.querySelectorAll("[data-ui-aria]").forEach((node) => {
      const label = text(node.dataset.uiAria);
      node.setAttribute("aria-label", label);
      node.setAttribute("title", label);
    });
    elements.language.setAttribute("aria-label", text("language"));
  }

  function renderPlatforms() {
    elements.platformTabs.innerHTML = "";
    platformIds.forEach((id) => {
      const item = guides[locale]?.platforms?.[id] || guides.en.platforms[id];
      if (!item) return;
      const button = document.createElement("button");
      button.className = "platform-tab";
      button.type = "button";
      button.setAttribute("role", "tab");
      button.id = `platform-${id}`;
      button.setAttribute("aria-selected", String(id === platform));
      button.setAttribute("aria-controls", "guide-content");
      button.innerHTML = `<span class="platform-icon" aria-hidden="true">${escapeHTML(item.icon)}</span><span class="platform-copy"><strong>${escapeHTML(item.label)}</strong><span>${escapeHTML(item.description)}</span></span>`;
      button.addEventListener("click", () => setPlatform(id, true));
      elements.platformTabs.append(button);
    });
  }

  function filteredTopics() {
    const normalized = query.trim().toLocaleLowerCase(locale);
    if (!normalized) return currentTopics();
    return currentTopics().filter((topic) => {
      const haystack = [topic.title, topic.summary, topic.access, topic.note, ...topic.steps.flatMap((step) => [step.title, step.body]), ...(topic.tips || []).flatMap((tip) => [tip.q, tip.a])]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale);
      return haystack.includes(normalized);
    });
  }

  function renderTopics() {
    const topics = filteredTopics();
    const progress = loadProgress();
    elements.topicList.innerHTML = "";
    elements.topicCount.textContent = format(text("taskCount"), { count: topics.length });
    elements.emptySearch.hidden = topics.length !== 0;
    topics.forEach((topic) => {
      const originalIndex = currentTopics().findIndex((item) => item.id === topic.id);
      const button = document.createElement("button");
      button.className = "topic-button";
      button.type = "button";
      if (topic.id === topicId) button.setAttribute("aria-current", "page");
      button.innerHTML = `<span class="topic-number">${String(originalIndex + 1).padStart(2, "0")}</span><span class="topic-name">${escapeHTML(topic.title)}</span><span class="topic-check" aria-hidden="true">${topicComplete(topic, progress) ? "✓" : ""}</span>`;
      button.addEventListener("click", () => setTopic(topic.id, true));
      elements.topicList.append(button);
    });
  }

  function renderArticle() {
    const topics = currentTopics();
    const topic = topics.find((item) => item.id === topicId) || topics[0];
    if (!topic) return;
    topicId = topic.id;
    updateHash();

    elements.access.textContent = topic.access;
    elements.title.textContent = topic.title;
    elements.summary.textContent = topic.summary;
    elements.note.hidden = !topic.note;
    elements.noteText.textContent = topic.note || "";
    elements.steps.innerHTML = "";
    renderScreenshot(topic);
    renderMotion(topic);

    const progress = loadProgress();
    topic.steps.forEach((step, index) => {
      const key = progressKey(topic, index);
      const complete = Boolean(progress[key]);
      const item = document.createElement("li");
      item.className = "step-item";
      item.dataset.complete = String(complete);
      const button = document.createElement("button");
      button.className = "step-toggle";
      button.type = "button";
      button.setAttribute("aria-label", `${step.title}: ${complete ? text("completed") : text("notCompleted")}`);
      button.setAttribute("aria-pressed", String(complete));
      button.textContent = complete ? "✓" : String(index + 1);
      button.addEventListener("click", () => {
        const updated = loadProgress();
        if (updated[key]) delete updated[key];
        else updated[key] = true;
        saveProgress(updated);
        renderTopics();
        renderArticle();
      });
      const copy = document.createElement("div");
      copy.className = "step-copy";
      copy.innerHTML = `<h4>${escapeHTML(step.title)}</h4><p>${escapeHTML(step.body)}</p>`;
      item.append(button, copy);
      elements.steps.append(item);
    });

    const completedSteps = topic.steps.filter((_, index) => progress[progressKey(topic, index)]).length;
    elements.progressLabel.textContent = format(text("progress"), { done: completedSteps, total: topic.steps.length });
    elements.progressBar.style.width = `${topic.steps.length ? (completedSteps / topic.steps.length) * 100 : 0}%`;

    const tips = topic.tips || [];
    elements.tipsSection.hidden = tips.length === 0;
    elements.tips.innerHTML = "";
    tips.forEach((tip) => {
      const details = document.createElement("details");
      details.className = "tip-item";
      details.innerHTML = `<summary>${escapeHTML(tip.q)}</summary><p>${escapeHTML(tip.a)}</p>`;
      elements.tips.append(details);
    });

    const index = topics.findIndex((item) => item.id === topic.id);
    elements.previous.disabled = index <= 0;
    elements.next.disabled = index >= topics.length - 1;
    elements.previous.onclick = () => index > 0 && setTopic(topics[index - 1].id, true);
    elements.next.onclick = () => index < topics.length - 1 && setTopic(topics[index + 1].id, true);
  }

  function renderScreenshot(topic) {
    const request = ++screenshotRequest;
    const image = elements.screenshotImage;
    const path = `assets/guides/screenshots/${platform}/${locale}/${topic.id}.png`;
    const alt = `${currentPlatform().label}: ${topic.title}`;
    elements.screenshot.hidden = true;
    image.removeAttribute("src");
    image.alt = "";

    // Only show a successfully loaded capture for this exact language and topic.
    // A late response from a previous selection must not replace the current one.
    const capture = new Image();
    capture.onload = () => {
      if (request !== screenshotRequest) return;
      image.src = path;
      image.alt = alt;
      elements.screenshot.hidden = false;
    };
    capture.src = path;
  }

  function renderMotion(topic) {
    const request = ++motionRequest;
    const video = elements.motionVideo;
    elements.motion.hidden = true;
    elements.motionCaption.textContent = "";
    video.pause();
    video.removeAttribute("src");
    video.load();

    // Motion is opt-in per topic. A guide must never fall back to a clip from
    // another language: captions and on-screen app text need to match.
    const motion = topic.motion || window.MAPNERO_GUIDE_MOTION?.[locale]?.[platform]?.[topic.id];
    if (!motion?.caption) return;

    const path = `assets/guides/videos/${platform}/${locale}/${topic.id}.mp4`;
    const caption = motion.caption;
    video.onloadeddata = () => {
      if (request !== motionRequest) return;
      elements.motionCaption.textContent = caption;
      elements.motion.hidden = false;
      // Motion clips are muted by design, so an immediate loop gives the
      // same at-a-glance cue as a GIF without sacrificing the native video
      // controls. Browsers may still reject autoplay in strict contexts.
      if (typeof video.play === "function") {
        const started = video.play();
        if (typeof started?.catch === "function") started.catch(() => {});
      }
    };
    video.onerror = () => {
      if (request !== motionRequest) return;
      elements.motion.hidden = true;
    };
    video.src = path;
    video.load();
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 2200);
  }

  function copyGuideLink() {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => showToast(text("linkCopied"))).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(value) {
    const input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast(text("linkCopied"));
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function render() {
    if (!guides[locale]) locale = "en";
    if (!platformIds.includes(platform)) platform = "apple";
    const topics = currentTopics();
    if (!topics.some((topic) => topic.id === topicId)) topicId = topics[0]?.id || "";
    renderLanguage();
    renderUI();
    renderPlatforms();
    renderTopics();
    renderArticle();
  }

  readHash();
  elements.language.addEventListener("change", (event) => setLocale(event.target.value));
  elements.search.addEventListener("input", (event) => {
    query = event.target.value;
    renderTopics();
  });
  elements.copyLink.addEventListener("click", copyGuideLink);
  elements.print.addEventListener("click", () => window.print());
  elements.reset.addEventListener("click", () => {
    if (!window.confirm(text("resetConfirm"))) return;
    storageRemove(STORAGE.progress);
    renderTopics();
    renderArticle();
    showToast(text("resetDone"));
  });
  window.addEventListener("hashchange", () => {
    readHash();
    render();
  });
  render();
})();
