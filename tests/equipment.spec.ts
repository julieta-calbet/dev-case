import { expect, test } from "@playwright/test";

test.describe("Equipments and Orders", () => {
  test("Equipment form fields are required and correct", async ({ page }) => {
    await page.goto("");

    await page.getByRole("button", { name: "Add new equipment" }).click();

    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(page.locator("span.error").first()).toHaveText(
      /Name is required/
    );
  });

  test("Validate equipment has being created", async ({ page }) => {
    await page.goto("");

    await page.getByRole("button", { name: "Add new equipment" }).click();

    await page.getByLabel("name").fill("Machine 1");

    await page.getByLabel("Winding up time*").fill("2");

    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(await page.locator("td.name").last().innerText()).toBe(
      "Machine 1"
    );
  });

  // TODO: It passes in test exporer but not when running tests by command...
  // test("Validate orders can be asigned to an equipment", async ({ page }) => {
  //   await page.goto("");

  //   await page.getByRole("button", { name: "Add new order" }).last().click();

  //   await page.getByLabel("name").fill("Order 1");

  //   await page.getByLabel("Production time*").fill("2");

  //   await page.getByRole("button", { name: "Confirm" }).click();

  //   const equipmentId = await page.locator("td.id").last().innerText();

  //   await page.goto(`/equipment/${equipmentId}`);

  //   await expect(page.getByText("Order 1", { exact: true })).toBeVisible();
  // });
});
