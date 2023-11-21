const nodemailer=require('nodemailer')
const emailTemplates=require('./emailTemplates')
module.exports=class Email{
    constructor(user){
        this.to=user.email;
        this.from=`PIZZA PALACE<${process.env.EMAIL}>`
    }

    newTransport(){
        return nodemailer.createTransport({
            host:process.env.GMAIL_HOST,
                prot:process.env.GMAIL_PORT,
            auth:{
                user:process.env.MYMAIL,
                pass:process.env.MYMAIL_PASSWORD
            }
        })
    }
  async  send(subject,html){
        // create mail
        const mailOption={
            from:`${process.env.MYMAIL}`,
            to:this.to,
            subject,
            html
            // html
        }
        // console.log('inside email 2')
    // send mail
   
   await this.newTransport().sendMail(mailOption)
   
    


    }
async welcomeMail(){
 await   this.send("Verification",emailTemplates.welcomeMail())
//  console.log('inside email 1')
}
async passwordEmail(){
    await this.send('ForgotPaswword','Reset Password')
}
async verificationMail(){
    await this.send("ForgotPaswword",'Verifiction Account')
}
}
