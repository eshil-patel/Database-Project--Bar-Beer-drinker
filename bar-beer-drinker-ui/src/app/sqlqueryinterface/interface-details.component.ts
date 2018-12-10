import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormServiceService } from '../form-service.service'

@Component({
  selector: 'app-interface-details',
  templateUrl: './interface-details.component.html',
  styleUrls: ['./interface-details.component.css']
})
export class InterfaceDetailsComponent implements OnInit {
  constructor(
    public formService : FormServiceService,

  ) {
  
  }

  

  user={
    query:"",
    results: []
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Sending")
    console.log(this.user.query)
    this.formService.sendQueries(this.user.query).subscribe(user=>{
      
    })

    console.log("Receiving123")
    this.formService.getResults().subscribe(
      data => {
      
        console.log('Logging data: data');
        console.log(data)
        console.log(typeof data)
        this.user.results = []
        if (typeof data == "string") {
          this.user.results.push(data)
        } else {
        data.forEach(val=> {
          this.user.results.push(JSON.stringify(val));
        })
      }
      }
    )
    console.log("Subscribe finished")
  }

}