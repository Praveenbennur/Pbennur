class LoginPage {
    constructor(page) {
        this.page = page;
        this.page.setDefaultTimeout(10000);
        console.log("Login page is launched successfully");
        this.userInput = page.locator("#user-name");
        this.passInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.credentialsDiv = page.locator("#login_credentials");
        this.passwordDiv = page.locator(".login_password");
    }

    async goTo() {
        await this.page.goto("https://www.saucedemo.com/");
        await this.userInput.waitFor({ state: 'visible' });
    }

    // Helper method to evaluate an XPath and return the trimmed string value
    async evaluateXPath(xpath) {
        return await this.page.evaluate(xp =>
            document.evaluate(xp, document, null, XPathResult.STRING_TYPE, null).stringValue.trim(), xpath);
    }

    async login() {

        // Wait for both required elements to be visible
        await Promise.all([
            this.credentialsDiv.waitFor({ state: 'visible' }),
            this.passwordDiv.waitFor({ state: 'visible' })
        ]);

        // Use helper to evaluate XPath expressions
        const [userName, password] = await Promise.all([
            this.evaluateXPath("//div[@class='login_credentials']/text()[1]"),
            this.evaluateXPath("//div[@class='login_password']/text()[1]")
        ]);


        await this.page.waitForSelector(".login_wrapper-inner");
        // Fill form fields in parallel

        await this.userInput.waitFor({ state: 'visible' });
        await this.userInput.fill(userName);
        await this.passInput.fill(password);


        console.log("Entered valid username and password");

        await this.loginButton.click();
        console.log("Successfully logged in..!");
    }

    async invalidLogin() {
        await this.userInput.fill("invalid");
        console.log("Entered invalid username");
        await this.passInput.fill("invalid");
        console.log("Entered invalid password");
        await this.loginButton.click();
        console.log("Clicked on login button");
    }
}

module.exports = { LoginPage };