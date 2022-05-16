Já vimos nas leituras anteriores o quanto podemos melhorar a qualidade do software utilizando testes unitários e o processo TDD, mas é importante entender alguns conceitos que podem facilitar a nossa vida na hora de escrever testes.

Logo que comecei a trabalhar com testes percebi que a dificuldade não estava em compreender a sintaxe ou a API do framework de testes, mas sim os conceitos envolvidos, o que fazer, o que não fazer e como saber se o teste é confiável. Uma aplicação pode precisar acessar um banco de dados ou uma API externa, retornar diferentes respostas ou lançar exceções. Também pode ter que lidar com grandes quantidades de dados em memória, então como testar estes cenários? Com _Test Doubles._

_Test Double_ é qualquer objeto que finge ser um objeto real para fins de testes_._ São usados para simular uma dependência externa ao nosso _SUT (System under Test),_ ou qualquer outro elemento real em um teste. A palavra _double_ remete a Dublê de Cinema.

Segundo [Gerard Meszaros](https://ca.linkedin.com/in/gerardmeszaros), o criador do termo _Tests Doubles,_ estes podem ser divididos em cinco categorias: _Mocks, Stubs, Fakes, Spies e Dummies._ Resumidamente, essas cinco categorias podem ser reduzidas em apenas dois grupos: _Mocks_ e _Stubs._

![](https://miro.medium.com/max/1290/1*Yzzk9bNkuXumtXPNVoDorQ.png)

Figura 1. Crédito: [Unit Testing Principles, Practices, and Patterns](https://www.amazon.com.br/Unit-Testing-Principles-Practices-Patterns/dp/1617296279)

## Mocks

Mocks são objetos que utilizamos para “simular” **interações de saída** com dependências externas ao nosso teste. Essas interações de saída são chamadas que o nosso teste realiza para mudar o seu estado.

Com mocks podemos controlar e inspecionar as chamadas para essa _falsa dependência_. O Mock simula seu comportamento verificando se um ou mais métodos foram ou não chamados, a ordem de chamadas destes métodos, se esses métodos foram chamados com os argumentos certos, e quantas vezes foram chamados.

Mocks podem ser criados facilmente com recursos oferecidos por frameworks de testes como [_Jest_](https://jestjs.io/) (para JavaScript) ou [_Mockito_](https://site.mockito.org/) (para Java).

**Exemplo**

Vamos supor uma aplicação que faz chamadas para a API [jsonplaceholder](https://jsonplaceholder.typicode.com/) e exibe uma lista de posts. Essa aplicação possui um serviço chamado **fetchPosts.js**.

![](https://miro.medium.com/max/1286/1*RjXoYqcqdniAXmCh3R2xMg.png)

Figura 2. src/services/fetchPosts.js

Esse serviço utiliza o [Axios](https://www.npmjs.com/package/axios) para realizar as chamadas. Para testar o serviço vamos criar um mock do Axios e então analizar as interações de saída do nosso _SUT_ com a api do jsonplaceholder.

_“Em testes unitários evitamos chamar dependências externas, pois estas podem interferir nos nossos testes. Também não queremos criar novos registros em um banco de dados em produção ou exceder o limite de requisições de uma API por causa dos testes. Por isso criamos Mocks.”_

![](https://miro.medium.com/max/984/1*53EbJgmZIHEQ5GrfHmYrkw.png)

Figura 3. src/\_\_mocks\_\_/axios.js (Mock da dependência axios.)

No caso do Jest para [criar mocks de dependências npm](https://jestjs.io/docs/en/manual-mocks) basta criar uma pasta **\_\_mocks\_\_** na raiz do projeto e dentro criar um arquivo com o mesmo nome da dependência a ser “mockada”. O Jest detecta estes arquivos e “mocka” automaticamente essas dependências.

Para criar um mock de um método qualquer com Jest basta chamar o helper **jest.fn()**. O argumento passado para o método jest.fn() é opcional, e no código acima, este argumento é um callback que retorna uma promise, que por sua vez resolve um _stub_, como veremos a seguir.

![](https://miro.medium.com/max/1400/1*YUt72KHnmRHu-KChJvSuuA.png)

Figura 4. src/services/fetchPosts.test.js

Podemos ver no teste acima que verificamos duas **interações de saída** do nosso _SUT_ com a dependência externa. Asseguramos que o número de chamadas realizadas foi 1. Também asseguramos que a chamada foi realizada com o parâmetro correto (posts).

```
expect(mockedAxios.get).toHaveBeenCalledTimes(1);expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}posts`);
```

_Perceba que ambas são interações de saída._

**Para que devemos usar Mocks?**

1.  Para testar se um ou mais métodos de uma dependência externa foi chamado corretamente;
2.  Testar quantas vezes esses métodos foram chamados;
3.  Testar se esses métodos foram chamados com os parâmetros corretos.

**Para que não devemos usar Mocks?**

1.  Para testar valores retornados por uma função;
2.  Para testar comportamentos de uma função.

## Stubs

Stubs são objetos que usamos para simular **interações de chegada** de alguma dependência externa ao _SUT_. Diferente do Mock, stubs são objetos com respostas prontas para serem usados no nosso teste. Eles não sabem responder quantas vezes um método de uma dependência externa foi ou não chamado e quais parâmetros foram usados, apenas trazem resposta prontas.

Quando criamos o mock do Axios com a biblioteca Jest, aproveitamos para “estubar” um resultado pronto para o método “get” do Axios. Ou seja, o stub é o retorno final do método get do Axios (como podemos ver na figura 3).

_“Geralmente, as bibliotecas de teste costumam misturar e confundir os conceitos de mock e stub. Tanto Jest (para JavaScript/React) quando o Mockito (para Java), não possuem o conceito de stub. O Jest se utiliza do método jest.fn() para criar tanto mocks quanto stubs, já o Mockito usa a classe Mock para criar mocks e stubs. Isso fica claro na própria documentação do Jest (abaixo).”_

> [Manual **mocks** are used to **stub out** functionality with mock data.](https://jestjs.io/docs/en/manual-mocks)

![](https://miro.medium.com/max/984/1*53EbJgmZIHEQ5GrfHmYrkw.png)

Figura 5. jest.fn() declara o mock, e a promise resolve o stub.

Agora podemos testar se a nossa chamada para a API retorna o resultado esperado, no caso, nosso _stub_.

![](https://miro.medium.com/max/1400/1*OCwkxv5Z2Gjm7D1gNb716A.png)

Figura 6. Teste com interações de saída e chegada.

Perceba que o teste da linha 23 testa uma **interação de chegada** com a api (nosso stub), enquanto as linhas 21 e 22 têm **interações de saída** (nosso mock).

**Para que devemos usar Stubs?**

1.  Para testar retornos de uma dependência externa;
2.  Testar o comportamento do nosso _SUT_ frente aos diferentes retornos da API_._ Por exemplo, retornos de sucesso, falhas ou exceções.

_“Não é aconselhável utilizar Mocks ou Stubs para testes de integração, já que estes devem ser o mais próximo possível do ambiente de produção.”_

## Spies

_Spies_ não é um conceito tão comum quanto _Mocks_ ou _Stubs. Spy_ pode ser definido como um tipo de combinação de um _Mock_ com um _Stub._ Mas não apenas isso, spies também permitem gravar as chamadas para o método “espionado”, além de outras informações.

Como exemplo, temos um objeto **video** que possui o método **play**.

![](https://miro.medium.com/max/594/1*jSme4uiu6bPOEU5up3pPCg.png)

Objeto video

E o teste usando o método **jest.spyOn().**

![](https://miro.medium.com/max/1182/1*D6J8Q1G-Si2jYdvKqL7PeA.png)

Testando o método play do objeto video com spy

Veja no código acima que com o spy podemos testar tanto as interações de chegada quanto de saída. Na linha 5 criamos um _spy_ informando no primeiro parâmetro o objeto e no segundo o método a ser “espionado”.

Neste caso específico, poderíamos também, ao invés de espionar o método _play_, criar um mock do mesmo e retornar um stub. Lembre-se que acima nos referimos ao spy como uma combinação de um mock com um stub.

![](https://miro.medium.com/max/1328/1*K9MJ-3AgqHKIgxBl-KsPug.png)

Testando o método play do objeto video com mock e stub.

Na linha 3 temos o mock do método **play** construído com **jest.fn()** e o stub sendo retornado dentro do método **mockImplementation**. A diferença é que no spy, não é necessário retornar um stub para o teste passar, pois o método real vai ser inspecionado durante o teste. Já no caso do mock com stub é necessário chamar o método **mockImplementation**, ou apenas passar o stub como argumento da função **jest.fn()**. Se chamarmos apenas a função **jest.fn()** sem implementação o teste falha.

**Para que devemos usar Spies?**

Quando queremos gravar o comportamento de um método dentro de um objeto e/ou controlar o que esse método retorna.

## **Fakes**

Usamos Fakes quando queremos testar como nosso código reage a grandes quantidades de dados em memória, como por exemplo, quando recebemos vários registros a partir de uma chamada a um banco de dados ou API. Podemos retornar um fake a partir de um servidor local, criado especificamente para o teste, onde simulamos o retorno de uma query a um banco de dados ou até mesmo um banco de dados real para o teste. Fakes são na verdade objetos reais, muito próximos da sua versão em produção, mas que trazem velocidade aos nossos teste.

_“Fakes são úteis em testes funcionais ou testes de integração, mas não são recomendados para testes unitários onde podemos suprir nossas necessidades com stubs.”_

**Para que devemos usar Fakes?**

1.  Para simular grandes quantidades de dados em memória vindos de uma chamada assíncrona de um banco de dados ou de uma API externa.

## Dummies

_Dummies_ nada mais são do que uma lista de argumentos que utilizamos para manter a assinatura de um método em nosso teste. Servem apenas para preencher um espaço necessário, mas não produzem efeitos no teste.

## Fakes, Spies e Dummies

Como vimos, os _Test Doubles_ podem nos ajudar muito durante os testes. Além do conceito é preciso entender como cada _framework_ de teste implementa esses _doubles._

Vimos também que _Fakes, Spies_ e _Dummies_ são casos particulares de _Mocks_ e _Stubs_. A verdade é que a diferença entre os _Tests Doubles_ é muito sutil, mas é de extrema importância entender os conceitos para garantir a confiabilidade de nossos testes.

## Referências:

1.  [https://martinfowler.com/articles/mocksArentStubs.html](https://martinfowler.com/articles/mocksArentStubs.html)
2.  [https://www.amazon.com.br/Unit-Testing-Principles-Practices-Patterns/dp/1617296279](https://www.amazon.com.br/Unit-Testing-Principles-Practices-Patterns/dp/1617296279)
3.  [https://www.youtube.com/watch?v=NPp2pvhGbkM](https://www.youtube.com/watch?v=NPp2pvhGbkM)
4.  [https://www.youtube.com/watch?v=tVCSKsMtXn0](https://www.youtube.com/watch?v=tVCSKsMtXn0&t=1460s)