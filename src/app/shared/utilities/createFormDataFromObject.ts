export function createFormDataFromObject(object: any): FormData {
    const formData = new FormData();

    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            const value = object[property];

            if (value instanceof Date) {
                formData.append(property, value.toISOString());
            } else if (value instanceof File && value !== null) {
                formData.append(property, value);
            } else if (value !== undefined && value !== null) {
                formData.append(property, value.toString());
            } else {
                formData.append(property, ''); // Handle null values
            }
        }
    }

    return formData;
}
