import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = HEROES;
  public filteredHeroes: Hero[] = [];
  public selectedHero?: Hero;
  private _ListFilter: string = '';
  get listFilter(): string {
    return this._ListFilter;
  }
  set listFilter(value: string) {
    this._ListFilter = value;
    this.filteredHeroes = this.PerformFilter(this._ListFilter);
  }

  constructor() {}
  ngOnInit(): void {
    this.listFilter = '';
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  PerformFilter(filterBy: string): Hero[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) =>
      hero.name.toLocaleLowerCase().includes(filterBy)
    );
  }
}
