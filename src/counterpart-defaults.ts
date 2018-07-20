// Per https://github.com/martinandert/counterpart/issues/12
// We need to set the defaults for locales other than EN, which
// is terrible :/

export const localeDefaults = {
  counterpart: {
    pluralize: (entry, count) =>
      entry[
        count === 0 && "zero" in entry ? "zero" : count === 1 ? "one" : "other"
      ],
    formats: {
      date: {
        default: "%a, %e. %b %Y",
        long: "%A, %e. %B %Y",
        short: "%d.%m.%y"
      },
      time: {
        default: "%H:%M",
        long: "%H:%M:%S %z",
        short: "%H:%M"
      },
      datetime: {
        default: "%a, %e. %b %Y, %H:%M",
        long: "%A, %e. %B %Y, %H:%M:%S %z",
        short: "%d.%m.%y %H:%M"
      }
    }
  }
};
