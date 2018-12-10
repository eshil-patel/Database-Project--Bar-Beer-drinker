import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkerService, transInfo, drinkerInfo } from '../drinker.service';
import { HttpResponse } from '@angular/common/http';
declare const Highcharts: any;


@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  drinkerId: string;
  drinkerinfo : drinkerInfo;
  transInfo: transInfo[];

  constructor(
    private drinkerService: DrinkerService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.drinkerId = paramMap.get('drinker');

      drinkerService.getdrinkerinfo(this.drinkerId).subscribe(
        data => {
          this.drinkerinfo = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Drinker not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );
      drinkerService.gettransinfo(this.drinkerId).subscribe(
        data=>{this.transInfo=data}
      );
      drinkerService.gettranscounts(this.drinkerId).subscribe(
        data => {
          console.log(data)

          const items=[];
          const count=[];

          data.forEach(item => {
            items.push(item.itemId);
            count.push(item.counts);
          })

          if (items.length > 0 && count.length > 0) {
            this.renderChart(items, count);
          } else {
            alert('No transaction data for this drinker, try another drinker')
            return;
          }
        }
        );

        drinkerService.getdrinkermonth(this.drinkerId).subscribe(
          data => {
            console.log(data)
  
            const months=[1,2,3,4,5,6,7,8,9,10,11,12];
            const count=[0,0,0,0,0,0,0,0,0,0,0,0];
  
            data.forEach(item => {
              count[item.date]=count[item.date]+item.price;
            })
              this.dayChart(months, count);
          }
          );

          drinkerService.getdrinkerday(this.drinkerId).subscribe(
            data => {
              console.log(data)
    
              const days=[0,1,2,3,4,5,6];
              const count=[0,0,0,0,0,0,0];
    
              data.forEach(item => {
                count[item.date]=count[item.date]+item.price;
              })
                this.DayofWeekChart(days, count);
            }
            );

            this.drinkerService.getdrinkerweek(this.drinkerId).subscribe(
              data => {
                console.log(data)
      
                const week=[];
                const value=[];
                var i:number
                var j:number
                for(i=0;i<52;i++)
                {
                  week.push(i)
                }
                for(j=0;j<52;j++)
                {
                  value.push(0)
                }
                data.forEach(item => {
                  value[item.date]=value[item.date]+item.price;
                })
                  this.WeekChart(week,value);
              }
              );



    });
  }

   

  ngOnInit() {
  }

  renderChart(item: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Items and Amount Drinker Ordered'
      },
      xAxis: {
        categories: item,
        title: {
          text: 'ItemId'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity ordered'
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
        data: counts
      }]
    });
  }

  WeekChart(week: number[], counts: number[]) {
    Highcharts.chart('Weekgraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Spending Habits Per Week '
      },
      xAxis: {
        categories: week,
        title: {
          text: 'Week Number'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Spent During the Week'
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
        data: counts, color: 'orange'
      }]
    });
  }


  DayofWeekChart(days: number[], value: number[]) {
    Highcharts.chart('DayWeekgraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Spending Habits Based on Day'
      },
      xAxis: {
        categories: days,
        title: {
          text: 'Days of Week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount spent Per Day'
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
        data: value , color: 'red'
      }]
    });
  }


  dayChart(months: number[], counts: number[]) {
    Highcharts.chart('daygraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Spending Habits by Month'
      },
      xAxis: {
        categories: months,
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Spent per Week'
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
        data: counts, color: 'green'
      }]
    });
  }




}
