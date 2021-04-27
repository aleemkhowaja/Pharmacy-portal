import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuplierModel } from 'src/models/suplier';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-suplier-suggestion-details',
  templateUrl: './suplier-suggestion-details.component.html',
  styleUrls: ['./suplier-suggestion-details.component.css']
})
export class SuplierSuggestionDetailsComponent implements OnInit {
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
          this.getSuplier(id);
      }
    );
  }

  viewSuplier(id: number) {
    this.router.navigate([`/suplier-suggestion/${id}`]);
  }

  getSuplier(_productId: number) {
    this.suplier = undefined;
    this.suplier = this.suplierService.getSpecificSuplier(_productId);
    this.lstSuplier = this.suplierService.getDetailsSupliers();
  }
}
