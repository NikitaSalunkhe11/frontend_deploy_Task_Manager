import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Layout/Navbar';
import store from './app/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline/>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <AppRoutes />
        </Container>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
