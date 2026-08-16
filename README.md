# Team Gopal Singh Harnawada Gaja — Jhalrapatan Assembly App

# Team Gopal Singh — Jhalrapatan Civic Services Platform

A Hindi-first responsive Web/PWA + Android WebView application for the Team Gopal Singh civic-service project.

## Included

- Hindi-first responsive React/Vite PWA
- Android APK shell using WebViewAssetLoader
- Panchayat / village directory and search/filter
- Scheme/work verification UI
- Village, Gram Sabha, citizen services and emergency directory modules
- Public grievance / जनसमस्या registration with case IDs
- Offline local storage for core citizen flows
- Optional central SQLite backend
- Complaint status, assignment, feedback, field-visit and audit APIs
- Development/project tracking APIs
- Scheme and village CRUD APIs for officers/admins
- PWA manifest + service worker
- GitHub Actions debug-APK build

## Important corrections in this package

The previous package had several gaps:

1. The Android workflow/documentation disagreed about the Gradle version.
2. The workflow documentation incorrectly described extracting a project ZIP; the workflow actually builds the checked-out repository directly.
3. The backend allowed any authenticated citizen to change any complaint status.
4. Citizen users could create projects even though project management is an administrative function.
5. Complaint submission unnecessarily required login, while the UI did not provide a login screen.
6. The backend had no health endpoint and weak default HTTP hardening.
7. The backend seeded a placeholder scheme record that could be mistaken for real government information.

Those issues have been corrected here. Complaint submission is now intentionally public; an authenticated user can still be linked to the complaint when a valid bearer token is supplied. Status changes, assignments, project updates, scheme management and village management require `admin` or `officer`.

## Local run

Requirements: Node.js 20+.

```bash
npm run setup
npm start
```

Then open `http://localhost:3000`.

Health check: `GET /api/health`.

For client development:

```bash
npm run dev --prefix client
```

## Authentication

The backend supports OTP authentication, but a real SMS provider is **not included**. `ALLOW_DEV_OTP=true` is for local development only and must never be enabled in production.

To bootstrap administrator accounts, set:

```text
ADMIN_PHONES=9876543210,9123456789
```

before the first login for those numbers.

Production authentication still needs an SMS/OTP provider, secrets management and rate-limit/monitoring infrastructure.

## Backend deployment

Set at least:

- `NODE_ENV=production`
- `JWT_SECRET` to a long random secret
- `ADMIN_PHONES` for the initial admin phone numbers
- A real OTP provider integration before enabling account login in production

The SQLite `data/` directory must be persisted when using Docker or another restartable host.

## Android APK

The Android app is a native Kotlin WebView shell. The GitHub Actions workflow:

1. Checks out this repository.
2. Installs Java 17, Android SDK 36, Node 24 and Gradle 9.5.
3. Builds `client/`.
4. Copies `client/dist` into `android/app/src/main/assets/www`.
5. Builds `android/app:assembleDebug`.
6. Uploads `Team-GopalSingh-Debug.apk` as a workflow artifact.

The workflow builds the repository directly; no ZIP extraction step is required.

A release APK still needs a production signing key and release signing configuration.

## Data quality

Government schemes, officer details, election data, population figures and other public records should only be published after checking authoritative sources. The application should not label user-entered or placeholder information as “100% verified”.

## Production items still requiring external services

These cannot be completed inside a source ZIP alone:

- SMS/OTP provider
- Production hosting/domain
- Persistent database backups
- Object/file storage
- Push notifications
- Maps/geocoding provider
- Monitoring and security testing
- Production Android signing key

## Data integrity / सत्यापित जानकारी

This release deliberately does **not** fabricate civic facts. LGD codes, population, village mappings, officials, budgets, project completion, facilities and scheme outcomes must come from an authoritative source before they are labelled verified. Any local record without provenance is marked `needs_verification` and must not be shown as official.

Primary authoritative references:
- Government of India Local Government Directory (LGD): https://lgdirectory.gov.in/
- District Jhalawar, Government of Rajasthan: https://jhalawar.rajasthan.gov.in/

The application must display source/provenance and last-updated date for official data.


## Finalization status
This merged package preserves the richer legacy modules and the Android diagnostic build workflow. It is scoped to Jhalrapatan AC-198 and uses a source-first data policy. See `JHALRAPATAN_SCOPE.md`, `OFFICIAL_SOURCES_2026-08-16.md`, and `DATA_COMPLETENESS_RULES.md`.
