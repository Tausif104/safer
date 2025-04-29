import React from 'react'
import Sidebar2 from '../Sidebar2/Sidebar2'

const Layout = ({children}) => {
  return (
    <>
        <Sidebar2/>
        {children}
    </>
  )
}

export default Layout
