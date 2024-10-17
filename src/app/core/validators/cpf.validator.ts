import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfValidator {
  static validarCpf(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value.replace(/\D/g, '');  // Elimina caracteres no numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return { cpfInvalido: true };  // Si tiene menos de 11 dígitos o todos los dígitos son iguales, es inválido
    }

    let soma = 0;
    let resto;

    // Validación del primer dígito verificador
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };

    soma = 0;
    // Validación del segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };

    return null;  // Si pasa ambas validaciones, el CPF es válido
  }
}
