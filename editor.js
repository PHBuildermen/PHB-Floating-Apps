import { uploadImage } from "./upload.js";

export function initEditor(editorId) {
  const editor = document.getElementById(editorId);

  // Bold
  window.boldText = () => document.execCommand("bold");

  // Heading
  window.heading = () => document.execCommand("formatBlock", false, "h2");

  // Insert Image (Cloud Upload)
  window.insertImage = async (fileInput) => {
    const file = fileInput.files[0];
    const url = await uploadImage(file);

    document.execCommand("insertHTML", false, `<img src="${url}" style="max-width:100%;">`);
  };
}
