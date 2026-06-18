/**
 * normalizes the string and replaces all [a-z0-9] symbols with underscores
 * @param local string to normalize
 * @param char symbol to replace
 * @returns normalized string, with a-z0-9 symbols.
 */
export const normalizeString = (local: string, char: string = "_") => {
  return local
    .split("+")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, char)
    .replace(/_+/g, char)
    .replace(/^_+|_+$/g, "");
}