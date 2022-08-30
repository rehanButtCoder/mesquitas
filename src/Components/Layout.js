import React from 'react'
import Sidebar from '../SideBar/SideBar';

const Layout = ({ children }) => {
  return (
    <div>
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout ;