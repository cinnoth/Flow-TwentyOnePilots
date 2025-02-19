/* const assert = require("assert");
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Pruebas del carrito de compras", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:3000/src/pages/compras.html");
    });
    
    it("Verificar que un producto se elimina correctamente del carrito", async () => {
        let primerProducto = await driver.findElement(By.css(".productos__container-card:nth-child(1) .addCarBtn"));
        await driver.executeScript("window.scrollBy(0, arguments[0].getBoundingClientRect().top - 100);", primerProducto);
        await driver.sleep(500);
        await primerProducto.click();

        let segundoProducto = await driver.findElement(By.css(".productos__container-card:nth-child(2) .addCarBtn"));
        await driver.executeScript("window.scrollBy(0, arguments[0].getBoundingClientRect().top - 100);", segundoProducto);
        await driver.sleep(500);
        await segundoProducto.click();

        let botonCarrito = await driver.findElement(By.id("boton-carrito"));
        await botonCarrito.click();

        let productosEnCarrito = await driver.findElements(By.css(".listado-carrito .articulo"));
        assert.equal(productosEnCarrito.length, 2, "Deben haber 2 productos en el carrito");

        await driver.wait(until.elementLocated(By.css(".quitar")), 3000);

        let botonesEliminar = await driver.findElements(By.css(".quitar"));

        let nombreProductoAEliminar = await productosEnCarrito[0].getText();
        await botonesEliminar[0].click();

        let productosDespues = await driver.findElements(By.css(".listado-carrito .articulo"));
        assert.equal(productosDespues.length, 1, "Debe quedar solo 1 producto en el carrito");

        let nombreProductoRestante = await productosDespues[0].getText();
        assert.notEqual(nombreProductoAEliminar, nombreProductoRestante, "El producto eliminado no debe aparecer en el carrito");

    })

    after(async () => {
        await driver.quit();
   
    }) 
});  */