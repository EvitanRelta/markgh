import { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { lowlight } from 'lowlight/lib/all'
import { useState } from 'react'

interface Options extends CodeBlockLowlightOptions {
    lowlight: typeof lowlight
}

interface Props {
    node: {
        attrs: { language: string | null | undefined }
    }
    updateAttributes: (attributes: Record<string, any>) => any
    extension: { options: Options }
}

export default ({
    node: {
        attrs: { language },
    },
    updateAttributes,
    extension,
}: Props) => {
    const lowlight = extension.options.lowlight
    const [inputValue, setInputValue] = useState<string>(language || '')
    const [isValidLanguage, setIsValidLanguage] = useState<boolean>(
        language ? lowlight.registered(language) : false
    )

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value
        setInputValue(value)
        if (!lowlight.registered(value)) {
            updateAttributes({ language: 'plaintext' })
            return setIsValidLanguage(false)
        }
        updateAttributes({ language: value })
        setIsValidLanguage(true)
    }
    const inputStyle: React.CSSProperties = {
        ...(inputValue !== '' && !isValidLanguage ? { color: 'red' } : {}),
        position: 'absolute',
        right: '0.5rem',
        top: '0.5rem',
        width: '120px',
    }

    return (
        <NodeViewWrapper
            style={{
                position: 'relative',
            }}
        >
            <input
                contentEditable={false}
                style={inputStyle}
                type='text'
                value={inputValue}
                onChange={handleOnChange}
            />
            <pre>
                <NodeViewContent as='code' className={`language-${language}`} />
            </pre>
        </NodeViewWrapper>
    )
}
