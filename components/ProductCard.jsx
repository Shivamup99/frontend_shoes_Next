import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getDiscount } from '@/utils/helper'
const ProductCard = ({data:{attributes:product,id}}) => {
  return (
    <Link href={`/product/${product.slug}`} className='bg-white transform overflow-hidden duration-200 hover:scale-105 hover:border-[1px] cursor-pointer'>
        <Image src={product.thumb.data.attributes.url} width={500} height={500} alt={product.title} className='w-full' />
        <div className="p-4 text-black/[0.9]">
            <h2 className='text-lg font-medium'>{product.title}</h2>
            <div className="flex items-center text-black/[0.5]">
                <p className="mr-2 text-lg font-semibold">&#8377;{product.price}</p>
                {
                  product.originalprice && (
                    <>
                     <p className="text-base font-medium line-through">&#8377;{product.originalprice}</p>
                     <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscount(product.originalprice,product.price)} % off
                     </p>
                    </>
                   
                  )
                }
            </div>
        </div>
    </Link>
  )
}

export default ProductCard