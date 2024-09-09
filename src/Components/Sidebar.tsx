import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clapperboard, Clock, Ghost, Home, Library, PlaySquare, Repeat ,History} from 'lucide-react'
import React, { Children, ElementType, ReactNode, useState } from 'react'
import Button, { buttonStyles } from '../Component/Button'
import { twMerge } from 'tailwind-merge'

function Sidebar() {
  return (
    <>
    <aside className='sticky top-0 overflow-y-auto scrollbar-hidden p-4 flex flex-col ml-1 lg:hidden '>
        <SmallSiderItem Icon={Home} url='/' title='home'/>
        <SmallSiderItem Icon={Repeat} url='/' title='Repeat'/>
        <SmallSiderItem Icon={Clapperboard} url='/' title='Subscriptions'/>
        <SmallSiderItem Icon={Library} url='/' title='Library'/>
    </aside>
    <aside className='w-56 lg:sticky absolute flex flex-col ga-2 pb-2 overflow-y-auto scrollbar-hidden '>
        <LargeSideBar title='Home' >
            <LargeSideBarItem  Icon={Home} url='/' title='home' isActive/>
            <LargeSideBarItem  Icon={Clapperboard} url='/' title='Subscriptions' isActive/>
        </LargeSideBar>
        <hr/>
        <LargeSideBar visibleItemCount={5}>
          <LargeSideBarItem
            Icon={Library}
            title="Library"
            url="/library"
            isActive
          />
          <LargeSideBarItem
            Icon={History}
            title="History"
            url="/history"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={PlaySquare}
            title="Your Videos"
            url="/your-videos"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
            isActive={false}
          />
        </LargeSideBar>
    </aside>
    </>
  )
}

export default Sidebar
type Sidebar={
    Icon:ElementType
    url:string
    title:string
}
function SmallSiderItem({Icon,url,title}:Sidebar){
    return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}),"py-4  flex flex-col items-center rounded-xl gap-1")} >
        <Icon className='w-6 h-6'/>
        <div className='text-sm '>{title}</div>
    </a>
}
type LargeSide={
    children:ReactNode
    title?:string
    visibleItemCount?:number
}
function LargeSideBar({children ,title ,visibleItemCount=Number.POSITIVE_INFINITY}:LargeSide){
    const[isShow,setIsShow]=useState(false)
    const childrenArray=React.Children.toArray(children)
    const visibleChildren=childrenArray.slice(0,visibleItemCount)
    const ShowExpand=isShow ? childrenArray:childrenArray.slice(0,visibleItemCount)
    const ButtonIcon=isShow ?ChevronUp:ChevronDown
    return <div>
        {title &&<div className='text-lg mt-2 ml-4 mb-1'>{title}</div>}
        {visibleChildren}
        {ShowExpand && <Button onClick={()=>setIsShow(e=>!e)} variant='ghost' className='w-full flex items-center rounded-lg gap-4 p-3'>
            <ButtonIcon className='w-6 h-6'/>
            <div >{isShow?"Show less":"Show more"}</div>
            </Button>}
       
        </div>
}
type LargeSideBar={
    Icon:ElementType
    url:string
    title:string
    isActive:boolean
}
function LargeSideBarItem({Icon,url,title,isActive=false}:LargeSideBar){
    return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}),` w-full flex  items-center gap-4 rounded-lg ${isActive?"font-bold bg-neutral-100 hover:bg-secondary":undefined}`)}>
        <Icon className="w-6 h-6 "/>
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
        
    </a>

}
