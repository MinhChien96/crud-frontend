import React, { useState, useRef, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'Components/MaterialTable';
import { IconButton, Tooltip } from '@material-ui/core';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import FilterComponent from './Filter';
import HeaderComponent from './Header';
import PopupConfirm from './PopupConfirm';
import {
	fetchProduct,
	reset,
	changePaging,
	deleteProduct,
	showForm,
} from '../ProductSlice';

import { unwrapResult } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme) => ({
	tableRoot: {
		fontSize: '14px',
		'& .MuiTableRow-root': {
			cursor: 'pointer',
		},
		'& .MuiTableBody-root tr.MuiTableRow-root:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.04)',
		},
		'& .MuiTypography-root.MuiTypography-caption': {
			fontSize: '0.875rem',
		},
		'& [data-rbd-drag-handle-context-id]': {
			display: 'flex !important',
			alignItems: 'center !important',
		},
	},
	actionButton: {
		padding: '4px 8px',
		borderRadius: 'unset',
	},
}));

const Action = ({ rowData, onClickDelete, onClickEdit }) => {
	const classes = useStyles();

	return (
		<>
			<Tooltip title='Sửa'>
				<IconButton
					aria-label='edit'
					size='small'
					className={classes.actionButton}
					onClick={() => onClickEdit(rowData.id)}
				>
					<EditOutlined fontSize='small' />
				</IconButton>
			</Tooltip>
			<Tooltip title='Xóa'>
				<IconButton
					aria-label='delete'
					size='small'
					className={classes.actionButton}
					onClick={() => onClickDelete(rowData.id)}
				>
					<DeleteOutline fontSize='small' />
				</IconButton>
			</Tooltip>
		</>
	);
};

