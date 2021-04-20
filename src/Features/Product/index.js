import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListProduct from './ListProduct';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '100px',
        minHeight: '100vh',
    },
}));

const ProductContainer = () => {
    const classes = useStyles();
    return (
        <Container maxWidth='lg' fixed className={classes.container}>
            <ListProduct />
        </Container>
    );
};

export default ProductContainer;
