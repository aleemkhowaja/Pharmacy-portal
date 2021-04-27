import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuplierModel } from 'src/models/suplier';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-suplier-details',
  templateUrl: './suplier-details.component.html',
  styleUrls: ['./suplier-details.component.css']
})
export class SuplierDetailsComponent implements OnInit {
  suplier: SuplierModel | undefined;
  lstSuplier: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private suplierService: SuplierService
              ) {

            }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getSupplierById(id);
      }
    );
  }

  viewSuplier(id: number) {
    this.router.navigate([`/suplier/${id}`]);
  }

  getSupplierById(_suplierId: number) {
    this.suplier = undefined;
    this.suplier = this.suplierService.getById(_suplierId);
    this.lstSuplier = this.suplierService.getDetailsSupliers();
  }

}
