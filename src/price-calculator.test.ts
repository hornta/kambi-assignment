import { expect } from "@jest/globals";
import { startOfToday, endOfYesterday } from "date-fns";
import { ProductType, UserType } from "./constants";
import { calculatePrice, calculateRebateAmount } from "./price-calculator";

describe("price calculator", () => {
  describe("calculatePrice()", () => {
    it("price 1, user NORMAL, product NEW", () => {
      const userType = UserType.NORMAL;
      const productType = ProductType.NEW;
      const basePrice = 1;
      const publishedDate = new Date();

      const price = calculatePrice(
        userType,
        productType,
        basePrice,
        publishedDate
      );
      expect(price).toBe(16);
    });

    it("price 6, user COMPANY, product OLD", () => {
      const userType = UserType.COMPANY;
      const productType = ProductType.OLD;
      const basePrice = 6;
      const publishedDate = new Date();

      const price = calculatePrice(
        userType,
        productType,
        basePrice,
        publishedDate
      );
      expect(price).toBe(36);
    });
  });

  describe("calculateRebateAmount()", () => {
    describe("published today", () => {
      it("product NEW, user NORMAL", () => {
        const productType = ProductType.NEW;
        const userType = UserType.NORMAL;

        const price = calculateRebateAmount(
          productType,
          userType,
          startOfToday()
        );
        expect(price).toEqual(10);
      });

      it("product NEW, user COMPANY", () => {
        const productType = ProductType.NEW;
        const userType = UserType.COMPANY;

        const price = calculateRebateAmount(
          productType,
          userType,
          startOfToday()
        );
        expect(price).toEqual(15);
      });

      it("product OLD, user NORMAL", () => {
        const productType = ProductType.OLD;
        const userType = UserType.NORMAL;

        const price = calculateRebateAmount(
          productType,
          userType,
          startOfToday()
        );
        expect(price).toEqual(0);
      });

      it("product OLD, user COMPANY", () => {
        const productType = ProductType.OLD;
        const userType = UserType.COMPANY;

        const price = calculateRebateAmount(
          productType,
          userType,
          startOfToday()
        );
        expect(price).toEqual(5);
      });
    });

    describe("published before today", () => {
      it("product NEW, user NORMAL", () => {
        const productType = ProductType.NEW;
        const userType = UserType.NORMAL;

        const price = calculateRebateAmount(
          productType,
          userType,
          endOfYesterday()
        );
        expect(price).toEqual(0);
      });

      it("product NEW, user COMPANY", () => {
        const productType = ProductType.NEW;
        const userType = UserType.COMPANY;

        const price = calculateRebateAmount(
          productType,
          userType,
          endOfYesterday()
        );
        expect(price).toEqual(5);
      });

      it("product OLD, user NORMAL", () => {
        const productType = ProductType.OLD;
        const userType = UserType.NORMAL;

        const price = calculateRebateAmount(
          productType,
          userType,
          endOfYesterday()
        );
        expect(price).toEqual(0);
      });

      it("product OLD, user COMPANY", () => {
        const productType = ProductType.OLD;
        const userType = UserType.COMPANY;

        const price = calculateRebateAmount(
          productType,
          userType,
          endOfYesterday()
        );
        expect(price).toEqual(5);
      });
    });
  });
});
