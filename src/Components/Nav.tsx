import { ArrowLeft, Bell, Link, Menu, Mic, Search, Upload } from "lucide-react"
import { useState } from "react"
import Button from "../Component/Button"

function Nav(){
    const [isShowBar,setIsShowBar] = useState(false)
    return(
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div  className={` gap-4 items-center  ${isShowBar?"hidden":"flex"}`}>
                <Button variant="ghost" size="icon" ><Menu/></Button>
                <a href="/">Youtube</a>
            </div>
            <form className={`flex-grow gap-4 justify-center ${isShowBar?"flex":"hidden md:flex "}`}>
                {isShowBar &&<Button variant="default" size="icon" className="flex-shrink-0  " onClick={()=>setIsShowBar(!isShowBar)}>
                    <ArrowLeft/>
                </Button>}
                <div className="flex flex-grow max-w-[600px]">
                <input type="search" placeholder="serach" className="rounded-l-full p-2 border secondary-border shadow-inner shadow-secondary outline-none text-lg w-full"/>
                <Button className="rounded-r-full px-4 py-2 border-secondary-border border border-1-0 flex-shrink-0" >
                    <Search/>
                </Button>
                </div>
                <Button variant="default" size="icon">
                    <Mic/>
                </Button>
                
            </form>
            <div className={`flex gap-4 md:gap-2 flex-shrink-0 ${isShowBar?"hidden":"flex"}`}>
                <Button onClick={()=>setIsShowBar(!isShowBar)} variant="ghost" size="icon" className="md:hidden">
                    <Search/>
                    
                </Button>
                <Button variant="ghost" size="icon">
                    <Upload/>
                    
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell/>
                    
                </Button>
                <Button variant="ghost" size="icon">
                    <Link/>
                    
                </Button>
            </div>

        </div>
    )
}
export default  Nav