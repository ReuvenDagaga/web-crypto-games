import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
);
