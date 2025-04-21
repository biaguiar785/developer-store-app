import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sale } from '../../../models/sale';
import { SaleItem } from '../../../models/sale-item';
import { MockDataService } from '../../../services/mock-data-service.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sales-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatOption,
    MatSelectModule
  ],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.scss'
})
export class SalesFormComponent {

  saleForm: FormGroup;
  newItemForm: FormGroup;
  isEditingSale = false;
  displayedColumns: string[] = ['productId', 'quantity', 'price', 'isCancelled', 'actions'];
  dataSource = new MatTableDataSource<any>();

  customers: { id: string; name: string }[] = [];
  branches: { id: string; name: string }[] = [];
  products: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sale | null,
    private mockDataService: MockDataService,
    private dialog: MatDialog
  ){
    
    this.isEditingSale=!!data;

    this.saleForm = this.fb.group({
      id:[data?.id || null],
      customerId:[data?.customerId, [Validators.required]],
      branchId: [data?.branchId, [Validators.required]],
      items: this.fb.array([])
    });

    this.newItemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });

    if (data && data.items) {
      this.loadItems(data.items);
    }
  }

  ngOnInit(): void{
    this.customers = this.mockDataService.getCustomers();
    this.branches = this.mockDataService.getBranches();
    this.products = this.mockDataService.getProducts();
  }

  get items(){
    return this.saleForm.get('items') as FormArray;
  }

  private updateTable(){
    this.dataSource.data = this.items.value;
  }

  addItem(){
    if(this.newItemForm.valid){
      this.items.push(this.fb.group(this.newItemForm.value));
      this.updateTable();
      this.newItemForm.reset({quantity: 1, price: 0})
    }
  }

  private loadItems(items: SaleItem[]) {
    this.items.clear();  
    items.forEach(item => {
      this.items.push(this.fb.group({
        productId: [item.productId, Validators.required],
        quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        price: [item.price, [Validators.required, Validators.min(0.01)]],
        isCanceled: [item.isCanceled || false]
      }));
    });

    this.updateTable();
  }

  save(){
    if(this.saleForm.valid){
      const sale = this.saleForm.value as Sale;
      this.dialogRef.close(sale);
    }
  }

  getProductName(id: string) : string{
    return this.products.find(x => x.id === id)?.name || 'Unknown';
  }

  removeItem(index: number) {
    const item = this.items.at(index);
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to cancel this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          item.patchValue({ isCanceled: true });
          this.updateTable();
        }
      }
    });
  }


}
