import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Select} from '../../../models/select';
import {untilDestroyed} from '@ngneat/until-destroy';
import {CountryService} from '../../common-services/country/country.service';
import {ExportPdfService} from '../../common-services/pdf-export/export-pdf.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ActivatedRoute} from '@angular/router';
import {SaleService} from '../sale.service';
import {QueryRef} from 'apollo-angular';
import {SaleModel} from '../../../models/sale';
import {TransactionModel} from '../../../models/transaction-details';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//
// class Product1 {
//   name?: string;
//   price?: number;
//   qty?: number;
// }

// class Invoice{
//   customerName?: string;
//   address?: string;
//   contactNo?: number;
//   email?: string;
//
//   products: Product1[] = [];
//   additionalDetails?: string;
//
//   constructor(){
//     // Initially one empty product row we will show
//     this.products.push(new Product1());
//   }
// }


@Component({
  selector: 'app-sale-pdf-report',
  templateUrl: './sale-pdf-report.component.html',
  styleUrls: ['./sale-pdf-report.component.css']
})

export class SalePdfReportComponent implements OnInit {

 // invoice = new Invoice();

  constructor(private fb: FormBuilder,
              private country: CountryService,
              private route: ActivatedRoute,
              private saleService: SaleService
              ) {

   // this.products.push(new Product1());
  }
  // addProduct(){
  //   this.invoice.products.push(new Product1());
  // }

  form = this.fb.group({
    client: [''],
    contact: [''],
    address: [''],
    city: [''],
    postalcode: [''],
    country: [''],
  });

  lstSaleProducts: any;
  transactionQuery: QueryRef < any > | undefined;
  addEditSaleDto: SaleModel | undefined;
  totalAmountWithoutDiscount = 0.0;
  totalDiscount = 0.0;
  totalAmountAfterDiscount = 0.0;
  htTotalAmount = 0.0;
  vatAmount = 0.0;
  countries: Select[] = [];


saledProduct: any[] = [];


  ngOnInit(): void {

    const transactionId: number = this.route.snapshot.params.id;
    if (transactionId > 0) {
      this.getById(transactionId);
      // this.transactionQuery ?.refetch();
    }

    this.initCountris();
  }

  /**
   * get transaction by id
   * @param transactionId
   */
  getById(transactionId: number) {
    this.lstSaleProducts = null;
    this.transactionQuery = this.saleService.getById(transactionId);
    this.transactionQuery.valueChanges.subscribe(response => {
      this.addEditSaleDto = response.data.transactionById;
      this.lstSaleProducts = this.addEditSaleDto?.transactionDetails;
      this.calculateInvoiceDetails();
    });
  }

  calculateInvoiceDetails()
  {
    this.lstSaleProducts.forEach((_element: any, index: any) => {

      this.saledProduct.push(_element);

      const  totalOriginalPrice = Number(_element.product.ppv) * Number(_element.quantity);
      const  totalAfterDiscount = Number(_element.amountAfterDiscount) * Number(_element.quantity);
      this.totalAmountWithoutDiscount += totalOriginalPrice;
      this.totalAmountAfterDiscount += totalAfterDiscount;
      const  vatPer =  (1 + (Number(_element.product?.vatOnSale) / 100));
      const htCalculate = totalOriginalPrice / vatPer;
      this.htTotalAmount += htCalculate;
    });
    this.totalDiscount = this.totalAmountWithoutDiscount - this.totalAmountAfterDiscount;

    this.vatAmount =  this.totalAmountWithoutDiscount -  this.htTotalAmount;
  }

  /**
   * init all countries
   */
  public initCountris(): void {
    this.country.filter().pipe().subscribe(response => {
      this.countries = response.data.getAllCountries;
    });
  }

  printPdf(): void {

    this.prepareHeader();
    // this.exportPdfService.generatePDF(this.prepareHeader(), 'contect', 'footer');
  }




  prepareHeader(): void {

    const docDefinition = {
      content: [
        {
          text: 'Pharmacie EL QODS - Arfoud \n',
          fontSize: 16,
          color: '#00beb0'
        },
        {
          text: ''+this.addEditSaleDto?.createdBy?.firstName + '\n \n \n \n',
          fontSize: 12,
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Facture N°' + this.addEditSaleDto?.transactionNumber,
              color: '#00beb0',
            }
          ]
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.form.get('client')?.value,
                bold: true
              },
              { text: this.form.get('address')?.value + ',' +  this.form.get('city')?.value + ',' + this.form.get('country')?.value},
            //  { text: 'Email' },
              { text: this.form.get('contact')?.value }
            ],
            [
              {
                text: 'Date : ' + this.addEditSaleDto?.transDate,
                alignment: 'right'
              },
              {
                text: 'Bill No :' + this.addEditSaleDto?.transactionNumber,
                //${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
               ['Produit', 'Qté', 'P.U', 'Total'],
              ...this.saledProduct.map(p => ([p?.product?.name, p?.quantity, p?.amountAfterDiscount, Number(p?.quantity) * Number(p?.amountAfterDiscount)]))
              ]
          }
        },
        {
          text: '\n \n'
        },
        {
            columns: [
              [
                {
                  text: 'Total Organisme : 0 DHS \n' ,
                  alignment: 'right'
                },
                {
                  text: 'Total Client :' + this.totalAmountAfterDiscount+' DHS \n',
                  alignment: 'right'
                },
                {
                  text: 'Total :' + this.totalAmountAfterDiscount+' DHS \n',
                  alignment: 'right'
                }
              ]
            ]
        },
        {
          text: '\n \n \n \n \n \n \n \n \n',
        },
        {
          columns: [
            [{ qr: this.addEditSaleDto?.transactionNumber, fit: '50', style: 'sectionHeader' }],
            [{ text: 'Signature', alignment: 'right', italics: true, style: 'sectionHeader'}],
          ]
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    // @ts-ignore
    pdfMake.createPdf(docDefinition).open();
  }
}
