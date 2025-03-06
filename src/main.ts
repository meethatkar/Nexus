import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { AuthInterceptorService } from './app/services/auth-interceptor.service';


//        *******GPT RESPONSE FOR INTERCEPTOR**********
// bootstrapApplication(AppComponent, {
//   ...appConfig, // Spread the existing appConfig
//   providers: [
//     ...(appConfig.providers || []), // Preserve existing providers in appConfig
//     provideHttpClient(withInterceptors([authInterceptor])) // Added interceptor
//   ]
// }).catch(err => console.error(err));

bootstrapApplication(AppComponent,appConfig).catch(err => console.error(err));    //Youtube vide of interceptor 