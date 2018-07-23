import * as React from "react";
import * as counterpart from "counterpart";
import * as PropTypes from "prop-types";

import { Interpolate } from "../interpolate/interpolate";

interface ITranslateProps extends React.HTMLProps<HTMLElement> {
  // FIXME it would be nice to limit this to valid HTML attributes
  // but using Record<string, HTMLAttributes<HTMLElement>> causes issues below
  attributes?: { [key: string]: string };
  children?: string | string[];
  count?: number;
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

  public static contextTypes = {
    translator: PropTypes.object
  };

  constructor(props: ITranslateProps) {
    super(props);
    this.state = {
      locale: props.locale || this.getTranslator().getLocale()
    };
  }

  public componentDidMount() {
    if (!this.props.locale) {
      this.getTranslator().onLocaleChange(this.handleChangeLocale);
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
      count = undefined,
      displayName,
      locale: propsLocale,
      ref, // Have to strip off ref for some reason?
      with: replacements,
      ...rest
    } = this.props;

    const translatedAttrs: { [key: string]: React.ReactChild } = attributes
      ? Object.keys(attributes!).reduce((newAttrs, key) => {
          newAttrs[key] = this.getTranslator().translate(attributes[key], {
            locale,
            interpolate: true,
            ...this.props.with
          });
          return newAttrs;
        }, {})
      : {};

    const translationPath = this.getTranslator().translate(children, {
      locale,
      interpolate: false,
      count,
      ...replacements
    });

    return (
      <Interpolate
        with={{ ...replacements, count: `${count}` }}
        {...rest}
        {...translatedAttrs}
      >
        {translationPath}
      </Interpolate>
    );
  }

  private handleChangeLocale = (locale: string) => {
    this.setState({ locale });
  };

  private getTranslator = () =>
    this.context && this.context.translator
      ? this.context.translator
      : counterpart;
}
