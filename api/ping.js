export default function handler(req, res) {
    const vercelRegion = req.headers['x-vercel-id'] || 'local';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const requestedRegion = req.query.region || 'auto';

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({
        status: 'success',
        node: vercelRegion,
        ip: clientIp,
        target: requestedRegion
    });
        }
