(() => {
  const injectExecutiveStyles = () => {
    if (document.getElementById("lucent-hero-executive-fixes")) return;
    const style = document.createElement("style");
    style.id = "lucent-hero-executive-fixes";
    style.textContent = `
      :root { --pill-top: 48px; }

      .film--redesign {
        min-height: 100svh !important;
        background: #03060b !important;
      }

      .film__sticky {
        position: relative !important;
        height: 100svh !important;
      }

      .film__sticky::before,
      .film__sticky::after,
      .film__caption {
        content: none !important;
        display: none !important;
      }

      .film__stage {
        width: 100vw !important;
        height: 100svh !important;
        max-width: 100vw !important;
        max-height: 100svh !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      .film__stage-video {
        filter: contrast(1.13) saturate(1.08) brightness(0.86) !important;
        transform: scale(1.015);
      }

      .film__stage-veil {
        z-index: 2;
        background:
          linear-gradient(90deg, rgba(3, 6, 11, 0.58) 0%, rgba(3, 6, 11, 0.30) 50%, rgba(3, 6, 11, 0.16) 100%),
          linear-gradient(180deg, rgba(3, 6, 11, 0.16) 0%, rgba(3, 6, 11, 0.24) 54%, rgba(3, 6, 11, 0.68) 100%),
          radial-gradient(circle at 72% 36%, rgba(89, 255, 239, 0.12), transparent 34%) !important;
      }

      .pill-nav {
        top: 48px !important;
        background: linear-gradient(180deg, rgba(10, 15, 27, 0.88), rgba(4, 7, 14, 0.94)) !important;
        border: 1px solid rgba(255, 255, 255, 0.13) !important;
        box-shadow:
          0 28px 90px -34px rgba(0, 0, 0, 0.92),
          0 0 0 1px rgba(89, 255, 239, 0.06) inset,
          0 1px 0 rgba(255, 255, 255, 0.12) inset !important;
      }

      .mosaic__headline {
        max-width: min(17ch, 86vw) !important;
        font-size: clamp(2.05rem, 4.15vw, 4.4rem) !important;
        line-height: 0.98 !important;
        letter-spacing: -0.035em !important;
        font-weight: 850 !important;
        text-transform: none !important;
      }

      .mosaic__headline--b {
        max-width: min(20ch, 88vw) !important;
        font-size: clamp(2rem, 3.85vw, 4.1rem) !important;
      }

      .m-tile {
        filter: saturate(0.82) contrast(1.12) brightness(0.72) !important;
      }

      @media (max-width: 640px) {
        :root { --pill-top: 34px; }
        .pill-nav { top: 34px !important; }
        .film__stage-video { object-position: 58% center; }
        .mosaic__headline { font-size: clamp(2rem, 10vw, 3.2rem) !important; }
      }
    `;
    document.head.appendChild(style);
  };

  injectExecutiveStyles();
  document.documentElement.style.setProperty("--pill-top", "48px");

  const MOSAIC_VIDEO_DATA = REPLACE_ME;

  const tileConfig = [
    [".m-tile--tl", "touch"],
    [".m-tile--tc", "dribble"],
    [".m-tile--tr", "control"],
    [".m-tile--ml", "shot"],
    [".m-tile--mc", "agility"],
    [".m-tile--mr", "sprint"],
    [".m-tile--bl", "training"],
    [".m-tile--bc", "scouting"],
    [".m-tile--br", "proof"]
  ];

  const applyMosaicContent = (mosaic) => {
    const headlineA = mosaic?.querySelector("[data-mosaic-h='a']");
    const headlineB = mosaic?.querySelector("[data-mosaic-h='b']");
    if (headlineA) headlineA.textContent = "Every rep becomes evidence.";
    if (headlineB) headlineB.textContent = "From first touch to club shortlist.";

    tileConfig.forEach(([selector, key]) => {
      const tile = mosaic?.querySelector(selector);
      if (!tile || !MOSAIC_VIDEO_DATA[key]) return;
      tile.dataset.lazySrc = MOSAIC_VIDEO_DATA[key];
      tile.dataset.videoTheme = key;
      tile.setAttribute("poster", "./assets/images/opening-poster.webp");
    });
  };

  const section = document.querySelector(".film--redesign");
  const mosaic = document.querySelector(".mosaic");
  if (mosaic) applyMosaicContent(mosaic);

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  let ticking = false;

  const renderMosaic = (vh) => {
    if (!mosaic) return;
    const r = mosaic.getBoundingClientRect();
    const total = mosaic.offsetHeight - vh;
    const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;

    const colP = clamp((p - 0.05) / 0.25, 0, 1);
    const colSide = lerp(0, 0.42, colP);

    const rowP = clamp((p - 0.30) / 0.25, 0, 1);
    const rowSide = lerp(0, 0.42, rowP);

    mosaic.style.setProperty("--col-side", `${colSide}fr`);
    mosaic.style.setProperty("--row-side", `${rowSide}fr`);

    let aOp = 0;
    if (p >= 0.18 && p < 0.50) aOp = clamp((p - 0.18) / 0.12, 0, 1);
    else if (p >= 0.50 && p < 0.62) aOp = 1 - clamp((p - 0.50) / 0.12, 0, 1);
    mosaic.style.setProperty("--headline-a-op", aOp.toFixed(3));
    mosaic.style.setProperty("--headline-a-y", `${lerp(16, 0, aOp)}px`);

    let bOp = 0;
    if (p >= 0.55 && p < 0.82) bOp = clamp((p - 0.55) / 0.13, 0, 1);
    else if (p >= 0.82 && p < 0.92) bOp = 1 - clamp((p - 0.82) / 0.10, 0, 1);
    mosaic.style.setProperty("--headline-b-op", bOp.toFixed(3));
    mosaic.style.setProperty("--headline-b-y", `${lerp(16, 0, bOp)}px`);
  };

  const render = () => {
    ticking = false;
    document.documentElement.style.setProperty("--pill-top", window.innerWidth <= 640 ? "34px" : "48px");
    if (section) {
      section.style.setProperty("--stage-w", "100vw");
      section.style.setProperty("--stage-h", "100svh");
      section.style.setProperty("--stage-r", "0px");
      section.style.setProperty("--caption-opacity", "0");
      section.style.setProperty("--caption-y", "0px");
    }
    renderMosaic(window.innerHeight);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  };

  render();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (mosaic && "IntersectionObserver" in window) {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      mosaic.querySelectorAll("video[data-lazy-src]").forEach((v, index) => {
        v.src = v.dataset.lazySrc;
        v.load();
        const tryPlay = () => {
          try {
            v.currentTime = (index % 5) * 0.18;
          } catch (_) {}
          v.play().catch(() => {});
        };
        if (v.readyState >= 2) tryPlay();
        else v.addEventListener("loadeddata", tryPlay, { once: true });
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { start(); io.disconnect(); break; }
      },
      { rootMargin: "240px 0px 240px 0px" }
    );
    io.observe(mosaic);
  }
})();
