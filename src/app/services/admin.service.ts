import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { login, user } from '../model/data_type';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // Define
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);

  // Contructor
  constructor(private http: HttpClient, private router: Router) {}

  // API For Login User
  adminLogin(data: login) {
    this.http
      .post(
        `https://localhost:7296/api/User/login?email=${data.email}&password=${data.password}`,
        data
      )
      .subscribe((result) => {
        var user = JSON.parse(JSON.stringify(result));
        console.log(user.user.role);
        if (user.user.role == 'Admin') {
          var user = JSON.parse(JSON.stringify(result));
          localStorage.setItem('admin', JSON.stringify(user.user));
          localStorage.setItem('token', JSON.stringify(user.tokens));
          localStorage.setItem('role', JSON.stringify(user.user.role));
          Swal.fire('Good job!', 'Login Success!', 'success');
          this.router.navigate(['/ad_add_prd']);
          this.isAdminLoggedIn.next(true);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'error',
            title: 'Login Error...',
            text: 'Something went wrong!',
          });
        }
      });
  }

   // API For Get User By Admin
  getAllUser() {
    return this.http.get<user[]>(`https://localhost:7296/api/User/GetUserById`);
  }

  // Api Delete User Role User
  DeleteUser(id: number) {
    return this.http.delete(`https://localhost:7296/api/User/${id}`)
  }

  // Api Edit User By Admin
  EditUser(user:user) {
    return this.http.put(`https://localhost:7296/api/User?id=${user.id}`, user)
  }
}
