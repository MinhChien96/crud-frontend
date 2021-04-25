import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: '#DD040C',
        main: '#ED1D25',
        light: '#F04A50',
    },
    secondary: {
        contrastText: black,
        dark: '#eeeeee',
        main: '#9e9e9e',
        light: '#e0e0e0',
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        link: colors.blue[600],
    },
    link: colors.blue[800],
    icon: colors.blueGrey[600],
    background: {
        default: '#F4F6F8',
        paper: white,
    },
    divider: colors.grey[200],
};
