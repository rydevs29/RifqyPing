// api/geo.js
export default function handler(req, res) {
    // Mengambil data dari Vercel Edge Headers
    const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
    const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
    const vercelRegion = req.headers['x-vercel-id'] || 'Local Dev';

    res.status(200).json({
        ip: ip,
        city: decodeURIComponent(city),
        country: country,
        vercelRegion: vercelRegion.split(':')[0] // Mengambil kode region, misal 'sin1'
    });
}
