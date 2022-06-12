import { useState } from 'react'
import CopyClipboardButton from './CopyClipboardButton'

type Props = {
    mdText: string
}

const MarkdownTextContainer = ({ mdText }: Props) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
        <div
            style={{
                width: '50%',
                border: '1px solid #d0cccc',
                padding: '20px',
                paddingTop: 0,
                margin: '10px',
                overflowX: 'auto',
            }}
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <div
                    style={{
                        marginLeft: 637.5,
                        marginTop: 6,
                        border: '1px solid #d0cccc',
                        minWidth: 35,
                        padding: 0,
                        borderRadius: 5,
                    }}
                >
                    <CopyClipboardButton />
                </div>
            )}
            <pre style={{}}>{mdText}</pre>
        </div>
    )
}

export default MarkdownTextContainer
