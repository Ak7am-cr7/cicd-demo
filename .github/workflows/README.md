# CI/CD Pipeline Demo: GitHub Actions + Docker

Every push to this repo is tested automatically. If the tests pass, the pipeline builds a Docker image and publishes it to GitHub Container Registry. If the tests fail, nothing gets delivered.

## How it works

Push code → Test job runs → (only if green) Publish job builds and pushes the Docker image

- **CI:** GitHub Actions runs the tests on a fresh Ubuntu machine for every push and pull request.
- **CD:** a second job builds the Docker image and publishes it to ghcr.io, tagged `latest` and with the commit ID.
- **Quality gate:** the publish job uses `needs: test`, so broken code can never become an image.
- **No passwords in code:** the pipeline logs in with the temporary `GITHUB_TOKEN` that GitHub creates for each run.

## Tech used

Node.js, GitHub Actions, Docker, GitHub Container Registry

## Proof it works

**1. A deliberate failure.** I changed `+` to `-` in the code. The test failed with `expected: 350, actual: -350`, and I found the cause by reading the log.

![Failed test log](screenshots/red-run.png)

**2. The gate blocking delivery.** The test job failed, so the publish job was skipped and no image was built.

![Gate blocked](screenshots/gate-blocked.png)

**3. After the fix.** Both jobs passed and the image was published.

![Pipeline green](screenshots/pipeline-green.png)

## What I learned

- Reading CI logs to find the exact failing step
- Why a clean build machine proves the code works anywhere
- How `needs:` stops bad code from being delivered
- Storing credentials as secrets instead of writing them in files

## Run it locally

    docker build -t cicd-demo .
    docker run -p 3000:3000 cicd-demo

Then open http://localhost:3000