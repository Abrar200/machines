import nodemailer from 'nodemailer';

const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dukaniethnicstore@gmail.com',
    pass: 'cquh pjqh hlyi cafy'
  }
};

function formatBookingEmail(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1A1A1A;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
        }
        .header {
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: white;
        }
        .accent-bar {
          height: 4px;
          background: #EB8B1D;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
        }
        .booking-ref {
          background: #f9f9f9;
          border-left: 4px solid #EB8B1D;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .booking-ref strong {
          color: #EB8B1D;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .booking-ref span {
          display: block;
          font-size: 20px;
          font-weight: 600;
          margin-top: 5px;
          color: #1A1A1A;
        }
        .section {
          margin: 30px 0;
        }
        .section-title {
          color: #1A1A1A;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 500;
          color: #666;
        }
        .detail-value {
          font-weight: 600;
          color: #1A1A1A;
          text-align: right;
        }
        .machine-info {
          background: linear-gradient(135deg, #EB8B1D 0%, #FF9D2E 100%);
          color: #1A1A1A;
          padding: 25px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
        }
        .machine-info h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
          color: #1A1A1A;
        }
        .machine-info p {
          margin: 5px 0;
          opacity: 0.95;
          color: #1A1A1A;
        }
        .h1 {
          color: black;
        }
        .total-cost {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 30px 0;
        }
        .total-cost .label {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        .total-cost .amount {
          font-size: 36px;
          font-weight: 700;
          color: #EB8B1D;
        }
        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .status-pending {
          background: #FFF3CD;
          color: #856404;
        }
        .footer {
          background: #f9f9f9;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          margin: 8px 0;
          color: #666;
          font-size: 14px;
        }
        .footer a {
          color: #EB8B1D;
          text-decoration: none;
          font-weight: 600;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        .contact-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }
        .contact-info p {
          margin: 5px 0;
          color: #1A1A1A;
        }
        @media only screen and (max-width: 600px) {
          .content {
            padding: 20px;
          }
          .machine-info h2 {
            font-size: 20px;
          }
          .total-cost .amount {
            font-size: 28px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Request</h1>
        </div>
        <div class="accent-bar"></div>
        
        <div class="content">
          <p style="font-size: 16px; margin-bottom: 20px; color: #1A1A1A;">
            A new machinery hire request has been received and is awaiting approval.
          </p>
          
          <div class="booking-ref">
            <strong>Booking Reference</strong>
            <span>#${booking.id.substring(0, 8).toUpperCase()}</span>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <span class="status-badge status-pending">⏳ Pending Approval</span>
          </div>
          
          <div class="machine-info">
            <h2>${booking.machineName}</h2>
            <p style="font-size: 18px; font-weight: 600;">
              📅 ${new Date(booking.startDate).toLocaleDateString('en-AU', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })} 
              → 
              ${new Date(booking.endDate).toLocaleDateString('en-AU', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            <p style="font-size: 14px;">
              ${Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)) + 1} Day(s)
            </p>
          </div>
          
          <div class="section">
            <div class="section-title">👤 Customer Information</div>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${booking.customerName}</span>
            </div>
            ${booking.company ? `
            <div class="detail-row">
              <span class="detail-label">Company:</span>
              <span class="detail-value">${booking.company}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${booking.phone}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${booking.email}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">📍 Delivery Details</div>
            <div class="detail-row">
              <span class="detail-label">Job Site:</span>
              <span class="detail-value">${booking.jobSite}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Delivery Option:</span>
              <span class="detail-value" style="text-transform: capitalize;">${booking.deliveryOption === 'delivery' ? '🚚 Delivery' : '🏢 Pickup'}</span>
            </div>
          </div>
          
          ${booking.notes ? `
          <div class="section">
            <div class="section-title">📝 Additional Notes</div>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; color: #1A1A1A;">
              ${booking.notes}
            </div>
          </div>
          ` : ''}
          
          <div class="total-cost">
            <div class="label">Estimated Total</div>
            <div class="amount">$${booking.totalCost.toFixed(2)}</div>
          </div>
        </div>
        
        <div class="footer">
          <p style="font-weight: 600; color: #1A1A1A; margin-bottom: 15px;">
            Elite Machine Hire
          </p>
          
          <div class="contact-info">
            <p>📞 <strong>0414 236 306</strong></p>
            <p>📧 <a href="mailto:info@elitemachinehire.com.au">info@elitemachinehire.com.au</a></p>
            <p>📍 103 Globe Derby Drive, Globe Derby, Adelaide, SA</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This booking was submitted through elitemachinehire.com.au
          </p>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} Elite Machine Hire. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const booking = req.body;

    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    const mailOptions = {
      from: `"Elite Machine Hire" <${EMAIL_CONFIG.auth.user}>`,
      to: 'info@elitemachinehire.com.au, abrarshahriar360@yahoo.com',
      subject: `New Booking Request - ${booking.machineName} (#${booking.id.substring(0, 8).toUpperCase()})`,
      html: formatBookingEmail(booking)
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Booking email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send booking email',
      error: error.message 
    });
  }
}