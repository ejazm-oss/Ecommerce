import React from 'react'
import BannerSection from '../Banner/BannerSection'
import ProductList from '../../Pages/ProductList'

const Product = () => {
  return (
    <section>
       <BannerSection title={"Shop List"} home={"Home"} shop={"Shop List"}/>
       <ProductList/>
    </section>
  )
}

export default Product