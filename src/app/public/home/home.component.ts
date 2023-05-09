import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ServicesService} from "../../owner/services/services.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'ownerFirstName',
    'ownerLastName',
    'brandName',
    'email',
    'address',
    'websiteUrl',
    'menuUrl',
    'actions'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  numOwners: number = 0;

  constructor(private _ownServices:ServicesService) {}

  ngOnInit(): void {
    this.getOwnersList();
    this._ownServices.numberOfOwners().subscribe(() => {
      this.numOwners = this._ownServices.getnumOwners();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getOwnersList(){
    this._ownServices.getOwner().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });
  }


  deleteOwner(id:number) {
    this._ownServices.deleteOwner(id).subscribe({
      next:(res)=>{
        alert('Owner deleted sucessfully!');
        this.getOwnersList();
      },
      error:console.log,
    })
  }

}
