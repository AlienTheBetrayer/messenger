import { DialogDirection } from "@/src/shared/ui/popovers/dialogDirection";

/**
 * positions a dialog with all directions
 * @param dialogRef the ref of the tooltip that will get positioned
 * @param elementRef the hovered element
 */
export const positionDialog = (
    dialogRef: React.RefObject<HTMLDialogElement | HTMLDivElement | null>,
    elementRef: React.RefObject<HTMLDivElement | null>,
    direction: DialogDirection = "bottom",
) => {
    // safety flag
    if (!dialogRef.current || !elementRef.current) {
        return;
    }

    dialogRef.current.style.display = "flex";

    // getting the bounds of the element
    const elementBounds = elementRef.current.getBoundingClientRect();
    const dialogBounds = dialogRef.current.getBoundingClientRect();

    // calculating and setting the direction
    let left = 0;
    let top = 0;

    switch (direction) {
        case "bottom": {
            left = elementBounds.left + elementBounds.width / 2 - dialogBounds.width / 2;
            top = elementBounds.bottom;
            break;
        }
        case "top": {
            left = elementBounds.left + elementBounds.width / 2 - dialogBounds.width / 2;
            top = elementBounds.top - dialogBounds.height;
            break;
        }
        case "left": {
            left = elementBounds.left - dialogBounds.width;
            top = elementBounds.top + elementBounds.height / 2 - dialogBounds.height / 2;
            break;
        }
        case "right": {
            left = elementBounds.right;
            top = elementBounds.top + elementBounds.height / 2 - dialogBounds.height / 2;
            break;
        }
        case "bottom-right": {
            left = elementBounds.left;
            top = elementBounds.bottom + 4;
            break;
        }
        case "bottom-left": {
            left = elementBounds.right - dialogBounds.width;
            top = elementBounds.bottom + 4;
            break;
        }
        case "top-right": {
            left = elementBounds.left;
            top = elementBounds.top - 4 - dialogBounds.height;
            break;
        }
        case "top-left": {
            left = elementBounds.right - dialogBounds.width;
            top = elementBounds.top - 4 - dialogBounds.height;
            break;
        }
        case "middle": {
            left = elementBounds.left + elementBounds.width / 2 - dialogBounds.width / 2;
            top = elementBounds.top + elementBounds.height / 2 - dialogBounds.height / 2;
            break;
        }
        case "screen-middle": {
            left = document.documentElement.clientWidth / 2 - dialogBounds.width / 2;
            top = window.innerHeight / 2 - dialogBounds.height / 2;
            break;
        }
    }

    if (left + dialogBounds.width > document.documentElement.clientWidth) {
        left = document.documentElement.clientWidth - dialogBounds.width;
    }

    if (left < 0) {
        left = 0;
    }

    if (top + dialogBounds.height > document.documentElement.clientHeight) {
        top = document.documentElement.clientHeight - dialogBounds.height;
    }

    if (top < 0) {
        top = 0;
    }

    // setting the initial positions
    dialogRef.current.style.left = `${left}px`;
    dialogRef.current.style.top = `${top}px`;
};
