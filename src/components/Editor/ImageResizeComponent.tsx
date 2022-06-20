import { Node } from '@tiptap/core'
import { ImageOptions } from '@tiptap/extension-image'
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'

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

export default ({ node, updateAttributes, extension }: Props) => {
    return (
        <NodeViewWrapper as='span'>
            <NodeViewContent as='img' {...node.attrs} />
        </NodeViewWrapper>
    )
}
