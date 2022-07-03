# Professional NgRx - Lab 1

- [Professional NgRx - Lab 1](#professional-ngrx---lab-1)
  - [1. Customers data library](#1-customers-data-library)

In all the labs, we use the project names of the libraries. The libraries are located in **/libs** and can be nested.

For example, you find the library

- `booking` in **/libs/booking**,
- `customers-data` in **/libs/customers/data**, and
- `shared-ngrx-utils` in **/libs/shared/ngrx-utils**, etc.

## 1. Customers data library

Extract the customer's state into an own module called `customers-data`.

Run the linter afterwards, to verify that everything is alright.

<details>
<summary>Show Solution</summary>
<p>

**1. Create the library**

Generate a data library with

```bash
npx nx g @nrwl/angular:library data --directory customers
```

Remove the generated NgModule. We are on standalone.

**2. Move files**

Move all NgRx files from `customers-feature` (directory +state) to the newly generated library `customers-data`. Use your IDE for that. It should automatically update the imports.

**3. Provide the NgRx modules in `customers-data`**

The newly created `customers-data` should be responsible to provide and setup the `[Store|Effects]Module`. Move them over from `customers-feature`.

_customers-data: customers-data.provider.ts_

```typescript
import { importProvidersFrom } from '@angular/core';
import { CustomersEffects } from './customers.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { customersFeature } from './customers.reducer';

export const customersDataProvider = importProvidersFrom(
  StoreModule.forFeature(customersFeature),
  EffectsModule.forFeature([CustomersEffects])
);
```

_customers-data: index.ts_

```typescript
export { customersDataProvider } from './lib/customers-data.provider';
```

**4. Dependency `customers-feature` -> `customers-data`**

`customers-feature`: _customers.routes.ts_

```typescript
export const customersRoutes: Routes = [
  {
    path: '',
    canActivate: [DataGuard],
    component: CustomersRootComponent,
    providers: [customersDataProvider], // <-- updated providers property
    children: [
      // ...
    ],
  },
];
```

**5. Verify the app**

Run `npx nx serve` and verify that the app is still working.

**6. Run linter**

Run `npx nx affected:lint`. It should fail with a lots of **@nrwl/nx/enforce-module-boundaries** error messages. That is because, we didn't tag the data library.

**7. Dependency rules**

To tag the project, open _project.json_ in `customers-data`. Scroll down to the `tags` property and set the following value `["domain:customers", "type:data"]`.

**8. Deep imports**

The other error in the linting is because we have deep imports. To fix that, open the _index.ts_ of `customers-data`and add ONLY the classes and functions you want to expose.

```typescript
import { customersActions as allCustomersActions } from './lib/customers.actions';

const { add, load, remove, select, unselect, update } = allCustomersActions;

export const customersActions = { load, add, update, remove, select, unselect };
export { fromCustomers } from './lib/customers.selectors';
export { customersDataProvider } from './lib/customers-data.provider';
```

**9. Update container components**
We're almost done. Update the container components and the data guard in `customers-feature`

- _components/add-customer-component.ts_
- _components/customers-container.component.ts_
- _components/edit-customer.component.ts_
- _services/data-guard.ts_
- _../index.ts_

**10. Final check**

Finally, run `npx nx affected:lint` to verify the codebase doesn't break any rules.

</p>
</details>
