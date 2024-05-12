import React, { useState, useEffect } from 'react'
import styles from '@/components/concept/concept-s4-timeline.module.css'

export default function ConceptS4TimeLine(props) {
  return (
    <>
      <div className="container py-2 my-5">
        {/* timeline item */}
        <div className="row align-items-center">
          {/* timeline item left dot */}
          <div className="col-4 text-end position-relative">
            {/* 图标 */}
            <h5 className="m-2">
              <span
                className={`${styles['timeline-icon']} ${styles['zoom-in']}`}
              >
                {props.icon}
              </span>
            </h5>
          </div>
          {/* timeline item 1 event content */}
          <div className="col-4 py-2">
            <div className="card">
              <div className="card-body">
                <p className="card-text p-0">{props.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
