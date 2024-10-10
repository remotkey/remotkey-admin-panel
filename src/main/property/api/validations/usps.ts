import * as v from "valibot";

export const UspSchema = v.object({
  value: v.pipe(v.string(), v.nonEmpty("Please fill out this field.")),
});
