// esse arquivo simula um banco de dados

import type { Recipe } from "../types/recipe.ts";

export const recipesData: Recipe[] = [
  {
    id: "1",
    title: "Moqueca Baiana",
    imgUrl:
      "https://images.unsplash.com/photo-1696071506684-98cc784a89df?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Almoço",
    prepTime: 45,
    ingredients: [
      {
        id: "ing-1-1",
        name: "Peixe em postas",
        amount: 1,
        unit: "kg",
        description: "1 kg de peixe fresco em postas (cação ou robalo)",
      },
      {
        id: "ing-1-2",
        name: "Cebola",
        amount: 1,
        unit: "unidade",
        description: "1 cebola média fatiada",
      },
      {
        id: "ing-1-3",
        name: "Alho",
        amount: 2,
        unit: "dentes",
        description: "2 dentes de alho amassados",
      },
      {
        id: "ing-1-4",
        name: "Leite de coco",
        amount: 1,
        unit: "xícara",
        description: "1 xícara de leite de coco",
      },
    ],
    steps: [
      "Corte o peixe em pedaços e tempere com sal e pimenta.",
      "Em uma panela, refogue a cebola e o alho até murchar.",
      "Adicione o peixe e cozinhe por 10 minutos.",
      "Desligue o fogo e adicione o leite de coco.",
    ],
  },
  {
    id: "2",
    title: "Feijoada Completa",
    imgUrl:
      "https://images.pexels.com/photos/34234280/pexels-photo-34234280.png?_gl=1*1gro91b*_ga*MjA2NDE0MDc2MS4xNzc0NjQyNjUy*_ga_8JE65Q40S6*czE3OTA3MzMxOTAkbzEzJGcxJHQxNzkwNzMzMzQyJGo2MCRsMCRoMA..",
    category: "Jantar",
    prepTime: 120,
    ingredients: [
      {
        id: "ing-2-1",
        name: "Feijão preto",
        amount: 1,
        unit: "kg",
        description: "1 kg de feijão preto",
      },
      {
        id: "ing-2-2",
        name: "Carne de porco",
        amount: 500,
        unit: "g",
        description: "500 g de carne de porco (lombo, costelinha ou paio)",
      },
      {
        id: "ing-2-3",
        name: "Cebola",
        amount: 1,
        unit: "unidade",
        description: "1 cebola grande picada",
      },
      {
        id: "ing-2-4",
        name: "Alho",
        amount: 2,
        unit: "dentes",
        description: "2 dentes de alho picados",
      },
    ],
    steps: [
      "Lave o feijão e deixe de molho por 2 horas.",
      "Em uma panela, refogue a cebola e o alho até murchar.",
      "Adicione a carne de porco e cozinhe até dourar.",
      "Junte o feijão e cubra com água. Cozinhe até o feijão estar macio.",
    ],
  },
  {
    id: "3",
    title: "Pão de Queijo",
    imgUrl:
      "https://images.unsplash.com/photo-1598142982901-df6cec10ae35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D",
    category: "Café da manhã",
    prepTime: 20,
    ingredients: [
      {
        id: "ing-3-1",
        name: "Queijo parmesão",
        amount: 100,
        unit: "g",
        description: "100 g de queijo parmesão ralado",
      },
      {
        id: "ing-3-2",
        name: "Farinha de mandioca",
        amount: 2,
        unit: "xícaras",
        description: "2 xícaras de polvilho/farinha de mandioca",
      },
      {
        id: "ing-3-3",
        name: "Ovo",
        amount: 1,
        unit: "unidade",
        description: "1 ovo",
      },
    ],
    steps: [
      "Em uma tigela, misture o queijo parmesão com a farinha de mandioca.",
      "Adicione o ovo e misture bem.",
      "Forme pequenas bolas e coloque em uma assadeira.",
      "Asse em forno preaquecido a 200°C por 15 minutos.",
    ],
  },
  {
    id: "4",
    title: "Brigadeiro",
    imgUrl:
      "https://images.unsplash.com/photo-1702982841001-f65535a5a40b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D",
    category: "Doces",
    prepTime: 20,
    ingredients: [
      {
        id: "ing-4-1",
        name: "Leite condensado",
        amount: 1,
        unit: "lata",
        description: "1 lata de leite condensado",
      },
      {
        id: "ing-4-2",
        name: "Manteiga",
        amount: 100,
        unit: "g",
        description: "100 g de manteiga",
      },
      {
        id: "ing-4-3",
        name: "Chocolate em pó",
        amount: 1,
        unit: "xícara",
        description: "1 xícara de chocolate em pó",
      },
    ],
    steps: [
      "Em uma panela, misture o leite condensado com a manteiga.",
      "Cozinhe em fogo médio, mexendo constantemente.",
      "Adicione o chocolate em pó e continue mexendo até formar uma bola.",
      "Deixe esfriar e forme pequenas bolas.",
    ],
  },
  {
    id: "5",
    title: "Coxinha de Frango",
    imgUrl:
      "https://images.pexels.com/photos/4842865/pexels-photo-4842865.jpeg?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D",
    category: "Lanches",
    prepTime: 30,
    ingredients: [
      {
        id: "ing-5-1",
        name: "Farinha de trigo",
        amount: 2,
        unit: "xícaras",
        description: "2 xícaras de farinha de trigo",
      },
      {
        id: "ing-5-2",
        name: "Frango desfiado",
        amount: 200,
        unit: "g",
        description: "200 g de frango desfiado e temperado",
      },
      {
        id: "ing-5-3",
        name: "Manteiga",
        amount: 50,
        unit: "g",
        description: "50 g de manteiga",
      },
    ],
    steps: [
      "Em uma tigela, misture a farinha de trigo com o frango desfiado.",
      "Adicione a manteiga e misture bem.",
      "Forme pequenas bolas e frite em óleo quente.",
      "Sirva quente com maionese.",
    ],
  },
  {
    id: "6",
    title: "Espaguete à Bolonhesa",
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/10/12/22/09/spaghetti-bolognese-7517639_1280.jpg",
    category: "Massas",
    prepTime: 25,
    ingredients: [
      {
        id: "ing-6-1",
        name: "Espaguete",
        amount: 200,
        unit: "g",
        description: "200 g de espaguete",
      },
      {
        id: "ing-6-2",
        name: "Carne moída",
        amount: 300,
        unit: "g",
        description: "300 g de carne moída",
      },
      {
        id: "ing-6-3",
        name: "Tomate pelado",
        amount: 1,
        unit: "lata",
        description: "1 lata de tomate pelado",
      },
    ],
    steps: [
      "Em uma panela, refogue a cebola e o alho até murchar.",
      "Adicione a carne moída e cozinhe até dourar.",
      "Junte o tomate pelado e cozinhe por alguns minutos.",
      "Sirva o molho sobre o espaguete.",
    ],
  }, 
  {
    id: "7",
    title: "Salada Caprese",
    imgUrl:
      "https://images.unsplash.com/photo-1595587870672-c79b47875c6a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FwcmVzZSUyMHNhbGFkfGVufDB8fDB8fHww",
    category: "Vegetariano",
    prepTime: 15,
    ingredients: [
      {
        id: "ing-7-1",
        name: "Tomate",
        amount: 2,
        unit: "unidades",
        description: "2 tomates médios fatiados",
      },
      {
        id: "ing-7-2",
        name: "Muçarela de búfala",
        amount: 100,
        unit: "g",
        description: "100 g de muçarela de búfala fatiada",
      },
      {
        id: "ing-7-3",
        name: "Manjericão",
        amount: 1,
        unit: "xícara",
        description: "1 xícara de folhas de manjericão fresco",
      },
    ],
    steps: [
      "Corte o tomate em fatias e coloque em uma tigela.",
      "Adicione a muçarela e o manjericão.",
      "Tempere com sal, pimenta e azeite.",
      "Sirva frio.",
    ],
  },
  {
    id: "8",
    title: "Suco Detox",
    imgUrl:
      "https://images.unsplash.com/flagged/photo-1557753478-b9fb74f39eb5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV0b3glMjBqdWljZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Bebidas",
    prepTime: 10,
    ingredients: [
      {
        id: "ing-8-1",
        name: "Cebola",
        amount: 1,
        unit: "unidade",
        description: "1 unidade de cebola",
      },
      {
        id: "ing-8-2",
        name: "Gengibre",
        amount: 1,
        unit: "pedaço",
        description: "1 pedaço pequeno de gengibre",
      },
      {
        id: "ing-8-3",
        name: "Limão",
        amount: 1,
        unit: "unidade",
        description: "1 unidade de limão espremido",
      },
    ],
    steps: [
      "Corte a cebola e o gengibre em pedaços pequenos.",
      "Junte todos os ingredientes em um liquidificador.",
      "Bata até obter uma mistura homogênea.",
      "Coando o suco, sirva gelado.",
    ],
  },
  {
    id: "9",
    title: "Pavê de Chocolate",
    imgUrl:
      "https://images.unsplash.com/photo-1678436655716-3f33818e5311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QnJhemlsaWFuJTIwY2hvY29sYXRlJTIwdHJpZmxlfGVufDB8fDB8fHww",
    category: "Sobremesas",
    prepTime: 30,
    ingredients: [
      {
        id: "ing-9-1",
        name: "Chocolate em pó",
        amount: 100,
        unit: "g",
        description: "100 g de chocolate em pó",
      },
      {
        id: "ing-9-2",
        name: "Leite condensado",
        amount: 1,
        unit: "lata",
        description: "1 lata de leite condensado",
      },
      {
        id: "ing-9-3",
        name: "Biscoit/Massa de bolo",
        amount: 1,
        unit: "pacote",
        description: "1 pacote de biscoito champagne ou massa de bolo",
      },
    ],
    steps: [
      "Em uma tigela, misture o chocolate em pó com o leite condensado.",
      "Adicione a massa de bolo e misture bem.",
      "Forme pequenas camadas e coloque em um refratário.",
      "Sirva gelado.",
    ],
  },
];
