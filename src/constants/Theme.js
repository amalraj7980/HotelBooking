// Define the color palette
const Palette = {
  primary: "#0F71B8",
  secondary: "#061F48",
  grey: "#606976",
  white: "#ffffff",
  black: "#000000",
  lightGrey: "#F3F3F3",
  green: "#6B9E25",
  mediumGrey: "#D9D9D9",
  lightBlue: "#E3ECF2",
  errorDark: "#BF3232",
  errorLight: "#BF3232",
  darkBlue: "#3D67A1",
  buttonDisable: "#D9D9D6",
  buttonLoading: "#5D87C2",
};

// Map the palette to named colors
export const Colors = {
  whiteColor: Palette.white,
  blackColor: Palette.black,
  primaryColor: Palette.primary,
  secondaryColor: Palette.secondary,
  greyColor: Palette.grey,
  lightGreyColor: Palette.lightGrey,
  lightBlueColor: Palette.lightBlue,
  greenColor: Palette.green,
  darkBlueColor: Palette.darkBlue,
  buttonDisableColor: Palette.buttonDisable,
  buttonLoadingColor: Palette.buttonLoading,
  mediumGreyColor: Palette.mediumGrey,
  errorColor: Palette.errorLight,
};

// Export theme
const Theme = { Colors };
export default Theme;
