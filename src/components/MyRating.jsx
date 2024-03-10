import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DataContext from '../contexts';
import Cookies from "js-cookie";
import DataContext2 from '../contexts/index2';

export default function MyRating({ item }) {
    const { logOut, setMessage } = useContext(DataContext)
    const { setOriginalData} = useContext(DataContext2)

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
            
                        'authorization': localStorage.getItem('Authorization') || ''
                    }
                })
                if (!response.ok) {
                    if (response.status == 401) {
                        setMessage(["פעולת הדירוג לא הצליחה", false])
                        logOut()
                    }
                    if (response.status == 404) {
                        setMessage(["דירוג כפול נחסם", false])
                        return
            
                    }

                    setMessage(["פעולת הדירוג לא הצליחה", false])
                    // throw new Error(`Failed to update rating! Status: ${response.status}`);
                }
                const editedPost = await response.json();
                setMessage(["דירוג בוצע בהצלחה", true])
                setOriginalData(prevOriginalData => {
                    const updatedOriginalData = [...prevOriginalData].map(obj => {
                        if (obj.id === item.id) {
                            return { ...obj, rating: editedPost.rating };
                        }
                        return obj;
                    });
                    return updatedOriginalData;
                });
            
            }
            catch (error) {
                setMessage(["שגיאה" + error.message, false]);
                console.error(error.message);
            }
    
        }


    return (
        <Stack spacing={1}>
            <Rating name="half-rating" value={parseFloat(item.rating)} defaultValue={0.0} precision={0.5} onChange={updateRating} />
        </Stack>
    )
}
