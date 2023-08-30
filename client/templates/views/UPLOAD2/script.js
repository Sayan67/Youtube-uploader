document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  
  var title = document.getElementById("titleInput").value;
  var description = document.getElementById("descriptionInput").value;
  var videoFile = document.getElementById("videoInput").files[0];

  alert("Video uploaded successfully!"); 
});