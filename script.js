$(document).ready(function () {
  var video = document.getElementById("videoElement");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var captureButton = document.getElementById("captureButton");

  // Function to handle successful image capture and analysis
  function handleImageAnalysis(response) {
    console.log("Image analysis response:", response);
    // Handle the response data from Azure Cognitive Services API
    // (e.g., display analysis results to the user)
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Could not access the camera: " + error);
    });

  captureButton.addEventListener("click", function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function (blob) {
      var formData = new FormData();
      formData.append("image", blob);

      // Set Content-Type based on data type (binary image data)
      var contentType = "multipart/form-data";

      $.ajax({
        url: "https://cv-instance-analyseimg-northeur.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=people&model-version=latest&language=en&gender-neutral_caption=False",
        type: "POST",
        data: formData,
        contentType: contentType,
        headers: {
          "Ocp-Apim-Subscription-Key": "169ba26709814440839c99da449b5421", // Replace with your actual key
        },
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.error("Error during image analysis:", error);
        },
      });
    });
  });
});
