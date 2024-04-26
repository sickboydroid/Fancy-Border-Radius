const leftHandle = document.querySelector("#left-handle");
const rightHandle = document.querySelector("#right-handle");
const topHandle = document.querySelector("#top-handle");
const bottomHandle = document.querySelector("#bottom-handle");
const handles = [leftHandle, rightHandle, topHandle, bottomHandle];
const squareDiv = document.querySelector(".square");
const blobDiv = document.querySelector(".blob");
const borderRadiusValueSpan = document.querySelector(".border-radius-value");
const SQUARE_LEFT =
  squareDiv.getBoundingClientRect().left - leftHandle.getBoundingClientRect().width / 2;
const SQUARE_TOP =
  squareDiv.getBoundingClientRect().top - leftHandle.getBoundingClientRect().height / 2;
const SQUARE_BOTTOM =
  squareDiv.getBoundingClientRect().bottom - leftHandle.getBoundingClientRect().height / 2;
const SQUARE_RIGHT =
  squareDiv.getBoundingClientRect().right - leftHandle.getBoundingClientRect().width / 2;
placeHandlesAtDefaultPosition();

function placeHandlesAtDefaultPosition() {
  leftHandle.style.left = SQUARE_LEFT + "px";
  leftHandle.style.top = SQUARE_BOTTOM + "px";
  rightHandle.style.left = SQUARE_RIGHT + "px";
  rightHandle.style.top = SQUARE_TOP + "px";
  topHandle.style.left = SQUARE_LEFT + "px";
  topHandle.style.top = SQUARE_TOP + "px";
  bottomHandle.style.left = SQUARE_RIGHT + "px";
  bottomHandle.style.top = SQUARE_BOTTOM + "px";
  handles.forEach(handle => {
    dragHandle(
      handle,
      SQUARE_LEFT + (SQUARE_RIGHT - SQUARE_LEFT) * Math.random(),
      SQUARE_TOP + (SQUARE_BOTTOM - SQUARE_TOP) * Math.random()
    );
  });
}

window.addEventListener("mousemove", e => {
  for (const handle of handles) {
    if (!handle.drag) continue;
    dragHandle(
      handle,
      e.clientX - handle.getBoundingClientRect().height / 2,
      e.clientY - handle.getBoundingClientRect().height / 2
    );
    break;
  }
});

window.addEventListener("mouseup", () => disableDrag());
handles.forEach(handle => handle.addEventListener("mousedown", () => enableDrag(handle)));

function enableDrag(handle) {
  disableDrag();
  handle.drag = true;
}

function disableDrag() {
  handles.forEach(handle => (handle.drag = false));
}

function dragHandle(handle, x, y) {
  x = clamp(SQUARE_LEFT, x, SQUARE_RIGHT);
  y = clamp(SQUARE_TOP, y, SQUARE_BOTTOM);
  if (handle.id === "top-handle" || handle.id === "bottom-handle") handle.style.left = x + "px";
  else handle.style.top = y + "px";
  resetBlobBorder();
}

function clamp(min, val, max) {
  return Math.max(Math.min(val, max), min);
}

function resetBlobBorder() {
  const LEFT_HANDLE_BOTTOM = leftHandle.getBoundingClientRect().top;
  const TOP_HANDLE_RIGHT = topHandle.getBoundingClientRect().left;
  const RIGHT_HANDLE_BOTTOM = rightHandle.getBoundingClientRect().top;
  const BOTTOM_HANDLE_RIGHT = bottomHandle.getBoundingClientRect().left;
  const radiusTop = Math.floor(
    ((SQUARE_RIGHT - TOP_HANDLE_RIGHT) / (SQUARE_RIGHT - SQUARE_LEFT)) * 100
  );

  const radiusLeft = Math.floor(
    ((SQUARE_BOTTOM - LEFT_HANDLE_BOTTOM) / (SQUARE_BOTTOM - SQUARE_TOP)) * 100
  );
  const radiusRight = Math.floor(
    ((SQUARE_BOTTOM - RIGHT_HANDLE_BOTTOM) / (SQUARE_BOTTOM - SQUARE_TOP)) * 100
  );
  const radiusBottom = Math.floor(
    ((SQUARE_RIGHT - BOTTOM_HANDLE_RIGHT) / (SQUARE_RIGHT - SQUARE_LEFT)) * 100
  );

  // prettier-ignore
  const radiusValue = `${100-radiusTop}% ${radiusTop}% ${radiusBottom}% ${100 - radiusBottom}%`
                       + `/` 
                       + `${100 - radiusLeft}% ${100-radiusRight}% ${radiusRight}% ${radiusLeft}%`;
  blobDiv.style["border-radius"] = radiusValue;
  borderRadiusValueSpan.textContent = radiusValue;
}
