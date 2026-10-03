// Manejo del token JWT en sessionStorage y protección de rutas en el cliente
const TOKEN_KEY = 'token';

const Auth = {
    getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    },

    setToken(token) {
        sessionStorage.setItem(TOKEN_KEY, token);
    },

    // Decodifica el payload del JWT (no verifica la firma, eso lo hace el servidor)
    getPayload() {
        const token = this.getToken();
        if (!token) return null;
        try {
            const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(decodeURIComponent(escape(atob(base64))));
        } catch {
            return null;
        }
    },

    isExpired(payload) {
        return !payload || !payload.exp || payload.exp * 1000 <= Date.now();
    },

    roles() {
        return this.getPayload()?.roles ?? [];
    },

    isAdmin() {
        return this.roles().includes('admin');
    },

    logout(reason) {
        sessionStorage.removeItem(TOKEN_KEY);
        const q = reason ? `?reason=${reason}` : '';
        window.location.replace(`/signIn${q}`);
    },

    homePath() {
        return this.isAdmin() ? '/admin' : '/dashboard';
    },

    // guard: 'guest' | 'auth' | 'admin'
    guard(type) {
        const payload = this.getPayload();
        const valid = payload && !this.isExpired(payload);

        if (type === 'guest') {
            if (valid) window.location.replace(this.homePath());
            return;
        }
        if (!payload) return this.logout();
        if (!valid) return this.logout('expired');
        if (type === 'admin' && !this.isAdmin()) return window.location.replace('/403');

        // Cierra sesión automáticamente cuando el token caduque
        const ms = payload.exp * 1000 - Date.now();
        setTimeout(() => this.logout('expired'), ms);
    },

    // fetch con el token; si el servidor responde 401 se cierra la sesión
    async api(url, options = {}) {
        const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
        const token = this.getToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(url, { ...options, headers });
        const data = await res.json().catch(() => ({}));

        if (res.status === 401 && token) this.logout('expired');
        if (res.status === 403) window.location.replace('/403');
        if (!res.ok) throw new Error(data.message || 'Error en la petición');
        return data;
    }
};

const Fmt = {
    date(d) {
        return d ? new Date(d).toLocaleDateString('es-PE', { timeZone: 'UTC' }) : '—';
    },
    dateTime(d) {
        return d ? new Date(d).toLocaleString('es-PE') : '—';
    },
    // Foto de perfil o, si no tiene, un avatar con sus iniciales
    avatar(u) {
        if (u.url_profile) return u.url_profile;
        const initials = `${u.name?.[0] ?? ''}${u.lastName?.[0] ?? ''}`.toUpperCase();
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#3949ab"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial" font-size="38" fill="#fff">${initials}</text></svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    },
    esc(s) {
        return String(s ?? '—').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
};

// Navbar según el rol del usuario logueado
document.addEventListener('DOMContentLoaded', () => {
    const payload = Auth.getPayload();
    const logged = payload && !Auth.isExpired(payload);
    document.querySelectorAll('[data-show="auth"]').forEach(el => el.style.display = logged ? '' : 'none');
    document.querySelectorAll('[data-show="guest"]').forEach(el => el.style.display = logged ? 'none' : '');
    document.querySelectorAll('[data-show="admin"]').forEach(el => el.style.display = logged && Auth.isAdmin() ? '' : 'none');
    document.querySelectorAll('[data-action="logout"]').forEach(el => el.addEventListener('click', e => {
        e.preventDefault();
        Auth.logout();
    }));
    M.AutoInit();
});
