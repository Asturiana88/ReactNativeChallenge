import * as React from 'react';
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, Modal as DefaultModal } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ModalProps = ThemeProps & DefaultModal['props'];

export const Text = ({ style, lightColor, darkColor, ...otherProps }: TextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export const TextInput = ({ style, lightColor, darkColor, ...otherProps }: TextInputProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

  return <DefaultTextInput placeholderTextColor={color} style={[{ color, borderColor }, style]} {...otherProps} />;
}

export const View = ({ style, lightColor, darkColor, ...otherProps }: ViewProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Modal = ({ style, lightColor, darkColor, ...otherProps }: ModalProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultModal style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const ItemContainer = ({ style, lightColor, darkColor, ...otherProps }: ViewProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

  return <DefaultView style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}

