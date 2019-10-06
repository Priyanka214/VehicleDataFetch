import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'hello-component',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cost_in_credits', 'length'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  filteredData = [];
  uniqueFilteredData = [];
  filteredDataCount = 0;
  dataToFilter = [];
  mySet: Set<string> = new Set<string>();


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

   vehicleName="";
   vehicaleData = [];
   loading = false;

  private apiUrl = 'https://swapi.co/api/vehicles';
  data: any = {};

  constructor(private http: Http) {
     
  }
  ngOnInit() {
     this.getVehicle() ;
     this.getVehicleData();
  }
  //Call Star wars API - http call
  getVehicleData() {
    return this.http.get(this.apiUrl).map((res:Response)=> res.json())
  }

  //Get Vehicle data
  getVehicle() {
    this.loading = true;
    this.getVehicleData().subscribe(data => {
      console.log("getVehicle =>", data);
      if(data.results != null && data.results != undefined) {
      //  this.data = data;
        this.loading = false;
        let resultData  = [];
        this.filteredData= [];
        resultData= data.results;
        this.resultsLength=data.count;
        for(var i=0; i< resultData.length; i++){
          let vehicleObj = new VehicleObject();
            vehicleObj.name = resultData[i].name;
            vehicleObj.cost_in_credits = resultData[i].cost_in_credits;
            vehicleObj.length = resultData[i].length;
            this.vehicaleData.push(vehicleObj);
        }
        this.data= this.vehicaleData; 
      }  
    }, (error)=> {
      this.loading= false;
      console.log("Error in fetching vehicle data");
    })
  }

   //Serach by vehicle name
  onSearchChange(searchValue: string){
    this.dataToFilter = this.data;
    if(searchValue.length > 0) {
      this.filteredData =[];
      this.uniqueFilteredData = [];
      this.filteredDataCount = 0;
      for(var i=0; i< this.dataToFilter.length; i++) {
      if(this.dataToFilter[i].name.startsWith(searchValue)) { 
       // console.log("this.dataToFilter[i].name =>", this.dataToFilter[i].name);
        this.filteredData.push(this.dataToFilter[i]);
        this.filteredDataCount ++; 
        // for(var j=0 ; j<this.filteredData.length; j++){
        //   if(this.dataToFilter[i].name == this.filteredData[j].name ) {
        //     console.log("this.filteredData[j].name =>", this.filteredData[j].name);
        //     this.filteredData.splice(j,1);
        //     this.filteredDataCount --; 
        //   }
        // }  
                 
      }
    }
    this.data = [];
    console.log("filteredData filter => ", this.filteredData);
    //this.uniqueFilteredData = Array.from(new Set(this.filteredData));
    //console.log("Unique filter => ", this.uniqueFilteredData);
    this.data = this.filteredData;
    this.data = Array.from(new Set(this.data));
   
    //this.data = this.mySet;
    console.log("data filter => ", this.data);
    this.resultsLength = this.filteredDataCount;
    } else {
       this.data = [];
       this.uniqueFilteredData = [];
       this.getVehicle() ;
       this.getVehicleData();
    }
  }
}

export interface VehicleData {
  name: string;
  cost_in_credits: string;
  length: string;
}

class VehicleObject {
  name: string
  cost_in_credits: string
  length: string
}
