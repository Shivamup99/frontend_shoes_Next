import ProDetailCarousel from "@/components/ProDetailCarousel";
import RelatedProduct from "@/components/RelatedProduct";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { getDiscount } from "@/utils/helper";
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({product,products}) => {
    const p = product?.data?.[0]?.attributes;
    const [selectedSize,setSelectedSize] = useState();
    const [showError,setShowError] = useState(false);
    const dispatch = useDispatch();

    const notify =()=>{
      toast.success('Success. Check your cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  return (
    <div className="w-full md:py-20">
      <ToastContainer/>
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left body start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProDetailCarousel images={p.image.data}/>
          </div>

          {/* right start */}
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2 leading-tight">
               {p.name}
            </div>
            <div className="text-lg font-semibold mb-5">
            {p.subtitle}
            </div>
            <div className="flex items-center text-black/[0.5]">
                <p className="mr-2 text-lg font-semibold">MRP : &#8377;{p.price}</p>
                {
                  p.originalprice && (
                    <>
                     <p className="text-base font-medium line-through">&#8377;{p.originalprice}</p>
                     <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscount(p.originalprice,p.price)} % off
                     </p>
                    </>
                   
                  )
                }
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
            </div>
            <div className="mb-10">
                <div id="scrollUp" className="flex justify-between mb-2">
                    <div className="text-md font-semibold">Select Size</div>
                    <div className="text-md font-medium text-black/[0.5] cursor-pointer">Select Guide</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                {
                    p.size.data.map((item,i)=>(
                        <div key={i} className={`border rounded-md text-center py-3 font-medium ${item.enabled ? "hover:border-black cursor-pointer":"cursor-not-allowed bg-black/[0.1] opacity-50"} ${ selectedSize===item.size ?"border-green-800":""}`}
                        onClick={()=>{
                            setSelectedSize(item.size)
                            setShowError(false)
                        }}
                        >
                         {item.size}
                        </div>
                    ))
                }
                </div>
                {
                 showError && (
                <div className="text-red-500 mt-1">Size selection is required</div>
                 )
                }
            </div>
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-mrdium transition-transform active:scale-95 mb-3"
             onClick={()=>{
                if(!selectedSize){
                    setShowError(true)
                    document.getElementById("scrollUp").scrollIntoView({
                        block:"center",
                        behavior:"smooth" 
                    })
                }else{
                  dispatch(addToCart({
                    ...product?.data?.[0],
                    selectedSize,
                    oneQuantityPrice:p.price
                  }));
                  notify();
                }
              
             }}    
            >Add to Cart</button>
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Wishlist
                <BsHeart size={20}/>
            </button>
            <div>
                <div className="text-lg font-bold mb-5">
                    Product Description
                </div>
                <div className="text-md mb-5">
                    <ReactMarkdown>
                    {p.description}
                    </ReactMarkdown>    
                </div>
            </div>
          </div>
        </div>
        <RelatedProduct products={products}/>
      </Wrapper>
    </div>
  );
};

export default ProductDetail;


export async function getStaticPaths() {
    let res = await fetch('http://127.0.0.1:1337/api/products?populate=*');
    let products = await res.json();
    // console.log(products)
    const paths = products?.data?.map((p)=>({
      params :{
        slug: p.attributes.slug
      }
       
    }))
  
    return {
      paths,
      fallback:false
    }
  }

  export async function getStaticProps({params:{slug}}) {
    let res = await fetch(`http://127.0.0.1:1337/api/products?populate=*&filters[slug][$eq]=${slug}`)
    let product = await res.json()
    // ne means not equal of same cat
    let response = await fetch(`http://127.0.0.1:1337/api/products?populate=*&[filters][slug][$ne]=${slug}`);
    let products = await response.json()
    return {
      // Passed to the page component as props
      props: { product,products},
    }
  }
  
