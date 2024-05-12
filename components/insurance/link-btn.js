import React from 'react'
import Link from 'next/link'
import styles from '@/components/insurance/link-btn.module.css'

export default function LinkBtn() {
  return (
    <div className="container">
      <div className="row justify-content-evenly">
        <Link href={`/concept`} className="col-2 btn btn-outline-primary">
          認養概念
        </Link>

        <Link
          href={`/concept/care-info`}
          className="col-2 btn btn-outline-primary"
        >
          照顧須知
        </Link>
        <div className={`mt-5 ${styles['melin-line']}`}></div>
      </div>
    </div>
  )
}
