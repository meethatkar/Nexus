import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { userDetails } from '../../models/userDetails.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userDetailsObj:userDetails = new userDetails();

  role="not assigned";
}
