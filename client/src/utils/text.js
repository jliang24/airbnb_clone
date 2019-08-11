export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const pluralization = (string, value) => {
  if (value === 1) return string.substring(0, string.length - 1);
  return string;
};

export const hasNumbers = string => {
  return /\d/.test(string);
};
