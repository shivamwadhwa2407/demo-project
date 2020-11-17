import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  password: string;
  email: string;
  emailValidateBool: boolean;
  passwordValidateBool: boolean;

  validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
      this.emailValidateBool = false;
    } else {
      this.emailValidateBool = true;
    }
  }

  validatePassword(password) {
    if (password){
      if (password.length >= 8){
        this.passwordValidateBool = true;
      } else{
        this.passwordValidateBool = false;
      }
    }
  }

  async validateForm(email, password) {
    this.validateEmail(email);
    this.validatePassword(password); 
    if (this.emailValidateBool && this.passwordValidateBool){
      let obj = {
        email:this.email,
        password: this.password
      }
      let loginData = await this.login(obj)
      if (loginData["status"] == 200) {
        alert("Login Success !!")  
        window.open('https://nacho-movie-suggestor.web.app/', '_blank');
      } if (loginData["status"] == 403) {
        alert("Email Not Found !!")  
      }if (loginData["status"] == 404) {
        alert("Incorrect Password !!")
      }
    }
  }

  login(obj){
    return this.http.post<any>('http://127.0.0.1:5000/login/', obj)
                .toPromise()
                .then(res => res)
                .catch(err => err)

}

}
