import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public filteredHeroes: Hero[] = [];
  public selectedHero?: Hero;
  private _ListFilter: string = '';
  private sub!: Subscription;
  get listFilter(): string {
    return this._ListFilter;
  }
  set listFilter(value: string) {
    this._ListFilter = value;
    this.filteredHeroes = this.PerformFilter(this._ListFilter);
  }

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
    this.listFilter = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.listFilter = this.listFilter;
    });
  }

  PerformFilter(filterBy: string): Hero[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) =>
      hero.name.toLocaleLowerCase().includes(filterBy)
    );
  }
}
