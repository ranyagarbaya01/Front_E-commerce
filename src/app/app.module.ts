import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { FormsModule } from '@angular/forms';
import { AddEditTypeComponent } from './parametrage/add-edit-type/add-edit-type.component';
import { ListTypeComponent } from './parametrage/list-type/list-type.component';
import { AddEditFamilleComponent } from './parametrage/add-edit-famille/add-edit-famille.component';
import { ListFamilleComponent } from './parametrage/list-famille/list-famille.component';
import { AddEditUserComponent } from './parametrage/add-edit-user/add-edit-user.component';
import { ListUserComponent } from './parametrage/list-user/list-user.component';
import { AddEditClientComponent } from './parametrage/add-edit-client/add-edit-client.component';
import { ListClientComponent } from './parametrage/list-client/list-client.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailedComponent,
    AddEditClientComponent,
    ListClientComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,FormsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
