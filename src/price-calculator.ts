import { isToday } from "date-fns";
import { ProductType, UserType } from "./enums";

const ADDITIONAL_PRODUCT_PRICES = {
  [ProductType.NEW]: 25,
  [ProductType.OLD]: 35,
};

export const calculateRebateAmount = (
  productType: ProductType,
  userType: UserType,
  publishedDate: Date
) => {
  let rebate = 0;

  if (productType === ProductType.NEW && isToday(publishedDate)) {
    rebate += 10;
  }

  if (userType === UserType.COMPANY) {
    rebate += 5;
  }

  return rebate;
};

export const calculatePrice = (
  userType: UserType,
  productType: ProductType,
  basePrice: number,
  publishedDate: Date
) => {
  const additionalProductPrice = ADDITIONAL_PRODUCT_PRICES[productType];
  const rebate = calculateRebateAmount(productType, userType, publishedDate);

  // formula ``Product price + product type price – rebate``
  const price = basePrice + additionalProductPrice - rebate;
  return price;
};
