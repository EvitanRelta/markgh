type Props = {
    mdText: string
}

const MarkdownTextContainer = ({ mdText }: Props) => {

    return (
        <pre
            style={{
                border: '1px solid #d0cccc',
                width: '50%',
                padding: '20px',
                margin: '10px',
                overflowX: 'auto',
            }}
        >
            {mdText}
        </pre>
    )
}

export default MarkdownTextContainer
