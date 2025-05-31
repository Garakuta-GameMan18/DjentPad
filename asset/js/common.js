
const titleInput = document.getElementById("titleInput");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const downloadBtn = document.getElementById("downloadBtn");

const logArea = document.getElementById("logArea");

let isRecording = false;
let startTime = 0;
let notes = [];

function startRecording() {
  isRecording = true;
  startTime = performance.now();
  notes = [];
}

function resetRecording() {
  isRecording = false;
  startTime = 0;
  notes = [];
  logArea.innerHTML = '';
}

// ---------------
function handleKeyPress(event) {
  if (!isRecording) return;

  const key = event.key;
  if (key === 'q' || key === 'p') {
    const time = ((performance.now() - startTime) / 1000).toFixed(3);
    notes.push({ time: parseFloat(time) });

    const logDetail = document.createElement('div');
    logDetail.textContent = `${key} ： ${time}s`;
    logArea.appendChild(logDetail);

    // アニメーションは下にまとめてる
    triggerAnimation(key);
  }
}

// ---------------

function downloadJson() {
  if (notes.length === 0) {
    alert("録音データがありません😇");
    return;
  }

  const title = titleInput.value.trim(); // ← 先に定義！

  const data = {
    title: title || "DjentPadNotes",
    notes: notes
  };
  const jsonData = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const fileName = title !== "" ? `${title}.json` : "djentpad_notes.json";

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

startBtn.addEventListener("click", startRecording);
resetBtn.addEventListener("click", resetRecording);
downloadBtn.addEventListener("click", downloadJson);
document.addEventListener("keydown", handleKeyPress);


// ---------------

function triggerAnimation(key) {
  const ripple = document.createElement('div');
  ripple.className = `ripple ${key === 'q' ? 'ripple-left' : 'ripple-right'}`;
  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600); // アニメ後に削除
}