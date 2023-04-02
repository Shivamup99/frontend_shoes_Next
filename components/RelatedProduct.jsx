import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
const RelatedProduct = ({products}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-[40px] md:mt-[90px] mb-[90px] md:mb-0">
      <div className="text-2xl font-bold mb-5">YOU MAY ALSO LIKE </div>
      <Carousel responsive={responsive} infinite={true} containerClass='-mx-[10px]' itemClass="px-[10px]">
      {products?.data?.map((product)=>(
        <ProductCard key={product.id} data={product}/>
      ))}
      </Carousel>
      ;
    </div>
  );
};

export default RelatedProduct;
