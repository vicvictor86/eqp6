import { Builder, By } from 'selenium-webdriver';

(async function loginTest() {
  // Inicializa o WebDriver para o navegador desejado (neste caso, Chrome)
  const driver = await new Builder().forBrowser('MicrosoftEdge').build();

  try {
    // Navega para a página de login
    await driver.get('http://localhost:3000');

    // Encontra os campos de email e senha e o botão de login
    const emailField = await driver.findElement(By.id('email'));
    const passwordField = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.className('Button'));

    // Preenche os campos de email e senha
    await emailField.sendKeys('teste@email.com');
    await passwordField.sendKeys('Marcus1302@');

    // Clica no botão de login
    await loginButton.click();

    // Aguarde a navegação (se necessário) e verifique se o login foi bem-sucedido
    // Você pode verificar um elemento específico que só é visível após o login bem-sucedido
    // Por exemplo, você pode verificar se o usuário foi redirecionado para a página inicial
    await driver.wait(
      () =>
        driver
          .getCurrentUrl()
          .then((url: string) => url === 'http://localhost:3000'),
      5000,
    );

    console.log('Teste de login bem-sucedido!');
  } catch (error) {
    console.error('Ocorreu um erro durante o teste:', error);
  } finally {
    // Fecha o navegador após o teste
  }
})();
