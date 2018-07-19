import * as React from "react";
import { getLocale, onLocaleChange, translate } from "counterpart";

import { Interpolate } from "../interpolate/interpolate";

interface ITranslateProps extends React.HTMLProps<HTMLElement> {
  children?: string | string[];
  component?: keyof React.ReactHTML;
  count?: number;
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
      locale: getLocale()
    };
  }

  public componentDidMount() {
    if (!this.props.locale) {
      onLocaleChange(this.handleChangeLocale);
    }
  }

  public render() {
    const { locale } = this.state;
    const {
      children = "",
      displayName,
      count,
      locale: propsLocale,
      ref, // Have to strip off ref for some reason?
      ...rest
    } = this.props;

    const translation = translate(children, {
      locale,
      interpolate: false,
      ...rest
    });

    return <Interpolate {...rest}>{translation}</Interpolate>;
  }

  private handleChangeLocale = (newLocale: string) => {
    this.setState({ locale: newLocale });
  };
}
