const daisyVars = [
  "--color-primary",
  "--color-primary-content",
  "--color-secondary",
  "--color-secondary-content",
  "--color-accent",
  "--color-accent-content",
  "--color-neutral",
  "--color-neutral-content",
  "--color-base-100",
  "--color-base-200",
  "--color-base-300",
  "--color-base-content",
  "--color-info",
  "--color-info-content",
  "--color-success",
  "--color-success-content",
  "--color-warning",
  "--color-warning-content",
  "--color-error",
  "--color-error-content",
] as const;

type DaisyVar = (typeof daisyVars)[number];
type DaisyColors = Record<DaisyVar, string>;

export const colors: DaisyColors = Object.fromEntries(
  daisyVars.map((vars) => [
    vars,
    getComputedStyle(document.documentElement).getPropertyValue(vars).trim(),
  ])
) as DaisyColors;

// TODO:delete this if I wont use it
