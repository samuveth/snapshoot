import { computed } from "vue";

const getDurationAndUnit = (seconds: number) => {
  let unit = "second";
  let duration = seconds;
  const abs = Math.abs(seconds);

  if (abs >= 60) {
    unit = "minute";
    duration = duration / 60;
    if (abs >= 60 * 60) {
      unit = "hour";
      duration = duration / 60;
      if (abs >= 60 * 60 * 24) {
        unit = "day";
        duration = duration / 24;
        if (abs >= 60 * 60 * 24 * 365) {
          unit = "year";
          duration = duration / 365;
        } else if (abs >= 60 * 60 * 24 * 30) {
          unit = "month";
          duration = duration / 30;
        } else if (abs >= 60 * 60 * 24 * 7) {
          unit = "week";
          duration = duration / 7;
        }
      }
    }
  }

  duration = Math.round(duration);

  return { duration, unit };
};

export function useIntl() {
  const { t } = useI18n();

  /**
   * functions to create computed formatters based on locale
   *
   * If you need a custom format in only one component, you can import these
   * functions to create a custom formatter locally in that component, to use
   * it as the formatting functions' 2nd argument.
   * Otherwise you can add a predefined formatter and a formatting function
   * below and add them to the return list.
   */

  const getRelativeTimeFormatter = (options?: object) =>
    computed(
      () =>
        new Intl.RelativeTimeFormat(
          "en", // currentLocale.value,
          options || { style: "short", numeric: "always" }
        )
    );

  const getNumberFormatter = (options?: object) =>
    computed(
      () =>
        new Intl.NumberFormat(
          // currently we are using only english number formatting because other
          // languages can result in very different string length, which we need to deal with.
          // (en: 10.2k, de: 10.200)
          "en", // currentLocale.value,
          options || { notation: "standard" }
        )
    );

  /**
   * predefined formatters
   */

  const defaultRelativeTimeFormatter = getRelativeTimeFormatter();
  const longRelativeTimeFormatter = getRelativeTimeFormatter({
    style: "long",
    numeric: "always",
  });
  const defaultNumberFormatter = getNumberFormatter(
    // format with two decimal places
    { maximumFractionDigits: 2 }
  );
  const compactNumberFormatter = getNumberFormatter({
    notation: "compact",
    compactDisplay: "short",
  });
  const percentNumberFormatter = getNumberFormatter({
    style: "percent",
    maximumFractionDigits: 2,
  });

  /**
   * formatting functions
   */

  const formatRelativeTime = (
    timestamp: number,
    formatter?: Intl.RelativeTimeFormat
  ) => {
    const relativeTo = new Date().getTime() / 1e3;

    const { duration, unit } = getDurationAndUnit(timestamp - relativeTo);

    formatter = formatter || defaultRelativeTimeFormatter.value;

    return formatter.format(duration, unit as any);
  };

  // doesn't use Intl (yet), needs useI18n's t function, to translate the unit
  const formatDuration = (seconds: number) => {
    const { duration, unit } = getDurationAndUnit(seconds);

    return t(`timeUnits.${unit}`, { n: duration });
  };

  const formatNumber = (number: number, formatter?: Intl.NumberFormat) => {
    formatter = formatter || defaultNumberFormatter.value;

    return formatter.format(number);
  };

  const formatCompactNumber = (number: number) =>
    formatNumber(number, compactNumberFormatter.value);

  const formatPercentNumber = (number: number) =>
    formatNumber(number, percentNumberFormatter.value);

  const getRelativeProposalPeriod = (state: any, start: any, end: any): any => {
    const now: any = new Date().getTime() / 1e3;
    if (state === "closed") {
      return t("endedAgo", [formatRelativeTime(end)]);
    }
    if (state === "active") {
      return t("proposalTimeLeft", [formatDuration(end - now)]);
    }
    return t("startIn", [formatRelativeTime(start)]);
  };

  return {
    getRelativeTimeFormatter,
    getNumberFormatter,
    formatRelativeTime,
    formatDuration,
    formatNumber,
    formatCompactNumber,
    formatPercentNumber,
    getRelativeProposalPeriod,
    longRelativeTimeFormatter,
  };
}
