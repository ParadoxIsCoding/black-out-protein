import saltedcImg from '../assets/saltedc.png';
import saltedc880gImg from '../assets/saltedc880g.png';
import strawberryImg from '../assets/strawberry.png';
import strawberry880gImg from '../assets/strawberry880g.png';
import chocImg from '../assets/choc.png';
import choc880gImg from '../assets/choc880g.png';
import vanillaImg from '../assets/vanilla.png';
import vanilla880gImg from '../assets/vanilla880g.png';

export type ProductSize = '440g' | '880g';

export interface ProductData {
  id: string;
  name: string;
  tag: string;
  tagStyle: { bg: string; text: string };
  stats: string;
  ingredients: string;
  allergens: string;
  image: string;
  image880g: string;
}

export const productsData: ProductData[] = [
  {
    id: 'salted-caramel',
    name: 'SALTED CARAMEL',
    tag: 'PLANT BASED',
    tagStyle: { bg: '#22c55e', text: '#fff' },
    stats: '26g PLANT PROTEIN | 4g CREATINE',
    ingredients: 'Protein blend (72%) (faba bean protein isolate, pea protein isolate, brown rice protein isolate), creatine monohydrate, inulin, MCT oil powder, coconut milk powder, natural flavours, salt (1.9%), caramelised sugar (caramelised sugar syrup, maltodextrin, vegetable gum (415), anticaking agent (551), sweeteners (960, 957)',
    allergens: 'Milk, soy.',
    image: saltedcImg,
    image880g: saltedc880gImg
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY',
    tag: 'COLLAGEN',
    tagStyle: { bg: '#e11d48', text: '#fff' },
    stats: '25g PROTEIN | 4g CREATINE | 10g HYD. COLLAGEN',
    ingredients: 'Protein blend (51%) [whey protein concentrate, milk protein concentrate, whey protein isolate], hydrolysed collagen powder (25%), creatine monohydrate (10%), inulin, natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), natural colour (162).',
    allergens: 'Milk, soy.',
    image: strawberryImg,
    image880g: strawberry880gImg
  },
  {
    id: 'chocolate',
    name: 'CHOCOLATE',
    tag: 'BEST SELLER',
    tagStyle: { bg: '#fff', text: '#000' },
    stats: '26g PROTEIN | 4g CREATINE | 10B CFU PROBIOTICS',
    ingredients: 'Protein blend (79%) [whey protein concentrate, milk protein concentrate, whey protein isolate], (10%) creatine monohydrate, inulin, cocoa powder (4.5%), natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), probiotics (Bacillus coagulans), anticaking agent (551), acidity regulator.',
    allergens: 'Milk, soy.',
    image: chocImg,
    image880g: choc880gImg
  },
  {
    id: 'vanilla',
    name: 'VANILLA',
    tag: 'CLASSIC',
    tagStyle: { bg: '#fff', text: '#000' },
    stats: '26g PROTEIN | 4g CREATINE | 10B CFU PROBIOTICS',
    ingredients: 'Protein blend (81%) [whey protein concentrate, milk protein concentrate, whey protein isolate], (10%) creatine monohydrate, inulin, natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), probiotics (Bacillus coagulans).',
    allergens: 'Milk, soy.',
    image: vanillaImg,
    image880g: vanilla880gImg
  }
];
