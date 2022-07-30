import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { EditorToolbar } from '../Editor/EditorToolbar'
import { AboutPopup } from './AboutPopup'
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
    const theme = useAppSelector((state) => state.theme)
    const headerBackgroundColor = theme === 'light' ? '#ffffff' : '#121212'
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    return (
        <StyledHeaderBox sx={{ backgroundColor: headerBackgroundColor }}>
            <StyledTopRow>
                <Box sx={{ marginLeft: 1.5, fontSize: 20, fontWeight: 'Bold' }}>
                    <AboutPopup theme={theme} />

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
