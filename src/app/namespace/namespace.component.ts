import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Namespace{
  metadata: Metadata;
}

interface Metadata {
  name: string;
}

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.css']
})
export class NamespaceComponent implements OnInit {
  namespaces: any[] = [];
  name: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
  }
  createNamespace() {
    // Define the request body
    const requestBody : Namespace = {
      metadata: {
        name: this.name,
      },
    };
  
    // Set the request headers
  
    // Send the request
    this.http.post('/api/namespaces', requestBody)
      .subscribe(
        (response) => {
          console.log('Namespace created:', response);
        },
        (error) => {
          console.error('Error creating namespace:', error);
        }
      );
  }
  // ... Rest of the component code
}