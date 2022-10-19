import { Action, Store } from '@ngrx/store';
import { customersFeature } from './customers.reducer';
import { firstValueFrom, Observable, of } from 'rxjs';
import { customersActions } from './customers.actions';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Configuration } from '@eternal/shared/config';
import { MessageService } from '@eternal/shared/ui-messaging';
import { marbles } from 'rxjs-marbles/jest';
import { createCustomer } from '@eternal/customers/model';
import { RestoreFunction, safeMockInject } from '@eternal/shared/testing';
import { Actions } from '@ngrx/effects';
import { CustomersEffects } from './customers.effects';

describe('Customer Effects', () => {
  let httpClient: Mock<HttpClient>;
  let store: Mock<Store>;
  let configuration: Mock<Configuration>;
  let router: Mock<Router>;
  let messageService: Mock<MessageService>;
  let restoreMock: RestoreFunction;

  beforeEach(() => {
    httpClient = createMock(HttpClient);
    store = createMock(Store);
    configuration = createMock(Configuration);
    router = createMock(Router);
    messageService = createMock(MessageService);
  });

  afterEach(() => restoreMock);

  const createEffect = (actions$: Observable<Action>) => {
    restoreMock = safeMockInject
      .with(Actions, actions$)
      .with(HttpClient, httpClient)
      .with(Router, router)
      .with(Store, store)
      .with(Configuration, configuration)
      .with(MessageService, messageService)
      .getRestoreFn();
    return new CustomersEffects();
  };

  describe('init', () => {
    it('should  dispatch get if not loaded', async () => {
      store.select.mockImplementation((selector) => {
        expect(selector).toBe(customersFeature.selectIsLoaded);
        return of(false);
      });

      const actions$ = of(customersActions.init());
      const effect = createEffect(actions$);
      expect(await firstValueFrom(effect.init$)).toEqual(
        customersActions.get({ page: 1 })
      );
    });

    it('should dispatch nothing if already loaded', async () => {
      store.select.mockImplementation((selector) => {
        expect(selector).toBe(customersFeature.selectIsLoaded);
        return of(true);
      });

      const actions$ = of(customersActions.init());
      const effect = createEffect(actions$);

      await expect(firstValueFrom(effect.init$)).rejects.toThrow();
    });
  });

  it(
    'should load with the right parameters',
    marbles((m) => {
      const actions$ = m.cold('---a', {
        a: customersActions.load({ page: 2 }),
      });
      const customer = createCustomer();
      httpClient.get.mockImplementation((url, { params }) => {
        expect(url).toBe('/customers');
        expect(params).toEqual(new HttpParams().set('page', 2));
        return m.cold('r', { r: { content: [customer], total: 11 } });
      });
      const effect = createEffect(actions$);

      m.expect(effect.load$).toBeObservable('---b', {
        b: customersActions.loadSuccess({
          customers: [customer],
          total: 11,
          page: 2,
        }),
      });
    })
  );

  it(
    'should not load in parallel',
    marbles((m) => {
      const actions$ = m.cold('100ms a 100ms b 100ms c', {
        a: customersActions.load({ page: 1 }),
        b: customersActions.load({ page: 2 }),
        c: customersActions.load({ page: 3 }),
      });

      const customers = [
        createCustomer(),
        createCustomer(),
        createCustomer({ firstname: 'User 3' }),
      ].reverse();
      const [lastCustomer] = customers;

      httpClient.get.mockImplementation(() => {
        return m.cold('200ms r', {
          r: { content: [customers.pop()], total: 20 },
        });
      });

      const effect = createEffect(actions$);

      m.expect(effect.load$).toBeObservable('502ms b', {
        b: customersActions.loadSuccess({
          customers: [lastCustomer],
          total: 20,
          page: 3,
        }),
      });
    })
  );

  it(
    'should dispatch loadFailure on error',
    marbles((m) => {
      const actions$ = m.cold('l', {
        l: customersActions.load({ page: 1 }),
      });
      httpClient.get.mockImplementation(() => {
        return m.cold('#', {}, new Error());
      });

      const effect = createEffect(actions$);

      m.expect(effect.load$).toBeObservable('a', {
        a: customersActions.loadFailure(),
      });
    })
  );
});
