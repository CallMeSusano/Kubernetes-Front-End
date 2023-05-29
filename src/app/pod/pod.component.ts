import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Pod {
  metadata: Metadata;
  spec: Spec;
}

interface Spec {
  containers: Container[];
}

interface Container {
  name: string;
  image: string;
}

interface Metadata {
  name: string;
}

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.css']
})
export class PodComponent implements OnInit {
  podName: string = '';
  podNamespace: string = '';
  podImage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit():void {}

  createPod() {
    console.log('Pod created:');
    const requestBody: Pod = {
      metadata: {
        name: this.podName
      },
      spec: {
        containers: [
          {
            name: this.podImage,
            image: this.podImage
          }
        ]
      }
    };
    this.http.post('api/v1/namespaces/default/pods', requestBody)
      .subscribe(
        (response) => {
          console.log('Pod created:', response);
        },
        (error) => {
          console.error('Error creating pod:', error);
        }
      );
  }
}