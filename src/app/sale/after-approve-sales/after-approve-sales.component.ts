import { SaleService } from './../sale.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SAVE_MESSAGE } from 'src/app/common/constants/constants.service';

@Component({
  selector: 'app-after-approve-sales',
  templateUrl: './after-approve-sales.component.html',
  styleUrls: ['./after-approve-sales.component.css']
})
export class AfterApproveSalesComponent implements OnInit {

  saleProductList: any = [];
  saledProductDetails: any = [];
  saleForm = this.fb.group({
    id : [''],
    reference : [''],
    amount : [''],
    quantity: [''],
    isDelivered : false,
    paymentMethod : null,
    customerId : null,
    saledproductDetails : [''],
    transStatus : ['']
  });

  transStats = [
    { id: 'Annulé', name: 'Annulé' },
    { id: 'Complété', name: 'Complété' },
    { id: 'Certifé', name: 'Certifé' },
    { id: 'En attente', name: 'En attente' }
  ];

  totalPrice = 0.0;
  totalQuantity = 0;
  constructor(private router: ActivatedRoute,
              private r: Router,
              private fb: FormBuilder,
              private saleService: SaleService) {
    /**
     * get saled products to approve and save in db
     */
    const salesList = this.r.getCurrentNavigation()?.extras.state?.saleProducts;
    /**
     * get the customer id sent from previous page
     */
    debugger
    const customerId = this.r.getCurrentNavigation()?.extras.state?.customerId;
    this.saleForm.get('customerId')?.setValue(customerId);
    this.saleProductList = JSON.parse(salesList);

   }

  ngOnInit(): void {
    this.saleProductList.forEach((_element: any, index: any) => {
      this.totalQuantity += Number(_element["quantity"]);
      this.totalPrice += Number(_element["ppu"]);
    });


    this.saleForm.get('amount')?.setValue(this.totalPrice);
    this.saleForm.get('quantity')?.setValue(this.totalQuantity);
    this.saleForm.get('saledproductDetails')?.setValue(JSON.stringify(this.saleProductList));
  }



/**
 * Submit the client/customer form
 * @returns
 */
 public  submitForm(paymentMethod : number)  : boolean | undefined
 {
   /**
    * if quantity is 0 then return to sale page
    */
  if(this.saleForm.get('quantity')?.value <= 0)
  {
    const navigationExtras: NavigationExtras = {
      state: {
        isProductSubmitedEmpty : true
      }
    };
    this.r.navigate(['/add-sale', ], navigationExtras);
    return false;
  }
  //  if (this.addClientForm.invalid) {
  //    alert('Please fill all the required fields to create a super hero!');
  //    return false;
  //  }
  if (this.saleForm.value.id === '') {
    this.saleForm.get('paymentMethod')?.setValue(paymentMethod);
  }
  this.saleService.save(this.saleForm.value).subscribe((response) => {
      this.r.navigate(['approve-sucessful-sale']);

      //  Swal.fire(SAVE_MESSAGE)
      //  this.saleForm.reset();
      // this.r.navigate(['/client'], { replaceUrl: true });
      });
  // else
    //  this.clientSv.save(this.addClientForm.value).subscribe(response=> {
    //    Swal.fire(SAVE_MESSAGE)
    //    this.addClientForm.reset();
    //    this.r.navigate(['/client'], { replaceUrl: true });
    //  });
  return true;
 }

}
