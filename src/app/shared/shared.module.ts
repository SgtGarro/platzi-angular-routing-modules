import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

import { HighlightDirective } from './directives/highlight.directive';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    HighlightDirective,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ProductsComponent,
    ProductComponent,
    HighlightDirective,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
  ],
})
export class SharedModule {}
