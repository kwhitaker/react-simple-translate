/// <reference path="../types/counterpart.d.ts" />

import * as React from "react";
import * as counterpart from "counterpart";

import { TranslatorContext } from "./translator-context";
import { localeDefaults } from "../counterpart-defaults";

const en = {
  test: {
    greeting: "Hello, %(name)s",
    title: "Click me, %(name)s",
    plural: {
      zero: "No items",
      one: "One item",
      other: "%(count)s items"
    }
  }
};

const de = {
  test: {
    greeting: "Guten Tag, %(name)s",
    title: "Dies ist ein Titel",
    plural: {
      zero: "Keine Gegenstände",
      one: "Ein Gegenstand",
      other: "%(count)s Artikel"
    }
  }
};

export const contextTranslator = new (counterpart as any).Instance();
contextTranslator.registerTranslations("en", { ...en, ...localeDefaults });
contextTranslator.registerTranslations("de", { ...de, ...localeDefaults });

export class ContextTest extends React.PureComponent<{}, never> {
  public render() {
    return (
      <>
        <TranslatorContext.Provider value={contextTranslator}>
          {this.props.children}
        </TranslatorContext.Provider>
      </>
    );
  }
}
