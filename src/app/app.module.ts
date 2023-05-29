import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NamespacesComponent } from './namespaces/namespaces.component';
import { NamespaceComponent } from './namespace/namespace.component';
import { PodsComponent } from './pods/pods.component';
import { PodComponent } from './pod/pod.component';
import { DeploymentsComponent } from './deployments/deployments.component';
import { DeploymentComponent } from './deployment/deployment.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'namespaces', component: NamespacesComponent},
  {path: 'namespace', component: NamespaceComponent},
  {path: 'pods', component: PodsComponent},
  {path: 'pod', component: PodComponent},
  {path: 'deployments', component: DeploymentsComponent},
  {path: 'deployment', component: DeploymentComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'service', component: ServiceComponent}

  
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NamespacesComponent,
    NamespaceComponent,
    PodsComponent,
    PodComponent,
    DeploymentsComponent,
    DeploymentComponent,
    ServicesComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
