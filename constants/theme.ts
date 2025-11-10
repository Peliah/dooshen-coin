/**
 * Web3-themed color system with glassmorphic design
 * Dark mode is primary theme
 */

import { Platform } from 'react-native';

// Web3 Color Palette - Custom Colors
const web3Primary = '#f2f5fc'; // Primary color
const web3Secondary = '#161621'; // Secondary color
const web3Accent = '#f5f5f5'; // Text and highlights
const web3Success = '#10B981'; // Green
const web3Error = '#EF4444'; // Red
const web3Warning = '#F59E0B'; // Amber

// Dark Mode Colors (Primary)
const darkBackground = '#161621'; // Secondary color as background
const darkSurface = '#1a1a28'; // Slightly lighter than secondary
const darkCard = '#1f1f2e'; // Card background
const darkText = '#f5f5f5'; // Text and highlights
const darkTextSecondary = '#a1a1aa'; // Muted text
const darkBorder = 'rgba(245, 245, 245, 0.1)'; // Subtle border

// Glassmorphic Colors
const glassBackground = 'rgba(31, 31, 46, 0.7)'; // Semi-transparent card
const glassBorder = 'rgba(245, 245, 245, 0.15)'; // Glass border
const glassBlur = 20; // Blur intensity

// Gradient Colors
export const Gradients = {
  primary: ['#f2f5fc', '#e8edf9', '#dde5f5'], // Primary color gradient
  background: ['#161621', '#1a1a28', '#1f1f2e'], // Secondary color gradient
  card: ['rgba(242, 245, 252, 0.1)', 'rgba(245, 245, 245, 0.1)'], // Subtle card gradient
  glow: {
    primary: 'rgba(242, 245, 252, 0.3)',
    secondary: 'rgba(22, 22, 33, 0.3)',
    accent: 'rgba(245, 245, 245, 0.3)',
  },
};

const tintColorLight = '#0a7ea4';
const tintColorDark = web3Primary; // #f2f5fc

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    // Primary dark theme (Web3)
    text: darkText,
    textSecondary: darkTextSecondary,
    background: darkBackground,
    surface: darkSurface,
    card: darkCard,
    border: darkBorder,
    tint: tintColorDark,
    icon: darkTextSecondary,
    tabIconDefault: darkTextSecondary,
    tabIconSelected: tintColorDark,
    
    // Web3 Accent Colors
    primary: web3Primary,
    secondary: web3Secondary,
    accent: web3Accent,
    success: web3Success,
    error: web3Error,
    warning: web3Warning,
    
    // Glassmorphic
    glass: {
      background: glassBackground,
      border: glassBorder,
      blur: glassBlur,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** Main Web3 font - Rosefana */
    sans: 'Rosefana',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
    /** Custom Web3 font (alias for sans) */
    web3: 'Rosefana',
  },
  default: {
    /** Main Web3 font - Rosefana */
    sans: 'Rosefana',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    /** Custom Web3 font (alias for sans) */
    web3: 'Rosefana',
  },
  web: {
    /** Main Web3 font - Rosefana */
    sans: 'Rosefana',
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    /** Custom Web3 font (alias for sans) */
    web3: 'Rosefana',
  },
});

// Web3 Design Tokens
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: web3Primary, // #f2f5fc
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 0,
  },
};
