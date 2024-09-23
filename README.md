# Astro Starter Kit: Minimal / Lucia Auth Implement in Astro with Astor DB

Hi🧙‍♀️ all people who are reading this, my mission in this repository is create a auth to-do list with lucia and astro db,
in this journey is expect to learn how make a good design database and create auth/oauth client if you want to contribute you can make a pull request
or create a issue. Thanks for reading or contribute. 💪

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   │   └── navigation.astro
│   ├── api/
│   │   ├── signin.ts
│   │   ├── signup.ts
│   │   └── signout.ts
│   └── pages/
│       ├── index.astro
│       ├── signup.astro
│       └── signup.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) and [lucia documentation](https://lucia-auth.com)

## 🗺️ Roadmap

My roadmap of this journey is:

- [x] Create auth by session.
- [ ] Create oauth github client
- [ ] Create a to-do list
- [ ] Protect to-do list with auth
- [ ] Save to-do list in database
- [ ] Add styles with pure css or tailwind
- [ ] Publish in vercel
