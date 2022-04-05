import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

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
  private powerNum: number = 0;
  get listFilter(): string {
    return this._ListFilter;
  }
  set listFilter(value: string) {
    this._ListFilter = value;
    this.filteredHeroes = this.PerformFilter(this._ListFilter);
  }

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.listFilter = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getHeroes(): void {
    this.sub = this.heroService.getHeroes().subscribe((heroes) => {
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

  add(name: string, power: number): void {
    name = name.trim();
    if (name && power) {
      this.heroService.addHero({ name, power } as Hero).subscribe((hero) => {
        this.heroes.push(hero);
      });
    } else {
      this.messageService.add(
        `HerosComponent: Hero not Added - fields not filled`
      );
    }
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.filteredHeroes = this.PerformFilter(this._ListFilter);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
