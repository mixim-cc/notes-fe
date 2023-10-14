## Mixim Notes

### Simple yet powerful, Note-taking app for productive minds.

<img src="https://notes.mixim.cc/images/MiximDraftScreenshot.png" />
 
This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Prerequisites:

- Node 18+
- Yarn 1.22+

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

## Setup Backend Locally Using Docker

First a clean postgres database is required which can optionally be setup using docker as

```docker
docker pull bikash4416/notes-be
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

Following env Variable must be supplied to run, PG_ values are for database. Note that the length of ENCRYPTION_SECRET value must not change from that of given sample. 

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

Run the backend service using command such as
```docker
docker run -p 8080:8080 --env-file .env --add-host=host.docker.internal:host-gateway -d bikash4416/notes-be
```

Playground URL
Open [http://localhost:8080/playground](http://localhost:8080/playground) with your browser to access playground.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Technologies Used

[React Query v4](https://react-query.tanstack.com/overview) for managing API Calls \
[React Hook Form v7](https://react-hook-form.com/api) for managing form states \
[Legend State v1](https://legendapp.com/open-source/state/) for managing client side data like auth \
[TailwindCSS v3](https://tailwindcss.com/docs) for UI \
[Framer Motion v5](https://www.framer.com/docs/) for animations

