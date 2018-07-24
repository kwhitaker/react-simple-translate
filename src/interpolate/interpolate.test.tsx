import * as React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { Interpolate } from "./interpolate";

configure({ adapter: new Adapter() });

const toReplace = "Hello, %(name)s, you %(insult)s";

describe("<Interpolate />", () => {
  it("takes a string with keys to replace and replaces them", () => {
    const values = {
      name: "foobar",
      insult: "nerf herder"
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.text()).toEqual("Hello, foobar, you nerf herder");
  });

  it("can replace part of a string with React components", () => {
    const values = {
      name: <strong>foobar</strong>,
      insult: "nerf herder"
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.find("strong").length).toBe(1);
    expect(elem.text()).toEqual("Hello, foobar, you nerf herder");
  });

  it("returns a fragment", () => {
    const values = {
      name: "foobar",
      insult: "nerf herder"
    };

    const elem = shallow(<Interpolate with={values}>{toReplace}</Interpolate>);
    expect(elem.type().toString()).toEqual("Symbol(react.fragment)");
    expect(elem.prop("component")).toBeUndefined();
    expect(elem.prop("children")).toEqual([
      "Hello, ",
      "foobar",
      ", you ",
      "nerf herder"
    ]);
  });
});
