exports.toDetail = function (obj){
    return {
        'id_marinheiro': obj.ID_MARINHEIRO,
        'nome_marinheiro': obj.NOME_MARINHEIRO,
        'id_barco': obj.ID_BARCO,
        'nome_barco': obj.NOME_BARCO,
        'data': obj.DATA.toLocaleDateString('pt-PT', {timeZone: 'Europe/Lisbon'}).split('/').reverse().join('-'),
        'hora': obj.DATA.toLocaleTimeString('pt-PT', {timeZone: 'Europe/Lisbon'})
    }
}