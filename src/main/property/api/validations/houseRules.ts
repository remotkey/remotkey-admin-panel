import * as v from "valibot";

export const houseRuleSchema = v.object({
  value: v.pipe(v.string(), v.nonEmpty("Please fill out this field.")),
});
