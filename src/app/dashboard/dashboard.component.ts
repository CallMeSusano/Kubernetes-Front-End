import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Node {
  metadata: {
    name: string;
  };
}

interface Namespace {
  metadata: {
    name: string;
  };
}

interface Pod {
  metadata: {
    name: string;
  };
}

interface Deployment {
  metadata: {
    name: string;
  };
}

interface Service {
  metadata: {
    name: string;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nodes: Node[] = [];
  namespaces: Namespace[] = [];
  pods: Pod[] = [];
  deployments: Deployment[] = [];
  services: Service[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getNodes();
  }

  updateApiAddress(): void {
    // Optional: Add validation or handling if needed
    this.getNodes();
  }

  getNodes(): void {
    this.http.get<any>('/api/v1/nodes')
      .subscribe(response => {
        this.nodes = response.items;
        console.log(this.nodes);
      });
  }
  getNamespaces(): void {
    this.http.get<any>('/api/v1/namespaces')
      .subscribe(response => {
        this.namespaces = response.items;
        console.log(this.nodes);
      });
  }
  getPods(): void {
    this.http.get<any>('/api/v1/pods')
      .subscribe(response => {
        this.pods = response.items;
        console.log(this.nodes);
      });
  }
  
  getDeployments(): void {
    this.http.get<any>('/apis/apps/v1/namespaces/default/deployments')
      .subscribe(response => {
        this.deployments = response.items;
        console.log(this.nodes);
      });
  }
  
  getServices(): void {
    this.http.get<any>('/api/v1/namespaces/default/services')
      .subscribe(response => {
        this.services = response.items;
        console.log(this.nodes);
      });
  }
}