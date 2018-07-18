# React Simple Translate

A straightforward translation component to be used with React.

## Usage

TBD

## API

### `<Interpolate with={Object}>{children}</Interpolate>`

Given a string with keys, replace those keys with values from a provided object.

#### Arguments

- **with**: An object of key value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`;
- **component**: The component that will surround the interpolated string. Defaults to `span`
- **children**: The string to be interpolated. Keys to replace _must_ be surrouned with `%()s` (i.e. `%(name)s`)

#### Usage

```
  import { Interpolate } from "react-simple-translate";
  const values = {
    name: "Bob"
  };

  // Returns <span>Hello, Bob</span>
  return <Interpolate with={values}>Hello, %(name)s</Interpolate>;
```
