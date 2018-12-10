import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
          console.log(this.barDetails);
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );

      barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
        }
      );
    });

    this.barService.getTopDrinkers(this.barName).subscribe(
      data => {
        console.log(data);

        const drinkerIds = [];
        const spent = [];

        data.forEach(drinkers => {
          drinkerIds.push(drinkers.drinkerId);
          spent.push(drinkers.spent);
        });
        this.generateDrinkerChart(drinkerIds, spent);
      }
    )

    this.barService.getTopPurchases(this.barName).subscribe(
      data => {
        console.log(data);

        const itemIds = [];
        const purchases = [];

        data.forEach(drinkers => {
          itemIds.push(drinkers.itemId);
          purchases.push(drinkers.purchases);
        });


        this.generatePurchaseChart(itemIds, purchases);
      }
    )

    this.barService.getTopManufacturers(this.barName).subscribe(
      data => {
        console.log(data);

        const manufacturers = [];
        const totalItemsSold = [];

        data.forEach(drinkers => {
          manufacturers.push(drinkers.manufacturer);
          totalItemsSold.push(drinkers.amtspent);
        });

        
        this.generateManufacturerChart(manufacturers, totalItemsSold);
      }
    )

    this.barService.getSaleDates(this.barName).subscribe(
      
      data => {
        const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        const vals = [0, 0, 0, 0, 0, 0, 0];

        console.log(data);
        data.forEach(day => {
          vals[day.date] = vals[day.date] + 1;
        });
        
        this.generateDayChart(days, vals);
      }
    )

    this.barService.getSaleHours(this.barName).subscribe(
      
      data => {
        const times = ["3-4","4-5","5-6","6-7","7-8","8-9","9-10","10-11","11-11:59"];
        const values = [0, 0, 0, 0, 0, 0, 0,0,0];

        console.log(data);
        data.forEach(hour => {
          values[hour.hour] = values[hour.hour] + 1;
        });
        
        this.generateHourChart(times, values);
      }
    )
  }

  ngOnInit() {
  }

  generateDrinkerChart(drinkerIds: string[], spent: string[]) {
    Highcharts.chart('topDrinkers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Drinkers at this Bar'
      },
      xAxis: {
        categories: drinkerIds,
        title: {
          text: 'Drinker Id'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Spent'
        },
        labels: {
          format: '${value:,.0f}',
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
        data: spent, color: 'green' 
      }]
    });
  }

  generatePurchaseChart(drinkerIds: string[], spent: string[]) {
    Highcharts.chart('topPurchases', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Purchases at this Bar'
      },
      xAxis: {
        categories: drinkerIds,
        title: {
          text: 'Item Id'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Purchases'
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
        data: spent
      }]
    });
  }

  generateManufacturerChart(drinkerIds: string[], spent: string[]) {
    Highcharts.chart('topManufacturers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Manufacturers at this Bar'
      },
      xAxis: {
        categories: drinkerIds,
        title: {
          text: 'Manufacturer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Products Sold'
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
        data: spent, color: 'orange'
      }]
    });
  }

  generateDayChart(drinkerIds: string[], spent: number[]) {
    Highcharts.chart('salesPerDay', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Total Sales per Weekday'
      },
      xAxis: {
        categories: drinkerIds,
        title: {
          text: 'Weekday'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Sales'
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
        data: spent, color: 'purple'
      }]
    });
  }

  generateHourChart(drinkerIds: string[], spent: number[]) {
    Highcharts.chart('salesPerHour', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Total Sales per Hour'
      },
      xAxis: {
        categories: drinkerIds,
        title: {
          text: 'Hour (PM)'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Sales'
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
        data: spent, color: 'grey'
      }]
    });
  }
}
