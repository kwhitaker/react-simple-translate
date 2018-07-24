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

// Returns <>Hello, Bob</>
return <Translate with={values}>test.greeting</Translate>;

counterpart.setLocale("de");

// Returns <>Guten Tag, Bob</>
return <Translate with={values}>test.greeting</Translate>;
```

### Using React's context

Instead of relying on a global `counterpart` instance, you can pass
an instance down through React's context. Currently, only the [legacy context](https://reactjs.org/docs/legacy-context.html) is supported, but an update for the current contex API is coming.

You can find an example of this by looking at the [`<ContextTestHelper />`](https://github.com/kwhitaker/react-simple-translate/blob/master/src/translate/context-test-helper.tsx) component.

## API

### `<Translate with={Object}>{children}</Translate>`

Given a string with keys, replace those keys with values from the current `counterpart` locale.

#### Arguments

- **with**: An object of key/value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **children**: A dot notation path corresponding to the locale string to be translated.
- **...{counterpart args}**: You can pass in any other argument that [counterpart](https://github.com/martinandert/counterpart/) takes, and it should handle them a well.

#### Usage

```javascript
import { Translate } from "react-simple-translate";
import * as counterpart from "counterpart";

counterpart.registerTranslations("en", {
  test: { greeting: "Hello, %(name)s" }
});
counterpart.setLocale("en");

const values = {
  name: "Bob"
};

// Returns <>Hello, Bob</>
return <Translate with={values}>test.greeting</Translate>;
```

---

### `<Interpolate with={Object}>{children}</Interpolate>`

Given a string with keys, replace those keys with values from a provided object.

#### Arguments

- **with**: An object of key value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **children**: The string to be interpolated. Keys to replace _must_ be surrouned with `%()s` (i.e. `%(name)s`).
- **...{counterpart args}**: You can pass in any other argument that [counterpart](https://github.com/martinandert/counterpart/) takes, and it should handle them a well.

#### Usage

```javascript
import { Interpolate } from "react-simple-translate";
const values = {
  name: "Bob"
};

// Returns <>Hello, Bob</>
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
