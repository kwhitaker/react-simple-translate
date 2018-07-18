import * as React from "react";
import { configure, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { Interpolate } from "./interpolate";

configure({ adapter: new Adapter() });

const toReplace = "Hello, %(name)s";

describe("<Interpolate />", () => {
  it("takes a string with keys to replace and replaces them", () => {
    const values = {
      name: "foobar"
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.text()).toEqual("Hello, foobar");
  });

  it("can replace part of a string with React components", () => {
    const values = {
      name: <strong>foobar</strong>
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.find("strong").length).toBe(1);
    expect(elem.text()).toEqual("Hello, foobar");
  });

  it("defaults to wrapping in a <span>", () => {
    const values = {
      name: "foobar"
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.find("span").length).toBe(1);
    expect(elem.text()).toEqual("Hello, foobar");
  });

  it("can take a 'component' prop and wrap in that", () => {
    const values = { name: "foobar" };

    const elem = shallow(
      <Interpolate with={values} component="strong">
        {toReplace}
      </Interpolate>
    );
    expect(elem.find("strong").length).toBe(1);
    expect(elem.text()).toEqual("Hello, foobar");
  });
});
