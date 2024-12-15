import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() public totalPages: number = 1;
  @Input() public currentPage: number = 1;
  @Output() public pageChanged: EventEmitter<number> = new EventEmitter();

  public changePage (page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.pageChanged.emit(page);
  }
}
