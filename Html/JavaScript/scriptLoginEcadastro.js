
document.getElementById("register").addEventListener("click", function (e) {
  e.preventDefault(); // Evita que o formulário seja enviado

  // Pegando os valores do formulário
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelectorAll('input[type="password"]')[0].value;
  const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
  const birthDate = document.querySelector('input[type="date"]').value;


  // Verificação simples
  if (password !== confirmPassword) {
    document.getElementById("message").innerText = "Passwords do not match!";
    return;
  }


  // Salvando no localStorage
  //Esse objeto guarda os dados que o usuário digitou.
  const user = {
    email: email,
    password: password,
    birthDate: Number
  };
  //Salva o objeto no navegador usando localStorage.
  //localStorage só armazena texto, por isso usamos JSON.stringify()
  //  para converter o objeto em string.
  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("message").innerText = "Carregando...";
});




// Função para logar o usuário==================================================================================
function logar(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const user = JSON.parse(localStorage.getItem("user"));
  
  //Verifica se não existe um usuário salvo |if (!user).
  if (!user) {
    document.getElementById("message").innerText = "No user found. Please register first.";
    return;
  }
//Verifica se o email e a senha digitados são iguais aos dados salvos.
  if (user.email === emailInput && user.password === passwordInput) {
    document.getElementById("message").innerText = "Login successful!";//Se forem, mostra a mensagem de sucesso.
    window.location.href = "index.html";//Ira alocar para a pagina principal

  } else {
    //Caso a verificação falhe, mostra uma mensagem de erro.
    document.getElementById("message").innerText = "Invalid email or password.";
  }
}