import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { product } from '../model/data_type';
import { ProductServiceService } from '../services/product-service.service';
import { addProductToCart } from '../state/cart.action';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  // Define
  listProduct!:product[];
  p:number = 1;

  // Constructor
  constructor(
    private product:ProductServiceService,
    private store: Store){}

  // Init
  ngOnInit() {
    this.getProduct()
  }

  // Call Api Get Data
  getProduct(){
    this.product.GetAllProducts().subscribe(data => {
      this.listProduct = JSON.parse(JSON.stringify(data)).ds.result;
    })
  }

  SortPro(e:any){
    switch(e.target.value) {
      case 'price_asc':
        this.product.SortProduct('price_asc').subscribe((data) => {
          this.listProduct = data;
        });
        break;
      case 'price_desc':
        this.product.SortProduct('price_desc').subscribe((data) => {
          this.listProduct = data;
        });
        break;
      case 'Default':
        this.getProduct();
        break;
    }

  }

  onCheckboxChange(e:any, category:string) {
    if (e.target.checked) {
      this.product.FilterColorProduct(category).subscribe((data) => {
        this.listProduct = data;
      });
    } else {
      this.getProduct();
    }
  }

  onCheckboxCategoryChange(e:any, category:string) {
    if (e.target.checked) {
      this.product.FillerCategoryProduct(category).subscribe((data) => {
        this.listProduct = data;
      });
    } else {
      this.getProduct();
    }
  }

  buyProduct(Product: product) {
      this.store.dispatch(addProductToCart({product: Product}));
  }
}
