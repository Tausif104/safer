import React from 'react'
import MainSidebar2 from '../MainSidebar2/MainSidebar2'

const Layout = ({ children }) => {
  return (
    <>
      <MainSidebar2 />
      {children}
    </>
  )
}

export default Layout
