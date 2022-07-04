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
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    lastEditedOn: string
    db: EditorDB
}

export const Header = ({ title, setTitle, lastEditedOn, db }: Props) => {
    const theme = useAppSelector((state) => state.theme)
    const editor = useAppSelector((state) => state.editor.editor)
    const [snapshotArray, setSnapshotArray] = useState<Array<Snapshot>>([])
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

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
            title: title || 'Untitled Document',
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
                <TitleInput title={title} setTitle={setTitle} />
                <UserMenuContainer />
            </StyledTopRow>
            <StyledBottomRow>
                <ToolbarContainer title={title} openVersions={openVersions} />
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
                setTitle={setTitle}
                saveSnapshot={saveSnapshot}
                closeVersions={closeVersions}
                deleteSnapshot={deleteSnapshot}
            />
        </StyledHeaderBox>
    )
}
