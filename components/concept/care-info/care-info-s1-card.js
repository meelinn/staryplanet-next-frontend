import React from 'react'
import Image from 'next/image'

export default function CareInfoS1Card({ src, alt, text }) {
  return (
    <>
      <div className="melin-s1-card-img-cut">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover" // 根据需要选择裁剪方式，如 cover、contain 等
        />
      </div>
      <p className="p-3 m-0">{text}</p>

      <style jsx>
        {`
          .melin-s1-card-img-cut {
            position: relative;
            width: 100%;
            height: 450px; // 修正高度设定
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}
