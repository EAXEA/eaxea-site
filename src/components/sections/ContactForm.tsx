"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { scopes, topics } from "@/data/contact";

/**
 * No backend yet: composes a prefilled mailto so the message lands in the
 * visitor's mail client. Swap `onSubmit` for an API route / form service later.
 */
export default function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [scope, setScope] = useState(scopes[1]);
  const formRef = useRef<HTMLFormElement>(null);
  const [feedback, setFeedback] = useState("");
  const [draft, setDraft] = useState("");

  const compose = (form: HTMLFormElement) => {
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name || !message) {
      setFeedback("Lütfen adını ve proje açıklamasını boş bırakma.");
      const field = form.elements.namedItem(!name ? "name" : "message");
      if (field instanceof HTMLElement) field.focus();
      return null;
    }
    return {
      subject: `Yeni proje · ${topic} (${name})`,
      body: `İsim: ${name}\nE-posta: ${email}\nKonu: ${topic}\nKapsam: ${scope}\n\n${message}`,
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = compose(e.currentTarget);
    if (!content) return;
    const { subject, body } = content;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setFeedback("E-posta uygulamanda taslağı göndererek işlemi tamamlayabilirsin. Uygulama açılmadıysa mesajı kopyala seçeneğini kullan. Bu form tek başına e-posta göndermez.");
  };

  const copyDraft = async () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const content = compose(form);
    if (!content) return;
    const text = `Alıcı: ${site.email}\nKonu: ${content.subject}\n\n${content.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setFeedback("Mesaj kopyalandı. Kullandığın e-posta hizmetine yapıştırıp gönderebilirsin.");
      setDraft("");
    } catch {
      setDraft(text);
      setFeedback("Otomatik kopyalama kullanılamıyor. Aşağıdaki hazır mesajı seçip kopyalayabilirsin.");
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-fg placeholder:text-faint outline-none transition-colors focus:border-ember";

  return (
    <form ref={formRef} action={`mailto:${site.email}`} method="post" encType="text/plain" onSubmit={onSubmit} onChange={() => { setFeedback(""); setDraft(""); }} className="flex flex-col gap-6" aria-describedby="contact-help">
      <noscript><p className="text-sm text-muted">Taslak hazırlamak için JavaScript gerekir. Doğrudan <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> adresine yazabilirsin.</p></noscript>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            İsim
          </span>
          <input name="name" autoComplete="name" maxLength={100} required placeholder="Adın" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            E-posta
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="sen@ornek.com"
            className={field}
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          Konu
        </legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Chip key={t} name="topic" value={t} active={topic === t} onChange={() => setTopic(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          Proje kapsamı
        </legend>
        <div className="flex flex-wrap gap-2">
          {scopes.map((s) => (
            <Chip key={s} name="scope" value={s} active={scope === s} onChange={() => setScope(s)}>
              {s}
            </Chip>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Proje
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={1500}
          placeholder="Birkaç cümleyle ne hayal ettiğini anlat…"
          className={`${field} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-4 text-sm font-medium text-[#0a0506] transition-colors hover:bg-fg"
      >
        E-posta taslağını aç
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      <button type="button" onClick={copyDraft} className="min-h-11 rounded-full border border-line-strong px-7 py-3 text-sm text-fg transition-colors hover:border-ember">
        Mesajı kopyala
      </button>
      <p role="status" aria-live="polite" className="text-sm text-muted">{feedback}</p>
      {draft && <label className="flex flex-col gap-2 text-sm text-muted">Hazır mesaj<textarea readOnly value={draft} onFocus={(event) => event.currentTarget.select()} rows={8} className={field} /></label>}
      <p id="contact-help" className="text-xs leading-relaxed text-faint">
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
  name,
  value,
  onChange,
  children,
}: {
  active: boolean;
  name: string;
  value: string;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={active} onChange={onChange} className="peer sr-only" />
      <span className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ember ${
        active
          ? "border-ember bg-ember/10 text-ember"
          : "border-line text-muted hover:text-fg"
      }`}
    >
      {children}
      </span>
    </label>
  );
}
