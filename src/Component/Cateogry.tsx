import React,{useEffect, useRef, useState} from 'react'
import Button from './Button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

type CateogryProps = {
    cateogry: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}
const TRANSITION_DURATION = 300

function Cateogry({cateogry ,selectedCategory,onSelect}:CateogryProps) {
    const[translate,setTranslate] = useState(0)
    const[isLeft,setIsLeft] = useState(false)
    const[isRight,setIsRight] = useState(true)
    const containerRef=useRef<HTMLDivElement>(null)

    useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target
      if (container == null) return

      setIsLeft(translate > 0)
      setIsRight(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [cateogry, translate])
  return (
    <div ref={containerRef} className='overflow-x-hidden relative'>
        <div  className='flex flex-nowrap gap-3 transition-transform duration-300 w-[max-content]' style={{transform:`translateX(-${translate}px)`}}>  
            {cateogry.map((items,key)=>{return(
                <Button key={key} variant={selectedCategory === items ? "dark" : "default"} onClick={()=>onSelect(items)} className='rounded-lg whitespace-nowrap py-1 px-3'>
                    {items}
                </Button>)})}
        </div>
       {isLeft &&  <div className='absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
            <Button variant="ghost" size="icon" className='h-full aspect-square w-auto p-1.5'onClick={()=>{setTranslate(translate=>{
                const newTranslate = translate-TRANSITION_DURATION
                if (newTranslate < 0) {
                    return 0
                }
                else{
                    return newTranslate
                }
                
            })}}>
                <ChevronLeftIcon/>
            </Button>
        </div>}
        {isRight &&  <div className='absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
            <Button variant="ghost" size="icon"  className='h-full aspect-square w-auto p-1.5'onClick={()=>{setTranslate(translate => {
                if (containerRef.current == null) {
                  return translate
                }
                const newTranslate = translate + TRANSITION_DURATION
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                if (newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            }
                
            }>
                <ChevronRightIcon/>
            </Button>
        </div>}
       
    </div>
  )
}

export default Cateogry
function userRef<T>(arg0: null) {
    throw new Error('Function not implemented.')
}

