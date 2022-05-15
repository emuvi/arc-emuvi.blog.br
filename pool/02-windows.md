+++
title = "Windows"
weight = 2
+++

## Windows Subsystem for Linux (WSL)

### Rodar na inicialização

Criar a rotina em visual basic com o comando: 

```
echo "" > $HOME\run_wsl2_at_startup.vbs
```

Editá-la para conter o fonte:
```
set object = createobject("wscript.shell") 
object.run "wsl.exe --distribution Ubuntu-20.04", 0
```

Adicionar uma tarefa no agendador de tarefas com o executável:
```
%USERPROFILE%\run_wsl2_at_startup.vbs
```

- Adicionar na tarefa o gatilha na inicialização com atraso de 30 segundos.
- Selecionar a opção geral de rodar com qualquer usuário logado ou não.
- Selecionar a opção rodar com maiores privilégios.
- Deselectionar a opção em configurações Parar a tarefa se rodar mais longo que.


### Rodar um programa na inicialização

Mesmo processo acima só com o fonte:
```
set object = createobject("wscript.shell") 
object.run "wsl.exe --distribution Ubuntu-20.04 program arguments", 0
```