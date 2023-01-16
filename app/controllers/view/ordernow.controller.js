const nodemailer = require("nodemailer");
const orderlist = require('../../models/orderlist.model');


exports.create = async (req, res) => {
    const { name, lastname,phone, whatsapp,email,company,devices,description} = req.body;

    let transporter = nodemailer.createTransport({
        host: "srv.afrangart.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'support@mobtakeransarma.ir', // generated ethereal user
            pass: 'mobtakeran@36865', // generated ethereal password
        },
    });

    //console.log(name+ lastname+phone+whatsapp+email+company+devices+description);
    let html="<div dir='rtl'><h3>سفارش از سایت</h3><p>نام:"+name+" "+lastname+"</p><p>ایمیل:"+email+"</p><p>واتس آپ:"+whatsapp+"</p><p>شماره تماس: "+phone+"</p><p>کمپانی:"+company+"</p><p>نام دستگاه:"+devices+"</p></p><p>توضیحات:"+description+"</p></div>";
    // const bg = new orderlist({
    //     name: name,
    //     data: {
    //         name:name,
    //         lastname:lastname,
    //         phone:phone,
    //         whatsapp:whatsapp,
    //         email:email,
    //         company:company,
    //         devices:devices,
    //         description:description,
    //     },
    // });
    //   bg.save(function (err, applicant) {
    //     if (err) {
    //         if (err.name === 'MongoError' && err.code === 11000) {
    //             console.log(err);
    //             return res.status(422).send({
    //                 message: 'url is Available'
    //             });
    //         } else {
    //             err = bg.validateSync();
    //             return res.status(422).send({
    //                 message: err
    //             });
    //         };
    //     }else {
    //
    //     }
    // });

     transporter.sendMail({
        from: 'support@mobtakeransarma.ir', // sender address
        to: email,
        subject: "مبتکران سرما ساز", // Subject line
        html: html, // html body
    });
    let info =  transporter.sendMail({
        from: 'support@mobtakeransarma.ir', // sender address
        to: "info@mobtakeransarma.ir", // list of receivers
        subject: "سفارش از سایت", // Subject line
        html: html, // html body
    });
    console.log("Message sent: %s", info.messageId);
   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return res.status(200).send({
        message: html
    });
};
exports.findAll =async (req, res) => {

};
exports.findOne =async (req, res) => {
}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
 
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  
};
//sedighi37517!@#
