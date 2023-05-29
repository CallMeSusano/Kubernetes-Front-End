
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Deployment {
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    template: {
      spec: {
        containers: {
          image: string;
        }[];
      };
    };
  };
}

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.css']
})





export class DeploymentsComponent implements OnInit {
  deployments: Deployment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDeployments();
  }

  getDeployments() {
    this.http.get<any>('/apis/apps/v1/namespaces/default/deployments')
      .subscribe(
        (response) => {
          this.deployments = response.items;
        },
        (error) => {
          console.error('Error retrieving deployments:', error);
        }
      );
  }

  deleteDeployment(name: string) {
    this.http.delete(`/apis/apps/v1/namespaces/default/deployments/${name}`)
      .subscribe(
        () => {
          this.deployments = this.deployments.filter((deployment) => deployment.metadata.name !== name);
        },
        (error) => {
          console.error('Error deleting deployment:', error);
        }
      );
  }
}