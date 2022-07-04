import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Node } from '@tiptap/core'
import { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight'
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import _ from 'lodash'
import { lowlight } from 'lowlight/lib/all'
import { useCallback, useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'

interface OptionsFixLowLightType extends CodeBlockLowlightOptions {
    lowlight: typeof lowlight
}

interface Props extends NodeViewProps {
    extension: Node<OptionsFixLowLightType, any>
    node: NodeViewProps['node'] & {
        attrs: {
            language: string | null | undefined
        }
    }
}

const SyntaxLanguageTextField = styled(TextField)({
    '& label.MuiInputLabel-root.MuiInputLabel-shrink': {
        fontSize: '13px',
    },
    '& label.MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
        transform: 'translate(12px, 6px)',
        fontSize: '13px',
    },
    '& input.MuiInputBase-input': {
        padding: '5px 12px',
        fontSize: '13px',
        background: 'rgba(255, 255, 255, 0.8)',
    },
    '&.theme-dark input.MuiInputBase-input': {
        background: 'rgba(13, 17, 23, 0.8)',
    },
    position: 'absolute',
    right: '5px',
    top: '5px',
    width: '100px',
})

export const CodeBlockComponent = ({ node, updateAttributes, extension }: Props) => {
    const language = node.attrs.language
    const lowlight = extension.options.lowlight
    const theme = useAppSelector((state) => state.theme)
    const [inputValue, setInputValue] = useState<string>(language || '')
    const [isValidLanguage, setIsValidLanguage] = useState<boolean>(
        language ? lowlight.registered(language) : false
    )

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value
        setInputValue(value)
        const isValidLanguage = lowlight.registered(value)
        setIsValidLanguage(isValidLanguage)
        debouncedUpdateLanguage(isValidLanguage ? value : null)
    }

    const isPlainTextLanguage = (language: string) =>
        ['plaintext', 'txt', 'text'].includes(language)

    const debouncedUpdateLanguage = useCallback(
        _.debounce((language) => updateAttributes({ language: language || 'plaintext' }), 300),
        []
    )

    return (
        <NodeViewWrapper
            style={{
                position: 'relative',
            }}
        >
            <SyntaxLanguageTextField
                error={inputValue !== '' && !isValidLanguage}
                size='small'
                variant='outlined'
                label='Language'
                placeholder='plaintext'
                margin='none'
                contentEditable={false}
                type='text'
                className={`theme-${theme}`}
                value={inputValue}
                onChange={handleOnChange}
            />
            <pre>
                <NodeViewContent
                    as='code'
                    className={
                        language && !isPlainTextLanguage(language)
                            ? `language-${language}`
                            : undefined
                    }
                    style={{ whiteSpace: 'pre' }}
                />
            </pre>
        </NodeViewWrapper>
    )
}
