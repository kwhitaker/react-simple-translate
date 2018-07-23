import * as React from "react";
import * as counterpart from "counterpart";
import * as PropTypes from "prop-types";

const translator = new (counterpart as any).Instance();
const ch = {
  test: {
    greeting: "Ni hao, %(name)s"
  }
};

translator.registerTranslations("ch", ch);

export class ContextTest extends React.PureComponent<{}, never> {
  public static childContextTypes = {
    translator: PropTypes.object
  };

  public render() {
    return <div>{this.props.children}</div>;
  }

  public getChildContext = () => ({
    translator
  });
}
