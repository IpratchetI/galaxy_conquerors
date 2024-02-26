import Store from '@/store';

type PlayOptions = { type?: 'sound' | 'music'; loop?: boolean };

const defaultPlayOptions: PlayOptions = {
	loop: false,
	type: 'sound'
};

class AudioService {
	private _audioContext: AudioContext | undefined;
	private _isSoundsEnabled = true;
	private _isMusicEnabled = true;

	constructor() {
		Store.subscribe(this._listener);
	}

	private _listener = () => {
		const {
			uiState: { music, sounds }
		} = Store.getState();
		this._isSoundsEnabled = sounds;
		this._isMusicEnabled = music;
	};

	public play(soundFilePath: string, options: PlayOptions = defaultPlayOptions) {
		if (
			(options.type === 'sound' && !this._isSoundsEnabled) ||
			(options.type === 'music' && !this._isMusicEnabled)
		) {
			return () => null;
		}

		if (!this._audioContext) {
			this._audioContext = new AudioContext();
		}

		const audio = new Audio(soundFilePath);
		const source = this._audioContext.createMediaElementSource(audio);
		source.connect(this._audioContext.destination);

		if (options?.loop) {
			audio.loop = true;
		} else {
			audio.addEventListener('ended', () => source.disconnect());
		}

		audio.play();

		const disposer = () => {
			audio.pause();
			audio.currentTime = 0;
			source.disconnect();
		};

		return disposer;
	}
}

export default new AudioService();
