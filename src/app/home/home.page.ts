import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      account_email: ['', [Validators.required]],
      account_password: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['main']);
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onSubmit($event){
    this.dataService.request('login', this.loginForm.value).subscribe((res: any) => {
      if(res.data){
        this.userService.setUser(res.data);
        this.loginForm.reset();
        this.presentToast('Successfully Logged in!');
        this.userService.setLoggedIn();
        this.router.navigate(['/main']);
        console.log(this.userService.getUser());
        console.log(this.userService.isLoggedIn());
      }else if(res.error){
      }
    });
  }



}
