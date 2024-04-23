// #region Adding files to a dropArea

var dropArea = document.getElementById("drop-area");
dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("dragleave", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  var files = e.dataTransfer.files;
  handleFiles(files);
});

var fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", function (e) {
  var files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  var fileInput = document.getElementById("file-input");
  fileInput.files = files;
}

document.getElementById("file-input").addEventListener("change", function () {
  const dropArea = document.getElementById("drop-area");

  if (this.files.length > 0) {
    dropArea.classList.add("active");
  } else {
    dropArea.classList.remove("active");
  }
});

// #endregion
