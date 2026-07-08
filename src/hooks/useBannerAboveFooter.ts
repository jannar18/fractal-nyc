import { useEffect, type RefObject } from "react";

/**
 * Keeps a `position: fixed` decorative layer pinned to the viewport while the
 * user scrolls, but releases it so it never overlaps the page footer: as the
 * footer scrolls into view the layer is translated up to rest just above it,
 * then scrolls away with the footer. Used by the flanking house-banner layer
 * on the sector pages (Events, Education, Visit, Publications, Campus).
 *
 * This is scroll-linked *layout* — the same contract as `position: sticky` —
 * not decorative motion: there is no transition and the offset tracks scroll
 * 1:1, so it is intentionally NOT gated behind `prefers-reduced-motion`
 * (disabling it would let the banners overlap the footer, which is worse).
 *
 * The layer's natural (fully-pinned) bottom is measured once and on resize; the
 * per-scroll work is a single `getBoundingClientRect` on the footer. On
 * viewports where the layer is hidden (`display: none`, mobile) its measured
 * height is 0, so the clamp is inert. SSR-safe: no-ops without `window`.
 *
 * The default selector targets the site footer's `data-site-footer` marker
 * rather than a bare `footer` tag — semantic `<footer>` elements can appear
 * inside page content (e.g. a `<blockquote><footer>` citation on CampusPage),
 * and a bare selector would match the first of those instead.
 */
export function useBannerAboveFooter(
  bannerRef: RefObject<HTMLElement | null>,
  footerSelector = "[data-site-footer]",
): void {
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner || typeof window === "undefined") return;
    const footer = document.querySelector<HTMLElement>(footerSelector);
    if (!footer) return;

    // Distance from the viewport top to the layer's bottom when fully pinned.
    // Constant across scroll (the layer is fixed); recomputed only on resize.
    let naturalBottom = 0;
    const measure = () => {
      banner.style.transform = "";
      naturalBottom = banner.getBoundingClientRect().bottom;
    };
    const update = () => {
      const overlap = naturalBottom - footer.getBoundingClientRect().top;
      banner.style.transform =
        overlap > 0 ? `translate3d(0, ${-overlap}px, 0)` : "";
    };

    measure();
    update();
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      banner.style.transform = "";
    };
  }, [bannerRef, footerSelector]);
}
