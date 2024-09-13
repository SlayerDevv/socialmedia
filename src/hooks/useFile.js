import axios from 'axios'
export const useFile = () => {
    const uploadFile = async(formData,token) => {
        try {

            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/files/save`, formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                  //  'Content-Type': 'multipart/form-data',
                }
            })
 
            return data;
        }catch (err) {
            throw new Error('Error uploading file');
        }
    }
    return { uploadFile }
}