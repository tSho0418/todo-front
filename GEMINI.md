# Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). The project is set up with [Tailwind CSS](https://tailwindcss.com/) for styling.

The application structure follows the standard Next.js `app` directory layout. The main page is `app/page.tsx`, and global styles are defined in `app/globals.css`.

# Building and Running

To get started, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

Other available scripts:

*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the code using ESLint.

# Development Conventions

*   **Styling**: This project uses Tailwind CSS for styling. Utility classes should be used for styling components.
*   **Linting**: ESLint is configured for this project. It is recommended to run `npm run lint` before committing changes.
*   **TypeScript**: The project is written in TypeScript. All new code should be written in TypeScript.
*   **Components**: Reusable components are located in the `app/components` directory.
