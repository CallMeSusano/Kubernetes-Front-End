import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Service {
  metadata: {
    name: string;
  };
  spec: {
    selector: {
      app: string;
    };
    ports: {
      protocol: string;
      port: number;
      targetPort: number;
    }[];
  };
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  serviceName: string = '';
  servicePort: number = 80;
  targetPort: number = 8080;
  protocol: string = 'TCP';

  constructor(private http: HttpClient) {}

  createService() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const requestBody: Service = {
      metadata: {
        name: this.serviceName
      },
      spec: {
        selector: {
          app: 'my-app'
        },
        ports: [
          {
            protocol: this.protocol,
            port: this.servicePort,
            targetPort: this.targetPort
          }
        ]
      }
    };

    this.http.post('/api/v1/namespaces/default/services', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Service created:', response);
        },
        (error) => {
          console.error('Error creating service:', error);
        }
      );
  }
}