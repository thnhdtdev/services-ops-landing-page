import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Scroll the pinned split stage to a fraction of its travel.
async function stageTo(page: Page, p: number) {
  await page.evaluate((p) => {
    const act = document.getElementById("tiem")!;
    const top = act.getBoundingClientRect().top + scrollY;
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, top + (act.offsetHeight - innerHeight) * p);
  }, p);
  await page.waitForTimeout(400);
}

test("metadata, Vietnamese structure and honest actions", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/ServiceOps/);
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Gọn trong một chỗ");
  // No self-serve sign-up exists yet, so no control may offer one.
  const actions = await page.locator("a, button").allInnerTexts();
  expect(actions.filter((text) => /tạo tài khoản/i.test(text))).toEqual([]);
  await expect(page.locator(".beat--hero a", { hasText: "Đăng ký dùng thử" })).toBeVisible();
  await expect(page.locator(".beat--hero a", { hasText: "Nhắn Zalo" })).toBeVisible();
  const badLinks = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter((href) => href !== "#" && !document.getElementById(href.slice(1))),
    );
  expect(badLinks).toEqual([]);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  // Be Vietnam Pro is the face actually painting the headline.
  const family = await page.locator("h1").evaluate((h) => getComputedStyle(h).fontFamily);
  expect(family).toMatch(/Be Vietnam Pro|Be_Vietnam_Pro/);
  expect(errors).toEqual([]);
});

test("the stage resolves and every screenshot loads", async ({ page }) => {
  await page.goto("/");
  for (const p of [0.15, 0.3, 0.45, 0.6, 0.8, 0.97]) await stageTo(page, p);
  await expect(page.locator(".pip[data-done]")).toHaveCount(4);
  const resolve = page.locator("[data-resolve]");
  await expect
    .poll(() => resolve.evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBeGreaterThan(0.9);
  await page.locator("#dang-ky").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const broken = await page.locator("img").evaluateAll((imgs) =>
    (imgs as HTMLImageElement[])
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );
  expect(broken).toEqual([]);
});

test("the ticket composes the message from the owner's choices", async ({ page }) => {
  await page.goto("/#dang-ky");
  const ticket = page.locator(".ticket");
  await page.getByLabel("Tên tiệm").fill("Giặt sấy Cô Ba");
  await page.getByRole("radio", { name: "Vệ sinh giày" }).check();
  await page.getByRole("radio", { name: "4–6 người" }).check();
  await page.getByRole("checkbox", { name: "Xếp lịch nhân viên" }).uncheck();
  await expect(ticket).toContainText("Tiệm: Giặt sấy Cô Ba, vệ sinh giày");
  await expect(ticket).toContainText("Nhân viên: 4–6 người");
  await expect(ticket).not.toContainText("xếp lịch nhân viên");
  await ticket.getByRole("button", { name: "Đăng ký dùng thử" }).click();
  // No Zalo number or trial link is configured in tests: say so, link nowhere.
  await expect(page.locator(".ticket__status")).toContainText("đang được cập nhật");
});

test("no horizontal overflow from 320px to desktop", async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    for (const p of [0, 0.5, 0.97]) {
      await stageTo(page, p);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `overflow at ${width}px, p=${p}`).toBeLessThanOrEqual(0);
    }
  }
});

test("meets automated WCAG AA checks at the top and the close", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(600);
  const top = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(top.violations).toEqual([]);
  await page.locator("#dang-ky").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const close = await new AxeBuilder({ page })
    .include(".close")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(close.violations).toEqual([]);
});
