import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class PersonalInfoPage extends BasePage {

    get personalInfoContainer() {
        return $('.checkout_info_container');
    }

    get continueButton() {
        return $('#continue');
    }

    get firstNameInput() {
        return $('#first-name');
    }

    get lastNameInput() {
        return $('#last-name');
    }

    get zipCodeInput() {
        return $('#postal-code');
    }

    async waitForPersonalInfoContainerToBeDisplayed() {
        console.log(
            '- Waiting for Personal Info Container to be displayed',
        );
        return this.personalInfoContainer.waitForDisplayed();
    }

    async clickOnContinueButton() {
        console.log('- Clicking on Continue Button');
        await this.continueButton.waitForClickable();
        return this.continueButton.click();
    }

    async setFirstName(firstName: string) {
        console.log(`- Entering first name as ${firstName}`);
        await this.firstNameInput.waitForDisplayed();
        return this.firstNameInput.setValue(firstName);
    }

    async setLastName(lastName: string) {
        console.log(`- Entering last name as ${lastName}`);
        await this.lastNameInput.waitForDisplayed();
        return this.lastNameInput.setValue(lastName);
    }

    async setZipCode(zipCode: string) {
        console.log(`- Entering zip code as ${zipCode}`);
        await this.zipCodeInput.waitForDisplayed();
        return this.zipCodeInput.setValue(zipCode);
    }

}

export default new PersonalInfoPage();
