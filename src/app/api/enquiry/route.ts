import { validateEnquiry, whatsappFor, type EnquiryInput } from "@/lib/enquiry";

/** The only fields we accept and pass on; anything else the client sends is dropped. */
const FIELDS = ["name", "phone", "email", "area", "message", "puppy", "website"] as const;
const PUPPY_MAX = 120;

/**
 * Receives enquiries from the puppy profile and contact forms.
 * Valid enquiries are forwarded to ENQUIRY_WEBHOOK_URL (Slack, Zapier…) when set,
 * otherwise logged. Responds with a pre-filled WhatsApp link.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  // Keep only known fields, and only when they are text.
  const body: EnquiryInput = {};
  for (const key of FIELDS) {
    const value = (raw as Record<string, unknown>)[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== "string") {
      return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
    }
    body[key] = value;
  }
  if (body.puppy) body.puppy = body.puppy.trim().slice(0, PUPPY_MAX);
  // Bots fill every field; quietly accept and drop.
  if (body.website) return Response.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) return Response.json({ ok: false, errors }, { status: 422 });

  const { name, phone, email, area, message, puppy } = body;
  const enquiry = { name, phone, email, area, message, puppy, receivedAt: new Date().toISOString() };
  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (hook) {
    await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(enquiry) }).catch(
      (e) => console.error("[enquiry] webhook failed", e),
    );
  } else {
    console.info("[enquiry]", enquiry);
  }
  return Response.json({ ok: true, whatsapp: whatsappFor(body) });
}
