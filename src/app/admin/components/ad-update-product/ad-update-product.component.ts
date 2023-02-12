import { Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, pluck } from 'rxjs';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../uilt/modal/modal.component';

@Component({
  selector: 'app-ad-update-product',
  templateUrl: './ad-update-product.component.html',
  styleUrls: ['./ad-update-product.component.css'],
})
export class AdUpdateProductComponent {

  // Define Varible
  search!:string;
  listProduct: product[] = [];
  checkEditProduct!: product;
  isDelete: boolean = false;
  p:number = 1;

  // Constructor
  constructor(
    private productStore: ProductServiceService, public dialog: MatDialog, private route: Router) {}

  // Init
  ngOnInit() {
    // Subscrible get tất cả sản phẩm về
    this.GetData();
  }

  // Call Api Get Data
  GetData() {
    this.productStore.GetAllProducts().subscribe((data) => {
      this.listProduct = JSON.parse(JSON.stringify(data)).ds.result;
      console.log(data);
      console.log(this.listProduct);
    });
  }

  // Thực hiện Handler Edit Data
  handleEdit(id:any) {
    this.checkEditProduct = id;
    this.route.navigate([`product_edit/${id}`])
  }

  // Thực hiện Hanler Delete
  handleDelete(item:product) {
    Swal.fire({
      title: `Do you want delete ${item.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("xÓA");
        this.productStore.DeleteProduct(item.id).subscribe(() => {
           Swal.fire('Delete Success!', '', 'success')
          }
        );
      }
    })
  }

  // Handler Search
  handlerSearch(event:any) {
    if(event.target.value == null || event.target.value == '' || event.target.value == undefined) {
      this.GetData();
    } else {
      this.productStore.SearchProduct(event.target.value).subscribe(rep=> {
        this.listProduct = rep
      })
    }
  }
}
