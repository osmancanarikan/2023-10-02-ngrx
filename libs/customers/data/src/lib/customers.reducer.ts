import { Customer } from '@eternal/customers/model';
import { createFeature } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { immerOn } from 'ngrx-immer/store';
import { safeAssign } from '@eternal/shared/util';
import { initialUndoRedoState, undoRedo, UndoRedoState } from 'ngrx-wieder';

export interface CustomersState extends UndoRedoState {
  customers: Customer[];
  page: number;
  total: number;
  selectedId: number | undefined;
  isLoaded: boolean;
  hasError: boolean;
}

export const initialState: CustomersState = {
  customers: [],
  page: 0,
  total: 0,
  selectedId: undefined,
  isLoaded: false,
  hasError: false,
  ...initialUndoRedoState,
};

const { createUndoRedoReducer } = undoRedo({
  undoActionType: customersActions.undo.type,
  redoActionType: customersActions.redo.type,
});

export const customersFeature = createFeature({
  name: 'customers',
  reducer: createUndoRedoReducer<CustomersState>(
    initialState,
    immerOn(customersActions.init, (state) => {
      if (state.hasError) {
        // This will not work: state = initialState;
        safeAssign(state, initialState);
      }
    }),
    immerOn(customersActions.load, (state, { page }) => {
      state.page = page;
    }),
    immerOn(customersActions.loadSuccess, (state, { customers, total }) => {
      safeAssign(state, {
        customers,
        total,
        isLoaded: true,
        hasError: false,
      });
    }),
    immerOn(customersActions.loadFailure, (state) => {
      state.hasError = true;
    }),
    immerOn(customersActions.select, (state, { id }) => {
      state.selectedId = id;
    }),
    immerOn(customersActions.unselect, (state) => {
      state.selectedId = undefined;
    })
  ),
});
