export default function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Menghitung besar byte untuk fitur MTU tester
    const payloadSize = req.body ? Buffer.byteLength(req.body, 'utf8') : 0;

    res.status(200).json({ 
        status: 'ok', 
        time: Date.now(),
        echo_size: payloadSize
    });
}
