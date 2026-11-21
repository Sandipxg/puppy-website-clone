"use client";

import { useId, useState, type FormEvent } from "react";
import { validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { external } from "@/lib/site";

const INPUT =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)] aria-[invalid=true]:border-[#b3261e]";

function Field({
  name,
  label,
  required,
  hint,
  error,
  ...input
}: {
  name: keyof EnquiryErrors;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold">
        {label}
        {required ? (
          <span className="text-toffee-ink"> *</span>
        ) : (
          <span className="font-normal text-cocoa-soft"> (optional)</span>
        )}
      </label>
      <input id={id} name={name} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={INPUT} {...input} />
      {error ? (
        <p id={`${id}-err`} className="mt-1 text-sm font-semibold text-[#b3261e]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1 text-sm text-cocoa-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** Enquiry form on each puppy profile. Validates as you submit, posts to /api/enquiry. */
export function EnquiryForm({ puppy, defaultMessage }: { puppy: string; defaultMessage: string }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [whatsapp, setWhatsapp] = useState<string | null>(null);
  const messageId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const found = validateEnquiry(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, puppy }),
      });
      const json = (await res.json()) as { ok: boolean; errors?: EnquiryErrors; whatsapp?: string };
      if (!json.ok) {
        setErrors(json.errors ?? {});
        setState(json.errors ? "idle" : "failed");
        return;
      }
      setWhatsapp(json.whatsapp ?? null);
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-[1.6rem] border-[3px] border-cocoa bg-honey p-8 text-center">
        <p className="font-plush text-big">Thank you!</p>
        <p className="mt-3">Our team will get back to you promptly. For the quickest reply, say hello on WhatsApp.</p>
        {whatsapp && (
          <a href={whatsapp} {...external} className="btn btn-whatsapp mt-6">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  return (
    <form noValidate className="space-y-5" onSubmit={onSubmit}>
      {hasErrors && (
        <p role="alert" className="rounded-2xl bg-blush px-4 py-3 font-semibold">
          Please check the highlighted fields.
        </p>
      )}
      {state === "failed" && (
        <p role="alert" className="rounded-2xl bg-blush px-4 py-3 font-semibold">
          Something went wrong sending that. Please try again, or message us on WhatsApp.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required autoComplete="name" minLength={2} maxLength={80} error={errors.name} />
        <Field
          name="phone"
          label="Phone or WhatsApp"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="With country code, e.g. +971 50 123 4567"
          error={errors.phone}
        />
        <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <Field name="area" label="Your area" autoComplete="address-level2" maxLength={80} hint="e.g. Dubai Marina" error={errors.area} />
      </div>
      <div>
        <label htmlFor={messageId} className="block text-[0.95rem] font-semibold">
          Message <span className="font-normal text-cocoa-soft">(optional)</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={defaultMessage}
          className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 py-3 text-base outline-none focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
        />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
        </label>
      </div>
      <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
