import { expect, takeSnapshot, test } from "@chromatic-com/playwright";

import { visualTestPaths } from "./paths";

import type { Page } from "@playwright/test";

const shouldSaveLocalPng = !process.env.CI;

async function preparePageForVisualSnapshot(page: Page) {
  await page.evaluate(() => {
    for (const image of document.images) {
      const src = image.currentSrc || image.src;

      if (!src) continue;

      const url = new URL(src, window.location.href);

      if (url.origin === window.location.origin) {
        image.loading = "eager";
        image.decoding = "sync";
      }
    }
  });

  await page.evaluate(async () => {
    const scrollStep = Math.max(window.innerHeight * 0.75, 400);
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    for (let scrollY = 0; scrollY <= maxScrollY; scrollY += scrollStep) {
      window.scrollTo(0, scrollY);
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          window.setTimeout(resolve, 50);
        });
      });
    }

    window.scrollTo(0, 0);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });

  await page.waitForFunction(() => {
    const localImages = Array.from(document.images).filter((image) => {
      const src = image.currentSrc || image.src;

      if (!src) {
        return false;
      }

      return new URL(src, window.location.href).origin === window.location.origin;
    });

    return localImages.every((image) => image.complete && image.naturalWidth > 0);
  });

  await page.evaluate(async () => {
    await document.fonts.ready;

    const localImages = Array.from(document.images).filter((image) => {
      const src = image.currentSrc || image.src;

      if (!src) {
        return false;
      }

      return new URL(src, window.location.href).origin === window.location.origin;
    });

    await Promise.allSettled(localImages.map((image) => image.decode()));
  });
}

const visualViewports = [
  {
    name: "mobile-l",
    use: {
      viewport: { width: 425, height: 800 },
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
    },
  },
  {
    name: "tablet",
    use: {
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 1,
      hasTouch: true,
      isMobile: false,
    },
  },
  {
    name: "laptop",
    use: {
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    },
  },
  {
    name: "fhd",
    use: {
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    },
  },
  {
    name: "wqhd",
    use: {
      viewport: { width: 2560, height: 1440 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    },
  },
  {
    name: "4k",
    use: {
      viewport: { width: 3840, height: 2160 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    },
  },
] as const;

for (const viewport of visualViewports) {
  test.describe(viewport.name, () => {
    test.use({
      ...viewport.use,
      disableAutoSnapshot: true,
      pauseAnimationAtEnd: true,
      prefersReducedMotion: "reduce",
    });

    for (const path of visualTestPaths) {
      test(`visual page ${path}`, async ({ page }, testInfo) => {
        await page.goto(path, { waitUntil: "load" });
        await expect(page.locator("body")).toBeVisible();
        await preparePageForVisualSnapshot(page);

        await takeSnapshot(page, `page:${path}`, testInfo);

        if (shouldSaveLocalPng) {
          await page.screenshot({
            path: testInfo.outputPath("page.png"),
            fullPage: true,
          });
        }
      });
    }
  });
}
