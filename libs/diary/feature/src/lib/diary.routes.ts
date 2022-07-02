import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DiaryEffects } from './+state/diary.effects';
import { diaryFeature } from './+state/diary.reducer';
import { DiariesComponent } from './diaries/diaries.component';

export const diaryRoutes: Routes = [
  {
    path: '',
    component: DiariesComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(diaryFeature),
        EffectsModule.forFeature([DiaryEffects])
      ),
    ],
  },
];
