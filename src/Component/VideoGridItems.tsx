import React,{useState,useRef,useEffect} from 'react'
import formatDuration from '../Utils/formatDuration'
import { formatTimeAgo } from '../Utils/FormatTimeAgo'

type VideoGridItemProps = {
    id: string
    title: string
    channel: {
      id: string
      name: string
      profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
  }
const VideoFormatter=new Intl.NumberFormat(undefined,{ notation:'compact'})

function VideoGridItems({id,title,channel,views,postedAt,duration,thumbnailUrl,videoUrl}:VideoGridItemProps) {
    const [isHovered,setIsHovered]=useState(false)
    const videoRef=useRef<HTMLVideoElement>(null)
    useEffect(()=>{
        if(videoRef.current) return
        if(isHovered){
            videoRef.current.currentTime=0
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
    },[isHovered])
  return (
    <div className='flex flex-col gap-2'
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)} >
        <a href={`/watch/${id}`} className='relative aspect-video'>
        <img src={thumbnailUrl} alt={title} className={`block w-full h-full object-cover  transition-[border-radius] duration-200 ${isHovered?'rounded-none':'rounded-xl'}`}/>
        <div className='absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm rounded px-0.5'>
            {formatDuration(duration)}
        </div>
        <video ref={videoRef} muted playsInline src={videoUrl} className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 delay-200 ${isHovered?'opacity-100':'opacity-0'}`}/>

      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="flex justify-items-start font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text flex justify-items-start text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text flex justify-items-start text-sm">
            {VideoFormatter.format(views)} views . {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGridItems
