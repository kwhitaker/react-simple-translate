import * as React from "react";
import { Interpolate } from "../interpolate/interpolate";
import { TranslatorContext } from "./translator-context";

interface ITranslateProps extends React.HTMLProps<HTMLElement> {
  children?: string | string[];
  count?: number;
  displayName?: string;
  locale?: string;
  translator?: typeof import("counterpart");
  with?: Record<string, React.ReactChild>;
}

export class Translate extends React.PureComponent<ITranslateProps, never> {
  public render() {
    const {
      children = "",
      count = undefined,
      displayName,
      locale,
      ref, // Have to strip off ref for some reason?
      translator,
      with: replacements,
      ...rest
    } = this.props;

    const translationPath = translator!.translate(children, {
      locale: locale || translator!.getLocale(),
      interpolate: false,
      count,
      ...replacements
    });

    return (
      <Interpolate with={{ ...replacements, count: `${count}` }} {...rest}>
        {translationPath}
      </Interpolate>
    );
  }
}

export default React.forwardRef((props: ITranslateProps, ref) => (
  <TranslatorContext.Consumer>
    {translator => (
      // TODO fix the ref as any typing
      <Translate {...props} translator={translator} ref={ref as any} />
    )}
  </TranslatorContext.Consumer>
));
