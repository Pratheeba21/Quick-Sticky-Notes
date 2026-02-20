const API_URL = "http://localhost:3000/notes";

window.addEventListener("DOMContentLoaded", async () => {
 
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();
    notes.forEach((note) => renderNote(note));
  } catch (err) {
    console.error("Error loading notes:", err);
  }

  
  const addBtn = document.getElementById("add");

  addBtn.onclick = async () => {
    const txtInput = document.getElementById("txt");
    const val = txtInput.value;

    if (!val.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: val }),
      });

      const newNote = await res.json();
      renderNote(newNote);
      txtInput.value = "";
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };
});


function renderNote(noteObj) {
  const board = document.getElementById("board");
  const note = document.createElement("div");
  note.className = "note";


  note.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;

  note.innerHTML = `
        <span class="close">X</span>
        <p>${noteObj.text}</p>
    `;

  note.querySelector(".close").onclick = async () => {
    try {
      await fetch(`${API_URL}/${noteObj._id}`, { method: "DELETE" });
      note.style.transform = "scale(0)";
      setTimeout(() => note.remove(), 200);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  board.appendChild(note);
}
