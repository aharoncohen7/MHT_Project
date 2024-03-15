

//פוסט חדש
export async function addNewPost2(userId, selectedBook, selectedPortion, title, body, tags, setOriginalData, setMessage, setSend, setShowEditor, logOut, navigate) {
  try {
    const response = await fetch('https://vortly.onrender.com/api/posts', {
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

        'authorization': localStorage.getItem('Authorization') || ''
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
      }
      throw new Error(`Failed to create post! Status: ${response.status}`);
    }
    const newPost = await response.json();
    console.log(newPost);
    setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
    setMessage(['Post created successfully', true]);
    setSend(false)
    setShowEditor(false)

  }
  catch (error) {
    console.error(error.message);
  }
}




// עריכה
export async function editPost2(postId, selectedBook, selectedPortion, title, body, tags, setOriginalData, setMessage, setSend, setShowEditor, logOut, navigate) {
  try {
    const response = await fetch(`https://vortly.onrender.com/api/posts/${postId}`, {
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

        'authorization': localStorage.getItem('Authorization') || ''
      },
    });
    // console.log(response);
    if (response.status === 400 || response.status === 404) {
      // console.log("400/404");
      const errorMessage = await response.text();
      console.log(['Post not updated' + errorMessage, false]);
      setMessage(['Post not updated ' + errorMessage, false])
      setSend(false)
      setShowEditor(false)

      // navigate(`/post/${postId}`)
      
      throw new Error(`Failed to update post! Status: ${response.status}`);
    }
    if (response.status == 401) {
      setMessage(['Post not updated', false])
      logOut()
    }
    const newPost = await response.json();
    // console.log(newPost);
    setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
    setMessage(['Post updated successfully', true]);
    // alert('Post updated successfully')
    setSend(false)
    setShowEditor(false)
    navigate(`/post/${postId}`)
    window.location.href = `https://vortly.onrender.com/post/${postId}`

  }
  catch (error) {
    console.error(error.message);
  }
}


// מחיקה
export async function deletePost2(item, setOriginalData, setMessage, logOut, navigate) {
  // console.log(item);
  try {
    let response = await fetch(`https://vortly.onrender.com/api/posts/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',

        'authorization': localStorage.getItem('Authorization') || ''
      },
    });
    if (!response.ok) {
      console.log("problem deleting post");
      throw new Error(`Failed to delete post! Status: ${response.status}`);
    }
    setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
    setMessage([`Post ${item.id} deleted`, true])
    // alert(`Post ${item.id} deleted`)
    navigate(`/home`)
  }
  catch (error) {
    setMessage([`Post ${item.id} not deleted`, false])
    console.error(error.message);

  }
}
