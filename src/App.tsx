

import './App.css'
import Nav from './Components/Nav'
import Cateogry from './Component/Cateogry'
import { cateogry } from './data/home'
import { useState } from 'react'
function App() {
 const [selectedCategory,setSelectedCategory] = useState(cateogry[0])
 function onSelect(category:string){
  setSelectedCategory(category)
 }
  return (
    <div className='max-h-screen'>
      <Nav/>
      <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <div>Sidebar</div>
       <div className='overflow-x-hidden px-4 pb-2'>
       <div className='sticky bg-white top-0 pb-4 '> 
        <Cateogry cateogry={cateogry} selectedCategory={selectedCategory} onSelect={onSelect}  />
        </div>
       </div>
      </div>
    </div>
  )
}

export default App
