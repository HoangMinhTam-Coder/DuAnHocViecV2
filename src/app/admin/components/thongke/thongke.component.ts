import { Component } from '@angular/core';
import { order } from 'src/app/model/data_type';
import { ThongkeService } from 'src/app/services/thongke.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent {

  // Define
  listOrder!:order[];
  totalProduct!:number;
  totalUser!:number;
  totalOrder!:number;
  totalPrice!:number;
  p = 1;

  // Constructor
  constructor(private tksv:ThongkeService) {}

  // Init
  ngOnInit(){
    this.tksv.getAllOrder().subscribe((data) => {
      this.listOrder = JSON.parse(JSON.stringify(data));
      console.log(this.listOrder);
    })

    this.tksv.getTotalHoadon().subscribe(data => {
      this.totalOrder = Number(data)
    })

    this.tksv.getTotalProduct().subscribe(data => {
      this.totalProduct = Number(data)
    })

    this.tksv.getTotalUser().subscribe(data => {
      this.totalUser = Number(data);
    })

    this.tksv.getTotalPrice().subscribe(data => {
      this.totalPrice = Number(data);
    })
  }
}
