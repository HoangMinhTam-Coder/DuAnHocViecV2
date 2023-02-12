import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { history_detail, product } from 'src/app/model/data_type';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent {
  // Define
  listProduct!:history_detail[];
  total: number = 0;
  productId!: any;

  // Constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private order:OrderService) {
  }

  // Init
  ngOnInit() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id');

    this.order.getOrderHistoryById(Number(this.productId)).subscribe((data) => {
      this.listProduct = data;
      console.log(this.listProduct);
      data.forEach((item) => {
        if(item.products.sale && item.quantity) {
          this.total = this.total + (+item.products.price_sale * +item.quantity)
        } else {
          this.total = this.total + (+item.products.price * +item.quantity)
        }
      })
    })
  }
}
