import { useState } from "react";

export default function useModal(initial = null) {
  const [value, setValue] = useState(initial);

  const open = (val = true) => setValue(val);
  const close = () => setValue(null);

  return { value, open, close };
}
