import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      account_email: ['', [Validators.required]],
      account_password: ['', [Validators.required]],
      account_lname: ['', [Validators.required]],
      account_fname: ['', [Validators.required]],
      account_address: ['', [Validators.required]],
    });
  }

  onSubmit($event) {
    if (this.registerForm.valid) {
      this.dataService
        .request('register', this.registerForm.value)
        .subscribe((res: any) => {
          if (res.data) {
            Swal.fire({
              icon: 'success',
              title: 'Succesfully Registered',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                // console.log(this.registerForm.value);
                this.registerForm.reset();
                this._router.navigate(['/login']);
              }
            });
          } else if (res.error) {
            Swal.fire({
              icon: 'error',
              title: res.error,
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                // console.log(this.registerForm.value);
                this.registerForm.reset();
              }
            });
          }
        });
    }
  }
}
