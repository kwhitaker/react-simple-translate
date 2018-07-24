import * as React from "react";

const REGEXP = /\%\((.+?)\)s/;

export interface IInterpolateProps extends React.HTMLProps<HTMLElement> {
  children?: string;
  count?: number;
  with?: Record<string, React.ReactChild>;
}

export class Interpolate extends React.PureComponent<IInterpolateProps, never> {
  public render() {
    const { children = "", with: replacements = {}, ...rest } = this.props;
    const finalChildren = children
      .split(REGEXP)
      .reduce<React.ReactChild[]>((memo, match, idx) => {
        if (idx % 2 === 0) {
          if (match.length === 0) {
            return memo;
          }

          memo.push(match);
        } else {
          memo.push(replacements[match]);
        }

        return memo;
      }, []);

    return React.createElement(React.Fragment, rest, ...finalChildren);
  }
}
