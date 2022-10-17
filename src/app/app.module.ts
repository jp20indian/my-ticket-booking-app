import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './safe.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookticketComponent } from './components/bookticket/bookticket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FinalpageComponent } from './components/finalpage/finalpage.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';

import { MatTableModule } from '@angular/material/table' ;

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeComponent,
    LoginComponent,
    BookticketComponent,
    CheckoutComponent,
    FinalpageComponent,
    NavbarComponent,
    AdminComponent,
    LoadingComponent,
    // DialogOverviewExampleComponent,
    // FormComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
