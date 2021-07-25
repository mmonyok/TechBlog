const newCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#newComment').value;
  const blogId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ blogId, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blogId}`);
    } else {
      alert('Failed to create comment.');
    }
  }
};

document.querySelector('#newCommentForm').addEventListener('submit', newCommentHandler);