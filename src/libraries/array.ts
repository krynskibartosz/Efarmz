interface Element {
    id: string;
}

export const removeElementById = (array: Element[], id: string) => {
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
        array.splice(index, 1);
    }
};
