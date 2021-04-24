import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Pagination } from 'src/models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() pageNumberChanged = new EventEmitter<number>();
  @Input() pagination: Pagination | undefined;

  constructor() {}

  ngOnInit(): void {}

  pageChanged(event: any): void {
    this.pageNumberChanged.next(event.page);
  }
}
