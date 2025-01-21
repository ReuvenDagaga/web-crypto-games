import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FBCB0A', // Yellow Gold
            contrastText: '#1D3557', // Deep Blue for contrast
        },
        secondary: {
            main: '#E63946', // Red
        },
        background: {
            default: '#1D3557', // Deep Blue
            paper: '#457B9D', // Medium Blue
        },
        text: {
            primary: '#F1FAEE', // Whiteish
            secondary: '#A8DADC', // Light Blue
        },
    },
    typography: {
        fontFamily: '"Jersey 15", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '0.15rem',  // כותרות ראשיות עם מרווח גדול יותר
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '0.12rem',
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 500,
        },
        button: {
            textTransform: 'uppercase',
            letterSpacing: '0.1rem',  // כפתורים עם מרווח מותאם
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    letterSpacing: '0.1rem',  // שימוש גלובלי בטיפוגרפיה
                },
            },
        },
    },
});

export default theme;
