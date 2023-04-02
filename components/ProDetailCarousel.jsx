import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ProDetailCarousel = ({images}) => {
  return (
    <div className='text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]'>
        <Carousel showStatus={false} autoPlay={true} infiniteLoop={true}  showIndicators={false} thumbWidth={60} className='productCarousel'>
           {
            images?.map((img)=>(
              <img src={img?.attributes?.url} key={img.id} alt={img?.attributes?.name}/>
            ))
           }
        </Carousel>
    </div>
  )
}

export default ProDetailCarousel