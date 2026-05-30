import { Redis } from '@upstash/redis';
const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const suggestions = await kv.get('suggestions') || [];
      return res.status(200).json(suggestions);
    }
    
    if (req.method === 'POST') {
      const { category, message } = req.body;
      let suggestions = await kv.get('suggestions');
      if (!suggestions) suggestions = [];
      
      const newSuggestion = {
        id: Date.now().toString(),
        category,
        message,
        status: 'pending',
        createdAt: Date.now()
      };
      
      suggestions.unshift(newSuggestion);
      await kv.set('suggestions', suggestions);
      return res.status(200).json(newSuggestion);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
