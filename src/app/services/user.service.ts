import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: boolean = false;

  account_id: string;
  account_email: string;
  account_fname: string;
  account_lname: string;
  account_address: string;

  account_obj = {
    account_id: '',
    account_email: '',
    account_fname: '',
    account_lname: '',
    account_address: ''
  };

  constructor() { }

  setUser(account_obj: any){
    this.account_obj.account_id = account_obj.account_id;
    this.account_obj.account_email = account_obj.account_email;
    this.account_obj.account_fname = account_obj.account_fname;
    this.account_obj.account_lname = account_obj.account_lname;
    this.account_obj.account_address = account_obj.account_address;
  }

  getUser(){
    return this.account_obj;
  }

  clearUser(){
    this.account_obj = {
      account_id: '',
      account_email: '',
      account_fname: '',
      account_lname: '',
      account_address: ''
    };
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(){
    this.loggedIn = true;
  }

  setLogOut(){
    this.loggedIn = false;
  }

}
