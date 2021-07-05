import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  vFullname: any;
  vUsername: any;
  constructor(
    private _auth: AuthService
  ) {
  }

  ngOnInit() {
    this.vFullname = JSON.parse(this._auth.getDataProfile()).name;
    this.vUsername = this._auth.getUsername();
  }

}
