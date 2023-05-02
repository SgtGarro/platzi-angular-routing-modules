import { Component, Input, OnInit } from '@angular/core';
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
    private categoryService: CategoryService
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
  }

  toggleSidebar() {
    this.isShownSidebar = !this.isShownSidebar;
  }

  public login() {
    this.authService.login('sebas123@gmail.com', '12345').subscribe({
      next: (token) => {
        this.token = token.access_token;
      },
    });
  }

  public getProfile() {
    this.authService.profile()?.subscribe((profile) => {
      console.log(profile);
      this.user = profile;
    });
  }

  public loginAndGetProfile() {
    this.authService
      .login('sebas123@gmail.com', '12345')
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
}
