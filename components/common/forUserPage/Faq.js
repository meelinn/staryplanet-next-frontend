import React, { useEffect, useRef } from 'react'
import styles from '@/components/common/forUserPage/Faq.module.css'
import Link from 'next/link'

export default function Faq({ open, onClose }) {
  if (!open) return null

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}></div>
    </div>
  )
}
