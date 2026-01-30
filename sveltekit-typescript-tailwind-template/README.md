# 프로덕션에서 띄우기 
yarn build
yarn preview


=========================================

# Sveltekit Tailwind Typescript Template

This projects is an enhancement of the templated project that is generated when scaffolding a sveltekit project. In addition to the tools that the original template brings, this template also includes:

- [TypeScript](https://www.typescriptlang.org/) by default
- [Yarn](https://yarnpkg.com/) as a package manager
- [Tailwind CSS](https://tailwindcss.com/)
- [Husky](https://github.com/typicode/husky) git hooks for formatting, testing, and commit message verification
- [Commitlint](https://commitlint.js.org/#/) to enforce semantic commit messages
- [Dev containers](https://containers.dev/) for platform agnostic local development and ease of portability

The template builds upon the sveltekit template included tools in ESLint, Prettier, and Playwright. The motivation for using this template is to simply save time with a development-ready sveltekit project with batteries included.

## Getting started

The simplest way to get up and running with the template is using [degit](https://github.com/Rich-Harris/degit). In a terminal of your choice, install degit and clone the project (without git history):

```bash
yarn global add degit # or, npm install -g degit
degit JoeyMcKenzie/sveltekit-typescript-tailwind-template path-to/your-project
```

Once cloned, simply install dependencies and run:

```bash
yarn install
yarn dev
```

That's it!

## Using dev containers

If you'd prefer to use Docker with dev containers (my personal preference), first install the dev containers CLI:

```bash
yarn add --global @devcontainers/cli # or, npm install -g @devcontainers/cli
```

For ease of integration, add the [remote containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) to your VS Code installation as well. Next, open the project:

```bash
code path-to/your-project
```

Either:

- Open the project in a container through VS Code using `ctrl` + `shift` + `p` and select `Dev Containers: Open Folder in Container...`
- Build the container locally with `devcontainer build --workspace-folder .` and use the above command to attach your local workspace to the container

## Husky git hooks

If you'd rather disable/enable only certain hooks, it's only a matter of removing the individual lifecycle hook you're interested in in the `.husky` folder. By default, three hooks are enabled:

- `commit-msg`: validates commit messages on an individual commit conform to (more/less) semantic commit convention (see `commitlint.config.js` to customize this)
- `pre-commit`: formats staged code using [lint-staged](https://github.com/okonet/lint-staged) based on `.prettierrc` configuration
- `pre-push`: runs [Playwright](https://playwright.dev/) tests before pushing commits to the remote origin

## Deployment (Node / SSR)

This project can be deployed with `@sveltejs/adapter-node` when you need SSR on your own server.

1) Install the adapter:

```bash
yarn add -D @sveltejs/adapter-node
```

2) Update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
```

3) Build and run:

```bash
yarn build
node build
```

Tip: In production, run `node build` with a process manager (e.g. systemd/pm2).
