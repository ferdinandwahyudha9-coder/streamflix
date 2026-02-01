import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5500; // Changed to 5500

// Enable CORS untuk semua origin
app.use(cors());

// Serve static files first
app.use(express.static('client/dist'));
// Fallback for legacy files
app.use(express.static('.'));

// Proxy endpoint
app.get('/api', async (req, res) => {
    try {
        const apiPath = req.path.replace('/api', '');
        // Construct the new URL preserving the query string
        // The client will request /api?action=... which maps to /api.php?action=...

        // We need to handle how the client sends requests.
        // If client sends /api?action=trending, req.url is /api?action=trending
        // We want to forward query params to https://zeldvorik.ru/apiv3/api.php

        const baseUrl = 'https://zeldvorik.ru/apiv3/api.php';
        // req.query contains the parsed query parameters

        const queryString = new URLSearchParams(req.query).toString();
        const apiUrl = `${baseUrl}?${queryString}`;

        console.log('Proxying request to:', apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Wildcard route for SPA - Must be last
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'client/dist' });
});

app.listen(PORT, () => {
    console.log(`\n✅ Server running at http://localhost:${PORT}`);
    console.log(`📺 Open http://localhost:${PORT}/streamflix-complete.html in your browser\n`);
});
