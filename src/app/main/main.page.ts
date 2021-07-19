import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public updateForm: FormGroup;
  public deleteForm: FormGroup;
  public fname: string = this.userService.account_obj.account_fname;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private toastController: ToastController,
    ) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      account_id: this.userService.account_obj.account_id,
      account_email: ['', [Validators.required]],
      account_password: ['', [Validators.required]],
      account_fname: ['', [Validators.required]],
      account_lname: ['', [Validators.required]],
      account_address: ['', [Validators.required]],
    });

    this.deleteForm = this.formBuilder.group({
      account_id: this.userService.account_obj.account_id,
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onSubmit($event){
    this.dataService
    .request('update', this.updateForm.value)
    .subscribe((res: any) => {
      if(res.data){
        this.userService.setUser(res.data);
        this.updateForm.reset();
        this.router.navigate(['main']);
      }else if(res.error){
        console.log(res.error);
      }
    });
  }

  logOut(){
    this.userService.setLogOut();
    this.userService.clearUser();
    this.presentToast('Successfully Logged Out!');
    this.router.navigate(['home']);
  }

  deleteAcc(){
    this.dataService
    .request('delete', this.deleteForm.value)
    .subscribe((res: any) => {
      if(res.data){
        this.userService.setLogOut();
        this.userService.clearUser();
        this.presentToast('AccountSuccesfully Deleted!');
        this.router.navigate(['home']);
      }else if(res.error){
        console.log(res.error);
      }
    });
  }

}
