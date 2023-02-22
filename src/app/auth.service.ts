import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(value: { firstname: string,lastname: string, email: string, password: string }) {
    return this.http.post<{message:string,email:string,token: string}>('https://checklistforme.online/7elevenapi/public/register', value);
  }

  login(value: {email: string, password: string }) {
    return this.http.post<{message:string,email:string,token: string}>('https://checklistforme.online/7elevenapi/public/login', value);
  }

  getoneproducts(value: {productid: number}) {
    return this.http.post<any>(`https://checklistforme.online/7elevenapi/public/getoneproducts`, value);
  }
  userdetails(value: {email: string, token: string }) {
    return this.http.post<{message:string,firstname:string,lastname: string,email: string}>('https://checklistforme.online/7elevenapi/public/userdetails', value);
  }
  getcategories() {
    return this.http.get<{message:string,stats: any[]}>('https://checklistforme.online/7elevenapi/public/categories');
  }
  newproducts() {
    return this.http.get<{message:string,stats: any[]}>('https://checklistforme.online/7elevenapi/public/newproducts');
  }
  gettasks() {
    return this.http.get<{message:string,stats: any[]}>('https://checklistforme.online/7elevenapi/public/tasks');
  }
  getnotes() {
    return this.http.get<{message:string,stats: any[]}>('https://checklistforme.online/7elevenapi/public/notes');
  }
  getallproducts(){
    return this.http.get<{message:string,stats: any[]}>('https://checklistforme.online/7elevenapi/public/getallproducts');
  }
  
  
}
