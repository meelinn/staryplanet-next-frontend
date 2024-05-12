import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
export default function OrderCancle() {
  const router = useRouter()
  useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: '交易失敗',
      text: '您將返回購物車...',
    }).then(() => {
      router.push('/order-form')
    })
  }, [])
  return <></>
}
