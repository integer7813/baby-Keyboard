export const KEY_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

export const SOUND_MAP = { 
  A: { title: 'Apple Bite', file: 'A.mp3', emoji: '🍎', desc: 'Crunchy apple bite!' }, 
  B: { title: 'Box', file: 'B.mp3', emoji: '📦', desc: 'Cardboard box thud' }, 
  C: { title: 'Clap', file: 'C.mp3', emoji: '👏', desc: 'Quick hand clap!' }, 
  D: { title: 'Dog', file: 'D.mp3', emoji: '🐶', desc: 'Cute dog bark!' }, 
  E: { title: 'Elephant', file: 'E.mp3', emoji: '🐘', desc: 'Short elephant trumpet!' }, 
  F: { title: 'Fart', file: 'F.mp3', emoji: '💨', desc: 'Silly toot!' }, 
  P: { title: 'Pop', file: 'P.mp3', emoji: '🫧', desc: 'Punchy pop "bang!"' }, 
  V: { title: 'Violin', file: 'V.mp3', emoji: '🎻', desc: 'Quick violin note!' }, 
  M: { title: 'Meow', file: 'M.mp3', emoji: '😸', desc: 'Lovely cat meow!' }, 
  R: { title: 'Rooster', file: 'R.mp3', emoji: '🐓', desc: 'Short rooster crow!' }, 
  O: { title: 'Owl', file: 'O.mp3', emoji: '🦉', desc: 'Night owl hoot!' }, 
  T: { title: 'Telephone', file: 'T.mp3', emoji: '☎️', desc: 'Ring-ring, hello?' }, 
  G: { title: 'Guitar', file: 'G.mp3', emoji: '🎸', desc: 'Rock star strum!' }, 
  H: { title: 'Horse', file: 'H.mp3', emoji: '🐎', desc: 'Neigh! Giddy up!' }, 
  W: { title: 'Whistling', file: 'W.mp3', emoji: '😗', desc: 'Happy whistle ♪' }, 
  N: { title: 'Nose Blow', file: 'N.mp3', emoji: '🤧', desc: 'Short nose blow!' }, 
  Q: { title: 'Quartz Clock', file: 'Q.mp3', emoji: '🕓', desc: 'Tick-tock clock!' }, 
  I: { title: 'Ice', file: 'I.mp3', emoji: '🧊', desc: 'Brrr, so cold!' }, 
  U: { title: 'UFO', file: 'U.mp3', emoji: '🛸', desc: 'Sci-fi whoosh!' }, 
  Y: { title: 'Yawn', file: 'Y.mp3', emoji: '🥱', desc: 'Sleepy yawn~' }, 
  X: { title: 'Xylophone', file: 'X.mp3', emoji: '🎶', desc: 'Sparkly ding!' }, 
  L: { title: 'Lamb', file: 'L.mp3', emoji: '🐑', desc: 'Cute lamb "baa"!' }, 
  K: { title: 'Kettle', file: 'K.mp3', emoji: '🫖', desc: 'Pouring hot water' }, 
  Z: { title: 'Zipper', file: 'Z.mp3', emoji: '🧥', desc: 'Quick zip!' }, 
  S: { title: 'Splash', file: 'S.mp3', emoji: '💦', desc: 'Water splash!' }, 
  J: { title: 'Jump', file: 'J.mp3', emoji: '🦘', desc: 'Boing! Kangaroo hop!' }, 
}

export const KEY_TO_FILE = Object.fromEntries(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k => [k, SOUND_MAP[k]?.file ?? `${k}.mp3`])
);
