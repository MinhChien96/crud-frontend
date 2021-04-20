import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '8px',
        margin: 'auto',
    },
    button: {
        padding: '8px 16px',
    },
});

const FilterComponent = (props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={2}
            justify='flex-end'
            alignItems='center'
            className={classes.root}
        >
            <Grid item xs={2}>
                <TextField label='Tên' variant='outlined' size='small' />
            </Grid>
            <Grid item xs={2}>
                <TextField label='Loại' variant='outlined' size='small' />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label='Giá min'
                    variant='outlined'
                    size='small'
                    type='number'
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label='Giá max'
                    variant='outlined'
                    size='small'
                    type='number'
                />
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant='contained'
                    color='secondary'
                    fullWidth
                    className={classes.button}
                >
                    Xem
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant='contained'
                    fullWidth
                    className={classes.button}
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterComponent;
