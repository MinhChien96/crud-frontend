export default {
    root: {
        '& .MuiFormLabel-root': {
            opacity: `0.5`,
        },
        '& .Mui-error': {
            opacity: 1,
        },
        '& .MuiFormLabel-root.Mui-focused:not(.Mui-error)': {
            color: '#212121',
        },
        '& .MuiInput-underline:not(.Mui-error):after': {
            borderBottomColor: '#212121',
        },
        '& .MuiInput-underline:hover:not(.Mui-disable):before': {
            borderBottomColor: '#212121',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#212121',
            },
            '&:hover fieldset': {
                borderColor: '#212121',
            },
        },
        '& .MuiFormHelperText-root': {
            textAlign: 'right',
            marginRight: 0,
        },
    },
};
