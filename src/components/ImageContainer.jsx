import { useEffect, useState } from 'react'

const ImageConatiner = ({db}) => {

    const [images, setImages] = useState([])

    //Retrieves images from db, and updates them in state
    const updateImagesFromDb = async () => {
        let allImages = await db.images.toArray();
        setImages(allImages);
    }

    //Retrieve images from db when page is loaded
    useEffect(() => {
        updateImagesFromDb();
    }, [])


    //Upload an image
    const uploadImage = (e) => {
        var input = e.target;
        var reader = new FileReader();
        reader.onload = function(){
        };
        reader.readAsDataURL(input.files[0]);
        reader.onload = async () => {
            let imageBase64 = reader.result
            let image = {
                id: !images.length ? 0 : (images[images.length - 1].id + 1),
                base64: imageBase64
            }
            db.images.add(image).then(updateImagesFromDb())
        }

        //Refreshes element value to allow a same image to be uploaded again 
        //(Otherwise onChange can't detect if the same image is uploaded again)
        e.target.value = ''
        
    }

    //Clears db
    const deleteAllImages = async () => {
        for (let i = 0; i <= images[images.length -1].id; i++) {
            db.images.delete(i);
        }
        updateImagesFromDb();
    }

    //Clears single image by id
    const deleteImage = async (id) => {
        db.images.delete(id);
        updateImagesFromDb();
    }




  return (
    <div>
        <input accept= "image/" type= "file" onChange = {uploadImage}/>
        {images.map((image) => 
        <div key= {image.id}>id:{image.id}
            <img style= {{maxWidth: 320, maxHeight: 180}} src= {image.base64} alt= {image.id}/>
            <button onClick= {() => deleteImage(image.id)}>Delete</button>
        </div>)}
        <button onClick= {() => deleteAllImages()}>Delete all images</button>
    </div>
  )
}

export default ImageConatiner