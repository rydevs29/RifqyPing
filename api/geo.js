export default function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
        ip: req.headers['x-forwarded-for'] || 'Unknown',
        city: decodeURIComponent(req.headers['x-vercel-ip-city'] || 'Unknown ISP/City'),
        country: req.headers['x-vercel-ip-country'] || 'Unknown',
        node: req.headers['x-vercel-id'] || 'Local/Unknown'
    });
}
