import { validateEnquiry, whatsappFor, type EnquiryInput } from "@/lib/enquiry";

/**
 * Receives enquiries from the puppy profile and contact forms.
 * Valid enquiries are forwarded to ENQUIRY_WEBHOOK_URL (Slack, Zapier…) when set,
 * otherwise logged. Responds with a pre-filled WhatsApp link.
 */
export async function POST(request: Request) {
  let body: EnquiryInput;
  try {
    body = (await request.json()) as EnquiryInput;
  } catch {
    return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  // Bots fill every field; quietly accept and drop.
  if (body.website) return Response.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) return Response.json({ ok: false, errors }, { status: 422 });

  const enquiry = { ...body, website: undefined, receivedAt: new Date().toISOString() };
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
