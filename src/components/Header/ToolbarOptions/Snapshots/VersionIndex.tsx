import { Article as ArticleIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    List,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    styled,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Snapshot } from '../../../../store/helpers/initDatabase'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
    clearAllSnapshots,
    deleteSnapshot,
    loadSnapshot,
    saveSnapshot,
} from '../../../../store/snapshotThunks'

interface Props {
    anchorEl: (EventTarget & Element) | null
    onClose: () => void
    closeVersions: () => void
}

const SnapshotMenuContainer = styled(Menu)({
    position: 'absolute',
    top: -8,
    left: -235,
})

const StyledTitleText = styled(Typography)({
    paddingLeft: 20,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 17,
})

const StyledTitleContainer = styled(Box)({
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    borderBottom: '2px solid gray',
})

const StyledClearAllButton = styled(Button)({
    paddingTop: 0.3,
    paddingBottom: 0.3,
    marginTop: 20,
    marginRight: 6,
    minWidth: 94.33,
})

const StyledSnapshotList = styled(List)({
    minWidth: 400,
})

const StyledSnapshotIndexContainer = styled(Box)({
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
})

const StyledSnapshotTextContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 320,
    maxWidth: 320,
    overflow: 'hidden',
})

const StyledTrashIconButton = styled(IconButton)({
    display: 'inline',
})

export const VersionIndex = ({ anchorEl, onClose, closeVersions }: Props) => {
    const dispatch = useAppDispatch()
    const snapshots = useAppSelector((state) => state.data.snapshots)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
    const [showDialog, setShowDialog] = useState(false)
    const [workingSnapshot, setWorkingSnapshot] = useState<Snapshot>()
    const [showConfirmClear, setShowConfirmClear] = useState(false)

    const fontSize = showConfirmClear ? 10 : 11.5

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height,
        }
    }

    const handleLoadSnapshot = (snapshot: Snapshot) => {
        dispatch(loadSnapshot(snapshot))
        closeVersions()
    }

    const handleClearAll = () => {
        if (!showConfirmClear) {
            setShowConfirmClear(true)
            setTimeout(() => setShowConfirmClear(false), 3500)
            return
        }
        dispatch(clearAllSnapshots())
        setShowConfirmClear(false)
    }

    const handleCloseVersions = () => {
        setShowConfirmClear(false)
        closeVersions()
    }

    const closeDialog = () => {
        setShowDialog(false)
    }

    const dialogDiscard = () => {
        dispatch(loadSnapshot(workingSnapshot!))
        setWorkingSnapshot(undefined)
        closeDialog()
        closeVersions()
    }
    const dialogSnapshot = () => {
        dispatch(saveSnapshot())
        dispatch(loadSnapshot(workingSnapshot!))
        setWorkingSnapshot(undefined)
        closeDialog()
        closeVersions()
    }

    const discardChangesPrompt = (
        <Dialog open={showDialog} onClose={closeDialog}>
            <Box sx={{ mr: 2, ml: 2 }}>
                <DialogTitle sx={{ textAlign: 'center' }}>Discard Current Changes?</DialogTitle>
                <DialogActions>
                    <Box sx={{ alignContent: 'right', alignItems: 'right', textAlign: 'right' }}>
                        <Button onClick={dialogSnapshot} autoFocus>
                            No, take a snapshot
                        </Button>
                        <Button onClick={dialogDiscard}>Discard</Button>
                        <br />
                        <Button onClick={closeDialog} sx={{ mr: 0.5 }}>
                            Cancel
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    )

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const snapshotArrayMapper = (snapshot: Snapshot) => {
        const defaultTitleStyle = { overflow: 'hidden', textOverflow: 'ellipsis' }
        const titleStyle = snapshot.fileTitle
            ? defaultTitleStyle
            : { ...defaultTitleStyle, opacity: 0.5, fontStyle: 'italic' }

        return (
            <MenuItem key={snapshot.id!}>
                <StyledSnapshotIndexContainer>
                    <StyledSnapshotTextContainer onClick={() => handleLoadSnapshot(snapshot)}>
                        <ListItemAvatar>
                            <Avatar>
                                <ArticleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primaryTypographyProps={{ sx: titleStyle }}
                            primary={snapshot.fileTitle || 'Untitled Document'}
                            secondary={'Snapshot on ' + snapshot.lastEditedOn}
                        />
                    </StyledSnapshotTextContainer>
                    <StyledTrashIconButton
                        onClick={() => dispatch(deleteSnapshot(snapshot.id!))}
                        key={snapshot.id!}
                    >
                        <DeleteIcon />
                    </StyledTrashIconButton>
                </StyledSnapshotIndexContainer>
            </MenuItem>
        )
    }
    return (
        <>
            {showDialog && discardChangesPrompt}
            <SnapshotMenuContainer
                open={Boolean(anchorEl)}
                onClose={handleCloseVersions}
                anchorEl={document.getElementById('last-edited')}
            >
                <StyledTitleContainer>
                    <StyledTitleText variant='h4'>Snapshots</StyledTitleText>
                    <StyledClearAllButton
                        sx={{ fontSize: fontSize }}
                        variant='outlined'
                        color={showConfirmClear ? 'error' : undefined}
                        onClick={handleClearAll}
                    >
                        {showConfirmClear ? 'Click to confirm' : 'Clear all'}
                    </StyledClearAllButton>
                </StyledTitleContainer>
                <StyledSnapshotList sx={{ minHeight: windowDimensions.height }} dense>
                    {snapshots.map(snapshotArrayMapper)}
                </StyledSnapshotList>
            </SnapshotMenuContainer>
        </>
    )
}
