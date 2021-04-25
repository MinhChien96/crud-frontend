import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListProduct from './ListProduct';
import CreateProduct from './Create';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#fafafa',
	},
	container: {
		paddingTop: '100px',
		minHeight: '100vh',
	},
}));

const ProductContainer = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Container maxWidth='lg' fixed className={classes.container}>
				<ListProduct />
				<CreateProduct />
			</Container>
		</div>
	);
};

export default ProductContainer;
