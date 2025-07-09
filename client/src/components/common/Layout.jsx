import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import Footer from './Footer'

const Layout = () => {

  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full lg:pt-[72px] pt-[68px] overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout