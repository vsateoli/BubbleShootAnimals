var animais = ["gato","onca","koala","macaco","urso","panda", "vazio"];
var posicoes = ["vazio"];
$( document ).ready(function() {
sortBubbles();
});

function sortBubbles(){
  var cont = 0;
  console.log('Sorteando Bolas!');
  for(var i = 0; i< 55; i++){
    var randomico = Math.floor(Math.random()*animais.length);
    posicoes[i] = animais[randomico];
  }
  for (i = 0; i < 5; i++){
    for (var j = 0; j< 11; j++){
      var jogo = $("#jogo");
      jogo.append('<div class="image '+ posicoes[cont++] + '" style=" margin-top:'+ 70 * i  +'px ; margin-left:'+ 70 * j +'px" >');
    }
  }
}