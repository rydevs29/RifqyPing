export default function handler(req, res) {
    const city = req.headers['x-vercel-ip-city'] || 'Unknown';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
    const vercelRegion = req.headers['x-vercel-id'] ? req.headers['x-vercel-id'].split(':')[0] : 'Local';

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({
        ip: ip,
        city: decodeURIComponent(city),
        country: country,
        vercelRegion: vercelRegion
    });
}
