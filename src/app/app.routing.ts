import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes =[
  { path:'', redirectTo: '/login', pathMatch:'full'},
  { path:'', component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  { path:'login', component: LoginComponent},
  { path:'**', component: PageNotFoundComponent},


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatFormFieldModule ,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
