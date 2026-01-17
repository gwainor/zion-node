# Build Guide

## Overview

This monorepo uses TypeScript for all packages with a dual ESM/CJS compilation strategy. Packages are designed to be installed directly from GitHub with **pre-built artifacts committed to the repository**.

## Build System

### Architecture

- **Dual Output**: Each package compiles to both ESM (`dist/esm/`) and CommonJS (`dist/cjs/`)
- **TypeScript Project References**: Efficient incremental builds across the monorepo
- **Pre-built Artifacts**: Build artifacts are committed to Git, so no build step is needed when installing from GitHub

### Build Commands

```bash
# Build all packages
pnpm build

# Clean all build artifacts
pnpm clean

# Build specific package (from package directory)
cd packages/logger
pnpm build
```

### Package Structure

Each compiled package includes:

```
dist/
├── esm/           # ESM output
│   ├── *.js       # Compiled JS (ESM)
│   ├── *.d.ts     # Type definitions
│   ├── *.js.map   # Source maps for JS
│   └── *.d.ts.map # Source maps for types
└── cjs/           # CommonJS output
    ├── *.js       # Compiled JS (CJS)
    ├── *.d.ts     # Type definitions
    ├── *.js.map   # Source maps for JS
    ├── *.d.ts.map # Source maps for types
    └── package.json # {"type": "commonjs"}
```

## Installing from GitHub

### In package.json

```json
{
  "dependencies": {
    "@zion/logger": "github:gwainor/zion-node#main"
  }
}
```

### Direct Installation

```bash
pnpm add github:gwainor/zion-node#packages/logger
```

Packages install instantly using pre-built artifacts from the repository. No build step required.

## Development Workflow

### Adding a New Package

1. Create package directory under `packages/`
2. Add `package.json` with build scripts:

   ```json
   {
     "scripts": {
       "build": "pnpm run build:esm && pnpm run build:cjs",
       "build:esm": "tsc -p tsconfig.esm.json",
       "build:cjs": "tsc -p tsconfig.cjs.json && echo '{\"type\": \"commonjs\"}' > dist/cjs/package.json",
       "clean": "rm -rf dist",
       "prepublishOnly": "pnpm run clean && pnpm run build"
     },
     "main": "./dist/cjs/index.js",
     "module": "./dist/esm/index.js",
     "types": "./dist/esm/index.d.ts",
     "exports": {
       ".": {
         "import": {
           "types": "./dist/esm/index.d.ts",
           "default": "./dist/esm/index.js"
         },
         "require": {
           "types": "./dist/cjs/index.d.ts",
           "default": "./dist/cjs/index.js"
         }
       }
     },
     "files": ["dist", "README.md"]
   }
   ```

3. Create TypeScript configs:
   - `tsconfig.json` (extends base config)
   - `tsconfig.esm.json` (ESM build)
   - `tsconfig.cjs.json` (CJS build)

4. Add package reference to root `tsconfig.json`

5. **Build and commit the artifacts**:
   ```bash
   pnpm build
   git add packages/your-package/dist
   git commit -m "chore: build your-package"
   ```

### TypeScript Configuration

Base configuration is in `packages/typescript/base.json`:

- Target: ES2017
- Strict mode enabled
- Source maps and declaration maps
- Composite projects for incremental builds

## CI/CD Considerations

### Development Workflow

When you make changes to package source code:

```bash
# Make your changes to src/
pnpm build             # Rebuild the package
git add .
git commit -m "feat: your changes"
```

Build artifacts are tracked in Git, so consumers get pre-built code immediately.

### GitHub Actions

To ensure dist files stay up-to-date:

```yaml
- name: Build packages
  run: pnpm build

- name: Check for uncommitted build artifacts
  run: |
    git add packages/*/dist
    git diff --cached --exit-code || (echo "Build artifacts not committed!" && exit 1)
```

## Troubleshooting

### Build Fails with Missing Types

Ensure `@types/node` is installed in packages that use Node.js APIs:

```bash
pnpm add -D @types/node
```

### Module Resolution Issues

Check that your `package.json` includes proper `exports` field and both `main` (CJS) and `module` (ESM) entry points.

### GitHub Installation Fails

Ensure:

1. Build artifacts are committed to the repository
2. `files` array in package.json includes `dist/` directory
3. Proper `main`, `module`, `types`, and `exports` fields are configured
