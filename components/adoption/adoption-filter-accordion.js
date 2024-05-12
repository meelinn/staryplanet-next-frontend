import React from 'react'

export default function AdoptionFilterAccordion({ title, children, number }) {
  // {`panelsStayOpen-heading${number}`}
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`panelsStayOpen-heading${number}`}>
          {/* "panelsStayOpen-heading1" */}
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapse${number}`}
            // "#panelsStayOpen-collapse1"
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapse${number}`}
            // "panelsStayOpen-collapse1"
          >
            {title}
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapse${number}`}
          //   "panelsStayOpen-collapse1"
          className="accordion-collapse collapse"
          aria-labelledby={`panelsStayOpen-heading${number}`}
          //   "panelsStayOpen-heading1"
        >
          <div className="accordion-body">
            {/* 選項 */}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
