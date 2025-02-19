const { By, until } = require("selenium-webdriver");

class ContactoPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "http://127.0.0.1:3000/src/pages/contacto.html";
        this.botonSubmit = By.css(".btn");
        this.errorName = By.id("error-name");
        this.errorEmail = By.id("error-email");
        this.errorMotivo = By.id("error-motivo");
        this.errorMensaje = By.id("error-mensaje");
    }

    async open() {
        await this.driver.get(this.url);
    }

    async submitForm() {
        let submitBtn = await this.driver.findElement(this.botonSubmit);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
        await this.driver.wait(until.elementIsVisible(submitBtn), 5000);
        await this.driver.sleep(1000);
        await submitBtn.click();
    }

    async getErrorMessage(locator) {
        await this.driver.wait(until.elementLocated(locator), 2000);
        return await this.driver.findElement(locator).getText();
    }
}

module.exports = ContactoPage;