import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import DashboardFooter from '../components/DasboardFooter'

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <header className='p-4 bg-gray-100 shadow'>
               Main Header...
            </header> */}
            <DashboardHeader  />
            <main className="flex-1 lex-1 bg-[#fff3e0]">{children}</main>
            <DashboardFooter />
        </div>
    )
}

export default MainLayout