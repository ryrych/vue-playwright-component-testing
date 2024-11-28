# Repository for lighting talk at Xebia Vue Sync meeting

There are two componenents: `myButton` and `myModal`.

**Run the app**

```sh
npm run dev
```

**Run tests**

```sh
npm run test-ct
```

**Run tests in UI mode**

```sh
npm run test-ct --  --ui
```

## Key configuration

- `playwright-ct-.config.ts`
- `./playwright/index.ts`

### `myButton` tests

```sh
npm run test-ct src/components/myButton
```

### `myModal` tests

**myModal - visibility**

```sh
playwright test -c playwright-ct.config.ts --ui src/components/myModal
```

- `--ui` allows for _watch_ mode
- Add `<div id="modals"></div>` in `playwright/index.html` (remove the `DIV` to see the broken test)

### myModal - integration

For integration you decide how broad the scope is. Key takeaways:

> Testing component in small

> Testing component in large

_Playwright Test for VSCode_ allows you to run tests from _Visual Studio Code_.

**myModal - visual tests**

- Tests are tagged as `@visual-tests`

```sh
npm run test-ct -- --ui --grep @visual-tests
```

Bread something:

```diff
- <h3 class="flex shrink-0 items-center pb-4 text-xl font-medium ">Cześć!</h3>
+ <h3 class="flex shrink-0 items-center pb-40 text-xl font-medium ">Cześć!</h3>
```

And in the _Playwright UI_ look at the `side by side` oraz `slider` tabs. If you want to update snapshots:

```sh
npm run test-ct src/components/myModal/myModal.component.spec.ts -- --update-snapshots
```

### Compare Playwright tests with traditional ones

- `src/components/myButton/myButton.spec.ts`
- `src/components/myModal/myModal.spec.ts`
