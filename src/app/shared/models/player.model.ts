import { Race } from './race.model';
import { Class } from './class.model';
import { Faction } from './faction.model';

export interface Player {
  id: string;
  name: string;
  race: Race;
  class: Class;
  faction: Faction;
  level: number;
  isEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
