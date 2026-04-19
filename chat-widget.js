(function () {
  if (window.__KTN_CHAT_WIDGET__) return;
  window.__KTN_CHAT_WIDGET__ = true;

  const API_URL = "/api/chat";
  const isEn = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const PRESET_STORAGE_KEY = "ktn_chat_model_preset";
  const DEFAULT_PRESET = "balanced";
  const PRESET_ORDER = ["fast", "balanced", "quality", "quality_alt"];

  /** Display names aligned with default OpenRouter slugs in api/chat.js (env can override server-side). */
  const PRESET_MODEL_NAMES = {
    fast: "Liquid LFM 2.5 1.2B Instruct",
    balanced: "Google Gemma 4 26B IT",
    quality: "NVIDIA Nemotron 3 Super 120B",
    quality_alt: "OpenAI GPT-OSS 120B",
  };

  const strings = isEn
    ? {
        openChat: "Open chat",
        title: "KTN study assistant",
        resetAria: "Reset chat",
        resetTitle: "Clear all messages and start a new conversation",
        closeAria: "Close chat",
        closeTitle: "Hide the chat panel",
        placeholder: "Ask about the curriculum…",
        send: "Send",
        hint: "Free models — response speed and quality vary with the option you choose.",
        errPrefix: "Something went wrong: ",
        presetGroupAria: "Response speed vs quality",
        presetPros: "Pros",
        presetCons: "Cons",
        presetModelLabel: "Model",
        presetTriggerHint: "Open list to change preset",
        presets: {
          fast: {
            lines: ["Small"],
            badge: "Fast",
            pros: [
              "Usually the quickest replies",
              "Light on resources",
              "Fine for short or simple questions",
            ],
            cons: [
              "Weaker Norwegian and terminology",
              "Less depth on harder topics",
              "Higher risk of oversimplifying",
            ],
          },
          balanced: {
            lines: ["Balanced"],
            badge: "Mid",
            pros: [
              "Solid tradeoff between speed and quality",
              "Reliable default for everyday use",
              "Predictable enough for most pages",
            ],
            cons: [
              "Not as capable as the heavy presets",
              "Can still take a few seconds when busy",
              "May miss nuance on very hard questions",
            ],
          },
          quality: {
            lines: ["Smarter", "slower"],
            badge: "Heavy",
            pros: [
              "Usually best Norwegian and accuracy",
              "Stronger reasoning on difficult questions",
              "Better for curriculum-style explanations",
            ],
            cons: [
              "Often slower than lighter presets",
              "May queue when traffic is high",
              "More variable latency",
            ],
          },
          quality_alt: {
            lines: ["Smarter (alt.)"],
            badge: "Alt.",
            pros: [
              "Alternative heavy free model (OpenAI GPT-OSS 120B)",
              "Can suit some task types better than the default heavy model",
              "Useful if the default heavy mode misbehaves",
            ],
            cons: [
              "Often heavy and slow",
              "Can be less stable under load",
              "Different tone and habits than the default heavy mode",
            ],
          },
        },
      }
    : {
        openChat: "Åpne chat",
        title: "KTN Studieassistent",
        resetAria: "Nullstill chat",
        resetTitle: "Slett alle meldinger og start en ny samtale",
        closeAria: "Lukk chat",
        closeTitle: "Skjul chatpanelet",
        placeholder: "Spør om pensum…",
        send: "Send",
        hint: "Gratis modeller - hastighet og kvalitet på svar varierer med valg",
        errPrefix: "Noe gikk galt: ",
        presetGroupAria: "Hastighet mot kvalitet",
        presetPros: "Fordeler",
        presetCons: "Ulemper",
        presetModelLabel: "Modell",
        presetTriggerHint: "Åpne liste for å bytte modus",
        presets: {
          fast: {
            lines: ["Lett"],
            badge: "Rask",
            pros: [
              "Oftest raskest svar",
              "Liten modell / lite ressursbruk",
              "Greit til korte eller enkle spørsmål",
            ],
            cons: [
              "Norsk og fagterminologi kan svekkes",
              "Mindre dybde på vanskelige oppgaver",
              "Større risiko for forenklinger",
            ],
          },
          balanced: {
            lines: ["Balansert"],
            badge: "Middels",
            pros: [
              "God balanse mellom fart og kvalitet",
              "Pålitelig standard for daglig bruk",
              "Stabilt nok til de fleste sider",
            ],
            cons: [
              "Ikke like «smart» som de tunge modusene",
              "Kan fortsatt ta noen sekunder ved last",
              "Kan miste nyanser på svært vanskelige spørsmål",
            ],
          },
          quality: {
            lines: ["Smartere,", "tregere"],
            badge: "Tung",
            pros: [
              "Vanligvis best norsk og presisjon",
              "Sterkere resonnering på vanskelige spørsmål",
              "Bedre til pensum-lignende forklaringer",
            ],
            cons: [
              "Oftest tregere enn lettere moduser",
              "Kan stå i kø ved høy trafikk",
              "Mer variabel forsinkelse (latency)",
            ],
          },
          quality_alt: {
            lines: ["Smartere (alt.)"],
            badge: "Alt.",
            pros: [
              "Alternativ tung gratismodell (OpenAI GPT-OSS 120B)",
              "Kan treffe bedre på enkelte typer oppgaver",
              "Nyttig hvis standard tung modus oppfører seg rart",
            ],
            cons: [
              "Ofte tung og treg",
              "Kan være mindre stabil under høy last",
              "Annet «tonefall» enn standard tung modus",
            ],
          },
        },
      };

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --ktn-chat-rail-width: 420px;
    }

    #ktn-chat-toggle {
      position: fixed;
      bottom: calc(28px + env(safe-area-inset-bottom, 0px));
      right: calc(28px + env(safe-area-inset-right, 0px));
      width: 54px; height: 54px;
      background: var(--rust, #b04428);
      border: none; border-radius: 50%;
      cursor: pointer; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      touch-action: manipulation;
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
      width: var(--ktn-chat-rail-width); height: 540px;
      max-width: calc(100vw - 24px); max-height: calc(100vh - 24px);
      background: var(--paper, #f4f1ea);
      border: 1px solid var(--line, #c9c0ae);
      border-radius: 14px; overflow: visible;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      z-index: 10000;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
    }
    #ktn-chat-panel.open {
      display: flex;
      min-height: 0;
      overscroll-behavior: contain;
    }

    .ktn-chat-header {
      padding: 14px 18px;
      background: rgba(244, 241, 234, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--line, #c9c0ae);
      color: var(--ink, #1a1612);
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    .ktn-chat-header strong { font-size: 15px; letter-spacing: .01em; color: var(--ink, #1a1612); }
    .ktn-chat-header-actions { display: flex; align-items: center; gap: 8px; }
    .ktn-chat-reset, .ktn-chat-close {
      background: none; border: none; color: var(--ink-faded, #6b6257);
      cursor: pointer; padding: 0 4px;
      line-height: 1; transition: color 0.15s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .ktn-chat-header-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      pointer-events: none;
    }
    .ktn-chat-reset:hover, .ktn-chat-close:hover { color: var(--rust, #b04428); }

    .ktn-chat-presets {
      flex-shrink: 0;
      position: relative;
      z-index: 5;
      padding: 8px 10px;
      border-bottom: 1px solid var(--line, #c9c0ae);
      background: rgba(26, 22, 18, 0.04);
    }
    .ktn-chat-presets.ktn-chat-presets--busy { pointer-events: none; opacity: 0.65; }

    .ktn-chat-preset-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--line, #c9c0ae);
      background: #fff;
      color: var(--ink, #1a1612);
      cursor: pointer;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      text-align: left;
      font-size: 13px;
      line-height: 1.25;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    }
    .ktn-chat-preset-trigger:hover {
      border-color: var(--ink-ghost, #a39886);
    }
    .ktn-chat-preset-trigger:focus-visible {
      outline: 2px solid var(--rust, #b04428);
      outline-offset: 1px;
    }
    .ktn-chat-preset-trigger--fast:focus-visible {
      outline-color: #1a6e3a;
    }
    .ktn-chat-preset-trigger--balanced:focus-visible {
      outline-color: #b04428;
    }
    .ktn-chat-preset-trigger--quality:focus-visible {
      outline-color: #1a5599;
    }
    .ktn-chat-preset-trigger--quality_alt:focus-visible {
      outline-color: #553685;
    }
    .ktn-chat-preset-trigger[aria-expanded="true"] {
      border-color: var(--rust, #b04428);
      box-shadow: 0 0 0 1px var(--rust, #b04428);
      background: var(--paper-dark, #e8e3d6);
    }
    .ktn-chat-preset-trigger--fast[aria-expanded="true"] {
      border-color: #1a6e3a;
      box-shadow: 0 0 0 1px #1a6e3a;
    }
    .ktn-chat-preset-trigger--balanced[aria-expanded="true"] {
      border-color: #b04428;
      box-shadow: 0 0 0 1px #b04428;
    }
    .ktn-chat-preset-trigger--quality[aria-expanded="true"] {
      border-color: #1a5599;
      box-shadow: 0 0 0 1px #1a5599;
    }
    .ktn-chat-preset-trigger--quality_alt[aria-expanded="true"] {
      border-color: #553685;
      box-shadow: 0 0 0 1px #553685;
    }
    .ktn-chat-preset-trigger-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }
    .ktn-chat-preset-trigger-chevron {
      flex-shrink: 0;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid var(--ink-ghost, #a39886);
      transition: transform 0.15s ease;
    }
    .ktn-chat-preset-trigger[aria-expanded="true"] .ktn-chat-preset-trigger-chevron {
      transform: rotate(180deg);
    }
    .ktn-chat-preset-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .ktn-chat-preset-badge--fast { background: #1a6e3a; }
    .ktn-chat-preset-badge--balanced { background: #b04428; }
    .ktn-chat-preset-badge--quality { background: #1a5599; }
    .ktn-chat-preset-badge--quality_alt { background: #553685; }
    .ktn-chat-preset-lines {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .ktn-chat-preset-sub {
      font-size: 11px;
      opacity: 0.78;
      font-weight: 400;
    }

    .ktn-chat-preset-dropdown {
      position: absolute;
      left: 10px;
      right: 10px;
      top: calc(100% - 1px);
      margin-top: 4px;
      max-height: min(340px, 55vh, 40dvh);
      overflow-y: auto;
      overflow-x: hidden;
      background: #fff;
      border: 1px solid var(--line, #c9c0ae);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,.14);
      z-index: 6;
    }
    .ktn-chat-preset-dropdown[hidden] {
      display: none !important;
    }
    .ktn-chat-preset-dropdown::-webkit-scrollbar { width: 5px; }
    .ktn-chat-preset-dropdown::-webkit-scrollbar-thumb {
      background: var(--line, #c9c0ae); border-radius: 4px;
    }

    .ktn-chat-preset-option {
      display: block;
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-bottom: 1px solid rgba(201, 192, 174, 0.55);
      background: #fff;
      color: var(--ink, #1a1612);
      cursor: pointer;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      text-align: left;
      transition: background 0.12s;
    }
    .ktn-chat-preset-option:last-child {
      border-bottom: none;
    }
    .ktn-chat-preset-option:hover {
      background: var(--paper-dark, #e8e3d6);
    }
    .ktn-chat-preset-option:focus-visible {
      outline: 2px solid var(--rust, #b04428);
      outline-offset: -2px;
      z-index: 1;
      position: relative;
    }
    .ktn-chat-preset-option[aria-selected="true"] {
      background: var(--paper-dark, #e8e3d6);
      box-shadow: inset 3px 0 0 var(--rust, #b04428);
    }
    .ktn-chat-preset-option--fast[aria-selected="true"] {
      box-shadow: inset 3px 0 0 #1a6e3a;
    }
    .ktn-chat-preset-option--balanced[aria-selected="true"] {
      box-shadow: inset 3px 0 0 #b04428;
    }
    .ktn-chat-preset-option--quality[aria-selected="true"] {
      box-shadow: inset 3px 0 0 #1a5599;
    }
    .ktn-chat-preset-option--quality_alt[aria-selected="true"] {
      box-shadow: inset 3px 0 0 #553685;
    }
    .ktn-chat-preset-option--fast:focus-visible {
      outline-color: #1a6e3a;
    }
    .ktn-chat-preset-option--balanced:focus-visible {
      outline-color: #b04428;
    }
    .ktn-chat-preset-option--quality:focus-visible {
      outline-color: #1a5599;
    }
    .ktn-chat-preset-option--quality_alt:focus-visible {
      outline-color: #553685;
    }
    .ktn-chat-preset-option-head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .ktn-chat-preset-option-label {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.2;
    }
    .ktn-chat-preset-option-model {
      margin: 0 0 6px;
      padding: 6px 8px;
      border-radius: 6px;
      font-size: 10px;
      line-height: 1.35;
      background: rgba(26, 22, 18, 0.06);
    }
    .ktn-chat-preset-option--fast .ktn-chat-preset-option-model {
      background: rgba(26, 110, 58, 0.1);
    }
    .ktn-chat-preset-option--balanced .ktn-chat-preset-option-model {
      background: rgba(176, 68, 40, 0.1);
    }
    .ktn-chat-preset-option--quality .ktn-chat-preset-option-model {
      background: rgba(26, 85, 153, 0.1);
    }
    .ktn-chat-preset-option--quality_alt .ktn-chat-preset-option-model {
      background: rgba(85, 54, 133, 0.1);
    }
    .ktn-chat-preset-option-model-k {
      display: block;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--ink-ghost, #a39886);
      margin-bottom: 2px;
    }
    .ktn-chat-preset-option-model-v {
      display: block;
      color: var(--ink, #1a1612);
      font-weight: 500;
      word-break: break-word;
    }
    .ktn-chat-preset-option-block {
      margin-top: 4px;
      font-size: 10px;
      line-height: 1.35;
      color: var(--ink, #1a1612);
    }
    .ktn-chat-preset-option-block:first-of-type {
      margin-top: 0;
    }
    .ktn-chat-preset-option-k {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--ink-ghost, #a39886);
      margin-bottom: 2px;
    }
    .ktn-chat-preset-option-block ul {
      margin: 0;
      padding-left: 14px;
    }
    .ktn-chat-preset-option-block li {
      margin: 1px 0;
    }

    .ktn-chat-messages-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .ktn-chat-messages {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 18px;
      display: flex; flex-direction: column; gap: 14px;
    }
    .ktn-chat-messages::-webkit-scrollbar { width: 5px; }
    .ktn-chat-messages::-webkit-scrollbar-thumb {
      background: var(--line, #c9c0ae); border-radius: 4px;
    }

    .ktn-scroll-to-bottom {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--rust, #b04428);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,.28);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease;
      z-index: 2;
    }
    .ktn-scroll-to-bottom.visible {
      opacity: 1;
      pointer-events: auto;
    }
    .ktn-scroll-to-bottom:hover {
      background: var(--rust-dark, #8a3420);
    }
    .ktn-scroll-to-bottom svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .ktn-msg {
      max-width: 88%;
      line-height: 1.55;
      font-size: 14.5px;
      flex-shrink: 0;
    }
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
      /* normal: marked outputs newlines between tags; pre-wrap turned those into huge gaps */
      white-space: normal;
      word-wrap: break-word;
      overflow-x: auto;
      overflow-y: visible;
      min-width: 0;
    }
    .ktn-msg-assistant .katex { font-size: 0.95em; }
    .ktn-msg-assistant .katex-display { margin: 0.5em 0; overflow-x: auto; overflow-y: hidden; }
    .ktn-msg-assistant > :first-child { margin-top: 0; }
    .ktn-msg-assistant > :last-child { margin-bottom: 0; }
    .ktn-msg-assistant p { margin: 0.4em 0; }
    .ktn-msg-assistant h1, .ktn-msg-assistant h2, .ktn-msg-assistant h3,
    .ktn-msg-assistant h4, .ktn-msg-assistant h5, .ktn-msg-assistant h6 {
      margin: 0.55em 0 0.35em;
      font-weight: 600;
      line-height: 1.25;
    }
    .ktn-msg-assistant h1 { font-size: 1.25em; }
    .ktn-msg-assistant h2 { font-size: 1.15em; }
    .ktn-msg-assistant h3 { font-size: 1.08em; }
    .ktn-msg-assistant ul, .ktn-msg-assistant ol {
      margin: 0.35em 0;
      padding-left: 1.35em;
    }
    .ktn-msg-assistant li { margin: 0.2em 0; }
    .ktn-msg-assistant li > p { margin: 0.25em 0; }
    .ktn-msg-assistant li > p:first-child { margin-top: 0; }
    .ktn-msg-assistant li > p:last-child { margin-bottom: 0; }
    .ktn-msg-assistant blockquote {
      margin: 0.45em 0;
      padding: 0.2em 0 0.2em 0.75em;
      border-left: 3px solid var(--line, #c9c0ae);
      color: var(--ink-faded, #5c5348);
    }
    .ktn-msg-assistant a {
      color: var(--rust, #b04428);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .ktn-msg-assistant a:hover { color: var(--rust-dark, #8a3420); }
    .ktn-msg-assistant hr {
      border: none;
      border-top: 1px solid var(--line, #c9c0ae);
      margin: 0.65em 0;
    }
    .ktn-msg-assistant table {
      border-collapse: collapse;
      margin: 0.5em 0;
      font-size: 13px;
      max-width: 100%;
    }
    .ktn-msg-assistant th, .ktn-msg-assistant td {
      border: 1px solid var(--line, #c9c0ae);
      padding: 4px 8px;
      text-align: left;
    }
    .ktn-msg-assistant th {
      background: rgba(0,0,0,.06);
      font-weight: 600;
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

    .ktn-chat-messages-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .ktn-chat-messages-wrap .ktn-chat-messages {
      flex: 1;
    }
    .ktn-chat-scroll-arrow {
      display: none;
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1px solid var(--line, #c9c0ae);
      background: var(--paper, #f4f1ea);
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
      cursor: pointer;
      align-items: center;
      justify-content: center;
      transition: opacity .18s ease, transform .18s ease;
      opacity: 0;
    }
    .ktn-chat-scroll-arrow.visible {
      display: flex;
      opacity: 1;
    }
    .ktn-chat-scroll-arrow:hover {
      background: var(--paper-dark, #e8e3d6);
      transform: translateX(-50%) scale(1.08);
    }
    .ktn-chat-scroll-arrow svg {
      width: 18px; height: 18px;
      fill: none;
      stroke: var(--ink, #1a1612);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
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

    @keyframes ktnChatRailPanelIn {
      from { opacity: 0.88; transform: translateX(12px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @media (min-width: 769px) {
      body {
        transition: padding-right 0.28s ease;
      }
      body.ktn-chat-open {
        padding-right: var(--ktn-chat-rail-width);
      }
      #ktn-chat-panel {
        top: 0;
        right: 0;
        bottom: 0;
        left: auto;
        width: var(--ktn-chat-rail-width);
        height: 100vh;
        height: 100dvh;
        max-width: none;
        max-height: none;
        border-radius: 12px 0 0 12px;
        border-right: none;
        box-shadow: -8px 0 32px rgba(0,0,0,.14);
      }
      #ktn-chat-panel.open {
        animation: ktnChatRailPanelIn 0.28s ease;
      }
    }

    @media (min-width: 769px) and (prefers-reduced-motion: reduce) {
      body { transition: none; }
      #ktn-chat-panel.open { animation: none; }
    }

    @media (max-width: 768px) {
      #ktn-chat-panel {
        top: 0; left: 0; bottom: 0; right: 0;
        width: 100%; height: 100vh;
        height: 100dvh;
        max-width: 100%; max-height: 100%;
        border-radius: 0;
        min-height: 0;
      }
      #ktn-chat-panel .ktn-chat-header {
        padding-top: calc(14px + env(safe-area-inset-top, 0px));
        padding-left: calc(18px + env(safe-area-inset-left, 0px));
        padding-right: calc(18px + env(safe-area-inset-right, 0px));
      }
      #ktn-chat-panel .ktn-chat-header-actions {
        gap: 4px;
      }
      #ktn-chat-panel .ktn-chat-reset,
      #ktn-chat-panel .ktn-chat-close {
        min-width: 44px;
        min-height: 44px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        touch-action: manipulation;
      }
      #ktn-chat-panel .ktn-chat-presets {
        padding-left: calc(10px + env(safe-area-inset-left, 0px));
        padding-right: calc(10px + env(safe-area-inset-right, 0px));
      }
      #ktn-chat-panel .ktn-chat-messages {
        padding-left: calc(18px + env(safe-area-inset-left, 0px));
        padding-right: calc(18px + env(safe-area-inset-right, 0px));
      }
      #ktn-chat-panel .ktn-chat-form {
        padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
        padding-left: calc(14px + env(safe-area-inset-left, 0px));
        padding-right: calc(14px + env(safe-area-inset-right, 0px));
      }
      #ktn-chat-panel .ktn-chat-input {
        font-size: 16px;
        touch-action: manipulation;
      }
      #ktn-chat-panel .ktn-chat-send {
        font-size: 16px;
        min-height: 44px;
        padding: 9px 16px;
        touch-action: manipulation;
      }
      #ktn-chat-panel .ktn-chat-preset-dropdown {
        max-height: min(320px, 50vh, 38dvh);
      }
      body.ktn-chat-open {
        padding-right: 0;
        overflow: hidden !important;
        overscroll-behavior: none;
      }
    }

    @media (max-width: 380px) {
      #ktn-chat-panel .ktn-chat-form {
        flex-wrap: wrap;
      }
      #ktn-chat-panel .ktn-chat-input {
        flex: 1 1 100%;
        min-width: 0;
      }
      #ktn-chat-panel .ktn-chat-send {
        flex: 1 1 100%;
        width: 100%;
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
        <button class="ktn-chat-reset" type="button" aria-label="${strings.resetAria}" title="${strings.resetTitle.replace(/"/g, "&quot;")}">
          <svg class="ktn-chat-header-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <path d="M12 7v6"/>
            <path d="M9 10h6"/>
          </svg>
        </button>
        <button class="ktn-chat-close" type="button" aria-label="${strings.closeAria}" title="${strings.closeTitle.replace(/"/g, "&quot;")}">
          <svg class="ktn-chat-header-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="ktn-chat-presets" id="ktn-chat-presets"></div>
    <div class="ktn-chat-messages-wrap">
      <div class="ktn-chat-messages"></div>
      <button class="ktn-chat-scroll-arrow" type="button" aria-label="Scroll to bottom">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
    <form class="ktn-chat-form" autocomplete="off">
      <input class="ktn-chat-input" placeholder="${strings.placeholder.replace(/"/g, "&quot;")}" />
      <div class="ktn-chat-hint">${strings.hint}</div>
      <button class="ktn-chat-send" type="submit">${strings.send}</button>
    </form>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const messagesEl = panel.querySelector(".ktn-chat-messages");
  const scrollArrow = panel.querySelector(".ktn-chat-scroll-arrow");
  const form = panel.querySelector(".ktn-chat-form");
  const input = panel.querySelector(".ktn-chat-input");
  const sendBtn = panel.querySelector(".ktn-chat-send");
  const closeBtn = panel.querySelector(".ktn-chat-close");
  const resetBtn = panel.querySelector(".ktn-chat-reset");
  const presetsEl = panel.querySelector("#ktn-chat-presets");
  const hintEl = panel.querySelector(".ktn-chat-hint");

  const SCROLL_BOTTOM_THRESHOLD = 60;

  function isNearBottom() {
    return (
      messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight <
      SCROLL_BOTTOM_THRESHOLD
    );
  }

  function updateScrollButton() {
    if (isNearBottom()) {
      scrollArrow.classList.remove("visible");
    } else {
      scrollArrow.classList.add("visible");
    }
  }

  messagesEl.addEventListener("scroll", updateScrollButton, { passive: true });

  scrollArrow.addEventListener("click", () => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
    scrollArrow.classList.remove("visible");
  });

  let selectedPreset = DEFAULT_PRESET;

  const listboxId = "ktn-chat-preset-listbox";
  let presetDropdownOpen = false;
  let presetOutsideCloseBound = null;
  const presetOptionButtons = [];

  function presetHumanLabel(spec) {
    if (spec.lines.length === 1) return spec.lines[0].trim();
    const first = spec.lines[0].replace(/\s*,\s*$/, "").trim();
    return first + ", " + spec.lines[1].trim();
  }

  const presetTrigger = document.createElement("button");
  presetTrigger.type = "button";
  presetTrigger.className = "ktn-chat-preset-trigger";
  presetTrigger.id = "ktn-chat-preset-trigger";
  presetTrigger.setAttribute("aria-haspopup", "listbox");
  presetTrigger.setAttribute("aria-expanded", "false");
  presetTrigger.setAttribute("aria-controls", listboxId);

  const listbox = document.createElement("div");
  listbox.id = listboxId;
  listbox.setAttribute("role", "listbox");
  listbox.className = "ktn-chat-preset-dropdown";
  listbox.setAttribute("aria-label", strings.presetGroupAria);
  listbox.hidden = true;

  function renderTriggerInner() {
    const spec = strings.presets[selectedPreset];
    presetTrigger.className =
      "ktn-chat-preset-trigger ktn-chat-preset-trigger--" + selectedPreset;
    const inner = document.createElement("span");
    inner.className = "ktn-chat-preset-trigger-inner";
    if (spec.badge) {
      const badge = document.createElement("span");
      badge.className = "ktn-chat-preset-badge ktn-chat-preset-badge--" + selectedPreset;
      badge.textContent = spec.badge;
      inner.appendChild(badge);
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
    inner.appendChild(linesWrap);
    const chev = document.createElement("span");
    chev.className = "ktn-chat-preset-trigger-chevron";
    chev.setAttribute("aria-hidden", "true");
    presetTrigger.replaceChildren(inner, chev);
    presetTrigger.setAttribute(
      "aria-label",
      strings.presetGroupAria +
        ": " +
        presetHumanLabel(spec) +
        ". " +
        strings.presetModelLabel +
        ": " +
        PRESET_MODEL_NAMES[selectedPreset] +
        ". " +
        strings.presetTriggerHint
    );
  }

  function focusPresetOptionIndex(idx) {
    const clamped = Math.max(0, Math.min(idx, presetOptionButtons.length - 1));
    presetOptionButtons.forEach((b, i) => {
      b.setAttribute("tabindex", i === clamped ? "0" : "-1");
    });
    presetOptionButtons[clamped].focus();
  }

  function getPresetOptionIndex(id) {
    return PRESET_ORDER.indexOf(id);
  }

  function closePresetDropdown() {
    if (!presetDropdownOpen) return;
    presetDropdownOpen = false;
    listbox.hidden = true;
    presetTrigger.setAttribute("aria-expanded", "false");
    presetOptionButtons.forEach((b) => {
      b.setAttribute("tabindex", "-1");
    });
    if (presetOutsideCloseBound) {
      document.removeEventListener("mousedown", presetOutsideCloseBound, true);
      document.removeEventListener("touchstart", presetOutsideCloseBound, true);
      presetOutsideCloseBound = null;
    }
  }

  function openPresetDropdown() {
    if (presetDropdownOpen) return;
    presetDropdownOpen = true;
    listbox.hidden = false;
    presetTrigger.setAttribute("aria-expanded", "true");
    const idx = getPresetOptionIndex(selectedPreset);
    requestAnimationFrame(() => {
      focusPresetOptionIndex(idx >= 0 ? idx : 0);
    });
    presetOutsideCloseBound = function (e) {
      if (!presetsEl.contains(e.target)) closePresetDropdown();
    };
    document.addEventListener("mousedown", presetOutsideCloseBound, true);
    document.addEventListener("touchstart", presetOutsideCloseBound, true);
  }

  function togglePresetDropdown() {
    if (presetDropdownOpen) closePresetDropdown();
    else openPresetDropdown();
  }

  presetTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    togglePresetDropdown();
  });

  presetTrigger.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && presetDropdownOpen) {
      e.preventDefault();
      closePresetDropdown();
      return;
    }
    if (e.key === "ArrowDown" && !presetDropdownOpen) {
      e.preventDefault();
      openPresetDropdown();
    }
  });

  listbox.addEventListener("keydown", function (e) {
    const opts = presetOptionButtons;
    const cur = opts.findIndex(function (b) {
      return b.getAttribute("tabindex") === "0";
    });
    const i = cur >= 0 ? cur : 0;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closePresetDropdown();
      presetTrigger.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusPresetOptionIndex(Math.min(i + 1, opts.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusPresetOptionIndex(Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      focusPresetOptionIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusPresetOptionIndex(opts.length - 1);
    }
  });

  PRESET_ORDER.forEach(function (id) {
    const spec = strings.presets[id];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ktn-chat-preset-option ktn-chat-preset-option--" + id;
    btn.dataset.preset = id;
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("tabindex", "-1");

    const head = document.createElement("div");
    head.className = "ktn-chat-preset-option-head";
    if (spec.badge) {
      const badge = document.createElement("span");
      badge.className = "ktn-chat-preset-badge ktn-chat-preset-badge--" + id;
      badge.textContent = spec.badge;
      head.appendChild(badge);
    }
    const labelEl = document.createElement("span");
    labelEl.className = "ktn-chat-preset-option-label";
    labelEl.textContent = presetHumanLabel(spec);
    head.appendChild(labelEl);
    btn.appendChild(head);

    const modelRow = document.createElement("div");
    modelRow.className = "ktn-chat-preset-option-model";
    const modelK = document.createElement("span");
    modelK.className = "ktn-chat-preset-option-model-k";
    modelK.textContent = strings.presetModelLabel;
    const modelV = document.createElement("span");
    modelV.className = "ktn-chat-preset-option-model-v";
    modelV.textContent = PRESET_MODEL_NAMES[id];
    modelRow.appendChild(modelK);
    modelRow.appendChild(modelV);
    btn.appendChild(modelRow);

    const prosBlock = document.createElement("div");
    prosBlock.className = "ktn-chat-preset-option-block";
    const prosK = document.createElement("div");
    prosK.className = "ktn-chat-preset-option-k";
    prosK.textContent = strings.presetPros;
    const prosUl = document.createElement("ul");
    spec.pros.forEach(function (t) {
      const li = document.createElement("li");
      li.textContent = t;
      prosUl.appendChild(li);
    });
    prosBlock.appendChild(prosK);
    prosBlock.appendChild(prosUl);
    btn.appendChild(prosBlock);

    const consBlock = document.createElement("div");
    consBlock.className = "ktn-chat-preset-option-block";
    const consK = document.createElement("div");
    consK.className = "ktn-chat-preset-option-k";
    consK.textContent = strings.presetCons;
    const consUl = document.createElement("ul");
    spec.cons.forEach(function (t) {
      const li = document.createElement("li");
      li.textContent = t;
      consUl.appendChild(li);
    });
    consBlock.appendChild(consK);
    consBlock.appendChild(consUl);
    btn.appendChild(consBlock);

    btn.addEventListener("click", function () {
      setSelectedPreset(id);
      closePresetDropdown();
      presetTrigger.focus();
    });

    listbox.appendChild(btn);
    presetOptionButtons.push(btn);
  });

  presetsEl.appendChild(presetTrigger);
  presetsEl.appendChild(listbox);

  function syncPresetUI() {
    renderTriggerInner();
    presetOptionButtons.forEach(function (btn) {
      btn.setAttribute("aria-selected", btn.dataset.preset === selectedPreset ? "true" : "false");
    });
  }

  function setSelectedPreset(id) {
    if (!PRESET_ORDER.includes(id)) return;
    selectedPreset = id;
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, id);
    } catch (_) {}
    syncPresetUI();
  }

  syncPresetUI();

  let history = [];
  let busy = false;
  const pendingQuestions = [];

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function clearPanelViewportStyles() {
    panel.style.height = "";
    panel.style.top = "";
    panel.style.bottom = "";
  }

  function syncPanelViewport() {
    if (!panel.classList.contains("open") || !isMobile()) {
      clearPanelViewportStyles();
      return;
    }
    if (window.visualViewport) {
      const vv = window.visualViewport;
      panel.style.top = vv.offsetTop + "px";
      panel.style.height = vv.height + "px";
      panel.style.bottom = "auto";
    } else {
      panel.style.top = "0px";
      panel.style.height = window.innerHeight + "px";
      panel.style.bottom = "auto";
    }
  }

  let syncViewportRafId = 0;
  function scheduleSyncPanelViewport() {
    if (syncViewportRafId) return;
    syncViewportRafId = requestAnimationFrame(() => {
      syncViewportRafId = 0;
      syncPanelViewport();
    });
  }

  toggle.addEventListener("click", () => {
    panel.classList.add("open");
    toggle.style.display = "none";
    setSelectedPreset(DEFAULT_PRESET);
    document.body.classList.add("ktn-chat-open");
    if (isMobile()) {
      scheduleSyncPanelViewport();
    }
    updateScrollButton();
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    closePresetDropdown();
    if (syncViewportRafId) {
      cancelAnimationFrame(syncViewportRafId);
      syncViewportRafId = 0;
    }
    panel.classList.remove("open");
    toggle.style.display = "flex";
    document.body.classList.remove("ktn-chat-open");
    clearPanelViewportStyles();
  });

  resetBtn.addEventListener("click", () => {
    history = [];
    pendingQuestions.length = 0;
    messagesEl.innerHTML = "";
    if (hintEl) hintEl.hidden = false;
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

  const KTN_MARKED_SRC =
    "https://cdn.jsdelivr.net/npm/marked@15.0.7/lib/marked.umd.min.js";
  const KTN_MARKED_INTEGRITY =
    "sha384-EjL6IeH3KCXB9dkBQaYqnb/m6V3TOBP++kooL0bl43Vt6eCFJ2Pxck/B/dU4PB8d";
  const KTN_DOMPURIFY_SRC =
    "https://cdn.jsdelivr.net/npm/dompurify@3.2.4/dist/purify.min.js";
  const KTN_DOMPURIFY_INTEGRITY =
    "sha384-eEu5CTj3qGvu9PdJuS+YlkNi7d2XxQROAFYOr59zgObtlcux1ae1Il3u7jvdCSWu";

  const KTN_KATEX_VERSION = "0.16.21";
  const KTN_KATEX_CSS_HREF =
    "https://cdn.jsdelivr.net/npm/katex@" + KTN_KATEX_VERSION + "/dist/katex.min.css";
  const KTN_KATEX_CSS_INTEGRITY =
    "sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib";
  const KTN_KATEX_JS_SRC =
    "https://cdn.jsdelivr.net/npm/katex@" + KTN_KATEX_VERSION + "/dist/katex.min.js";
  const KTN_KATEX_JS_INTEGRITY =
    "sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh";
  const KTN_KATEX_AUTORENDER_SRC =
    "https://cdn.jsdelivr.net/npm/katex@" +
    KTN_KATEX_VERSION +
    "/dist/contrib/auto-render.min.js";
  const KTN_KATEX_AUTORENDER_INTEGRITY =
    "sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh";

  const KTN_KATEX_DELIMITERS = [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ];

  let markdownLibsPromise = null;
  let markdownLibsReady = false;
  let markdownMarkedConfigured = false;

  function loadExternalScript(src, integrity) {
    return new Promise(function (resolve, reject) {
      const sel = 'script[data-ktn-chat-lib="' + src.replace(/"/g, "") + '"]';
      const existing = document.querySelector(sel);
      if (existing) {
        if (existing.getAttribute("data-ktn-loaded") === "1") {
          resolve();
          return;
        }
        existing.addEventListener(
          "load",
          function () {
            resolve();
          },
          { once: true }
        );
        existing.addEventListener(
          "error",
          function () {
            reject(new Error("script load failed"));
          },
          { once: true }
        );
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.integrity = integrity;
      s.crossOrigin = "anonymous";
      s.setAttribute("data-ktn-chat-lib", src);
      s.onload = function () {
        s.setAttribute("data-ktn-loaded", "1");
        resolve();
      };
      s.onerror = function () {
        reject(new Error("script load failed"));
      };
      document.head.appendChild(s);
    });
  }

  function loadExternalStylesheet(href, integrity) {
    return new Promise(function (resolve, reject) {
      const sel = 'link[data-ktn-chat-lib="' + href.replace(/"/g, "") + '"]';
      const existing = document.querySelector(sel);
      if (existing) {
        if (existing.getAttribute("data-ktn-loaded") === "1") {
          resolve();
          return;
        }
        existing.addEventListener(
          "load",
          function () {
            resolve();
          },
          { once: true }
        );
        existing.addEventListener(
          "error",
          function () {
            reject(new Error("stylesheet load failed"));
          },
          { once: true }
        );
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.integrity = integrity;
      link.crossOrigin = "anonymous";
      link.setAttribute("data-ktn-chat-lib", href);
      link.onload = function () {
        link.setAttribute("data-ktn-loaded", "1");
        resolve();
      };
      link.onerror = function () {
        reject(new Error("stylesheet load failed"));
      };
      document.head.appendChild(link);
    });
  }

  function loadKatexAssets() {
    return loadExternalStylesheet(KTN_KATEX_CSS_HREF, KTN_KATEX_CSS_INTEGRITY)
      .then(function () {
        return loadExternalScript(KTN_KATEX_JS_SRC, KTN_KATEX_JS_INTEGRITY);
      })
      .then(function () {
        return loadExternalScript(KTN_KATEX_AUTORENDER_SRC, KTN_KATEX_AUTORENDER_INTEGRITY);
      })
      .catch(function (err) {
        console.warn("KTN chat: KaTeX could not load; formulas stay as plain text", err);
      });
  }

  function typesetMathIn(el) {
    if (!el || typeof renderMathInElement !== "function") return;
    try {
      renderMathInElement(el, {
        delimiters: KTN_KATEX_DELIMITERS,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
        strict: false,
        throwOnError: false,
      });
    } catch (e) {
      console.warn("KTN chat: KaTeX typeset failed", e);
    }
  }

  function configureMarkedOnce() {
    if (markdownMarkedConfigured) return;
    const m = typeof marked !== "undefined" ? marked : null;
    if (!m || typeof m.use !== "function") return;
    m.use({ breaks: false, gfm: true });
    markdownMarkedConfigured = true;
  }

  function ensureMarkdownLibs() {
    if (markdownLibsReady) return Promise.resolve();

    function afterMarkdownGlobalsLoaded() {
      configureMarkedOnce();
      return loadKatexAssets();
    }

    if (
      typeof marked !== "undefined" &&
      marked &&
      typeof marked.parse === "function" &&
      typeof DOMPurify !== "undefined" &&
      DOMPurify &&
      typeof DOMPurify.sanitize === "function"
    ) {
      if (!markdownLibsPromise) {
        markdownLibsPromise = afterMarkdownGlobalsLoaded()
          .then(function () {
            markdownLibsReady = true;
          })
          .catch(function (err) {
            console.warn("KTN chat: setup after markdown globals failed", err);
            markdownLibsReady = true;
            markdownLibsPromise = null;
          });
      }
      return markdownLibsPromise;
    }
    if (!markdownLibsPromise) {
      markdownLibsPromise = loadExternalScript(KTN_MARKED_SRC, KTN_MARKED_INTEGRITY)
        .then(function () {
          return loadExternalScript(KTN_DOMPURIFY_SRC, KTN_DOMPURIFY_INTEGRITY);
        })
        .then(function () {
          if (
            typeof marked === "undefined" ||
            !marked.parse ||
            typeof DOMPurify === "undefined" ||
            !DOMPurify.sanitize
          ) {
            throw new Error("markdown globals missing");
          }
          return afterMarkdownGlobalsLoaded();
        })
        .then(function () {
          markdownLibsReady = true;
        })
        .catch(function (err) {
          console.warn("KTN chat: could not load markdown libraries, using plain text fallback", err);
          markdownLibsPromise = null;
        });
    }
    return markdownLibsPromise || Promise.resolve();
  }

  /**
   * Fenced blocks become &lt;pre&gt;&lt;code&gt; and are skipped by KaTeX.
   * Unwrap ```latex|tex|math ... ``` and bare ``` ... ``` when the body looks like LaTeX math.
   */
  function unwrapLatexFencedBlocks(raw) {
    const lines = String(raw).split(/\r?\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const openM = lines[i].match(/^```(\w*)\s*$/);
      if (!openM) {
        out.push(lines[i]);
        continue;
      }
      const lang = (openM[1] || "").toLowerCase();
      const start = i;
      const inner = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        inner.push(lines[i]);
        i++;
      }
      const closed = i < lines.length && /^```\s*$/.test(lines[i]);
      if (!closed) {
        for (let k = start; k < lines.length; k++) {
          out.push(lines[k]);
        }
        break;
      }
      const body = inner.join("\n");
      const unwrapLang = lang === "latex" || lang === "tex" || lang === "math";
      const t = body.trim();
      const unwrapBare =
        lang === "" &&
        (/^\$\$/.test(t) || /^\\\[/m.test(t) || /^\\\(/m.test(t)) &&
        /\\[a-zA-Z]/.test(body);
      if (unwrapLang || unwrapBare) {
        out.push(body);
      } else {
        out.push(lines[start]);
        for (let z = 0; z < inner.length; z++) {
          out.push(inner[z]);
        }
        out.push(lines[i]);
      }
    }
    return out.join("\n");
  }

  /**
   * Models sometimes put a one-line expression in parentheses instead of "\\(...\\)".
   * Only lines that look like formulas (has ^, \\, or =) to avoid normal prose in parens.
   */
  function normalizeParenInlineMath(raw) {
    return String(raw).replace(/^\(([^)\n]{1,200})\)\s*$/gm, function (full, inner) {
      if (/]\s*\(/.test(inner)) return full;
      if (/https?:\/\//i.test(inner)) return full;
      if (!/[\\^=]/.test(inner)) return full;
      return "\\(" + inner + "\\)";
    });
  }

  /**
   * If a ``` fence was opened but not yet closed (common while streaming), marked treats the
   * rest of the message as one code block. Append a synthetic closing fence for parse only.
   */
  function closeOddCodeFencesForParse(md) {
    const t = String(md);
    const lines = t.split(/\r?\n/);
    let n = 0;
    for (let i = 0; i < lines.length; i++) {
      if (/^[\t ]{0,3}```\s*[\w.-]*\s*$/.test(lines[i])) n++;
    }
    if (n % 2 === 1) return t + "\n```\n";
    return t;
  }

  /**
   * Apply a transform only to text outside GFM-style ``` fenced regions (toggle on fence lines).
   * Inline $...$ must not be touched inside fences or valid code (e.g. `$HOME`) could break.
   */
  function transformOutsideCodeFences(md, lineTransform) {
    const lines = String(md).split(/\r?\n/);
    const out = [];
    let buf = [];
    let inFence = false;
    function flush() {
      if (!buf.length) return;
      const chunk = lineTransform(buf.join("\n"));
      out.push.apply(out, chunk.split(/\n/));
      buf = [];
    }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^[\t ]{0,3}```\s*[\w.-]*\s*$/.test(line)) {
        flush();
        out.push(line);
        inFence = !inFence;
        continue;
      }
      if (inFence) {
        flush();
        out.push(line);
      } else {
        buf.push(line);
      }
    }
    flush();
    return out.join("\n");
  }

  /**
   * marked/GFM treats "_" as emphasis and breaks LaTeX (e.g. \\sum_{n=1}). Strip delimited math
   * out before Markdown, then splice it back into the HTML so KaTeX still sees $$...$$ etc.
   * Inline $...$ must be masked too (after $$) or underscores and backticks corrupt it.
   * Placeholders stay inline (no blank lines) so $$...$$ is not forced into its own <p>.
   */
  function protectDelimitedMathForMarkdown(mdIn) {
    const blocks = [];
    let s = String(mdIn);
    const INLINE_DOLLAR_MAX = 1500;
    const inlineDollarRe = /(?<!\$)\$(?!\$)((?:\\.|[^$\n\r\\])+?)\$(?!\$)/g;
    function mask(re) {
      s = s.replace(re, function (m) {
        const id = blocks.length;
        blocks.push(m);
        return "KTNXMTHPH" + id + "XZ";
      });
    }
    mask(/\$\$[\s\S]*?\$\$/g);
    mask(/\\\[[\s\S]*?\\\]/g);
    mask(/\\\([\s\S]*?\\\)/g);
    s = transformOutsideCodeFences(s, function (chunk) {
      return chunk.replace(inlineDollarRe, function (full, inner) {
        if (!inner || inner.length > INLINE_DOLLAR_MAX) return full;
        const id = blocks.length;
        blocks.push(full);
        return "KTNXMTHPH" + id + "XZ";
      });
    });
    return { md: s, blocks: blocks };
  }

  function restoreMathPlaceholders(html, blocks) {
    let h = html;
    for (let i = 0; i < blocks.length; i++) {
      const tok = "KTNXMTHPH" + i + "XZ";
      /* Legacy: newline-wrapped tokens used to become a whole <p>; keep for old cached HTML. */
      h = h.replace(new RegExp("<p>\\s*" + tok + "\\s*</p>", "gi"), blocks[i]);
      h = h.split(tok).join(blocks[i]);
    }
    return h;
  }

  /**
   * Models often wrap display math in plain "[" ... "]" lines instead of "\\[...\\]" or "$$".
   * KaTeX auto-render only sees standard delimiters; normalize likely LaTeX blocks to $$...$$.
   * Covers: "[" alone on a line … "]" alone; "[" then "\\cmd" on the same line … "]" alone;
   * and a single line "[ ... \\cmd ... ]".
   */
  function normalizeLooseMathDelimiters(raw) {
    const text = String(raw);

    function multilineBlocks(s) {
      const lines = s.split("\n");
      const out = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "[") {
          out.push(lines[i]);
          continue;
        }
        const start = i;
        const innerLines = [];
        let j = i + 1;
        let closeIdx = -1;
        for (; j < lines.length; j++) {
          if (lines[j].trim() === "]") {
            closeIdx = j;
            break;
          }
          innerLines.push(lines[j]);
        }
        if (closeIdx === -1) {
          out.push(lines[i]);
          continue;
        }
        const inner = innerLines.join("\n");
        if (!/\\[a-zA-Z]/.test(inner)) {
          for (let k = start; k <= closeIdx; k++) {
            out.push(lines[k]);
          }
          i = closeIdx;
          continue;
        }
        out.push("$$");
        out.push(inner);
        out.push("$$");
        i = closeIdx;
      }
      return out.join("\n");
    }

    /**
     * "[ \\foo ..." on the first line with a later line that is only "]" (common LLM mistake).
     * multilineBlocks only handles when "[" is alone on its line.
     */
    function sameLineOpenBracketBlocks(s) {
      const lines = s.split("\n");
      const out = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!/^\[\s*\\[a-zA-Z]/.test(line)) {
          out.push(line);
          continue;
        }
        if (line.trim() === "[") {
          out.push(line);
          continue;
        }
        let closeIdx = -1;
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].trim() === "]") {
            closeIdx = j;
            break;
          }
        }
        if (closeIdx === -1) {
          out.push(line);
          continue;
        }
        const firstInner = line.replace(/^\[\s*/, "");
        const middle = lines.slice(i + 1, closeIdx);
        const inner = middle.length ? firstInner + "\n" + middle.join("\n") : firstInner;
        if (!/\\[a-zA-Z]/.test(inner) || /\]\s*\(/.test(inner)) {
          for (let k = i; k <= closeIdx; k++) {
            out.push(lines[k]);
          }
          i = closeIdx;
          continue;
        }
        out.push("$$");
        out.push(inner);
        out.push("$$");
        i = closeIdx;
      }
      return out.join("\n");
    }

    let s = multilineBlocks(text);
    s = sameLineOpenBracketBlocks(s);
    s = s.replace(/^\[\s*(\\[a-zA-Z]+[\s\S]*)\s*\]$/gm, function (full, inner) {
      if (/\]\s*\(/.test(inner)) return full;
      return "$$" + inner + "$$";
    });
    return s;
  }

  function renderMarkdownFallback(raw) {
    let html = escapeHtml(raw);

    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return "<pre><code>" + code.trimEnd() + "</code></pre>";
    });

    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

    return html;
  }

  function renderMarkdown(raw) {
    if (raw == null || raw === "") return "";
    if (
      markdownLibsReady &&
      typeof marked !== "undefined" &&
      marked &&
      typeof marked.parse === "function" &&
      typeof DOMPurify !== "undefined" &&
      DOMPurify &&
      typeof DOMPurify.sanitize === "function"
    ) {
      try {
        const fenced = closeOddCodeFencesForParse(raw);
        const unwrapped = unwrapLatexFencedBlocks(fenced);
        const prepared = normalizeLooseMathDelimiters(unwrapped);
        const withParen = normalizeParenInlineMath(prepared);
        const prot = protectDelimitedMathForMarkdown(withParen);
        const dirty = marked.parse(prot.md, { async: false });
        const restored = restoreMathPlaceholders(dirty, prot.blocks);
        return DOMPurify.sanitize(restored);
      } catch (e) {
        console.warn("KTN chat: markdown parse failed, using fallback", e);
      }
    }
    return renderMarkdownFallback(raw);
  }

  function addMessage(role, content) {
    const div = document.createElement("div");
    div.className = "ktn-msg " + (role === "user" ? "ktn-msg-user" : "ktn-msg-assistant");
    if (role === "user") {
      div.textContent = content;
    } else {
      div.innerHTML = renderMarkdown(content);
      typesetMathIn(div);
    }
    messagesEl.appendChild(div);
    scrollMessagesToBottom(true);
    return div;
  }

  function addError(msg) {
    const div = document.createElement("div");
    div.className = "ktn-msg ktn-msg-error";
    div.textContent = msg;
    messagesEl.appendChild(div);
    scrollMessagesToBottom(true);
  }

  function isMessagesNearBottom(threshold = 48) {
    return messagesEl.scrollHeight - messagesEl.clientHeight - messagesEl.scrollTop <= threshold;
  }

  function scrollMessagesToBottom(force = false) {
    if (!force && !isMessagesNearBottom()) return;
    messagesEl.scrollTop = messagesEl.scrollHeight;
    scrollArrow.classList.remove("visible");
  }

  function showScrollArrow() {
    scrollArrow.classList.add("visible");
  }

  function hideScrollArrow() {
    scrollArrow.classList.remove("visible");
  }

  scrollArrow.addEventListener("click", () => {
    scrollMessagesToBottom(true);
  });

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
    scrollMessagesToBottom(true);

    let msgIdx = firstIdx;
    const startTime = Date.now();

    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      textEl.style.animation = "none";
      textEl.offsetHeight; // reflow
      textEl.style.animation = "";
      textEl.textContent = loadingMessages[msgIdx];
      scrollMessagesToBottom();
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
    let shouldFollowStream = isMessagesNearBottom();
    let isProgrammaticScroll = false;
    const onMessagesScroll = () => {
      if (isProgrammaticScroll) return;
      const near = isMessagesNearBottom();
      shouldFollowStream = near;
      if (near) {
        hideScrollArrow();
      } else if (assistantEl) {
        showScrollArrow();
      }
    };
    messagesEl.addEventListener("scroll", onMessagesScroll, { passive: true });

    try {
      function paint() {
        rafId = 0;
        if (assistantEl) {
          assistantEl.innerHTML = renderMarkdown(accumulated);
          typesetMathIn(assistantEl);
          if (shouldFollowStream) {
            isProgrammaticScroll = true;
            scrollMessagesToBottom(true);
            isProgrammaticScroll = false;
          } else {
            showScrollArrow();
          }
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
    } finally {
      messagesEl.removeEventListener("scroll", onMessagesScroll);
      hideScrollArrow();
    }
  }

  async function sendMessage(question) {
    if (busy) {
      pendingQuestions.push(question);
      return;
    }
    busy = true;
    sendBtn.disabled = true;
    if (hintEl) hintEl.hidden = true;

    let loader = null;
    try {
      await ensureMarkdownLibs();

      addMessage("user", question);

      loader = addLoadingIndicator();
      closePresetDropdown();
      presetsEl.classList.add("ktn-chat-presets--busy");
      presetTrigger.disabled = true;
      presetOptionButtons.forEach((b) => {
        b.disabled = true;
      });

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
      if (loader) loader.remove();
      addError(strings.errPrefix + err.message);
    } finally {
      busy = false;
      sendBtn.disabled = false;
      presetsEl.classList.remove("ktn-chat-presets--busy");
      presetTrigger.disabled = false;
      presetOptionButtons.forEach((b) => {
        b.disabled = false;
      });
      const next = pendingQuestions.shift();
      if (next !== undefined) {
        void sendMessage(next);
      }
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleSyncPanelViewport);
    window.visualViewport.addEventListener("scroll", scheduleSyncPanelViewport);
  }
  window.addEventListener("resize", scheduleSyncPanelViewport);

  input.addEventListener("focus", () => {
    if (!isMobile()) return;
    scheduleSyncPanelViewport();
    setTimeout(() => {
      scheduleSyncPanelViewport();
      input.scrollIntoView({ block: "nearest", behavior: "auto" });
      scrollMessagesToBottom(true);
    }, 120);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    void sendMessage(q);
  });
})();
