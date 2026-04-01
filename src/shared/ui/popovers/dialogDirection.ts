/**
 * all possible dialog directions (modal / tooltip) in a const array-type
 */
export const DialogDirections = [
    "top",
    "bottom",
    "left",
    "right",
    "bottom-right",
    "bottom-left",
    "top-right",
    "top-left",
    "middle",
    "screen-middle",
] as const;

/**
 * all possible dialog directions (modal / tooltip)
 */
export type DialogDirection = (typeof DialogDirections)[number];
