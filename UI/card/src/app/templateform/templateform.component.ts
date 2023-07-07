import { Component, OnInit } from '@angular/core';
import { Card } from '../Models/card.model';
import { CardsService } from '../Service/cards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-templateform',
  templateUrl: './templateform.component.html',
  styleUrls: ['./templateform.component.css']
})
export class TemplateformComponent implements OnInit {
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
  constructor(private _cardsService:CardsService,private _toaster:ToastrService){

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
      this._toaster.success("Your Card Details has been deleted successfully")
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
        this._toaster.success(" Crad Details Added successfully")
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
      this._toaster.success("Your card details has been edited successfully")
      this.getAllCards();
      this.ButtonText="Save"
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

}
