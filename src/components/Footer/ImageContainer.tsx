import { Box, Button, Input } from '@mui/material'
import { useEffect, useState } from 'react'
import { EditorDB, EditorImage } from '../IndexedDB/initDB'

interface Props {
    db: EditorDB
}

export const ImageContainer = ({ db }: Props) => {
    const [images, setImages] = useState<EditorImage[]>([])

    //Retrieves images from db, and updates them in state
    const updateImagesFromDb = async () => {
        let allImages = await db.images.toArray()
        setImages(allImages)
    }

    //Retrieve images from db when page is loaded
    useEffect(() => {
        updateImagesFromDb()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Upload an image
    const uploadImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const input = e.target
        if (!input.files) return

        const reader = new FileReader()
        reader.onload = async () => {
            const imageBase64 = reader.result as string
            const image = {
                id: images.length === 0 ? 0 : images[images.length - 1].id + 1,
                base64: imageBase64,
            }
            await db.images.add(image)
            updateImagesFromDb()
        }
        reader.readAsDataURL(input.files[0])

        //Refreshes element value to allow a same image to be uploaded again
        //(Otherwise onChange can't detect if the same image is uploaded again)
        e.target.value = ''
    }

    //Clears db
    const deleteAllImages = async () => {
        for (let i = 0; i <= images[images.length - 1].id; i++) {
            db.images.delete(i)
        }
        updateImagesFromDb()
    }

    //Clears single image by id
    const deleteImage = async (id: number) => {
        await db.images.delete(id)
        updateImagesFromDb()
    }

    return (
        <>
            <Input inputProps={{ accept: 'image/' }} type='file' onChange={uploadImage} />
            {images.map((image) => (
                <Box key={image.id}>
                    id:{image.id}
                    <img
                        style={{ maxWidth: 320, maxHeight: 180 }}
                        src={image.base64}
                        alt={image.id.toString()}
                    />
                    <button onClick={() => deleteImage(image.id)}>Delete</button>
                </Box>
            ))}
            <Button onClick={() => deleteAllImages()}>Delete all images</Button>
        </>
    )
}
