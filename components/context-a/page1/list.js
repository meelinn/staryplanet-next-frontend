import { useTheme } from '@/hooks/use-theme'
import styles from '../context-a.module.css'

export default function List() {
  const { theme } = useTheme()

  return (
    <div className={theme === 'dark' ? styles['dark'] : styles['light']}>
      <h2>測試列表</h2>
      <ul>
        <li>1111</li>
        <li>2222</li>
      </ul>
    </div>
  )
}
