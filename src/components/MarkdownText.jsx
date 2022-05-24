

const MarkdownText = ({ markdown, height }) => {

    
  return (
    <span style = {{
        border: '1px solid #d0cccc',
        minWidth: '50%',
        padding: '20px',
        margin: '10px',

    }}>{ markdown }</span>
  )
}

export default MarkdownText