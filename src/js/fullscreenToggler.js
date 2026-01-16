function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
    }
}
