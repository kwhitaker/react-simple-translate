export interface ITranslateOptions {
  locale: string;
  interpolate: boolean;
  count?: number;
}

export interface ITranslator {
  getLocale(): string;
  translate(contentKey: string | string[], options: ITranslateOptions): string;
}
