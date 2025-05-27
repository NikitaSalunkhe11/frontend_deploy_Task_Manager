
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#ffffff', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});

export default theme;
