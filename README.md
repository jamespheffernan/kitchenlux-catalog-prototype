# KitchenLux Catalog Prototype

An archived React prototype for managing products, composing kits, and moving catalog data through CSV and JSON files.

This public repository is a clean extraction from a private KitchenLux deployment bundle. It starts from a new Git history and contains fictional sample products only. The private source's real equipment plan, pricing research, credential-bearing history, deployment configuration, and unrelated applications are not included.

## Privacy and safety boundary

- Catalog data is stored only in the current browser's `localStorage`.
- There is no backend, account system, analytics, tracking, checkout, or deployment integration.
- Imports are parsed in the browser and are not uploaded anywhere.
- Export buttons create local CSV or JSON downloads.
- The included brands, products, prices, descriptions, and kits are fictional demonstration data.

Clearing browser storage removes edits. Do not treat this prototype as a secure system for sensitive, regulated, or production inventory data.

## What it demonstrates

- product create, edit, delete, search, and filtering flows;
- kit creation and drag-and-drop composition;
- CSV preview, validation, import, and export;
- JSON backup export;
- a small persistence abstraction that can be replaced without changing the UI hooks.

## Run locally

Node 22 or newer is recommended.

```bash
npm ci
npm test
npm run lint
npm run dev
```

Create a production build with `npm run build`.

## Status and reuse

This is an archived portfolio prototype, not the source for a live KitchenLux service. No license has been selected, so public visibility permits inspection but does not grant reuse rights.
