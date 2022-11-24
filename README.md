# Curso Alura: “Docker: criando e gerenciando containers”

Date Created: November 14, 2022 12:23 AM
Link curso: https://cursos.alura.com.br/course/docker-criando-gerenciando-containers
Status: Doing

# Anotações

### Aula 1: Conhecendo o Docker

************Data:************ 14/11/2022

Supondo o seguinte cenário: uma aplicação que possui nginx, java e C#, em que o nginx usa a porta 80 e está na versão 1.17.0, o java é a versão 17 e usa a porta 80. Por último, o C# que está na versão 9 e também usa a porta 80. **********************************************Pergunta: quais problemas podemos enfrentar?**********************************************

- Conflito de portas?
- Alteração de versões de forma prática?
- Controle de recursos de memória e CPU?
- Processo de manutenção?

********************************************Uma possível solução:******************************************** comprar uma máquina para cada aplicação, C#, Java e Nginx.

Mas qual o problema dessa solução? Ela é custosa e dificulta o processo de manutenção.

Uma alternativa seria: ********************************máquina virtual.********************************

A imagem da arquitetura fica mais fácil de entender.

![arq-maq-virtual.png](Curso%20Alura%20%E2%80%9CDocker%20criando%20e%20gerenciando%20containe%20aeb52dcc6fcd4b57bc97c983b3a8ef67/arq-maq-virtual.png)

Perceba que compartilham os seus próprios SOs virtualizados e que todos eles estão dentro de um SO “maior”.

A alternativa acima é boa, porém existe uma melhor: **********************containers.**********************

![Demystifying-containers_image1.png](Curso%20Alura%20%E2%80%9CDocker%20criando%20e%20gerenciando%20containe%20aeb52dcc6fcd4b57bc97c983b3a8ef67/Demystifying-containers_image1.png)

Os containers funcionam como ******************processos****************** dentro do SO.

************************Namespaces:************************ garante que cada container tenha capacidade de ******************se isolar****************** em diferentes níveis. São eles:

- PID: provê isolamento dos processos rodando ************dentro************ do container;
- NET: provê isolamento das ************************************interfaces de rede************************************;
- IPC: provê isolamento da ********************************************************comunicação entre processos******************************************************** e ******************************************memória compartilhada******************************************;
- MNT: provê isolamento do **********************************************************************************sistema de arquivos / pontos de montagem**********************************************************************************;
- UTS: provê isolamento do ************kernel************. Age como se o ******************************************************container fosse outro host******************************************************.

Graças ao namespace do UTS, a arquitetura em containers não precisa de um SO específico pois utilizará o ************kernel************ do sistema “original” isoladamente.

**Cgroups:** permite organizar e gerenciar o uso dos recursos em cada container.

Duas questões importantes de entender: ************************************************isolamento de contextos************************************************ e ******************************************************versionamento de aplicações******************************************************.

**************Resumo:**************

- VMs possuem camadas adicionais de virtualização em relação a um container;
- containers funcionam como ******************processos****************** no host;
- containers atingem isolamento através de ********************namespaces********************;
- Os ****************recursos**************** dos containers são ************************gerenciados************************ através de **************cgroups**************.

### Aula 2: Os primeiros comandos

Rodar a primeira imagem:

```bash
docker run hello-world
```

O comando acima vai dar um `pull` na imagem (baixar) e depois rodar.

Quando pedimos para executar o comando acima, o

docker run primeiro vai no docker hub, procura a imagem especificada (no caso acima, hello-world) e baixa depois executa.

```bash
docker ps
```

O comando acima mostra ****************************************************************todos os containers em execução.****************************************************************

```bash
docker container ls
```

Os dois comandos acima executam a mesma coisa.

```bash
docker container ls -a
docker container ps
```

Os comandos acima mostram todos os containers e o histórico de execução deles. Segue o resultado:

```bash
CONTAINER ID   IMAGE         COMMAND    CREATED          STATUS                      PORTS     NAMES
ba510861a8de   ubuntu        "bash"     54 minutes ago   Exited (0) 54 minutes ago             musing_babbage
abfae86b52ee   hello-world   "/hello"   2 hours ago      Exited (0) 2 hours ago                stoic_cerf
ba7c6df89b7d   hello-world   "/hello"   2 hours ago      Exited (0) 2 hours ago                adoring_chebyshev
47f29b24bcd8   hello-world   "/hello"   2 hours ago      Exited (0) 2 hours ago                nervous_proskuriakova
```

- ************************CONTAINER ID:************************ cada container criado gera um ID;
- **************IMAGE:************** imagem que foi usada como base para este container;
- ******************COMMAND:****************** comando executado ao criar o container;
- ****************CREATE:**************** tempo de criação do container;
- ****************STATUS:**************** status de execução;
- ************PORTS:************
- ****************NAMES:**************** nomes automáticos quando não especificamos um.

Para que o container fique em execução, deve ter ao mínimo um processo dentro dele que o “mantenha vivo”.

