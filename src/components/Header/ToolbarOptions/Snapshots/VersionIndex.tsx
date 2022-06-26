import ArticleIcon from '@mui/icons-material/Article'
import {
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { Snapshot } from '../../../IndexedDB/initDB'

type Props = {
    anchorEl: (EventTarget & Element) | null
    onClose: () => void
    snapshotArray: Snapshot[]
    setDocumentName: React.Dispatch<React.SetStateAction<string>>
}

const VersionIndex = ({ anchorEl, onClose, snapshotArray, setDocumentName }: Props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
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

    const loadSnapshot = (snapshot: Snapshot) => {
        setDocumentName(snapshot.title)
        editor.commands.clearContent(false)
        editor.commands.setContent(snapshot.value, true)
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const snapshotArrayMapper = (snapshot: Snapshot, index: number) => {
        return (
            <MenuItem key={snapshot.id} onClick={() => loadSnapshot(snapshot)}>
                <ListItemAvatar>
                    <Avatar>
                        <ArticleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={snapshot.title}
                    secondary={'Snapshot on ' + snapshot.savedOn}
                />
            </MenuItem>
        )
    }

    return (
        <Menu
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorEl={anchorEl}
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
    )
}

export default VersionIndex
