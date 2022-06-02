import FileBase64 from 'react-file-base64'

const UploadImage = () => {

    //const [files, setFiles] = useState([])
    
    const uploadImage = (e) => {
        let file = e[0]
        // setFiles([...files, file])
        localStorage["image"] = file.base64
    }

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