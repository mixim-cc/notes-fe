# Contributing guidelines

Thank you so much for considering to contribute to Mixim Notes! If you have no idea where to start, what to do, what you _can_ do then you are in the right place. There are plenty of ways you can contribute to Mixim Notes; many don't even require coding skills.

## Ways to Contribute

### Contributing code

> Before you start contributing code, **make sure to read the [commit guidelines](#commit-guidelines), [git branch organization](#git-branch-organization) & [style guidelines](#style-guidelines).**

As with other types of contributions, **the first step is to [open an issue](https://github.com/streetwriters/notesnook/issues/new/choose) on GitHub**. Opening an issue before you make changes ensures that someone else isn't already working on that particular problem. It also lets us all work together to find the right approach before you spend a bunch of time on a PR. **So again, when in doubt, open an issue**.

### Reporting a bug

Ugh! Bugs!

> A bug is when software behaves in a way you didn't expect, which the developer didn't intend.

To help us understand what's happening, we first want to **make sure you're using the latest version of Mixim Notes**.

Once you've **confirmed that the bug still exists in the latest version**, you'll want to check to make sure it's not something we already know about in the [opened GitHub issues](https://github.com/streetwriters/notesnook/issues).

If you've **upgraded to the latest version, and you can't find it in our open issues** list, it's time to [open a new issue](https://github.com/streetwriters/notesnook/issues/new/choose). It is recommended that you fill out all the fields in the GitHub issue form with as much detail as possible. This includes:

1. Exact steps to reproduce the problem
2. Video or picture showing the problem
3. Platform & device information

The **easier it is for us to recreate your problem, the faster it will be fixed**.

### Suggesting a new feature

If you've thought of a way that Notesnook could be better, we want to hear about it. **We track feature requests using GitHub Issues**, so feel free to [open an issue](https://github.com/streetwriters/notesnook/issues/new/choose) which describes the feature you would like to see, why you need it, and how it should work.

Before you open a new feature request, please make sure it's not a duplicate. **Duplicate feature requests & bug reports are closed immediately.**

### Helping out in the issue tracker

New issues are always opened that need to be triaged, sorted & organized, so the developers can easily find the most critical and/or relevant bugs to fix. Any help in this regard is appreciated.

In addition to this, you can help out in the following ways:

1. Finding & highlighting stale/duplicate issues
2. Answering questions & queries
3. Reproducing bugs (or mentioning that you face a particular bug)
4. Leaving your feedback on new feature requests



#### Implementing a new feature or fixing a bug

Each subproject in the monorepo contains its own set of documentation which you should refer to get started. This includes:

1. Setting up the developer environment
2. Build instructions
3. Running tests (if any)
4. Architecture docs explaining how everything fits together

Once you are done, [open a new pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Opening & submitting a pull request

**Before submitting a pull request,** please make sure the following is done:

1. Fork [the repository](https://github.com/mixim-cc/notes-fe) and create your branch from `main` (you can name your branch anything).
2. Run `pnpm install` in the repository root. To download all the required dependencies.
3. Make sure your code lints (`npm run lint`). Tip: `npm run linc` to only check changed files.
4. Read & follow the commit guidelines.
5. Read & follow the style guidelines.

### Commit guidelines

#### Include `<scope>:` in your commit message

All commits must include valid scopes in the commit message. **Valid commit scopes include:**

**Apps:**

1. `mobile`: changes related to mobile clients
2. `web`: changes related to the web client
3. `desktop`: changes related to the desktop client

**Packages:**

1. `crypto`: changes related to the cryptographic core
2. `editor`: changes related to the editor (including `@notesnook/editor-mobile`)
3. `logger`: changes related to the logger
4. `theme`: changes related to the theme

**Repo maintenance:**

1. `config`: changes related to config of installed tools in the repo (e.g. eslint rules)
2. `ci`: changes related to CI
3. `setup`: setting up something new in the repo (e.g. eslint, commitlint)
4. `docs`: changes related to documentation (README etc.)
5. `misc`: miscellaneous changes like package-lock.json updates
6. `global`: changes related to the whole repo

**Some example commits would look like this:**

```txt
docs: list all valid scopes in commit guidelines
web: impl xyz feature
crypto: update libsodium version
```

## Style guidelines

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `pnpm run prettier` after making any changes to the code.

Then, our linter will catch most issues that may exist in your code. You can check the status of your code styling by simply running `pnpm run lint`.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [Airbnb's Style Guide](https://github.com/airbnb/javascript) will guide you in the right direction.

## Git Branch Organization

Submit all changes to [`dev branch`](https://github.com/mixim-cc/notes-fe). 

## Review Process

We deeply appreciate everyone who takes the time to make a contribution. We will review all contributions as quickly as possible. **As a reminder, [opening an issue](https://github.com/mixim-cc/notes-fe/issues/new/choose) and discussing your change before you make it, is the best way to smooth the PR process.** This will prevent a rejection because someone else is already working on the problem, or because the solution is incompatible with the architectural direction.

During the PR process, expect that there will be some back-and-forth. Please try to respond to comments in a timely fashion, and:

1. If you don't wish to continue with the PR, let us know.
2. If a PR takes too many iterations for its complexity or size, we may reject it.
3. If you stop responding we may close the PR as abandoned.
4. If a PR is accepted, a maintainer will merge your change.
5. If we reject the PR, we will close the pull request with a comment explaining why. This decision isn't always final: if you feel we have misunderstood your intended change, please continue the conversation with a comment on the PR.