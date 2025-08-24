import * as v from "valibot";

export const houseRuleSchema = v.object({
  value: v.optional(v.string()),
});
