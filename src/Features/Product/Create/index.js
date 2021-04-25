import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	FormControl,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { closeForm } from '../ProductSlice';
import productService from 'Services/Product';

const madeByOptions = [
	{
		id: 1,
		label: 'Mỹ',
		value: 'Mỹ',
	},
	{
		id: 2,
		label: 'Nhật',
		value: 'Nhật',
	},
	{
		id: 3,
		label: 'Việt Nam',
		value: 'Việt Nam',
	},
	{
		id: 4,
		label: 'Hàn Quốc',
		value: 'Hàn Quốc',
	},
	{
		id: 5,
		label: 'EU',
		value: 'EU',
	},
	{
		id: 6,
		label: 'Khác',
		value: 'Khác',
	},
];

const typeOptions = [
	{
		id: 1,
		label: 'Máy tính',
		value: 'Máy tính',
	},
	{
		id: 2,
		label: 'Máy giặt',
		value: 'Máy giặt',
	},
	{
		id: 3,
		label: 'Xe máy',
		value: 'Xe máy',
	},
	{
		id: 4,
		label: 'Điện thoại',
		value: 'Điện thoại',
	},
	{
		id: 5,
		label: 'Khác',
		value: 'Khác',
	},
];

const useStyles = makeStyles((theme) => ({
	actions: {
		padding: '16px 24px',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Create = ({
	isShowForm,
	closeForm,
	formAction = 'CREATE',
	idProductEdit,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isClickSubmitForm, setIsClickSubmitForm] = useState(false);
	const [form, setForm] = useState({
		name: {
			value: '',
			error: '',
		},
		type: {
			value: '',
			error: '',
		},
		madeBy: {
			value: '',
			error: '',
		},
		price: {
			value: '',
			error: '',
		},
	});

	const handleChangeForm = (field, event) => {
		const { value } = event.target;
		const newForm = { ...form };
		const fieldValue = form[field];
		newForm[field] = { ...fieldValue, value };
		setForm(newForm);
	};

	const checkValidForm = () => {
		const { name, type, price, madeBy } = form;
		let errorName = '';
		let errorType = '';
		let errorPrice = '';
		let errorMadeBy = '';
		if (name.value == '') {
			errorName = 'Trường này là bắt buộc';
		}
		if (type.value == '') {
			errorType = 'Trường này là bắt buộc';
		}
		if (price.value == '') {
			errorPrice = 'Trường này là bắt buộc';
		}
		if (madeBy.value == '') {
			errorMadeBy = 'Trường này là bắt buộc';
		}
		setForm({
			name: { ...name, error: errorName },
			price: { ...price, error: errorPrice },
			madeBy: { ...madeBy, error: errorMadeBy },
			type: { ...type, error: errorType },
		});
		return !(errorName && errorType && errorPrice && errorMadeBy);
	};

	const create = async () => {
		setIsLoading(true);
		try {
			const { name, type, price, madeBy } = form;
			const params = {
				name: name.value,
				type: type.value,
				price: price.value,
				madeBy: madeBy.value,
			};
			await productService.create(params);
		} catch (error) {
		} finally {
			setIsLoading(false);
			closeForm(true);
		}
	};

	const update = async () => {
		setIsLoading(true);
		try {
			const { name, type, price, madeBy } = form;
			const params = {
				id: idProductEdit,
				name: name.value,
				type: type.value,
				price: price.value,
				madeBy: madeBy.value,
			};
			await productService.update(params);
		} catch (error) {
		} finally {
			setIsLoading(false);
			closeForm(true);
		}
	};

	const handleSubmit = () => {
		setIsClickSubmitForm(true);
		if (checkValidForm()) {
			if (formAction === 'CREATE') {
				create();
			} else update();
		}
	};

	const resetState = () => {
		setForm({
			name: {
				value: '',
				error: '',
			},
			type: {
				value: '',
				error: '',
			},
			madeBy: {
				value: '',
				error: '',
			},
			price: {
				value: '',
				error: '',
			},
		});
		setIsClickSubmitForm(false);
		setIsLoading(false);
	};

	const fetchProduct = async () => {
		setIsLoading(true);
		try {
			const response = await productService.getById(idProductEdit);
			const { name, type, madeBy, price } = response.data;
			setForm({
				name: {
					value: name,
					error: '',
				},
				type: {
					value: type,
					error: '',
				},
				madeBy: {
					value: madeBy,
					error: '',
				},
				price: {
					value: price,
					error: '',
				},
			});
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		resetState();
		if (formAction === 'EDIT') {
			fetchProduct();
		}
	}, [isShowForm]);

	const title =
		formAction == 'CREATE' ? 'Tạo sản phẩm' : 'Chỉnh sửa sản phẩm';

	const classes = useStyles();

	return (
		<div>
			<Dialog
				open={isShowForm}
				onClose={() => closeForm()}
				fullWidth
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
				<DialogContent>
					<FormControl id='GroupUser' fullWidth>
						<Grid
							container
							spacing={2}
							justify='center'
							alignItems='center'
						>
							<Grid item xs={12}>
								<TextField
									label='Tên'
									size='small'
									fullWidth
									value={form.name.value}
									required
									error={
										form.name.error != '' &&
										isClickSubmitForm
									}
									helperText={form.name.error}
									onChange={(event) =>
										handleChangeForm('name', event)
									}
									disabled={isLoading}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label='Xuất xứ'
									select
									size='small'
									fullWidth
									required
									value={form.madeBy.value}
									error={
										form.madeBy.error != '' &&
										isClickSubmitForm
									}
									helperText={form.madeBy.error}
									onChange={(event) =>
										handleChangeForm('madeBy', event)
									}
									disabled={isLoading}
								>
									{madeByOptions.map((option) => (
										<MenuItem
											key={option.id}
											value={option.value}
										>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label='Loại'
									select
									size='small'
									fullWidth
									required
									value={form.type.value}
									error={
										form.type.error != '' &&
										isClickSubmitForm
									}
									helperText={form.type.error}
									onChange={(event) =>
										handleChangeForm('type', event)
									}
									disabled={isLoading}
								>
									{typeOptions.map((option) => (
										<MenuItem
											key={option.id}
											value={option.value}
										>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label='Giá'
									size='small'
									type='number'
									fullWidth
									required
									value={form.price.value}
									error={
										form.price.error != '' &&
										isClickSubmitForm
									}
									helperText={form.price.error}
									onChange={(event) =>
										handleChangeForm('price', event)
									}
									disabled={isLoading}
								/>
							</Grid>
						</Grid>
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.actions}>
					<Button
						onClick={() => closeForm()}
						variant='outlined'
						disabled={isLoading}
					>
						Hủy
					</Button>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='outlined'
						disabled={isLoading}
					>
						{formAction == 'CREATE' ? 'Tạo' : 'Cập nhật'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		isShowForm: state.product.isShowForm,
		formAction: state.product.formAction,
		idProductEdit: state.product.idProductEdit,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({ closeForm }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
