import React from "react";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateCart , removeFromCart } from "@/store/cartSlice";
const CartItem = ({data}) => {
  const dispatch = useDispatch();
  const updateCartItem =(e,key)=>{
   let payload = {
    key,
    val: key==="quantity"? parseInt(e.target.value):e.target.value,
    id:data.id 
   };
   dispatch(updateCart(payload))
  }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
       <Image src={data.attributes.thumb.data.attributes.url} width={120} height={120} alt={data.attributes.title}/>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {data.attributes.title}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
           {data.attributes.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold mt-2 text-green-600">
            MRP : &#8377; {data.attributes.price}
          </div>
        </div>
        <div className="text-sm md:text-md font-medium text-black/[0.5] md:block">
        {data.attributes.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                <div className="flex items-center gap-1">
                    <div className="font-semibold">Size:</div>
                    <select className="hover:text-black" onChange={(e)=>updateCartItem(e,"selectedSize")}>
                       {data.attributes.size.data.map((item,i)=>(
                        <option value={item.size} key={i} disabled={!item.enabled ? true:false} selected={data.selectedSize===item.size}>
                          {item.size}
                        </option>
                       ))}
                    </select>
                </div>
                <div className="flex items-center gap-1">
                <div className="font-semibold">Quantity:</div>
                    <select className="hover:text-black" onChange={(e)=>updateCartItem(e,"quantity")}>
                        {Array.from({length:10},(_,i)=>i+1).map((q,i)=>{
                          return (
                            <option value={q} key={i} selected={data.quantity===q}>{q}</option>
                          )
                        })}
                    </select>
                </div>
            </div>

            <BsTrash title="Delete Product" className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
             onClick={()=>dispatch(removeFromCart({id:data.id}))}
            />

        </div>
      </div>
    </div>
  );
};

export default CartItem;
