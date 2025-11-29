import { query } from '@/lib/db.js';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');

    if (action === 'list') {
      const results = await query('SELECT * FROM customers ORDER BY created_at DESC');
      return Response.json({ data: results });
    }

    if (action === 'search') {
      const term = searchParams.get('term') || '';
      if (term.length < 2) {
        return Response.json({ data: [] });
      }

      const searchTerm = `%${term}%`;
      const results = await query(
        `SELECT * FROM customers 
         WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?
         LIMIT 10`,
        [searchTerm, searchTerm, searchTerm, searchTerm]
      );

      return Response.json({ data: results });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Customer error:', error);
    return Response.json({ error: 'Failed to fetch customers: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get('action');

    if (action === 'create') {
      const body = await request.json();

      const results = await query(
        `INSERT INTO customers (first_name, last_name, email, phone, address) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          body.first_name || '',
          body.last_name || '',
          body.email || '',
          body.phone || '',
          body.address || '',
        ]
      );

      // Fetch the newly created customer
      const newCustomer = await query(
        'SELECT * FROM customers WHERE id = ?',
        [results.insertId]
      );

      return Response.json({ 
        success: true, 
        id: results.insertId,
        ...newCustomer[0] 
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Customer create error:', error);
    return Response.json({ error: 'Failed to create customer: ' + error.message }, { status: 500 });
  }
}
