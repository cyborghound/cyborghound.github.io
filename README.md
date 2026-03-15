# 🐕 Cyborghound Blog

Welcome to the Cyborghound personal blog! This repository contains the source code for a custom, performance-tested, and secure Jekyll blog built using the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme.

## 🚀 Local Development

To run this blog locally, you will need Ruby, Bundler, Node.js, and npm installed.

1. **Install Ruby Dependencies**

   ```console
   bundle install
   ```

2. **Install Node Dependencies** (for testing and code quality tools)

   ```console
   npm install
   ```

3. **Start the Jekyll Server**

   ```console
   bundle exec jekyll serve
   ```

   The site will be available at `http://127.0.0.1:4000/`.

---

## 🏗️ CI/CD Pipeline

This repository features a custom, unified, GitLab-style CI/CD pipeline managed by GitHub Actions (`.github/workflows/pipeline.yml`).

Every time code is pushed to the `main` branch, the pipeline automatically executes five sequential stages to guarantee quality and security before deploying to GitHub Pages.

**The pipeline stages are:**

1. **Lint** (`markdownlint`): Scans all `.md` files to enforce standard Markdown stylistic rules.
2. **Analyze** (`CodeQL`): Runs GitHub's advanced static analysis tool to detect security vulnerabilities in both JavaScript and Ruby code.
3. **Test** (`Playwright`): Runs automated End-to-End browser tests (see below).
4. **Performance** (`Grafana k6`): Executes a rigorous load test against the server (see below).
5. **Build & Deploy**: *Only if all four previous stages pass successfully*, the site is built and pushed live to GitHub Pages.

<br>

---

## 🧪 Automated Testing

This repository includes custom test suites to guarantee both functionality and speed.

### End-to-End Tests (Playwright)

We use [Playwright](https://playwright.dev/) to simulate a real user interacting with the blog on a 1920x1080 desktop browser. The tests verify critical flows, such as the homepage loading, navigation links, customized 404 pages, and the search overlay functionality.

To run the E2E tests locally against the dev server:

```console
npm run test:e2e
```

*(Note: Ensure your Jekyll server is running on port 4000 before executing the tests).*

---

### Performance Load Tests (Grafana k6)

We use [k6](https://k6.io/) to ensure the blog's server is highly responsive under pressure. The automated suite simulates 10 concurrent users actively browsing the homepage and articles.

The pipeline will **intentionally fail** if the load test detects:

- More than 1% of requests fail to return a 200 OK.
- The 95th percentile (p95) response time exceeds **500 milliseconds**.

To trigger a localized load test:

```console
npm run test:perf
```

<br>

---

## 🔒 Code Quality & Security

- **Dependabot**: Configured to automatically scan `package.json` and the `Gemfile` for vulnerable dependencies, proactively opening Pull Requests with security patches.
- **HTML-Proofer**: Runs during the Build stage to validate all internal links, images, and anchors across the generated site to prevent "404 Not Found" dead links.
- **Pre-commit Hooks**: Managed by Husky to safely format files on commit (if configured).
