import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import IdleTimer from "../components/IdleTimer"


const InitialLayout = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="lg:w-full h-full">
                <Navbar />
            </div>
            <div className="lg:w-[100%] w-[100vw] h-full flex">

                <Sidebar />
                <IdleTimer />
                <div className="overflow-y-auto flex-1">
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default InitialLayout