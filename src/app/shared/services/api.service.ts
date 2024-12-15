import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Class } from '../models/class.model';
import { Faction } from '../models/faction.model';
import { Race } from '../models/race.model';
import { environment } from '../../../environments/environment';
import { Paginated } from '../interfaces/paginated';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.backendUrl;  // Use the environment variable for base URL

  constructor (private http: HttpClient) {
  }

  // Classes
  public readClasses (): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/classes`);
  }

  // Factions
  public readFactions (): Observable<Faction[]> {
    return this.http.get<Faction[]>(`${this.apiUrl}/factions`);
  }

  // Races
  public readRaces (): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.apiUrl}/races`);
  }

  // Players
  public readPlayersPaginated (page: number = 1, size: number = 10): Observable<Paginated<Player>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Paginated<Player>>(`${this.apiUrl}/players`, {params});
  }

  public readPlayerById (uuid: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/players/${uuid}`);
  }

  public createPlayer (player: Player): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/players`, player);
  }

  public updatePlayer (uuid: string, player: Player): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/players/${uuid}`, player);
  }

  public deletePlayer (uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/players/${uuid}`);
  }
}
