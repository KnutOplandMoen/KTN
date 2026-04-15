(function () {
  const API_URL = "/api/chat";
  const isEn = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const PRESET_STORAGE_KEY = "ktn_chat_model_preset";
  const DEFAULT_PRESET = "balanced";
  const PRESET_ORDER = ["fast", "balanced", "quality", "quality_alt"];

  const strings = isEn
    ? {
        openChat: "Open chat",
        title: "KTN study assistant",
        resetAria: "Reset chat",
        resetTitle: "Reset chat",
        closeAria: "Close chat",
        placeholder: "Ask about the curriculum…",
        send: "Send",
        hint: "Free models — latency varies by preset. “Smarter, slower” is best for Norwegian and accuracy.",
        errPrefix: "Something went wrong: ",
        presetGroupAria: "Response speed vs quality",
        presets: {
          fast: { lines: ["Small"], badge: "Fast", title: "Lowest latency; Norwegian may be weaker." },
          balanced: { lines: ["Balanced"], title: "Good default mix of speed and quality." },
          quality: { lines: ["Smarter", "slower"], title: "Best answers; often slower or queued." },
          quality_alt: { lines: ["Smarter (alt.)"], title: "Alternative heavy free model (OpenAI GPT-OSS 120B)." },
        },
      }
    : {
        openChat: "Åpne chat",
        title: "KTN Studieassistent",
        resetAria: "Nullstill chat",
        resetTitle: "Nullstill chat",
        closeAria: "Lukk chat",
        placeholder: "Spør om pensum…",
        send: "Send",
        hint: "Gratis modeller — hastighet varierer med valg. «Smartere, tregere» gir oftest best norsk og presisjon.",
        errPrefix: "Noe gikk galt: ",
        presetGroupAria: "Hastighet mot kvalitet",
        presets: {
          fast: { lines: ["Lett"], badge: "Rask", title: "Lavest latency; norsk kan svekkes." },
          balanced: { lines: ["Balansert"], title: "God blanding av fart og kvalitet." },
          quality: { lines: ["Smartere,", "tregere"], title: "Best svar; ofte tregere eller i kø." },
          quality_alt: { lines: ["Smartere (alt.)"], title: "Alternativ tung gratismodell (OpenAI GPT-OSS 120B)." },
        },
      };

  const style = document.createElement("style");
  style.textContent = `
    #ktn-chat-toggle {
      position: fixed; bottom: 28px; right: 28px;
      width: 54px; height: 54px;
      background: var(--rust, #b04428);
      border: none; border-radius: 50%;
      cursor: pointer; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,.22);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    #ktn-chat-toggle:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(0,0,0,.3);
    }
    #ktn-chat-toggle svg { width: 24px; height: 24px; fill: #fff; }

    #ktn-chat-panel {
      display: none; flex-direction: column;
      position: fixed; bottom: 28px; right: 28px;
      width: 420px; height: 540px;
      max-width: calc(100vw - 24px); max-height: calc(100vh - 24px);
      background: var(--paper, #f4f1ea);
      border: 1px solid var(--line, #c9c0ae);
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      z-index: 10000;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
    }
    #ktn-chat-panel.open { display: flex; }

    .ktn-chat-header {
      padding: 14px 18px;
      background: var(--ink, #1a1612);
      color: var(--paper, #f4f1ea);
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    .ktn-chat-header strong { font-size: 15px; letter-spacing: .01em; }
    .ktn-chat-header-actions { display: flex; align-items: center; gap: 8px; }
    .ktn-chat-reset, .ktn-chat-close {
      background: none; border: none; color: var(--paper, #f4f1ea);
      cursor: pointer; padding: 0 4px;
      line-height: 1; opacity: .7; transition: opacity .15s;
    }
    .ktn-chat-reset { font-size: 16px; }
    .ktn-chat-close { font-size: 22px; }
    .ktn-chat-reset:hover, .ktn-chat-close:hover { opacity: 1; }

    .ktn-chat-presets {
      flex-shrink: 0;
      padding: 8px 10px;
      border-bottom: 1px solid var(--line, #c9c0ae);
      background: rgba(26, 22, 18, 0.04);
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: stretch;
    }
    .ktn-chat-presets.ktn-chat-presets--busy { pointer-events: none; opacity: 0.65; }
    .ktn-chat-preset-btn {
      flex: 1 1 calc(50% - 3px);
      min-width: 0;
      font-size: 11px;
      line-height: 1.2;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--line, #c9c0ae);
      background: #fff;
      color: var(--ink, #1a1612);
      cursor: pointer;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      text-align: center;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    }
    @media (min-width: 400px) {
      .ktn-chat-preset-btn { flex: 1 1 auto; }
    }
    .ktn-chat-preset-btn:hover {
      border-color: var(--ink-ghost, #a39886);
    }
    .ktn-chat-preset-btn[aria-checked="true"] {
      border-color: var(--rust, #b04428);
      box-shadow: 0 0 0 1px var(--rust, #b04428);
      background: var(--paper-dark, #e8e3d6);
    }
    .ktn-chat-preset-btn:focus-visible {
      outline: 2px solid var(--rust, #b04428);
      outline-offset: 1px;
    }
    .ktn-chat-preset-btn--fast[aria-checked="true"] {
      border-color: #1a6e3a;
      box-shadow: 0 0 0 1px #1a6e3a;
    }
    .ktn-chat-preset-badge {
      display: block;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      background: #1a6e3a;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      margin: 0 auto 3px;
      width: fit-content;
      max-width: 100%;
    }
    .ktn-chat-preset-lines {
      display: block;
    }
    .ktn-chat-preset-sub {
      display: block;
      font-size: 10px;
      opacity: 0.78;
      font-weight: 400;
      margin-top: 1px;
    }

    .ktn-chat-messages {
      flex: 1; overflow-y: auto; padding: 18px;
      display: flex; flex-direction: column; gap: 14px;
    }
    .ktn-chat-messages::-webkit-scrollbar { width: 5px; }
    .ktn-chat-messages::-webkit-scrollbar-thumb {
      background: var(--line, #c9c0ae); border-radius: 4px;
    }

    .ktn-msg { max-width: 88%; line-height: 1.55; font-size: 14.5px; }
    .ktn-msg-user {
      align-self: flex-end;
      background: var(--rust, #b04428); color: #fff;
      padding: 8px 14px; border-radius: 14px 14px 4px 14px;
    }
    .ktn-msg-assistant {
      align-self: flex-start;
      background: var(--paper-dark, #e8e3d6);
      color: var(--ink, #1a1612);
      padding: 10px 14px; border-radius: 14px 14px 14px 4px;
      white-space: pre-wrap; word-wrap: break-word;
    }
    .ktn-msg-assistant code {
      font-family: var(--mono, 'IBM Plex Mono', monospace);
      background: rgba(0,0,0,.07); padding: 1px 5px; border-radius: 3px;
      font-size: 13px;
    }
    .ktn-msg-assistant pre {
      background: var(--ink, #1a1612); color: #e8e3d6;
      padding: 10px 12px; border-radius: 6px; margin: 6px 0;
      overflow-x: auto; white-space: pre; font-size: 13px;
      font-family: var(--mono, 'IBM Plex Mono', monospace);
    }
    .ktn-msg-assistant pre code {
      background: none; padding: 0; color: inherit;
    }
    .ktn-msg-error {
      align-self: center; text-align: center;
      color: var(--rust, #b04428); font-size: 13px;
      font-style: italic; padding: 4px 0;
    }

    .ktn-chat-form {
      display: flex; gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid var(--line, #c9c0ae);
      background: var(--paper, #f4f1ea);
      flex-shrink: 0;
      position: relative;
    }
    .ktn-chat-input {
      flex: 1; border: 1px solid var(--line, #c9c0ae);
      border-radius: 8px; padding: 9px 14px;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      font-size: 14px; outline: none;
      background: #fff; color: var(--ink, #1a1612);
      transition: border-color .15s;
    }
    .ktn-chat-input:focus { border-color: var(--rust, #b04428); }
    .ktn-chat-input::placeholder { color: var(--ink-ghost, #a39886); }

    .ktn-chat-hint {
      position: absolute; bottom: 100%; left: 14px; right: 14px;
      text-align: center; font-size: 11.5px;
      color: var(--ink-ghost, #a39886);
      padding: 4px 0 6px;
      pointer-events: none;
      letter-spacing: .01em;
    }

    .ktn-chat-send {
      background: var(--rust, #b04428); color: #fff;
      border: none; border-radius: 8px;
      padding: 9px 18px; cursor: pointer;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      font-size: 14px; font-weight: 500;
      transition: background .15s;
    }
    .ktn-chat-send:hover { background: var(--rust-dark, #8a3420); }
    .ktn-chat-send:disabled { opacity: .5; cursor: not-allowed; }

    .ktn-loading-text {
      font-size: 13px; font-style: italic;
      opacity: 0; transform: translateY(4px);
      animation: ktnFadeIn .35s ease forwards;
    }
    @keyframes ktnFadeIn {
      to { opacity: 1; transform: translateY(0); }
    }
    .ktn-loading-bar-track {
      height: 3px; width: 100%; margin-top: 8px;
      background: rgba(0,0,0,.08); border-radius: 2px; overflow: hidden;
    }
    .ktn-loading-bar-fill {
      height: 100%; width: 0%; border-radius: 2px;
      background: var(--rust, #b04428);
      transition: width .4s ease;
    }
    .ktn-loading-timer {
      font-size: 11px; opacity: .55; margin-top: 4px; text-align: right;
    }

    @media (max-width: 768px) {
      #ktn-chat-panel {
        top: 0; left: 0; bottom: 0; right: 0;
        width: 100%; height: 100vh;
        height: 100dvh;
        max-width: 100%; max-height: 100%;
        border-radius: 0;
      }
      #ktn-chat-panel .ktn-chat-header {
        padding-top: calc(14px + env(safe-area-inset-top, 0px));
        padding-left: calc(18px + env(safe-area-inset-left, 0px));
        padding-right: calc(18px + env(safe-area-inset-right, 0px));
      }
      #ktn-chat-panel .ktn-chat-form {
        padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
        padding-left: calc(14px + env(safe-area-inset-left, 0px));
        padding-right: calc(14px + env(safe-area-inset-right, 0px));
      }
      body.ktn-chat-open {
        overflow: hidden !important;
      }
    }
  `;
  document.head.appendChild(style);

  const toggle = document.createElement("button");
  toggle.id = "ktn-chat-toggle";
  toggle.setAttribute("aria-label", strings.openChat);
  toggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;

  const panel = document.createElement("div");
  panel.id = "ktn-chat-panel";
  panel.innerHTML = `
    <div class="ktn-chat-header">
      <strong>${strings.title}</strong>
      <div class="ktn-chat-header-actions">
        <button class="ktn-chat-reset" aria-label="${strings.resetAria}" title="${strings.resetTitle}">&#x21bb;</button>
        <button class="ktn-chat-close" aria-label="${strings.closeAria}">&times;</button>
      </div>
    </div>
    <div class="ktn-chat-presets" id="ktn-chat-presets" role="radiogroup" aria-label="${strings.presetGroupAria.replace(/"/g, "&quot;")}"></div>
    <div class="ktn-chat-messages"></div>
    <form class="ktn-chat-form" autocomplete="off">
      <input class="ktn-chat-input" placeholder="${strings.placeholder.replace(/"/g, "&quot;")}" />
      <div class="ktn-chat-hint">${strings.hint}</div>
      <button class="ktn-chat-send" type="submit">${strings.send}</button>
    </form>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const messagesEl = panel.querySelector(".ktn-chat-messages");
  const form = panel.querySelector(".ktn-chat-form");
  const input = panel.querySelector(".ktn-chat-input");
  const sendBtn = panel.querySelector(".ktn-chat-send");
  const closeBtn = panel.querySelector(".ktn-chat-close");
  const resetBtn = panel.querySelector(".ktn-chat-reset");
  const presetsEl = panel.querySelector("#ktn-chat-presets");

  let selectedPreset = DEFAULT_PRESET;
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    if (stored && PRESET_ORDER.includes(stored)) selectedPreset = stored;
  } catch (_) {}

  function syncPresetRadios() {
    presetsEl.querySelectorAll(".ktn-chat-preset-btn").forEach((btn) => {
      btn.setAttribute("aria-checked", btn.dataset.preset === selectedPreset ? "true" : "false");
    });
  }

  function setSelectedPreset(id) {
    if (!PRESET_ORDER.includes(id)) return;
    selectedPreset = id;
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, id);
    } catch (_) {}
    syncPresetRadios();
  }

  PRESET_ORDER.forEach((id) => {
    const spec = strings.presets[id];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ktn-chat-preset-btn";
    if (id === "fast") btn.classList.add("ktn-chat-preset-btn--fast");
    btn.dataset.preset = id;
    btn.title = spec.title;
    btn.setAttribute("role", "radio");
    if (spec.badge) {
      const badge = document.createElement("span");
      badge.className = "ktn-chat-preset-badge";
      badge.textContent = spec.badge;
      btn.appendChild(badge);
    }
    const linesWrap = document.createElement("span");
    linesWrap.className = "ktn-chat-preset-lines";
    spec.lines.forEach((line, i) => {
      const span = document.createElement("span");
      if (i === 0) {
        span.textContent = line;
      } else {
        span.className = "ktn-chat-preset-sub";
        span.textContent = line;
      }
      linesWrap.appendChild(span);
    });
    btn.appendChild(linesWrap);
    btn.addEventListener("click", () => setSelectedPreset(id));
    presetsEl.appendChild(btn);
  });
  syncPresetRadios();

  let history = [];
  let busy = false;

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  toggle.addEventListener("click", () => {
    panel.classList.add("open");
    toggle.style.display = "none";
    if (isMobile()) document.body.classList.add("ktn-chat-open");
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.style.display = "flex";
    document.body.classList.remove("ktn-chat-open");
  });

  resetBtn.addEventListener("click", () => {
    history = [];
    messagesEl.innerHTML = "";
  });

  function getPageContext() {
    const mainEl = document.querySelector("main");
    const chapter = mainEl?.dataset.chapter
      || document.querySelector(".eyebrow")?.textContent?.trim()
      || document.title;

    const sections = document.querySelectorAll("section[id]");
    let currentSection = null;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        const h2 = sec.querySelector("h2");
        currentSection = {
          id: sec.id,
          title: h2?.textContent?.trim() || sec.id
        };
      }
    }

    const el = mainEl || document.body;
    const blocks = el.querySelectorAll(
      "p, li, h2, h3, h4, h5, td, th, pre, blockquote, dt, dd, figcaption"
    );

    const vh = window.innerHeight;
    const margin = vh * 0.5;

    const visible = [];
    for (const block of blocks) {
      const rect = block.getBoundingClientRect();
      if (rect.bottom > -margin && rect.top < vh + margin) {
        const txt = block.innerText.trim();
        if (txt) visible.push(txt);
      }
    }

    return {
      locale: isEn ? "en" : "no",
      chapter,
      section: currentSection,
      url: window.location.pathname,
      visible_text: visible.length > 0
        ? visible.join("\n\n").substring(0, 4500)
        : el.innerText.substring(0, 4500),
    };
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderMarkdown(raw) {
    let html = escapeHtml(raw);

    // Code blocks: ```...```
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return '<pre><code>' + code.trimEnd() + '</code></pre>';
    });

    // Inline code: `...`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold: **...**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic: *...*
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    return html;
  }

  function addMessage(role, content) {
    const div = document.createElement("div");
    div.className = "ktn-msg " + (role === "user" ? "ktn-msg-user" : "ktn-msg-assistant");
    if (role === "user") {
      div.textContent = content;
    } else {
      div.innerHTML = renderMarkdown(content);
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function addError(msg) {
    const div = document.createElement("div");
    div.className = "ktn-msg ktn-msg-error";
    div.textContent = msg;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  const loadingMessagesNo = [
    "Sender SYN-pakke til serveren...",
    "Venter på tre-veis håndtrykk...",
    "Gjør DNS-oppslag for api.ktn.ntnu.no...",
    "Ruter pakken gjennom nettverket...",
    "Pakken passerer en NAT-gateway...",
    "Sjekker sekvensnummer i TCP-segmentet...",
    "Dekrypterer med RSA...",
    "Beregner CRC-sjekksum...",
    "Venter i sendevinduet (sliding window)...",
    "Pakken står i kø hos ruteren...",
    "Kjører Dijkstras algoritme...",
    "Fragmenterer IP-datagrammet...",
    "ARP-oppslag for MAC-adresse...",
    "Leter i boka til Kurose & Ross...",
    "Konsulterer RFC 2616...",
    "Anvender CSMA/CD på lenkelaget...",
    "Sjekker congestion window...",
    "Go-Back-N: venter på ACK...",
    "Slår opp i forwarding-tabellen...",
    "HTTP 200 OK — svaret er nesten klart!",
  ];

  const loadingMessagesEn = [
    "Sending SYN to the server…",
    "Waiting for the three-way handshake…",
    "DNS lookup for the study API…",
    "Routing the packet through the network…",
    "Packet passes a NAT gateway…",
    "Checking TCP sequence numbers…",
    "Decrypting with RSA…",
    "Computing a CRC checksum…",
    "Waiting in the sliding window…",
    "Queued at a router buffer…",
    "Running Dijkstra’s algorithm…",
    "Fragmenting the IP datagram…",
    "ARP lookup for the MAC address…",
    "Searching Kurose & Ross…",
    "Consulting RFC 2616…",
    "CSMA/CD on the link layer…",
    "Checking the congestion window…",
    "Go-Back-N: waiting for ACK…",
    "Forwarding table lookup…",
    "HTTP 200 OK — almost there!",
  ];

  const loadingMessages = isEn ? loadingMessagesEn : loadingMessagesNo;

  function addLoadingIndicator() {
    const ESTIMATE_MS = 30000;
    const div = document.createElement("div");
    div.className = "ktn-msg ktn-msg-assistant";

    const textEl = document.createElement("span");
    textEl.className = "ktn-loading-text";
    const firstIdx = Math.floor(Math.random() * (loadingMessages.length - 1));
    textEl.textContent = loadingMessages[firstIdx];

    const barTrack = document.createElement("div");
    barTrack.className = "ktn-loading-bar-track";
    const barFill = document.createElement("div");
    barFill.className = "ktn-loading-bar-fill";
    barTrack.appendChild(barFill);

    const timerEl = document.createElement("div");
    timerEl.className = "ktn-loading-timer";
    timerEl.textContent = "~0s";

    div.appendChild(textEl);
    div.appendChild(barTrack);
    div.appendChild(timerEl);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    let msgIdx = firstIdx;
    const startTime = Date.now();

    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      textEl.style.animation = "none";
      textEl.offsetHeight; // reflow
      textEl.style.animation = "";
      textEl.textContent = loadingMessages[msgIdx];
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 2500);

    const timerInterval = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      timerEl.textContent = "~" + elapsed + "s";
      const pct = Math.min(90, (elapsed / (ESTIMATE_MS / 1000)) * 90);
      barFill.style.width = pct + "%";
    }, 500);

    requestAnimationFrame(() => {
      barFill.style.width = "5%";
    });

    return {
      el: div,
      remove() {
        clearInterval(msgInterval);
        clearInterval(timerInterval);
        if (div.parentNode) div.parentNode.removeChild(div);
      },
    };
  }

  /**
   * Reads NDJSON from /api/chat: {"t":"..."} deltas, {"e":"..."} error, {"d":true} done.
   * Removes loader on first text delta; returns full assistant text.
   */
  async function consumeNdjsonChat(resp, loader) {
    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let accumulated = "";
    let assistantEl = null;
    let rafId = 0;

    function paint() {
      rafId = 0;
      if (assistantEl) {
        assistantEl.innerHTML = renderMarkdown(accumulated);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    }

    function schedulePaint() {
      if (!rafId) rafId = requestAnimationFrame(paint);
    }

    function processLine(line) {
      const trimmed = line.replace(/\r$/, "").trim();
      if (!trimmed) return false;
      let o;
      try {
        o = JSON.parse(trimmed);
      } catch {
        return false;
      }
      if (typeof o.e === "string" && o.e) {
        throw new Error(o.e);
      }
      if (typeof o.t === "string" && o.t.length > 0) {
        if (!assistantEl) {
          loader.remove();
          assistantEl = addMessage("assistant", "");
        }
        accumulated += o.t;
        schedulePaint();
      }
      if (o.d === true) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        paint();
        if (!assistantEl) loader.remove();
        return true;
      }
      return false;
    }

    while (true) {
      const { value, done } = await reader.read();
      buf += dec.decode(value || new Uint8Array(), { stream: !done });
      if (done) break;

      let nl;
      while ((nl = buf.indexOf("\n")) !== -1) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        if (processLine(line)) return accumulated;
      }
    }

    if (buf.length) {
      if (processLine(buf)) return accumulated;
    }

    if (!assistantEl) loader.remove();
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    paint();
    return accumulated;
  }

  async function sendMessage(question) {
    if (busy) return;
    busy = true;
    sendBtn.disabled = true;

    addMessage("user", question);

    const loader = addLoadingIndicator();
    presetsEl.classList.add("ktn-chat-presets--busy");
    presetsEl.querySelectorAll(".ktn-chat-preset-btn").forEach((b) => {
      b.disabled = true;
    });

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          preset: selectedPreset,
          page_context: getPageContext(),
          history: history.slice(-10),
        }),
      });

      const ct = resp.headers.get("content-type") || "";

      if (!resp.ok) {
        loader.remove();
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || `Server error (${resp.status})`);
      }

      let content = "";

      if (ct.includes("application/x-ndjson") || ct.includes("ndjson")) {
        content = await consumeNdjsonChat(resp, loader);
      } else {
        loader.remove();
        const data = await resp.json().catch(() => ({}));
        content = data?.content ?? "";
        addMessage("assistant", content);
      }

      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content });
    } catch (err) {
      loader.remove();
      addError(strings.errPrefix + err.message);
    } finally {
      busy = false;
      sendBtn.disabled = false;
      presetsEl.classList.remove("ktn-chat-presets--busy");
      presetsEl.querySelectorAll(".ktn-chat-preset-btn").forEach((b) => {
        b.disabled = false;
      });
    }
  }

  if (window.visualViewport && isMobile()) {
    const onViewportResize = () => {
      if (!panel.classList.contains("open") || !isMobile()) return;
      const vvh = window.visualViewport.height;
      const offset = window.visualViewport.offsetTop;
      panel.style.height = vvh + "px";
      panel.style.top = offset + "px";
    };
    window.visualViewport.addEventListener("resize", onViewportResize);
    window.visualViewport.addEventListener("scroll", onViewportResize);
  }

  input.addEventListener("focus", () => {
    if (!isMobile()) return;
    setTimeout(() => {
      input.scrollIntoView({ block: "nearest", behavior: "smooth" });
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 300);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    sendMessage(q);
  });
})();
