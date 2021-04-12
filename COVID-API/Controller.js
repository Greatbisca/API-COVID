//Import Covid Model
Covid = require('./Model');

//Para index
exports.index = function (req, res) {
    var casos = [];
    var datas = [];
    var valores = 0;
    var intensivos = [];
    Covid.get(function (err, covid) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        for(var i=0; i<covid.length; i++){
            casos.push(covid[i].confirmados_novos)
            intensivos.push(covid[i].internados_uci)
            datas.push(covid[i].data)
            valores += Number(covid[i].confirmados_novos);
        }
        var max = null;
        max = Math.max(...casos);
        var Max = casos.indexOf(max);
        
        var min = null;
        min = Math.min(...casos);
        var Min = casos.indexOf(min);

        var media = null;
        media = valores/covid.length;


        res.json({
            novos_casos: casos,
            uci_internados: intensivos,
            Maximo: datas[Max],
            Minimo: datas[Min],
            Media: media,
            Total_Casos: valores
        });
    });
};


//Criar nova BIO
exports.add = function (req, res) {
    var covid = new Covid();
    covid.data = req.body.data? req.body.data: covid.data;
    covid.confirmados_novos = req.body.confirmados_novos;
    covid.internados_uci = req.body.internados_uci;


    //Guardar e verificar erros
    covid.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "Nova Covid Adicionada!",
            data: covid
        });
    });
};


exports.index

// Ver Covid
exports.view = function (req, res) {
    Covid.findById(req.params.covid_id, function (err, covid) {
        if (err)
            res.send(err);
        res.json({
            message: 'Detalhes da Covid',
            data: covid
        });
    });
};




// Atualizar Covid
exports.update = function (req, res) {
    Covid.findById(req.params.covid_id, function (err, covid) {
        if (err)
            res.send(err);
        covid.nome = req.body.nome ? req.body.nome : covid.nome;
        covid.email = req.body.email;
        covid.telef = req.body.telef;
        covid.morada = req.body.morada;

        //Guardar e verificar erros
        covid.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Covid Updated Successfully",
                data: covid
            });
        });
    });
};

// Apagar Covid
exports.delete = function (req, res) {
    Covid.deleteOne({
        _id: req.params.covid_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "OK",
            message: 'Covid Eliminada!'
        });
    });
};