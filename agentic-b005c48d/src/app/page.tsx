"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp: string;
};

const features = [
  {
    title: "Voice Ready",
    description:
      "Real-time WebRTC voice pipeline with low-latency synthesis for natural conversations.",
  },
  {
    title: "Tool Orchestration",
    description:
      "Connect calendars, CRMs, internal APIs, and more with declarative tool routing.",
  },
  {
    title: "Memory Engine",
    description:
      "Structured memory vault keeps your agent aware of context, preferences, and goals.",
  },
  {
    title: "Multi-Turn Plans",
    description:
      "Dynamic execution graph keeps agents focused and self-correcting for long tasks.",
  },
];

const defaultBlueprint = {
  name: "Agent Banao",
  role: "AI concierge that handles inbound customer calls",
  greeting: "Namaste! Aapka din shubh ho. How can I help you today?",
  tone: "Warm, proactive, and bilingual (Hindi/English)",
  escalationRule: "Escalate to a human if the customer seems upset or requests a manager.",
  tools: [
    "CRM search",
    "Knowledge base lookup",
    "Payment status checker",
    "Calendar scheduler",
  ],
};

export default function Home() {
  const [blueprint, setBlueprint] = useState(defaultBlueprint);
  const [message, setMessage] = useState("");
  const [transcript, setTranscript] = useState<Message[]>([
    {
      role: "agent",
      content: defaultBlueprint.greeting,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const blueprintSummary = useMemo(() => {
    const itinerary = [
      `Role: ${blueprint.role}`,
      `Tone: ${blueprint.tone}`,
      `Escalation: ${blueprint.escalationRule}`,
      `Tools: ${blueprint.tools.join(", ")}`,
    ];

    return itinerary.join(" • ");
  }, [blueprint]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const agentResponse: Message = {
      role: "agent",
      content: synthesizeAgentReply(message.trim(), blueprint),
      timestamp: new Date().toLocaleTimeString(),
    };

    setTranscript((prev) => [...prev, userMessage, agentResponse]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-24 sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="inline-flex max-w-max items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/50 px-4 py-1 text-sm text-slate-300 backdrop-blur">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Live agent orchestration canvas</span>
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Call Agent Banao — launch a voice-native AI concierge in minutes.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
            Define persona, wire tools, and test conversations without leaving the browser.
            Deploy instantly to your contact center or WhatsApp hotline with enterprise-grade controls.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700/60 px-3 py-1">
              Hindi + English
            </span>
            <span className="rounded-full border border-slate-700/60 px-3 py-1">
              WebRTC ready
            </span>
            <span className="rounded-full border border-slate-700/60 px-3 py-1">
              Tool routing
            </span>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#blueprint"
              className="rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:bg-emerald-300"
            >
              Start Building
            </a>
            <a
              href="#call"
              className="rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Test the Call
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 sm:px-10">
        <section className="grid gap-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase text-emerald-300/90">
              Why teams choose Agent Banao
            </span>
            <h2 className="text-3xl font-semibold text-white">
              Designed for real conversations, engineered for operator control.
            </h2>
            <p className="text-slate-300">
              Everything you need to launch an agent that sounds human, understands intent,
              and respects escalation workflows from day one.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="blueprint"
          className="grid gap-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur lg:grid-cols-[1.1fr,0.9fr]"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-white">Blueprint your agent</h2>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Real-time preview
              </span>
            </div>
            <p className="text-slate-300">
              Tune the voice, tools, and escalation policy. Changes update the agent instantly.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300">Agent Name</span>
                <input
                  value={blueprint.name}
                  onChange={(event) =>
                    setBlueprint((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300">Role</span>
                <input
                  value={blueprint.role}
                  onChange={(event) =>
                    setBlueprint((prev) => ({ ...prev, role: event.target.value }))
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm">
              <span className="text-slate-300">Greeting Script</span>
              <textarea
                value={blueprint.greeting}
                onChange={(event) =>
                  setBlueprint((prev) => ({ ...prev, greeting: event.target.value }))
                }
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="text-slate-300">Tone & Persona</span>
              <textarea
                value={blueprint.tone}
                onChange={(event) =>
                  setBlueprint((prev) => ({ ...prev, tone: event.target.value }))
                }
                rows={2}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="text-slate-300">Escalation Policy</span>
              <textarea
                value={blueprint.escalationRule}
                onChange={(event) =>
                  setBlueprint((prev) => ({ ...prev, escalationRule: event.target.value }))
                }
                rows={2}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="text-slate-300">Connected Tools</span>
              <textarea
                value={blueprint.tools.join("\n")}
                onChange={(event) =>
                  setBlueprint((prev) => ({
                    ...prev,
                    tools: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  }))
                }
                rows={4}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </label>
          </div>

          <aside className="flex flex-col gap-5 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-lg font-semibold text-slate-900">
                {blueprint.name
                  .split(" ")
                  .map((part) => part[0]?.toUpperCase())
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm text-slate-400">Agent handle</p>
                <h3 className="text-lg font-semibold text-white">{blueprint.name}</h3>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-900/50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Live summary
              </h4>
              <p className="text-sm text-slate-300">{blueprintSummary}</p>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-900/50 p-4 text-sm text-slate-300">
              <h4 className="font-semibold uppercase tracking-wide text-slate-300">
                Call script starter
              </h4>
              <p className="text-slate-200">{blueprint.greeting}</p>
              <p>
                If intent is billing use <span className="font-semibold">Payment status checker</span>.
              </p>
              <p>
                If scheduling, confirm slot via{" "}
                <span className="font-semibold">Calendar scheduler</span> then send confirmation SMS.
              </p>
              <p>
                Before ending call, log summary in{" "}
                <span className="font-semibold">CRM search</span> + tag sentiment.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:from-emerald-300 hover:to-cyan-300"
            >
              Export deployment playbook
            </button>
          </aside>
        </section>

        <section
          id="call"
          className="grid gap-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur lg:grid-cols-[0.65fr,1.35fr]"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Simulate a live call</h2>
            <p className="text-slate-300">
              Test how {blueprint.name} responds in real time. Each reply blends tone, escalation logic,
              and tool recommendations drawn from your blueprint.
            </p>
            <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 text-sm text-slate-300">
              <p className="font-semibold text-slate-200">How simulation works</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Agent mirrors tone and language choices</li>
                <li>Keywords trigger tool suggestions automatically</li>
                <li>Escalation flags appear when sentiment drops</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-lg font-semibold text-slate-900">
                  🔊
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Call status</p>
                  <p className="text-base font-semibold text-white">Connected • 00:42</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Live
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-sm">
              <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
                {transcript.map((entry, index) => (
                  <div key={`${entry.timestamp}-${index}`} className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {entry.role === "agent" ? blueprint.name : "You"} • {entry.timestamp}
                    </p>
                    <div
                      className={`rounded-xl px-4 py-3 ${
                        entry.role === "agent"
                          ? "bg-emerald-400/10 text-emerald-100 border border-emerald-400/30"
                          : "bg-slate-900 text-slate-100 border border-slate-800/60"
                      }`}
                    >
                      {entry.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about billing, rescheduling, or something unexpected..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function synthesizeAgentReply(input: string, blueprint: typeof defaultBlueprint): string {
  const lowered = input.toLowerCase();
  const cues: string[] = [];

  if (/\b(bill|payment|invoice)\b/.test(lowered)) {
    cues.push(
      "Let me pull up your latest payment status using the Payment status checker tool."
    );
  }

  if (/\b(schedule|resched|appointment|slot)\b/.test(lowered)) {
    cues.push("I can help you lock in a new time through the Calendar scheduler.");
  }

  if (/\b(issue|problem|angry|upset|manager)\b/.test(lowered)) {
    cues.push(
      "I want to ensure you feel heard. I can escalate this to a senior specialist immediately."
    );
  }

  const tonePrefix = `(${blueprint.tone})`;
  const opening = `Thanks for sharing that. ${blueprint.name} here—${blueprint.role.toLowerCase()}.`;
  const escalation = cues.length === 0
    ? "It sounds like we can resolve this together right away."
    : cues.join(" ");

  return `${tonePrefix} ${opening} ${escalation} ${
    cues.length > 0
      ? "Give me a second while I fetch the details. Anything else you'd like me to note?"
      : "Could you add any extra details so I capture everything correctly?"
  }`;
}
