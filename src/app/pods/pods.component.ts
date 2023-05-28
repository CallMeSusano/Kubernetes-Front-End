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

  fetchPods() {
    this.http.get<any[]>('api/pods')
      .subscribe(pods => {
        this.pods = pods;
      });
  }

  deletePod(podName: string) {
    this.http.delete(`api/pods/${podName}`)
      .subscribe(() => {
        this.fetchPods();
      });
  }
}
