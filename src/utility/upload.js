import {
    create_file, slice_upload
} from '../api'

export default class SliceUpload {
    
    chunkCounter = 0;
    chunkSize = 1000000;
    numberofChunks = 0;
    file = null;
    // reader = new FileReader();
    ext = null;
    filename = null;
    newfilename = null;
    fileurl = null;

    message = null;
    status = null;

    constructor(args) {
        this.file = args?.file;
        
        this.filename = this.file?.name ? this.file.name : null;

        if(!this.filename) return;

        this.ext = this.filename.split('.').pop();
        this.numberofChunks = Math.ceil(this.file.size/this.chunkSize);

        if(!args?.createFileUrl || !args?.createFileFunc) {
            this.createFileFunc = create_file;
        }

        if(!args?.uploadFileUrl || !args?.uploadFileFunc) {
            this.uploadFileFunc = slice_upload;
        }
    }

    getExt() {
        return this.ext;
    }

    createFile() {
    }

    async upload () {
        const createFile = await create_file(this.ext);

        if(createFile.error) {
            this.status = 'error';
            this.message = createFile.message;
            return false;
        }

        this.newfilename = createFile.name;
        let done = false,
            start = 0;

        while(!done) {
            let reader = new FileReader();

            this.chunkCounter++;
            let chunkEnd = Math.min(start + this.chunkSize, file.size);
            const chunk = file.slice(start, chunkEnd);
            const chunkForm = new FormData();

            reader.onloadend = (event) => {
                if(event.target.readyState !== FileReader.DONE) return;
                chunkForm.append('file', event.target.result);
                chunkForm.append('name', this.newfilename);
                
                var oReq = new XMLHttpRequest();

                oReq.open('POST', )
            }

            reader.readAsDataURL(chunk);
        }
    }
}

// let chunkCounter = 0,
//     chunkSize = 1000000,
//     numberofChunks = 0,
//     file = null,
//     reader = null;

// const sliceUpload = async (files) => {
    
//     let filename = files?.name;
//         if(!filename) return false;

//     let ext = filename.split('.').pop();

//     const  { result, error, message } = create_file({
//         'ext': ext
//     });

//     if(error) {
//         console.log('sliceUpload Error:', message);
//         return false;
//     }

//     filename = result.name;

//     numberofChunks = Math.ceil(file.size / chunkSize);
//     reader = new FileReader();
//     file = files;

//     createChunk(0);

//     return false;
// }