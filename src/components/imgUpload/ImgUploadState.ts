import { makeAutoObservable, observable, action } from 'mobx';

export class ImageUploadState {
    @observable public imageFile: File | null = null;
    @observable public imgUrl: string | null = null;
    @observable public isUploading: boolean = false;
    @observable public errorMessage: string = "";

    constructor() {
        makeAutoObservable(this);
    }


    @action public  setImageFile(file: File | null) {
        this.imageFile = file;
        if (file) {
            this.imgUrl = URL.createObjectURL(file);
        } else {
            this.imgUrl = null;
        }
    }

    @action public onSave = () => {
        console.log(this.imageFile)
        // this.uploadImage();
    }

    async uploadImageToAzure() {
        if (!this.imageFile) {
            this.errorMessage = "No image file selected.";
            return;
        }

        this.isUploading = true;
        this.errorMessage = "";

        try {
            const formData = new FormData();
            formData.append('file', this.imageFile);

            const response = await fetch('http://your-nodejs-server.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Server responded with an error!');
            }

            const data = await response.json();
            this.imgUrl = data.fileUrl;
        } catch (error) {
            this.errorMessage = "Image upload failed";
        } finally {
            this.isUploading = false;
        }
    }


//     async uploadImageToAzure() {
//         if (!this.imageFile) {
//             this.errorMessage = "No image file selected.";
//             return;
//         }

//         this.isUploading = true;
//         this.errorMessage = "";

//         try {
//             // Azure Storage Account connection string
//             const connectionString = "YOUR_AZURE_STORAGE_CONNECTION_STRING";
//             const containerName = "YOUR_CONTAINER_NAME";
//             const blobName = this.imageFile.name; // You might want to create a unique name
//             const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//             const containerClient = blobServiceClient.getContainerClient(containerName);

//             // Create a block blob client
//             const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//             // Upload the file
//             await blockBlobClient.uploadData(this.imageFile);

//             // Set imgUrl to the URL of the uploaded image
//             this.imgUrl = blockBlobClient.url;

//         } catch (error) {
//             this.errorMessage = "Image upload failed";
//         } finally {
//             this.isUploading = false;
//         }
// }

    // @action public async uploadImage() {
    //     // upload img here
    //     if (!this.imageFile) {
    //         this.errorMessage = "No image file selected.";
    //         return;
    //     }

    //     this.isUploading = true;
    //     this.errorMessage = "";

    //     try {
    //         // await this.mockUpload(this.imageFile);
    //         console.log(this.imageFile)
    //     } catch (error) {
    //         this.errorMessage = "Image upload failed";
    //     } finally {
    //         this.isUploading = false;
    //     }
    // }
}
