import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Product from 'Features/Product';
import ConfigureStore from 'Store/ConfigureStore';
import theme from 'Assets/Theme';
import './App.css';

const store = ConfigureStore();

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={createMuiTheme(theme)}>
                <Product />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
