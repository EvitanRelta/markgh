import { Popover } from '@mui/material'
import { useState } from 'react'

interface Props {
    theme: string
}

export const AboutPopup = ({ theme }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    //dynamic 'require' is not supported on react
    const logoSrc =
        theme === 'light'
            ? require('../../assets/logo.png')
            : require('../../assets/negative_logo.png')

    return (
        <>
            <img
                style={{ width: 32.5, top: 8.5, position: 'relative' }}
                src={logoSrc}
                onClick={(e) => setAnchor(e.currentTarget)}
            />
            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
            ></Popover>
        </>
    )
}
