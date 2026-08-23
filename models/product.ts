import { expect } from 'mobilewright';

export class Product {
    productName: string;
    productAmount: number;
    productPrice: string;

    constructor(productName: string, productAmount: number, productPrice: string) {
        this.productName = productName;
        this.productAmount = productAmount;
        this.productPrice = productPrice;
    }

    /**
     * Returns a plain-object copy of this product (no class prototype),
     * safe to use with deep-equality assertions against POJOs (e.g. data
     * loaded from JSON providers).
     */
    normalize(): { productName: string; productAmount: number; productPrice: string } {
        return {
            productName: this.productName,
            productAmount: this.productAmount,
            productPrice: this.productPrice,
        };
    }

    /**
     * Asserts that `actual` matches `expected` by value, regardless of
     * whether either side is a Product instance or a plain object.
     */
    static assertEqual(actual: Product, expected: Product): void {
        expect(Product.normalizeOne(actual)).toEqual(Product.normalizeOne(expected));
    }

    /**
     * Asserts that a list of products matches expected products by value,
     * in order, regardless of whether either side is a Product instance or
     * a plain object.
     */
    static assertListEqual(actual: Product[], expected: Product[]): void {
        expect(actual.map(Product.normalizeOne)).toEqual(expected.map(Product.normalizeOne));
    }

    private static normalizeOne(product: Product) {
        return {
            productName: product.productName,
            productAmount: product.productAmount,
            productPrice: product.productPrice,
        };
    }
}