/**
 * SoundManager using the Web Audio API.
 * Synthesizes ambient generative nautical atmosphere, wind, waves, and world-specific
 * chord drones without external audio file dependencies.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private noiseNode: AudioNode | null = null;
  private padOscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;
  private padGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private currentWorld: string = "hero";

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Setup ocean / wind noise generator
    this.setupOceanWind();

    // Setup harmonic pad
    this.setupHarmonicPad();
  }

  private setupOceanWind() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink/Brown noise for ocean surf & desert breeze
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate rushing water & desert air
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);

    whiteNoise.start();
    this.noiseNode = whiteNoise;
  }

  private setupHarmonicPad() {
    if (!this.ctx || !this.masterGain) return;

    this.padGain = this.ctx.createGain();
    this.padGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.padGain.connect(this.masterGain);

    // Initial root drone frequencies (D minor / nautical mystery: D2, A2, D3, F3)
    const freqs = [73.42, 110.0, 146.83, 174.61];

    this.padOscillators = freqs.map((f, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

      const oscGain = this.ctx!.createGain();
      oscGain.gain.setValueAtTime(0.25, this.ctx!.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.padGain!);
      osc.start();
      return osc;
    });
  }

  public setWorld(world: "hero" | "lastOutpost" | "pandemonium" | "carnivalIsland" | "hack2future") {
    if (!this.ctx || this.isMuted || this.currentWorld === world) return;
    this.currentWorld = world;

    const time = this.ctx.currentTime;

    // Adapt musical frequencies to the current island world
    let freqs: number[] = [73.42, 110.0, 146.83, 174.61]; // Hero: D minor

    if (world === "lastOutpost") {
      // Dune desert: Phrygian / mystical desert scale (D2, Eb2, A2, D3)
      freqs = [73.42, 77.78, 110.0, 146.83];
      if (this.noiseGain) {
        this.noiseGain.gain.linearRampToValueAtTime(0.28, time + 2);
      }
    } else if (world === "pandemonium") {
      // Cyberpunk synthwave: F# minor neon saw chord (F#2, C#3, F#3, A3)
      freqs = [92.5, 138.59, 185.0, 220.0];
      if (this.noiseGain) {
        this.noiseGain.gain.linearRampToValueAtTime(0.12, time + 2);
      }
    } else if (world === "carnivalIsland") {
      // Carnival festive warm major (G2, B2, D3, G3)
      freqs = [98.0, 123.47, 146.83, 196.0];
      if (this.noiseGain) {
        this.noiseGain.gain.linearRampToValueAtTime(0.22, time + 2);
      }
    } else if (world === "hack2future") {
      // Astronaut deep space cosmic drone (C2, G2, C3, E3)
      freqs = [65.41, 98.0, 130.81, 164.81];
      if (this.noiseGain) {
        this.noiseGain.gain.linearRampToValueAtTime(0.08, time + 2);
      }
    }

    this.padOscillators.forEach((osc, idx) => {
      if (freqs[idx]) {
        osc.frequency.exponentialRampToValueAtTime(freqs[idx], time + 2.5);
      }
    });
  }

  public toggleMute(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return true;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    const time = this.ctx.currentTime;

    if (this.isMuted) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, time + 0.6);
    } else {
      this.masterGain.gain.linearRampToValueAtTime(0.4, time + 1.2);
    }

    return this.isMuted;
  }

  public playClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore audio interaction block
    }
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }
}

export const soundManager = typeof window !== "undefined" ? new SoundManager() : ({} as SoundManager);
