import List from '@/components/context-a/page1/list'
import SwitchButton from '@/components/context-a/page1/switch-button'
// 用於取代a元件的特別元件，可以在不同頁面保持住狀態
import Link from 'next/link'

export default function Page1() {
  return (
    <>
      <h1>Page1</h1>
      <hr />
      <List />
      <hr />
      <SwitchButton />
      <hr />
      a元素: <a href="/cs-0308/context-a/page2">Page2</a>
      (頁面重新刷新，狀態重置為初始值)
      <hr />
      Link元件: <Link href="/cs-0308/context-a/page2">Page2</Link>
      (狀態會保持住)
    </>
  )
}