[![Build Status](https://travis-ci.com/kwhitaker/react-simple-translate.svg?branch=master)](https://travis-ci.com/kwhitaker/react-simple-translate)

# React Simple Translate

An easy to use translation component. Given a translator (which shares the shape of [counterpart](https://github.com/martinandert/counterpart/)), and a set of translations, it will handle locale swapping and string interpolation.

## Usage

```javascript
import Translate, { TranslatorContext } from "react-simple-translate";
import someTranslator from "some-translator-lib";

someTranslator.registerTranslations("en", {
  test: { greeting: "Hello, %(name)s" }
});
someTranslator.registerTranslations("de", {
  test: { greeting: "Guten Tag, %(name)s" }
});
someTranslator.setLocale("en");

const Greeting = props => (
  <p>
    <Translate with={props.values}>test.greeting</Translate>
  </p>
);

class TranslatedComponent extends React.Component {
  state = {
    values: name: "Bob"
  }

  render() {
    return (
      <div>
        <TranslatorContext.Provider value={someTranslator}>
          <Greeting values={this.state.values} />
        </TranslatorContext.Provider>
      </div>
    );
  }
}

// Returns <div><p>Hello, Bob</p></div>
return <TranslatedComponent />;

someTranslator.setLocale("de");

// Returns <div><p>Guten Tag, Bob</p></div>
return <TranslatedComponent />;
```

You can also pass a translator directly to `<Translate />` if you don't want to use context:

```javascript
import { Translate } from "react-simple-translate";
import someTranslator from "some-translator-lib";

const elem = <Translate with={someObj} translator={someTranslator} />;
```

---

## Optional Dependencies

While this component was developed with [counterpart](https://github.com/martinandert/counterpart/) in mind it is optional; you can pass whatever translator you need into it, so long as it matches the expected shape.

---

## API

### `<Translate with={Object}>{children}</Translate>`

Given a string with keys, replace those keys with values from the current `counterpart` locale.

#### Arguments

- **with: Object**: An object of key/value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **children: String | String[]**: A dot notation or array path corresponding to the locale string to be translated.
- **count?: Number**: An optional parameter for handling pluralization.

---

### `<Interpolate with={Object}>{children}</Interpolate>`

Given a string with keys, replace those keys with values from a provided object.

#### Arguments

- **with: Object**: An object of key value pairs where the keys match the specified keys in **children**. Values must be of type `React.ReactChild`.
- **children**: The string to be interpolated. Keys to replace _must_ be surrouned with `%()s` (i.e. `%(name)s`).
- **count?: Number**: An optional parameter for handling pluralization.

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

## Pluralization with Counterpart

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
