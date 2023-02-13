import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../model/data_type';

@Injectable({
  providedIn: 'root'
})
export class ThongkeService {

  constructor(private http: HttpClient) { }

  getTotalUser() {
    return this.http.get(`https://localhost:7296/api/ThongKe/TotalUser`);
  }

  getTotalProduct() {
    return this.http.get(`https://localhost:7296/api/ThongKe/TotalProduct`);
  }

  getTotalHoadon() {
    return this.http.get(`https://localhost:7296/api/ThongKe/TotalOrder`);
  }

  getTotalPrice() {
    return this.http.get(`https://localhost:7296/api/ThongKe/TotalPrice`);
  }

  getAllOrder() {
    return this.http.get<order[]>('https://localhost:7296/api/HoaDon/GetHoaDon');
  }
}
