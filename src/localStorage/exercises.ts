// img upload state?

export const saveImageToIndexedDB = async (id: string, imageBlob: File): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            if (event.target !== null) {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore("images", { keyPath: "id" });
            }
        };

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction(["images"], "readwrite");
            const store = transaction.objectStore("images");
            const addRequest = store.put({ id, image: imageBlob });

            addRequest.onsuccess = () => resolve();
            addRequest.onerror = () => reject(addRequest.error);
        };

        request.onerror = (event: Event) => reject((event.target as IDBOpenDBRequest).error);
    });
};

export const getImageFromIndexedDB = async (id: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MyDatabase", 1);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction(["images"], "readonly");
            const store = transaction.objectStore("images");
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resolve(getRequest.result.image);
                } else {
                    reject("No image found with id " + id);
                }
            };
            getRequest.onerror = () => reject(getRequest.error);
        };

        request.onerror = (event: Event) => reject((event.target as IDBOpenDBRequest).error);
    });
};
