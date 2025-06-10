import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E3A8A' },
    secondary: { main: '#F59E0B' },
    background: { default: '#F3F4F6', paper: '#FFFFFF' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#60A5FA' },
    secondary: { main: '#FBBF24' },
    background: { default: '#1F2937', paper: '#374151' },
  },
});