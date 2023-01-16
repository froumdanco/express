
const liked = require('../../models/likefroum.model');

let minlastrequesttime = 60;
exports.create = async (req, res) => {
        console.log(req.body);
    const { parent } = req.body;
    const list = await  liked.findOne({parent:parent, user:req.user._id});
    if(list!=null){
        await liked.deleteOne({parent:parent, user:req.user._id});

        return res.status(200).send({
            message: 'deslike',
            error: list
        });
    }

    const bg = new liked({
        parent: parent,
        user: req.user.id,
    });
    await  bg.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                    console.log(err);
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = bg.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        }else {
            
            return res.status(200).send({
                message: 'add Success',
                data: bg.id
            });
        }
      });
    
};
function sendemail() {

}

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {




};

// Find a single note with a noteId
exports.findOne = async (req, res) => {


};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
  
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

