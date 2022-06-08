import FileOption from './ToolbarOptions/FileMenu/FileOption'

const ToolbarContainer = ({ onUpload }) => {



    
  return (
    <div>
      <FileOption onUpload = {onUpload} />
    </div>
  )
}

export default ToolbarContainer
