import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { Configuration } from '@eternal/shared/config';
import { MessageService } from '@eternal/shared/ui-messaging';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { customersActions } from './customers.actions';
import { customersFeature } from './customers.reducer';

@Injectable()
export class CustomersEffects {
  #baseUrl = '/customers';

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.init),
      concatLatestFrom(() =>
        this.store.select(customersFeature.selectIsLoaded)
      ),
      filter(([, isLoaded]) => isLoaded === false),
      map(() => customersActions.get({ page: 1 }))
    );
  });

  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.get),
      concatLatestFrom(() => this.store.select(customersFeature.selectPage)),
      filter(([action, page]) => action.page !== page),
      map(([{ page }]) => customersActions.load({ page }))
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.load),
      switchMap(({ page }) =>
        this.http
          .get<{ content: Customer[]; total: number }>(this.#baseUrl, {
            params: new HttpParams().set('page', page),
          })
          .pipe(
            map(({ content, total }) =>
              customersActions.loaded({ customers: content, total, page })
            )
          )
      )
    );
  });

  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.add),
      concatMap(({ customer }) =>
        this.http.post<{ customers: Customer[]; id: number }>(
          this.#baseUrl,
          customer
        )
      ),

      tap(() => this.router.navigateByUrl('/customers')),
      map(() => customersActions.load({ page: 1 }))
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.update),
      concatMap(({ customer }) =>
        this.http
          .put<Customer[]>(this.#baseUrl, customer)
          .pipe(tap(() => this.uiMessage.info('Customer has been updated')))
      ),
      map(() => customersActions.load({ page: 1 }))
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customersActions.remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.#baseUrl}/${customer.id}`)
      ),
      tap(() => this.router.navigateByUrl('/customers')),
      map(() => customersActions.load({ page: 1 }))
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private configuration: Configuration,
    private uiMessage: MessageService
  ) {}
}
