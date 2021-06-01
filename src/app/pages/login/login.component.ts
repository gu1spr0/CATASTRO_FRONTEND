import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Signin } from '../../models/user/Signin.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  vLoginForm: FormGroup;
  vIsTypePassword = true;
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService
  ) {
    this.vLoginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    
  }

  onSubmit(pSignin: Signin) {
    if(this.vLoginForm.valid){
      this._auth.login(pSignin);
    }
  }

}
