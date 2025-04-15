import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSignupComponent } from './pages/users/user-signup/user-signup.component';
import { NavbarComponent } from './pages/navigations/navbar/navbar.component';
import { HomeComponent } from "./pages/home/home.component";
import { AiCallComponent } from "./pages/navigations/ai-call/ai-call.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserSignupComponent, NavbarComponent, HomeComponent, AiCallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nexus';
}
