exports.toDetail = function (obj){
    return {
        'id_marinheiro': obj.ID_MARINHEIRO,
        'id_barco': obj.ID_BARCO,
        'nome_barco': obj.NOME_BARCO,
        'data': obj.DATA.toISOString().split('T')[0],
        'hora': obj.DATA.toISOString().split('T')[1].slice(0,8)
    }
}