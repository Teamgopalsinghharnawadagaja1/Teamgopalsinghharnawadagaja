# Build workflow

GitHub Actions workflow: `.github/workflows/build.yml`

It:
1. installs dependencies with `npm ci`
2. checks `server.js`
3. builds the web app
4. copies `dist` into Android WebView assets
5. builds a debug APK
6. uploads web and APK artifacts
7. performs a basic secret scan

Production signing credentials are intentionally not stored in the repository.
