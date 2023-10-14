<div>
<p align="center">
<img style="align:center;" src="public/images/logo-dark.svg" alt="Mixim Notes Banner" width="100" />
</p>

<h1 align="center">Mixim Notes</h1>
<h3 align="center">Simple yet powerful, Note-taking app for productive minds.</h3>
<p align="center">
<a href="https://www.producthunt.com/products/mixim-drafts/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-mixim&#0045;drafts" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=541324&theme=neutral" alt="Mixim&#0032;Drafts - Simple&#0032;yet&#0032;powerful&#0032;Note&#0045;taking&#0032;app&#0032;for&#0032;productive&#0032;minds&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>
<p align="center">
    <a href="https://notes.mixim.cc/">Website</a> | <a href="https://instagram.com/mixim.cc">Instagram</a> | <a href="https://discord.gg/eRbXWct3mT">Join our Discord Server</a>
</p>
</div>
</br>
</br>

# Mixim Notes - Open Source Notekeeping

Welcome to Mixim Notes, your free and powerful open-source notekeeping solution. We believe in making note-taking accessible to everyone by using the latest and best technologies available.

Why Open Source?
Mixim Notes started as a closed-source project, but we've decided to make it open source for a few compelling reasons:

- **Community Growth**: By opening the source code, we invite developers and enthusiasts from around the world to contribute and make Mixim Notes even better.

- **Transparency**: Open source fosters transparency, making it clear how Mixim Notes works and ensuring trust among users.

- **Constant Improvement**: With a broader community, we can enhance and evolve Mixim Notes more rapidly, ensuring it remains a top-notch notekeeping solution.

## How You Can Contribute

We'd love your help to enhance Mixim Notes further. Here's how you can get involved:

- **Join Our Community**: Connect with us on our [Discord Server](https://discord.gg/eRbXWct3mT). It's the hub for discussions, questions, and collaboration.
Mixim Notes to grow and make it better. \
- If you want to contribute [Read How to Contribute.](https://github.com/mixim-cc/notes-fe/blob/main/CONTRIBUTING.md)

## Technologies Used

[React Query v4](https://react-query.tanstack.com/overview) for managing API Calls \
[React Hook Form v7](https://react-hook-form.com/api) for managing form states \
[Legend State v1](https://legendapp.com/open-source/state/) for managing client side data like auth \
[TailwindCSS v3](https://tailwindcss.com/docs) for UI \
[Framer Motion v5](https://www.framer.com/docs/) for animations \
[Clerk](https://www.clerk.com/) for auth

## Locally Setup Frontend

Prerequisites:

- Node 18+

First, run the development server:

```bash
cp .env.example .env
npm install
npm run dev

# or

cp .env.example .env
yarn install
yarn dev

#or

cp .env.example .env
pnpm i
pnpm dev
```

We're using [https://clerk.com/](https://clerk.com/) for Complete user management. To run locally you need to create an account and get following SECRET KEYs.
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=

Follow [Clerk Setup Guide](https://clerk.com/docs/quickstarts/setup-clerk) to get Keys then, Paste them into `.env`. Now, You can sucessfully Authorized but you'll get Server Errors. 

## Setup Backend Locally Using Docker

A clean postgres database is required which can optionally be setup using docker as

```docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

Following env Variable must be supplied to run, PG_values are for database. Note that the length of ENCRYPTION_SECRET value must not change from that of given sample.

Copy and Paste following code in your .env

```env
ENCRYPTION_SECRET=mix&p*~!l1/!s0^=B*x7ti01q1!x4o^@
CLERK_SECRET_KEY=

DB_PROFILE=local
PG_HOST=host.docker.internal
PG_PORT=5432
PG_DB=postgres
PG_USER=postgres
PG_PASSWORD=password

BE_PORT=8080
```

Run the backend service using command. It will pull backend binaries from Docker Hub and run backend utilizing .env file from Frontend Codebase

```docker
docker run -p 8080:8080 --env-file .env --add-host=host.docker.internal:host-gateway -d bikash4416/notes-be
```

Playground URL
Open [http://localhost:8080/playground](http://localhost:8080/playground) with your browser to access playground.

If you've any queries regarding backend feel free to join our [Discord Server](https://discord.gg/eRbXWct3mT).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

Let's build Mixim Notes together, and thank you for being part of this exciting journey!