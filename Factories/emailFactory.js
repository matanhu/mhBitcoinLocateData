var nodemailer = require('nodemailer');

var EmailSender = {
    sendEmailWithLink: function (cryptoType, lastNum, newNum) {
        this.smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'matan.chipopo@gmail.com',
                pass: '01111987'
            }
        });

        this.mailOptions = {
            from: 'matan.chipopo@gmail.com',
            to: 'matan.chipopo@gmail.com',
            subject: 'שינויים במצב ה ' + cryptoType,
            html: `
                <div dir='rtl'>
                    <table>
                        <tr>
                            <th>
                                פעולה    
                            </th>
                            <th>
                                שער ישן    
                            </th>
                            <th>
                                שער חדש
                            </th>
                        <tr>
                        <tr>
                            <td>
                                מכירה
                            </td>
                            <td>`
                                +lastNum.sellPrice.toString()+
                            `</td>
                            <td>`
                                +newNum.sellPrice.toString()+
                            `</td>
                        </tr>
                        <tr>
                            <td>
                                קנייה
                            </td>
                            <td>`
                                +lastNum.buyPrice.toString()+
                            `</td>
                            <td>`
                                +newNum.buyPrice.toString()+
                            `</td>
                        </tr>
                    </table>
                </div>
            `
        };

        this.smtpTransport.sendMail(this.mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
};

module.exports = EmailSender;