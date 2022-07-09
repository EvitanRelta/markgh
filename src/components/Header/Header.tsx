import { Box, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../.././converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../.././converterFunctions/helpers/removeTipTapArtifacts'
import { useAppSelector } from '../../store/hooks'
import { EditorDB, Snapshot } from '.././IndexedDB/initDB'
import { TitleInput } from './TitleInput'
import { LastEdited } from './ToolbarOptions/Snapshots/LastEdited'
import { VersionIndex } from './ToolbarOptions/Snapshots/VersionIndex'
import { ToolbarContainer } from './ToolbarOptions/ToolbarContainer'
import { UserMenuContainer } from './UserMenu/UserMenuContainer'

interface Props {
    fileTitle: string
    setFileTitle: React.Dispatch<React.SetStateAction<string>>
    lastEditedOn: string
    db: EditorDB
}

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

export const Header = ({ fileTitle, setFileTitle, lastEditedOn, db }: Props) => {
    const editor = useAppSelector((state) => state.editor.editor)
    const [snapshotArray, setSnapshotArray] = useState<Array<Snapshot>>([])
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const updateSnapshotsFromDb = async () => {
        try {
            let allSnapshots = await db.snapshots.toArray()
            setSnapshotArray(allSnapshots)
        } catch (e) {
            //if 'snapshots' field is not initialised in db, it will be undefined, and 'toArray' causes a TypeError'
            if (db.snapshots === undefined) {
                await db.delete()
                window.location.reload()
            }
        }
    }

    const saveSnapshot = () => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)
        let snapshot = {
            id: !snapshotArray.length ? 0 : snapshotArray[snapshotArray.length - 1].id! + 1,
            title: fileTitle || 'Untitled Document',
            savedOn: lastEditedOn,
            value: htmlCopy.innerHTML,
        }
        db.snapshots.add(snapshot).then(() => updateSnapshotsFromDb())
    }

    useEffect(() => {
        updateSnapshotsFromDb()
    }, [])

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    const deleteSnapshot = async (snapshot: Snapshot) => {
        db.snapshots.delete(snapshot.id!)
        updateSnapshotsFromDb()
    }

    return (
        <StyledHeaderBox>
            <StyledTopRow>
                <TitleInput fileTitle={fileTitle} setFileTitle={setFileTitle} />
                <UserMenuContainer />
            </StyledTopRow>
            <StyledBottomRow>
                <ToolbarContainer fileTitle={fileTitle} openVersions={openVersions} />
                <LastEdited
                    lastEditedOn={lastEditedOn}
                    saveSnapshot={saveSnapshot}
                    openVersions={openVersions}
                />
            </StyledBottomRow>
            <VersionIndex
                anchorEl={showVersions}
                onClose={closeVersions}
                snapshotArray={snapshotArray}
                setFileTitle={setFileTitle}
                saveSnapshot={saveSnapshot}
                closeVersions={closeVersions}
                deleteSnapshot={deleteSnapshot}
            />
        </StyledHeaderBox>
    )
}
