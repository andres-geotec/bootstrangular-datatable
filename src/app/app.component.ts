import { Component } from '@angular/core';
//import { BtnOption } from './datatable/datatable.component';
import { BtnOption } from 'datatable';
import salary from './../assets/data/salary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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