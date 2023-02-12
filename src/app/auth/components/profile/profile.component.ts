import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { signUp, user } from 'src/app/model/data_type';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Define
  isCheckPass:boolean = true;
  menuType: string = '';
  user!:user;

  changePasswordForm:FormGroup = new FormGroup({
    currentpassword: new FormControl(''),
    newpassword: new FormControl(''),
    repassword: new FormControl('')
  });

  // Constructor
  constructor(
    private route: Router,
    public formBuilder: FormBuilder,
    private authsv: AuthService) {}

  // Init
  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });

    if (localStorage.getItem('admin')) {
      let sellerStore = localStorage.getItem('admin');
      let sellerData = sellerStore && JSON.parse(sellerStore)[0];
      this.user = sellerData.name;
      this.menuType = 'seller';
    } else if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.user = userData;
      console.log(this.user);
      this.menuType = 'user';
    }
  }

  userLogout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.menuType = 'default';
      this.route.navigate(['/login']);
    }
  }

  get l() {
    return this.changePasswordForm.controls;
  }

  sendTheNewValue(event:any){
    let value = event.target.value;
    if(value === this.changePasswordForm.controls['newpassword'].value) {
      this.isCheckPass = true;
    } else {
      this.isCheckPass = false;
    }
  }

  resetPassword(data:any) {
    this.authsv.checkOldPass(this.user.id!, data.currentpassword, data.newpassword).subscribe((rep) => {
      Swal.fire(
        'Good job!',
        "Change Password Success",
        'success'
      )
      this.userLogout()
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: 'Change Password Error...',
        text: error.error.message,
      })
    })
  }
}

