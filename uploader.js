function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("preview").src = e.target.result;
  };

  reader.readAsDataURL(file);
}
