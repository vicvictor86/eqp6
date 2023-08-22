import { Builder } from 'selenium-webdriver';

(async () => {
  const driver = await new Builder().forBrowser('MicrosoftEdge').build();

  try {
    await driver.get('https://bing.com');
    console.log('Navegação bem-sucedida para o Bing!');
  } finally {
    await driver.quit();
  }
})();
