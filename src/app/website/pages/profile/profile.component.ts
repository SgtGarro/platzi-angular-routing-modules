import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: User | null;

  constructor(private authService: AuthService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
    /* this.authService.profile()?.subscribe((data) => {
      this.user = data;
    }); */
  }
}
