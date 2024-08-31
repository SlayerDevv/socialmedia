
export const useFile = () => {
    const uploadFile = async(formData, token) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/files/save`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: formData,
            })
            const data = await res.json();
            return data;
        }catch (err) {
            throw new Error('Error uploading file');
        }
    }
    return { uploadFile }
}