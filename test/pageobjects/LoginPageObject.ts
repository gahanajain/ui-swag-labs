import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class LoginPage extends BasePage {

  get usernameInput() {
    return $('#user-name');
  }

  get passwordInput() {
    return $('#password');
  }

  get loginButton() {
    return $('#login-button');
  }

  get loginContainer() {
    return $('[data-test="login-container"]');
  }

  public async open() {
    await BasePage.open("https://www.saucedemo.com/");
  }

  async setUsername(username: string) {
    console.log(`- Entering username as ${username}`);
    await this.usernameInput.waitForDisplayed();
    return this.usernameInput.setValue(username);
  }

  async setPassword(password: string) {
    console.log('- Entering Password');
    await this.passwordInput.waitForDisplayed();
    return this.passwordInput.setValue(password);
  }

  async clickOnLoginButton() {
    console.log('- Clicking on Login Button')
    await this.loginButton.waitForClickable();
    return this.loginButton.click();
  }

  async waitForLoginPageToBeDisplayed() {
    console.log(
      '- Waiting for login page to be displayed',
    );
    return this.loginContainer.waitForDisplayed();
  }

  getVisibilityOfLoginPage() {
    console.log('- Getting the visibility of Login Page');
    return this.loginContainer.isDisplayed();
  }
}
export default new LoginPage();
