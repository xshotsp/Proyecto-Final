const validate = ({usuario,contraseña}) => {
  const errors = {};

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(usuario)) {
    errors.usuario = "You must enter a valid email.";
  }

  if (usuario.length > 35) {
    errors.usuario = "Email must be least to 250 characters";
  }
  if (usuario === "") {
    errors.usuario = "The field cannot be empty.";
  }

  if (!/\d/.test(contraseña)) {
    errors.contraseña = "Password must contain at least one number.";
  }

  if (!(contraseña.length >= 6 && contraseña.length <= 10)) {
    errors.contraseña = "The password must contain between 6 and 20 characters.";
  }

  if(!/[A-Z]/.test(contraseña)) errors.contraseña = "The password must contain at least one uppercase letter."

  return errors;
}

export default validate;