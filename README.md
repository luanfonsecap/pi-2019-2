# Repositório Projeto Interdisciplinar - Una Betim

Desenvolvimento de um Aplicativo Mobile.

![Screenshots do App](https://github.com/luanfonsecap/pi-2019-2/blob/master/Docs/assets/Screenshots%20App.png)

## Mercado Verde
**Ideia do app:**

Aplicativo de agricultura familiar com objetivo de conectar e aproximar produtores   rurais com clientes diretos, facilitando a compra de produtos frescos e livres de agrotóxicos.

:exclamation:
>Aplicação ainda não finalizada.
>Necessário implementar novas e bem elaboradas regras de negócio assim como, funcionalidades e correção de bugs.
> Trabalho puramente acadêmico para conclusão de semestre.

## Funcionalidades

- Compra e venda de produtos orgânicos.
- Avalição de produtores.
- Sacola de compras.
- Produtos mais populares.
- Produtores bem avaliados na plataforma.
- Gerenciamento de pedidos de clientes.
 
## Começando

**Pré Requesitos**

Para rodar este projeto em modo de desenvolvimento é necessário ter instaldo em sua máquina um ambiente básico para rodar um aplicativo React Native.

[NodeJS](https://nodejs.org/en/), React Native CLI, [MySQL](https://dev.mysql.com/downloads/workbench/), [Chocolatey](https://chocolatey.org/). 
E algum emulador Android de sua preferência.

>:exclamation:
>Você precisa configurar o seu emulador de forma correta para rodar a aplicação.
> Você pode encontrar [aqui](https://docs.rocketseat.dev/ambiente-react-native/introducao) um tutorial de configuração.

### Instalando
**Clonando repositório**
```
git clone https://github.com/luanfonsecap/pi-2019-2
cd pi-2019-2
```

### Instalando Dependências

```
choco install -y nodejs.install python2 jdk8
npm install -g react-native-cli
```
É necessário também instalar as dependências do servidor e da aplicação.

- Servidor:
```
cd server
npm install
```

- Aplicação 
```
cd App
cd MercadoVerde
npm install
```
### Subindo Servidor e Aplicação
Dentro da pasta MercadoVerde, rode o comando:
```
react-native run-android
```
Que irá instalar e logo em seguida subir o servidor do Metro.

Em Server, execute:
```
npm start
```
**Conectar o servidor a aplicação:**
Entre no diretório do app e modifique o arquivo url para o endereço IP de sua máquina.
```
cd App
cd Mercadoverde
cd src
code
```
E altere a variável de URL.

## Desenvolvido com

 - React Native
  - React Native Elements
  - Native Base
  - React Navigation
  - React Native Progress

 - NodeJS
  - Express
  - Nodemon
  - Bcrypt
  - Cors

 - MySQL

## Integrantes: 

> Luan Fonseca - RA 61820949

> José Lucas Resende - RA 61820332

> Lucas Daniel Santos Morais Lima - RA 61821315

> Alexander Delfim Ribeiro da Costa Junior - RA 61820948

> Rafael Martins Fagundes - RA 61921472
