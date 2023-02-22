import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyaccountComponent } from './myaccount/myaccount.component';

import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  // other routes here
  { path: 'login', component: LoginComponent },
  { path: 'myaccount', component: MyaccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
