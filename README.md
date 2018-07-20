# React Simple Translate

An easy to use translation component which wraps the [counterpart](https://github.com/martinandert/counterpart/) module.

## Usage

```javascript
import { Translate } from "react-simple-translate";
import * as counterpart from "counterpart";

counterpart.registerTranslations("en", {
  test: { greeting: "Hello, %(name)s" }
});
counterpart.registerTranslations("de", {
  test: { greeting: "Guten Tag, %(name)s" }
});
counterpart.setLocale("en");

const values = {
  name: "Bob"
};

// Returns <span>Hello, Bob</span>
return <Translate with={values}>test.greeting</Translate>;

counterpart.setLocale("de");

// Returns <span>Guten Tag, Bob</span>
return <Translate with={values}>test.greeting</Translate>;
```

## API

### `<Translate with={Object}>{children}</Translate>`

Given a string with keys, replace those keys with values from the current `counterpart` locale.

#### Arguments

- **with**: An object of key/value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **component**: The component that will surround the interpolated string. Defaults to `span`.
- **children**: A dot notation path corresponding to the locale string to be translated.
- **attributes**: An object of key/value pairs where the key is a valid HTML attribute and the value is a string path for the translation to follow.
- **...{counterpart args}**: You can pass in any other argument that [counterpart](https://github.com/martinandert/counterpart/) takes, and it should handle them a well.

#### Usage

```javascript
import { Translate } from "react-simple-translate";
import * as counterpart from "counterpart";

counterpart.registerTranslations("en", {
  test: { greeting: "Hello, %(name)s", title: "Click me, %(name)s!" }
});
counterpart.setLocale("en");

const values = {
  name: "Bob"
};

// Returns <span>Hello, Bob</span>
return <Translate with={values}>test.greeting</Translate>;

// Returns <span title="Click me, Bob!">Hello, Bob</span>
return (
  <Translate with={values} attributes={{ title: "test.title" }}>
    test.greeting
  </Translate>
);
```

---

### `<Interpolate with={Object}>{children}</Interpolate>`

Given a string with keys, replace those keys with values from a provided object.

#### Arguments

- **with**: An object of key value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **component**: The component that will surround the interpolated string. Defaults to `span`.
- **children**: The string to be interpolated. Keys to replace _must_ be surrouned with `%()s` (i.e. `%(name)s`).
- **...{counterpart args}**: You can pass in any other argument that [counterpart](https://github.com/martinandert/counterpart/) takes, and it should handle them a well.

#### Usage

```javascript
import { Interpolate } from "react-simple-translate";
const values = {
  name: "Bob"
};

// Returns <span>Hello, Bob</span>
return <Interpolate with={values}>Hello, %(name)s</Interpolate>;
```

---

## Pluralization

Because of a [bug in counterpart](https://github.com/martinandert/counterpart/issues/12), using
pluralization with locales other than the default requires a work-around. To help with this, I've
provided a `localeDefaults` export to be used when registering translations with counterpart.

```javascript
import * as counterpart from "counterpart";
import { localeDefaults } from "react-simple-translate";

const somethingOtherThanDefault = require("./de.json");
counterpart.registerTranslations("de", {
  ...somethingOtherThanDefault,
  ...localeDefaults
});
```
