import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { APP_ROUTES } from '../../../../app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routes.constant';
import { CpfValidator } from 'src/app/core/validators/cpf.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  loginForm : FormGroup;
  isLoading = false;

  constructor(
    private fb : FormBuilder,
    private router : Router
  ) {
    //TODO> Inicia el formulario con validadores
    this.loginForm = this.fb.group({
      cpf: ['', [
        Validators.required, 
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),  // CPF en formato XXX.XXX.XXX-XX
        CpfValidator.validarCpf
      ]],
      birthDay: ['2023-11-02T01:22:00', Validators.required]  // Un valor en formato ISO 8601
    })
   }
 // Función para aplicar la máscara de CPF
 applyCpfMask(event: any): void {
  let inputValue = event.target.value.replace(/\D/g, '');  // Eliminar caracteres no numéricos

  if (inputValue.length > 11) {
    inputValue = inputValue.slice(0, 11);  // Limitar el valor a 11 dígitos
  }

  if (inputValue.length > 9) {
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (inputValue.length > 6) {
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
  } else if (inputValue.length > 3) {
    inputValue = inputValue.replace(/(\d{3})(\d{3})/, '$1.$2');
  }

  event.target.value = inputValue;
  this.loginForm.get('cpf')?.setValue(inputValue);  // Actualiza el valor en el formulario
}

// Verifica si el campo es inválido y fue tocado
isFieldInvalid(field: string): boolean {
  const control = this.loginForm.get(field);
  return !!control && !control.valid && control.touched; // Verificamos que control no sea null o undefined
}

onDateChange(event: any) {
  const isoDate = new Date(event.detail.value).toISOString(); // Convertimos la fecha a formato ISO 8601
  this.loginForm.get('birthDay')?.setValue(isoDate);
}

async onSubmit() {
  if (this.loginForm.valid) {
    this.isLoading = true; // Iniciar el estado de carga

    const { cpf, birthDay } = this.loginForm.value;
    console.log('CPF:', cpf);
    console.log('Fecha de Nacimiento:', birthDay);

    // TODO: Aquí debes implementar la lógica de autenticación

    this.isLoading = false; // Finalizar el estado de carga
  } else {
    console.log('Formulario no válido');
  }
}

goToRegister() {
  this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`]);
}
}