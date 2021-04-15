import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilesService } from './services/perfiles/perfiles.service';
import { DependenciasService } from './services/dependencias/dependencias.service';
import { UsuarioService } from './services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuarioForm: FormGroup;
  perfiles: any;
  dependencias: any;
  usuarios: any;

  constructor(
    public fb: FormBuilder,
    public dependenciasService: DependenciasService,
    public perfilesService: PerfilesService,
    public usuarioService: UsuarioService
  ) {

    this.usuarioForm= this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      activo: ['', Validators.required],
      dependencia: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      activo: ['', Validators.required],
      dependencia: ['', Validators.required],
      perfil: ['', Validators.required],
    });


    this.usuarioService.getAllUsuarios().subscribe(resp => {
      this.usuarios = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

    this.perfilesService.getAllPerfiles().subscribe(resp => {
      this.perfiles = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

    this.dependenciasService.getAllDependencias().subscribe(resp => {
      this.dependencias = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

  } 
  guardar(): void {
      this.usuarioService.saveUsuario(this.usuarioForm.value).subscribe(resp => {
      this.usuarioForm.reset();
      this.usuarios=this.usuarios.filter(usuario=> resp.id!==usuario.id);
      this.usuarios.push(resp);
     
    },
      error => { console.error(error) }
    )
  }

  eliminar(usuario){
    this.usuarioService.deleteUsuario(usuario.id).subscribe(resp=>{
      if(resp===true){
        this.usuarios.pop(usuario)
      }
    })
  }

  editar(usuario){
    this.usuarioForm.setValue({
      id:usuario.id,
      nombre: usuario.nombre ,
      fechaNacimiento: usuario.fechaNacimiento ,
      activo: usuario.activo,
      dependencia: usuario.dependencia,
      perfil: usuario.perfil,
    })
  }
}

