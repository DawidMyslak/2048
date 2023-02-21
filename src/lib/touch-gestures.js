import { onBeforeMount, onBeforeUnmount } from "vue";
import { DIRECTION } from "@/constants";

const SWIPE_THRESHOLD = 50;

export default function trackTouchGestures({ onSwipe }) {
  let touchEndX, touchEndY, touchStartX, touchStartY;

  function handleGesture() {
    if (touchEndX + SWIPE_THRESHOLD < touchStartX) {
      onSwipe({ direction: DIRECTION.LEFT });
    } else if (touchEndX > SWIPE_THRESHOLD + touchStartX) {
      onSwipe({ direction: DIRECTION.RIGHT });
    } else if (touchEndY + SWIPE_THRESHOLD < touchStartY) {
      onSwipe({ direction: DIRECTION.UP });
    } else if (touchEndY > SWIPE_THRESHOLD + touchStartY) {
      onSwipe({ direction: DIRECTION.DOWN });
    }
  }

  const onTouchStartHandler = function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  };

  const onTouchEndHandler = function (event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
  };

  onBeforeMount(() => {
    window.addEventListener("touchstart", onTouchStartHandler);
    window.addEventListener("touchend", onTouchEndHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("touchstart", onTouchStartHandler);
    window.removeEventListener("touchend", onTouchEndHandler);
  });
}
