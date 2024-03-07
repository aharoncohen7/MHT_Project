

//פוסט חדש
export async function addNewPost2(userId, selectedBook, selectedPortion, title, body, tags, setOriginalData,  setMessage, setSend, setShowEditor, logOut, navigate) {
  try {
    const response = await fetch('http://localhost:4002/api/posts', {
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
        // 'auth': localStorage.getItem('auth') || '',
        'authorization': localStorage.getItem('Authorization') || ''
      },
    });
    console.log(response);
    if (response.status === 400 || response.status === 404) {
      console.log("400/404");
      const errorMessage = await response.text();
      console.log('Post not created' + errorMessage);
      setMessage('Post not created ' + errorMessage);
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
    setMessage('Post created successfully');
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
    const response = await fetch(`http://localhost:4002/api/posts/${postId}`, {
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
        // 'auth': localStorage.getItem('auth') || '',
        'authorization': localStorage.getItem('Authorization') || ''
      },
    });
    // console.log(response);
    if (response.status === 400 || response.status === 404) {
      console.log("400/404");
      const errorMessage = await response.text();
      console.log('Post not updated' + errorMessage);
      setMessage('Post not updated ' + errorMessage)
      setSend(false)
      setShowEditor(false)
      if (response.status == 401) {
        logOut()
      }
      // navigate(`/post/${postId}`)
      setMessage('Post not updated')
      throw new Error(`Failed to update post! Status: ${response.status}`);

    }
    const newPost = await response.json();
    console.log(newPost);
    setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
    setMessage('Post updated successfully');
    // alert('Post updated successfully')
    setSend(false)
    setShowEditor(false)
    navigate(`/post/${postId}`)
    window.location.href = `http://localhost:5173/post/${postId}`

  }
  catch (error) {
    console.error(error.message);
  }
}


// מחיקה
export async function deletePost2(item, setOriginalData, setMessage, logOut, navigate) {
  console.log(item);
  try {
    let response = await fetch(`http://localhost:4002/api/posts/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'auth': localStorage.getItem('auth') || '',
        'authorization': localStorage.getItem('Authorization') || ''
      },
    });
    if (!response.ok) {
      console.log("problem deleting post");
      throw new Error(`Failed to delete post! Status: ${response.status}`);
    }
    setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
    setMessage(`Post ${item.id} deleted`)
    // alert(`Post ${item.id} deleted`)
    navigate(`/home`)
  }
  catch (error) {
    setMessage(`Post ${item.id} not deleted`)
    console.error(error.message);

  }
}
