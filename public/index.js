function readMore(elementId, fromId) {
  var element = document.getElementById(elementId);
  element.style.display = "initial";
  var from = document.getElementById(fromId);
  from.style.display = "none";
}
