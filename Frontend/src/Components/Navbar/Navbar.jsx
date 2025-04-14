import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdCart } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.gif";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slice/authSlice";
import { toast } from "react-toastify";
import { getCategories } from "../../redux/Slice/categorySlice";

const getNavItems = (categories = []) => {
  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    link: `/product/${cat.name}`,
  }));

  return [
    { label: "Home", link: "/" },
    {
      label: "Shop",
      children: [{ label: "All Products", link: "/products" }, ...categoryItems],
    },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];
};

const Navbar = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const {category} = useSelector((state) => state.category);
  const menuItems = getNavItems(category);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? "shadow-lg bg-white text-black"
            : "bg-transparent text-gray-400"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-20">
            <img className="w-40" src={logo} alt="Logo" />
            <div className="hidden md:flex gap-6">
              {menuItems.map((item, i) => (
                <Dropdown key={i} item={item} />
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setCartOpen(true)} className="cursor-pointer">
                <IoMdCart size={24} />
              </button>
              {cartItems.length > 0 && user && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              {user ? (
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <span className="bg-orange-400 text-white rounded-full px-[10px] py-1 text-sm font-semibold uppercase">
                      {user?.name?.split(" ")[0][0]}
                      {user?.name?.split(" ")[1]?.[0] || ""}
                    </span>
                    <IoIosArrowDown className="ml-1" />
                  </div>

                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-40 opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity duration-300">
                    <Link to="/profile" className="block py-1 px-3 hover:bg-gray-100 transition">Profile</Link>
                    <Link to="/address" className="block py-1 px-3 hover:bg-gray-100 transition">Address</Link>
                    <Link to="/MyOrder" className="block py-1 px-3 hover:bg-gray-100 transition">My Order</Link>
                    <button onClick={handleLogout} className="block py-1 px-3 text-red-500 hover:bg-gray-100 transition">Logout</button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="cursor-pointer transition">Login /</Link>
                  <Link to="/signup" className="transition">Register</Link>
                </>
              )}
            </div>
          </div>

          <FiMenu
            onClick={() => setMenuOpen(true)}
            className="text-2xl md:hidden cursor-pointer transition-transform hover:scale-110"
          />

          <AnimatePresence>
            {isMenuOpen && <MobileNav closeMenu={() => setMenuOpen(false)} navItems={menuItems} />}
          </AnimatePresence>
        </div>
      </nav>
      <Cart isCartOpen={isCartOpen} setCartOpen={setCartOpen} user={user} />
    </>
  );
};

const Dropdown = ({ item }) => (
  <div className="relative group">
    <Link
      to={item.link}
      className="flex items-center gap-2 cursor-pointer hover:text-black transition"
    >
      {item.label}
      {item.children && (
        <IoIosArrowDown className="transition-transform group-hover:rotate-180 duration-500" />
      )}
    </Link>

    {item.children && (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bg-white shadow-md rounded mt-2 py-2 w-40 hidden group-hover:block z-20"
        >
          {item.children.map((child, i) => (
            <Link
              key={i}
              to={child.link}
              className="block px-4 py-2 hover:bg-gray-100 transition"
            >
              {child.label}
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    )}
  </div>
);

const MobileNav = ({ closeMenu, navItems }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex justify-end lg:hidden z-50"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white w-2/3 h-full p-4 shadow-lg"
      >
        <AiOutlineClose
          onClick={() => {
            closeMenu();
            setOpenDropdown(null);
          }}
          className="text-2xl text-black cursor-pointer"
        />

        <div className="flex flex-col gap-4 mt-4">
          {navItems.map((item, i) => (
            <div key={i} className="flex flex-col">
              <Link
                to={item.link}
                onClick={() => {
                  item.children
                    ? setOpenDropdown(openDropdown === i ? null : i)
                    : closeMenu();
                }}
                className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded"
              >
                {item.label}
                {item.children && (
                  <IoIosArrowDown
                    className={`transition-transform ${
                      openDropdown === i ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
              {item.children && openDropdown === i && (
                <div className="flex flex-col bg-gray-100 rounded mt-1">
                  {item.children.map((child, j) => (
                    <Link
                      key={j}
                      to={child.link}
                      onClick={closeMenu}
                      className="px-6 py-2 text-gray-700 hover:bg-gray-200 transition"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Link to={"/login"} onClick={closeMenu} className="text-gray-500 hover:text-black transition">
            Login
          </Link>
          <Link
            to={"/signup"}
            onClick={closeMenu}
            className="border text-gray-500 border-gray-500 px-4 py-2 rounded hover:border-black hover:text-black transition"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
