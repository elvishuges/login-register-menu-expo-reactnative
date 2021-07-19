export function passwordValidator(password) {
  if (!password) return "Senha não pode ser vazia.";
  if (password.length < 4) return "Senha deve ter no mínimo 4 digitos.";
  return null;
}
