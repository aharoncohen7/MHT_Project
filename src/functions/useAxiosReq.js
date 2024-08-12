import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from "js-cookie";

// בקשת שרת גנרית
export const axiosReq = async ({ method = 'POST', body, url }) => {
    try {
       // axios.defaults.baseURL = 'http://localhost:4000/api/'
       console.log('api req 😘 \n', { url, method, body })
       const { data: result } = await axios({
          baseURL: 'https://vortly-db.onrender.com/api/',
          method,
          data: body || {},
          url,
          headers: {
             Authorization: Cookies.get('Authorization') || ''
          }
       })
       console.log('api req result 🐱 \n', { result })
       return result;
    } catch (error) {
       console.log('api error 🤢 \n', { error })
       throw  error.message || 'something went wrong'
    }
 }




export default function useAxiosReq({ defaultVal, method, url, body }) {
    const [data, setData] = useState(defaultVal)
    // טעינה בעת המתנה למידע
    const [loading, setLoading] = useState(false)
    // שגיאה
    const [error, setError] = useState('')

    // בקשת מידע
    const fetchData = async () => {
        // התחלת אפקט טעינה
        setLoading(true)
        try {
            const result = await axiosReq({ method, url, body })
            setData(result)
        } catch (e) {
            setError(e)
        } finally {

            // הפסקת אפקט טעינה
            setLoading(false)

        }
    }

    // הפעלת קריאה
    useEffect(() => {
        // setTimeout(() => {
            fetchData()
        // }, [1000])
    }, [])

    return { data, loading, error, fetchData }
}
