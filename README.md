Exercício proposto na aula de javascript da Alpha EdTech com o tema de "Requisições Web"

Descrição da atividade:

Crie uma página web para consulta de CEP e localidade de forma que:

1) possua um campo para que o usuário digite o CEP

2) deve haver um campo “Consultar” que será utilizado para fazer uma requisição à API CEP, se o valor informado num input for válido

3) caso o valor seja inválido, a requisição não deve ser realizada e uma mensagem de erro deve ser mostrada ao usuário

4) após requisição à API CEP, deve ser mostrado na página as seguintes informações do CEP consultado: endereço, bairro, cidade, estado, latitude, longitude.

5) ao retornar os dados, deve ser exibido um botão com o título ‘Exibir mapa’ 

6) ao clicar no botão ‘Exibir mapa’, deve ser feita uma consulta à API Google Maps com os parâmetros de latitude e longitude obtidos na consulta a API CEP: 

6.1) utilize a seguinte url para obter os dados do mapa: https://maps.google.com/maps?q=LAT,LNG&hl=pt&z =14&output=embed, substituindo LAT e LNG com os valores de latitude e longitude obtidos

6.2) um iframe deve ser preenchido na mesma página com o mapa obtido

7) utilize o cursor wait e o pointer para sinalizar consulta sendo realizada:

7.1) não permita ao usuário realizar operações enquanto o cursor não retornar ao default

7.2) caso a consulta de CEP retorne status de erro:

7.2.1) não exiba os resultados da consulta

7.2.2) exiba um erro de consulta de CEP do tipo ‘CEP inválido!’

7.2.3) não exiba o botão ‘Exibir mapa’ e o ‘iframe’
