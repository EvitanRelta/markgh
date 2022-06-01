type Props = {
    mdText: string;
}

const MarkdownTextContainer = ({ mdText }: Props) => {
    console.log(mdText)


    return (
        <span style={{
            border: '1px solid #d0cccc',
            minWidth: '50%',
            padding: '20px',
            margin: '10px'
        }}>
            {mdText}
        </span>
    )
}

export default MarkdownTextContainer