import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

export default function Home({products}) {
  
  return (
   <main>
    <Banner/>
    <Wrapper>
      <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
       <div className="text-[28px] md:text-[32px] mb-5 font-semibold leading-tight">
       Cushioning for Your MILES
       </div>
      <div className="text-md md:text-xl font-bold">
      STORIES, STYLES AND SPORTSWEAR AT ADIDAS, SINCE 1949
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
      {products?.data?.map((product)=>(
        <ProductCard key={product.id} data={product}/>
      ))}
     </div>
    </Wrapper>
    
   </main>
  )
}


export async function  getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://127.0.0.1:1337/api/products?populate=*')
  const products = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  }
}
