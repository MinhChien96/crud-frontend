import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopupConfirm = ({ open, handleClose, handleOK }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id='alert-dialog-title'>Xác nhận</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Bạn có chắc chắn muốn xóa sản phẩm này
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='secondary' autoFocus>
                    Hủy bỏ
                </Button>
                <Button onClick={handleOK} color='primary'>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default PopupConfirm;
