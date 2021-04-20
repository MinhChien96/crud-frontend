export default {
    root: {
        '& label.Mui-focused:not(.Mui-error)': {
            color: '#212121',
        },
        '& .MuiInput-underline:not(.Mui-error):after': {
            borderBottomColor: '#212121',
        },
        '& .MuiInput-underline:hover:not(.Mui-error):after': {
            borderBottomColor: '#212121',
        },
        '& .MuiTextField-root ::after :hover': {
            borderBottomColor: '#212121',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused:not(.Mui-error) fieldset': {
                borderColor: '#212121',
            },
            '&.Mui-focused.Mui-error fieldset': {
                borderColor: '#e53935',
            },
        },
    },
};
