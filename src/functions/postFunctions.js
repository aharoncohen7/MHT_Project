import Swal from 'sweetalert2';
import Cookies from "js-cookie";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


//פוסט חדש
export async function importedAddNew(userId, selectedBook, selectedPortion, title, body, tags, setOriginalData, setMessage, setSend, setShowEditor, logOut, navigate) {
  
  try {
    const response = await fetch(`${SERVER_HOST}/posts`, {
      method: 'POST',
      body: JSON.stringify({
        selectedBook,
        selectedPortion,
        title,
        body,
        userId,
        ...(tags.length > 0 && { tags }),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        // 'authorization': localStorage.getItem('Authorization') || ''
        'authorization': Cookies.get('Authorization') || ''
      },
    });
    console.log(response);
    if (response.status === 400 || response.status === 404) {
      console.log("400/404");
      const errorMessage = await response.text();
      console.log('Post not created' + errorMessage);
      setMessage(['Post not created ' + errorMessage, false]);
      // alert('Post not created ' + errorMessage)
      setSend(false)
      setShowEditor(false)
      if (response.status == 401) {
        logOut()
        return
      }
      throw new Error(`Failed to create post! Status: ${response.status}`);
    }
    const newPost = await response.json();
    console.log(newPost);
    setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
    setMessage(['Post created successfully', true]);
    setSend(false)
    setShowEditor(false);
    // navigate(`/post/${newPost.id}`)
    window.location.href = `/post/${newPost.id}`


  }
  catch (error) {
    console.error(error.message);
  }
}




// עריכה
export async function importedEdit(postId, selectedBook, selectedPortion, title, body, tags, setOriginalData, setMessage, setSend, setShowEditor, logOut, navigate) {
  try {
    
    const response = await fetch(`${SERVER_HOST}/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        selectedBook,
        selectedPortion,
        title,
        body,
        ...(tags.length > 0 && { tags }),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        // 'authorization': localStorage.getItem('Authorization') || ''
        'authorization': Cookies.get('Authorization') || ''
      },
    });
    console.log(response);
    if (response.status === 400 || response.status === 404) {
      console.log("400/404");
      const errorMessage = await response.text();
      console.log(['Post not updated' + errorMessage, false]);
      setMessage(['Post not updated ' + errorMessage, false])
      setSend(false)
      setShowEditor(false)
      // window.location.href = `/post/${postId}`
      navigate(`/post/${postId}`)
      
      throw new Error(`Failed to update post! Status: ${response.status}`);
    }
    if (response.status == 401) {
      setMessage(['Post not updated', false])
      logOut()
      return
    }

    const newPost = await response.json();
    setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
    setMessage(['Post updated successfully', true]);
    setSend(false)
    setShowEditor(false)
    // navigate(`/post/${postId}`)
    // window.location.href = `https://vortly.onrender.com/post/${postId}`
    window.location.href = `/post/${postId}`

  }
  catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
}


// מחיקה
export async function importedDelete(item, setOriginalData, setMessage, logOut, navigate) {
  // console.log(item);
  try {
    let response = await fetch(`${SERVER_HOST}/posts/delete-single/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',

        // 'authorization': localStorage.getItem('Authorization') || ''
        'authorization': Cookies.get('Authorization') || ''
      },
    });
    if (!response.ok) {
      console.log("problem deleting post");
      throw new Error(`Failed to delete post! Status: ${response.status}`);
    }
    if (response.status == 401) {
      setMessage(['Post not deleted', false])
      logOut()
      return
    }
    setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
    setMessage([`Post ${item.id} deleted`, true])
    navigate(-1)
    // window.location.href = `/`
  }
  catch (error) {
    setMessage([`Post ${item.id} not deleted`, false])
    console.error(error.message);

  }
}


      //עריכה admin
      export  async function importedAdminEdit(item, setOriginalData, setMessage, logOut) {
        //  item.tags
        const oldTitle = item.title;
        const oldBody = item.body;
        const result = await Swal.fire({
        title: 'ערוך פוסט',
        html: '<textarea id="title" style="background-color: rgba(172, 192, 389, 0.74); width: 350px; text-align: center;" class="swal2-input" placeholder="ערוך כותרת (עד 20 תווים)">' + oldTitle + '</textarea>' +
          '<textarea id="body" style="height: 300px; background-color: rgba(172, 592, 189, 0.74); width: 350px; text-align: center;" class="swal2-input" placeholder=" ערוך פוסט (עד 40 תווים)">' + oldBody + '</textarea>',
        showCancelButton: true,
        confirmButtonText: 'אישור',
        cancelButtonText: 'ביטול',
        preConfirm: () => {
          const title = document.getElementById('title').value;
          const body = document.getElementById('body').value;
          if (!title || !body) {
            Swal.showValidationMessage('אנא מלא את כל השדות');
          }
          return { title, body };
        }
      });
      if (!result.value) { return }

      try {
        const response = await fetch(`${SERVER_HOST}/posts/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                selectedBook: item.topic ,
                selectedPortion: item.subtopic,
                title: result.value.title,
                body: result.value.body,
                tags: [],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
               
                // 'authorization': localStorage.getItem('Authorization') || ''
                'authorization': Cookies.get('Authorization') || ''
            },
        });
        // console.log(response);
        if (response.status === 400 || response.status === 404) {
            console.log("400/404");
            const errorMessage = await response.text();
            console.log('Post not updated' + errorMessage);
            setMessage(['Post not updated ' + errorMessage, false])
            if (response.status == 401) {
                logOut()
                return
            }
            throw new Error(`Failed to update post! Status: ${response.status}`);
        }
        const newPost = await response.json();
        // console.log(newPost);
        setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
        setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
        setMessage(['Post updated successfully', true]);
        // window.location.href = `/`
    }
    catch (error) {
        console.error(error.message);
    }
  }
