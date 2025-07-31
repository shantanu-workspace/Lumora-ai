import React from 'react'
import Navbar from '../components/navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonials from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools /> 
      <Testimonials />
      <Plan />
      <Footer />
    </>
  )
}

export default Home