const assert = require("assert");
const { Browser, Builder, By, until, Select } = require("selenium-webdriver");

describe("Pruebas del formulario de opiniones", () => {
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:5501/src/pages/contacto.html");
    });

    it("El formulario debe enviarse correctamente con datos válidos", async () => {
        await driver.wait(until.elementLocated(By.id("name")), 5000);

        let nameField = await driver.findElement(By.id("name"));
        let emailField = await driver.findElement(By.id("email"));
        let motivoField = await driver.findElement(By.id("motivo"));
        let mensajeField = await driver.findElement(By.id("mensaje"));
        let botonSubmit = await driver.findElement(By.css(".btn"));

        let selectMotivo = new Select(motivoField);
        await selectMotivo.selectByValue("2");

        await nameField.sendKeys("Tyler Joseph");
        await emailField.sendKeys("tyler@gmail.com");
        await mensajeField.sendKeys("Mensaje de prueba para formulario con datos válidos");

        await driver.executeScript("arguments[0].scrollIntoView(true);", botonSubmit); 
        await driver.sleep(1000);
        await botonSubmit.click();

        await driver.wait(until.alertIsPresent(), 5000);
        let alertText = await driver.switchTo().alert().getText();
        assert.strictEqual(alertText, "¡Mensaje enviado con éxito!");
        await driver.switchTo().alert().accept();
    });

    after(async () => {
        await driver.quit();
    }); 
});
