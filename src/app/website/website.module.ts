import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { WebsiteRoutingModule } from './website-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,

    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, SwiperModule, SharedModule],
})
export class WebsiteModule {}
