import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isLoading: boolean = false;

  constructor (private loadingService: LoadingService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit (): void {
    this.loadingService.loading$.subscribe((loadingState) => {
      this.isLoading = loadingState;
      this.cdr.detectChanges();
    })
  }
}
