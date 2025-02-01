const assert = require("assert");
const { Browser, Builder, By } = require("selenium-webdriver");

describe("Pruebas del formulario de opiniones", () => {
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:3000/src/pages/contacto.html"); // URL del ontenida live server
    });

    it("El formulario debe mostrar mensajes de error si los campos de nombre, email, motivo y mensaje están vacíos", async () => {
        let botonSubmit = await driver.findElement(By.css(".btn"));  
        await driver.executeScript("arguments[0].scrollIntoView(true);", botonSubmit); 
        await driver.sleep(1000);
        await botonSubmit.click();

        let errorName = await driver.findElement(By.id("error-name")).getText();
        let errorEmail = await driver.findElement(By.id("error-email")).getText();
        let errorMotivo = await driver.findElement(By.id("error-motivo")).getText();
        let errorMensaje = await driver.findElement(By.id("error-mensaje")).getText();

        assert.equal(errorName, "El nombre es obligatorio.");
        assert.equal(errorEmail, "Ingrese un correo válido.");
        assert.equal(errorMotivo, "Seleccione el motivo de su mensaje.");
        assert.equal(errorMensaje, "Escribe tu mensaje.");
    });

    after(async () => {
        await driver.quit();
    });
});