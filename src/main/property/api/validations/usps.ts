import * as v from "valibot";

export const UspSchema = v.object({
  value: v.optional(v.string()),
});
