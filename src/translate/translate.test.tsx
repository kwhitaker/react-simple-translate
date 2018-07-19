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

const defaultExpected = "<span>Hello, foobar</span>";

counterpart.registerTranslations("en", en);
counterpart.registerTranslations("de", de);

const withLocale = (locale: string) => (callback: () => void) =>
  counterpart.withLocale(locale, callback);
const withEn = withLocale("en");
const withDe = withLocale("de");

describe("<Translate />", () => {
  beforeEach(() => {
    counterpart.setLocale(undefined);
  });

  it("passes the props down to the <Interpolate /> component", () => {
    withEn(function() {
      const elem = shallow(
        <Translate with={values} className="foo">
          test.greeting
        </Translate>
      );
      expect(elem.prop("className")).toEqual("foo");
    });
  });

  it("creates a component with the expected translated text", () => {
    withEn(function() {
      const elem = shallow(<Translate with={values}>test.greeting</Translate>);
      expect(elem.html()).toEqual(defaultExpected);
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

  // This test is probably extraneous, but just in case
  it("works with string templates", () => {
    const someVar = "test";
    withEn(() => {
      const elem = shallow(
        <Translate with={values}>{`${someVar}.greeting`}</Translate>
      );
      expect(elem.html()).toEqual(defaultExpected);
    });
  });

  it("respects a locale that's set as a prop", () => {
    withDe(() => {
      const elem = shallow(
        <Translate with={values} locale="en">
          test.greeting
        </Translate>
      );
      expect(elem.state("locale")).toEqual("en");
      expect(elem.html()).toEqual(defaultExpected);
    });
  });

  it("listens for locale switching and updates", () => {
    counterpart.setLocale("en");
    const elem = shallow(<Translate with={values}>test.greeting</Translate>);

    expect(elem.state("locale")).toEqual("en");
    expect(elem.html()).toEqual(defaultExpected);

    counterpart.setLocale("de");
    elem.update();

    expect(elem.state("locale")).toEqual("de");
    expect(elem.html()).toEqual("<span>Guten Tag, foobar</span>");
  });
});
