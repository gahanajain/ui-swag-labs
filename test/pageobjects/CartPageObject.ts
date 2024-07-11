import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class CartPage extends BasePage {

    get cartList() {
        return $('.cart_list');
    }

    get checkoutButton() {
        return $('[data-test="checkout"]');
    }

    async waitForCartListToBeDisplayed() {
        console.log(
            '- Waiting for Cart List to be displayed',
        );
        return this.cartList.waitForDisplayed();
    }

    async clickOnCheckoutButton() {
        console.log('- Clicking on Checkout Button');
        await this.checkoutButton.waitForClickable();
        return this.checkoutButton.click();
    }
}

export default new CartPage();
