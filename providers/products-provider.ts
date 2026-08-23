import { Product } from '@models/product';
import { JsonDataStore } from './json-data-store';

const productStore = new JsonDataStore<Product>('product.json');


export const ProductsProvider = {
    getProduct(key: string): Product {
        return productStore.get(key);
    },

    getProducts(keys: string[]): Product[] {
        return keys.map((key) => productStore.get(key));
    },
};