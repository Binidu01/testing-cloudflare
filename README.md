# my-bini-app

A **Bini.js** application — build full-stack React applications for **web, desktop, and mobile** using a single unified development experience.

Powered by **Bini.js**, **Vite**, **Hono**, and **Tauri**.

---

# Web

## Features

- File-based routing, nested layouts, per-route metadata, and automatic code splitting powered by **bini-router**.
- API routes powered by **Hono**:
  - Plain function handlers
  - Full Hono applications
  - Located inside `src/app/api/`
- API execution through:
  - Vite development middleware
  - bini-server in production
  - Edge runtimes when deployed
- Zero-dependency production server (**bini-server**) with:
  - ETag support
  - 304 responses
  - Graceful shutdown
  - Automatic port fallback
- Static SPA export (**bini-export**):
  - Pre-renders static routes
  - Generates optimized `404.html`
  - Compatible with static hosting platforms
- Deploy anywhere:
  - Netlify Edge Functions
  - Vercel Edge Runtime
  - Cloudflare Workers
  - Node.js
  - Deno
- Development overlay with:
  - Shiki-powered error highlighting
  - Automatic import support
  - GitHub Codespaces compatibility

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check and build the production application |
| `npm start` | Serve production output using bini-server |
| `npm run export` | Export the application as a static SPA |
| `npm run preview` | Preview the production build |

`start` and `export` are available only for web-target projects.

Desktop and mobile targets ship as native applications instead.

## Requirements

- Node.js >= 20.19.0

No native SDKs, platform toolchains, or signing setup required.

---

# Windows Desktop

## Features

- Builds a native Windows desktop application using **Tauri** and **WebView2**.
- Small application size without bundling a complete browser engine.
- Native APIs automatically configured through **bini-native**:
  - Filesystem
  - Clipboard
  - Notifications
  - Dialogs
  - OS information
- External URLs automatically open in the user's default browser.
- Supports Windows application signing through Authenticode.

## Commands

| Command | Description |
|---|---|
| `npm run tauri:dev` | Start the application in development mode |
| `npm run tauri:build` | Build a distributable Windows application |
| `npm run tauri:icon` | Generate application icons from `public/logo.png` |

## Requirements

- Microsoft C++ Build Tools

Install:

```
Desktop development with C++
```

- Microsoft Edge WebView2 Runtime

Verify installation:

```bash
cl
```

---

# macOS Desktop

## Features

- Builds a native macOS application using **Tauri** and **WKWebView**.
- Native API integration automatically configured by **bini-native**.
- Supports:
  - Filesystem access
  - Clipboard access
  - Notifications
  - Dialogs
- External URLs open in the user's default browser.
- Supports:
  - Ad-hoc signing for local testing
  - Developer ID signing
  - Application notarization

## Commands

| Command | Description |
|---|---|
| `npm run tauri:dev` | Start the application in development mode |
| `npm run tauri:build` | Build a distributable macOS application |
| `npm run tauri:icon` | Generate application icons from `public/logo.png` |

## Requirements

- macOS
- Xcode Command Line Tools

```bash
xcode-select --install
```

- Homebrew

- Tauri dependencies:

```bash
brew install gtk+3 webkit2gtk pkg-config
```

- Xcode (required for iOS development)

---

# Linux Desktop

## Features

- Builds native Linux applications using **Tauri** and **WebKitGTK**.
- Automatic native API integration through **bini-native**.
- Supports:
  - Filesystem
  - Clipboard
  - Notifications
  - Dialogs
- External links open using the system browser.
- Supports AppImage distribution.

## Commands

| Command | Description |
|---|---|
| `npm run tauri:dev` | Start the application in development mode |
| `npm run tauri:build` | Build Linux binaries/AppImage |
| `npm run tauri:icon` | Generate application icons from `public/logo.png` |

## Requirements

### Debian / Ubuntu

