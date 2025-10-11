// src/utils/jwt.ts
export function decodeJwtPayload(token: string | null) {
    if (!token) return null;
    try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(json);
    } catch (e) {
        // فشل فك التوكن — ليس خطأ قاتل، فقط نرجع null
        console.warn("decodeJwtPayload failed:", e);
        return null;
    }
}
