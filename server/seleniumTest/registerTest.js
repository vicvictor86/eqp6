"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var selenium_webdriver_1 = require("selenium-webdriver");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var driver, element, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('MicrosoftEdge').build()];
            case 1:
                driver = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, 13, 14]);
                // Navegue até a página de registro
                return [4 /*yield*/, driver.get('http://localhost:3000/register')];
            case 3:
                // Navegue até a página de registro
                _a.sent();
                // Preencha o formulário de registro
                return [4 /*yield*/, driver
                        .findElement(selenium_webdriver_1.By.id('imageInput'))
                        .sendKeys('C:/Users/bezer/Downloads/imagens/imagem.jpg')];
            case 4:
                // Preencha o formulário de registro
                _a.sent(); // Substitua pelo caminho real da imagem
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('name')).sendKeys('Nome Teste')];
            case 5:
                _a.sent();
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('lastName')).sendKeys('Sobrenome Teste')];
            case 6:
                _a.sent();
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('email')).sendKeys('teste@email.com')];
            case 7:
                _a.sent();
                return [4 /*yield*/, driver
                        .findElement(selenium_webdriver_1.By.id('username'))
                        .sendKeys('nome-de-usuario-teste')];
            case 8:
                _a.sent();
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('password')).sendKeys('Marcus1302@')];
            case 9:
                _a.sent();
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('confirmPassword')).sendKeys('Marcus1302@')];
            case 10:
                _a.sent();
                element = driver.findElement(selenium_webdriver_1.By.id('advance'));
                driver.executeScript('arguments[0].scrollIntoView(true);', element);
                driver.sleep(500);
                driver.executeScript('arguments[0].click();', element);
                // Aguarde a página carregar (ajuste conforme necessário)
                return [4 /*yield*/, driver.sleep(2000)];
            case 11:
                // Aguarde a página carregar (ajuste conforme necessário)
                _a.sent();
                // Verifique se o registro foi bem-sucedido (ajuste o seletor conforme necessário)
                // Você pode adicionar uma verificação específica aqui, como verificar uma mensagem de sucesso ou redirecionamento para uma nova página
                console.log('Teste de registro bem-sucedido!');
                return [3 /*break*/, 14];
            case 12:
                error_1 = _a.sent();
                console.error('Erro durante o teste:', error_1);
                return [3 /*break*/, 14];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); })();
