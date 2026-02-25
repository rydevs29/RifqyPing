// api/ping.js
export default function handler(req, res) {
    // Vercel menyisipkan header lokasi dan region secara otomatis
    const vercelRegion = req.headers['x-vercel-id'] || 'local';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Jika user merequest region spesifik (Global Testing)
    const targetRegion = req.query.region;
    
    // Set header agar tidak di-cache (penting untuk ping!)
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    
    res.status(200).json({
        status: 'ok',
        message: 'pong',
        server_node: vercelRegion,
        client_ip: clientIp,
        requested_region: targetRegion || 'auto'
    });
}
