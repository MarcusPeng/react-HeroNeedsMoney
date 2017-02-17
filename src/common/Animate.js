HTMLElement.prototype.shake = function(isEndRemove = true) {
  addAnimate(this, ["animated", "shake"], isEndRemove);
}

HTMLElement.prototype.flash = function(isEndRemove = true) {
  addAnimate(this, ["animated", "flash"], isEndRemove);
}

HTMLElement.prototype.jello = function(isEndRemove = true) {
  addAnimate(this, ["animated", "jello"], isEndRemove);
}

HTMLElement.prototype.rollOut = function(isEndRemove = true) {
  addAnimate(this, ["animated", "rollOut"], isEndRemove);
}

function addAnimate(element, animation, isEndRemove) {
  animationendEvent(null, element);
  if (isEndRemove) {
    element.addEventListener("animationend", animationendEvent);
  }
  animation.forEach(function(item, index) {
    element.classList.add(item);
  });
}

function animationendEvent(e, element) {
  let item = (this === undefined && element !== undefined) ? element : this;
  item.className = item.className.substring(0, item.className.indexOf("animated"));
  item.removeEventListener("animationend", animationendEvent);
}
