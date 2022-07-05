import { Backdrop, CircularProgress } from '@mui/material'
import { useAppSelector } from '../store/hooks'

export const LoadingAnimation = () => {
    const isEditorLoading = useAppSelector((state) => state.data.isEditorLoading)

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isEditorLoading}>
            <CircularProgress disableShrink size={120} color='inherit' />
        </Backdrop>
    )
}
