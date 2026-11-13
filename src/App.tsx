import { useState } from 'react'
import { TopBar, TabBar, type Tab } from './components/Bars'
import { DressMe } from './screens/DressMe'
import { Kleiderschrank } from './screens/Kleiderschrank'
import { Lookbook } from './screens/Lookbook'

export default function App() {
  const [tab, setTab] = useState<Tab>('dressme')
  return (
    <div className="app">
      <TopBar />
      <div className="divider" />
      {tab === 'dressme' && <DressMe />}
      {tab === 'kleiderschrank' && <Kleiderschrank />}
      {tab === 'lookbook' && <Lookbook />}
      <div className="divider" />
      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
