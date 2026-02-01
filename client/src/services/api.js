// Use relative path so it works in production (served by node) and dev (via vite proxy)
const API_BASE = '/api';

export const api = {
    getTrending: (page = 1) => fetch(`${API_BASE}?action=trending&page=${page}`).then(r => r.json()),

    getMovies: (page = 1) => fetch(`${API_BASE}?action=indonesian-movies&page=${page}`).then(r => r.json()),

    getSeries: (page = 1) => fetch(`${API_BASE}?action=indonesian-drama&page=${page}`).then(r => r.json()),

    getAnime: (page = 1) => fetch(`${API_BASE}?action=anime&page=${page}`).then(r => r.json()),

    getKDrama: (page = 1) => fetch(`${API_BASE}?action=kdrama&page=${page}`).then(r => r.json()),

    search: (query) => fetch(`${API_BASE}?action=search&q=${encodeURIComponent(query)}`).then(r => r.json()),

    getDetail: (path) => fetch(`${API_BASE}?action=detail&detailPath=${path}`).then(r => r.json())
};