const ListProductContainer = ({
	listProduct,
	fetchProduct: actionFetchProduct,
	loading,
	reset,
	paging,
	totalCount,
	changePaging,
	deleteProduct,
	refreshData,
	showForm,
}) => {
	// const [groupCol, setGroupCol] = useState([]);
	const [searching, setSearching] = useState({
		name: '',
		type: '',
		minPrice: '',
		maxPrice: '',
		group: '',
	});
	const [isShowPopup, setIsShowPopup] = useState(false);
	const [productSelect, setProductSelect] = useState(null);

	const list = useMemo(() => {
		return listProduct.map((product) => ({ ...product }));
	}, [listProduct]);

	const tableRef = useRef();

	const fetchProduct = async (isResetSearch = false) => {
		try {
			let paramSearch = {};
			if (!isResetSearch) paramSearch = convertParamsSearch(searching);
			const allParams = {
				...paramSearch,
				_page: paging.page + 1,
				_limit: paging.pageSize,
			};
			const resultAction = await actionFetchProduct(allParams);
			unwrapResult(resultAction);
		} catch (error) {}
	};

	const handleChangePage = (pageChange) => {
		const { pageSize, page } = paging;
		if (pageChange != page) {
			// getGroupCol();
			changePaging({ page: pageChange, pageSize });
		}
	};

	const handleChangePageSize = (pageSizeChange) => {
		const { pageSize, page } = paging;
		if (pageSizeChange != pageSize) {
			// getGroupCol();
			changePaging({ page, pageSize: pageSizeChange });
		}
	};

	// const getGroupCol = () => {
	// 	if (tableRef.current) {
	// 		const listCol = tableRef.current.state.columns.filter(
	// 			(col) =>
	// 				col.tableData.groupOrder != undefined &&
	// 				col.tableData.groupOrder >= 0
	// 		);
	// 		setGroupCol(listCol);
	// 	}
	// };

	const checkColInGroupCol = (field) => {
		return searching.group.indexOf(field);
	};

	const handleChangeSearching = (field, value) => {
		const newSearching = { ...searching };
		newSearching[field] = value;
		setSearching(newSearching);
		// getGroupCol();
	};

	const handleResetSearching = () => {
		setSearching({
			name: '',
			type: '',
			minPrice: '',
			maxPrice: '',
			group: '',
		});
		// setGroupCol([]);
		fetchProduct(true);
	};

	const convertParamsSearch = (searching) => {
		const params = {};
		Object.keys(searching).map(function (key) {
			if (searching[key] !== '') {
				if (key == 'minPrice') {
					params[`price_gte`] = searching[key];
					return;
				}
				if (key == 'maxPrice') {
					params[`price_lte`] = searching[key];
					return;
				}
				params[`${key}_like`] = searching[key];
			}
		});
		return params;
	};

	const handleSearching = () => {
		fetchProduct();
		// getGroupCol();
	};

	const handleClickDelete = (id) => {
		setProductSelect(id);
		setIsShowPopup(true);
	};

	const handleClosePopup = () => {
		setIsShowPopup(false);
		setProductSelect(null);
	};

	const handleOkPopup = async () => {
		setIsShowPopup(false);
		try {
			const response = await deleteProduct(productSelect);
			unwrapResult(response);
		} catch (error) {
			console.log(error);
		} finally {
			fetchProduct();
			setProductSelect(null);
		}
	};

	const handleClickEdit = (id) => {
		showForm({
			action: 'EDIT',
			id,
		});
	};

	useEffect(() => {
		fetchProduct();
	}, [paging]);

	useEffect(() => {
		if (refreshData) fetchProduct();
	}, [refreshData]);

	useEffect(() => {
		if (tableRef.current) tableRef.current.onQueryChange();
	}, [list]);

	useEffect(() => {
		return () => {
			reset();
		};
	}, []);

	const classes = useStyles();

	return (
		<div>
			<HeaderComponent />
			<div className={classes.tableRoot}>
				<FilterComponent
					onClickReset={handleResetSearching}
					onClickSearch={handleSearching}
					onChangeSearching={handleChangeSearching}
					searching={searching}
				/>
				<MaterialTable
					tableRef={tableRef}
					title=''
					columns={[
						{
							title: 'ID',
							field: 'id',
							removable: false,
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
						},
						{
							title: 'Tên',
							field: 'name',
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
						},
						{
							title: 'Xuất xứ',
							field: 'madeBy',
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
							defaultGroupOrder: checkColInGroupCol('madeBy'),
						},
						{
							title: 'Loại',
							field: 'type',
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
							defaultGroupOrder: checkColInGroupCol('type'),
						},
						{
							title: 'Giá',
							field: 'price',
							align: 'right',
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
						},
						{
							title: '',
							align: 'right',
							render: (rowData) => (
								<Action
									rowData={rowData}
									onClickDelete={handleClickDelete}
									onClickEdit={handleClickEdit}
								/>
							),
							cellStyle: {
								borderBottom: '1px solid #a3a3a345',
							},
						},
					]}
					data={() => {
						return Promise.resolve({
							data: list,
							page: paging.page,
							totalCount: parseInt(totalCount),
						});
					}}
					options={{
						sorting: false,
						draggable: false,
						grouping: false,
						search: false,
						toolbar: false,
						headerStyle: {
							fontWeight: 'bold',
							color: '#263238',
							borderBottom: '1px solid #a3a3a345',
						},
						emptyRowsWhenPaging: false,
						pageSize: paging.pageSize,
						initialPage: paging.page,
					}}
					isLoading={loading}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangePageSize}
					// onGroupRemoved={() => getGroupCol()}
					// onColumnDragged={() => getGroupCol()}
				/>
			</div>
			<PopupConfirm
				open={isShowPopup}
				handleClose={handleClosePopup}
				handleOK={handleOkPopup}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		listProduct: state.product.list,
		loading: state.product.loadingTable,
		paging: state.product.paging,
		totalCount: state.product.totalCount,
		refreshData: state.product.refreshData,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(
			{ fetchProduct, reset, changePaging, deleteProduct, showForm },
			dispatch
		),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListProductContainer);
