import { Redis } from '@upstash/redis';
const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'PATCH') {
      const { status } = req.body;
      let suggestions = await kv.get('suggestions');
      if (!suggestions) suggestions = [];

      const index = suggestions.findIndex(s => s.id === id);
      if (index !== -1) {
        suggestions[index].status = status;
        await kv.set('suggestions', suggestions);
        return res.status(200).json(suggestions[index]);
      }
      return res.status(404).json({ error: 'Not found' });
    }
    
    if (req.method === 'DELETE') {
      let suggestions = await kv.get('suggestions');
      if (!suggestions) suggestions = [];

      suggestions = suggestions.filter(s => s.id !== id);
      await kv.set('suggestions', suggestions);
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
