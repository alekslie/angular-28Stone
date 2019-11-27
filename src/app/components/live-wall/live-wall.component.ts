import { Component, OnInit, ViewChild } from '@angular/core';
import { ForexService } from '../../services/forex.service';
import { ForexItem } from '../../models/forex-item';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-live-wall',
  templateUrl: './live-wall.component.html',
  styleUrls: ['./live-wall.component.css']
})
export class LiveWallComponent implements OnInit {
  forexItems: ForexItem[];
  tableRows: any[];
  timerId: number;
  refreshTime: number = 10;
  updateTimeUtc: Date = new Date();
  tableHeaders: string[] = new Array();
  loaded: boolean = false;
  dataSource: MatTableDataSource<AnimationPlayState>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showWall: boolean = false;
  

  constructor(private forexService:ForexService) { 
  }
  
  ngOnInit() {
    this.forexService.getAllItems().subscribe(data => {
      this.tableRows = data.forexList;             
      console.log(this.tableRows);
      
      // Headers.
      if (this.tableRows[0]) {
        Object.keys(this.tableRows[0]).forEach((key, index) => {
          this.tableHeaders.push(key);
        })
        this.loaded = true;  
      };
      console.log(this.tableHeaders); 
      this.dataSource = new MatTableDataSource(this.tableRows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    })  
         
    this.timerId = setInterval(() => {
      this.reloadTable();
    }, this.refreshTime * 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  reloadTable() {
    this.forexService.getAllItems().subscribe(data => {
      this.tableRows = data.forexList;             
      console.log(this.tableRows);
      this.dataSource = new MatTableDataSource(this.tableRows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   

      if (this.tableRows) {         
        this.updateTimeUtc = new Date();      
        this.loaded = true;
        console.log('loaded');     
      }
      else {
        this.loaded = false; 
        console.log('failed');    
      } 
    })   
  }

  setLiveWallVisibility(event) {
    if (event.target.checked) {
      this.showWall = true;
    }
    else {
      this.showWall = false;
    }
  }
}