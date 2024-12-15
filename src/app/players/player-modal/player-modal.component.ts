import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Player } from '../../shared/models/player.model';
import { Class } from '../../shared/models/class.model';
import { Faction } from '../../shared/models/faction.model';
import { Race } from '../../shared/models/race.model';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-player-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './player-modal.component.html',
})
export class PlayerModalComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public show: boolean = false;
  @Input() public player: Player;
  @Output() public cancel = new EventEmitter<void>();
  @Output() public save = new EventEmitter<void>();
  protected classes: Class[] = [];
  protected races: Race[] = [];
  protected factions: Faction[] = [];

  constructor (private apiService: ApiService, private loadingService: LoadingService) {
  }

  public ngOnInit (): void {
    this.readClasses();
    this.readRaces();
    this.readFactions();
  }

  public onClose (): void {
    this.cancel.emit();
  }

  public onSave (): void {
    console.log(this.player);
    // this.save.emit();
  }

  private readClasses (): void {
    this.loadingService.setLoading(true);
    this.apiService.readClasses().subscribe({
      next: (response: Class[]) => {
        this.classes = response;
      },
      error: (err) => {
        console.error('Error loading classes:', err);
      },
      complete: () => {
        this.loadingService.setLoading(false);
      }
    });
  }

  private readRaces (): void {
    this.loadingService.setLoading(true);
    this.apiService.readRaces().subscribe({
      next: (response: Race[]) => {
        this.races = response;
      },
      error: (err) => {
        console.error('Error loading races:', err);
      },
      complete: () => {
        this.loadingService.setLoading(false);
      }
    });
  }

  private readFactions (): void {
    this.loadingService.setLoading(true);
    this.apiService.readFactions().subscribe({
      next: (response: Faction[]) => {
        this.factions = response;
      },
      error: (err) => {
        console.error('Error loading factions:', err);
      },
      complete: () => {
        this.loadingService.setLoading(false);
      }
    });
  }
}
