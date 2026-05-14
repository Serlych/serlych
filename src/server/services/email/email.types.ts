export type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export interface EmailSender {
  send(input: ContactEmailInput): Promise<void>;
}
