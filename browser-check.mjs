import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const port = 4179;
const server = spawn(
  "npm",
  ["run", "dev", "--", "--port", String(port), "--strictPort"],
  { stdio: "pipe" },
);
const outputDirectory = process.env.JCODE_SCRATCH_DIR || "test-results";
let browser;
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Development server did not start")),
      15000,
    );
    server.stdout.on("data", (data) => {
      if (data.toString().includes("127.0.0.1")) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Server exited: ${code}`));
    });
  });
  await mkdir(outputDirectory, { recursive: true });
  browser = await chromium.launch({ channel: "chromium" });
  for (const width of [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${port}`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("article").count(), 4);
    assert.equal(
      await page
        .locator("html")
        .evaluate((element) => getComputedStyle(element).backgroundColor),
      "rgb(8, 9, 9)",
    );
    assert.equal(
      await page
        .locator(".hero-actions .button")
        .first()
        .evaluate((element) => getComputedStyle(element).backgroundColor),
      "rgb(145, 237, 182)",
    );
    assert.equal(
      await page
        .locator(".signal")
        .first()
        .evaluate((element) => getComputedStyle(element).display),
      "none",
    );
    const visualizations = {
      Routing: ".mini-routing",
      Targets: ".mini-targets",
      "IP blocks": ".mini-policies",
      "Security checks": ".mini-checks",
    };
    for (const [name, selector] of Object.entries(visualizations)) {
      const card = page
        .getByRole("article")
        .filter({ has: page.getByRole("heading", { name, exact: true }) });
      assert.equal(
        await card.locator(selector).isVisible(),
        true,
        `${name} card visualization at ${width}px`,
      );
      const bounds = await card.locator(selector).boundingBox();
      assert.ok(
        bounds.width > 100 && bounds.height > 100,
        `${name} meaningful visualization size`,
      );
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `Page overflow at ${width}px`,
    );
    for (const name of ["Routing", "Targets", "IP blocks", "Security checks"]) {
      const tab = page.getByRole("tab", { name, exact: true });
      await tab.click();
      const panel = page.getByRole("tabpanel");
      const selector =
        name === "Routing" ? ".routing-diagram" : visualizations[name];
      assert.equal(
        await panel.locator(selector).isVisible(),
        true,
        `${name} explorer visualization at ${width}px`,
      );
      assert.equal(await tab.getAttribute("aria-selected"), "true");
      assert.equal(
        await page.getByRole("tabpanel").getAttribute("aria-labelledby"),
        await tab.getAttribute("id"),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `${name} overflow at ${width}px`,
      );
    }
    await page
      .getByRole("link", { name: "Explore ip blocks", exact: true })
      .click();
    assert.equal(
      await page
        .getByRole("tab", { name: "IP blocks", exact: true })
        .getAttribute("aria-selected"),
      "true",
    );
    if (width <= 760) {
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      const nav = page.getByRole("navigation");
      assert.equal(await nav.isVisible(), true);
      await nav
        .getByRole("link", { name: "Capabilities", exact: true })
        .click();
      assert.equal(await nav.isVisible(), false);
    }
    const routingTab = page.getByRole("tab", { name: "Routing", exact: true });
    await routingTab.click();
    await routingTab.press("ArrowRight");
    assert.equal(
      await page
        .getByRole("tab", { name: "Targets", exact: true })
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await page.keyboard.press("End");
    assert.equal(
      await page
        .getByRole("tab", { name: "Security checks", exact: true })
        .getAttribute("aria-selected"),
      "true",
    );
    await page.keyboard.press("Home");
    assert.equal(await routingTab.getAttribute("aria-selected"), "true");
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: join(outputDirectory, `andromeda-${width}.png`),
      fullPage: true,
    });
    assert.deepEqual(errors, [], `Runtime errors at ${width}px`);
    console.log(
      `PASS ${width}px: four rendered feature visuals, matching explorer panels, dark/mint theme, reduced motion, keyboard tabs, feature links, navigation, no overflow or runtime errors`,
    );
    await page.close();
  }
  console.log(`Screenshots: ${outputDirectory}/andromeda-*.png`);
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
