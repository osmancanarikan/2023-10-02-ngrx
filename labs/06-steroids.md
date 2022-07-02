# 1. @ngrx/entity

With the help of the slides, you should be able to integrate @ngrx/entity into `customers-data`. Good luck!

<details>
<summary>Show Solution</summary>
<p>

_customers.reducer.ts_

```typescript
export const adapter = createEntityAdapter<Customer>({
  sortComparer: (customer1, customer2) =>
    customer1.name.localeCompare(customer2.name),
});

export interface CustomersState extends UndoRedoState, EntityState<Customer> {
  page: number;
  total: number;
  selectedId: number | undefined;
  isLoaded: boolean;
  hasError: boolean;
}

export const initialState: CustomersState = adapter.getInitialState({
  page: 0,
  total: 0,
  selectedId: undefined,
  isLoaded: false,
  hasError: false,
  ...initialUndoRedoState,
});

// ...

export const customersFeature = createFeature({
  name: "customers",
  reducer: createUndoRedoReducer<CustomersState>(
    initialState,
    // ...
    on(loadSuccess, (state, { customers, total }) => ({
      ...adapter.setAll(customers, state),
      total,
      isLoaded: true,
      hasError: false,
    }))
  ),
});
```

_customers.selectors.ts_

Replace the `selectCustomers` with

```typescript
const selectCustomers = createSelector(
  customersFeature.selectCustomersState,
  adapter.getSelectors().selectAll
);
```

</p>
</details>
