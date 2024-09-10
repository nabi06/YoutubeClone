import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clapperboard, Clock, Ghost, Home, Library, PlaySquare, Repeat ,History, ListVideo, Flame, ShoppingBag, Music2, Film, Radio, Gamepad2, Newspaper, Trophy, Lightbulb, Shirt, Podcast} from 'lucide-react'
import React, { Children, ElementType, ReactNode, useState } from 'react'
import Button, { buttonStyles } from '../Component/Button'
import { twMerge } from 'tailwind-merge'
import { playlists, subscriptions } from '../data/sidebar'
import { useSidebarContext } from '../Contexts/SidebarContext'
import { PageHeaderFirstSection } from './Nav'

function Sidebar() {
  const {isLargeOpen ,isSmallOpen,close}=useSidebarContext()
  return (
    <>
    <aside className={`sticky  top-0 overflow-y-auto scrollbar-hidden py-4 pb-4 flex flex-col   ${isLargeOpen?"lg:hidden":"lg:flex"}`}>
        <SmallSiderItem Icon={Home} url='/' title='home'/>
        <SmallSiderItem Icon={Repeat} url='/' title='Repeat'/>
        <SmallSiderItem Icon={Clapperboard} url='/' title='Subscriptions'/>
        <SmallSiderItem Icon={Library} url='/' title='Library'/>
    </aside>
    {isSmallOpen&&<div className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50' onClick={close}>
      </div>}
    <aside className={`w-56 lg:sticky absolute top-0 pb-4 flex-col gap-2 px-2 overflow-y-auto scrollbar-hidden  ${isLargeOpen?"lg:flex":"lg-hidden"} ${isSmallOpen?" flex-col bg-white z-[999] max-h-screen":"hidden"} `}>
      <div className='lg:hidden pt-2 pb-2 px-2 sticky top-0'>
      <PageHeaderFirstSection/>
      </div>
        <LargeSideBar title='Home' >
            <LargeSideBarItem  IconorImageUrl={Home} url='/' title='home' isActive/>
            <LargeSideBarItem  IconorImageUrl={Clapperboard} url='/' title='Subscriptions' isActive/>
        </LargeSideBar>
        <hr/>
        <LargeSideBar visibleItemCount={5}>
          <LargeSideBarItem
            IconorImageUrl={Library}
            title="Library"
            url="/library"
            isActive
          />
          <LargeSideBarItem
            IconorImageUrl={History}
            title="History"
            url="/history"
            isActive={false}
          />
          <LargeSideBarItem
            IconorImageUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
            isActive={false}
          />
          <LargeSideBarItem
            IconorImageUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
            isActive={false}
          />
          {playlists.map(playlist => (
            <LargeSideBarItem
              key={playlist.id}
              IconorImageUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}           
              />
          ))}
        </LargeSideBar>
        <hr/>
        <LargeSideBar title='Subscriptions'>
        {subscriptions.map(subscription => (
            <LargeSideBarItem
              key={subscription.id}
              IconorImageUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
          
        </LargeSideBar>
        <hr/>
        <LargeSideBar title='Explorer'>
        <LargeSideBarItem
            IconorImageUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSideBarItem
            IconorImageUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSideBarItem IconorImageUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem
            IconorImageUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSideBarItem IconorImageUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItem
            IconorImageUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSideBarItem IconorImageUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem
            IconorImageUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSideBarItem
            IconorImageUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSideBarItem
            IconorImageUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSideBarItem
            IconorImageUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
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
    IconorImageUrl:ElementType|string
    url:string
    title:string
    isActive:boolean
}
function LargeSideBarItem({IconorImageUrl,url,title,isActive=false}:LargeSideBar){
    return <a href={url} className={twMerge(buttonStyles({variant:"ghost"}),` w-full flex  items-center gap-4 rounded-lg ${isActive?"font-bold bg-neutral-100 hover:bg-secondary":undefined}`)}>
      {typeof IconorImageUrl ==="string"?(<img src={IconorImageUrl} className='w-6 h-6 rounded-full'/>) :
      <IconorImageUrl className="w-6 h-6 "/>}
        
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
        
    </a>

}


//1:27:31