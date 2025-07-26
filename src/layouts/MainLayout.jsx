import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
const MainLayout = ({ children }) => {
    return (
        <div>
            {/* <header className='p-4 bg-gray-100 shadow'>
               Main Header...
            </header> */}
            <DashboardHeader />
            <main>{children}</main>
        </div>
    )
}

export default MainLayout