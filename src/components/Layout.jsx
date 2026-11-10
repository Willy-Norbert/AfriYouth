import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Newsletter from './Newsletter'

// Wraps every page with the navbar, newsletter and footer.
export default function Layout() {
  const { pathname, hash } = useLocation()

  // Start each page at the top, or at the #section in the link
  useEffect(() => {
    const target = hash && document.querySelector(hash)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-sun focus:p-3">Skip to content</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <Newsletter />
      <Footer />
    </>
  )
}
