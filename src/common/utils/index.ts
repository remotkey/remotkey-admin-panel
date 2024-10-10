import path from "path";

// --------------------------------------Sanitize Filename --------------------------------------------

export const sanitizeFilename = (filename: string) => {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);

  const sanitized = name
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s/g, "-");

  return sanitized + ext;
};
