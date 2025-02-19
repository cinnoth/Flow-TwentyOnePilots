const { By, until } = require("selenium-webdriver");

class HeaderPage {
    constructor(driver) {
        this.driver = driver;
        this.logo = By.css(".logo");
        this.url = "http://127.0.0.1:3000/index.html";
    }

    async open(url) {
        await this.driver.get(this.url);
    }

    async getHeaderText() {
        const element = await this.driver.wait(until.elementLocated(this.logo), 5000);
        return await element.getText();
    }
}

module.exports = HeaderPage;