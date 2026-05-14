import Head from "next/head";
import { type FormEvent, useState } from "react";

import Header from "~/components/Header";
import Panel from "~/components/Panel";
import Section from "~/components/Section";
import StarBackground from "~/components/StarBackground";
import { api } from "~/utils/api";

type ContactStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [message, setMessage] = useState("");
  const sendContactMessage = api.contact.send.useMutation();

  let status: ContactStatus = "idle";
  if (sendContactMessage.isPending) {
    status = "submitting";
  } else if (sendContactMessage.isSuccess) {
    status = "success";
  } else if (sendContactMessage.isError) {
    status = "error";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const data = await sendContactMessage.mutateAsync(payload);
      setMessage(data.message);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Failed to send message.");
    }
  }

  return (
    <>
      <Head>
        <title>Isaac Chavoya - Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarBackground />
      <Header />
      <Section className="items-start justify-center gap-10 pb-20 pt-56">
        <div className="w-2/5">
          <h1 className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text font-mono text-7xl text-transparent">
            Contact
          </h1>
          <p className="mt-8 text-2xl leading-relaxed">Use form to send message directly.</p>
          <p className="mt-6 text-xl leading-relaxed opacity-85">
            Good for project inquiries, senior engineering roles, AI product work and consulting
            conversations.
          </p>
        </div>
        <Panel className="w-3/5 p-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-xl">
              Name
              <input
                name="name"
                required
                className="rounded-lg border border-violet-300 bg-white/70 px-4 py-3 text-lg text-black outline-none transition focus:border-sky-400 dark:bg-black/20 dark:text-white"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-xl">
              Email
              <input
                name="email"
                type="email"
                required
                className="rounded-lg border border-violet-300 bg-white/70 px-4 py-3 text-lg text-black outline-none transition focus:border-sky-400 dark:bg-black/20 dark:text-white"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-xl">
              Subject
              <input
                name="subject"
                required
                className="rounded-lg border border-violet-300 bg-white/70 px-4 py-3 text-lg text-black outline-none transition focus:border-sky-400 dark:bg-black/20 dark:text-white"
                placeholder="Project inquiry"
              />
            </label>
            <label className="flex flex-col gap-2 text-xl">
              Message
              <textarea
                name="message"
                required
                rows={8}
                className="rounded-lg border border-violet-300 bg-white/70 px-4 py-3 text-lg text-black outline-none transition focus:border-sky-400 dark:bg-black/20 dark:text-white"
                placeholder="Tell me about role, product or problem."
              />
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-fit rounded-lg border border-violet-300 px-6 py-4 text-xl font-medium transition hover:bg-violet-300 hover:bg-opacity-10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
            {message ? (
              <p className={`text-lg ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                {message}
              </p>
            ) : null}
          </form>
        </Panel>
      </Section>
    </>
  );
}
