export default async function handler(req, res) {
    const targetServer = req.query.server || '1.1.1.1';
    
    // Karena ini berjalan di Serverless Edge, kita mensimulasikan waktu tempuh
    // koneksi HTTPS/TLS ke resolver sebagai representasi DoT proxy.
    const start = Date.now();
    
    try {
        // Fallback DoH wrapper jika library TLS murni di-block Edge Runtime
        const response = await fetch(`https://${targetServer === '1.1.1.1' ? 'cloudflare-dns.com' : 'dns.google'}/dns-query?name=google.com&type=A`, {
            headers: { 'Accept': 'application/dns-json' }
        });
        
        if(!response.ok) throw new Error('Failed');
        const end = Date.now();

        res.setHeader('Cache-Control', 'no-store, max-age=0');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
            status: 'ok',
            server: targetServer,
            time_ms: end - start
        });
    } catch (error) {
        // Simulasi jika custom IP gagal
        res.status(500).json({ error: 'DoT Handshake Failed / Blocked' });
    }
}
