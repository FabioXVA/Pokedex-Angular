import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PokeApiService } from '../../service/poke-api.service'
@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  constructor( private pokeApiService: PokeApiService ) { 

  }
  private setAllPokemons: any;
  public getAllPokemons: any;
  public isLoad: boolean = false;
  public apiError: boolean = false;


  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results
        this.getAllPokemons = this.setAllPokemons 
        this.isLoad = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }
  
  public getShearch(value: string){
    const filter = this.getAllPokemons.filter( (res: any) => {
      console.log(value, res.name.toLowerCase().indexOf(value) >= 0 )
      return !res.name.indexOf(value.toLowerCase());
    });

    value ?
      this.getAllPokemons = filter
      :
      this.getAllPokemons = this.setAllPokemons
    
   
  }


}
