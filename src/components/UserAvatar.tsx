
type Props = {
  size?: number;
  className?: string;
  onClick?: () => void;
};

function getInitials(name?: string | null) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    // أول حرفين من الكلمة
    return parts[0].slice(0, 2).toUpperCase();
  } else {
    // أول حرف من الكلمتين الأوليين
    const a = parts[0][0] || "";
    const b = parts[1][0] || "";
    return (a + b).toUpperCase();
  }
}

export default function UserAvatar({ size = 36, className = "", onClick }: Props) {
  const rawName = typeof window !== "undefined" ? localStorage.getItem("user_name") : null;
  const initials = getInitials(rawName ?? undefined);

  if (!initials) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 ${className}`}
        aria-hidden
        onClick={onClick}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-full bg-brown70 text-black06 font-semibold select-none ${className}`}
      aria-hidden
    >
      <span style={{ fontSize: Math.floor(size * 0.42) }}>{initials}</span>
    </div>
  );
}
