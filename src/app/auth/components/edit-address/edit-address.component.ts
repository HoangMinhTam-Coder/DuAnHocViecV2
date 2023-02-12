import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { user } from 'src/app/model/data_type';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent {
  menuType: string = '';
  user!: user;
  data!: user;

  editInfo: FormGroup = new FormGroup({
    avt: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl(''),
    sdt: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(public formBuilder: FormBuilder, private authsv: AuthService) {}

  ngOnInit() {
    this.editInfo = this.formBuilder.group({
      avt: ['', [Validators.required]],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sdt: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    if (localStorage.getItem('admin')) {
      let sellerStore = localStorage.getItem('admin');
      let sellerData = sellerStore && JSON.parse(sellerStore);
      this.user = sellerData;
      this.menuType = 'seller';
    } else if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.menuType = 'user';
      this.user = userData;
    }
  }

  handlerEdit(data: any) {
    let user: user = {
      id: this.user.id!,
      email: data.email == '' ? this.user.email : data.email,
      name: data.name == '' ? this.user.name : data.name,
      password: this.user.password,
      address: data.address == '' ? this.user.address : data.address,
      avt: data.avt == '' ? this.user.avt : data.avt,
      sdt: data.sdt == '' ? this.user.sdt : data.sdt,
      role: this.user.role,
    };

    this.authsv.editUser(user).subscribe(
      (res) => {
        Swal.fire('Good job!', 'Update User Success', 'success');

        var user = JSON.parse(JSON.stringify(res));
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user.userss));

        this.authsv.userLogins.next(JSON.parse(JSON.stringify(user.userss)));
        this.authsv.userLogins.subscribe((res) => {
          this.user = res!;
        });
        this.editInfo.reset();
      },
      (error) => {
        Swal.fire('Good job!', error.error.message, 'success');
      }
    );
  }
}
