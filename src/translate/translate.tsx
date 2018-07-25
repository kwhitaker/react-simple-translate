import * as React from "react";
import { Interpolate } from "../interpolate/interpolate";
import { TranslatorContext } from "./translator-context";
import { ITranslator } from "../typings";

export interface ITranslateProps {
  children?: string | string[];
  count?: number;
  locale?: string;
  translator: ITranslator;
  with?: Record<string, React.ReactChild>;
}

export class Translate extends React.PureComponent<ITranslateProps, never> {
  public render() {
    const {
      children = "",
      count = undefined,
      locale,
      translator,
      with: replacements
    } = this.props;

    const translationPath = translator.translate(children, {
      locale: locale || translator.getLocale(),
      interpolate: false,
      count
    });

    return (
      <Interpolate with={{ ...replacements, count: `${count}` }}>
        {translationPath}
      </Interpolate>
    );
  }
}

// https://stackoverflow.com/a/48216010/195653
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export default (props: Omit<ITranslateProps, "translator">) => (
  <TranslatorContext.Consumer>
    {translator => <Translate {...props} translator={translator} />}
  </TranslatorContext.Consumer>
);
