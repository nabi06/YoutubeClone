import { Bell, Link, Menu, Mic, Search, Upload } from "lucide-react"
import Button from "../Component/Button"

function Nav(){
    return(
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div  className="flex  gap-4 items-center  ">
                <Button variant="ghost" size="icon" ><Menu/></Button>
                <a href="/">Youtube</a>
            </div>
            <form className="flex flex-grow gap-4 justify-center">
                <div className="flex flex-grow max-w-[600px]">
                <input type="search" placeholder="serach" className="rounded-l-full p-2 border secondary-border shadow-inner shadow-secondary outline-none text-lg w-full"/>
                <Button className="rounded-r-full px-4 py-2 border-secondary-border border border-1-0 flex-shrink-0">
                    <Search/>
                </Button>
                </div>
                <Button variant="default" size="icon">
                    <Mic/>
                </Button>
                
            </form>
            <div className="flex gap-4 md:gap-2 flex-shrink-0 items-center">
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