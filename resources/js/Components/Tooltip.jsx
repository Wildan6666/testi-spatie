import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils"; // kalau pakai helper classNames

export function Tooltip({ children, content, side = "top", align = "center" }) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          className={cn(
            "z-50 rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md animate-in fade-in-50"
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-gray-800" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
