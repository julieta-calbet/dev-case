The application has being built using NextJS 14 (app router with server actions), Typescript, Prisma, React Query, Tailwind, zod and https://ui.shadcn.com/ for ready-made components. I've also used Playwright as the end-to-end testing library.

## Getting Started

First, run the development server:

```bash
pnpm run db:reset
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will be able to introduce a new Equipment with the `Add new equipment` button. After introducing `name` and `starting/widing up` time a new Equipment will be shown into the dashboard.

You will be able to associate a new Order pressing into `Add new order` button. Automatically the status of the equipment will be refreshed and updated from red, yellow and green following the `processing time` and `starting/widing up` times.

Also, pressing under `See equipment's history` you will be able to see (in a new page) the registry of status updates for the specific equipment.

To run Playwritght tests:

```bash
pnpm run db:reset
pnpm run dev (Make sure the app is running in http://localhost:3000)
pnpm run test
```
