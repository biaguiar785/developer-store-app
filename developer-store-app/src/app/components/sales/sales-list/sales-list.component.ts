import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Sale } from '../../../models/sale';
import { MockDataService } from '../../../services/mock-data-service.service';
import { AuthService } from '../../../services/auth.service';
import { SalesService } from '../../../services/sales.service';
import { SalesFormComponent } from '../sales-form/sales-form.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss'
})
export class SalesListComponent {

  sales: Sale[] = [];
  displayedColumns: string[] = ['id', 'customer', 'branch', 'status', 'actions'];

  customers: {id: string; name: string}[] =[];
  branches: {id: string; name: string}[] =[];

  constructor(
    private mockDataService: MockDataService,
    private authService: AuthService,
    private saleService: SalesService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void{
    // this.loadSales();
    this.customers = this.mockDataService.getCustomers();
    this.branches = this.mockDataService.getBranches();
  }

  // loadSales(){
  //   this.saleService.getAll().subscribe((data)=> {
  //     this.sales = data;
  //   });
  // }

  openCreateSaleModal() {
    const dialogRef = this.dialog.open(SalesFormComponent, {
      panelClass: 'custom-dialog',
      width: '80vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.create(result).subscribe(() => {
          // this.loadSales();
        });
      }
    });
  }

  openEditSaleModal(sale: Sale) {
    const dialogRef = this.dialog.open(SalesFormComponent, { 
      panelClass: 'custom-dialog',
      width: '80vw',
      maxHeight: '90vh',
      data: sale
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.update(result).subscribe(() => {
          // this.loadSales();
        });        
      }
    });
  }

  cancelSale(id: string) {        
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to cancel this sale?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.cancel(id).subscribe(() =>{
          // this.loadSales();
        });
      }
    });    
  }

  getCustomerName(id: string): string {
    return this.customers.find(c => c.id === id)?.name || 'Unkown';
  }

  getBranchName(id: string): string {
    return this.branches.find(b => b.id === id)?.name || 'Unkown';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
