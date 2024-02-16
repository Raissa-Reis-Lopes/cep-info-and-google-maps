const cep = document.getElementById("cep");
    const checkBtn = document.getElementById("check-button");
    const message = document.getElementById("message");
    const showMapBtn = document.getElementById("show-map-button");
    const divShowInfo = document.getElementById("show-info");
    const iframeContainer = document.getElementById("iframe-container");
    let dataLat;
    let dataLng;


    function clearPage(){
            divShowInfo.innerHTML = "";
            message.innerHTML = "";
            iframeContainer.innerHTML="";
    }


    //Primeiro eu vou validar o cep com uma regex
    //Vou passar o cep como parâmetro para validar a entrada do input
    checkBtn.addEventListener("click",function(event){
        event.preventDefault();
        const cepValue = cep.value;
        clearPage();

        //Depois de verificar se o cep foi digitado corretamente, vou fazer a requisição à API
        if(validateCEP(cepValue)){
            showMapBtn.classList.remove("hidden");
            //Input válido, agora vou fazer a requisição, vou criar a função fora daqui só para chamar passando parâmetro depois;
            checkCEP(cepValue);
            showMapBtn.addEventListener("click", showMap);


        }else{
            showMapBtn.classList.add("hidden");
            message.innerText = "CEP inválido, por favor digite novamente"
        }

    })


    //Depois de fazer as verificações e mostrar tudo na tela, vou colocar o click no botão para mostrar o google maps em um iframe
    function showMap(){
            iframeContainer.innerHTML = "";

             // Adicionando o wait para mostrar que o mapa está sendo carregado
            document.body.classList.add('waiting');

            //Tinha salvado a latitude e longitude em variáveis globais e vou acessar aqui no maps
            iframeContainer.innerHTML = `
            <iframe src="https://maps.google.com/maps?q=${dataLat},${dataLng}&hl=pt&z =14&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            `

            const iframe = document.querySelector("iframe");

              iframe.onload = () => {
                        document.body.classList.remove("waiting") 
                };
        
    }

    //Criei a função de validar o cep passando um parâmetro para pegar o input depois
    function validateCEP(cep){
        const regexCEP = /^\d{5}-\d{3}$/;

        return regexCEP.test(cep);
    }


    // Função para consultar informações de um CEP
    function checkCEP(cep) {

        //Adicionando o wait para mostrar que a consulta está em andamento
        document.body.classList.add('waiting');

    // URL da api no material, aqui eu peguei o exemplo dado na API REST com o método get, mas passei o cep como parâmetro em vez de passar um cep fixo para poder pegar o valor digitado pelo usuário
    //Vou pegar os dados em json para poder consultá-los depois e listar as informações na ul que eu criei no html
    const url = `https://cep.awesomeapi.com.br/json/${cep}`;

    // Fazendo a requisição usando o método fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
        // Verifica se a resposta contém erro para depois poder aparecer o botão que vai mostrar o mapa
        if (data.erro) {
            console.log("CEP não encontrado.");
            // message.innetText =  mostrar na tela depois
        } else {
            //Se der certo, vai aparecer o botão para mostrar o mapa depois e fiz uma função para mostrar os dados na tela passando o data como parâmetro
            showMapBtn.classList.remove("hidden");
            showData(data);

            //Vou salvar os dados retornado em uma variável global pra poder acessar quando for renderizar o google maps
            dataLat = data.lat;
            dataLng = data.lng; 
        }
        })
        .catch(error => {
            console.error("Ocorreu um erro na requisição:", error);
            // message.innerText = error.message; Testar depois pra mostrar a msg pro usuário
        })
        .finally(() => {
            // Removendo a classe 'waiting' independentemente de sucesso ou falha
            document.body.classList.remove('waiting');
        });
        
    }


    function showData(data){

        clearPage();

              //E tb vai mostrar os dados na tela
            const endereco = document.createElement("div");
            endereco.innerText = `Endereço: ${data.address}`;
            divShowInfo.appendChild(endereco);

            const bairro = document.createElement("div");
            bairro.innerText = `Bairro: ${data.district}`;
            divShowInfo.appendChild(bairro);

            const cidade = document.createElement("div");
            cidade.innerText = `Cidade: ${data.city}`;
            divShowInfo.appendChild(cidade);

            const estado = document.createElement("div");
            estado.innerText = `Estado: ${data.state}`;
            divShowInfo.appendChild(estado);

            const latitude = document.createElement("div");
            latitude.innerText = `Latitude: ${data.lat}`;
            divShowInfo.appendChild(latitude);

            const longitude = document.createElement("div");
            longitude.innerText = `Longitude: ${data.lng}`;
            divShowInfo.appendChild(longitude);
    }


  