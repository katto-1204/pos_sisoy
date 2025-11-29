import { query } from '@/lib/db.js';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');

    if (action === 'list') {
      const results = await query(`
        SELECT b.*, c.first_name, c.last_name, a.name as accommodation_name 
        FROM bookings b
        LEFT JOIN customers c ON b.customer_id = c.id
        LEFT JOIN accommodations a ON b.accommodation_id = a.id
        ORDER BY b.created_at DESC
      `);
      return Response.json({ data: results });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Booking fetch error:', error);
    return Response.json({ error: 'Failed to fetch bookings: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');
    
    if (action === 'create') {
      const body = await request.json();
      
      // Validate required fields (accommodation_id may be non-numeric from legacy/local storage)
      const required = ['customer_id', 'accommodation_id', 'check_in', 'check_out', 'guests', 'total_price'];
      for (const field of required) {
        if (!body[field]) {
          return Response.json({ error: `${field} is required` }, { status: 400 });
        }
      }

      // Generate booking number
      const bookingNumber = `BK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Resolve accommodation_id: allow numeric id or resolve by accommodation_name for legacy/local ids
      let accommodationId = parseInt(body.accommodation_id)
      if (isNaN(accommodationId)) {
        if (body.accommodation_name) {
          const acc = await query('SELECT id FROM accommodations WHERE name = ? LIMIT 1', [body.accommodation_name])
          if (acc && acc.length > 0) {
            accommodationId = acc[0].id
          }
        }
      }

      if (isNaN(accommodationId)) {
        return Response.json({ error: 'Invalid accommodation id' }, { status: 400 })
      }

      const customerId = parseInt(body.customer_id)
      if (isNaN(customerId)) {
        return Response.json({ error: 'Invalid customer id' }, { status: 400 })
      }

      const results = await query(
        `INSERT INTO bookings (booking_number, customer_id, accommodation_id, check_in, check_out, guests, total_price, status, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)`,
        [
          bookingNumber,
          customerId,
          accommodationId,
          body.check_in,
          body.check_out,
          parseInt(body.guests),
          parseFloat(body.total_price),
          body.notes || '',
        ]
      );
      const bookingId = results.insertId

      // Fetch the newly created booking
      const newBooking = await query(
        `SELECT b.*, c.first_name, c.last_name, a.name as accommodation_name 
         FROM bookings b
         LEFT JOIN customers c ON b.customer_id = c.id
         LEFT JOIN accommodations a ON b.accommodation_id = a.id
         WHERE b.id = ?`,
        [results.insertId]
      );

      return Response.json({
        success: true,
        id: results.insertId,
        booking_number: bookingNumber,
        ...newBooking[0],
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ error: 'Failed to create booking: ' + error.message }, { status: 500 });
  }
}
