import * as React from "react";
import * as counterpart from "counterpart";
import { ITranslator } from "../typings";

// export const contextTranslator = new (counterpart as any).Instance();
export const TranslatorContext = React.createContext<ITranslator | undefined>(
  undefined
);
