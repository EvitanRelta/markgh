import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { EditorToolbar } from '../Editor/EditorToolbar'
import { TitleInput } from './TitleInput'
import { LastEdited } from './ToolbarOptions/Snapshots/LastEdited'
import { VersionIndex } from './ToolbarOptions/Snapshots/VersionIndex'
import { ToolbarContainer } from './ToolbarOptions/ToolbarContainer'
import { UserMenuContainer } from './UserMenu/UserMenuContainer'

const StyledHeaderBox = styled(Box)({
    marginBottom: '0px',
    padding: '10px',
    paddingBottom: '0px',
    lineHeight: '12px',
    position: 'fixed',
    minWidth: '100%',
    zIndex: 2,
})

const StyledTopRow = styled(Box)({
    justifyContent: 'space-between',
    display: 'flex',
})

const StyledBottomRow = styled(Box)({
    display: 'inline-flex',
    paddingTop: 5,
    paddingBottom: 5,
})

export const Header = () => {
    const editor = useAppSelector((state) => state.data.editor)
    const theme = useAppSelector((state) => state.theme)
    const headerBackgroundColor = theme === 'light' ? '#ffffff' : '#121212'
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    //dynamic 'require' is not supported on react
    const logoSrc =
        theme === 'light'
            ? require('../../assets/logo.png')
            : require('../../assets/negative_logo.png')

    return (
        <StyledHeaderBox sx={{ backgroundColor: headerBackgroundColor }}>
            <StyledTopRow>
                <Box sx={{ marginLeft: 1.5, fontSize: 20, fontWeight: 'Bold' }}>
                    <img style={{ width: 32.5, top: 8.5, position: 'relative' }} src={logoSrc} />

                    <TitleInput />
                </Box>
                <UserMenuContainer />
            </StyledTopRow>
            <StyledBottomRow>
                <ToolbarContainer openVersions={openVersions} />
                <LastEdited openVersions={openVersions} />
            </StyledBottomRow>
            <EditorToolbar />
            <VersionIndex
                anchorEl={showVersions}
                onClose={closeVersions}
                closeVersions={closeVersions}
            />
        </StyledHeaderBox>
    )
}
