# my-bini-app

A **Bini.js** application — build full-stack React applications for **web, desktop, and mobile** from one codebase.

Powered by **Bini.js**, **Vite**, **Hono**, and **Tauri**.

---

# Web

## Features

- File-based routing, nested layouts, per-route metadata and code splitting via **bini-router**.
- API routes powered by **Hono** in `src/app/api/` (Vite middleware in dev, bini-server in production, edge runtimes when deployed).
- Zero-dependency production server (**bini-server**): ETag, 304 responses, graceful shutdown, port fallback.
- Deploy to Netlify, Vercel, Cloudflare Workers, Node.js or Deno.
- Dev overlay with Shiki-powered error highlighting and GitHub Codespaces support.
- Static Site Generation via **bini-ssg**, using the `render()` export of `src/main.tsx`.

## Commands

| Command | Description |
|---|---|
| `pnpm run dev` | Start the Vite development server with HMR |
| `pnpm run build` | Type-check, build the client and the SSR bundle |
| `pnpm run start` | Serve production output using bini-server (web target only) |
| `pnpm run preview` | Preview the production build |
| `pnpm run deploy` | Deploy to your chosen platform |

## Requirements

- Node.js >= 20.19.0

---

# Desktop and mobile (Tauri v2)

Desktop and mobile targets add `src-tauri/`, `bini-native` and these scripts:

| Command | Description |
|---|---|
| `pnpm run tauri:dev` | Desktop app in development mode |
| `pnpm run tauri:build` | Build a distributable desktop app (client-only build) |
| `pnpm run tauri:icon` | Regenerate icons from `public/logo.png` |
| `pnpm run android` / `android:build` | Run on / build for Android |
| `pnpm run ios` / `ios:build` | Run on / build for iOS (macOS only) |
| `pnpm run tauri <args>` | Pass-through to the Tauri CLI |

All Tauri scripts set `TAURI=true`, so the dev server binds to `TAURI_DEV_HOST` / `0.0.0.0` and uses a strict port (3000) that matches Tauri's `devUrl`.

Rust is required for every Tauri target: https://rustup.rs

## Windows

- Microsoft C++ Build Tools ("Desktop development with C++")
- Microsoft Edge WebView2 Runtime
- Rust (MSVC toolchain)

## macOS

```bash
xcode-select --install
```

No Homebrew packages are needed for desktop builds. Install Xcode for iOS.

## Linux

### Debian / Ubuntu

```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### Fedora

```bash
sudo dnf group install "c-development"
sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file \
  libappindicator-gtk3-devel librsvg2-devel libxdo-devel
```

### Arch

```bash
sudo pacman -S --needed webkit2gtk-4.1 base-devel curl wget file openssl \
  appmenu-gtk-module libappindicator-gtk3 librsvg xdotool
```

## Android

- Java JDK 17 (`JAVA_HOME`)
- Android Studio with SDK, Build Tools, Platform Tools and NDK (`ANDROID_HOME`, `NDK_HOME`)

```bash
rustup target add aarch64-linux-android armv7-linux-androideabi \
  i686-linux-android x86_64-linux-android
```

The generated project lives in `src-tauri/gen/android` and is meant to be committed. Only
`keystore.properties` (secrets), `.gradle/` and build output are git-ignored.

## iOS (macOS only)

```bash
xcode-select --install
brew install cocoapods
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
```

---

# Code signing

Secrets live in git-ignored files:

- Desktop: `.env.signing` (load with `set -a; source .env.signing; set +a`)
- Android: `src-tauri/gen/android/keystore.properties`. The Gradle signing config is committed and only
  activates when that file exists, so fresh clones and debug builds keep working.

---

# Built with

**Vite**, **Hono**, **bini-router**, **bini-server**, **bini-native**, **bini-env**, **bini-overlay**,
**bini-ssg**, **bini-deploy**, **Oxlint**, **Oxfmt**, **TypeScript**.

Docs: https://bini.js.org

---

Built with **Bini.js v10.0.6**
