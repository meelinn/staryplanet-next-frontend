import React from 'react'
//icon
import { HiSpeakerphone } from 'react-icons/hi'

export default function Ad() {
  return (
    <>
      <div className="rounded-2 bg-primary shadow-sm row justify-content-center py-1 text-white mx-2 text-center">
        <span>
          <HiSpeakerphone />{' '}
          歡迎新會員！註冊新會員就送不限金額20元優惠券！趕快輸入：DISCOUNT20
        </span>
      </div>
    </>
  )
}
