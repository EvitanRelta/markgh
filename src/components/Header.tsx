import React, { useState } from 'react'
import MenuButton from './MenuButton'
import ToolbarContainer from './ToolbarContainer'

type Props = {
    title: string
    theme: string
    toggleTheme: React.MouseEventHandler<HTMLButtonElement>
    setTitle: React.Dispatch<React.SetStateAction<string>>
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    lastEditedOn: string
    mdText: string
}

const Header = ({
    title,
    theme,
    toggleTheme,
    setTitle,
    onUpload,
    lastEditedOn,
    mdText,
}: Props) => {
    //var for current file name
    const [text, setText] = useState(title)

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

    return (
        <header
            style={{
                borderBottom: '1px solid gray',
                marginBottom: '15px',
                padding: '10px',
                paddingBottom: '0px',
                lineHeight: '12px',
            }}
        >
            <div
                style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                }}
            >
                <input
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

                <div>
                    <MenuButton
                        theme={theme}
                        toggleTheme={toggleTheme}
                        title={title}
                        onUpload={onUpload}
                        mdText={mdText}
                    />
                </div>
            </div>
            <div
                style={{
                    display: 'inline-flex',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <ToolbarContainer onUpload={onUpload} />
                <div
                    style={{
                        color: 'gray',
                        paddingLeft: '5px',
                        marginTop: 7,
                        textDecoration: 'underline',
                    }}
                >
                    Last edited on {lastEditedOn}
                </div>
            </div>
        </header>
    )
}

export default Header
