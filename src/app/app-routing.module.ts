import { AfterApprovePurchaseComponent } from './purchase-order/after-approve-purchase/after-approve-purchase.component';
import { SearchProductSuggestionComponent } from './product/product-suggestion/search-product-suggestion/search-product-suggestion.component';
import { ProductSuggestionDetailsComponent } from './product/product-suggestion/product-suggestion-details/product-suggestion-details.component';
import { AddProductSuggestionComponent } from './product/product-suggestion/add-product-suggestion/add-product-suggestion.component';
import { SaleInvoiceComponent } from './sale/sale-invoice/sale-invoice.component';
import { ApproveSuccessfulSalesComponent } from './sale/approve-successful-sales/approve-successful-sales.component';
import { DeliverySlipDetailComponent } from './delivery-slip/delivery-slip-detail/delivery-slip-detail.component';
import { DeliverySlipComponent } from './delivery-slip/delivery-slip.component';
import { OrderProposalDetailsComponent } from './order-proposal/order-proposal-details/order-proposal-details.component';
import { OrderProposalComponent } from './order-proposal/order-proposal.component';
import { OrderDetailsComponent } from './purchase-order/order-details/order-details.component';
import { AddOrderComponent } from './purchase-order/add-order/add-order.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AfterApproveSalesComponent } from './sale/after-approve-sales/after-approve-sales.component';
import { SearchQuoteComponent } from './sale/quote/search-quote/search-quote.component';
import { AddQuoteComponent } from './sale/quote/add-quote/add-quote.component';
import { QuoteComponent } from './sale/quote/quote.component';
import { AddSaleComponent } from './sale/add-sale/add-sale.component';
import { SaleDetailsComponent } from './sale/sale_details/sale-details.component';
import { SearchSuplierComponent } from './suplier/search-suplier/search-suplier.component';
import { AddSuplierComponent } from './suplier/add-suplier/add-suplier.component';
import { SuplierSuggestionDetailsComponent } from './suplier/suplier-suggestion-details/suplier-suggestion-details.component';
import { SuplierDetailsComponent } from './suplier/suplier-details/suplier-details.component';
import { SearchSuplierSuggestionComponent } from './suplier/search-suplier-suggestion/search-suplier-suggestion.component';
import { SuplierComponent } from './suplier/suplier.component';
import { ViewClientComponent } from './client/view-client/view-client.component';
import { SearchSaleComponent } from './sale/search-sale/search-sale.component';
import { SaleComponent } from './sale/sale.component';
import { SearchProductComponent } from './product/search-product/search-product.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
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
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { StockComponent } from './stock/stock.component';
import { SearchStockComponent } from './stock/search-stock/search-stock.component';
import { SearchInventoryComponent } from './stock/search-inventory/search-inventory.component';
import { UpdateInventoryComponent } from './stock/update-inventory/update-inventory.component';
import { InventoryDetailsComponent } from './stock/inventory-details/inventory-details.component';
import { SearchImportComponent } from './stock/search-import/search-import.component';
import { AddImportComponent } from './stock/add-import/add-import.component';
import {SalePdfReportComponent} from './sale/sale-pdf-report/sale-pdf-report.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'client',
    component: ClientComponent,
    data: { title: 'Client',  }
  },
  {
    path: 'add-client/:id',
    component: AddClientComponent,
    data: { title: 'Add Client' },
  },
  {
    path: 'view-client/:id',
    component: ViewClientComponent,
    data: { title: 'View Client' },
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
    path: 'archive',
    component: ArchiveComponent,
    data: { title: 'archive' },
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
    path: 'stock',
    component: StockComponent,
    data: { title: 'Stock' },
  },
  {
    path: 'inventory',
    component: SearchInventoryComponent,
    data: { title: 'Inventory' },
  },

  {
    path: 'inventory/:id',
    component: InventoryDetailsComponent,
    data: { title: 'Inventory Details' },
  },
  {
    path: 'update-inventory/:id',
    component: UpdateInventoryComponent,
    data: { title: 'Inventory Details' },
  },
  {
    path: 'import',
    component: SearchImportComponent,
    data: { title: 'Import' },
  },
  {
    path: 'add-import',
    component: AddImportComponent,
    data: { title: 'Add Import' },
  },


  //sale
  {
    path: 'sale',
    component: SaleComponent,
    data: { title: 'Sale' },
  },

  {
    path: 'sale/:id',
    component: SaleDetailsComponent,
    data: { title: 'Sale details' },
  },
  {
    path: 'add-sale',
    component: AddSaleComponent,
    data: { title: 'Add Sale' },
  },
  {
    path: 'after-approve-sale',
    component: AfterApproveSalesComponent,
    data: { title: 'After Approve Sale' },
  },
  {
    path: 'approve-sucessful-sale',
    component: ApproveSuccessfulSalesComponent,
    data: { title: 'After Approve Sucessful Sale' },
  },
  {
    path: 'sale-invoice/:id',
    component: SaleInvoiceComponent,
    data: { title: 'Sale Invoice' },
  },
  {
    path: 'sale-pdf-report/:id',
    component: SalePdfReportComponent,
    data: { title: 'Informations facture' },
  },


  //quote

  {
    path: 'quote',
    component: QuoteComponent,
    data: { title: 'Quote' },
  },

  {
    path: 'add-quote',
    component: AddQuoteComponent,
    data: { title: 'Add Quote' },
  },
  //purchase order
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
    data: { title: 'Purchase Orders',  }
  },
  {
    path: 'add-order',
    component: AddOrderComponent,
    data: { title: 'Add Order' },
  },
  {
    path: 'purchase-order/:id',
    component: OrderDetailsComponent,
    data: { title: 'Order Details' },
  },
  {
    path: 'after-purchase-approve',
    component: AfterApprovePurchaseComponent,
    data: { title: 'After Purcase Approve' },
  },



