import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.css']
})
export class PodsComponent implements OnInit {
  pods: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPods();
  }

  fetchPods(): void {
    

    // Fazer o pedido HTTP GET para a API do Kubernetes para obter os namespaces
    this.http.get<any>('/api/v1/pods')
      .subscribe(response => {
        // Salvar os namespaces no array namespaces
        this.pods = response.items;
      });
  }

  deletePod(podName: string) {
    this.http.delete(`api/v1/pods/${podName}`)
      .subscribe(() => {
        this.fetchPods();
      });
  }
}
