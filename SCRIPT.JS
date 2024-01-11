const pinCorreto = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
console.log('PIN correto:', pinCorreto); // Exibir PIN no console

let tentativas = 3;

function mostrarOcultarPin() {
  const pinInput = document.getElementById('pinInput');
  const eyeIcon = document.getElementById('eye-icon');

  pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
  eyeIcon.classList.toggle('fa-eye-slash');
}

function verificarPin() {
  const pinDigitado = document.getElementById('pinInput').value;

  if (pinDigitado.length !== 4 || isNaN(pinDigitado)) {
    exibirFeedback('Por favor, insira um PIN válido de 4 dígitos.', true);
    return;
  }

  const feedback = obterFeedbackPin(pinDigitado);
  exibirFeedback(feedback, feedback.includes('Incorreto'));

  if (feedback.includes('Correto')) {
    desabilitarInputEBotao();
  } else if (tentativas === 0) {
    exibirFeedback('Não há mais tentativas. Tente novamente mais tarde.', true);
    desabilitarInputEBotao();
  } else {
    tentativas--;
  }
}

function obterFeedbackPin(pinUsuario) {
  if (pinUsuario === pinCorreto) {
    return 'PIN correto! Acesso concedido.';
  }

  let dica = '';
  for (let i = 0; i < 4; i++) {
    const digitoUsuario = parseInt(pinUsuario[i]);
    const digitoCorreto = parseInt(pinCorreto[i]);

    if (digitoUsuario < digitoCorreto) {
      dica += 'Maior que ' + digitoUsuario + ' ';
    } else if (digitoUsuario > digitoCorreto) {
      dica += 'Menor que ' + digitoUsuario + ' ';
    }
  }

  return dica.trim() !== '' ? 'PIN incorreto. Dica: ' + dica : 'PIN incorreto. Sem dicas.';
}

function exibirFeedback(mensagem, erro) {
  const divFeedback = document.getElementById('feedback');
  divFeedback.textContent = mensagem;

  if (erro) {
    divFeedback.classList.add('animated');
    setTimeout(() => {
      divFeedback.classList.remove('animated');
    }, 300);
  }
}

function desabilitarInputEBotao() {
  document.getElementById('pinInput').disabled = true;
  document.querySelector('button').disabled = true;
}
