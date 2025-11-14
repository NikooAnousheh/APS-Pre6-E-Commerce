import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db('ecommerce');
    const contacts = database.collection('contacts');
    
    const body = await request.json();
    const result = await contacts.insertOne({
      ...body,
      createdAt: new Date()
    });
    
    return Response.json({ success: true, id: result.insertedId });
  } finally {
    await client.close();
  }
}