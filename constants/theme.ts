import { Platform } from 'react-native';

const web3Primary = '#ff9f00';
const web3Secondary = '#161621';
const web3Accent = '#f5f5f5';
const web3Success = '#10B981';
const web3Error = '#EF4444';
const web3Warning = '#F59E0B';

const darkBackground = '#161621';
const darkSurface = '#1a1a28';
const darkCard = '#1f1f2e';
const darkText = '#f5f5f5';
const darkTextSecondary = '#a1a1aa';
const darkBorder = 'rgba(245, 245, 245, 0.1)';

const glassBackground = 'rgba(31, 31, 46, 0.7)';
const glassBorder = 'rgba(245, 245, 245, 0.15)';
const glassBlur = 20;

export const Gradients = {
  primary: ['#ff9f00', '#ffb340', '#ffc766'],
  background: ['#161621', '#1a1a28', '#1f1f2e'],
  card: ['rgba(255, 159, 0, 0.1)', 'rgba(245, 245, 245, 0.1)'],
  glow: {
    primary: 'rgba(255, 159, 0, 0.3)',
    secondary: 'rgba(22, 22, 33, 0.3)',
    accent: 'rgba(245, 245, 245, 0.3)',
  },
};

const tintColorLight = '#0a7ea4';
const tintColorDark = web3Primary;

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
    
    primary: web3Primary,
    secondary: web3Secondary,
    accent: web3Accent,
    success: web3Success,
    error: web3Error,
    warning: web3Warning,
    
    glass: {
      background: glassBackground,
      border: glassBorder,
      blur: glassBlur,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Rosefana',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    web3: 'Rosefana',
  },
  default: {
    sans: 'Rosefana',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    web3: 'Rosefana',
  },
  web: {
    sans: 'Rosefana',
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    web3: 'Rosefana',
  },
});

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
    shadowColor: web3Primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 0,
  },
};
