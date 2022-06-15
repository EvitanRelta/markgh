// Temporarily fixes #36 and https://github.com/ueberdosis/tiptap/issues/2883
// while waiting for https://github.com/ueberdosis/tiptap/pull/2884 PR to be merged.

import { NodeViewContent, NodeViewContentProps } from '@tiptap/react'

interface NodeViewContentJSXElement
    extends React.ReactElement<NodeViewContentProps, React.ElementType> {
    ref: (element: HTMLElement | null) => void
}

export const ModifiedNodeViewContent = (props: any) => {
    const Component = NodeViewContent(props) as NodeViewContentJSXElement
    const Tag = Component.type
    const style = {
        ...Component.props.style,
        ...props.style,
    }

    return <Tag {...Component.props} style={style} ref={Component.ref} />
}
