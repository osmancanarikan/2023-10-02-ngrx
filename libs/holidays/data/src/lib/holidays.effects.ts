import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { Configuration } from '@eternal/shared/config';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';
import { holidaysActions } from './holidays.actions';
import { holidaysFeature } from './holidays.reducer';
import { Store } from '@ngrx/store';
import { optimisticUpdate } from '@nrwl/angular';

@Injectable()
export class HolidaysEffects {
  #actions$ = inject(Actions);
  #httpClient = inject(HttpClient);
  #config = inject(Configuration);
  #store = inject(Store);

  #baseUrl = '/holiday';

  get$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(holidaysActions.get),
      concatLatestFrom(() =>
        this.#store.select(holidaysFeature.selectLoadStatus)
      ),
      filter(([, loadStatus]) => loadStatus === 'not loaded'),
      map(() => holidaysActions.load())
    );
  });

  load$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(holidaysActions.load),
      switchMap(() => this.#httpClient.get<Holiday[]>(this.#baseUrl)),
      map((holidays) =>
        holidays.map((holiday) => ({
          ...holiday,
          imageUrl: `${this.#config.baseUrl}${holiday.imageUrl}`,
        }))
      ),
      map((holidays) => holidaysActions.loaded({ holidays }))
    );
  });

  addFavourite$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(holidaysActions.addFavourite),
      optimisticUpdate({
        run: ({ id }) =>
          this.#httpClient
            .post<void>(`${this.#baseUrl}/favourite/${id}`, {})
            .pipe(map(() => holidaysActions.favouriteAdded({ id }))),
        undoAction: ({ id }) => holidaysActions.addFavouriteUndo({ id }),
      })
    );
  });

  removeFavourite$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(holidaysActions.removeFavourite),
      optimisticUpdate({
        run: ({ id }) =>
          this.#httpClient
            .delete<void>(`${this.#baseUrl}/favourite/${id}`, {})
            .pipe(map(() => holidaysActions.favouriteRemoved({ id }))),
        undoAction: ({ id }) => holidaysActions.removeFavouriteUndo({ id }),
      })
    );
  });
}
