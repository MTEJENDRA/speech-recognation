document.addEventListener("DOMContentLoaded", function () {
  var logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        sessionStorage.removeItem("ser_logged_in");
      } catch (err) {}
      window.location.href = "index.html";
    });
  }

  var fileInput = document.getElementById("audio-input");
  var fileNameEl = document.getElementById("file-name");
  var analyzeBtn = document.getElementById("analyze-btn");
  var emotionLabelEl = document.getElementById("emotion-label");
  var emotionConfidenceEl = document.getElementById("emotion-confidence");
  var emotionBadgesContainer = document.getElementById("emotion-badges");
  var timelineBarsContainer = document.getElementById("timeline-bars");

  var EMOTIONS = ["Neutral", "Happy", "Sad", "Angry", "Fearful", "Surprised"];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createEmotionBadges() {
    if (!emotionBadgesContainer) return;
    EMOTIONS.forEach(function (emotion) {
      var badge = document.createElement("button");
      badge.type = "button";
      badge.className = "emotion-badge";
      badge.textContent = emotion;
      badge.dataset.emotion = emotion;
      badge.addEventListener("click", function () {
        simulatePrediction(emotion, randomInt(78, 98) / 100);
      });
      emotionBadgesContainer.appendChild(badge);
    });
  }

  function updateActiveBadge(emotion) {
    var badges = document.querySelectorAll(".emotion-badge");
    Array.prototype.forEach.call(badges, function (badge) {
      badge.classList.toggle("active", badge.dataset.emotion === emotion);
    });
  }

  function generateTimelineBars(emotion) {
    if (!timelineBarsContainer) return;
    timelineBarsContainer.innerHTML = "";
    var baseClass = emotion.toLowerCase();
    var n = 12;
    for (var i = 0; i < n; i++) {
      var bar = document.createElement("div");
      bar.className = "timeline-bar " + baseClass;
      var baseHeight = 20;
      var variation = emotion === "Neutral" ? 15 : 50;
      var height = baseHeight + randomInt(0, variation);
      bar.style.height = height + "%";
      timelineBarsContainer.appendChild(bar);
    }
  }

  function simulatePrediction(forcedEmotion, forcedConfidence) {
    var emotion =
      forcedEmotion || EMOTIONS[randomInt(0, EMOTIONS.length - 1)];
    var confidence =
      forcedConfidence ||
      Math.round((0.7 + Math.random() * 0.25) * 100) / 100;

    if (emotionLabelEl) {
      emotionLabelEl.textContent = emotion;
    }
    if (emotionConfidenceEl) {
      emotionConfidenceEl.textContent =
        "Confidence: " + (confidence * 100).toFixed(1) + "%";
    }

    updateActiveBadge(emotion);
    generateTimelineBars(emotion);
  }

  if (fileInput && fileNameEl && analyzeBtn) {
    fileInput.addEventListener("change", function () {
      var file =
        fileInput.files && fileInput.files.length > 0
          ? fileInput.files[0]
          : null;
      if (file) {
        fileNameEl.textContent = file.name;
        analyzeBtn.disabled = false;
      } else {
        fileNameEl.textContent = "No file selected";
        analyzeBtn.disabled = true;
      }
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", function () {
      analyzeBtn.disabled = true;
      analyzeBtn.textContent = "Analyzing...";

      setTimeout(function () {
        simulatePrediction();
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Emotion";
      }, 900);
    });
  }

  createEmotionBadges();
  generateTimelineBars("Neutral");
});
