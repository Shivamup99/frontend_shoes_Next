import CartItem from '@/components/CartItem'
import Wrapper from '@/components/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const cart = () => {
  const {cartItems} = useSelector((state)=>state.cart);
  const subTotal = useMemo(()=>{
    return cartItems.reduce((total, val)=> total + val.attributes.price,0)
  },[cartItems])
  return (
    <>
    <div className='w-full md:py-20'>

      <Wrapper>
        {
          cartItems.length > 0 && (
            <>
            <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                  Your Shopping Cart
                </div>
              </div><div className='flex flex-col lg:flex-row gap-12 py-10'>
                  <div className='flex-[2]'>
                    <div className='text-lg font-bold'>Cart Items </div>
                    {cartItems.map((item)=>(
                      <CartItem key={item.id} data={item}/>
                    ))}
                  </div>
                  <div className='flex-[1]'>
                    <div className='text-lg font-bold'>Cart Summary </div>
                    <div className='p-5 my-5 bg-black/[0.3] rounded-xl'>
                      <div className='flex justify-between'>
                        <div className='uppercase text-md md:text-lg font-medium text-black'>Subtotal</div>
                        <div className='text-md md:text-lg font-bold text-green-800'>
                        &#8377;{subTotal}
                        </div>
                      </div>
                      <div className='text-sm md:text-md py-5 border-t mt-5'>
                        The subtotal reflects the total price of your order, including duties and taxes, befor any applicable discounts. It does not include delivery costs and international transactions fees.
                      </div>
                    </div>

                    <Link href='/success'className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8" >
                      Checkout
                    </Link>
                  </div>
                </div>
                </>
          )
        }
       

         {/* empty screen */}
         {cartItems.length < 1 && (
           <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14px'>
           <Image src='/empty-cart.jpg' height={350} width={350} className='w-[350px] md:w-[400px]' alt='jdj'/>
            <span className='text-xl font-bold'>Your cart is empty</span>
            <span className='text-center mt-4'>
             Looks like you have not added anything in your cart.
             <br/>
             Go ahead and exploure top categories.
            </span>
            <Link href='/' className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8'>
             Continue Shopping
            </Link>
          </div> 
         )}
      </Wrapper>
    </div>
    </>
    
  )
}

export default cart