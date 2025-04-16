import { Component, inject } from '@angular/core';
import { UserSignupService } from '../../../services/signup/user-signup.service';

@Component({
  selector: 'app-ai-call',
  imports: [],
  templateUrl: './ai-call.component.html',
  styleUrl: './ai-call.component.css'
})
export class AiCallComponent {

  userSignupServiceObj=inject(UserSignupService);

  token:any = this.userSignupServiceObj.getToken();

}
