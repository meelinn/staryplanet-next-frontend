import { useTheme } from '@/hooks/use-theme'

// 用於取代a元件的特別元件，可以在不同頁面保持住狀態
import Link from 'next/link'

export default function Page2() {
  // 這裡示範使用解構的方式把物件的屬性值解出
  const { theme } = useTheme()

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <h1>Page2</h1>
      <p>目前佈景是 {theme}</p>
      <hr />
      <hr />
      a元素: <a href="/cs-0308/context-a/page1">Page1</a>
      (頁面重新刷新，狀態重置為初始值)
      <hr />
      Link元件: <Link href="/cs-0308/context-a/page1">Page2</Link>{' '}
      (狀態會保持住)
    </div>
  )
}
