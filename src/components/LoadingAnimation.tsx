import { Backdrop, CircularProgress } from '@mui/material'
import { useAppSelector } from '../store/hooks'

export const LoadingAnimation = () => {
    const isEditorLoading = useAppSelector((state) => state.data.isEditorLoading)
    const hasUserInit = useAppSelector((state) => state.auth.hasUserInit)

    const isLoading = isEditorLoading || !hasUserInit

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
            <CircularProgress disableShrink size={120} color='inherit' />
        </Backdrop>
    )
}
