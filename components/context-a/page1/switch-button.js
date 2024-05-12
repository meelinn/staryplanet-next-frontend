// 20240308 改成自訂勾子
import { useTheme } from '@/hooks/use-theme'
import styles from '../context-a.module.css'

export default function SwitchButton() {
  // 要讓他知道要切換什麼, 所以要解構成 theme, setTheme 兩個
  const { theme, setTheme } = useTheme()

  return (
    <div className={theme === 'dark' ? styles['dark'] : styles['light']}>
      <p
        className={
          theme === 'dark'
            ? styles['dark-highlight']
            : styles['light-highlight']
        }
      >
        目前佈景為: {theme} {theme === 'dark' ? '暗黑' : '明亮'}
      </p>
      <button
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        切換至 {theme === 'dark' ? '明亮' : '暗黑'}
      </button>
    </div>
  )
}
