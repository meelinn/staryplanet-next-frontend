import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import '@/pages/crop/crop.module.css'
import styles from '@/pages/crop/crop.module.css'

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [croppedArea, setCroppedArea] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(1 / 1)

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    // Store the cropped area in pixels
    setCroppedArea(croppedAreaPixels)
  }

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value)
  }

  return (
    <div className={styles.cropper}>
      <div className={styles.secondStepTitle}>設定尺寸</div>

      <div className={styles.cropper2}>
        {/*Image Cropper component */}
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className={styles.action_btns}>
        {/* Aspect ratio selection */}
        <div
          className={styles.aspect_ratios}
          onChange={onAspectRatioChange}
        ></div>

        {/* Button for canceling or applying the crop */}
        <div className={styles.btn_container}>
          <button className={styles.btn} onClick={onCropCancel}>
            取消
          </button>

          <button
            className={styles.btn}
            onClick={() => {
              onCropDone(croppedArea)
            }}
          >
            檢視
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
