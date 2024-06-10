
export function formatDate(date: Date): string {
    return Intl.DateTimeFormat('es-AR',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date);
}

export function formatDateLong(date: Date): string {
    return Intl.DateTimeFormat('es-AR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function formatHour(date: Date): string {
    return Intl.DateTimeFormat('es-AR', {
        hour: "numeric",
        minute: "numeric"
    }).format(date);
}

export default formatDate;