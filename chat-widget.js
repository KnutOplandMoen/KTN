(function () {
  const API_URL = "/api/chat";

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
  toggle.setAttribute("aria-label", "Åpne chat");
  toggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;

  const panel = document.createElement("div");
  panel.id = "ktn-chat-panel";
  panel.innerHTML = `
    <div class="ktn-chat-header">
      <strong>KTN Studieassistent</strong>
      <div class="ktn-chat-header-actions">
        <button class="ktn-chat-reset" aria-label="Nullstill chat" title="Nullstill chat">&#x21bb;</button>
        <button class="ktn-chat-close" aria-label="Lukk chat">&times;</button>
      </div>
    </div>
    <div class="ktn-chat-messages"></div>
    <form class="ktn-chat-form" autocomplete="off">
      <input class="ktn-chat-input" placeholder="Spør om pensum..." />
      <button class="ktn-chat-send" type="submit">Send</button>
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
      chapter,
      section: currentSection,
      url: window.location.pathname,
      visible_text: visible.length > 0
        ? visible.join("\n\n").substring(0, 6000)
        : el.innerText.substring(0, 6000)
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

  const loadingMessages = [
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

  function addLoadingIndicator() {
    const ESTIMATE_MS = 10000;
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

  async function sendMessage(question) {
    if (busy) return;
    busy = true;
    sendBtn.disabled = true;

    addMessage("user", question);

    const loader = addLoadingIndicator();

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          page_context: getPageContext(),
          history: history.slice(-10),
        }),
      });

      const data = await resp.json().catch(() => null);

      loader.remove();

      if (!resp.ok) {
        throw new Error(data?.error || `Server error (${resp.status})`);
      }

      const content = data?.content || "";
      addMessage("assistant", content);

      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content });
    } catch (err) {
      loader.remove();
      addError("Noe gikk galt: " + err.message);
    } finally {
      busy = false;
      sendBtn.disabled = false;
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
