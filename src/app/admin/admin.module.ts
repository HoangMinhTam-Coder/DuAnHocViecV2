import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdLoginComponent } from './components/ad-login/ad-login.component';
import { AdSignupComponent } from './components/ad-signup/ad-signup.component';
import { AdAddProductComponent } from './components/ad-add-product/ad-add-product.component';
import { AdUpdateProductComponent } from './components/ad-update-product/ad-update-product.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/components/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ModalComponent } from './components/uilt/modal/modal.component';
import { AdEditComponent } from './components/ad-edit/ad-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { AdManagerUserComponent } from './components/ad-manager-user/ad-manager-user.component';
import { ThongkeComponent } from './components/thongke/thongke.component';

export const route:Routes = [
  {
    path: '',
    component: AdLoginComponent
  },
  {
    path: 'ad_sign_up',
    component: AdSignupComponent
  }
]

@NgModule({
  declarations: [
    AdLoginComponent,
    AdSignupComponent,
    AdAddProductComponent,
    AdUpdateProductComponent,
    ModalComponent,
    AdEditComponent,
    AdManagerUserComponent,
    ThongkeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    ModalComponent,
    ThongkeComponent
  ]
})
export class AdminModule { }
