export const CUSTOM_THEMES = {
  defaultMode: {
    name: 'light',
    colors: {
      background: 'hsl(0, 0%, 98%)',
      primary: 'hsl(200, 15%, 8%)',
      secondary: 'hsl(0, 0%, 52%)',
      backgroundColor: 'hsl(0, 0%, 100%)',
    },
  },
  nightMode: {
    name: 'dark',
        colors: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(0, 0%, 100%)',
        background: 'hsl(207, 26%, 17%)',
        backgroundColor: 'hsl(209, 23%, 22%)',
        },
  },
};

export interface themeTypes {
        name: string
        colors: {
        primary: string
        secondary: string
        background: string
        backgroundColor: string
    }
}