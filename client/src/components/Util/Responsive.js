export const ResponsiveWrapper = ({
  deviceWidth,
  mobileBreakpoint,
  children,
  mobileAlt
}) => (deviceWidth > mobileBreakpoint ? children : mobileAlt);

export let mobileClass = (deviceWidth, breakpoint, className, alt) => {
  return deviceWidth < breakpoint ? className : alt;
};
