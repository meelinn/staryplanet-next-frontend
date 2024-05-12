import React from 'react'

export default function AdoptionFilterCheckboxOption({
  label,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <div className="form-check ps-1 py-1">
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {label}
        </label>
        <input
          className="form-check-input float-end"
          type="checkbox"
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </>
  )
}
