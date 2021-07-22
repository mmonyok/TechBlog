const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("I'm a comment handler.")
  const content = document.querySelector('#newComment').value;
  const blogId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (content) {
    console.log("content exists");
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ blogId, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to create comment.');
    }
  }
};

document.querySelector('#newCommentForm').addEventListener('submit', newCommentHandler);