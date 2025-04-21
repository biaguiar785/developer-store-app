import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private customers = [
    { id: 'c677518c-b66a-4a5e-9be2-8840cacdc17e', name: 'Customer 1' },
    { id: '89dcbf3b-fbd5-47bd-aaf6-fd6b5af59f6e', name: 'Customer 2' },
    { id: '882bcbc3-3cdd-4340-97bb-cde3f7c7db6a', name: 'Customer 3' }
  ];

  private branches = [
    { id: 'd4d46f75-f91d-4130-9bb9-a1305867bf3b', name: 'Branch 1' },
    { id: '559a24d8-802e-4830-a8f2-2339c9c92285', name: 'Branch 2' },
    { id: '9e483a76-b72b-4471-b947-67063e904e8c', name: 'Branch 3' }
  ];

  private products = [
    { id: '85b3d6c8-d413-40af-8ae3-9fcb02d23527', name: 'Product 1' },
    { id: 'b7e78e7c-5f11-4966-a8bb-c339cf563890', name: 'Product 2' },
    { id: '7cc764d2-81ea-43b9-aee0-f411e3519f3b', name: 'Product 3' },
    { id: '3240f025-7599-4690-9a37-d3ba6baf0495', name: 'Product 4' }
  ];  

  getCustomers() {
    return this.customers;
  }

  getBranches() {
    return this.branches;
  }

  getProducts() {
    return this.products;
  }
}
