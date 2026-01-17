# Zion Node

A monorepo of reusable Node.js packages for personal projects.

## Installation

Install packages directly from GitHub without publishing to npm:

### Using pnpm

```bash
# Install a specific package
pnpm add "github:gwainor/zion-node#workspace=@zion/example-utils"

# Install a specific version/tag
pnpm add "github:gwainor/zion-node#v1.0.0&workspace=@zion/example-utils"

# Install from a specific branch
pnpm add "github:gwainor/zion-node#main&workspace=@zion/example-utils"
```

### Using npm

```bash
npm install "github:gwainor/zion-node#workspace=@zion/example-utils"
```

### Using yarn

```bash
yarn add "github:gwainor/zion-node#workspace=@zion/example-utils"
```

## Available Packages

- [`@zion/example-utils`](./packages/example-utils) - Example utility functions

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm -r build

# Run tests
pnpm test
```

### Creating a New Package

1. Create a new directory in `packages/`:

   ```bash
   mkdir -p packages/your-package/src
   ```

2. Add a `package.json`:

   ```json
   {
     "name": "@zion/your-package",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "repository": {
       "type": "git",
       "url": "https://github.com/gwainor/zion-node.git",
       "directory": "packages/your-package"
     }
   }
   ```

3. Add your code in `src/index.ts`

4. Build and test locally

## Using in Other Projects

Once you've pushed this repo to GitHub, you can use any package in your other projects:

```typescript
// Install the package
// pnpm add "github:gwainor/zion-node#workspace=@zion/example-utils"

// Use in your code
import { greet } from '@zion/example-utils';

console.log(greet('World'));
```

## Important Notes

- **GitHub**: Repository is configured for github.com/gwainor/zion-node
- **Private**: The root package.json is marked as `private: true` to prevent accidental npm publishing
- **Individual packages**: Each package can be installed independently via GitHub
- **Versioning**: Use git tags for version control (e.g., `v1.0.0`, `@zion/example-utils@1.0.0`)

## License

MIT
