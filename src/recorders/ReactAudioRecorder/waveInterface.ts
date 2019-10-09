// @ts-ignore
import AudioContext from "./AudioContext.ts";
// @ts-ignore
import encodeWAV from "./waveEncoder.ts";
// import getUserMedia from './getUserMedia.ts';

async function hasAudioVideoDevices() {
  // TODO: only ask for what is needed
  let hasAudio = false;
  let hasVideo = false;
  const devices = await navigator.mediaDevices.enumerateDevices();
  devices.forEach((device) => {
    if (device.kind === "audioinput") { hasAudio = true; }
    if (device.kind === "videoinput") { hasVideo = true; }
  });
  return (hasAudio && hasVideo);
}

async function mediaChecks() {
  const hasUserMedia = Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  if (!hasUserMedia) { throw new Error("Navigator does not support video media record."); }
  if (!await hasAudioVideoDevices()) { throw new Error("Not audio/video input devices detected."); }
  let mediaStream: MediaStream;
  try { mediaStream = await window.navigator.mediaDevices.getUserMedia({ audio: true }); } catch (err) { throw new Error("Yikes! Unable to get user media!"); }
  return mediaStream;
}

export default class WAVEInterface {
  public static audioContext: AudioContext = new AudioContext();
  public static bufferSize = 2048;

  public playbackNode?: AudioBufferSourceNode;
  public recordingNodes: AudioNode[] = [];
  public recordingStream?: MediaStream;
  public buffers?: Float32Array[][]; // one buffer for each channel L,R
  public encodingCache?: Blob | null;

  get bufferLength() { return this.buffers!![0].length * WAVEInterface.bufferSize; }
  get audioDuration() { return this.bufferLength / WAVEInterface.audioContext.sampleRate; }
  get audioData() {
    return this.encodingCache || encodeWAV(this.buffers, this.bufferLength, WAVEInterface.audioContext.sampleRate);
  }

  public startRecording() {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        { audio: true },
        (stream: MediaStream) => {
          const { audioContext } = WAVEInterface;
          const recGainNode: GainNode = audioContext.createGain();
          const recSourceNode: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
          const recProcessingNode: ScriptProcessorNode = audioContext.createScriptProcessor(WAVEInterface.bufferSize, 2, 2);
          if (this.encodingCache) { this.encodingCache = null; }

          recProcessingNode.onaudioprocess = (event) => {
            if (this.encodingCache) { this.encodingCache = null; }
            // save left and right buffers
            for (let i = 0; i < 2; i++) {
              const channel = event.inputBuffer.getChannelData(i);
              this.buffers!![i].push(new Float32Array(channel));
            }
          };

          recSourceNode.connect(recGainNode);
          recGainNode.connect(recProcessingNode);
          recProcessingNode.connect(audioContext.destination);

          this.recordingStream = stream;
          this.recordingNodes.push(recSourceNode, recGainNode, recProcessingNode);
          resolve(stream);
        },
        (err: MediaStreamError) => reject(err),
      );
    });
  }

  public stopRecording() {
    if (this.recordingStream) {
      this.recordingStream.getTracks()[0].stop();
      delete this.recordingStream;
    }
    // tslint:disable-next-line:forin
    for (const i in this.recordingNodes) {
      this.recordingNodes[i].disconnect();
      delete this.recordingNodes[i];
    }
  }

  public startPlayback(loop: boolean = false, onended: () => void) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.audioData);
      reader.onloadend = () => {
        WAVEInterface.audioContext.decodeAudioData(reader.result as ArrayBuffer, (buffer: AudioBuffer) => {
          const source = WAVEInterface.audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(WAVEInterface.audioContext.destination);
          source.loop = loop;
          source.start(0);
          source.onended = onended;
          this.playbackNode = source;
          resolve(source);
        });
      };
    });
  }

  public stopPlayback() {
    this.playbackNode!!.stop();
  }

  public reset() {
    if (this.playbackNode) {
      this.playbackNode.stop();
      this.playbackNode.disconnect(0);
      delete this.playbackNode;
    }
    this.stopRecording();
    this.buffers = [[], []];
  }
}
