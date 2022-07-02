import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loader/loading.interceptor';

export const sharedUiMessagingProvider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: LoadingInterceptor,
};
