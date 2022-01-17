import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messages: string[] = [];

  add(message:string): void {
    this.messages.push(message);
  }

  remove(): void {
    this.messages.shift()
  }

  clear(): void {
    this.messages = [];
  }

  constructor() { }
}
