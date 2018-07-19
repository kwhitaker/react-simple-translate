/// <reference path="../types/counterpart.d.ts" />

import * as React from "react";
import { configure, shallow, render, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as counterpart from "counterpart";

import { Translate } from "./translate";

configure({ adapter: new Adapter() });

const en = {
  test: {
    greeting: "Hello, %(name)s"
  }
};

const de = {
  test: {
    greeting: "Guten Tag, %(name)s"
  }
};

const values = {
  name: "foobar"
};

counterpart.registerTranslations("en", en);
counterpart.registerTranslations("de", de);

const withLocale = (locale: string) => (callback: () => void) =>
  counterpart.withLocale(locale, callback);
const withEn = withLocale("en");
const withDe = withLocale("de");

describe("<Translate />", () => {
  it("passes the props down to the <Interpolate /> component", () => {
    withEn(function() {
      const elem = shallow(
        <Translate with={values} className="foo">
          test.greeting
        </Translate>
      );
      expect(elem.prop("className")).toBe("foo");
    });
  });

  it("creates a component with the expected translated text", () => {
    withEn(function() {
      const elem = shallow(<Translate with={values}>test.greeting</Translate>);
      expect(elem.html()).toEqual("<span>Hello, foobar</span>");
    });

    withDe(function() {
      const elem = shallow(<Translate with={values}>test.greeting</Translate>);
      expect(elem.html()).toEqual("<span>Guten Tag, foobar</span>");
    });
  });

  it("can take a React component as a parameter to interpolate", () => {
    const values = {
      name: <strong>foobar</strong>
    };

    withEn(() => {
      const elem = render(<Translate with={values}>test.greeting</Translate>);
      expect(elem.find("strong").length).toBe(1);
    });
  });

  it.skip("listens for locale switching and updates", () => {
    const translator = new (counterpart as any).Instance();
    translator.registerTranslations("en", en);
    translator.setLocale("en");
    const elem = mount(<Translate with={values}>test.greeting</Translate>);
    console.log(elem.props());
  });
});
