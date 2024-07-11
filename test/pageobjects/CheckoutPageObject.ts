import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class CheckoutPage extends BasePage {

    get paymentInfoValue() {
        return $('[data-test="payment-info-value"]');
    }

    get shippingInfoValue() {
        return $('[data-test="shipping-info-value"]');
    }

    get subtotalValue() {
        return $('[data-test="subtotal-label"]');
    }

    get finishButton() {
        return $('#finish');
    }

    get checkoutSummaryContainer() {
        return $('.checkout_summary_container');
    }

    async waitForCheckoutSummaryContainerToBeDisplayed() {
        console.log(
            '- Waiting for Checkout Summary Container to be displayed',
        );
        return this.checkoutSummaryContainer.waitForDisplayed();
    }

    async clickOnFinishButton() {
        console.log('- Clicking on Finish Button');
        await this.finishButton.waitForClickable();
        return this.finishButton.click();
    }

    async getPaymentInfoValue() {
        console.log('- Getting text of payment info value')
        await this.paymentInfoValue.waitForDisplayed();
        return this.paymentInfoValue.getText();
    }

    async getShippingInfoValue() {
        console.log('- Getting text of shipping info value')
        await this.shippingInfoValue.waitForDisplayed();
        return this.shippingInfoValue.getText();
    }

    async getSubtotalValue() {
        console.log('- Getting text of subtotal price')
        await this.subtotalValue.waitForDisplayed();
        return this.subtotalValue.getText();
    }

}

export default new CheckoutPage();
