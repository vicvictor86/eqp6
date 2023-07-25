
// Verificar tamanho da imagem
export function checkImageSize() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!file) {
    return false;
  }

  const fileSizeInMB = file.size / (1024 * 1024);

  if (fileSizeInMB > 10) {
    return false;
  }
  return true;

}

export function isEmail(email) {
  const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}
// validar se senha é valida
export function validarSenha(senha) {
  // Verifica se a senha tem pelo menos 8 caracteres
  if (senha.length < 8) {
    return false;
  }

  // Verifica se a senha contém pelo menos um caractere especial
  const caractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
  if (!caractereEspecial.test(senha)) {
    return false;
  }

  // Verifica se a senha contém pelo menos uma letra maiúscula
  const letraMaiuscula = /[A-Z]/;
  if (!letraMaiuscula.test(senha)) {
    return false;
  }

  // Se todos os critérios forem atendidos, a senha é válida
  return true;
}



// Validar se usuario está logado
export function isAuth(navigate) {

  var token = localStorage.getItem('token')
  if (token === null || token === '') {
    navigate('/')
  }
  return token
}

export function isNoAuth(navigate) {

  var token = localStorage.getItem('token')
  if (token !== null || token == '') {
    navigate('/home')
  }
  return token
}