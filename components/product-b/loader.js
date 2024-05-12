import React from 'react'
import styles from './loader.module.css'

// https://loading.io/css/
export default function Loader() {
  return (
    <>
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
