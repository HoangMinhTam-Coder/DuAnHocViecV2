import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css'],
})
export class AdEditComponent {
  // Define Variable
  productEdit!: product;
  productId!: any;
  isCheck: number = 0;
  Check: boolean = false;
  obj!:product;

  editProduct: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    image1: new FormControl(''),
    image2: new FormControl(''),
    category: new FormControl(''),
    size: new FormControl(''),
    color: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    sale: new FormControl(''),
    price_sale: new FormControl(''),
  });

  // Contructor
  constructor(
    private activeRoute: ActivatedRoute,
    private pro: ProductServiceService,
    public formBuilder: FormBuilder,
    private route: Router
  ) {}

  // Init
  ngOnInit() {
    // Lấy Id Product qua param url
    this.productId = this.activeRoute.snapshot.paramMap.get('id');

    // Subscribe để get data
    this.pro.GetProductByID(this.productId).subscribe((data) => {
      this.productEdit = data;
    });

    this.editProduct = this.formBuilder.group({
      name: [''],
      image: [''],
      image1: [''],
      image2: [''],
      category: [''],
      size: [''],
      color: [''],
      price: [''],
      description: [''],
      sale: [''],
      price_sale: [''],
    });
  }

  CheckChange(event: any) {
    if (event.target.checked) {
      this.isCheck = 1;
      this.Check = true;
    } else {
      this.isCheck = 0;
      this.Check = false;
    }
  }

  get la() {
    return this.editProduct.controls;
  }

  handlerProduct(data: product) {
    let obj: product = {
      id: Number(this.productId!),
      name: data.name == '' ? this.productEdit.name : data.name,
      price: data.price == 0 || data.price == null ? this.productEdit.price : data.price,
      category: data.category == '' ? this.productEdit.category : data.category,
      color:data.color == '' ? this.productEdit.color : data.color,
      image: data.image == '' ? this.productEdit.image : data.image,
      image1: data.image1 == '' ? this.productEdit.image1 : data.image1,
      image2: data.image2 == '' ? this.productEdit.image2 : data.image2,
      size: data.size == '' ? this.productEdit.size : data.size,
      sale: this.isCheck,
      price_sale: this.isCheck == 1 ? data.price_sale : this.productEdit.price,
      description: data.description == '' ? this.productEdit.description : data.description,
    };

    this.pro.UpdateProduct(obj).subscribe(() => {
      Swal.fire('Edit Success!', '', 'success');
      this.route.navigate(['/ad_update'])
      this.editProduct.reset();
    });
  }

  handlerBack() {
    this.editProduct.reset();
    this.route.navigate(['/ad_update'])
  }
}
