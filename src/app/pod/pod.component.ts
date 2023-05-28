import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Pod{
  metadata: Metadata;
}

interface Metadata {
  name: string;
  namespaces: string[];
}


@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.css']
})
export class PodComponent implements OnInit {
  podName: string = '';
  podNamespace: string = '';
  namespaces: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNamespaces();
  }

  fetchNamespaces() {
    this.http.get<any[]>('api/namespaces')
      .subscribe(namespaces => {
        this.namespaces = namespaces;
      });
  }

  createPod() {
    const requestBody : Pod = {
      metadata: {
        name: this.podName,
        namespaces: this.namespaces,
      },
    };

    this.http.post('api/pods', requestBody)
      .subscribe(() => {
        // Pod created successfully
      });
  }
}