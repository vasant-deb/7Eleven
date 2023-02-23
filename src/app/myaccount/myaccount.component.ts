import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataTablesModule } from 'angular-datatables';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})

export class MyaccountComponent implements OnInit {
  form: FormGroup;
  note: FormGroup;
  
  //chart end  
  constructor(private snackBar: MatSnackBar,private http: HttpClient,private formBuilder: FormBuilder,private datatables: DataTablesModule,private spinner: NgxSpinnerService,private authService: AuthService, private router: Router, private slides: SlickCarouselModule) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      productname:['', Validators.required],
      productId:['', Validators.required],
      calories:['', Validators.required],
      location:['', Validators.required],
      upcImage:['', Validators.required],
      stock:['', Validators.required]
    });
    this.note = this.formBuilder.group({
      description: ['', Validators.required],
      title:['', Validators.required],
      image:['']
    });
    
   }
  newproducts:any[]=[];
  newtasks:any[]=[];
  newnotes:any[]=[];
  p: number = 1;
  pageSize: number = 10;
  getone: any;
  stats:any[]=[];
  
  serverUrl="https://7eleven.save2rent.com/images/products/";
  imageUrl="https://checklistforme.online/7elevenapi/public/uploads/";

  dtOptions: DataTables.Settings = {};
  showProfile = true;
  tasksview= false;
  notesview = false;
  schedulerequest=false;
  scheduleview=false;
  writeoffview=false;
  analyticsview=false;
  productview=false;
  newpro=false;
  editone=false;
  addNote=false;
  imageFile: File | undefined = undefined;
   
//chart
@ViewChild('salesChartCanvas') salesChartCanvas?: ElementRef<HTMLCanvasElement>;
salesChart?: Chart;
@ViewChild('foodChartCanvas') foodChartCanvas?: ElementRef<HTMLCanvasElement>;
foodChart?: Chart;
@ViewChild('wedgesChartCanvas') wedgesChartCanvas?: ElementRef<HTMLCanvasElement>;
wedgeChart?: Chart;
@ViewChild('pizzaChartCanvas') pizzaChartCanvas?: ElementRef<HTMLCanvasElement>;
pizzaChart?: Chart;
@ViewChild('pieChartCanvas') pieChartCanvas?: ElementRef<HTMLCanvasElement>;
pieChart?: Chart;
selectedDate: string = '';  // initialize the property with an empty string
selectedYear :string = '';
selectedShift :string = '';
// variable to store the selected date
  ngOnInit(): void {
    const email=localStorage.getItem('email');
    if(!email){
      this.router.navigate(['/login']);
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true, // enables search functionality
    };
    
    }
    showPizzaChart() {    
      const params = new HttpParams()
      .append('year', this.selectedYear); 
      this.http.get('https://checklistforme.online/7elevenapi/public/fooddatapizza',{params}).subscribe((res: any) => {
        const data: any[] = res.data;
        const months = data.map(record => record.month);
        const pizza_slices_shift1 = data.map(record => record.pizza_slices_shift1);
        const pizza_slices_shift2 = data.map(record => record.pizza_slices_shift2);
        const pizza_slices_shift3 = data.map(record => record.pizza_slices_shift3);
      
        const chartData: ChartConfiguration<'line'>['data'] = {
          labels: months,
          datasets: [
            {
              label: 'Pizza Slices Shift 1',
              data: pizza_slices_shift1,
              backgroundColor: '#001f3f',
              borderColor: '#001f3f',
              borderWidth: 2, 
            },
            {
              label: 'Pizza Slices Shift 2',
              data: pizza_slices_shift2,
              backgroundColor: '#4682B4',
              borderColor: '#4682B4',
              borderWidth: 2, 
            },
            {
              label: 'Pizza Slices Shift 3',
              data: pizza_slices_shift3,
              backgroundColor: '#87CEEB',
              borderColor: '#87CEEB',
              borderWidth: 2, 
            }
          ]
        };
           
      
//options
if (this.pizzaChart) {
  // update chart data if the chart already exists
  this.pizzaChart.data = chartData;
  this.pizzaChart.update();
} else {
  // create a new chart if it doesn't exist
  if (this.pizzaChartCanvas && this.pizzaChartCanvas.nativeElement) {
    const canvas = this.pizzaChartCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      this.pizzaChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              stacked: false,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
              },
            },
            x: {
              grid: {
                display: true,
              },
              title: {
                display: true,
                text: 'Month',
              },
            },
          },
        }
      });
    }
  }
  
}

