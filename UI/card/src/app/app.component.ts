import { CardsService } from './Service/cards.service';
import { Component } from '@angular/core';
import { Card } from './Models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card';
  cards:Card[]=[];
  ButtonText="Save";
  card:Card={
    id: "",
    cardHolderName: '',
    cardNumber: '',
    cvc: '',
    expiryMonth: '',
    expirtYear: ''
  }
  constructor(private _cardsService:CardsService,private _router:Router){

  }
  ngOnInit(){
    this.getAllCards();
  }
  getAllCards(){
    this._cardsService.getAllCards().subscribe(res=>{

      this.cards=res;
    })
  }
  delete(id:any){
     this._cardsService.deleteCard(id).subscribe(res=>{
      this.getAllCards();
     })
  }

  populateForm(card:Card){
    this.ButtonText="Update"
    this.card=card;
  }

  onsubmit(){
   if(this.card.id===""){
    this.ButtonText="Save"
    this._cardsService.addCard(this.card).subscribe(res=>
      {
        debugger
      this.getAllCards();
      this.card={
        id: "",
        cardHolderName: '',
        cardNumber: '',
        cvc: '',
        expiryMonth: '',
        expirtYear: ''
      }

     })
   }
   else{
    this.updateCard(this.card);
   }

  }
  updateCard(card:Card){

    this._cardsService.updateCard(card).subscribe(res=>{
      debugger
      this.getAllCards();
    })
  }

  reactive(){
    this._router.navigate(['reactive']);
  }
  template(){
    this._router.navigate(['template'])
  }
}
