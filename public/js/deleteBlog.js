async function deleteBlogHandler(event)  {
  console.log("attempting to delete");
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/blogs/delete/${id}`, {
    method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};

document.querySelector('#deleteBtn').addEventListener('click', deleteBlogHandler);