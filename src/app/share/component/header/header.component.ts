import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetCartInit, removeProductById } from 'src/app/state/cart.action';
import {
  ProductGroup,
  selectGroupedCartEntries,
  selectTotalPrice,
} from 'src/app/state/cart.selector';
import localeFr from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { cart, cartGroup, product } from 'src/app/model/data_type';
import { Cart } from 'src/app/state/cart.reducer';
import { AuthService } from 'src/app/services/auth.service';
registerLocaleData(localeFr, 'vi');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  // Define
  cartEntries$: Observable<ProductGroup[]>;
  totalPrice$: Observable<number>;
  cartGroups!: cartGroup[];
  menuType: string = 'default';
  cart!: Cart[];
  name!: string;
  Map!:any

  // Constructor
  constructor(
    private store: Store,
    private route: Router,
    private pro: ProductServiceService,
    private auth:AuthService
  ) {
    this.cartEntries$ = store.select(selectGroupedCartEntries);
    this.totalPrice$ = store.select(selectTotalPrice);
  }

  // Init
  ngOnInit() {
    // Check type Header dựa vào role User Login
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user')) {
          this.menuType = 'user';
          this.auth.userLogins.subscribe(res => {
            this.name = res?.name!
          })
        } else if (localStorage.getItem('admin')) {
          let userStore = localStorage.getItem('admin');
          let userData = userStore && JSON.parse(userStore);
          this.name = userData.name;
          this.menuType = 'admin';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  remove(entry: product) {
    this.store.dispatch(removeProductById({product: entry}));
  }

  userLogout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.name = '';
      this.menuType = 'default';
      this.route.navigate(['/login']);
    }
  }

  adminLogout() {
    if (localStorage.getItem('admin')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.name = '';
      this.menuType = 'default';
      this.route.navigate(['/admin']);
    }
  }
}
