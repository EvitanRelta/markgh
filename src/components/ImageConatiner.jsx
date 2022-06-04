import { useEffect, useState } from 'react'
import UploadImage from './UploadImage'

const ImageConatiner = () => {

    const getLocalStorageUsage = () => {
        var _lsTotal = 0,
        _xLen, _x;
        
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            //console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
        };
        return (_lsTotal / 1024).toFixed(2);
    }

    const makeImageArray = () => {
        var tempArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            tempArray[tempArray.length] = localStorage["image" + i]
        }
        return tempArray;
    }
   
    const [imgArray, setImgArray] = useState(makeImageArray())
    const [localStorageUse, setLocalStorageUse] = useState(getLocalStorageUsage())

    const uploadImage = (e) => {
        let file = e[0]
        // setFiles([...files, file])
        localStorage["image" + localStorage.length] = file.base64
        setImgArray([...imgArray, file.base64])
    }

    useEffect(() => {
        setLocalStorageUse(getLocalStorageUsage())
    }, [imgArray])




    console.log(localStorageUse)

  return (
    <div>
        <UploadImage uploadImage = {uploadImage} />
        {imgArray.map((image) =>  <img key={Math.floor(Math.random()*(10000))}
        style = {{maxWidth: 320, maxHeight: 180}} src={image} />)}
        {localStorageUse + "/5000KB used" + "(" + (localStorageUse/5000 * 100).toFixed(2) + "%)"}
        
    </div>
  )
}

export default ImageConatiner