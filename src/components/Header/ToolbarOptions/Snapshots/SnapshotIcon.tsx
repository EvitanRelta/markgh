import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../../../.././converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../../../.././converterFunctions/helpers/removeTipTapArtifacts'
import { EditorDB } from '../../.././IndexedDB/initDB'
import { Snapshot } from '../../Header'
import { useAppSelector } from './../../../../store/hooks'

type Props = {
    db: EditorDB
    snapshotArray: Snapshot[]
    updateSnapshots: () => Promise<void>
}
const SnapshotIcon = ({ db, snapshotArray, updateSnapshots }: Props) => {
    const [saved, setSaved] = useState<boolean>(false)
    const editor = useAppSelector((state) => state.editor.editor)

    const onSnapshot = () => {
        //Disable clicking for icon for 1.5s, to prevent double click = double save
        if (!saved) {
            setSaved(true)
            saveSnapshot()
            setTimeout(() => setSaved(false), 1500)
        }
    }

    const saveSnapshot = () => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)
        let snapshot = {
            id: !snapshotArray.length ? 0 : snapshotArray[snapshotArray.length - 1].id! + 1,
            value: htmlCopy.innerHTML,
        }
        db.snapshots.add(snapshot).then(() => updateSnapshots())
    }

    return (
        <IconButton
            sx={{
                padding: 0,
                marginLeft: 1,
                marginTop: -0.15,
                display: 'inline-flex',
            }}
            onClick={onSnapshot}
        >
            {!saved ? (
                <CameraAltIcon sx={{ fontSize: 17 }} />
            ) : (
                <CheckIcon sx={{ fontSize: 17, marginTop: 0 }} />
            )}
        </IconButton>
    )
}

export default SnapshotIcon
