import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCart, BsHeart, BsTextLeft, BsX } from "react-icons/bs";
import { useSelector } from "react-redux";

import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Wrapper from "./Wrapper";

const Header = () => {
  const [show, setShow] = useState("translate-y-0");
  const [showCat, setShowCat] = useState(false);
  const [mobile,setMobile] = useState(false);
  const [lastScrollY , setLastScrollY] = useState(0);
  const [categories,setCategories] = useState([]);

  const {cartItems} = useSelector((state)=>state.cart)

  useEffect(()=>{
    fetchCategory();
  },[]);

  const fetchCategory = async()=>{
    let res = await fetch('http://127.0.0.1:1337/api/categories?populate=*')
    let {data} = await res.json();
    setCategories(data);
  }

  const controlNav =()=>{
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobile){
        setShow('-translate-y-[80px]')
      } else{
         setShow('shadow-sm')
      }
    } else{
      setShow('translate-y-0')
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll", controlNav);
    return ()=>{
      window.removeEventListener("scroll", controlNav);
    }
  },[lastScrollY])

  return (
    <div
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" alt="dd" className="w-[40px] md:w-[60px]" />
        </Link>
        <Menu showCat={showCat} setShowCat={setShowCat} categories={categories}/>
        {mobile && 
        <MenuMobile showCat={showCat} setShowCat={setShowCat} setMobile={setMobile} categories={categories}/>
        }
         
        {/* icons start */}
        <div className="flex items-center gap-4 text-black">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <BsHeart className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              59
            </div>
          </div>
          <Link href='/cart'>
        
             <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
             <BsCart className="text-[15px] md:text-[20px]" />
             {cartItems.length > 0 && (
             <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-green-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
               {cartItems.length}
             </div>
              )}
           </div>
         
          </Link>
        
          {/* mobile icon  */}
          <div className="w-8 md:w-12 h-8 md:h-12 md:hidden rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-3">
            {mobile ? (
              <BsX className="text-[18px]" onClick={()=>setMobile(false)}/>
            ):(
              <BsTextLeft className="text-[20px]" onClick={()=>setMobile(true)}/>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
