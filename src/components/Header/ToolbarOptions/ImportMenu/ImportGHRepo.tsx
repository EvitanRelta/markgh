import { ArrowForwardIos as ArrowForwardIosIcon, GitHub as GitHubIcon } from '@mui/icons-material'
import { ListItemText, MenuItem, Popover, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { RepoLinkInput } from './RepoLinkInput'

interface Props {
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
    menuOpen: boolean
}

const StyledMenuItem = styled(MenuItem)({
    paddingBottom: 13,
    paddingRight: 5,
    marginLeft: 3,
})

const StyledGitHubIcon = styled(GitHubIcon)({
    marginLeft: 0.5,
})

const StyledText = styled(ListItemText)({
    marginLeft: 10,
})

const StyledPopover = styled(Popover)({
    marginLeft: 30.5,
    marginTop: -8,
})

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)({
    fontSize: 'small',
    marginLeft: 15,
    marginRight: 10,
})

export const ImportGHRepo = ({ setAnchor, menuOpen }: Props) => {
    const [showPopover, setShowPopover] = useState<boolean>(false)

    const openPopover = (e: React.MouseEvent) => {
        setShowPopover(true)
    }

    const closePopover = () => {
        setShowPopover(false)
        setAnchor(null)
    }

    useEffect(() => {
        if (!menuOpen) {
            setShowPopover(false)
        }
    }, [menuOpen])

    return (
        <StyledMenuItem
            sx={{ paddingBottom: 1.3 }}
            onClick={openPopover}
            onKeyDown={(e: React.KeyboardEvent) => e.stopPropagation()}
        >
            <StyledGitHubIcon />
            <StyledText>Import from GitHub</StyledText>
            <StyledArrowForwardIosIcon
                sx={{ fontSize: 'small', marginLeft: 3 }}
                onMouseEnter={openPopover}
                id='popover'
            />
            <StyledPopover
                open={showPopover}
                onClose={closePopover}
                anchorEl={document.getElementById('popover')}
                disableRestoreFocus
            >
                <RepoLinkInput setAnchor={setAnchor} />
            </StyledPopover>
        </StyledMenuItem>
    )
}
