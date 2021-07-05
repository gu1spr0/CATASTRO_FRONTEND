import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _confirmationService: ConfirmationService) { }

  ngOnInit() {
  }
  confirm(){
    this._confirmationService.confirm({
      message: 'Esta seguro de cerrar sesion?',
      accept: () => {
        this.logout();
      }
    })
  }
  logout() {
    this._authService.logout();
  }

}
