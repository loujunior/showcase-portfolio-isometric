// projects.js – the list of projects shown in the Projects section.
// To add a project: copy one object, paste it and change the values.
//
// Fields:
//   title, description  – always shown
//   type                – small purple label in the top-right corner (optional)
//   features            – list of short labels (optional)
//   role, tech          – extra info lines (optional)
//   image, imageAlt     – picture inside the frame; leave image null for an empty frame
//
// The cards alternate automatically: image left, right, left, ...

export const projects = [
  {
    id: 'gear',
    title: 'Gear Ontwikkelingsgids',
    description:
      'Een mobiele ontwikkelingsgids die gebruikers helpt bij hun persoonlijke ontwikkeling. Met doelen, plannen, stappen en een veilige kluis voor belangrijke documenten.',
    type: 'App (Nuxt/Vue)',
    features: ['Plannen', 'Kluis', 'Stappen', 'Delen'],
    role: 'UX/UI Design • User Testing • Iteratief verbeteren',
    tech: 'Vue • Nuxt • Figma • VS Code',
    image: '/images/gear-phone.png',
    imageAlt: 'Startscherm van de Gear app in een pixel-art telefoon'
  },
  {
    id: 'livewall',
    title: 'Livewall',
    description: 'Coming soon...',
    image: null
  },
  {
    id: 'personal',
    title: 'Personal Project',
    description: 'Coming soon...',
    image: null
  }
]
