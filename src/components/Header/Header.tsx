import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { TitleInput } from './TitleInput'
import { LastEdited } from './ToolbarOptions/Snapshots/LastEdited'
import { VersionIndex } from './ToolbarOptions/Snapshots/VersionIndex'
import { ToolbarContainer } from './ToolbarOptions/ToolbarContainer'
import { UserMenuContainer } from './UserMenu/UserMenuContainer'

const StyledHeaderBox = styled(Box)({
    borderBottom: '1px solid gray',
    marginBottom: '0px',
    padding: '10px',
    paddingBottom: '0px',
    lineHeight: '12px',
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
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    return (
        <StyledHeaderBox>
            <StyledTopRow>
                <TitleInput />
                <UserMenuContainer />
            </StyledTopRow>
            <StyledBottomRow>
                <ToolbarContainer openVersions={openVersions} />
                <LastEdited openVersions={openVersions} />
            </StyledBottomRow>
            <VersionIndex
                anchorEl={showVersions}
                onClose={closeVersions}
                closeVersions={closeVersions}
            />
        </StyledHeaderBox>
    )
}
