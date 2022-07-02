import { createFeature, createReducer, on } from '@ngrx/store';
import { securityActions } from './security.actions';

export interface User {
  id: number;
  email: string;
  firstname: string;
  name: string;
  anonymous: boolean;
}

export interface SecurityState {
  loaded: boolean;
  user: User | undefined;
}

const initialState: SecurityState = {
  loaded: false,
  user: undefined,
};

export const securityFeature = createFeature({
  name: 'security',
  reducer: createReducer<SecurityState>(
    initialState,
    on(
      securityActions.loadUserSuccess,
      securityActions.signInUserSuccess,
      (state, { user }): SecurityState => ({
        ...state,
        user,
        loaded: true,
      })
    ),
    on(
      securityActions.signOutUserSuccess,
      (state, { user }): SecurityState => ({
        ...state,
        user,
      })
    )
  ),
});
