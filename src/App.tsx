

import './App.css'
import Nav from './Components/Nav'
import Cateogry from './Component/Cateogry'
import { cateogry } from './data/home'
import { useState } from 'react'
import VideoGridItem from './Component/VideoGridItems'
import { videos } from './data/home'
import Sidebar from './Components/Sidebar'
import { SidebarProvider } from './Contexts/SidebarContext'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(cateogry[0])
  
  function onSelect(category: string) {
    setSelectedCategory(category)
 }
  return (
    <SidebarProvider>
      <div className='max-h-screen flex flex-col'>
      <Nav/>
      <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
      <Sidebar/>
       <div className='overflow-x-hidden  pb-2'>
       <div className='sticky bg-white top-0 pb-4 '> 
        <Cateogry cateogry={cateogry} selectedCategory={selectedCategory} onSelect={onSelect}  />
        </div>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {videos.map(video=>(
            <VideoGridItem key={video.id} {...video}/>
          ))}
        </div>
       </div>
      </div>
    </div>
    </SidebarProvider>
  )
}

export default App
