import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-namespaces',
  templateUrl: './namespaces.component.html',
  styleUrls: ['./namespaces.component.css']
})
export class NamespacesComponent implements OnInit {
  namespaces: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fazer o pedido para a API do Kubernetes para obter os namespaces
    this.fetchNamespaces();
  }

  fetchNamespaces(): void {
    

    // Fazer o pedido HTTP GET para a API do Kubernetes para obter os namespaces
    this.http.get<any>('api/v1/namespaces')
      .subscribe(response => {
        // Salvar os namespaces no array namespaces
        this.namespaces = response.items;
      });
  }
  getLabelValue(namespace: any): string {
    const labels = namespace.metadata.labels;
    return labels ? labels['kubernetes.io/metadata.name'] || '' : '';
  }
  
  getAnnotationValue(namespace: any): string {
    const annotations = namespace.metadata.annotations;
    return annotations ? annotations['kubernetes.io/metadata.name'] || '' : '';
  }
  deleteNamespace(namespace: any){
    this.http.delete<any>(`api/v1/namespaces/${namespace.metadata.name}`).subscribe(data => {
      this.namespaces = data;
      console.log(data)
    })
  }
  // ... Rest of the component code
}