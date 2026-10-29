(() => {
  const initialize = () => {
    if (!('IntersectionObserver' in window)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('video.wedding-video').forEach((video) => {
      if (video.dataset.scrollPlaybackBound) return;
      video.dataset.scrollPlaybackBound = 'true';
      video.muted = true;

      let visible = false;
      let userPaused = false;
      let automaticPause = false;

      const playWhenVisible = () => {
        if (!visible || document.hidden || userPaused || video.ended) return;
        const attempt = video.play();
        if (attempt) attempt.catch(() => { /* Native play remains available. */ });
      };

      const pauseAutomatically = () => {
        if (video.paused) return;
        automaticPause = true;
        video.pause();
      };

      video.addEventListener('pause', () => {
        if (!automaticPause && !video.ended) userPaused = true;
        automaticPause = false;
      });
      video.addEventListener('play', () => { userPaused = false; });

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        if (visible) playWhenVisible();
        else pauseAutomatically();
      }, { threshold: [0, 0.2] });
      observer.observe(video);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseAutomatically();
        else playWhenVisible();
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else initialize();
})();
