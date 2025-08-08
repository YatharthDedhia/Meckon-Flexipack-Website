import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, phone, email, company, message } = await req.json();

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
            port: process.env.SMTP_PORT, // 465 for SSL, 587 for TLS
            secure: process.env.SMTP_SECURE === 'true', // true for port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `New Enquiry from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h2 style="color: var(--brand-red);">New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email ? `<a href="mailto:${email}" style="color: #1a73e8;">${email}</a>` : 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <hr style="border:none; border-top:1px solid #ddd; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
            <hr style="border:none; border-top:1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">This email was sent from your website contact form.</p>
        </div>
    `,
        };


        // Send mail
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
