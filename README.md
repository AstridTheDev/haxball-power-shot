# Power Shot

Script de Power Shot, funciona melhor em salas Real Soccer, feito em JavaScript

Funções: se o player conduzir a bola por x segundos, o chute dele será mais forte que um chute normal

# Sumario

- [Como usar](#como-usar) Tutorial de como usar o código
- [Configuração](#configuração) Configurações personalizáveis
- [Licença](#licença) **Licença** para usar o codigo

# Como usar 

Modifique e integre esse template no código da sua sala 

Não cole ele sem modificações no seu código, a versão original cria uma nova sala, modifique e tire essa parte

**TIRE A PARTE DE ADM DO CÓDIGO**

## Caso não tiver uma sala

- Entre no [Haxball Headless](https://www.haxball.com/headless)
- Aperte F12 (DevTools) vá em Console
- Cole o codigo
- Aperte enter
- Faça o Captcha do Headless

## Configuração

As configurações ficam no início do código:

```js
const powertime = 5000;
const power = 2.3;
const ballcontacttolerance;
```

## Exemplos
Define o tempo que o jogador precisa conduzir a bola para carregar o power shot

Exemplo:
```const powertime = 3000;```

Se o jogador conduzir a bola durante 3 segundos, o power será carregado

```const power = 2.0;```

A força do power shot, 3.0 = muito forte

```const ballcontacttolerance = 3;```

A tolerância do sistema da distância do player para a bola, quanto maior, maior a distância aceita

## Linguagem de programação

- JavaScript

## Licença

Esse projeto é distribuído sob a licença MIT.

Você pode usar, modificar e distribuir o código livremente, desde que os termos da licença sejam respeitados.

Veja o arquivo `LICENSE` para mais informações.




