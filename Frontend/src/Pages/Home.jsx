import React, { useEffect } from 'react'
import HeroSection from '../Components/Home/HeroSection'
import Banner from '../Components/Home/Banner'
import FashionSection from '../Components/Home/FashionSection'
import Marquee from '../Components/Home/Marquee'
import Card from '../Components/Card/Card'
import Sale from '../Components/Home/Sale'
import Testimonial from '../Components/Home/Testimonial'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);
  return (
    <div>
      <HeroSection />
      <Banner/>
      <FashionSection/>
      <Marquee/>
      <Card/>
      {/* <Sale/> */}
      <Testimonial/>
    </div>
  )
}

export default Home
