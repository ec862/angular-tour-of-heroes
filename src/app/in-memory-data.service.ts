import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr_Nice', power: 1 },
      { id: 12, name: 'Narco', power: 2 },
      { id: 13, name: 'Bombasto', power: 3 },
      { id: 14, name: 'Celeritas', power: 4 },
      { id: 15, name: 'Magneta', power: 5 },
      { id: 16, name: 'RubberMan', power: 2.3 },
      { id: 17, name: 'Dynama', power: 4.7 },
      { id: 18, name: 'Dr_IQ', power: 1.3 },
      { id: 19, name: 'Magma', power: 3.5 },
      { id: 20, name: 'Tornado', power: 2 },
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
