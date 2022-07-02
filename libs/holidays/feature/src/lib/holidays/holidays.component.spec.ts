import { fakeAsync, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HolidaysComponent } from './holidays.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Configuration } from '@eternal/shared/config';
import { createHolidays } from '@eternal/holidays/model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { holidaysFeature } from '../../../../data/src/lib/holidays.reducer';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HolidaysEffects } from '../../../../data/src/lib/holidays.effects';

describe('Request Info Component', () => {
  const setup = async () =>
    render(HolidaysComponent, {
      imports: [
        HolidaysComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        StoreModule.forFeature(holidaysFeature),
        EffectsModule.forFeature([HolidaysEffects]),
      ],
      providers: [
        {
          provide: Configuration,
          useValue: {
            baseUrl: 'http://localhost:8080/',
          },
        },
      ],
      excludeComponentDeclaration: true,
    });

  it('should instantiate', fakeAsync(async () => {
    await setup();
    await screen.findByText('Choose among our Holidays');
  }));

  it('should show holiday cards', fakeAsync(async () => {
    await setup();
    const controller = TestBed.inject(HttpTestingController);
    const holidays = createHolidays({ title: 'Vienna' }, { title: 'London' });
    controller.expectOne((req) => !!req.url.match(/holiday/)).flush(holidays);

    await screen.findByText('Vienna');
    await screen.findByText('London');
  }));
});
