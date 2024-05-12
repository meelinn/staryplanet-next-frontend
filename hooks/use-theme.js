import { createContext, useContext, useState } from 'react'

// 1. 建立 context
const ThemeContext = createContext(null)

// 2. 建立一個 Context Provider 元件
// 提供給全站最上層元件(_app.js)使用, 集中這個 context 藥用的狀態在裡面管理
export function ThemeProvider({ children }) {
  // 共享狀態，可以是 'light' | 'dark'
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider
      // 20240308 使用 value 屬性提供資料，讓提供者階層下面後代元件都存取得到資料
      // 20240308 [得到狀態的常數,設定狀態]
      value={{ theme, setTheme }}
    >
      {/* {children}: 夾在裡面的東西 */}
      {children}
    </ThemeContext.Provider>
  )
}
// 3. 提供一個包裝好的 useContext 名稱
// 提供給消費者(consumer)方便使用, 直接呼叫就能用
export const useTheme = () => useContext(ThemeContext)
