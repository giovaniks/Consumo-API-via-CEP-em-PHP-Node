<?php require 'header.php' ?>
<section class="conteudoHome">
    <div class="mx-auto text-center w-50 shadow shadow-lg" style="margin-top:30px;">
        <div class="buscarInfos card">
        <div class="loadInfos vtrinaCardBg card-body">
            <h5 class="card-title vtrinaTextMenu">Código de Endereçamento Postal</h5>
            <p class="vtrinaText">Verifique informaçoes referentes ao CEP desejado, basta digitar o CEP e acionar o botão de busca!</p>
            <div class="mx-auto input-group input-group-lg w-50">
            <input type="number" class="cepValue form-control" aria-label="buscaCep" aria-describedby="buscaCep" placeholder="Informe o CEP..." style="font-size:14px;">
            <button class="searchCep btn btn-primary text-light fw-bold" style="text-shadow: 1px 1px black; font-size:14px;">
             Buscar
            </button>
            </div>
        </div>
        </div>
    </div>
</section>
<?php require 'footer.php' ?>