Quando é executado o container do Ubuntu, teoricamente não acontece nada no terminal. Isso ocorre, pois, como visto no resultado acima, ele executa um comando “bash”. Por ser apenas isso, considera-se que o container “cumpriu o seu dever” e como não existe mais nenhum processo segurando a sua existência, ele para.

Agora vamos executar o seguinte comando:

```bash
docker run ubuntu sleep 1d
```

Ele vai *******travar******* o terminal. Abrindo outro e executando `docker ps`, temos:

```bash
beatriz@DESKTOP-8SJDTA9:~$ docker ps
CONTAINER ID   IMAGE     COMMAND      CREATED          STATUS          PORTS     NAMES
44a237041d2e   ubuntu    "sleep 1d"   14 seconds ago   Up 13 seconds             serene_payne
```

Como não é a nossa intenção deixar este container executando, rodemos:

```bash
docker kill serene_payne
```

Rodando `docker ps` novamente:

```bash
beatriz@DESKTOP-8SJDTA9:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Ou seja, o kill “mata” o container em execução.

Outro comando que pode ser executado para ************parar************ a execução de um container é:

```bash
docker stop [id_container]
```

Para retomar a execução:

```bash
docker start [id_container]
```

Interagir com o container em execução:

```bash
docker exec -it [container_id] bash
```

Ao tentar executar o comando acima, estava enfrentando esse erro:

- error response from daemon container is not running

Para corrigir, encontrei a seguinte questão no Stackoverflow: [https://stackoverflow.com/questions/29599632/docker-container-is-not-running](https://stackoverflow.com/questions/29599632/docker-container-is-not-running)

Rodei os seguintes comandos para corrigir:

```bash
docker commit [container_id]

