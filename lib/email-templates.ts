export const welcomeEmailTemplate = (username: string, activationLink: string) => {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .logo { max-width: 200px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #38bdf8; color: white; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
          .divider { border-top: 1px solid #eee; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://masturbase.com/logo.png" alt="Masturbase Logo" class="logo" />
          </div>
          
          <h2>Welcome Dear ${username},</h2>
          <p>We look forward to welcoming you to Masturbase, to a great time together.</p>
          <p>Please click here on the activation link:</p>
          <p style="text-align: center;">
            <a href="${activationLink}" class="button">Activate Your Account</a>
          </p>
          
          <div class="divider"></div>
          
          <h2>Herzlich Willkommen Lieber ${username},</h2>
          <p>Wir freuen uns dich bei Masturbase begrüßen zu dürfen, auf eine gemeinsame und schöne Zeit.</p>
          <p>Bitte hier auf den Aktivierungslink klicken:</p>
          <p style="text-align: center;">
            <a href="${activationLink}" class="button">Konto aktivieren</a>
          </p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Masturbase. All rights reserved.</p>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Wenn Sie sich nicht für dieses Konto angemeldet haben, ignorieren Sie bitte diese E-Mail.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export const passwordResetTemplate = (email: string, resetLink: string) => {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .logo { max-width: 200px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #38bdf8; color: white; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
          .divider { border-top: 1px solid #eee; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://masturbase.com/logo.png" alt="Masturbase Logo" class="logo" />
          </div>
          
          <h2>Password Reset Request</h2>
          <p>We received a request to reset the password for your account (${email}).</p>
          <p>If you did not make this request, you can safely ignore this email.</p>
          <p>To reset your password, please click the button below:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Your Password</a>
          </p>
          <p>This link will expire in 24 hours.</p>
          
          <div class="divider"></div>
          
          <h2>Anfrage zum Zurücksetzen des Passworts</h2>
          <p>Wir haben eine Anfrage zum Zurücksetzen des Passworts für dein Konto (${email}) erhalten.</p>
          <p>Wenn du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.</p>
          <p>Um dein Passwort zurückzusetzen, klicke bitte auf den Button unten:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" class="button">Passwort zurücksetzen</a>
          </p>
          <p>Dieser Link ist 24 Stunden gültig.</p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Masturbase. All rights reserved.</p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>Wenn du keine Passwort-Zurücksetzung angefordert hast, ignoriere bitte diese E-Mail oder kontaktiere den Support, wenn du Bedenken hast.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

