import * as React from "react";
import { configure, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import Translate from "./translate";
import { contextTranslator } from "./translator-context";
import { ContextTest } from "./context-test-helper";

configure({ adapter: new Adapter() });

const values = {
  name: "foobar"
};

const defaultExpected = "Hello, foobar";

const withLocale = (locale: string) => (callback: () => void) =>
  contextTranslator.withLocale(locale, callback);
const withEn = withLocale("en");
const withDe = withLocale("de");

function Wrapped() {
  return (
    <ContextTest>
      <Translate with={values}>test.greeting</Translate>
    </ContextTest>
  );
}

describe("<Translate />", () => {
  beforeEach(() => {
    contextTranslator.setLocale(undefined);
  });

  it("creates a component with the expected translated text", () => {
    withEn(() => {
      const elem = shallow(<Wrapped />);
      expect(elem.html()).toEqual(defaultExpected);
    });

    withDe(() => {
      const elem = shallow(<Wrapped />);
      expect(elem.html()).toEqual("Guten Tag, foobar");
    });
  });

  it("works with accepts array syntax", () => {
    withEn(() => {
      const elem = shallow(
        <ContextTest>
          <Translate with={values}>{["test", "greeting"]}</Translate>
        </ContextTest>
      );
      expect(elem.html()).toEqual(defaultExpected);
    });
  });

  it("can take a React component as a parameter to interpolate", () => {
    const values = {
      name: <strong>foobar</strong>
    };

    withEn(() => {
      const elem = shallow(
        <ContextTest>
          <Translate with={values}>test.greeting</Translate>
        </ContextTest>
      );
      expect(elem.html()).toEqual("Hello, <strong>foobar</strong>");
    });
  });

  it("handles pluralization", () => {
    withEn(() => {
      const elem0 = shallow(
        <ContextTest>
          <Translate with={values} count={0}>
            test.plural
          </Translate>
        </ContextTest>
      );
      expect(elem0.html()).toEqual(`No items`);

      const elem1 = shallow(
        <ContextTest>
          <Translate with={values} count={1}>
            test.plural
          </Translate>
        </ContextTest>
      );
      expect(elem1.html()).toEqual(`One item`);

      const elem2 = shallow(
        <ContextTest>
          <Translate with={values} count={2}>
            test.plural
          </Translate>
        </ContextTest>
      );
      expect(elem2.html()).toEqual(`2 items`);
    });
  });

  it("pluralizes languages other than english", () => {
    withDe(() => {
      const elem0 = shallow(
        <ContextTest>
          <Translate with={values} count={0}>
            test.plural
          </Translate>
        </ContextTest>
      );
      expect(elem0.html()).toEqual(`Keine Gegenstände`);

      const elem1 = shallow(
        <Translate with={values} count={1}>
          test.plural
        </Translate>
      );
      expect(elem1.html()).toEqual(`Ein Gegenstand`);

      const elem2 = shallow(
        <ContextTest>
          <Translate with={values} count={2}>
            test.plural
          </Translate>
        </ContextTest>
      );
      expect(elem2.html()).toEqual(`2 Artikel`);
    });
  });

  // This test is probably extraneous, but just in case
  it("works with string templates", () => {
    const someVar = "test";
    withEn(() => {
      const elem = shallow(
        <ContextTest>
          <Translate with={values}>{`${someVar}.greeting`}</Translate>
        </ContextTest>
      );
      expect(elem.html()).toEqual(defaultExpected);
    });
  });

  it("respects a locale that's set as a prop", () => {
    withDe(() => {
      const elem = shallow(
        <ContextTest>
          <Translate with={values} locale="en">
            test.greeting
          </Translate>
        </ContextTest>
      );
      expect(elem.html()).toEqual(defaultExpected);
    });
  });

  it("listens for locale switching and updates", () => {
    contextTranslator.setLocale("en");
    const elem = shallow(<Wrapped />);

    expect(elem.html()).toEqual(defaultExpected);

    contextTranslator.setLocale("de");
    elem.update();

    expect(elem.html()).toEqual("Guten Tag, foobar");
  });
});
