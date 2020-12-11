import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component"
import { SignupComponent } from "../app/signup/signup.component"
import { TodolistComponent } from "../app/todolist/todolist.component"
const routes: Routes = [
  { path: "" , component: LoginComponent},
  { path: "login" , component: LoginComponent},
  { path: "signUp", component: SignupComponent},
  { path: "todo-List/:id", component: TodolistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
