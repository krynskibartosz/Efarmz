export const transformDateStringtoReadableDate = (
    dateString: string
): string => {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Use the toLocaleDateString method to get a readable date string
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
    };
    // @ts-ignore
    const readableDate = date.toLocaleDateString('fr-FR', dateOptions);

    // Use the toLocaleTimeString method to get a readable time string
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    // @ts-ignore
    const readableTime = date.toLocaleTimeString('fr-FR', timeOptions);

    return `${readableDate}`;
};
