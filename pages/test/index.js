import React, { useState } from 'react'
import axios from 'axios'

const main = {
  marginTop: '80px',
}

export default function ImageUpload() {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      // 請注意此處的路由應該與後端路由相符
      const response = await axios.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // 從後端獲取的相對圖片路徑
      const relativeImagePath = response.data.imageUrl

      // 在前端顯示圖片
      setImageUrl(relativeImagePath)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div style={main}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  )
}

