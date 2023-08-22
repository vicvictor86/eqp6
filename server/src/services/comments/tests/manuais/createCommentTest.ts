import { Builder, By, WebDriver } from 'selenium-webdriver';
import { describe, it, after, before } from 'mocha'; // Se estiver usando Mocha para estrutura de teste

describe('Create Comment Test', () => {
  let driver: WebDriver;

  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  it('should create a comment', async () => {
    // Navegue até a página do post (substitua pela URL correta)
    await driver.get('http://seu-site.com/post-id');

    // Faça login se necessário (substitua os seletores e valores corretos)
    await driver.findElement(By.id('username')).sendKeys('seu-usuario');
    await driver.findElement(By.id('password')).sendKeys('sua-senha');
    await driver.findElement(By.id('login-button')).click();

    // Aguarde a página carregar (ajuste conforme necessário)
    await driver.sleep(2000);

    // Encontre o campo de comentário e insira um comentário
    await driver
      .findElement(By.id('comment-field'))
      .sendKeys('Este é um comentário de teste!');

    // Clique no botão para enviar o comentário
    await driver.findElement(By.id('submit-comment')).click();

    // Aguarde o comentário ser postado (ajuste conforme necessário)
    await driver.sleep(2000);

    // Verifique se o comentário foi postado (ajuste o seletor conforme necessário)
    const commentText = await driver
      .findElement(By.css('.comment-text'))
      .getText();
    if (commentText !== 'Este é um comentário de teste!') {
      throw new Error('Comentário não foi postado corretamente');
    }
  });

  after(async () => {
    // Feche o navegador após o teste
    await driver.quit();
  });
});
