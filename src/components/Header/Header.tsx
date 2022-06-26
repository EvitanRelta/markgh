import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { useEffect, useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../.././converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../.././converterFunctions/helpers/removeTipTapArtifacts'
import { useAppSelector } from '../../store/hooks'
import { EditorDB, Snapshot } from '.././IndexedDB/initDB'
import MenuButton from './MenuButton'
import LastEdited from './ToolbarOptions/Snapshots/LastEdited'
import VersionIndex from './ToolbarOptions/Snapshots/VersionIndex'
import ToolbarContainer from './ToolbarOptions/ToolbarContainer'

type Props = {
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

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

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

    return (
        <Box
            style={{
                borderBottom: '1px solid gray',
                marginBottom: '0px',
                padding: '10px',
                paddingBottom: '0px',
                lineHeight: '12px',
            }}
        >
            <Box
                style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                }}
            >
                <Input
                    sx={{
                        '&:before': {
                            borderBottom: '0px',
                            transform: 'scaleX(0)',
                            transition: 'transform 150ms ease-in-out',
                        },
                        '&:hover': {
                            '&&:before': {
                                transform: 'scaleX(1)',
                                borderBottom: '2px solid gray',
                            },
                        },
                    }}
                    type='text'
                    placeholder='Untitled Document'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    style={{
                        border: '0px',
                        fontSize: '25px',
                        width: '30%',
                        backgroundColor: themeColor,
                        color: textColor,
                        marginLeft: 12,
                    }}
                />

                <Box>
                    <MenuButton title={title} />
                </Box>
            </Box>
            <Box
                style={{
                    display: 'inline-flex',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <ToolbarContainer title={title} db={db} openVersions={openVersions} />
                <Box>
                    <LastEdited
                        lastEditedOn={lastEditedOn}
                        saveSnapshot={saveSnapshot}
                        openVersions={openVersions}
                    />
                </Box>
            </Box>
            <VersionIndex
                anchorEl={showVersions}
                onClose={closeVersions}
                snapshotArray={snapshotArray}
                setTitle={setTitle}
                saveSnapshot={saveSnapshot}
                closeVersions={closeVersions}
            />
        </Box>
    )
}
