import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Service {
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    type: string;
  };
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.http.get<any>('/api/v1/namespaces/default/services')
      .subscribe(
        (response) => {
          this.services = response.items;
        },
        (error) => {
          console.error('Error retrieving services:', error);
        }
      );
  }

  deleteService(name: string) {
    this.http.delete(`/api/v1/namespaces/default/services/${name}`)
      .subscribe(
        () => {
          this.services = this.services.filter((service) => service.metadata.name !== name);
        },
        (error) => {
          console.error('Error deleting service:', error);
        }
      );
  }
}