const assert = require("assert");
const { Builder, Browser } = require("selenium-webdriver");
const ContactoPage = require("./pages-test/contacto");

describe("Pruebas del formulario de opiniones", () => {
    let driver;
    let contactPage;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        contactPage = new ContactoPage(driver);
        await contactPage.open();
    });

    it("El formulario debe mostrar mensajes de error si los campos están vacíos", async () => {
        await contactPage.submitForm();

        const errorName = await contactPage.getErrorMessage(contactPage.errorName);
        const errorEmail = await contactPage.getErrorMessage(contactPage.errorEmail);
        const errorMotivo = await contactPage.getErrorMessage(contactPage.errorMotivo);
        const errorMensaje = await contactPage.getErrorMessage(contactPage.errorMensaje);

        assert.strictEqual(errorName, "El nombre es obligatorio.");
        assert.strictEqual(errorEmail, "Ingrese un correo válido.");
        assert.strictEqual(errorMotivo, "Seleccione el motivo de su mensaje.");
        assert.strictEqual(errorMensaje, "Escribe tu mensaje.");
    });

    after(async () => {
        await driver.quit();
    });
});
