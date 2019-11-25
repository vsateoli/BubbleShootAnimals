var animais = ["gato","onca","koala","macaco","urso","panda", "vazio"];
var posicoes = ["vazio"];
const vazio = "vazio";

$( document ).ready(function() {
  sortBubbles();
  colocarAnimalParaLancamento();
  $("#jogo").click(function(event){
      var animalEmbaixo = $(".image")[0].classList[2];
      alocaAnimal(animalEmbaixo,event.offsetX,event.offsetY);
  });
  // $("#jogo").mousemove(function (event){
  //   escreverLinha(event.offsetX,event.offsetY)
  // })
});

function sortBubbles(){
  var cont = 0;
  console.log('Sorteando Animais!');
  for(var i = 0; i< 44; i++){
    var randomico = Math.floor(Math.random()*animais.length);
    posicoes[i] = animais[randomico];
  }
  for(i = 44 ; i<=55; i++){
    posicoes[i] = "vazio";
  }
  for (i = 0; i < 5; i++){
    for (var j = 0; j< 11; j++){
      var jogo = $("#jogo");
      jogo.append('<div class="image '+ posicoes[cont++] + ' p'+ cont +'" style=" margin-top:'+ 70 * i  +'px ; margin-left:'+ 70 * j +'px" ></div>');
    }
  }
}
function colocarAnimalParaLancamento(){
  var randomico = Math.floor(Math.random()*(animais.length-1));
  if (randomico == 0) randomico = 1;
  console.log("randomico para lançamento = " + animais[randomico]);
  //trocar para replace normal
  $("#areaLancamento").children()[0].classList.replace($("#areaLancamento").children()[0].classList[2],animais[randomico])
  $("#areaLancamento").html($("#areaLancamento").html().replace("vazio",animais[randomico]));
}

function verificarColisao(posicao, elemento=null){
  if (elemento ==null)
    elemento = $("#jogo .p"+ posicao)[0].classList[1];
  verificaAcima(posicao,elemento);
  verificaDireita(posicao,elemento);
  verificaEsquerda(posicao, elemento);
  verificaAbaixo(posicao, elemento);
}
function verificaAcima(posicao,elemento){
  //caso sejam os primeiros não é necessário verificar se existe algo em cima
  console.log("verificaAcima ("+posicao+")");
  if (posicao - 11 < 1) return;
  var acima = $("#jogo .p"+(posicao-11))[0].classList[1];
  if (acima == "vazio") return;
  if(acima != null){
    if (elemento == acima){
      //oculto o elemento e o de cima
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao-11))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao-11, elemento);
    }
  }
}
function verificaDireita(posicao,elemento){
  console.log("verificaDireita ("+posicao+")");
  //caso sejam os ultimos da lista, não é necessário verificar a direita
  if (posicao % 11 == 0) return;
  var direita = $("#jogo .p"+(posicao+1))[0].classList[1];
  if (direita == "vazio") return;
  if(direita != null){
    if (elemento == direita){
      //oculto ele e o da direita
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao+1))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao+1, elemento);
    }
  }
}
function verificaEsquerda(posicao,elemento){
  console.log("verificaEsquerda ("+posicao+")");
  //caso sejam os ultimos da lista, não é necessário verificar a direita
  if ((posicao-1) % 11 == 0) return;
  var esquerda = $("#jogo .p"+(posicao-1))[0].classList[1];
  if (esquerda == "vazio") return;
  if(esquerda != null){
    if (elemento == esquerda){
      //oculto ele e o da esquerda
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao-1))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao-1, elemento);
    }
  }
}
function verificaAbaixo(posicao,elemento){
  console.log("verificaEsquerda ("+posicao+")");
  //para baixo vou ter que verificar se existe a tag
  if($("#jogo .p"+(posicao+11))[0] == undefined) return;
  var abaixo = $("#jogo .p"+(posicao+11))[0].classList[1];
  if (abaixo == "vazio" || abaixo == null) return;
  if (elemento == abaixo){
    //oculto ele e o de baixo
    $(".p"+posicao)[0].classList.replace(elemento,"vazio");
    $(".p"+(posicao+11))[0].classList.replace(elemento,"vazio");
    verificarColisao(posicao-1, elemento);
  }
}

function recuperaIndice(x,y){
  indice = 0;
  //EIXO X 
  for(var i = 1; i<11; i++){
    if (x >= 0 && x <= 70){
      indice = 1;
      break;
    }
    if(x > i * 70 && x <= (i +1) * 70){
      indice = i+1;
      break;
    }
  }
  // EIXO Y
  for(var i = 1; i<10; i++){
    if (y >= 0 && y <= 70){
      break;
    }
    if(y > i * 70 && y <= (i +1) * 70){
      indice = (i* 11) + indice;
      break;
    }
  }
  return indice;
}

function alocaAnimal(animal, x,y){
  var indice = recuperaIndice(x,y);
  var animalPosicao = $("#jogo .p"+indice)[0].classList[1];
  if (animalPosicao == vazio){
    $("#jogo .p"+indice)[0].classList.replace("vazio",animal);
    var interval = setInterval(() => {
      verificarColisao(indice);
      colocarAnimalParaLancamento();
      clearInterval(interval);
    }, 500);
    
  }
}
function escreverLinha(x,y){
  $('canvas').clearCanvas();
  $('canvas').drawLine({
    strokeStyle: '#000',
    rounded: true,
    strokeWidth: 2,
    x1: x, y1: 110,
    x2: 150, y2: 0
  });
}