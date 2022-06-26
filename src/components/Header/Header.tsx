import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { EditorDB } from '.././IndexedDB/initDB'
import MenuButton from './MenuButton'
import LastEdited from './ToolbarOptions/Snapshots/LastEdited'
import ToolbarContainer from './ToolbarOptions/ToolbarContainer'

export interface Snapshot {
    id?: number
    value: string
}

type Props = {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    lastEditedOn: string
    db: EditorDB
}

export const Header = ({ title, setTitle, lastEditedOn, db }: Props) => {
    const theme = useAppSelector((state) => state.theme)
    const [snapshotArray, setSnapshotArray] = useState<Array<Snapshot>>([])

    //var for current file name
    const [text, setText] = useState(title)

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

    const updateSnapshotsFromDb = async () => {
        let allSnapshots = await db.snapshots.toArray()
        setSnapshotArray(allSnapshots)
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
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
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
                <ToolbarContainer title={title} db={db} />
                <Box>
                    <LastEdited
                        lastEditedOn={lastEditedOn}
                        db={db}
                        snapshotArray={snapshotArray}
                        updateSnapshots={updateSnapshotsFromDb}
                    />
                </Box>
            </Box>
        </Box>
    )
}
