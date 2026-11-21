/**
 * Enquiry validation — one definition used by every form (instant feedback)
 * and by /api/enquiry (the authority).
 */

export type EnquiryInput = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
  puppy?: string;
  /** honeypot: real people never fill this in */
  website?: string;
  [extra: string]: string | undefined;
};

export type EnquiryErrors = Partial<Record<"name" | "phone" | "email" | "area" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const email = (input.email ?? "").trim();
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 80) errors.name = "That name is a little long — 80 characters at most.";

  if (digits.length < 7 || digits.length > 15 || /[^\d\s+()\-.]/.test(phone))
    errors.phone = "Add a phone or WhatsApp number we can reach, with country code.";

  if (email && !EMAIL.test(email)) errors.email = "That email doesn't look quite right.";
  if ((input.area ?? "").length > 80) errors.area = "Keep the area to 80 characters.";
  if ((input.message ?? "").length > 2000) errors.message = "Keep the message under 2000 characters.";
  return errors;
}

/** A WhatsApp deep link pre-filled with the enquiry, for the quickest reply. */
export function whatsappFor(input: EnquiryInput, base = "https://wa.me/919898124987") {
  const lines = [`Hi TeddyPups! I'm ${input.name?.trim()}.`];
  if (input.puppy) lines.push(`I'm asking about ${input.puppy}.`);
  if (input.message?.trim()) lines.push(input.message.trim());
  return `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
}
