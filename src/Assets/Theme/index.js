import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const themeColor = {
    red: '#ED1D25',
    redFilledHover: 'rgba(237,29,37, 0.87)',
    redOutlinedHover: 'rgba(237,29,37, 0.1)',
    black: '#474747',
    blackFilledHover: 'rgba(71,71,71, 0.87)',
    blackOutlinedHover: 'rgba(71,71,71, 0.1)',
    gray: '#212121',
    grayOutlinedHover: '#e0e0e0',
    grayTextHover: '#e0e0e0',
};

const theme = {
    palette,
    typography,
    overrides,
    themeColor,
};

export default theme;
