export const PROJECT_META = [
  {
    id: 1,
    slug: "smart-clinic",
    title: "Smart Clinic",
    category: "Web & App",
    color: "bg-lime-400",
    img: "https://res.cloudinary.com/dw5mromqs/image/upload/v1782361739/Screenshot_2026-06-25_112342_namf6n.png",
  },
  {
    id: 2,
    slug: "tagana-squence",
    title: "TAGANA SQUENCE",
    category: "web app",
    color: "bg-purple-400",
    img: "https://res.cloudinary.com/dw5mromqs/image/upload/v1782363036/Screenshot_2026-06-25_115000_jvtn3j.png",
  },
  
];

export const PROJECT_META_BY_SLUG = PROJECT_META.reduce((accumulator, item) => {
  accumulator[item.slug] = item;
  return accumulator;
}, {});
