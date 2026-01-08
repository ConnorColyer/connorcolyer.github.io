"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";
import { site } from "@/content/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${name || "New client"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-ink-950 dark:text-white">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-indigo-500 dark:border-ink-700 dark:text-white"
          placeholder="Your name"
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-ink-950 dark:text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-indigo-500 dark:border-ink-700 dark:text-white"
          placeholder="you@email.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink-950 dark:text-white">
          Project details
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-[140px] rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-indigo-500 dark:border-ink-700 dark:text-white"
          placeholder="Tell me about the project, goals, and timelines."
          required
        />
      </div>
      <Button type="submit">Send enquiry</Button>
      <p className="text-xs text-slate-500">
        This form opens your email client with a prefilled message.
      </p>
    </form>
  );
}
