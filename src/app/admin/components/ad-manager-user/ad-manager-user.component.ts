import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { user } from 'src/app/model/data_type';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-manager-user',
  templateUrl: './ad-manager-user.component.html',
  styleUrls: ['./ad-manager-user.component.css'],
})
export class AdManagerUserComponent {
  // Define Variable
  listUser: user[] = [];
  User!: user;
  editUser: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    avt: new FormControl(''),
    sdt: new FormControl(''),
    role: new FormControl(''),
  });
  p: number = 1;

  // Constructor
  constructor(
    private admin: AdminService,
    public formBuilder: FormBuilder,
    private authsv: AuthService
  ) {}

  // Init
  ngOnInit() {
    this.getUser();

    this.editUser = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      address: [''],
      avt: [''],
      sdt: [''],
      role: ['User'],
    });
  }

  // Call Api Service get data
  getUser() {
    this.admin.getAllUser().subscribe((data) => {
      this.listUser = data;
    });
  }

  // Handler User
  Handler(item: user) {
    this.User = item;
  }

  // Handler Close
  HandlerClose() {
    this.editUser.reset();
  }

  // Call Api Delete
  Delete(id: number) {
    this.admin.DeleteUser(id).subscribe(
      () => {
        Swal.fire('Delete User Success!', '', 'success');
        this.getUser();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Delete Fail...',
          text: err,
        });
      }
    );
  }

  Edit(data: user) {
    let user: user = {
      id: Number(this.User.id)!,
      name: data.name == '' || data.name == null ? this.User.name : data.name,
      email:
        data.email == '' || data.email == null ? this.User.email : data.email,
      password: this.User.password,
      address:
        data.address == '' || data.address == null
          ? this.User.address
          : data.address,
      avt: data.avt == '' || data.avt == null ? this.User.avt : data.avt,
      sdt: data.sdt == '' || data.sdt == null ? this.User.sdt : data.sdt,
      role: data.role,
    };

    this.authsv.editUser(user).subscribe(
      () => {
        Swal.fire('Edit User Success!', '', 'success');
        this.getUser();
        this.editUser.reset()
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Edit User Fail...',
          text: err.error.message,
        });
      }
    );

    // this.admin.EditUser(user).subscribe(() => {
    //
    // },(err => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Edit User Fail...',
    //     text: err.error.message,
    //   });
    // }))
    console.log(user);
  }
}
