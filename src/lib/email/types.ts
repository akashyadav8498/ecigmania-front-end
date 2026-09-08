export type RecipientStatus = "valid" | "invalid";

export type Recipient = {
  id: string; // generated locally for list keys
  email: string;
  status: RecipientStatus;
};

export type EmailDraft = {
  recipients: Recipient[];
  subject: string;
  message: string;
};