//options end
});
    }
    showWedgesChart() {    
      const params = new HttpParams()
      .append('year', this.selectedYear); 
      this.http.get('https://checklistforme.online/7elevenapi/public/fooddatawedges',{params}).subscribe((res: any) => {
        const data: any[] = res.data;
        const months = data.map(record => record.month);
        const wedges_shift1 = data.map(record => record.wedges_shift1);
        const wedges_shift2 = data.map(record => record.wedges_shift2);
        const wedges_shift3 = data.map(record => record.wedges_shift3);
      
        const chartData: ChartConfiguration<'line'>['data'] = {
          labels: months,
          datasets: [
            {
              label: 'Wedges Shift 1',
              data: wedges_shift1,
              backgroundColor: '#001f3f',
              borderColor: '#001f3f',
              borderWidth: 2, 
            },
            {
              label: 'Wedges Shift 2',
              data: wedges_shift2,
              backgroundColor: '#4682B4',
              borderColor: '#4682B4',
              borderWidth: 2, 
            },
            {
              label: 'Wedges Shift 3',
              data: wedges_shift3,
              backgroundColor: '#87CEEB',
              borderColor: '#87CEEB',
              borderWidth: 2, 
            }
          ]
        };
           
      
//options
if (this.wedgeChart) {
  // update chart data if the chart already exists
  this.wedgeChart.data = chartData;
  this.wedgeChart.update();
} else {
  // create a new chart if it doesn't exist
  if (this.wedgesChartCanvas && this.wedgesChartCanvas.nativeElement) {
    const canvas = this.wedgesChartCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      this.wedgeChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              stacked: false,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
              },
            },
            x: {
              grid: {
                display: true,
              },
              title: {
                display: true,
                text: 'Month',
              },
            },
          },
        }
      });
    }
  }
  
}

//options end
});
    }
    showFoodChart() {    
      const params = new HttpParams()
      .append('year', this.selectedYear); 
      this.http.get('https://checklistforme.online/7elevenapi/public/fooddatawings',{params}).subscribe((res: any) => {
        const data: any[] = res.data;
        const months = data.map(record => record.month);
        const wings_shift1 = data.map(record => record.wings_shift1);
        const wings_shift2 = data.map(record => record.wings_shift2);
        const wings_shift3 = data.map(record => record.wings_shift3);
      
        const chartData: ChartConfiguration<'line'>['data'] = {
          labels: months,
          datasets: [
            {
              label: 'Wings Shift 1',
              data: wings_shift1,
              backgroundColor: '#001f3f',
              borderColor: '#001f3f',
              borderWidth: 2, 
            },
            {
              label: 'Wings Shift 2',
              data: wings_shift2,
              backgroundColor: '#4682B4',
              borderColor: '#4682B4',
              borderWidth: 2, 
            },
            {
              label: 'Wings Shift 3',
              data: wings_shift3,
              backgroundColor: '#87CEEB',
              borderColor: '#87CEEB',
              borderWidth: 2, 
            }
          ]
        };
           
      
//options
if (this.foodChart) {
  // update chart data if the chart already exists
  this.foodChart.data = chartData;
  this.foodChart.update();
} else {
  // create a new chart if it doesn't exist
  if (this.foodChartCanvas && this.foodChartCanvas.nativeElement) {
    const canvas = this.foodChartCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      this.foodChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              stacked: false,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
              },
            },
            x: {
              grid: {
                display: true,
              },
              title: {
                display: true,
                text: 'Month',
              },
            },
          },
        }
      });
    }
  }
  
}

