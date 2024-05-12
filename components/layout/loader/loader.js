import React from 'react'
import styles from '@/components/layout/loader/loader.module.css'

// loader:載入器

export default function Loader() {
  return (
    <>
      <div className={styles['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
