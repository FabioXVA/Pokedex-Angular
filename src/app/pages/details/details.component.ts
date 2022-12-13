import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//service
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'http://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'http://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoad: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private PokeApiService: PokeApiService
  ) {
    

   }

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.PokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`)
    const name = this.PokeApiService.apiGetPokemons(`${this.urlName}/${id}`)
    
    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res
        this.isLoad = true;
      },
      error => {
        this.apiError = true;
      }
    )
   
  }
}
