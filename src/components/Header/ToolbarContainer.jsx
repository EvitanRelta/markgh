import FileOption from './ToolbarOptions/FileOption'

const ToolbarContainer = ({ onUpload }) => {



    
  return (
    <div>
      <FileOption onUpload = {onUpload} sx = {{ padding: 0}}/>
    </div>
  )
}

export default ToolbarContainer
