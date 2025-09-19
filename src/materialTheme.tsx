import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let zenGreenTheme = createTheme({
  palette: {
    primary: {
      main: '#3B7A57',      // deep green
      light: '#6CA785',     // soft green
      dark: '#2A5C3D',      // darker shade
      contrastText: '#ffffff', // white text on primary
    },
    secondary: {
      main: '#A8D5BA',      // light minty green
      light: '#CFF0DD',
      dark: '#7FB993',
      contrastText: '#000000', // black text on secondary
    },
    background: {
      default: '#F0F5F2',   // very light green/gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E3D32',   // dark greenish text
      secondary: '#5C6B5A', // softer text
    },
  },
});

zenGreenTheme = responsiveFontSizes(zenGreenTheme);

export default zenGreenTheme;