docker run it [container_id] bash
```

Para parar a execução de um container:

```bash
docker stop [container_nome]
```

Para retomar a execução do container ********stoppado********:

```bash
docker unpause [container_id]
# pausar container
docker pause [container_id]
```

Vamos baixar e executar uma imagem que disponibiliza uma página web. Porém, se apenas fizermos `docker run dockersamples/static-site` , ele irá baixar, executar, mas vai travar o terminal. A fim de evitar que isso ocorra, passemos uma ********flag:********

```bash
docker run **-d** dockersamples/static-site
```

Para parar e remover o container com um só comando, basta executar:

```bash
docker rm [container_id] --force
```

Quando subimos o `dockersamples/static-site` , graças ao namespace, ele usou uma porta no container que não necessariamente usa a mesma porta na nossa máquina. Portanto, precisamos fazer o ****************************************mapeamento de portas****************************************. 

Primeiro executamos de novo, porém com a flag ******-P****** antes para que indique a necessidade de realizar o mapeamento:

```bash
docker run -d ******-P****** dockersamples/static-site
```

Posteriormente podemos executar o seguinte comando com o intuito de verificar o mapeamento de porta daquele container em específico:

```bash
docker port [container_id]
```

O resultado foi:

```bash
beatriz@SOFT009036:~$ docker port 97afd0afe4b9
80/tcp -> 0.0.0.0:49154
80/tcp -> :::49154
443/tcp -> 0.0.0.0:49153
443/tcp -> :::49153
```

Quer dizer que ele mapeou da porta 80 para **********49154**********.

![2022-11-16_00h07_40.png](Curso%20Alura%20%E2%80%9CDocker%20criando%20e%20gerenciando%20containe%20aeb52dcc6fcd4b57bc97c983b3a8ef67/2022-11-16_00h07_40.png)

Para especificar a porta que deve ser mapeada, façamos:

```bash
docker run -d -p 8080:80 dockersamples/static-site
```

O comando acima quer dizer que

> a porta 8080 de nosso host irá refletir na porta 80 do container.
> 

### Aula 3: Criando e compreendendo imagens

O comando `docker images` verifica todas as imagens baixadas no docker. Usando a máquina da Softplan e rodando esse comando, foi possível ver todas as imagens baixadas. Segue um exemplo:

```bash
beatriz@SOFT009036:~$ docker images
REPOSITORY                                                     TAG         IMAGE ID       CREATED         SIZE
docker-unj-repo.softplan.com.br/unj/tjws                       3.5.0-31    a5c4cd4caf4f   2 weeks ago     419MB
docker-unj-repo.softplan.com.br/unj/tjws                       3.4.1-18    7694ced333c4   3 weeks ago     413MB
docker-unj-repo.softplan.com.br/unj/cpopg                      21.2.0-16   2267ffb757d1   5 weeks ago     731MB
docker-unj-repo.softplan.com.br/unj/mniws-consultaprocessows   1.2.6-16    d7ffa1f83160   7 weeks ago     351MB
docker-unj-repo.softplan.com.br/unj/dje                        20.3.0-3    53427c4d52ee   8 weeks ago     1.06GB
docker-unj-repo.softplan.com.br/unj/cpopg                      21.2.0-15   698590f29d33   8 weeks ago     731MB
```

Para coletar mais informações acerca de uma imagem específica, podemos executar o comando `docker inspect [container_id]`.

O comando `docker history [container_id]` nos possibilita ver o histórico de uma imagem.

Quando temos a nossa imagem ela é **R**ead **O**nly (***RO*****************)**************, ela é imutável.

Um container cria uma camada temporária acima da imagem de leitura e escrita. Quando o container é apagado/deletado, perdemos o poder de escrita.

As imagens podem ser consideradas como “receitas” para gerar containers.

### Criando a primeira imagem

Estamos criando uma imagem para uma pequena aplicação de exemplo em ********Node********. Apontaremos para a imagem oficial do Node no dockerhub: [https://hub.docker.com/_/node](https://hub.docker.com/_/node). É recomendável sempre ler a documentação da imagem, principalmente a aba “Supported tags and respective `Dockerfile` links”.

Para aprender como manipular essa imagem, existe esse repositório: [https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image](https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image).

****************************Passo a passo:****************************

1. Criar um arquivo `Dockerfile`;
2. Digitar:

```docker
FROM node:14
WORKDIR /diretorio-projeto
COPY . /diretorio-projeto
RUN npm install
ENTRYPOINT npm start
```

O ponto de entrada do container ao executar a imagem está no comando `ENTRYPOINT npm start`.

O comando que de fato gera uma imagem:

```bash
docker build -t beatrizgomes/app-node:1.0
```

A flag `-t` permite que estilize um nome, o `/appnode` é o nome do projeto e o `:1.0` é a versão do comando.

Eu vou tentar criar uma imagem a partir do projeto javascript de gerador de senhas.

URL do Github: https://github.com/biangomes/gerador-de-senhas

Estou mexendo no projeto `docker-template`. O arquivo dockerfile que precisa ser mexido é o que está ******************dentro****************** do projeto.

```docker
FROM node:14
WORKDIR /app-exemplo
COPY . .
RUN npm install
ENTRYPOINT npm start
```

- **********FROM:********** cria a partir da versão 14 da imagem do node
- ******************WORKDIR:****************** define um diretório de trabalho. Com essa instrução evitamos de ter que passar o `. /app-exemplo` para as três próximas linhas
- **********RUN:********** comando que deve ser executado dentro do diretório `/app-exemplo`.
- **********************ENTRYPOINT:********************** define o ponto de entrada da aplicação. Nesse cenário, o ponto de entrada é executar o comando `npm start` que é o comando responsável por ********startar******** uma aplicação node.js.

Depois de criado o Dockerfile, executei o seguinte comando para de fato ************************buildar************************ a imagem:

```bash
docker build -t beatriz/app-exemplo:1.0
```

Depois de executar o comando acima, ele irá de fato criar a imagem.

Para ver se deu tudo certo:

```bash
docker images
```

Daí para executar o container:

```bash
docker run -p 8080:3000 beatriz/app-exemplo:1.0
```

O resultado final é:

![2022-11-19_13h16_08.png](Curso%20Alura%20%E2%80%9CDocker%20criando%20e%20gerenciando%20containe%20aeb52dcc6fcd4b57bc97c983b3a8ef67/2022-11-19_13h16_08.png)

Se dermos um `docker ps` e retornar vários containers em execução e, dentre eles, um que queiramos de fato parar podemos fazer o seguinte comando com as seguintes observações:

```bash
docker stop $(docker container ls -q)
```

O `docker container ls -q` serve como se fosse um parâmetro do `docker stop`. O `ls -q` refere-se a “parar lentamente” (*******quietly*******) o container, de forma segura.

No comando

```bash
docker run -p 8080:3000 beatriz/app-exemplo:1.0
```

como visto anteriormente, pedimos para rodar a imagem app-exemplo na versão 1.0 mapeando a porta ********8080********. No entanto, ainda com a imagem ativa, subirmos outra instância da mesma imagem ******sem****** mapeamento de porta, ela será redirecionada porta padrão que é a ********3000********. Como o usuário, ou quem quer que esteja acessando, saberá?

Podemos, através do `Dockerfile`, **********EXPOR********** a porta padrão através do comando `EXPOSE`. O resultado final é:

```yaml
FROM node:14
WORKDIR /app-exemplo
**EXPOSE 3000  # nao eh obrigatorio**
COPY . .
RUN npm install
ENTRYPOINT npm start
```

- [x]  Rever o vídeo 06 da Aula 3

Depois de executar os comandos abaixo:

```bash
# Montando uma nova imagem
docker build -t beatriz/app-exemplo:latest . 

# Executando a nova imagem
docker run -d beatriz/app-exemplo:latest

# Status das imagens
docker ps
```

Temos isso como resposta:

![2022-11-23_23h02_20.png](Curso%20Alura%20%E2%80%9CDocker%20criando%20e%20gerenciando%20containe%20aeb52dcc6fcd4b57bc97c983b3a8ef67/2022-11-23_23h02_20.png)

***************Obs.: PORTS 3000/tcp***************

Isso ocorreu porque ******************expusemos****************** a porta 3000 no Dockerfile.

Supondo um contexto diferente da nossa aplicação em que queremos utilizar o conceito de variável de ambiente para a porta, podemos usar a palavra `ARG`.

- [ ]  Rever `ARG`
- [ ]  Rever `ENV`