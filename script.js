let items = document.querySelectorAll(".item");
let container = document.querySelector(".items");

let offsetX, offsetY;
let isDragging = false;
let currentItem = null;


items.forEach(item => {
  let rect = item.getBoundingClientRect();
  let parentRect = container.getBoundingClientRect();

  item.style.position = "absolute";
  item.style.left = (rect.left - parentRect.left) + "px";
  item.style.top = (rect.top - parentRect.top) + "px";

  // Mouse down → start dragging
  item.addEventListener("mousedown", e => {
    isDragging = true;
    currentItem = item;
    offsetX = e.clientX - currentItem.offsetLeft;
    offsetY = e.clientY - currentItem.offsetTop;
    e.preventDefault();
  });
});


document.addEventListener("mousemove", e => {
  if (!isDragging || !currentItem) return;

  let containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

 
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - currentItem.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - currentItem.offsetHeight));

  currentItem.style.left = newLeft + "px";
  currentItem.style.top = newTop + "px";
});


document.addEventListener("mouseup", () => {
  isDragging = false;
  currentItem = null;
});
