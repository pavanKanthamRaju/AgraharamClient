import React from 'react'
import { Link } from 'react-router-dom'

const DashboardHeader = () => {
    return (
        <heder className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-violet-600">
                App Logo
            </div>
            <div className='space-x-4'>
                <Link to="/login">
                    <button className='text-violet-600 font-medium hover:underline'>
                        Sign In
                    </button>
                </Link>
                <Link>
                    <button className='bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition'>
                        Sign Up
                    </button>
                </Link>ā
            </div>
        </heder>
    )
}
export default DashboardHeader
