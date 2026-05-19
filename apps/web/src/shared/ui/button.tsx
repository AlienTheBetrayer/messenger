import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { rippleEnable } from "@/shared/lib/ripple";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-bg-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-98 ripple select-none",
    {
        variants: {
            variant: {
                primary: "bg-blue-1 text-bg-10 hover:bg-blue-2 shadow-lg shadow-blue-1/10",
                secondary: "bg-bg-2 text-bg-10 border border-bg-3 hover:bg-bg-3 hover:border-bg-4 shadow-xs",
                danger: "bg-red-1 text-bg-10 hover:bg-red-2 shadow-lg shadow-red-1/10",
                ghost: "text-bg-9 hover:bg-bg-2 hover:text-bg-10",
                link: "text-blue-1 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-2xl px-6 text-base",
                icon: "h-10 w-10 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    },
);

export type Props = {
    asChild?: boolean;
    disableRipple?: boolean;
} & React.ComponentPropsWithRef<"button"> &
    VariantProps<typeof buttonVariants>;

const Button = ({ className, variant, size, asChild = false, onPointerDown, onPointerEnter, ref, ...props }: Props) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            onPointerDown={(e) => {
                rippleEnable(e);
                onPointerDown?.(e);
            }}
            onPointerEnter={(e) => {
                if (e.buttons & 1) {
                    rippleEnable(e);
                }
                onPointerEnter?.(e);
            }}
            {...props}
        />
    );
};

Button.displayName = "Button";
export { Button, buttonVariants };
