let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];


// retorna o valor atual da primeira iteração que
// retornar um valor truthy

Array.prototype.customFind = function(predicate){
    for(const i in this) {
        if(predicate(this[i])) {
            return this[i]
        }
}

 //se pelo menos um return da iteração for truthy, ele
//retorna true
    
Array.prototype.customSome = function (predicate) {
    for(const i of this) {
        if (predicate(i)) {
            return true
        }
    }
    return false;
}
}

//retorna uma array com a lista de valores que
//durante a sua iteração retornaram um valor truthy.

Array.prototype.customFilter = function (predicate) {
    let list = [];
    for(const i of this) {
        if(predicate(i)) {
            list.push(i)
        }
    }
    return list;

}

// a função de callback é executada para cada item da array
// retorna uma nova array com valores atualizados de
// acordo com o return de cada iteração.

Array.prototype.customMap = function (callback) {
    const list = [];
    for(const i of this) {
    list.push(callback(i))
    }
    return list;
}

// executa a função de callback para cada item da Array
// um valor especial existe na função de callback chamado de
// acumulador, que é o retorno da iteração anterior.

Array.prototype.customReduce = function (callback, initialValue) {
    let acc = initialValue !== undefined ||  0;
    
    for(const i of this) {
        acc = callback(acc, i)
    }
    
    return acc;
}

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA") // JAPÃO e CHINA 
    .map(i => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verifique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
    .customMap(i => i.gold)
    .customReduce((total, quantity) => total + quantity);
console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);


/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */


// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano = olympicsMedalTable.customFind(paisAfrica => paisAfrica.continent === "AFRICA");
console.log(`País africano: ${paisAfricano.country}`);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable
.customMap(medalhas =>{
    const ttMedalhas ={}
    ttMedalhas[medalhas.country] = medalhas.gold + medalhas.silver + medalhas.bronze;
    return ttMedalhas;
})
console.log(medalhasPorPais);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable.customFilter(medalha => medalha.gold > 10)
.customMap(pais => pais.country)
console.log(`Países com + de 10 medalhas de ouro: ${paisesCom10MedalhasOuroNoMinimo}`);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable.customFilter(medalhas => (medalhas.gold + medalhas.silver + medalhas.bronze) >= 30)
.customMap(pais => pais.country)
console.log(`Países com no minímo 30 medalhas: ${paisesCom30MedalhasNoMinimo}`);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const paisesComPeloMenos20MedalhasDeOUro = olympicsMedalTable.filter(i => i.continent === "AMERICA DO SUL")
.map(medalhas => medalhas.gold)
.reduce((tt, quant) => tt + quant >= 20)
console.log(`América do Sul conquistou pelo menos 20 medalhas de ouro? ${paisesComPeloMenos20MedalhasDeOUro ? 'Sim' : 'Não'}`);
