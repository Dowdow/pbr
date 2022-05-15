module.exports = {
  content: [
    './assets/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'shop-0': '20s fade 0s infinite',
        'shop-4': '20s fade 4s infinite',
        'shop-8': '20s fade 8s infinite',
        'shop-12': '20s fade 12s infinite',
        'shop-16': '20s fade 16s infinite',
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          songs: 'var(--color-songs)',
          'song-hover': 'var(--color-song-hover)',
        },
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
      },
      textColor: {
        skin: {
          base: 'var(--color-text)',
          fill: 'var(--color-fill)',
        },
      },
    },
  },
  plugins: [],
};
