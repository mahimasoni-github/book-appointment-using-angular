import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DetailsService} from '../../app/details.service';

@Component({
  selector: 'app-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss']
})
export class ChooseSlotComponent implements OnInit {
  public timeSlot: any={};
  constructor(private details:DetailsService) { }

  ngOnInit(): void {
    this.details.getAppointmentList().subscribe((result)=>{
      this.timeSlot = result;
    })
  }

  //On Clicking the Book/Update Button, I am sending startTime,endTime,booked parameters to the form component
  sendSlotData(currentSlot: number){
    console.log(currentSlot, " is clicked")
  }
}
