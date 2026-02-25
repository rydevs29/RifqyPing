// api/doh.js
export default async function handler(req, res) {
    const targetDomain = req.query.domain || 'google.com';
    const dohUrl = `https://cloudflare-dns.com/dns-query?name=${targetDomain}&type=A`;

    try {
        const response = await fetch(dohUrl, {
            headers: { 'Accept': 'application/dns-json' }
        });
        const data = await response.json();
        
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        res.status(200).json({
            status: 'success',
            domain: targetDomain,
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: 'DoH request failed' });
    }
}
