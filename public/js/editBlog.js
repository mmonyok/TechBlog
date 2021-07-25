const editBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#editTitle').value;
  const content = document.querySelector('#editContent').value;
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/blogs/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content, }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('Failed to edit project.');
  }
}

document.querySelector('#editBlogForm').addEventListener('submit', editBlogHandler);