import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#7f7f7f',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      header:'rgba(10,10,10,0.23)'
    },
  },
  typography: {
    fontFamily: [
      'sans-serif',
      'Roboto',
      'Rockwell Condensed',
      'Rubik',
    ]
  }
});
 
export default theme;