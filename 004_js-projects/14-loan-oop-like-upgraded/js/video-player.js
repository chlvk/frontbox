class VideoPlayer {
  #player = null;

  constructor(triggersSelector, overlaySelector) {
    this.buttonNodes = Array.from(document.querySelectorAll(triggersSelector));
    this.overlayNode = document.querySelector(overlaySelector);
    this.closeButtonNode = this.overlayNode.querySelector('.close');
  }

  #bindTriggers() {
    this.buttonNodes.forEach((item) => {
      item.addEventListener('click', () => {
        // проверка на наличие уже созданного плеера
        if (document.querySelector('iframe#frame')) {
          this.overlayNode.style.display = 'flex';
        } else {
          const path = item.getAttribute('data-url');
          this.#createPlayer(path);
        }
      });
    });
  }

  #bindCloseButton() {
    this.closeButtonNode.addEventListener('click', () => {
      this.overlayNode.style.display = 'none';
      this.#player.stopVideo();
    });
  }

  #createPlayer(url) {
    // [start]
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    // 'frame' - уникальный идентификатор, элемент, который заменяется на iframe (div#frame)
    // eslint-disable-next-line no-undef
    this.#player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
    });
    // [end]

    this.overlayNode.style.display = 'flex';
  }

  init() {
    // [start]
    // https://developers.google.com/youtube/iframe_api_reference
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // [end]

    this.#bindTriggers();
    this.#bindCloseButton();
  }
}

export default VideoPlayer;
