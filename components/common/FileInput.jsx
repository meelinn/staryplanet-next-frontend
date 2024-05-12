import React, { useRef, useState, useEffect } from 'react'
import styles from '@/pages/crop/crop.module.css'

const FileInput = ({onImageSelected}) => {

    const inputRef = useRef();

    const [imgFile, setIgeFile] = useState()

    const handleInChange = (event) => {
       setIgeFile(event.target.files[0])

        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result);
            };
        }
    }

    useEffect(() => {
      console.log(imgFile)
    }, [imgFile])

    const onChangeImg = () => {
        inputRef.current.click();
    }

  return (
    <div className={styles.imgSelectBtnContainer}>
      {/*Hidden file input element */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleInChange}
        style={{ display: 'none' }}
      />

      {/* Button to trigger the input dialog */}
      <button className={styles.imgSelectBtn} onClick={onChangeImg}>
        點我選擇圖片
      </button>
    </div>
  )
}

export default FileInput
