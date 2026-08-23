# Wright — Mobile E2E Tests

Android UI test suite for the [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-android), built on [Mobilewright](https://www.npmjs.com/package/mobilewright) (a Playwright-style API/test runner for native mobile apps).

## Project structure

```
constants/     Shared string constants (e.g. validation messages)
core/          Low-level utilities (element helpers, logging, storage)
data/          Static JSON test data (products, non-secret credential fixtures)
fixtures/      Mobilewright test fixtures (page objects, data wiring)
hooks/         Global before/after test hooks
models/        Typed domain models (Account, Product)
pages/         Page objects (login, catalog, cart, product details, ...)
providers/     Data providers (credentials, products) fronting data/ and env vars
tests/         Test specs, grouped by feature (authentication, cart, ...)
```

Path aliases (`@constants/*`, `@core/*`, `@fixtures/*`, `@models/*`, `@pages/*`, `@providers/*`, `@hooks/*`, `@data/*`) are defined in [tsconfig.json](tsconfig.json).

## Prerequisites

- Node.js >= 18
- An Android emulator or device, with the app under test installed/launchable
- Run `npx mobilewright doctor` to verify your local environment (Android SDK, adb, etc.)

## Setup

```bash
npm install
```

## Running tests locally

```bash
npm test                 # run the full suite (see mobilewright.config.ts)
npm run test:report      # open the last Mobilewright HTML report
npm run allure:report    # generate + open the Allure report
```

Useful flags (pass through to the `mobilewright` CLI):

```bash
npx mobilewright test --grep "login"     # run tests matching a name
npx mobilewright test --workers 4        # run with N parallel workers
npx mobilewright test --shard 1/3        # run one shard of a 3-way split
```

## Credentials

Tests never read passwords from a plaintext file if it can be avoided. [providers/credentials-provider.ts](providers/credentials-provider.ts) resolves the primary `AUTH` account like this:

1. If `TEST_USERNAME` / `TEST_PASSWORD` environment variables are set, use those.
2. Otherwise, fall back to [data/credential.json](data/credential.json) (used for local runs and for the built-in negative-path fixtures, e.g. `EMPTYUSERNAME` / `EMPTYPASSWORD`).

For local runs with your own account, export the environment variables before running tests:

```bash
export TEST_USERNAME="you@example.com"
export TEST_PASSWORD="your-password"
npm test
```

In CI, these are supplied via **GitHub Secrets** (`TEST_USERNAME`, `TEST_PASSWORD`) — see below.

## Reporting

Test runs produce two reports, both configured in [mobilewright.config.ts](mobilewright.config.ts):

- **Mobilewright HTML report** (`reporter: 'html'`) — Playwright-style report with traces/screenshots. View with `npm run test:report`.
- **Allure report** (`allure-playwright`, writing to `allure-results/`) — richer, more readable report driven by human-readable test steps. Every test in [tests/authentication/login.spec.ts](tests/authentication/login.spec.ts) and [tests/cart/cart.spec.ts](tests/cart/cart.spec.ts) is broken into named `test.step(...)` blocks (e.g. "Log in with valid credentials", "Add \"Product 1\" to the cart") so the Allure report reads as a narrated set of steps per test rather than a single opaque pass/fail. Generate and view it locally with:

  ```bash
  npm run allure:report    # generate allure-report/ from allure-results/ and open it
  # or separately:
  npm run allure:generate  # just generate allure-report/
  npm run allure:open      # just open the last generated allure-report/
  ```

## Continuous Integration

Tests run in GitHub Actions via [.github/workflows/mobilewright.yml](.github/workflows/mobilewright.yml).

- **Trigger:** manual only (`workflow_dispatch`). The workflow does not run on push, pull request, or a schedule — start it from the Actions tab ("Run workflow") or via `gh workflow run mobilewright.yml`.
- **Parallelism:** the suite is split across a matrix of independent jobs (**shards**), each provisioning its own Android emulator (via [reactivecircus/android-emulator-runner](https://github.com/ReactiveCircus/android-emulator-runner)) and running its shard with multiple in-job workers (`fullyParallel: true` in `mobilewright.config.ts`). Shard count and workers-per-shard are configurable inputs on the manual trigger (defaults: 4 shards × 2 workers).
- **Secrets:** `TEST_USERNAME` and `TEST_PASSWORD` are injected from repository/organization GitHub Secrets as job-level environment variables — never committed to the repo.
- **Reporting:** each shard uploads its `allure-results` artifact; a final `merge-reports` job downloads all shards' results, generates a single merged **Allure report** with `npx allure generate`, and uploads it as the `allure-report` artifact (the CI artifact — no separate `mobilewright-html-report` artifact is published).

### Required repository secrets

Configure these under **Settings → Secrets and variables → Actions**:

| Secret | Description |
|---|---|
| `TEST_USERNAME` | Username for the primary test account |
| `TEST_PASSWORD` | Password for the primary test account |

### Running the workflow

1. Go to the **Actions** tab → **Mobilewright Android Tests** → **Run workflow**.
2. Optionally adjust `shard-count`, `workers-per-shard`, and `api-level`.
3. After completion, download the `allure-report` artifact for the merged, human-readable report (unzip and open `index.html`, or serve it with `npx allure open allure-report` locally), or per-shard `allure-results-*` / `test-results-*` artifacts for debugging a specific shard.
