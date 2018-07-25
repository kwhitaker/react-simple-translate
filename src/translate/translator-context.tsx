import * as React from "react";
import { ITranslator } from "../typings";

export const TranslatorContext = React.createContext<ITranslator | undefined>(
  undefined
);
