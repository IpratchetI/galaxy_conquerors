class AudioService {
  private _audioContext: AudioContext | undefined;

  // constructor() {
  //   const AudioContext = window.AudioContext;
  //   this._audioContext = new AudioContext();
  // }

  public play(soundFilePath: string) {

    if (!this._audioContext) {
      const AudioContext = window.AudioContext;
      this._audioContext = new AudioContext();
    }
    const audio = new Audio(soundFilePath);

    const source = this._audioContext.createMediaElementSource(audio);
    source.connect(this._audioContext.destination);

    audio.play();
    audio;
  }

  public stop() {
    console.log();
  }
}

export default new AudioService();
