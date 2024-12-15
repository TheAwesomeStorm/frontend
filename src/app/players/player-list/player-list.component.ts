import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Player } from '../../shared/models/player.model';
import { Paginated } from '../../shared/interfaces/paginated';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, PlayerModalComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {
  public players: Player[] = [];
  public currentPage: number = 1;
  public size: number = 2;
  public totalPages: number = 1;
  public showModal: boolean = false;
  public modalTitle: string = '';
  public selectedPlayer: Player;

  constructor (private apiService: ApiService, private loadingService: LoadingService) {
  }

  public ngOnInit (): void {
    this.loadPlayers();
  }

  public loadPlayers (): void {
    this.loadingService.setLoading(true);
    this.apiService.readPlayersPaginated(this.currentPage, this.size).subscribe({
      next: (response: Paginated<Player>) => {
        this.players = response.items;
        this.totalPages = Math.ceil(response.total / this.size);
      },
      error: (err) => {
        console.error('Error loading players:', err);
      },
      complete: () => {
        this.loadingService.setLoading(false);
      }
    });
  }

  public onPageChanged (newPage: number): void {
    this.currentPage = newPage;
    this.loadPlayers();
  }

  public editPlayer (): void {
    if (!this.selectedPlayer) return;
    this.loadingService.setLoading(true);
    this.apiService.updatePlayer(this.selectedPlayer.id, this.selectedPlayer).subscribe({
      complete: () => {
        this.loadPlayers();
        this.loadingService.setLoading(false);
      }
    });
  }

  public deletePlayer (playerId: string): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.loadingService.setLoading(true);
      this.apiService.deletePlayer(playerId).subscribe({
        complete: () => {
          this.loadPlayers();
          this.loadingService.setLoading(false);
        }
      });
    }
  }

  public showCreateModal (): void {
    this.selectedPlayer = {
      id: '',
      name: '',
      race: {id: '', name: ''},
      class: {id: '', name: ''},
      faction: {id: '', name: ''},
      level: 1,
      isEnabled: true,
    };
    this.modalTitle = 'Create Player';
    this.showModal = true;
  }

  public showUpdateModal (player: Player): void {
    this.selectedPlayer = {...player};
    this.modalTitle = 'Update Player';
    this.showModal = true;
  }

  public closeModal (): void {
    this.showModal = false;
  }
}
