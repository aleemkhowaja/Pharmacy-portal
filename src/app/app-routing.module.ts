import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {} from './employee/create/create.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { HomeComponent } from './home/home.component';
import { SearchClientComponent } from './client/search-client/search-client.component';
import { ArchiveComponent } from './client/archive/archive.component';
import { SearchArchiveComponent } from './client/archive/search-archive/search-archive.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { SearchProductSuggestionComponent } from './product/search-product-suggestion/search-product-suggestion.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { SuplierComponent } from './suplier/suplier.component';
import { AddSuplierComponent } from './suplier/add-suplier/add-suplier.component';
import { SuplierDetailsComponent } from './suplier/suplier-details/suplier-details.component';
import { SearchSuplierSuggestionComponent } from './suplier/search-suplier-suggestion/search-suplier-suggestion.component';
import { SuplierSuggestionDetailsComponent } from './suplier/suplier-suggestion-details/suplier-suggestion-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'client',
    component: ClientComponent,
    data: { title: 'Client' },
  },
  {
    path: 'add-client/:Id',
    component: AddClientComponent,
    data: { title: 'Add Client' },
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { title: 'Product' },
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product details' },
  },
  {
    path: 'product-suggestion',
    component: SearchProductSuggestionComponent,
    data: { title: 'Product suggestions' },
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    data: { title: 'Add Product' },
  },
  {
    path: 'add-product/:id',
    component: AddProductComponent,
    data: { title: 'Update Product' },
  },
  {
    path: 'suplier',
    component: SuplierComponent,
    data: { title: 'Suplier' },
  },
  {
    path: 'suplier-suggestion',
    component: SearchSuplierSuggestionComponent,
    data: { title: 'Suplier suggestions' },
  },
  {
    path: 'suplier/:id',
    component: SuplierDetailsComponent,
    data: { title: 'Suplier details' },
  },
  {
    path: 'suplier-suggestion/:id',
    component: SuplierSuggestionDetailsComponent,
    data: { title: 'Suplier details' },
  },
  {
    path: 'add-suplier',
    component: AddSuplierComponent,
    data: { title: 'Add Suplier' },
  },
  {
    path: 'add-suplier/:id',
    component: AddSuplierComponent,
    data: { title: 'Update Suplier' },
  },

  {
    path: 'archive',
    component: ArchiveComponent,
    data: { title: 'archive' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  EmployeeComponent,
  HomeComponent,
  LoginComponent,
  SearchClientComponent,
  ClientComponent,
  AddClientComponent,
  ArchiveComponent,
  SearchArchiveComponent,
];
