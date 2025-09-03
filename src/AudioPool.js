export class AudioPool {
  constructor(url, size = 6) {
    this.url = url;
    this.pool = [];
    for (let i = 0; i < size; i++) {
      const a = new Audio(url);
      a.preload = 'auto';
      this.pool.push(a);
    }
    this.idx = 0;
  }
  play() {
    const a = this.pool[this.idx];
    try { a.currentTime = 0; } catch {}
    a.play().catch(() => {});
    this.idx = (this.idx + 1) % this.pool.length;
    return a;
  }
  stopAll() {
    this.pool.forEach(a => { a.pause(); a.currentTime = 0; });
  }
}
