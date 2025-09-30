import { useEffect, useMemo, useRef } from "react";

type RGB = { r: number; g: number; b: number };

export type GrainyGradientBackgroundProps = {
  /** Hex colors like #ff00aa. At least 2. */
  colors?: string[];
  /** Warping scale in logical pixels (higher = more wavy). */
  amplitude?: number;
  /** Base noise scale in logical pixels (higher = larger blobs). */
  scale?: number;
  /** Animation speed multiplier. */
  speed?: number;
  /** Grain intensity 0..1. */
  grain?: number;
  /** Grain scale multiplier. */
  grainScale?: number;
  /** Blur radius in CSS pixels applied before grain overlay. */
  blur?: number;
  /** Render step in CSS pixels; larger = faster, blockier. */
  resolution?: number;
  /** Cap frames per second. Leave undefined for uncapped RAF. */
  fpsCap?: number;
  /** If true, canvas is fixed to viewport as a background. */
  fullscreen?: boolean;
  /** CSS opacity for the whole canvas. */
  opacity?: number;
  /** Optional extra className on the canvas element. */
  className?: string;
  /** Optional inline styles on the canvas element. */
  style?: React.CSSProperties;
};

// Lightweight 3D Simplex Noise (Stefan Gustavson, adapted to TS)
class SimplexNoise3D {
  private perm: Uint8Array;
  private grad3: Int8Array;