//proposal order
{
  path: 'order-proposal',
  component: OrderProposalComponent,
  data: { title: 'Orders Proposal ',  }
},
{
  path: 'order-proposal-details',
  component: OrderProposalDetailsComponent,
  data: { title: 'Proposal Details' },
}
,

//Delivery Slip
{
  path: 'delivery-slip',
  component: DeliverySlipComponent,
  data: { title: 'Delivery Slip' },
}
,
{
  path: 'delivery-slip-details',
  component: DeliverySlipDetailComponent,
  data: { title: 'Delivery Slip Details' },
},
{
  path: 'product-suggestion/:id',
  component: ProductSuggestionDetailsComponent,
  data: { title: 'Product suggestion details' },
},
{
  path: 'product-suggestion',
  component: SearchProductSuggestionComponent,
  data: { title: 'Product suggestions' },
},
{
  path: 'add-product-suggestion',
  component: AddProductSuggestionComponent,
  data: { title: 'Add Product Suggestion' },
}
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
  ViewClientComponent,
  ArchiveComponent,
  SearchArchiveComponent,
  NavBarComponent,
  PaginationComponent,
  ProductComponent,
  SearchProductComponent,
  AddProductComponent,
  SearchProductSuggestionComponent,
  SuplierComponent,
  SearchSuplierComponent,
  AddSuplierComponent,
  SuplierDetailsComponent,
  SearchSuplierSuggestionComponent,
  SuplierSuggestionDetailsComponent,
  StockComponent,
  SearchStockComponent,
  SearchInventoryComponent,
  UpdateInventoryComponent,
  InventoryDetailsComponent,
  SearchImportComponent,
  AddImportComponent,
  SaleComponent,
  SearchSaleComponent,
  AddSaleComponent,
  SaleDetailsComponent,
  QuoteComponent,
  SearchQuoteComponent,
  AddQuoteComponent,
];
