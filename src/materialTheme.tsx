import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let zenGreenTheme = createTheme({
  palette: {
    primary: {
      main: '#3B7A57',
      light: '#6CA785',
      dark: '#2A5C3D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#A8D5BA',
      light: '#CFF0DD',
      dark: '#7FB993',
      contrastText: '#000000',
    },
    background: {
      default: '#F0F5F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E3D32',
      secondary: '#5C6B5A',
    },
  },
});

zenGreenTheme = responsiveFontSizes(zenGreenTheme);

export default zenGreenTheme;
