import React from 'react'
import Link from 'next/link'
import styles from '@/components/concept/link-btn.module.css'

export default function LinkBtn() {
  return (
    <div className="container">
      <div className="row justify-content-center mx-5">
        <Link
          href={`/concept`}
          className={`col-2 btn btn-outline-primary rounded-5 mx-3 fs-bold ${styles['letter-space']}`}
        >
          認養概念
        </Link>

        <Link
          href={`/concept/care-info`}
          className="col-2 btn btn-outline-primary mx-3 rounded-5  fs-bold"
        >
          照顧須知
        </Link>
        {/* <div className={`mt-5 ${styles['melin-line']}`}></div> */}
      </div>
    </div>
  )
}
