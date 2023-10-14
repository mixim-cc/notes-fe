# Contributing guidelines

Thank you so much for considering to contribute to Mixim Notes! If you have no idea where to start, what to do, what you _can_ do then you are in the right place. There are plenty of ways you can contribute to Mixim Notes; many don't even require coding skills.

## Ways to Contribute

### Design & Feature

We're open to new features requests. If you got some ideas to share with us please do. We'll design and find ways to implement it.

We encourage to join our Discord Server [Invitation Link](https://discord.gg/eRbXWct3mT)

### Contributing code

> Before you start contributing code, **make sure to read the [commit guidelines](#commit-guidelines), [git branch organization](#git-branch-organization) & [style guidelines](#style-guidelines).**

As with other types of contributions, **the first step is to [open an issue](https://github.com/mixim-cc/notes-fe/issues/new) on GitHub**. Opening an issue before you make changes ensures that someone else isn't already working on that particular problem. It also lets us all work together to find the right approach before you spend a bunch of time on a PR. **So again, when in doubt, open an issue**.

### Reporting a bug

Ugh! Bugs!

> A bug is when software behaves in a way you didn't expect, which the developer didn't intend.

To help us understand what's happening, we first want to **make sure you're using the latest version of Mixim Notes**.

Once you've **confirmed that the bug still exists in the latest version**, you'll want to check to make sure it's not something we already know about in the [opened GitHub issues](https://github.com/mixim-cc/notes-fe/issues).

If you've **upgraded to the latest version, and you can't find it in our open issues** list, it's time to [open a new issue](https://github.com/streetwriters/notesnook/issues/new/choose). It is recommended that you fill out all the fields in the GitHub issue form with as much detail as possible. This includes:

1. Exact steps to reproduce the problem
2. Video or picture showing the problem
3. Platform & device information

The **easier it is for us to recreate your problem, the faster it will be fixed**.

## Opening & submitting a pull request

**Before submitting a pull request,** please make sure the following is done:

1. Fork [the repository](https://github.com/mixim-cc/notes-fe) and create your branch from `main` (you can name your branch anything).
2. Run `pnpm install` in the repository root. To download all the required dependencies.
3. Make sure your code lints (`pnpm run lint`). Tip: `pnpm run linc` to only check changed files.
4. Read & follow the commit guidelines.
5. Read & follow the style guidelines.

### Commit guidelines

#### Include `<scope>:` in your commit message

All commits must include valid scopes in the commit message. **Valid commit scopes include:**

**Changes:**

- **fix**: a commit of the type fix patches a bug in your codebas (this correlates with PATCH in Semantic Versioning)

- **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

**Some example commits would look like this:**

```txt
fix: changes in app.tsx
feat: search added
```

Refer [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for more Details.

## Style guidelines

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `pnpm run prettier` after making any changes to the code.

Then, our linter will catch most issues that may exist in your code. You can check the status of your code styling by simply running `pnpm run lint`.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [Airbnb's Style Guide](https://github.com/airbnb/javascript) will guide you in the right direction.

## Git Branch Organization

Submit all PR to [`dev branch`](https://github.com/mixim-cc/notes-fe)

## Review Process

We deeply appreciate everyone who takes the time to make a contribution. We will review all contributions as quickly as possible. **As a reminder, [opening an issue](https://github.com/mixim-cc/notes-fe/issues/new/choose) and discussing your change before you make it, is the best way to smooth the PR process.** This will prevent a rejection because someone else is already working on the problem, or because the solution is incompatible with the architectural direction.

During the PR process, expect that there will be some back-and-forth. Please try to respond to comments in a timely fashion, and:

1. If you don't wish to continue with the PR, let us know.
2. If a PR takes too many iterations for its complexity or size, we may reject it.
3. If you stop responding we may close the PR as abandoned.
4. If a PR is accepted, a maintainer will merge your change.
5. If we reject the PR, we will close the pull request with a comment explaining why. This decision isn't always final: if you feel we have misunderstood your intended change, please continue the conversation with a comment on the PR

This Docs is not complete and it needs some changes, which we can work on later. Happy Contributing.
