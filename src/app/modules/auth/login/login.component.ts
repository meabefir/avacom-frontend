import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hideLogin = true;
  hideRegister = true;

  loginUsername = new FormControl('');
  loginPassword = new FormControl('');

  registerUsername = new FormControl('');
  registerEmail = new FormControl('');
  registerPassword = new FormControl('');

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private routerService: Router) { }

  ngOnInit(): void {
  }

  async login() {
    await this.loginService.login({
      username: this.loginUsername.value,
      password: this.loginPassword.value
    }).then(res => {
      //this.errorService.add(res.message)
 
      let token = res.token
      localStorage.setItem("token", token)
      this.routerService.navigate(['/home'])

      this.notificationService.add("Logged in.")

      // login successful
    }).catch(err => {
      
      // login failed
    })    

  }

  async register() {
    await this.loginService.register({
      username: this.registerUsername.value,
      email: this.registerEmail.value,
      password: this.registerPassword.value
    }).then(res => {
      this.notificationService.add(res.message)

      this.loginUsername.setValue(this.registerUsername.value)
      this.loginPassword.setValue(this.registerPassword.value)

      this.registerUsername.reset()
      this.registerEmail.reset()
      this.registerPassword.reset()
      // user registered
    }).catch(err => {
      
      // user not registered
    })    
  }

}
