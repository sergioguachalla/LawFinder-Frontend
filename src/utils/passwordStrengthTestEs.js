import owasp from 'owasp-password-strength-test';
// Mensajes de error en español
const mensajesEnEspanol = {
    "The password must be at least 10 characters long.": "La contraseña debe tener al menos 10 caracteres.",
    "The password must be fewer than 128 characters.": "La contraseña debe tener menos de 128 caracteres.",
    "The password must contain at least one uppercase letter.": "La contraseña debe contener al menos una letra mayúscula.",
    "The password must contain at least one lowercase letter.": "La contraseña debe contener al menos una letra minúscula.",
    "The password must contain at least one number.": "La contraseña debe contener al menos un número.",
    "The password must contain at least one special character.": "La contraseña debe contener al menos un carácter especial.",
    "The password must not contain any repeat characters (e.g., 'aaa').": "La contraseña no debe contener caracteres repetidos (por ejemplo, 'aaa').",
    "The password must not be a common password.": "La contraseña no debe ser una contraseña común.",
    "The password must not be a common phrase.": "La contraseña no debe ser una frase común.",
    "The password must not contain personal information.": "La contraseña no debe contener información personal.",
    "The password must not be entirely numeric.": "La contraseña no debe ser completamente numérica.",
    "The password must not be a palindrome.": "La contraseña no debe ser un palíndromo.",
    "The password may not contain sequences of three or more repeated characters.": "La contraseña no puede contener secuencias de tres o más caracteres repetidos.",
}
// Sobrescribir los mensajes originales con los traducidos
const traducirErrores = (errors) => {
    return errors.map(error => mensajesEnEspanol[error] || error);
};

export {owasp, traducirErrores };