import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders the full page, metadata, assets, and working anchor links", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Phần mềm quản lý tiệm giặt/);
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of ["san-pham", "tinh-nang", "quy-trinh", "bat-dau"])
    await expect(page.locator(`#${id}`)).toBeVisible();
  const badLinks = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter(
          (href) => href !== "#" && !document.getElementById(href.slice(1)),
        ),
    );
  expect(badLinks).toEqual([]);
  const photo = page.locator(".workflow-photo img");
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      photo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  expect(errors).toEqual([]);
});

test("hero presents a static service flow without dashboard controls", async ({
  page,
}) => {
  await page.goto("/");
  const visual = page.locator(".service-flow-visual");
  await expect(visual).toBeVisible();
  await expect(visual.locator("figcaption")).toContainText(
    "Một đơn hàng, đi xuyên suốt quy trình.",
  );
  await expect(visual.locator(".service-ticket")).toContainText("NP—0128");
  await expect(visual.locator(".service-ticket")).toContainText("Đang xử lý");
  await expect(
    visual.locator('button, input, select, [role="tab"]'),
  ).toHaveCount(0);
});

test("order dialog traps focus, closes on Escape, and restores the trigger", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Tìm hiểu qua một đơn mẫu",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("NP-0128");
  await expect(dialog).toContainText("Còn phải thu");
  await expect(
    page.getByRole("button", { name: "Đóng chi tiết đơn" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Đã hiểu", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Đã hiểu", exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test("workflow disclosures and mobile navigation work", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Mở menu" }).click();
    const menu = page.getByRole("navigation", { name: "Điều hướng di động" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Cách hoạt động" }).click();
    await expect(menu).not.toBeVisible();
  }
  const secondStep = page.locator(".workflow-step").nth(1);
  await secondStep.locator("summary").click();
  await expect(secondStep).toHaveAttribute("open", "");
  await expect(page.locator(".workflow-step").first()).not.toHaveAttribute(
    "open",
    "",
  );
});

test("has no horizontal overflow at narrow, tablet, and desktop widths", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBeTruthy();
  }
});

test("meets automated WCAG AA checks on page and dialog", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const scan = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
  expect((await scan()).violations).toEqual([]);
  await page.getByRole("button", { name: "Tìm hiểu qua một đơn mẫu" }).click();
  expect((await scan()).violations).toEqual([]);
});
