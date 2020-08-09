import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/model/empleado';
import { EmpleadoService } from '../service/empleado.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleados: Empleado[];
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
  empleado: Empleado = {
    id: null,
    nombre_completo: null,
    funciones: null
  };
  validar: boolean = true;
  guardar: boolean = false;
  

  selectedEmpleado: Empleado = {
    id: null,
    nombre_completo: null,
    funciones: null
  };

  constructor(private empleadoService: EmpleadoService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll() {
    this.empleadoService.getAll().subscribe(
      (result: any) => {
        let empleados: Empleado[] = [];
        for (let i = 0; i < result.length; i++) {
          let empleado = result[i] as Empleado;
          empleados.push(empleado);
        }
        this.empleados = empleados;
      },
      error => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedEmpleado != null && this.selectedEmpleado.id != null) {
        this.empleado = this.selectedEmpleado;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
        return;
      }
    } else {
      this.empleado = new Empleado();
    }
    this.displaySaveDialog = true;
  }

  find(){
    this.empleadoService.find(this.empleado.id).subscribe(
      (result: any) =>{
        if(result != null){
          this.messageService.add({ severity : 'warn', summary: "Advertencia!", detail: "El registro ya existe." });
          this.displaySaveDialog = false;
          this.validar = true;
          this.guardar = false;
        }else {
          this.messageService.add({ severity: 'success', summary: "Resultado", detail: "El registro No existe." });
          this.validar = false;
          this.guardar = true;
        }          
      })  
  }

  save() {
        this.empleadoService.save(this.empleado).subscribe(
          (result: any) => {
            let empleado = result as Empleado;
            this.validarEmpleado(empleado);
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó la persona correctamente." });
            this.displaySaveDialog = false;
    
          },
          error => {
            console.log(error);
        });
  }

  delete(){
    if(this.selectedEmpleado == null || this.selectedEmpleado.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
      return;
    }
    this.confirmService.confirm({
      message: "¿Está seguro que desea eliminar el registro?",
      accept : () =>{
        this.empleadoService.delete(this.selectedEmpleado.id).subscribe(
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se eliminó la persona con id "+result.id+" correctamente." });
            this.deleteObject(result.id);
          }
        )
      }
    })
  }

  deleteObject(id:number){
    let index = this.empleados.findIndex((e) => e.id == id);
    if(index != -1){
      this.empleados.splice(index, 1);
    }
  }

  validarEmpleado(empleado: Empleado){
    let index = this.empleados.findIndex((e) => e.id == empleado.id);

    if(index != -1){
      this.empleados[index] = empleado;
    }else{
      this.empleados.push(empleado);

    }

  }
  
  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: "id", header: "Numero Identificacion" },
      { field: "nombre_completo", header: "Nombre Completo" },
      { field: "funciones", header: "Funciones" },
    ];

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar", 
        icon: "pi pi-fw pi-times",
        command: () => this.delete()
      }
    ]

  }

}
