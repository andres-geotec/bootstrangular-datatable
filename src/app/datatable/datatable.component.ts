import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'datatable-dev',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableDevComponent implements OnInit {
  @Input() private dataSource: any[];
  @Input() public headers: any;
  @Input() public pageSize: number;
  @Input() public pageSizeOptions: number[] = [];
  @Input() public pageIndex: number = 1;
  @Input() public tableBtnOptions: BtnOption[];
  @Input() public rowBtnOptions: BtnOption[];

  @Input() public showNumeration: boolean = false;
  @Input() public showSearcher: boolean = true;
  @Input() public showSizeOptions: boolean = true;
  @Input() public showPaginator: boolean = true;

  private filterText: string;
  private dataSourceFilter: any[];

  constructor() {}

  ngOnInit(): void {
    this.checkPageSize();
  }

  /** Obtener fuente de datos
   * @description Devuelve los datos filtrados en caso de que `filterText` tenga
   * valor, de lo contrario devuelve el total de datos.
   */
  public getDataSource(): any[] {
    return this.filterText? this.dataSourceFilter: this.dataSource;
  } 

  /** Obtener datos por página
   * @description Devuelve los datos por tamaño de página (número de renglones)
   * dependiendo del índice de página del que se encuentre.
   */
  public getPageData(): any[] {
    return this.getDataSource().slice(this.getPageRowStart() - 1, this.getPageRowEnd());
  }

  /** Obtener el renglón inicial por página
   * @description Devuelve el numero del renglón inicial de la página actual.
   */
  public getPageRowStart(): number {
    return (this.pageSize * this.pageIndex) - (this.pageSize - 1);
  }

  /** Obtener el renglón final por página
   * @description Devuelve el numero del renglón final de la página actual.
   */
  public getPageRowEnd(): number {
    if (this.pageIndex === this.getLastPage()) 
    return this.getPageRowStart() + (this.getDataSource().length - this.getPageRowStart());
    else return this.pageSize * this.pageIndex;
  }

  /** Ir a la primer página */
  public goFirstPage(): void {
    this.pageIndex = 1;
  }

  /** Ir a la página anterior */
  public goPreviousPage(): void {
    this.pageIndex--;
  }

  /** Ir a la siguiente página */
  public goNextPage(): void {
    this.pageIndex++;
  }

  /** Ir a la ultima página */
  public goLastPage(): void {
    this.pageIndex = this.getLastPage();
  }

  /** Obtener ultima página
   * @description Devuelve el índice de la ultima página de los datos disponibles
   * calculado por el tamaño de datos por página.
   */
  public getLastPage(): number {
    if (this.getDataSource().length % this.pageSize !== 0)
    return Math.floor(this.getDataSource().length / this.pageSize) + 1;
    else return Math.floor(this.getDataSource().length / this.pageSize);
  }

  /** Cambiar tamaño de página
   * @description Cambia el tamaño de renglones de la tabla por página vinculado
   * con el índice de la página actual para no rebasar el total de datos por página.
   * @param size Valor para el nuevo tamaño de página.
   */
  public changePageSize(size: number): void {
    const isInLastPage: boolean = this.pageIndex === this.getLastPage()? true: false;
    this.pageSize = size;
    if (this.pageIndex >= this.getLastPage() || isInLastPage) this.goLastPage();
  }

  /** Revisar tamaño de página
   * @description Verifica si `pageSize` está vacío, en tal caso se le asignará
   * el primer valor de la lista de opciones. En caso de que la lista de opciones
   * también se encuentre vacía, agrega el total de los datos como valor único.
   */
  private checkPageSize() {
    if (!this.pageSize) {
      if (!this.pageSizeOptions.length)
      this.pageSizeOptions.push(this.dataSource.length);
      this.pageSize = this.pageSizeOptions[0];
    } else if (!this.pageSizeOptions.find((op: number) => op === this.pageSize)) {
      this.addPageSizeToPageSizeOptions();
    }
  }

  /** Añadir tamaño de página
   * @description Añade a la lista de opciones de tamaño de pagina el tamaño 
   * de pagina `pageSize` que llegue como parámetro.
   */
  private addPageSizeToPageSizeOptions(): void {
    this.pageSizeOptions.push(this.pageSize);
    this.pageSizeOptions.sort((a, b) => a-b);
  }

  /** Obtener encabezados
   * @description Obtiene los encabezados de la tabla, en caso de que no se
   * definan como parámetro, devolverá una lista de las llaves de la primer fila.
   */
  public getHeaders(): object[] {
    if (this.headers) return Object.keys(this.headers).map((item) => {
      return {id: item, value: this.headers[item]}
    }); else return Object.keys(this.dataSource[1]).map((item) => {
      return {id: item, value: item}
    });
  }

  /** Aplicar filtro
   * @description Guarda en `filterText` lo escrito en la caja de búsqueda y 
   * guarda en `dataSourceFilter` el filtro aplicado en los datos.
   * @param filter Texto escrito en la caja de búsqueda.
   */
  public applyFilter(filter: string): void {
    if (filter.trim()) {
      this.filterText = filter.trim().toLowerCase();
      this.dataSourceFilter = this.dataSource.filter((item: any) => {
        return this.getHeaders().map((head: any) => 
          item[head.id].trim().toLowerCase().includes(this.filterText)
        ).some((element: any) => element);
      });
      if (this.pageIndex > this.getLastPage()) this.goLastPage();
    } else {
      this.filterText = undefined;
      this.goFirstPage();
    }
  }
}

/** Button Option
 * @param title Titulo del boton.
 * @param action Funcion del boton.
 * @param icon Interface Button Icon.
 */
export interface BtnOption {
  title: string,
  action: Function,
  icon?: BtnIcon
}

/** Button Icon
 * @param origin Origen o tipo de icono.
 * @param icon Definicion del icono o recurso.
 */
interface BtnIcon {
  origin: String,
  icon: String
}