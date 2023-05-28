const getDiscountedPrice = (price, discount, withUnit = true) => {
  const discountedPrice = price - price * (discount / 100);

  return withUnit ? '$' + discountedPrice.toFixed(2) : +discountedPrice.toFixed(2);
};

export default getDiscountedPrice;
