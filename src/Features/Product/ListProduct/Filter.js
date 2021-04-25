import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: '8px',
		margin: 'auto',
		backgroundColor: '#FFFFFF',
		boxShadow:
			'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
		borderTopLeftRadius: '4px',
		borderTopRightRadius: '4px',
	},
	button: {
		padding: '7px 16px',
	},
});

const groupOptions = [
	{
		id: 0,
		label: 'None',
		value: 'none',
	},
	{
		id: 1,
		label: 'Loại',
		value: 'type',
	},
	{
		id: 2,
		label: 'Xuất xứ',
		value: 'madeBy',
	},
	{
		id: 3,
		label: 'Loại, xuất xứ',
		value: 'type,madeBy',
	},
];

const FilterComponent = ({
	onChangeSearching,
	onClickReset,
	onClickSearch,
	searching,
}) => {
	const handleChangeInput = (field, event) => {
		const { value } = event.target;
		onChangeSearching(field, value);
	};

	const handleClickSearch = () => {
		onClickSearch();
	};

	const classes = useStyles();
	return (
		<Grid
			container
			spacing={2}
			justify='flex-end'
			alignItems='center'
			className={classes.root}
		>
			<Grid item xs={4} md={2}>
				<TextField
					label='Nhóm theo'
					variant='outlined'
					select
					size='small'
					fullWidth
                    onChange={(event) => handleChangeInput('group', event)}
					value={searching.group}
				>
					{groupOptions.map((option) => (
						<MenuItem key={option.id} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={4} md={2}>
				<TextField
					label='Tên'
					variant='outlined'
					size='small'
					onChange={(event) => handleChangeInput('name', event)}
					value={searching.name}
				/>
			</Grid>
			<Grid item xs={4} md={2}>
				<TextField
					label='Loại'
					variant='outlined'
					size='small'
					onChange={(event) => handleChangeInput('type', event)}
					value={searching.type}
				/>
			</Grid>
			<Grid item xs={4} md={2}>
				<TextField
					label='Giá min'
					variant='outlined'
					size='small'
					type='number'
					onChange={(event) => handleChangeInput('minPrice', event)}
					value={searching.minPrice}
				/>
			</Grid>
			<Grid item xs={4} md={2}>
				<TextField
					label='Giá max'
					variant='outlined'
					size='small'
					type='number'
					onChange={(event) => handleChangeInput('maxPrice', event)}
					value={searching.maxPrice}
				/>
			</Grid>
			<Grid item xs={2} md={1}>
				<Button
					variant='outlined'
					color='primary'
					fullWidth
					className={classes.button}
					onClick={handleClickSearch}
				>
					Xem
				</Button>
			</Grid>
			<Grid item xs={2} md={1}>
				<Button
					variant='outlined'
					fullWidth
					className={classes.button}
					onClick={onClickReset}
				>
					Reset
				</Button>
			</Grid>
		</Grid>
	);
};

export default FilterComponent;
