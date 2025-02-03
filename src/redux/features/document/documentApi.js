import network from '../../../services/network';

// API to create a document
export const createDocumentApi = async (documentData,token) => {
    try {  
        
        console.log(documentData)
        const response = await network.post(
           
            '/upload-pdf',
            documentData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create document');
    }
};

// API to list documents by username
export const listDocumentsApi = async (token) => {
    try {
        const response = await network.get(
            '/documents',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
};

// API to delete a document by ID
export const deleteDocumentApi = async (filename,token) => {
    try {
        const response = await network.post(
            `/delete-doc`, 
            {
                file_name:filename,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete document');
    }
};
