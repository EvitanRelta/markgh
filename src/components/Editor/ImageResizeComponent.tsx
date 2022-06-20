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

    // Custom handle based on the "<ResizableBox> with custom handles in all locations." example
    // in https://github.com/react-grid-layout/react-resizable/blob/master/examples/ExampleLayout.js
    '& .custom-handle': {
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: 'gray',
        borderRadius: '4px',
    },
    '& .custom-handle-sw': {
        bottom: '-4px',
        left: '-4px',
        cursor: 'sw-resize',
    },
    '& .custom-handle-se': {
        bottom: '-4px',
        right: '-4px',
        cursor: 'se-resize',
    },
    '& .custom-handle-nw': {
        top: '-4px',
        left: '-4px',
        cursor: 'nw-resize',
    },
    '& .custom-handle-ne': {
        top: '-4px',
        right: '-4px',
        cursor: 'ne-resize',
    },
    '& .custom-handle-w,& .custom-handle-e': {
        top: '50%',
        marginTop: '-4px',
        cursor: 'ew-resize',
    },
    '& .custom-handle-w': {
        left: '-4px',
    },
    '& .custom-handle-e': {
        right: '-4px',
    },
    '& .custom-handle-n,& .custom-handle-s': {
        left: '50%',
        marginLeft: '-4px',
        cursor: 'ns-resize',
    },
    '& .custom-handle-n': {
        top: '-4px',
    },
    '& .custom-handle-s': {
        bottom: '-4px',
    },
})

export default ({ node, updateAttributes, extension }: Props) => {
    const [startingWidth, setStartingWidth] = useState(-1)
    const [startingHeight, setStartingHeight] = useState(-1)
    const [isResizing, setIsResizing] = useState(false)

    const minLength = 15
    const minConstraints: [number, number] =
        startingWidth === -1
            ? [minLength, minLength]
            : startingWidth > startingHeight
            ? [(startingWidth / startingHeight) * minLength, minLength]
            : [minLength, (startingHeight / startingWidth) * minLength]

    const onImgLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
        const img = event.target as HTMLImageElement
        setStartingWidth(img.offsetWidth)
        setStartingHeight(img.offsetHeight)
    }

    return (
        <NodeViewWrapper as='span' onClick={() => setIsResizing(true)}>
            <DetectOutsideClick onOutsideClick={() => setIsResizing(false)}>
                <StyledResizableBox
                    width={startingWidth}
                    height={startingHeight}
                    onResize={(e, data) => {
                        const { width, height } = data.size
                        updateAttributes({ width, height })
                    }}
                    draggableOpts={{ grid: [1, 1] }}
                    lockAspectRatio={true}
                    handle={(direction, ref) =>
                        isResizing ? (
                            <span
                                className={`custom-handle custom-handle-${direction}`}
                                ref={ref}
                            />
                        ) : (
                            <div />
                        )
                    }
                    handleSize={[8, 8]}
                    resizeHandles={['sw', 'se', 'nw', 'ne', 'n', 's', 'e', 'w']}
                    minConstraints={minConstraints}
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
