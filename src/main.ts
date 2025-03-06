import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/services/auth-interceptor.service';
// import { AuthInterceptorService } from './app/services/auth-interceptor.service';


bootstrapApplication(AppComponent, {
  ...appConfig, // Spread the existing appConfig
  providers: [
    ...(appConfig.providers || []), // Preserve existing providers in appConfig
    provideHttpClient(withInterceptors([authInterceptor])) // Added interceptor
  ]
}).catch(err => console.error(err));
