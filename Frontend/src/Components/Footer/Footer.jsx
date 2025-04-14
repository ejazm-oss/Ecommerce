import { motion } from 'framer-motion';
import {slideIn, scaleUp } from '../Animation/Animation';
import logo from "/logo.gif"

export default function Footer() {
  return (
    <motion.footer 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: false, amount: 0.2 }} 
      className="p-6 md:p-12 text-black"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <motion.div variants={slideIn}>
          <img className="w-40" src={logo} alt="logo" />
          <p className="mt-2">Address: xxxxxxxx xxxxx xxxxx</p>
          <p>Email: example@info.com</p>
          <p>Phone: (064) 332-1233</p>
        </motion.div>

   
        <motion.div variants={slideIn}>
          <h3 className="text-xl font-semibold">Our Stores</h3>
          <ul className="mt-4 space-y-2">
            {["New York", "London SF", "Edinburgh", "Los Angeles", "Chicago", "Las Vegas"].map((store, index) => (
              <li key={index}>{store}</li>
            ))}
          </ul>
        </motion.div>

        
        <motion.div variants={slideIn}>
          <h3 className="text-xl font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2">
            {["Privacy Policy", "Returns", "Terms & Conditions", "Contact Us", "Latest News", "Our Sitemap"].map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      
      
      <motion.div variants={scaleUp} className="mt-8 border-t pt-4 text-center text-gray-600">
        <p>&copy; 2025 <span className="text-red-500">Online Store</span> All Rights Reserved.</p>
      </motion.div>
    </motion.footer>
  );
}
