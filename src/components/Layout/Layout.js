import React from 'react'
import MainSidebar from '../MainSidebar/MainSidebar'

const Layout = ({ children }) => {
  return (
    <>
      <MainSidebar />
      {children}
    </>
  )
}

export default Layout
