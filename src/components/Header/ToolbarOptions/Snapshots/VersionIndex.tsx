import ArticleIcon from '@mui/icons-material/Article'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../../../../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../../../../converterFunctions/helpers/removeTipTapArtifacts'
import { useAppSelector } from '../../../../store/hooks'
import { Snapshot } from '../../../IndexedDB/initDB'

type Props = {
    anchorEl: (EventTarget & Element) | null
    onClose: () => void
    snapshotArray: Snapshot[]
    setTitle: React.Dispatch<React.SetStateAction<string>>
    saveSnapshot: () => void
    closeVersions: () => void
    deleteSnapshot: (snapshot: Snapshot) => Promise<void>
}

const VersionIndex = ({
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
                            {' '}
                            Cancel{' '}
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
            <Menu
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorEl={document.getElementById('last-edited')}
                sx={{ position: 'absolute', top: -8, left: -170 }}
            >
                <Typography
                    sx={{ pl: 2, mr: 1, ml: 1, mt: 2, borderBottom: '2px solid gray' }}
                    variant='h4'
                    component='div'
                >
                    Snapshots
                </Typography>
                <List sx={{ minWidth: 400, minHeight: windowDimensions.height }} dense>
                    {snapshotArray.map(snapshotArrayMapper)}
                </List>
            </Menu>
        </Box>
    )
}

export default VersionIndex
