import { EmailSender } from "~/server/services/email/email.types";

type ResendEmailSenderOptions = {
  apiKey?: string;
  fromEmail?: string;
  toEmail: string;
  fetchImpl?: typeof fetch;
};

export function createResendEmailSender({
  apiKey,
  fromEmail = "Portfolio Contact <onboarding@resend.dev>",
  toEmail,
  fetchImpl = fetch,
}: ResendEmailSenderOptions): EmailSender {
  return {
    async send(input) {
      if (!apiKey) {
        throw new Error("Contact form not configured. Add RESEND_API_KEY on server.");
      }

      if (!toEmail) {
        throw new Error("Contact form not configured. Add CONTACT_TO_EMAIL on server.");
      }

      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `[Portfolio Contact] ${input.subject}`,
          reply_to: input.email,
          text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Email provider rejected request: ${errorText}`);
      }
    },
  };
}
