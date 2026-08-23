import { Screen } from "mobilewright";
import { Base } from "./base";
import { Element } from "@core/element/element";


export class ProductDetails extends Base {
    readonly productName : Element;
    readonly productPrice : Element;
    readonly productAmount : Element;
    readonly increaseAmountButton : Element;
    readonly decreaseAmountButton : Element;
    readonly addToCartButton : Element;

    constructor(screen: Screen) {
       super(screen);
       this.productName = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/productTV')});
       this.productPrice = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/priceTV')});
       this.productAmount = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/noTV')});
       this.increaseAmountButton = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/plusIV')});
       this.decreaseAmountButton = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/minusIV')});
       this.addToCartButton = new Element({locator: screen.getByLabel('Tap to add product to cart')});
    }

    async addProductToCartWithDefinedAmountAndReturn(amount: number) : Promise<void> {
        for (let i = 1; i < amount; i++){
            await this.increaseAmountButton.tap();
        }
        await this.addToCartButton.tap();
        await this.screen.goBack();
    }

    async getProductPrice() : Promise<string> {
        return await this.productPrice.getText();
    }
}