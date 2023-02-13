import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { history_detail, product } from 'src/app/model/data_type';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

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
    private order:OrderService,
    private http: HttpClient) {
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

  exportPdf() {
    this.http.get(`https://localhost:7296/api/HoaDon/generatepdf?id=${this.productId}`, { responseType: 'blob' }).subscribe(
      (pdfData) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfData);
        link.download = 'HelloWorld.pdf';
        link.click();
        Swal.fire(
          'Good job!',
          'Export Success',
          'success'
        )
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Export Error...',
          text: 'Try Again!',
        })
      }
    );
  }
}
