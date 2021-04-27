import { ClientService } from './../client.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private clientSv: ClientService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //const _clientId: number = this.router.snapshot.params.id;
  }

}
