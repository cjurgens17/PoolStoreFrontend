import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../pokemoncards/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnDestroy {

  

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {}

  pokemon!: Pokemon;
  sub!: Subscription;
  errorMessage: string = '';

  onBack(): void {
      this.router.navigate(['/pokemon']);
  }
  

  ngOnInit(): void {
      const name = String(this.route.snapshot.paramMap.get('name'));

         this.sub = this.productService.getPokemon(name).subscribe({
          next: data => { 
            this.pokemon = data
            this.pokemon.name = data.name
            this.pokemon.weight = data.weight
            this.pokemon.index = data.index
            this.pokemon.image = data.image
            this.pokemon.backImage = data.backImage
            this.pokemon.abilities.push(data.abilities)
            this.pokemon.stats.push(data.stats)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
  })
}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}