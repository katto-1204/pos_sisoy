import { query } from '@/lib/db.js';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');

    if (action === 'list') {
      const results = await query('SELECT * FROM accommodations WHERE status = "active" ORDER BY name ASC');
      return Response.json({ data: results });
    }

    if (action === 'get') {
      const id = searchParams.get('id');
      const results = await query('SELECT * FROM accommodations WHERE id = ?', [parseInt(id || '0')]);

      if (!results.length) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      return Response.json(results[0]);
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Accommodation error:', error);
    return Response.json({ error: 'Failed to fetch accommodations: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');

    if (action === 'create') {
      const body = await request.json();

      const results = await query(
        `INSERT INTO accommodations (name, type, capacity, price_per_night, description, status) 
         VALUES (?, ?, ?, ?, ?, 'active')`,
        [
          body.name || '',
          body.type || 'Room',
          parseInt(body.capacity || '2'),
          parseFloat(body.price_per_night || '0'),
          body.description || '',
        ]
      );

      // Fetch the newly created accommodation
      const newAccommodation = await query(
        'SELECT * FROM accommodations WHERE id = ?',
        [results.insertId]
      );

      return Response.json({ 
        success: true, 
        id: results.insertId,
        ...newAccommodation[0] 
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Accommodation create error:', error);
    return Response.json({ error: 'Failed to create accommodation: ' + error.message }, { status: 500 });
  }
}
