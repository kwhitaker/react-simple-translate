import * as React from "react";
import * as counterpart from "counterpart";

export const contextTranslator = new (counterpart as any).Instance();
export const TranslatorContext = React.createContext(contextTranslator);
