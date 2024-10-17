import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from '../../../../core/validators/cpf.validator';
import { APP_ROUTES } from '../../../../app-routes.constant';
import { AUTH_ROUTES } from './../../auth-routes.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  {
registerForm : FormGroup;
isLoading = false;


  constructor(
    private fb : FormBuilder,
    private router : Router
    
  ) { 
     //TODO> Inicia el formulario con validadores
     this.registerForm = this.fb.group({
      cpf: ['', [
        Validators.required, 
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),  // CPF en formato XXX.XXX.XXX-XX
        CpfValidator.validarCpf
      ]],// CPF de 11 dígitos
      birthDay: ['2023-11-02T01:22:00', Validators.required],  // Fecha de nacimiento requerida
      email: ['', [Validators.required, Validators.email]],  // Validación de email
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]], // Número de teléfono de 10 o 11 dígitos
    });

  }

 // TODO: Función para aplicar la máscara de CPF
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
  this.registerForm.get('cpf')?.setValue(inputValue);  // Actualiza el valor en el formulario
}

  //TODO:  Función para aplicar la máscara de teléfono
  applyPhoneMask(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, '');  // Eliminar caracteres no numéricos
    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11);  // Limitar a 11 dígitos
    }
    if (inputValue.length > 10) {
      inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (inputValue.length > 6) {
      inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (inputValue.length > 2) {
      inputValue = inputValue.replace(/(\d{2})/, '($1)');
    }
    event.target.value = inputValue;
    this.registerForm.get('phone')?.setValue(inputValue);  // Actualiza el valor en el formulario
  }

  // Método para verificar si el campo es inválido y fue tocado
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && !control.valid && control.touched;  // Verificamos que control no sea null o undefined
  }


  onDateChange(event: any) {
    const isoDate = new Date(event.detail.value).toISOString();  // Convertimos la fecha a formato ISO 8601
    this.registerForm.get('birthDay')?.setValue(isoDate);
  }
  onSubmit(){
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { cpf, birthDay, phone } = this.registerForm.value; // Asegúrate de incluir el teléfono
      console.log('CPF:', cpf);
      console.log('Fecha de Nacimiento:', birthDay);
      console.log('Teléfono:', phone); // Imprime el teléfono
      // TODO: Implementar la lógica de autenticación
      this.isLoading = false;
    } else {
      console.log('Formulario no válido');
    }
    
  }

  goToLogin(){
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`]);
  }

}
