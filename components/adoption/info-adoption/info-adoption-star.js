import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PiPawPrintFill, PiPawPrint } from 'react-icons/pi'

export default function InfoAdoptionStar({ i }) {
  const [degree, setDegree] = useState(0)

  useEffect(() => {
    setDegree(i)
  }, [i])

  const paw = []
  for (let i = 1; i <= 5; i++) {
    if (i <= degree) {
      paw.push(
        <span key={i}>
          <PiPawPrintFill />
        </span>
      ) // 實心
    } else {
      paw.push(
        <span key={i}>
          <PiPawPrint />
        </span>
      ) // 空心
    }
  }
  return (
    <>
      <span>{paw}</span>
    </>
  )
}
