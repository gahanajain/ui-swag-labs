import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class CheckoutCompletePage extends BasePage {

    get checkoutCompleteContainer() {
        return $('.checkout_complete_container');
    }

    get completeHeader() {
        return $('[data-test="complete-header"]');
    }


    async waitForCheckoutCompleteContainerToBeDisplayed() {
        console.log(
            '- Waiting for Checkout Complete Container to be displayed',
        );
        return this.checkoutCompleteContainer.waitForDisplayed();
    }

    async getCompleteHeaderValue() {
        console.log('- Getting text of complete header value')
        await this.completeHeader.waitForDisplayed();
        return this.completeHeader.getText();
    }

}

export default new CheckoutCompletePage();
