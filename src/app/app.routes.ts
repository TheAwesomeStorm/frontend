import { Routes } from '@angular/router';
import { PlayerListComponent } from './players/player-list/player-list.component';

export const routes: Routes = [
  {path: '', redirectTo: '/players', pathMatch: 'full'},
  {path: 'players', component: PlayerListComponent},
];
