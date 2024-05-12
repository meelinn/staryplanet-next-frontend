import React, { useState } from 'react'
import FileInput from '@/components/common/FileInput'
import ImageCropper from '@/components/common/ImageCropper'
import styles from '@/pages/crop/crop.module.css'

function urlToFile(url, filename, mimeType) {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      return new File([buffer], filename, { type: mimeType })
    })
}

const Crop = ({ handleUpload, setFile, setIsEditing, setShowModal }) => {
  const [image, setImage] = useState('')
  const [currentPage, setCurrentPage] = useState('choose-img')
  const [imgAfterCrop, setImgAfterCrop] = useState('')

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg)
    setCurrentPage('crop-img')
  }

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement('canvas')
    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height

    const context = canvasEle.getContext('2d')

    // Load the selected image
    let imageObj1 = new Image()
    imageObj1.src = image
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto the canvas
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      )

      console.log(canvasEle)

      // Convert the canvas content to a Blob object
      canvasEle.toBlob((blob) => {
        // Create a URL for the Blob object
        const imageURL = URL.createObjectURL(blob)

        // Set the cropped image URL
        setImgAfterCrop(imageURL)

        // Convert the cropped image URL to a File object and submit to the backend
        urlToFile(imageURL, 'cropped_image.png', 'image/png')
          .then((file) => {
            // Submit the File object to the backend
            console.log('Converted File:', file)
            // 更新 file 狀態
            setFile(file)
          })
          .catch((error) => {
            console.error('Error converting URL to File:', error)
          })

        // Change the page to 'img-cropped'
        setCurrentPage('img-cropped')

        console.log(imageURL)
      }, 'image/jpeg')
    }
  }

  // Callback function when cropping is canceled
  const onCropCancel = () => {
    setCurrentPage('choose-img')
    setImage('')
  }

  return (
    <div className={styles.container}>
      {currentPage === 'choose-img' ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentPage === 'crop-img' ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div className={styles.lastStepContainer}>
          <div className={styles.lastStepTitle}>照片檢視</div>

          <div>
            <img src={imgAfterCrop} className={styles.croppedImg} />
          </div>

          <div className={styles.finalBtnContainer}>
            <button
              onClick={() => {
                // Allow cropping the current image again
                setCurrentPage('crop-img')
              }}
              className={styles.finalBtn}
            >
              重新裁切
            </button>

            <button
              onClick={() => {
                handleUpload()
                setCurrentPage('choose-img')
                setImage('')
                setIsEditing(false)
                setShowModal(false)
              }}
              className={styles.finalBtn}
            >
              確認送出
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Crop
