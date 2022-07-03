import { Injectable } from '@angular/core';
import { fromEvent, map, pluck } from 'rxjs';
import { createEffect } from '@ngrx/effects';
import { filterDefined } from '@eternal/shared/ngrx-utils';
import { syncLocalStorage } from './sync-local-storage';

@Injectable()
export class LocalStorageEffects {
  storageEvent = createEffect(() => {
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      pluck('key'),
      filterDefined,
      map((featureState) => syncLocalStorage({ featureState }))
    );
  });
}
