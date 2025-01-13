import { sanitize } from "isomorphic-dompurify";

export function createMarkup(data) {
  return { __html: sanitize(data) };
}

export const getPrice = (txt) => {
  if (!txt) return "";
  return txt?.includes("BTC") ? Number(txt.replace("BTC", "").trim()) : txt?.includes("USD") ? Number(txt.replace("USD", "").trim()) : txt;
};

export const removeHtmlTags = (str) => {
  if (typeof str === 'string') {
    return str
      .replace(/<[^>]*>/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  } else return str;
};

export const imagesOnly = {
  "image/jpeg": [".jpeg", ".png", ".jpg"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
  "image/jfif": [".jfif"],
}

export function smoothScrollTo(top, duration = 1000) {
  const start = window.scrollY;
  const change = top - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start + change * easeInOutCubic);

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}