//options end
});
    }
    showLotoChart() {    
      const params = new HttpParams()
        .append('date', this.selectedDate)
        .append('year', this.selectedYear);
    
      //start api
      this.http.get('https://checklistforme.online/7elevenapi/public/lotterydata', { params }).subscribe((res: any) => {
        const stats: any[] = res.stats;
        const scratches: any[] = res.scratches;
        const dates = stats.map(stat => stat.date);
        const sales = stats.map(stat => parseFloat(stat.total_sales));
        const wins = stats.map(stat => parseFloat(stat.total_wins));
        const scratchsales = scratches.map(scratche => parseFloat(scratche.total_sales));
        const scratchwins = scratches.map(scratche => parseFloat(scratche.total_wins));
        const chartData: ChartConfiguration<'bar'>['data'] = {
          labels: dates,
          datasets: [
            {
              label: 'Loto Sales',
              data: sales,
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1, 
              stack: 'group1',
              order: 2, // set a higher order for the sales dataset
            },
            {
              label: 'Loto Wins',
              data: wins,
              backgroundColor: 'rgba(54, 162, 235, 1)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1, 
              stack: 'group1',
              order: 1, // set a higher order for the wins dataset
            },
            {
              label: 'Scratch Sales',
              data: scratchsales,
              backgroundColor: 'rgba(255, 206, 86, 1)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1, 
              stack: 'group2',
              order: 2, // set a higher order for the sales dataset
            },
            {
              label: 'Scratch Wins',
              data: scratchwins,
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1, 
              stack: 'group2',
              order: 1, // set a higher order for the wins dataset
            }
          ]
        };
    
        if (this.salesChart) {
          // update chart data if the chart already exists
          this.salesChart.data = chartData;
          this.salesChart.update();
        } else {
          // create a new chart if it doesn't exist
          if (this.salesChartCanvas && this.salesChartCanvas.nativeElement) {
            const canvas = this.salesChartCanvas.nativeElement as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
    
            if (canvas && ctx) {
              this.salesChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      stacked: false,
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Price in CAD',
                      },
                    },
                    x: {
                      grid: {
                        display: true,
                      },
                      title: {
                        display: true,
                        text: 'Date',
                      },
                    },
                  },
                }
              });
            }
          }
        }
      });
    }
    showPieChart() {    
      const params = new HttpParams()
        .append('year', this.selectedYear)
        .append('shift', this.selectedShift); 
    
      this.http.get('https://checklistforme.online/7elevenapi/public/fooddata', { params }).subscribe((res: any) => {
        const data: any[] = res.data;
        const partitions :any[]= [];
    
        data.forEach(record => {
          partitions.push({ label: 'Pizza Slices', value: record.pizza_slices_percentage });
          partitions.push({ label: 'Wedges', value: record.wedges_percentage });
          partitions.push({ label: 'Wings', value: record.wings_percentage });
        });
    
        const chartData: ChartConfiguration<'pie'>['data'] = {
          labels: partitions.map(partition => partition.label),
          datasets: [
            {
              data: partitions.map(partition => partition.value),
              backgroundColor: ['#001f3f', '#4682B4', '#87CEEB'],
              borderColor: ['#001f3f', '#4682B4', '#87CEEB'],
              borderWidth: 2, 
            },
          ],
        };
               
        //options
        if (this.pieChart) {
          // update chart data if the chart already exists
          this.pieChart.data = chartData;
          this.pieChart.update();
        } else {
          // create a new chart if it doesn't exist
          if (this.pieChartCanvas && this.pieChartCanvas.nativeElement) {
            const canvas = this.pieChartCanvas.nativeElement as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
    
            if (canvas && ctx) {
              this.pieChart = new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                  responsive: true,
                  
                },
              });
            }
          }
        }
        //options end
      });
    }
    
  analytics(){
  
   //start api
  this.tasksview = false;
  this.schedulerequest = false;
  this.scheduleview = false;
  this.writeoffview = false;
  this.productview = false;
  this.showProfile = false;
  this.notesview = false;
  this.analyticsview = true;
  this.showLotoChart();
  this.showFoodChart();
  this.showWedgesChart();
  this.showPizzaChart();
  this.showPieChart();
  }
 
  profile(){

    this.tasksview= false;
    this.notesview = false;
    this.schedulerequest=false;
    this.scheduleview=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=true; 
  }
  tasks() {
    this.spinner.show();
    this.authService.gettasks()
      .subscribe(
        res => {
          this.newtasks = res?.stats;
         
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      );
  
    this.notesview = false;
    this.schedulerequest=false;
    this.scheduleview=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=false; 
    this.tasksview= true;
  }
  onaddnoteSubmit(){
    this.spinner.show();
    const formDatax = this.note.value;
    let  newformData = new FormData();

    const email=localStorage.getItem('email');

    newformData.append('name', formDatax.title);
    newformData.append('description', formDatax.description);
    if(email){
    newformData.append('email', email);
    }
    if (this.imageFile) {
      newformData.append('image', this.imageFile);
    }
   
    //api call
    this.http.post('https://checklistforme.online/7elevenapi/public/addnotes', newformData).subscribe(response => {
      
    
      this.snackBar.open('Note Added successfully', 'Dismiss', {
        verticalPosition : 'top',
        horizontalPosition :'right',
        duration: 5000
      }); 
      this.spinner.hide();
      this.addNote=false;
      newformData = new FormData();


      this.notes();
    });
    //end call
  }
  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
  updateTaskStatus(task:any){
       //api call
     this.http.post('https://checklistforme.online/7elevenapi/public/edittasksstatus', task).subscribe(response => {
      this.snackBar.open('Status updated successfully', 'Dismiss', {
        verticalPosition : 'top',
        horizontalPosition :'right',
        duration: 5000
      }); 
      this.tasks();
    });
    //end call
  }
  addnote(){
    this.addNote=true;
  }
  notes(){
    this.spinner.show();
    this.authService.getnotes()
      .subscribe(
        res => {
          this.newnotes = res?.stats;     
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      );
      if(this.imageFile){
       this.imageFile=undefined;
       }
      this.note = this.formBuilder.group({
        description: ['', Validators.required],
        title:['', Validators.required],
        image:['']
      });
    this.tasksview= false;
    this.schedulerequest=false;
    this.scheduleview=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=false; 
    this.notesview = true;
  }
  request(){

    this.tasksview= false;
    this.scheduleview=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=false; 
    this.notesview = false;   
    this.schedulerequest=true;
  }
  schedule(){

    this.tasksview= false;
    this.schedulerequest=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=false; 
    this.notesview = false;
    this.scheduleview=true;
  }
  writeoff(){

    this.tasksview= false;
    this.schedulerequest=false;
    this.scheduleview=false;
    this.analyticsview=false;
    this.productview=false;
    this.showProfile=false; 
    this.notesview = false;
    this.writeoffview=true;
  }
 
  product() {
    this.spinner.show();
    this.authService.newproducts()
      .subscribe(
        res => {
          this.dtOptions = { };
          this.newproducts = res?.stats;
          $('.dataTables_length').hide();
          $('.dataTables_filter').hide();
          
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      );
  
    this.tasksview= false;
    this.schedulerequest=false;
    this.scheduleview=false;
    this.writeoffview=false;
    this.analyticsview=false;
    this.showProfile=false; 
    this.notesview = false;
    this.productview=true;
  }
  
  searchProduct(event: Event) {
    let searchValue = (event.target as HTMLInputElement).value;
    if (searchValue === '') {
     this.product();
    } else {
      this.newproducts = this.newproducts.filter(product => {
        return product.productname.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
  }
  viewProduct(product:any) {
    this.spinner.show();
    this.authService.getoneproducts({ productid:product })
    .subscribe(
      res => {
        this.getone = res?.stats;
        this.spinner.hide();
        this.newpro=true;
      },
      err => {
        console.log(err);
      }
    );
  }
close(){
  this.editone=false;
  this.newpro=false;
  this.addNote=false;
}
oneditSubmit() {
  const formData = this.form.value;
  this.http.post('https://checklistforme.online/7elevenapi/public/editproduct', formData).subscribe(response => {
    this.snackBar.open('Product updated successfully', 'Dismiss', {
      verticalPosition : 'top',
      horizontalPosition :'right',
      duration: 5000
    });
    this.close();
    this.product();
    console.log("mysucess");
  });
}
  editProduct(product:any){
    this.spinner.show();
    this.authService.getoneproducts({ productid:product })
    .subscribe(
      res => {
        this.getone = res?.stats;
        this.spinner.hide();
        this.editone=true;
        this.form = this.formBuilder.group({
          description: [this.getone?.description, Validators.required],
          productname:[this.getone?.productname, Validators.required],
          productId:[this.getone?.product_id, Validators.required],
          calories:[this.getone?.calories, Validators.required],
          location:[this.getone?.location, Validators.required],
          upcImage:[this.getone?.upcImage, Validators.required],
          stock:[this.getone?.stock, Validators.required]
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
