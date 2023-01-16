const users = require('../../models/users.model.js');
const filemanager = require('../../models/filemanager.model');
var fs = require('fs')
const sharp = require('sharp');




exports.create = async (req, res) => {
    var OldPath = './' + req.file.path;
    var NewPath = './public/media/realstate/' + req.body.uploadId + '/' + req.file.filename + req.file.originalname;
    fs.mkdir('./public/media/realstate/' + req.body.uploadId + '/thump/', { recursive: true }, (err) => {
        if (err) throw err;

        fs.rename(OldPath, NewPath, async function (err) {
            if (err) throw err
            if (req.file.mimetype.substring(0, 'image'.length) == 'image') {
                sharp(NewPath)
                    .rotate()
                    .resize({ height: 680})
                    .jpeg({ mozjpeg: true })
                    .toFile('./public/media/realstate/' + req.body.uploadId + '/thump/' + req.file.filename + req.file.originalname)
                    .then(data => {

                    })
                    .catch(err => {
                    });
            }

            // console.log(req.body,req.file);
            const last = await filemanager.findOne({ parent: req.body.uploadId}).sort({ ordered:-1 });
            let ordered=0;
            if(last!=null){
                ordered= last.ordered+1;
            }
            const save = new filemanager({
                component: 'realstate',
                file: req.file.originalname,
                url: '/media/realstate/' + req.body.uploadId + '/' + req.file.filename + req.file.originalname,
                mimetype: req.file.mimetype,
                label: req.body.label,
                user: req.user._id,
                ordered:ordered,
                parent: req.body.uploadId,
                name: req.file.filename + req.file.originalname,
                path: '/media/realstate/' + req.body.uploadId + '/',
            });

            save.save(async function (err, applicant) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        return res.status(422).send({
                            message: 'url is Available'
                        });
                    } else {
                        err = save.validateSync();
                        return res.status(422).send({
                            message: err
                        });
                    };
                } else {
                    let check = await filemanager.find({ parent: save.parent, star: true });
                    console.log(check.length);
                    if (check.length == 0) {

                        save.star = true;
                        save.save();
                    }
                    return res.status(200).send({
                        message: 'upload Completed',
                        data: save

                    });
                }
            });
        })
    });


};
exports.up = async (req, res) => {
    const curent = await filemanager.findOne({ _id: req.params.Id });
    const last = await filemanager.findOne({ parent: curent.parent, _id: { $ne: curent._id }, ordered: { $lte: curent.ordered } }).sort({ ordered: -1 });
    if (last != null) {

        var first = curent.ordered;
        var end = last.ordered;
        curent.ordered = end;
        last.ordered = first;
        await curent.save();
        await last.save();
        return res.status(200).send({
            message: last
        });
    } else {
        return res.status(200).send({
            message: 'not change'
        });
    }

}
exports.down = async (req, res) => {
    const curent = await filemanager.findOne({ _id: req.params.Id });
    const last = await filemanager.findOne({ parent: curent.parent, _id: { $ne: curent._id }, ordered: { $gte: curent.ordered } }).sort({ ordered: 1 });
    if (last != null) {
        var first = curent.ordered;
        var end = last.ordered;
        curent.ordered = end;
        last.ordered = first;
        await curent.save();
        await last.save();
        return res.status(200).send({
            message: last
        });
    } else {
        return res.status(200).send({
            message: 'not change'
        });
    }


}
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {


};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    const list = await filemanager.find({ component: 'realstate', parent: req.params.Id, user: req.user._id }).sort({ ordered: 1 });
    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    return res.status(200).send({
        message: list
    });
};
exports.star = async (req, res) => {
    const one = await filemanager.findOne({ _id: req.params.Id, user: req.user._id });
    const onestar = await filemanager.findOne({ parent: one.parent, user: req.user._id, star: true });

    onestar.star = 0;

    one.star = 1;
    await one.save();
    await onestar.save();

    //const list = await filemanager.find({ _id:{"$ne": req.params.Id },user:req.user._id });


    console.log(one);
    return res.status(200).send({
        message: one
    });

}
// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const list = await filemanager.findOne({ component: 'realstate', _id: req.params.Id, user: req.user._id });
    const star = list.star;
    const parent = list.parent;
    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }


    fs.unlink('./public' + list.url, function (err) {
    });

    await list.delete();
    const items = await filemanager.findOne({ parent: parent });


    if (star == true) {

        if (items != null) {
            items.star = true;
            items.save();

        }
    }

    return res.status(200).send({
        message: 'Deleted File'
    });


};

