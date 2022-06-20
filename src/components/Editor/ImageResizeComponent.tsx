import { styled } from '@mui/material'
import { Node } from '@tiptap/core'
import { ImageOptions } from '@tiptap/extension-image'
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useState } from 'react'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import DetectOutsideClick from './DetectOutsideClick'

interface Props extends NodeViewProps {
    node: NodeViewProps['node'] & {
        attrs: {
            title: string | null
            alt: string | null
            src: string | null
            height: number | null
            width: number | null
        }
    }
    extension: Node<ImageOptions, any>
}

const StyledResizableBox = styled(ResizableBox)({
    display: 'inline-block',
    cursor: 'move',
    paddingRight: 1,
    paddingLeft: 1,
})

export default ({ node, updateAttributes, extension }: Props) => {
    const { width, height } = node.attrs
    const [isResizing, setIsResizing] = useState(false)

    const onImgLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
        const img = event.target as HTMLImageElement
        updateAttributes({ width: img.offsetWidth, height: img.offsetHeight })
    }

    return (
        <NodeViewWrapper as='span' onClick={() => setIsResizing(true)}>
            <DetectOutsideClick onOutsideClick={() => setIsResizing(false)}>
                <StyledResizableBox
                    width={width ?? -1}
                    height={height ?? -1}
                    onResize={(e, data) => {
                        const { width, height } = data.size
                        updateAttributes({ width, height })
                    }}
                    draggableOpts={{ grid: [1, 1] }}
                    lockAspectRatio={true}
                    handle={isResizing ? undefined : <div />}
                >
                    <NodeViewContent
                        as='img'
                        {...node.attrs}
                        onLoad={onImgLoad}
                        style={{
                            display: 'block',
                            outline: isResizing ? '1px solid gray' : undefined,
                        }}
                    />
                </StyledResizableBox>
            </DetectOutsideClick>
        </NodeViewWrapper>
    )
}
