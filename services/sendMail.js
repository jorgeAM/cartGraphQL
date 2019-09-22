const nodemailer = require('nodemailer')
const path = require('path')

const sendMail = async order => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
    
        const user = await order.getUser()
        const products = await order.getProducts()
        await transporter.sendMail({
            from: '"Jorge L." <test@test.com>',
            to: user.email,
            subject: `resumen de tu orden ${order.id}`,
            html: { path: path.resolve(__dirname, '../public/pages/summary.html') }
        })        
    } catch (err) {
        console.log(err)
    }
}

module.exports = { sendMail }