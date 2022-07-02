import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadUserSuccess,
  signInUserSuccess,
  signOutUserSuccess,
} from './security.actions';

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
      loadUserSuccess,
      signInUserSuccess,
      (state, { user }): SecurityState => ({
        ...state,
        user,
        loaded: true,
      })
    ),
    on(
      signOutUserSuccess,
      (state, { user }): SecurityState => ({
        ...state,
        user,
      })
    )
  ),
});
