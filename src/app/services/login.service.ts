import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { LoginDTO } from '../models/DTOS/login.dto';
import { RegisterDTO } from '../models/DTOS/reagister.dto';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private notificationService: NotificationService) { }

  async login(login_dto: LoginDTO) {
    return await fetch(`${baseUrl}/account/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login_dto)
    })
    .then(res => {
      if (res.ok == false)
      {
        return res.json().then(err => {throw err})
      }
      return res.json()
    })
    .then(data => {
      // console.log("nu e eraore")
      return data;
    })
    .catch(err => {
      // console.log("e eroare")
      // console.log(err)
      this.notificationService.add(err.message)
      throw(err)
    })
  }

  async register(register_dto: RegisterDTO) {
    return await fetch(`${baseUrl}/account/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(register_dto)
    })
    .then(res => {
      if (res.ok == false)
      {
        return res.json().then(err => {throw err})
      }
      return res.json()
    })
    .then(data => {
      // console.log("nu e eraore")
      return data;
    })
    .catch(err => {
      // console.log("e eroare")
      console.log(err)
      this.notificationService.add(err.message)
      throw(err)
    })
  }
}
