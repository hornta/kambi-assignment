import { ProductType, UserType } from "./enums";
import { calculatePrice } from "./price-calculator";

const userType = UserType.COMPANY;
const productType = ProductType.NEW;
const price = 100;
const publishedDate = new Date();

const calculatedPrice = calculatePrice(
  userType,
  productType,
  price,
  publishedDate
);

console.log(`Calculated price: ${calculatedPrice}`);
