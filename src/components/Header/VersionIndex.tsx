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

type Props = {
    anchorEl: (EventTarget & Element) | null
    onClose: () => void
}
const VersionIndex = ({ anchorEl, onClose }: Props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

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

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Menu
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorEl={anchorEl}
            sx={{ position: 'absolute', top: -8, left: -74 }}
        >
            <Typography
                sx={{ pl: 2, mr: 1, ml: 1, mt: 2, borderBottom: '2px solid gray' }}
                variant='h4'
                component='div'
            >
                Version Index
            </Typography>
            <List sx={{ minWidth: 400, minHeight: windowDimensions.height }} dense>
                <MenuItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='File name' secondary='Snapshot on ...' />
                </MenuItem>
            </List>
        </Menu>
    )
}

export default VersionIndex
