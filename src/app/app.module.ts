import { AddClientComponent } from './client/add-client/add-client.component';
import { SearchClientComponent } from './client/search-client/search-client.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { EmployeeModule } from './employee/employee.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { GraphQLModule } from './graphql.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxSelectModule } from 'ngx-select-ex';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchProductComponent } from './product/search-product/search-product.component';
import { ProductComponent } from './product/product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddProductComponent } from './product/add-product/add-product.component';
import { SearchProductSuggestionComponent } from './product/search-product-suggestion/search-product-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    PaginationComponent,
    ProductComponent,
    SearchProductComponent,
    AddProductComponent,
    SearchProductSuggestionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    NgxSelectModule,
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,   
    HttpClientModule,
    HomeModule,
    EmployeeModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    GraphQLModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
