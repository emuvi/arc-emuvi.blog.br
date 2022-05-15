+++
title = "NetBeans"
weight = 2
+++

## Aumentar o espaçamento entre linhas

Altere o seguinte arquivo:
´´´
~/.netbeans/$VERSION/config/Editors/Preferences/org-netbeans-modules-editor-settings-CustomPreferences.xml
´´´

Adicione a seguinte entrada:
´´´
<entry javaType="java.lang.Float" name="line-height-correction" xml:space="preserve"><value><![CDATA[1.4]]></value></entry>
´´´

## Aumentar o tamanho da fonte da IDE
Coloque a opção de inicialização --fontsize <size> (padrão é 11).
Altere o arquivo netbeans.conf que fica em /etc dentro da pasta do NetBeans.
Coloque o paramêtro em netbeans_default_options