  constructor(seed = 1337) {
    this.grad3 = new Int8Array([
      1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1,
      0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
    ]);

    // Build permutation with simple LCG for deterministic seeding
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = seed >>> 0;
    const lcg = () => (s = (s * 1664525 + 1013904223) >>> 0);
    for (let i = 255; i > 0; i--) {
      const r = lcg() % (i + 1);
      const tmp = p[i];
      p[i] = p[r];
      p[r] = tmp;
    }
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  // 3D simplex noise, returns [-1, 1]
  noise3(xin: number, yin: number, zin: number): number {
    const F3 = 1 / 3;
    const G3 = 1 / 6;
    let n0 = 0,
      n1 = 0,
      n2 = 0,
      n3 = 0;

    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1 = 0,
      j1 = 0,
      k1 = 0;
    let i2 = 0,
      j2 = 0,
      k2 = 0;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const ii = i & 255,
      jj = j & 255,
      kk = k & 255;

    const gi0 = (this.perm[ii + this.perm[jj + this.perm[kk]]] % 12) * 3;
    const gi1 =
      (this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12) * 3;
    const gi2 =
      (this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12) * 3;
    const gi3 =
      (this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12) * 3;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) {
      t0 *= t0;
      n0 =
        t0 *
        t0 *
        (this.grad3[gi0] * x0 +
          this.grad3[gi0 + 1] * y0 +
          this.grad3[gi0 + 2] * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) {
      t1 *= t1;
      n1 =
        t1 *
        t1 *
        (this.grad3[gi1] * x1 +
          this.grad3[gi1 + 1] * y1 +
          this.grad3[gi1 + 2] * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) {
      t2 *= t2;
      n2 =
        t2 *
        t2 *
        (this.grad3[gi2] * x2 +
          this.grad3[gi2 + 1] * y2 +
          this.grad3[gi2 + 2] * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) {
      t3 *= t3;
      n3 =
        t3 *
        t3 *
        (this.grad3[gi3] * x3 +
          this.grad3[gi3 + 1] * y3 +
          this.grad3[gi3 + 2] * z3);
    }
    return 32 * (n0 + n1 + n2 + n3);
  }
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function hexToRgb(hex: string): RGB {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mixColors(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

function makePalette(colors: string[]): (t: number) => RGB {
  const rgbs = colors.map(hexToRgb);
  return (t: number) => {
    const n = rgbs.length;
    if (n === 1) return rgbs[0];
    const scaled = clamp01(t) * (n - 1);
    const i = Math.floor(scaled);
    const f = scaled - i;
    const c0 = rgbs[i];
    const c1 = rgbs[Math.min(i + 1, n - 1)];
    return mixColors(c0, c1, f);
  };
}

export default function GrainyGradientBackground({
  colors = ["#141414", "#141313", "#1c1c1c", "#4f4f4f"],
  amplitude = 60,
  scale = 820,
  speed = 0.08,
  grain = 0.9,
  grainScale = 1.0,
  resolution = 8,
  fpsCap,
  fullscreen = true,
  opacity = 1,
  className,
  style,
  blur = 400,
}: GrainyGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const paletteLUT = useMemo(() => {
    const lut = new Uint8Array(256 * 3);
    const pal = makePalette(colors);
    for (let i = 0; i < 256; i++) {
      const { r, g, b } = pal(i / 255);
      const j = i * 3;
      lut[j] = r;
      lut[j + 1] = g;
      lut[j + 2] = b;
    }
    return lut;
  }, [colors]);
  const noise = useMemo(() => new SimplexNoise3D(12345), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const c: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    let raf = 0;
    let mounted = true;
    let last = performance.now();
    let acc = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // Offscreen low-res buffer
    let bufferCanvas: HTMLCanvasElement | null = null;
    let bufferCtx: CanvasRenderingContext2D | null = null;
    let bufferImage: ImageData | null = null;
    let renderW = 0;
    let renderH = 0;
    let stepPx = 1;
    // Dedicated offscreen canvas for grain overlay to avoid clipping when resolution > 1
    let grainCanvas: HTMLCanvasElement | null = null;
    let grainCtx: CanvasRenderingContext2D | null = null;

    function resize() {
      const parent = c.parentElement || document.body;
      const width = fullscreen ? window.innerWidth : parent.clientWidth;
      const height = fullscreen
        ? window.innerHeight
        : parent.clientHeight || window.innerHeight;
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      c.style.width = `${width}px`;
      c.style.height = `${height}px`;
      context.imageSmoothingEnabled = true;

      // compute buffer size based on resolution and DPR
      stepPx = Math.max(1, Math.floor(resolution * dpr));
      renderW = Math.max(1, Math.ceil(c.width / stepPx));
      renderH = Math.max(1, Math.ceil(c.height / stepPx));
      bufferCanvas = document.createElement("canvas");
      bufferCanvas.width = renderW;
      bufferCanvas.height = renderH;
      bufferCtx = bufferCanvas.getContext("2d", { willReadFrequently: true });
      if (bufferCtx) bufferImage = bufferCtx.createImageData(renderW, renderH);
    }

    function renderFrame(time: number) {
      if (!mounted) return;
      const now = time;
      const dt = (now - last) / 1000;
      last = now;

      if (fpsCap && fpsCap > 0) {
        acc += dt;
        const minDt = 1 / fpsCap;
        if (acc < minDt) {
          raf = requestAnimationFrame(renderFrame);
          return;
        }
        acc = 0;
      }

      const w = c.width;
      const h = c.height;

      const t = now * 0.001 * speed;
      const invScale = 1 / (scale * dpr);
      const warpAmp = amplitude;

      if (!bufferCtx || !bufferImage) {
        raf = requestAnimationFrame(renderFrame);
        return;
      }

      const data = bufferImage.data;
      let ptr = 0;
      for (let y = 0; y < renderH; y++) {
        const yPix = y * stepPx;
        const ny = yPix * invScale;
        for (let x = 0; x < renderW; x++) {
          const xPix = x * stepPx;
          const nx = xPix * invScale;

          const wx = noise.noise3(nx * 0.6 + 5.2, ny * 0.6 + 1.3, t) * warpAmp;
          const wy =
            noise.noise3(nx * 0.6 - 3.1, ny * 0.6 + 7.7, t * 0.9) * warpAmp;

          const v = noise.noise3(
            (xPix + wx) * invScale,
            (yPix + wy) * invScale,
            t * 1.2
          );
          const gn =
            grain *
            noise.noise3(
              nx * grainScale * 3 + 12.3,
              ny * grainScale * 3 - 4.56,
              t * 1.7
            );

          const s = clamp01(0.5 + 0.5 * (v * 0.9 + gn));
          const lutIndex = (s * 255) | 0;
          const base = lutIndex * 3;
          data[ptr++] = paletteLUT[base];
          data[ptr++] = paletteLUT[base + 1];
          data[ptr++] = paletteLUT[base + 2];
          data[ptr++] = 255;
        }
      }

      if (!bufferCanvas) {
        raf = requestAnimationFrame(renderFrame);
        return;
      }
      bufferCtx.putImageData(bufferImage, 0, 0);
      context.clearRect(0, 0, w, h);
      // Apply blur when drawing the color field upsampled
      const prevFilter = (
        context as CanvasRenderingContext2D & { filter?: string }
      ).filter;
      context.filter = blur > 0 ? `blur(${blur}px)` : "none";
      context.drawImage(bufferCanvas, 0, 0, renderW, renderH, 0, 0, w, h);
      context.filter = prevFilter || "none";

      // Grain overlay: single-channel procedural noise blended on top
      if (grain > 0) {
        const grainScalePx = Math.max(1, Math.floor((grainScale || 1) * 2));
        const gw = Math.ceil(w / grainScalePx);
        const gh = Math.ceil(h / grainScalePx);

        // Ensure grain offscreen canvas exists and matches size
        if (
          !grainCanvas ||
          !grainCtx ||
          grainCanvas.width !== gw ||
          grainCanvas.height !== gh
        ) {
          grainCanvas = document.createElement("canvas");
          grainCanvas.width = gw;
          grainCanvas.height = gh;
          grainCtx = grainCanvas.getContext("2d", { willReadFrequently: true });
        }

        if (grainCtx && grainCanvas) {
          const gImg = grainCtx.createImageData(gw, gh);
          const gData = gImg.data;
          let p = 0;
          const tNoise = time * 0.0008; // slow evolving grain
          for (let yy = 0; yy < gh; yy++) {
            for (let xx = 0; xx < gw; xx++) {
              const vx = xx * 0.9;
              const vy = yy * 0.9;
              const n = noise.noise3(vx, vy, tNoise); // [-1,1]
              const v = Math.floor(128 + 127 * n);
              const a = Math.floor(
                255 * Math.min(1, Math.max(0, grain)) * 0.35
              );
              gData[p++] = v;
              gData[p++] = v;
              gData[p++] = v;
              gData[p++] = a;
            }
          }
          grainCtx.putImageData(gImg, 0, 0);
          context.imageSmoothingEnabled = true;
          context.globalCompositeOperation = "overlay";
          context.drawImage(grainCanvas, 0, 0, gw, gh, 0, 0, w, h);
          context.globalCompositeOperation = "source-over";
        }
      }

      raf = requestAnimationFrame(renderFrame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c.parentElement || document.body);
    raf = requestAnimationFrame(renderFrame);

    return () => {
      mounted = false;
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [
    amplitude,
    scale,
    speed,
    grain,
    grainScale,
    resolution,
    fpsCap,
    paletteLUT,
    fullscreen,
    noise,
    blur,
  ]);

  const canvasStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = fullscreen
      ? {
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
        }
      : { width: "100%", height: "100%", display: "block" };
    return { ...base, opacity, pointerEvents: "none", ...style };
  }, [fullscreen, opacity, style]);

  return <canvas ref={canvasRef} className={className} style={canvasStyle} />;
}
