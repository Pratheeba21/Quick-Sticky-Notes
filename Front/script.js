// const API_URL = "https://quick-sticky-notes-backend.onrender.com/notes";

// window.addEventListener("DOMContentLoaded", async () => {

//   try {
//     const res = await fetch(API_URL);
//     const notes = await res.json();
//     notes.forEach((note) => renderNote(note));
//   } catch (err) {
//     console.error("Error loading notes:", err);
//   }

//   const addBtn = document.getElementById("add");

//   addBtn.onclick = async () => {
//     const txtInput = document.getElementById("txt");
//     const val = txtInput.value;

//     if (!val.trim()) return;

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: val }),
//       });

//       const newNote = await res.json();
//       renderNote(newNote);
//       txtInput.value = "";
//     } catch (err) {
//       console.error("Error saving note:", err);
//     }
//   };
// });

// function renderNote(noteObj) {
//   const board = document.getElementById("board");
//   const note = document.createElement("div");
//   note.className = "note";

//   note.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;

//   note.innerHTML = `
//         <span class="close">X</span>
//         <p>${noteObj.text}</p>
//     `;

//   note.querySelector(".close").onclick = async () => {
//     try {
//       await fetch(`${API_URL}/${noteObj._id}`, { method: "DELETE" });
//       note.style.transform = "scale(0)";
//       setTimeout(() => note.remove(), 200);
//     } catch (err) {
//       console.error("Error deleting note:", err);
//     }
//   };

//   board.appendChild(note);
// }

const API_URL = "https://quick-sticky-notes-backend.onrender.com/notes";

const txtInput = document.getElementById("txt");
const addBtn = document.getElementById("add");
const board = document.getElementById("board");

// 1. Load notes from DB on startup
window.addEventListener("DOMContentLoaded", function () {
  fetch(API_URL)
    .then((res) => res.json())
    .then((notes) => {
      notes.forEach((note) => {
        create_note_element(note._id, note.text);
      });
    })
    .catch((err) => console.error("Error loading notes:", err));
});

// 2. Add Note to DB and UI
addBtn.addEventListener("click", function () {
  const val = txtInput.value;

  if (val.trim() === "") {
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: val }),
  })
    .then((res) => res.json())
    .then((newNote) => {
      create_note_element(newNote._id, newNote.text);
      txtInput.value = "";
    })
    .catch((err) => console.error("Error saving note:", err));
});

// 3. Simplified Create/Render Function
function create_note_element(note_id, note_text) {
  const note_div = document.createElement("div");
  note_div.className = "note";

  // Random rotation for the sticky note look
  note_div.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;

  const close_span = document.createElement("span");
  close_span.className = "close";
  close_span.textContent = "X";

  const content_p = document.createElement("p");
  content_p.textContent = note_text;

  // DELETE Logic
  close_span.addEventListener("click", function () {
    fetch(API_URL + "/" + note_id, {
      method: "DELETE",
    })
      .then(() => {
        // Animation before removal
        note_div.style.transform = "scale(0)";
        setTimeout(() => {
          board.removeChild(note_div);
        }, 200);
      })
      .catch((err) => console.error("Error deleting note:", err));
  });

  // Assemble the note
  note_div.appendChild(close_span);
  note_div.appendChild(content_p);

  // Add to board
  board.appendChild(note_div);
}
