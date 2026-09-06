# experimental-engine-contract

Public npm package **`engine-contract`**: host-facing study `EngineAPI` types and
`ENGINE_API_VERSION`.

This repo is the source of truth for that package. Built JS and `.d.ts` live in
committed `dist/` so consumers can install from git without an install-time
build or a registry.

Package **name** and **exports** stay stable. Do not bump `ENGINE_API_VERSION`
except when the EngineAPI shape actually breaks (see `guidelines/ENGINE.md` in
the private docs repo).

## Consume (SHA-pinned git dependency)

There are no GitHub Releases for this package. Pin a commit:

```bash
pnpm add github:PikaPikaGems/experimental-engine-contract#<commit-sha>
```

`experimental-engine` pins the same way in its `package.json`. After you change
the contract, rebuild and commit `dist/`, then bump that `#<sha>` and re-install.

## Develop

```bash
pnpm install
pnpm run check
pnpm build
```

Commit the updated `dist/` (`index.js` and `.d.ts`) with the source change.
`dist/` is not gitignored.
