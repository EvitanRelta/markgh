import { Box, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../.././converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../.././converterFunctions/helpers/removeTipTapArtifacts'
import { Snapshot } from '../../store/helpers/initDatabase'
import { useAppSelector } from '../../store/hooks'
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
    const editor = useAppSelector((state) => state.data.editor)
    const fileTitle = useAppSelector((state) => state.data.fileTitle)
    const db = useAppSelector((state) => state.data.database)
    const lastEditedOn = useAppSelector((state) => state.data.lastEditedOn)
    const [snapshotArray, setSnapshotArray] = useState<Array<Snapshot>>([])
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const updateSnapshotsFromDb = async () => {
        let allSnapshots = await db.snapshots.toArray()
        setSnapshotArray(allSnapshots)
    }

    const saveSnapshot = () => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)
        let snapshot = {
            id: !snapshotArray.length ? 0 : snapshotArray[snapshotArray.length - 1].id! + 1,
            title: fileTitle,
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
                <TitleInput />
                <UserMenuContainer />
            </StyledTopRow>
            <StyledBottomRow>
                <ToolbarContainer openVersions={openVersions} />
                <LastEdited saveSnapshot={saveSnapshot} openVersions={openVersions} />
            </StyledBottomRow>
            <VersionIndex
                anchorEl={showVersions}
                onClose={closeVersions}
                snapshotArray={snapshotArray}
                saveSnapshot={saveSnapshot}
                closeVersions={closeVersions}
                deleteSnapshot={deleteSnapshot}
            />
        </StyledHeaderBox>
    )
}
