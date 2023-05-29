import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Deployment {
  metadata: Metadata;
  spec: Spec;
}

interface Spec {
  replicas: number;
  selector: Selector;
  template: Template;
}

interface Selector {
  matchLabels: {
    [key: string]: string;
  };
}

interface Template {
  metadata: Metadata;
  spec: PodSpec;
}

interface PodSpec {
  containers: Container[];
}

interface Container {
  name: string;
  image: string;
  ports: Port[];
}

interface Port {
  containerPort: number;
}

interface Metadata {
  name: string;
}

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.css']
})
export class DeploymentComponent implements OnInit {
  deploymentName: string = '';
  deploymentReplicas: number = 1;
  containerImage: string = '';
  containerPort: number = 80;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  createDeployment() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const requestBody: any = {
      metadata: {
        name: this.deploymentName
      },
      spec: {
        replicas: this.deploymentReplicas,
        selector: {
          matchLabels: {
            app: this.deploymentName // Updated to use the deploymentName as the app label
          }
        },
        template: {
          metadata: {
            labels: {
              app: this.deploymentName // Updated to use the deploymentName as the app label
            }
          },
          spec: {
            containers: [
              {
                name: "my-container",
                image: this.containerImage,
                ports: [
                  {
                    containerPort: this.containerPort
                  }
                ]
              }
            ]
          }
        }
      }
    };

    this.http.post('/apis/apps/v1/namespaces/default/deployments', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Deployment created:', response);
        },
        (error) => {
          console.error('Error creating deployment:', error);
        }
      );
  }
}