import { Component } from '@angular/core';
import { BtnOption } from 'bootstrangular-datatable';

import salary from './../assets/data/salary';
import points from './../assets/data/points';

@Component({
  selector: 'my-app',
  moduleId: 'src/app/app.component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataPoints: any[] = points.data;

  public title: string = 'BootstrangularDatatable';
  public dataSource: any[] = salary.data;
  public headers: any = {
    "name": "Nombre",
    "position": "Puesto",
    "salary": "Salario",
    "start_date": "Fecha de inicio",
    "office": "Oficina",
    "extn": "Extención"
  };
  public tableBtnOptions: BtnOption[] = [{
    title: 'Imprimir',
    icon: {
      origin: 'bootstrap',
      icon: 'fas fa-print'
    },
    action: () => {
      alert(`Se van a imprimir ${this.dataSource.length} registros`);
    }
  }];
  public rowBtnOptions: BtnOption[] = [{
    title: 'Editar',
    action: (row: any) => {
      console.log(row, 'se va a editar');
    },
    icon: {
      origin: 'bootstrap',
      icon: 'fas fa-edit'
    }
  }];
}