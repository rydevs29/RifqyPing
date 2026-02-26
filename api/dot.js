export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let server = req.query.server || 'dns.google';
    
    // Perbaikan format URL otomatis (karena DoH butuh path /dns-query)
    let fetchUrl = `https://${server}/dns-query?name=google.com&type=A`;
    if(server === '1.1.1.1' || server === '1.0.0.1') fetchUrl = `https://cloudflare-dns.com/dns-query?name=google.com&type=A`;

    const start = Date.now();
    try {
        const response = await fetch(fetchUrl, {
            headers: { 'Accept': 'application/dns-json' },
            method: 'GET'
        });
        
        if(!response.ok) throw new Error('Not OK');
        const end = Date.now();
        res.status(200).json({ latency: end - start, server: server });
    } catch (e) {
        res.status(500).json({ error: 'Handshake timeout or blocked', server: server });
    }
}
