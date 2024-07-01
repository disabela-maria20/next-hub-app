interface InfoFilmes {
  poster: string
  sinopse: string
  dirigidoPor: string
  escritoPor: string
  produzidoPor: string
  elenco: string
  logo: string
  bannerDesktop: string
}

export const INFOFILMES: InfoFilmes = {
  bannerDesktop: '/image/bg-banner-desktop.webp',
  logo: '/image/logo.webp',
  poster: '/image/poster.webp',
  sinopse:
    'Wolverine está se recuperando quando cruza seu caminho com Deadpool. Juntos, eles formam uma equipe e enfrentam um inimigo em comum.',
  dirigidoPor: 'Shawn Levy',
  escritoPor: 'Shawn Levy, Rhett Reese, Zeb Wells, Ryan Reynolds, Paul Wernick',
  produzidoPor: 'Shawn Levy, Kevin Feige, Lauren Shuler Donner, Ryan Reynolds',
  elenco:
    'Ryan Reynolds, Hugh Jackman, Morena Baccarin, Rob Delaney, Matthew Macfadyen'
}
