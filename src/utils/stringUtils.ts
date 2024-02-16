export const convertToKebabCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
