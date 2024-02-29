import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DataContext from '../../contexts';

export default function PostRating({ item }) {
    const { filteredData, setOriginalData, setFilteredData, logOut, message, setMessage } = useContext(DataContext)

   

        // דירוג פוסט
        async function updateRating(event) {
            const newRating = event.target.value;
            console.log(newRating);
            try {
                const response = await fetch(`http://localhost:4002/api/posts/rating/${item.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        newRating,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'auth': localStorage.getItem('auth') || '',
                        'authorization': localStorage.getItem('Authorization') || ''
                    }
                })
                if (!response.ok) {
                    if (response.status == 401) {
                        logOut()
                    }
                    alert("Failed to update rating")
                    throw new Error(`Failed to update rating! Status: ${response.status}`);
                }
                const editedPost = await response.json();
                alert("The rating is update")
                setOriginalData(prevOriginalData => {
                    const updatedData = [...prevOriginalData].map(obj => {
                        if (obj.id === item.id) {
                            return { ...obj, rating: editedPost.rating };
                        }
                        return obj;
                    });
                    return updatedData;
                });
                setFilteredData(prevFilteredData => {
                    const updatedData2 = [...prevFilteredData].map(obj => {
                        if (obj.id === item.id) {
                            return { ...obj, rating: editedPost.rating };
                        }
                        return obj;
                    });
                    return updatedData2;
                });
            }
            catch (error) {
                console.error(error.message);
            }
    
        }


    return (
        <Stack spacing={1}>
            <Rating name="half-rating" value={item.rating} defaultValue={0.0} precision={0.5} onChange={updateRating} />
        </Stack>
    )
}
