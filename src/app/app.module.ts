import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShopComponent } from './shop/shop.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { cartReducer, metaReducerLocalStorage } from './state/cart.reducer';
import { ProductsModule } from './products/products.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EffectsModule } from '@ngrx/effects';
import { CartEffect } from './state/cart.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Interceptor } from './Interceptor/Interceptor';
@NgModule({
  declarations: [AppComponent, ShopComponent],
  providers: [
    [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}]],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    AuthModule,
    ProductsModule,
    RouterModule,
    SlickCarouselModule,
    NgxPaginationModule,
    HttpClientModule,
    StoreModule.forRoot({cartEntries: cartReducer}, { metaReducers: [ metaReducerLocalStorage ]}),
    EffectsModule.forRoot([CartEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })],
})
export class AppModule {}
