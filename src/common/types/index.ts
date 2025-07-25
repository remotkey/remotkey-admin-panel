import { TimePeriod } from "@/main/property/interfaces";

export type Word = {
  word: string;
  translation: string;
};

export type Stack = {
  id: string;
  name: string;
  words: Word[];
};

export interface RealEstateFormPayloadBody {
  name: string;
  email: string;
  phone: string;
  interestedArea: string;
}

export type RealEstateFormPayload = {
  subject: string;
  body: RealEstateFormPayloadBody;
};
export type LateCheckoutFormPayload = {
  name: string;
  checkOut: TimePeriod;
  createdAt: string;
};
export type LateCheckoutPayload = {
  subject: string;
  body: LateCheckoutFormPayload;
};
