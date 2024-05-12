import React, { useState } from 'react'
import adoptionSliderStyles from '@/styles/adoption/adoption-slider.module.css'

export default function AdoptionSlider({
  minAge,
  maxAge,
  minName,
  maxName,
  onChange,
}) {
  const [minValue, setMinValue] = useState(minAge)
  const [maxValue, setMaxValue] = useState(maxAge)

  const handleMinChange = (event) => {
    let newMinValue = parseInt(event.target.value)
    newMinValue = isNaN(newMinValue) ? 1 : newMinValue // 確保輸入值為有效的數字，且不小於 1
    newMinValue = Math.max(1, Math.min(newMinValue, 15)) // 將輸入值限制在 1 到 15 之間
    setMinValue(newMinValue)

    // 如果最小值超過當前最大值，則將最大值更新為新的最小值
    if (newMinValue > maxValue) {
      setMaxValue(newMinValue)
      onChange({ minAge: newMinValue, maxAge: newMinValue })
    } else {
      onChange({ minAge: newMinValue, maxAge: maxValue })
    }
  }

  const handleMaxChange = (event) => {
    let newMaxValue = parseInt(event.target.value)
    newMaxValue = isNaN(newMaxValue) ? 15 : newMaxValue // 確保輸入值為有效的數字，且不超過 15
    newMaxValue = Math.max(1, Math.min(newMaxValue, 15)) // 將輸入值限制在 1 到 15 之間
    setMaxValue(newMaxValue)

    // 如果最大值小於當前最小值，則將最小值更新為新的最大值
    if (newMaxValue < minValue) {
      setMinValue(newMaxValue)
      onChange({ minAge: newMaxValue, maxAge: newMaxValue })
    } else {
      onChange({ minAge: minValue, maxAge: newMaxValue })
    }
  }

  return (
    <div className="input-group">
      <input
        type="number"
        className="form-control"
        value={minValue}
        name={minName}
        onChange={handleMinChange}
        min={1} // 設置最小值為 1
        max={15} // 設置最大值為 15
      />
      <div className="input-group-prepend">
        <span className="input-group-text">–</span>
      </div>
      <input
        type="number"
        className="form-control"
        value={maxValue}
        name={maxName}
        onChange={handleMaxChange}
        min={1} // 設置最小值為 1
        max={15} // 設置最大值為 15
      />
    </div>
  )
}
