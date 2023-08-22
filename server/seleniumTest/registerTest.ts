import { Builder, By } from 'selenium-webdriver';

(async () => {
  // Inicialize o driver para o Microsoft Edge
  const driver = await new Builder().forBrowser('MicrosoftEdge').build();

  try {
    // Navegue até a página de registro
    await driver.get('http://localhost:3000/register');

    // Preencha o formulário de registro
    await driver
      .findElement(By.id('imageInput'))
      .sendKeys('C:/Users/bezer/Downloads/imagens/imagem.jpg'); // Substitua pelo caminho real da imagem
    await driver.findElement(By.id('name')).sendKeys('Nome Teste');
    await driver.findElement(By.id('lastName')).sendKeys('Sobrenome Teste');
    await driver.findElement(By.id('email')).sendKeys('teste@email.com');
    await driver
      .findElement(By.id('username'))
      .sendKeys('nome-de-usuario-teste');
    await driver.findElement(By.id('password')).sendKeys('Marcus1302@');
    await driver.findElement(By.id('confirmPassword')).sendKeys('Marcus1302@');

    // Clique no botão para enviar o formulário de registro
    const element = driver.findElement(By.id('advance'));
    driver.executeScript('arguments[0].scrollIntoView(true);', element);
    driver.sleep(500);
    driver.executeScript('arguments[0].click();', element);

    // Aguarde a página carregar (ajuste conforme necessário)
    await driver.sleep(2000);

    // Verifique se o registro foi bem-sucedido (ajuste o seletor conforme necessário)
    // Você pode adicionar uma verificação específica aqui, como verificar uma mensagem de sucesso ou redirecionamento para uma nova página

    console.log('Teste de registro bem-sucedido!');
  } catch (error) {
    console.error('Erro durante o teste:', error);
  } finally {
    // Feche o navegador após o teste
  }
})();
