import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <>
        <Sidebar/>
        {children}
    </>
  )
}

export default Layout
