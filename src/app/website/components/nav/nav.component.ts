import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/model/category.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public isShownSidebar: boolean;
  public counter: number;
  public token: string;
  public user: User | null;

  public categoriesList: Category[];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.isShownSidebar = false;
    this.counter = 0;
    this.token = '';
    this.user = null;

    this.categoriesList = [];
  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });

    this.getAllCategories();

    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  toggleSidebar() {
    this.isShownSidebar = !this.isShownSidebar;
  }

  public login() {
    this.authService.login('maria@mail.com', '12345').subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  public getProfile() {
    this.authService.profile()!.subscribe((profile) => {
      console.log(profile);
      this.user = profile;
    });
  }

  public loginAndGetProfile() {
    this.authService
      .login('maria@mail.com', '12345')
      .pipe(
        switchMap((token) => {
          this.token = token.access_token;
          return this.authService.profile()!;
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  public getAllCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((data) => (this.categoriesList = data));
  }

  public logout() {
    this.authService.logout();
    this.user = null;
    this.token = '';
    this.router.navigate(['/home']);
  }
}
