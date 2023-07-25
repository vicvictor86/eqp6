# eqp6
Equipe 6 - ES 2023.1
- Victor Emmanuel Vieira Soares 
- Marcos Vinicius Ribeiro Alencar
- Emanuel Mendes Monteiro
- Eduardo Bezerra de Sousa

# Documentação da API do Littlegram

O Littlegram é uma API que permite aos usuários fazer upload e gerenciar fotos, além de realizar ações relacionadas aos usuários. Esta documentação fornece uma visão geral dos endpoints disponíveis e suas funcionalidades.

## URL Base

A URL base para todas as solicitações da API é:

```
http://localhost:3333
```

## Autenticação

Quase todas as solicitações exigem autenticação usando um token de autenticação (bearer token). Para obter o token, você deve-se realizar uma solicitação de login usando o endpoint "Login".

### Login

- Método: POST
- URL: `/sessions`
- Headers:
  - Content-Type: application/json
- Corpo:
  ```json
  {
    "email": "vicbem@hotmail.com",
    "password": "vicbem"
  }
  ```

Após o login bem-sucedido, a resposta incluirá o token de autenticação, que deve ser incluído nos cabeçalhos das solicitações subsequentes.

## Endpoints

### Envio de Fotos 

- Método: POST
- URL: `/photos/`
- Headers:
  - Content-Type: multipart/form-data
- Corpo:
  ```json
  {
    "photo": "<caminho-para-o-arquivo-de-imagem-no-computador-do-usuário>"
  }
  ```

### Excluir Foto 

- Método: DELETE
- URL: `/photos/`
- Headers:
  - Content-Type: application/json
- Corpo:
  ```json
  {
    "path": "63ec082bb4cece328887-killJoyDog.jpeg",
    "photoId": "fa25a2ce-1664-4c77-8854-5e9ac7e7a48a"
  }
  ```

### Obter apenas uma foto

- Método: GET
- URL: `/files/photos/55f666bb158012332add-killJoyDog.jpeg`

### Mostrar Fotos 

- Método: GET
- URL: `/photos/user/`

### Criar Usuário 

- Método: POST
- URL: `/users`
- Headers:
  - Content-Type: application/json
- Corpo:
  ```json
  {
    "realName": "victor",
    "username": "vicvictor",
    "email": "vicbem@hotmail.com",
    "password": "vicbem",
    "bio": "ueeeppa"
  }
  ```

### Mostrar Usuários 

- Método: GET
- URL: `/users`

### Atualizar Avatar 

- Método: PATCH
- URL: `/users/avatar`
- Headers:
  - Content-Type: multipart/form-data
- Corpo:
  ```json
  {
    "avatar": "<caminho-para-o-arquivo-de-imagem>"
  }
  ```

### Mostrar Avatar 

- Método: GET
- URL: `/files/avatar/794e63912105d9ae6041-TFH_Cheer_Outfit_Render.png`

