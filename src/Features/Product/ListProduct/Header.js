import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { showForm } from '../ProductSlice';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: '#fafafa',
		marginBottom: '20px',
	},
}));

const Header = ({ showForm }) => {
	const classes = useStyles();
	return (
		<Grid
			container
			justify='space-between'
			alignItems='center'
			className={classes.container}
		>
			<Grid>
				<Typography variant='h3' component='h1'>
					Danh sách sản phẩm
				</Typography>
			</Grid>
			<Grid>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={() => showForm({ action: 'CREATE' })}
				>
					Tạo sản phẩm
				</Button>
			</Grid>
		</Grid>
	);
};

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({ showForm }, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(Header);
