import { Component, OnInit } from '@angular/core';
import { ItemsService, item } from '../items.service';
import { ActivatedRoute } from '@angular/router';
declare const Highcharts: any;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemName:string;
  item: item;

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.itemName = paramMap.get('items');


      this.itemService.getitem(this.itemName).subscribe(
        data=>{this.item=data}
      )

      this.itemService.getpop(this.itemName).subscribe(
        data => {
          console.log(data)

          const bar=[];
          const counter=[];

          data.forEach(pop => {
            bar.push(pop.barid);
            console.log(pop.barid)
            counter.push(pop.sold);
          })
        this.renderChart(bar, counter);
        
      }
    )

    this.itemService.getitemdrinkerpop(this.itemName).subscribe(
      data => {
        console.log(data)

        const drinker=[];
        const counter=[];

        data.forEach(pop => {
          drinker.push(pop.drinkerId);
          counter.push(pop.consumers);
        })
      this.drinkerChart(drinker, counter);
      }
    )
    
    this.itemService.getitemdaydist(this.itemName).subscribe(
      data => {
        console.log(data)

        const day=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const counter=[0,0,0,0,0,0,0];

        data.forEach(pop => {
          counter[pop.date]=counter[pop.date]+1
        })
      this.dayChart(day, counter);
      }
    )

    this.itemService.getitemtimedist(this.itemName).subscribe(
      data => {
        console.log(data)

        const times = ["3-4","4-5","5-6","6-7","7-8","8-9","9-10","10-11","11-11:59"];
        const values = [0, 0, 0, 0, 0, 0, 0,0,0];

        data.forEach(pop => {
          values[pop.hour]=values[pop.hour]+1
        })
      this.timeChart(times, values);
      })


    });
   }

  ngOnInit() {
  }

  renderChart(bar: string[], counter: number[]) {
    Highcharts.chart('thisgraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Bars who sold this item'
      },
      xAxis: {
        categories: bar,
        title: {
          text: 'BarID'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number sold of this item'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counter
      }]
    });
  }

  timeChart(time: string[], counter: number[]) {
    Highcharts.chart('timegraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Time when this item is sold '
      },
      xAxis: {
        categories: time,
        title: {
          text: 'Time (PM)'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number sold of this item'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counter , color:'green'
      }]
    });
  }

  drinkerChart(drinker: string[], counter: number[]) {
    Highcharts.chart('drinkergraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'People who bought this item '
      },
      xAxis: {
        categories: drinker,
        title: {
          text: 'DrinkerID'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of items bought'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counter , color:'red'
      }]
    });
  }

  dayChart(day: string[], counter: number[]) {
    Highcharts.chart('daygraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of items sold per day'
      },
      xAxis: {
        categories: day,
        title: {
          text: 'Day of week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number sold per day '
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counter, color:'orange'
      }]
    });
  }




}
