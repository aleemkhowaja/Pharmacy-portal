import { ProductSuggestionDetailsComponent } from './product/product-suggestion/product-suggestion-details/product-suggestion-details.component';
import { SearchProductSuggestionComponent } from './product/product-suggestion/search-product-suggestion/search-product-suggestion.component';
import { AddProductSuggestionComponent } from './product/product-suggestion/add-product-suggestion/add-product-suggestion.component';
import { DeliverySlipDetailComponent } from './delivery-slip/delivery-slip-detail/delivery-slip-detail.component';
import { DeliverySlipComponent } from './delivery-slip/delivery-slip.component';
import { ProviderDialogComponent } from 'src/app/common-services/provider-dialog/provider-dialog.component';
import { ProviderComponent } from './common-services/provider/provider.component';
import { OrderProposalDetailsComponent } from './order-proposal/order-proposal-details/order-proposal-details.component';
import { SearchOrderProposalComponent } from './order-proposal/search-order-proposal/search-order-proposal.component';
import { OrderProposalComponent } from './order-proposal/order-proposal.component';
import { OrderDetailsComponent } from './purchase-order/order-details/order-details.component';
import { SearchOrderComponent } from './purchase-order/search-order/search-order.component';
import { AddOrderComponent } from './purchase-order/add-order/add-order.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from './graphql.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
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
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { SuplierComponent } from './suplier/suplier.component';
import { SearchSuplierComponent } from './suplier/search-suplier/search-suplier.component';
import { AddSuplierComponent } from './suplier/add-suplier/add-suplier.component';
import { SuplierDetailsComponent } from './suplier/suplier-details/suplier-details.component';
import { SearchSuplierSuggestionComponent } from './suplier/search-suplier-suggestion/search-suplier-suggestion.component';
import { SuplierSuggestionDetailsComponent } from './suplier/suplier-suggestion-details/suplier-suggestion-details.component';
import { StockComponent } from './stock/stock.component';
import { SearchStockComponent } from './stock/search-stock/search-stock.component';
import { SearchInventoryComponent } from './stock/search-inventory/search-inventory.component';
import { UpdateInventoryComponent } from './stock/update-inventory/update-inventory.component';
import { InventoryDetailsComponent } from './stock/inventory-details/inventory-details.component';
import { SearchImportComponent } from './stock/search-import/search-import.component';
import { AddImportComponent } from './stock/add-import/add-import.component';
import { CustomerDialogComponent } from './common-services/customer-dialog/customer-dialog.component';
import { ConfirmationDialogComponent } from './common-services/confirmation-dialog/confirmation-dialog.component';
import { ProductSaleDetailsDialogComponent } from './product/product-sale-details-dialog/product-sale-details-dialog.component';
import { BaseComponent } from './common-services/base/base.component';
import { AfterApproveSalesComponent } from './sale/after-approve-sales/after-approve-sales.component';
import { ApproveSuccessfulSalesComponent } from './sale/approve-successful-sales/approve-successful-sales.component';
import { SaleInvoiceComponent } from './sale/sale-invoice/sale-invoice.component';
import { ProductQuantityDetailDialogComponent } from './common-services/dialogs/product-quantity-detail-dialog/product-quantity-detail-dialog.component';
import { GlobalDiscountDialogComponent } from './common-services/dialogs/global-discount-dialog/global-discount-dialog.component';
import { AfterApprovePurchaseComponent } from './purchase-order/after-approve-purchase/after-approve-purchase.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    PaginationComponent,
    ProductComponent,
    SearchProductComponent,
    AddProductComponent,
    SearchProductSuggestionComponent,
    ProductDetailsComponent,
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
    CustomerDialogComponent,
    ConfirmationDialogComponent,
    ProductSaleDetailsDialogComponent,
    BaseComponent,
    AfterApproveSalesComponent,
    PurchaseOrderComponent,
    AddOrderComponent,
    SearchOrderComponent,
    OrderDetailsComponent,
    OrderProposalComponent,
    SearchOrderProposalComponent,
    OrderProposalDetailsComponent,
    ProviderComponent,
    ProviderDialogComponent,
    DeliverySlipComponent,
    DeliverySlipDetailComponent,
    ApproveSuccessfulSalesComponent,
    SaleInvoiceComponent,
    AddProductSuggestionComponent,
    SearchProductSuggestionComponent,
    ProductSuggestionDetailsComponent,
    ProductQuantityDetailDialogComponent,
    GlobalDiscountDialogComponent,
    AfterApprovePurchaseComponent
  ],
  imports: [
    CommonModule,
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
    GraphQLModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, BsModalRef],
  bootstrap: [AppComponent],
  entryComponents: [CustomerDialogComponent]
})
export class AppModule {}
