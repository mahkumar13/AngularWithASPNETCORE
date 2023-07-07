import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardsService } from '../Service/cards.service';
import { Card } from '../Models/card.model';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {

  RegisterForm:FormGroup;
  cards:Card[]=[];
  buttonTex="Save";
  constructor( private _fb:FormBuilder,private _cardService:CardsService) { }

  ngOnInit(): void {
    this.setRegisterForm();
    this.getAllCards();
  }
  setRegisterForm(){
    this.RegisterForm= this._fb.group({
      id:[''],
      cardHolderName:[""],
      cardNumber:[""],
      cvc:[""],
      expiryMonth:[""],
      expirtYear:[""]
    })
  }
  submit(){
    if(this.RegisterForm.controls['id'].value===""){

      this._cardService.addCard(this.RegisterForm.value).subscribe(res=>{
       this.getAllCards();
       this.RegisterForm.reset({
        id: "",
        cardHolderName: '',
        cardNumber: '',
        cvc: '',
        expiryMonth: '',
        expirtYear: ''
       })
      })
    }
    else{
      this.updateCard(this.RegisterForm.value);
     }
  }
  updateCard(card:Card){

    this.buttonTex="Update";
    this._cardService.updateCard(card).subscribe(res=>{
      debugger
      this.getAllCards();
      this.RegisterForm.reset({
        id: "",
        cardHolderName: '',
        cardNumber: '',
        cvc: '',
        expiryMonth: '',
        expirtYear: ''

      })
      this.buttonTex="Save"
    })
  }
  getAllCards(){
    this._cardService.getAllCards().subscribe(res=>{

      this.cards=res;
    })
  }
 edit(id:any){
  this.buttonTex="Update";

    let card=this.cards.find((card:Card)=>card.id==id);
    this.RegisterForm.patchValue(card);

 }
  }


