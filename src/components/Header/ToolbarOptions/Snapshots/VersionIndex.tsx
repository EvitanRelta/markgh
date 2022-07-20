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
    fontSize: 11.5,
    paddingTop: 0.3,
    paddingBottom: 0.3,
    marginTop: 20,
    marginRight: 6,
})

const StyledSnapshotList = styled(List)({
    minWidth: 400,
})

export const VersionIndex = ({ anchorEl, onClose, closeVersions }: Props) => {
    const dispatch = useAppDispatch()
    const snapshots = useAppSelector((state) => state.data.snapshots)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
    const [showDialog, setShowDialog] = useState(false)
    const [workingSnapshot, setWorkingSnapshot] = useState<Snapshot>()

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
        const titleStyle = snapshot.fileTitle ? undefined : { opacity: 0.5, fontStyle: 'italic' }

        return (
            <MenuItem key={snapshot.id!}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 12 }}
                    onClick={() => handleLoadSnapshot(snapshot)}
                >
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
                </Box>
                <IconButton
                    sx={{ display: 'inline' }}
                    onClick={() => dispatch(deleteSnapshot(snapshot.id!))}
                    key={snapshot.id!}
                >
                    <DeleteIcon />
                </IconButton>
            </MenuItem>
        )
    }

    return (
        <>
            {showDialog && discardChangesPrompt}
            <SnapshotMenuContainer
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorEl={document.getElementById('last-edited')}
            >
                <StyledTitleContainer>
                    <StyledTitleText variant='h4'>Snapshots</StyledTitleText>
                    <StyledClearAllButton
                        variant='outlined'
                        onClick={() => dispatch(clearAllSnapshots())}
                    >
                        Clear all
                    </StyledClearAllButton>
                </StyledTitleContainer>
                <StyledSnapshotList sx={{ minHeight: windowDimensions.height }} dense>
                    {snapshots.map(snapshotArrayMapper)}
                </StyledSnapshotList>
            </SnapshotMenuContainer>
        </>
    )
}
