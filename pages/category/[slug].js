import Wrapper from '@/components/Wrapper'
import React from 'react'
import ProductCard from '@/components/ProductCard'
const Category = ({category,products,slug}) => {
  return (
    <div className='w-full md-py-20'>
        <Wrapper>
         <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
         <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
            {category?.data?.[0]?.attributes?.name}

         </div>
        </div> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
      {
        products?.data?.map((product)=>(
          <ProductCard key={product?.id} data={product}/>
        ))
      }
     </div>  
        </Wrapper>
    </div>
  )
}

export default Category;


export async function getStaticPaths() {
  let res = await fetch('http://127.0.0.1:1337/api/categories?populate=*');
  let category = await res.json();
  // console.log(category)
  const paths = category?.data?.map((c)=>({
    params :{
      slug: c.attributes.slug
    }
     
  }))

  return {
    paths,
    fallback:false
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params:{slug}}) {
  let res = await fetch(`http://127.0.0.1:1337/api/categories?filters[slug][$eq]=${slug}`)
  let category = await res.json()
  let response = await fetch(`http://127.0.0.1:1337/api/products?populate=*&[filters][categories][slug][$eq]=${slug}`);
  let products = await response.json()
  return {
    // Passed to the page component as props
    props: { category,products,slug },
  }
}

