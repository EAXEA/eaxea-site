"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { budgets, topics } from "@/data/contact";

/**
 * No backend yet: composes a prefilled mailto so the message lands in the
 * visitor's mail client. Swap `onSubmit` for an API route / form service later.
 */
export default function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const message = String(f.get("message") || "");
    const subject = `Yeni proje — ${topic} (${name})`;
    const body = `İsim: ${name}\nE-posta: ${email}\nKonu: ${topic}\nBütçe: ${budget}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-fg placeholder:text-faint outline-none transition-colors focus:border-ember";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            İsim
          </span>
          <input name="name" required placeholder="Adın" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            E-posta
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="sen@ornek.com"
            className={field}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Konu
        </span>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Bütçe
        </span>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
              {b}
            </Chip>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Proje
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Birkaç cümleyle ne hayal ettiğini anlat…"
          className={`${field} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-4 text-sm font-medium text-[#0a0506] transition-colors hover:bg-fg"
      >
        {sent ? "Mail uygulaması açıldı ✓" : "Gönder"}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      <p className="text-xs text-faint">
        Form, mail uygulamanı hazır bir mesajla açar. Dilersen doğrudan{" "}
        <a href={`mailto:${site.email}`} className="text-muted underline">
          {site.email}
        </a>{" "}
        adresine de yazabilirsin.
      </p>
    </form>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-ember bg-ember/10 text-ember"
          : "border-line text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
