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
    this.http.get<any>('/api/nodes')
      .subscribe(response => {
        this.nodes = response.items;
        console.log(this.nodes);
      });
  }
}