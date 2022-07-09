export const formatDateTime = (dateTime: Date) =>
    dateTime.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    })
