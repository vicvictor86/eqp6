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
(function loginTest() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, emailField, passwordField, loginButton, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('MicrosoftEdge').build()];
                case 1:
                    driver = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 11, 12, 13]);
                    // Navega para a página de login
                    return [4 /*yield*/, driver.get('http://localhost:3000')];
                case 3:
                    // Navega para a página de login
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('email'))];
                case 4:
                    emailField = _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id('password'))];
                case 5:
                    passwordField = _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.className('Button'))];
                case 6:
                    loginButton = _a.sent();
                    // Preenche os campos de email e senha
                    return [4 /*yield*/, emailField.sendKeys('teste@email.com')];
                case 7:
                    // Preenche os campos de email e senha
                    _a.sent();
                    return [4 /*yield*/, passwordField.sendKeys('Marcus1302@')];
                case 8:
                    _a.sent();
                    // Clica no botão de login
                    return [4 /*yield*/, loginButton.click()];
                case 9:
                    // Clica no botão de login
                    _a.sent();
                    // Aguarde a navegação (se necessário) e verifique se o login foi bem-sucedido
                    // Você pode verificar um elemento específico que só é visível após o login bem-sucedido
                    // Por exemplo, você pode verificar se o usuário foi redirecionado para a página inicial
                    return [4 /*yield*/, driver.wait(function () {
                            return driver
                                .getCurrentUrl()
                                .then(function (url) { return url === 'http://localhost:3000'; });
                        }, 5000)];
                case 10:
                    // Aguarde a navegação (se necessário) e verifique se o login foi bem-sucedido
                    // Você pode verificar um elemento específico que só é visível após o login bem-sucedido
                    // Por exemplo, você pode verificar se o usuário foi redirecionado para a página inicial
                    _a.sent();
                    console.log('Teste de login bem-sucedido!');
                    return [3 /*break*/, 13];
                case 11:
                    error_1 = _a.sent();
                    console.error('Ocorreu um erro durante o teste:', error_1);
                    return [3 /*break*/, 13];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
})();
