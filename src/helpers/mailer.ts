import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType === 'VERIFY'){
            console.log("Verify section")
            const updatedUser = await User.findByIdAndUpdate(userId,{
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000) // 1hour from now 
                              
                }
            })
            
            console.log("updated user = " ,updatedUser)
        }
        else if(emailType === "RESET"){
            const updatedUser = await User.findByIdAndUpdate(userId,{
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000) // 1hour from now 
                }
            })
        }
        

          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "69e009fca3f2a2",
              pass: "7a27c7ff45667d"
            }
          });


        const mailOptions = {
            from: 'shaaz@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}