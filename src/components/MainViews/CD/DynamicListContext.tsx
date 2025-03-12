import { createContext } from "react";

export const DynamicListContext = createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({});