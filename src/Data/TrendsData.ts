import icon1 from "../assets/imgs/Trends/Icon-Container.png"
import iconsm1 from "../assets/imgs/Trends/sm-Icon-Container.png"
import icon2 from "../assets/imgs/Trends/Icon-Container-1.png"
import iconsm2 from "../assets/imgs/Trends/sm-Icon-Container-1.png"
import icon3 from "../assets/imgs/Trends/Icon-Container-2.png"
import iconsm3 from "../assets/imgs/Trends/sm-Icon-Container-2.png"
import icon4 from "../assets/imgs/Trends/Icon-Container-3.png"
import iconsm4 from "../assets/imgs/Trends/sm-Icon-Container-3.png"
import icon5 from "../assets/imgs/Trends/Icon-Container-4.png"
import iconsm5 from "../assets/imgs/Trends/sm-Icon-Container-4.png"
import icon6 from "../assets/imgs/Trends/Icon-Container-15.png"
import iconsm6 from "../assets/imgs/Trends/sm-Icon-Container-5.png"
import bg1 from "../assets/imgs/Trends/Icon-10.png"
import bg2 from "../assets/imgs/Trends/Icon-11.png"
import bg3 from "../assets/imgs/Trends/Icon-12.png"
import bg4 from "../assets/imgs/Trends/Icon-13.png"
import bg5 from "../assets/imgs/Trends/Icon-14.png"
import bg6 from "../assets/imgs/Trends/Icon-15.png"


const storedValueTrendsData = localStorage.getItem('ValueTrendsData');
const TrendsData = storedValueTrendsData ? JSON.parse(storedValueTrendsData) : [
  {
    title: "Passionate Craftsmanship",
    desc:
      "Every garment at StyleLoom is crafted with passion, reflecting our commitment to quality and innovation.",
    icon: icon1,
    iconSm: iconsm1,
    bg: bg1
  },
  {
    title: "Fashion Forward",
    desc:
      "We're more than a brand; we're trendsetters, curating styles that empower and inspire confidence.",
    icon: icon2,
    iconSm: iconsm2,
    bg: bg2
  },
  {
    title: "Customer-Centric Approach",
    desc:
      "At StyleLoom, our customers are at the heart of everything we do. Your satisfaction is our measure of success.",
    icon: icon3,
    iconSm: iconsm3,
    bg: bg3
  },
  {
    title: "Global Inspiration",
    desc:
      "Influenced by global trends, we bring you a diverse and dynamic collection, embodying the spirit of fashion from around the world.",
    icon: icon4,
    iconSm: iconsm4,
    bg: bg4
  },
  {
    title: "Empowering Your Style",
    desc:
      "Beyond clothing, StyleLoom is a lifestyle. Join us on a journey of self-expression and empowerment through fashion.",
    icon: icon5,
    iconSm: iconsm5,
    bg: bg5
  },
  {
    title: "Sustainable Practices",
    desc:
      "StyleLoom is committed to sustainability, integrating eco-friendly practices into our production process.",
    icon: icon6,
    iconSm: iconsm6,
    bg: bg6
  }
];

if (!storedValueTrendsData) {
  localStorage.setItem('ValueTrendsData', JSON.stringify(TrendsData));
}

export const StoredTrendsData = TrendsData;
