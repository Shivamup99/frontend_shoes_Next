export const getDiscount =(originalPrice,price)=>{
   let discount = originalPrice - price;
   let discountPercent = (discount/originalPrice)*100;
   return discountPercent.toFixed(1);
}