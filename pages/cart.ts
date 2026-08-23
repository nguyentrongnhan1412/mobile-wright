import { Screen } from "mobilewright";
import { Base } from "./base";
import { Element } from "@core/element/element";
import { Product } from "@models/product";


export class Cart extends Base {
    
    readonly cartProductName : Element;
    readonly cartProductPrice: Element;
    readonly cartProductAmount: Element;

    constructor(screen: Screen) {
       super(screen);
       this.cartProductName = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/titleTV')});
       this.cartProductPrice = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/priceTV')});
       this.cartProductAmount = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/noTV')});
    }

    async getProduct(index: number): Promise<Product> {
        const name = await this.cartProductName.nth(index).getText();
        const price = await this.cartProductPrice.nth(index).getText();
        const amount = await this.cartProductAmount.nth(index).getText();

        return new Product(name, parseInt(amount, 10), price);
    }
}