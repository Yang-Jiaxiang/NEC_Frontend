import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: theme.palette.background.default,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        // boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        // border: `.5px solid ${theme.palette.border.main}`,
        // padding: '.5rem',

        // height: '100%',
    },
    accordion: {
        backgroundColor: theme.palette.background.default,
        width: '90%', // 設定寬度為auto
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    status: {
        // backgroundColor: theme.palette.status.yet,
        padding: '.5rem',
        // marginLeft: '.8rem',
        borderRadius: '1rem',

        fontSize: '1rem',
        fontWeight: 'bold',

        '&.yet': {
            backgroundColor: theme.palette.status.yet,
            border: `1px solid ${theme.palette.status.yet_dark}`,
            color: theme.palette.status.yet_dark,
        },
        '&.examination': {
            backgroundColor: theme.palette.status.processing,
            border: `1px solid ${theme.palette.status.processing_dark}`,
            color: theme.palette.status.processing_dark,
        },
        '&.finish': {
            backgroundColor: theme.palette.status.finish,
            border: `1px solid ${theme.palette.status.finish_dark}`,
            color: theme.palette.status.finish_dark,
        },
        '&.call': {
            backgroundColor: theme.palette.status.call,
            border: `1px solid ${theme.palette.status.call_dark}`,
            color: theme.palette.status.call_dark,
        },
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
    radioGroup: {
        position: 'absolute',
        left: 20,
        top: 30,
    },
}))

export default useStyles
