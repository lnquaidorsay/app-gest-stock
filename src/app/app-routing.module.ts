import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthorizationGuard } from './guard/authorization.guard';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';

const routes: Routes = [
{path : "login", component : PageLoginComponent},
{path : "inscrire", component : PageInscriptionComponent},
{path : "dashboard" , component : PageDashboardComponent},
{path : "", redirectTo:"login", pathMatch:"full"},
{path : "admin", component : AdminTemplateComponent, canActivate : [AuthorizationGuard], children : [
    {path : "products", component : ProductsComponent},
    {path : "customers" , component : CustomersComponent},

  ]
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
