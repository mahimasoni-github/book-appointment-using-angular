import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {DetailsService} from '../../app/details.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { validateKeywordUsage } from 'node_modules1/ajv/dist/compile/validate/keyword';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.scss']
})

export class BookSlotComponent implements OnInit {
  
  constructor(private details:DetailsService,public router: ActivatedRoute) { }
  alert:boolean = false;
  isBooked: boolean = false;
  slotData: any;
  isEmptyFields: boolean = false;
  isValidFormSubmitted : any;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // slotDetails :{ [key: string]: any[] } = {};
  addDetails = new FormGroup({
    contactName: new FormControl("",[Validators.required, Validators.pattern(this.unamePattern)]),
    contactPhone: new FormControl("",[Validators.required,Validators.pattern(this.mobnumPattern)])
  });
  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    this.details.getCurrentData(this.router.snapshot.params['id']).subscribe((result)=>{
      this.isBooked = result['booked'];
      this.slotData = result;
      this.addDetails = new FormGroup({
        contactName: new FormControl(result['contactName']),
        contactPhone: new FormControl(result['contactPhone'])
      });
    })
  }
  bookSlot() {
    this.isValidFormSubmitted = false;
    if(this.addDetails.value['contactName'] == null || this.addDetails.value['contactPhone'] == null){
      this.isEmptyFields = true;
    }
    else{
      this.isValidFormSubmitted = true;
      this.isEmptyFields = false;
      let id =this.slotData['id'];
      this.slotData['booked']=true;
      this.slotData['contactName']=this.addDetails.value['contactName'];
      this.slotData['contactPhone']=this.addDetails.value['contactPhone'];
      console.log(this.slotData);
      this.details.bookSlot(this.slotData,id).subscribe((result)=>{
        console.log(result);
        this.alert=true;
      })
    }  
  }

  disregardUpdate(){
    this.alert=false;
  }

  closeALert(){
    this.alert=false;
  }

  get username(){
    return this.addDetails.get('contactName');
  }
  get phoneNumber(){
    return this.addDetails.get('contactPhone');
  }
}
