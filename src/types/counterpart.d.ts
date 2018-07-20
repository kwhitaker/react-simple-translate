type NotFoundHandler = (
  locale: string,
  key: string,
  fallback: string,
  scope: string
) => void;

type LocaleChangeHandler = (newLocale: string, oldLocale: string) => void;

declare module "counterpart" {
  function translate(key: string | string[], options?: object): string;
  function setSeparator(value: string): string;
  function onTranslationNotFound(callback: NotFoundHandler): void;
  function offTranslationNotFound(callback: NotFoundHandler): void;
  function setMissingEntryGenerator(callback: (value: string) => void): void;
  function getLocale(): string;
  function setLocale(value: string): string;
  function onLocaleChange(callback: LocaleChangeHandler): void;
  function offLocaleChange(callback: LocaleChangeHandler): void;
  function setFallbackLocale(value: string | string[]): void;
  function registerTranslations(locale: string, data: object): void;
  function registerInterpolations(data: object): void;
  function setKeyTransformer(
    callback: (value: string, options: object) => string
  ): string;
  function localize(date: Date, options: object): string;
  function withLocale<T>(
    locale: string,
    callback: (this: T) => void,
    context?: T
  ): string;

  const Instance: typeof import("counterpart");
  const Translator: typeof import("counterpart");
}

declare module "counterpart-defaults" {
  export const localeDefaults: {
    counterpart: {
      [key: string]: any;
    };
  };
}
