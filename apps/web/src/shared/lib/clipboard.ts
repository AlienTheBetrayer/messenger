/**
 * copies a given string of text to the user's clipboard.
 * @param text the string to be copied.
 * @returns a promise that resolves to true if successful, or false if it fails.
 */
export async function copyToClipboard(text: string){
  // Guard clause for SSR/Server environments
  if (typeof window === "undefined") return false;

  // Modern browsers supporting navigator.clipboard
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Modern clipboard API failed, falling back...", err);
    }
  }
}