import * as React from "react";
import { getLocale, onLocaleChange, translate } from "counterpart";

import { Interpolate } from "../interpolate/interpolate";

interface ITranslateProps extends React.HTMLProps<HTMLElement> {
  // FIXME it would be nice to limit this to valid HTML attributes
  // but using Record<string, HTMLAttributes<HTMLElement>> causes issues below
  attributes?: { [key: string]: string };
  children?: string | string[];
  component?: keyof React.ReactHTML;
  displayName?: string;
  locale?: string;
  with?: Record<string, React.ReactChild>;
}

interface ITranslateState {
  locale: string;
}

export class Translate extends React.PureComponent<
  ITranslateProps,
  ITranslateState
> {
  public static defaultProps: ITranslateProps = {
    component: "span",
    displayName: "Translate"
  };

  constructor(props: ITranslateProps) {
    super(props);
    this.state = {
      locale: props.locale || getLocale()
    };
  }

  public componentDidMount() {
    if (!this.props.locale) {
      onLocaleChange(this.handleChangeLocale);
    }
  }

  public componentDidUpdate(lastProps: ITranslateProps) {
    const { locale } = this.props;
    if (locale && lastProps.locale !== locale) {
      this.setState({ locale });
    }
  }

  public render() {
    const { locale } = this.state;
    const {
      attributes,
      children = "",
      displayName,
      locale: propsLocale,
      ref, // Have to strip off ref for some reason?
      ...rest
    } = this.props;

    const translatedAttrs: { [key: string]: React.ReactChild } = attributes
      ? Object.keys(attributes!).reduce((newAttrs, key) => {
          newAttrs[key] = translate(attributes[key], {
            locale,
            interpolate: true,
            ...this.props.with
          });
          return newAttrs;
        }, {})
      : {};

    const translationPath = translate(children, {
      locale,
      interpolate: false,
      ...rest
    });

    return (
      <Interpolate {...rest} {...translatedAttrs}>
        {translationPath}
      </Interpolate>
    );
  }

  private handleChangeLocale = (locale: string) => {
    this.setState({ locale });
  };
}
