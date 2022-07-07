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
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../../../../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../../../../converterFunctions/helpers/removeTipTapArtifacts'
import { useAppSelector } from '../../../../store/hooks'
import { Snapshot } from '../../../IndexedDB/initDB'

interface Props {
    anchorEl: (EventTarget & Element) | null
    onClose: () => void
    snapshotArray: Snapshot[]
    setTitle: React.Dispatch<React.SetStateAction<string>>
    saveSnapshot: () => void
    closeVersions: () => void
    deleteSnapshot: (snapshot: Snapshot) => Promise<void>
}

const SnapshotMenuContainer = styled(Menu)({
    position: 'absolute',
    top: -8,
    left: -170,
})

const StyledTitleText = styled(Typography)({
    paddingLeft: 20,
    marginLeft: 3,
    marginTop: 10,
    borderBottom: '2px solid gray',
})

const StyledSnapshotList = styled(List)({
    minWidth: 400,
})

export const VersionIndex = ({
    anchorEl,
    onClose,
    snapshotArray,
    setTitle,
    saveSnapshot,
    closeVersions,
    deleteSnapshot,
}: Props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
    const [showDialog, setShowDialog] = useState(false)
    const [workingSnapshot, setWorkingSnapshot] = useState<Snapshot>()
    const editor = useAppSelector((state) => state.editor.editor)

    var body = document.body,
        html = document.documentElement

    var height =
        Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        ) - 100

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height,
        }
    }

    const loadEditorContent = (snapshot: Snapshot) => {
        setTitle(snapshot.title)
        editor.commands.clearContent(false)
        editor.commands.setContent(snapshot.value, true, { preserveWhitespace: 'full' })
        closeVersions()
    }

    const closeDialog = () => {
        setShowDialog(false)
    }

    const dialogDiscard = () => {
        loadEditorContent(workingSnapshot as Snapshot)
        setWorkingSnapshot(undefined)
        closeDialog()
        closeVersions()
    }
    const dialogSnapshot = () => {
        saveSnapshot()
        loadEditorContent(workingSnapshot!)
        setWorkingSnapshot(undefined)
        closeDialog()
        closeVersions()
    }

    const loadSnapshot = (snapshot: Snapshot) => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)

        if (snapshot.value !== htmlCopy.innerHTML) {
            setWorkingSnapshot(snapshot)
            setShowDialog(true)
            return
        }

        loadEditorContent(snapshot)
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
        return (
            <MenuItem key={snapshot.id}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 12 }}
                    onClick={() => loadSnapshot(snapshot)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={snapshot.title}
                        secondary={'Snapshot on ' + snapshot.savedOn}
                    />
                </Box>
                <IconButton
                    sx={{ display: 'inline' }}
                    onClick={() => deleteSnapshot(snapshot)}
                    key={snapshot.id}
                >
                    <DeleteIcon />
                </IconButton>
            </MenuItem>
        )
    }

    return (
        <Box>
            {showDialog && discardChangesPrompt}
            <SnapshotMenuContainer
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorEl={document.getElementById('last-edited')}
            >
                <StyledTitleText variant='h4'>Snapshots</StyledTitleText>
                <StyledSnapshotList sx={{ minHeight: windowDimensions.height }} dense>
                    {snapshotArray.map(snapshotArrayMapper)}
                </StyledSnapshotList>
            </SnapshotMenuContainer>
        </Box>
    )
}
