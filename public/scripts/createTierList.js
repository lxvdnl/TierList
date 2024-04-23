// #region Adding files to a dropArea

var dropArea = document.getElementById("dropArea");
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

var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function (e) {
  var files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  var fileInput = document.getElementById("fileInput");
  fileInput.files = files;
}

document.getElementById("fileInput").addEventListener("change", function () {
  const dropArea = document.getElementById("dropArea");

  if (this.files.length > 0) {
    dropArea.classList.add("active");
  } else {
    dropArea.classList.remove("active");
  }
});

// #endregion
