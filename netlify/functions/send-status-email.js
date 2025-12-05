const { Resend } = require('resend');

/**
 * Netlify Function to send booking status update emails
 * Triggered when admin confirms, completes, or cancels a booking
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Email service not configured' }) };
  }

  try {
    const { booking, newStatus } = JSON.parse(event.body);
    
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

    let subject, statusMessage, statusColor, statusIcon;

    switch (newStatus) {
      case 'confirmed':
        subject = `✅ Booking Confirmed - ${serviceName} on ${formattedDate}`;
        statusMessage = 'Great news! Your booking has been confirmed.';
        statusColor = '#22c55e';
        statusIcon = '✅';
        break;
      case 'completed':
        subject = `🎉 Thank You - ${serviceName} Completed`;
        statusMessage = 'Thank you for visiting Lucie Hill Equestrian! We hope you enjoyed your session.';
        statusColor = '#3b82f6';
        statusIcon = '🎉';
        break;
      case 'cancelled':
        subject = `❌ Booking Cancelled - ${serviceName} on ${formattedDate}`;
        statusMessage = 'Unfortunately, your booking has been cancelled. Please contact us if you have any questions or would like to reschedule.';
        statusColor = '#ef4444';
        statusIcon = '❌';
        break;
      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid status' }) };
    }

    // Send status update email to client
    await resend.emails.send({
      from: 'Lucie Hill Equestrian <bookings@resend.dev>',
      to: booking.email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4a7c4a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; }
            .status-box { background: ${statusColor}15; border: 2px solid ${statusColor}; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .status-text { color: ${statusColor}; font-size: 18px; font-weight: bold; }
            .booking-box { background: #f5f1e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { padding: 8px 0; }
            .label { font-weight: bold; color: #4a7c4a; }
            .footer { background: #4a7c4a; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
            .footer a { color: #f5f1e8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Lucie Hill Equestrian</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Booking Update</p>
            </div>
            <div class="content">
              <p>Dear ${booking.firstName},</p>
              
              <div class="status-box">
                <span style="font-size: 32px;">${statusIcon}</span>
                <p class="status-text">Booking ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</p>
                <p style="margin: 0; color: #666;">${statusMessage}</p>
              </div>
              
              <div class="booking-box">
                <h3 style="margin-top: 0; color: #4a7c4a;">Booking Details</h3>
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
              
              ${newStatus === 'confirmed' ? `
              <h3 style="color: #4a7c4a;">What to Bring</h3>
              <ul>
                <li>Comfortable riding clothes</li>
                <li>Closed-toe shoes with a small heel (riding boots preferred)</li>
                <li>ASTM/SEI approved riding helmet (we have spares if needed)</li>
                <li>Water bottle</li>
              </ul>
              
              <h3 style="color: #4a7c4a;">Reminder</h3>
              <p>Please arrive 10-15 minutes before your scheduled time to get settled.</p>
              ` : ''}
              
              ${newStatus === 'completed' ? `
              <h3 style="color: #4a7c4a;">We'd Love Your Feedback!</h3>
              <p>If you enjoyed your session, please consider leaving us a review. Your feedback helps us improve and helps other riders find us!</p>
              ` : ''}
              
              ${newStatus === 'cancelled' ? `
              <h3 style="color: #4a7c4a;">Need to Reschedule?</h3>
              <p>You can book a new session anytime at our website or give us a call.</p>
              ` : ''}
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>
                Best regards,<br>
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

    console.log(`Status update email sent for booking ${booking.id}: ${newStatus}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Status update email sent' })
    };
    
  } catch (error) {
    console.error('Error sending status email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message })
    };
  }
};
