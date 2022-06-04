import FileBase64 from 'react-file-base64'

const UploadImage = ({uploadImage}) => {

    //const [files, setFiles] = useState([])
    
 
  return (
    <div>
    <FileBase64
    multiple={ true }
    onDone={ uploadImage } />
    <img style = {{maxWidth: 320, maxHeight: 180}} src={localStorage["image"]} /> 
    </div>
  )
}

export default UploadImage