```bash
sudo apt update

sudo apt install -y \
libwebkit2gtk-4.0-dev \
build-essential \
libssl-dev \
libgtk-3-dev \
libayatana-appindicator3-dev \
librsvg2-dev \
libxdo-dev \
pkg-config
```

### Fedora

```bash
sudo dnf groupinstall "C Development Tools and Libraries"

sudo dnf install \
webkit2gtk4.0-devel \
openssl-devel \
gtk3-devel \
libappindicator-gtk3-devel \
librsvg2-devel \
libxdo-devel \
pkg-config
```

### Arch

```bash
sudo pacman -S \
webkit2gtk \
base-devel \
openssl \
gtk3 \
libappindicator-gtk3 \
librsvg \
libxdo \
pkg-config
```

---

# Android

## Features

- Builds a real native Android application using Tauri's Android backend.
- Not a browser wrapper.
- Native capabilities automatically wired by **bini-native**:
  - Camera
  - Filesystem
  - Notifications
  - Geolocation
  - Device APIs
- Android configuration available through:

```
src-tauri/gen/android
```

- Supports release signing with:
  - Android keystore
  - keystore.properties

## Commands

| Command | Description |
|---|---|
| `npm run android` | Run on a connected Android emulator or device |
| `npm run android:build` | Build a release APK/AAB |
| `npm run tauri -- android dev` | Manual equivalent of `npm run android` |
| `npm run tauri -- android build` | Manual equivalent of `npm run android:build` |

## Requirements

- Java JDK 17
- Android Studio
- Android SDK
- Android Build Tools
- Android NDK

Environment variables:

```
JAVA_HOME
ANDROID_HOME
```

Rust targets:

```bash
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add i686-linux-android
rustup target add x86_64-linux-android
```

---

# iOS

## Features

- Builds a native iOS application using Tauri's iOS backend.
- Uses Apple's WKWebView runtime.
- Native plugin integration automatically managed by **bini-native**.
- Supports:
  - Automatic Xcode signing
  - Manual certificates
  - CI signing workflows

iOS builds require macOS.

Windows and Linux cannot generate iOS applications.

## Commands

| Command | Description |
|---|---|
| `npm run ios` | Run on the iOS Simulator or a connected device |
| `npm run ios:build` | Build the iOS application |
| `npm run tauri -- ios dev` | Manual equivalent of `npm run ios` |
| `npm run tauri -- ios build` | Manual equivalent of `npm run ios:build` |

## Requirements

(macOS only)

- Xcode
- Xcode Command Line Tools

```bash
xcode-select --install
```

- CocoaPods

```bash
sudo gem install cocoapods
```

Rust targets:

```bash
rustup target add aarch64-apple-ios
rustup target add x86_64-apple-ios
rustup target add aarch64-apple-ios-sim
```

---

# Native Integration

## bini-native

bini-native automatically manages Tauri native configuration during development and builds.

Handled automatically:

- Tauri plugin registration
- Rust dependencies
- Capability permissions
- Android configuration
- iOS configuration
- macOS configuration

No manual native wiring required.

---

# Code Signing

Signing configuration is stored in git-ignored files.

Desktop signing:

```
.env.signing
```

Supported platforms:

- Windows
- macOS
- Linux

Android signing:

```
src-tauri/gen/android/keystore.properties
```

---

# Built With

The Bini.js ecosystem:

- **Vite** — modern build pipeline with Rolldown-powered builds
- **Hono** — lightweight API framework
- **bini-router** — filesystem routing and API middleware
- **bini-export** — static SPA export
- **bini-server** — zero-dependency production server
- **bini-native** — automatic Tauri integration
- **bini-env** — environment configuration
- **bini-overlay** — development tooling
- **Oxlint** — fast Rust-based linting
- **Oxfmt** — Prettier-compatible formatter

- **TypeScript** — static type safety

---

# Documentation

https://bini.js.org

---

Built with **Bini.js v10.0.0**