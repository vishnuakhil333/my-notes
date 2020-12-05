import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

import { Router } from "@angular/router";
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public crudService: CrudService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() { }

}
