export const transformDateStringtoReadableDate = (
    dateString: string
): string => {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    const readableDate = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Use the toLocaleTimeString method to get a readable time string
    // const timeOptions = {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric',
    // };

    // const readableTime = date.toLocaleTimeString('fr-FR', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric',
    // });

    return `${readableDate}`;
};
