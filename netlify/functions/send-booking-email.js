const { Resend } = require('resend');

/**
 * Netlify Function to send booking confirmation emails
 * Uses Resend API for transactional emails
 */
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  // Check for API key
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' })
    };
  }

  try {
    const booking = JSON.parse(event.body);
    
    // Format service type for display
    const serviceLabels = {
      'dressage': 'Dressage Training',
      'private': 'Private Lesson',
      'semi-private': 'Semi-Private Lesson',
      'group': 'Group Lesson',
      'assessment': 'Initial Assessment'
    };
    
    const serviceName = serviceLabels[booking.serviceType] || booking.serviceType;
    const formattedDate = new Date(booking.date).toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Email to Lucie (owner notification)
    await resend.emails.send({
      from: 'Lucie Hill Equestrian <bookings@resend.dev>',
      to: 'hill.lucie@gmail.com',
      subject: `🐴 New Booking: ${booking.firstName} ${booking.lastName} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4a7c4a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #4a7c4a; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🐴 New Booking Received!</h1>
            </div>
            <div class="content">
              <div class="detail-row">
                <span class="label">Booking ID:</span> ${booking.id}
              </div>
              <div class="detail-row">
                <span class="label">Client Name:</span> ${booking.firstName} ${booking.lastName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> <a href="mailto:${booking.email}">${booking.email}</a>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span> <a href="tel:${booking.phone}">${booking.phone}</a>
              </div>
              <div class="detail-row">
                <span class="label">Service:</span> ${serviceName}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${formattedDate}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${booking.time}
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span> ${booking.duration} minutes
              </div>
              <div class="detail-row">
                <span class="label">Experience Level:</span> ${booking.riderLevel}
              </div>
              <div class="detail-row">
                <span class="label">Own Horse:</span> ${booking.hasOwnHorse === 'yes' ? `Yes - ${booking.horseName}` : 'No - Needs school horse'}
              </div>
              ${booking.specialRequests ? `
              <div class="detail-row">
                <span class="label">Special Requests:</span><br>
                ${booking.specialRequests}
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Login to your admin dashboard to confirm this booking</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Confirmation email to client
    await resend.emails.send({
      from: 'Lucie Hill Equestrian <bookings@resend.dev>',
      to: booking.email,
      subject: `Booking Confirmation - ${serviceName} on ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4a7c4a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; }
            .booking-box { background: #f5f1e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { padding: 8px 0; }
            .label { font-weight: bold; color: #4a7c4a; }
            .status { background: #fef3cd; color: #856404; padding: 10px 15px; border-radius: 5px; text-align: center; margin: 20px 0; }
            .footer { background: #4a7c4a; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
            .footer a { color: #f5f1e8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Lucie Hill Equestrian</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Booking Confirmation</p>
            </div>
            <div class="content">
              <p>Dear ${booking.firstName},</p>
              <p>Thank you for booking with Lucie Hill Equestrian! We're excited to welcome you.</p>
              
              <div class="status">
                ⏳ <strong>Status: Pending Confirmation</strong><br>
                <small>We'll contact you shortly to confirm your booking</small>
              </div>
              
              <div class="booking-box">
                <h3 style="margin-top: 0; color: #4a7c4a;">Your Booking Details</h3>
                <div class="detail-row">
                  <span class="label">Booking Reference:</span> ${booking.id}
                </div>
                <div class="detail-row">
                  <span class="label">Service:</span> ${serviceName}
                </div>
                <div class="detail-row">
                  <span class="label">Date:</span> ${formattedDate}
                </div>
                <div class="detail-row">
                  <span class="label">Time:</span> ${booking.time}
                </div>
                <div class="detail-row">
                  <span class="label">Duration:</span> ${booking.duration} minutes
                </div>
              </div>
              
              <h3 style="color: #4a7c4a;">What to Bring</h3>
              <ul>
                <li>Comfortable riding clothes</li>
                <li>Closed-toe shoes with a small heel (riding boots preferred)</li>
                <li>ASTM/SEI approved riding helmet (we have spares if needed)</li>
                <li>Water bottle</li>
              </ul>
              
              <h3 style="color: #4a7c4a;">Cancellation Policy</h3>
              <p style="font-size: 14px; color: #666;">
                Please provide at least 24 hours notice for cancellations. 
                Late cancellations or no-shows may incur a fee.
              </p>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>We look forward to seeing you!</p>
              <p>
                <strong>Lucie Hill</strong><br>
                Lucie Hill Equestrian
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0;">
                📍 152 Bay Rd, Mount Gambier, SA 5290<br>
                📞 <a href="tel:+61413417915">+61 413 417 915</a><br>
                ✉️ <a href="mailto:hill.lucie@gmail.com">hill.lucie@gmail.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('Booking emails sent successfully for:', booking.id);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Confirmation emails sent successfully' 
      })
    };
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to send confirmation email',
        details: error.message 
      })
    };
  }
};
