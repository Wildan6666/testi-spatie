import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export default function Select({ value, onChange, options, placeholder }) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger className="border rounded p-2">
        <SelectPrimitive.Value placeholder={placeholder} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.Viewport>
          {options.map((opt) => (
            <SelectPrimitive.Item key={opt.value} value={opt.value}>
              <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}
