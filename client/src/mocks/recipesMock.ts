import type { Recipe } from "../types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Moqueca Baiana",
    imgUrl:
      "https://images.unsplash.com/photo-1696071506684-98cc784a89df?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Almoço",
    prepTime: 45,
    ingredients: [
      {
        id: "1",
        name: "Peixe",
        amount: "1 kg",
      },
      {
        id: "2",
        name: "Cebola",
        amount: "1",
      },
      {
        id: "3",
        name: "Alho",
        amount: "2 dentes",
      },
      {
        id: "4",
        name: "Leite de coco",
        amount: "1 xícara",
      },
    ],
    instructions: [
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
      "https://plus.unsplash.com/premium_photo-1723579374186-cca58e8672d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJlYW4lMjBzb3VwfGVufDB8fDB8fHww",
    category: "Jantar",
    prepTime: 120,
    ingredients: [
      {
        id: "5",
        name: "Feijão",
        amount: "1 kg",
      },
      {
        id: "6",
        name: "Carne de porco",
        amount: "500 g",
      },
      {
        id: "7",
        name: "Cebola",
        amount: "1",
      },
      {
        id: "8",
        name: "Alho",
        amount: "2 dentes",
      },
    ],
    instructions: [
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
        id: "12",
        name: "Queijo parmesão",
        amount: "100 g",
      },
      {
        id: "13",
        name: "Farinha de mandioca",
        amount: "2 xícaras",
      },
      {
        id: "14",
        name: "Ovo",
        amount: "1",
      },
    ],
    instructions: [
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
        id: "15",
        name: "Leite condensado",
        amount: "1 lata",
      },
      {
        id: "16",
        name: "Manteiga",
        amount: "100 g",
      },
      {
        id: "17",
        name: "Chocolate em pó",
        amount: "1 xícara",
      },
    ],
    instructions: [
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
        id: "21",
        name: "Farinha de trigo",
        amount: "2 xícaras",
      },
      {
        id: "22",
        name: "Frango desfiado",
        amount: "200 g",
      },
      {
        id: "23",
        name: "Manteiga",
        amount: "50 g",
      },
    ],
    instructions: [
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
      "https://plus.unsplash.com/premium_photo-1664478291780-0c67f5fb15e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVzcGFndWV0ZSUyMGElMjBib2xvbmhlc2F8ZW58MHx8MHx8fDA%3D",
    category: "Massas",
    prepTime: 25,
    ingredients: [
      {
        id: "24",
        name: "Espaguete",
        amount: "200 g",
      },
      {
        id: "25",
        name: "Carne moída",
        amount: "300 g",
      },
      {
        id: "26",
        name: "Tomate pelado",
        amount: "1 lata",
      },
    ],
    instructions: [
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
        id: "27",
        name: "Tomate",
        amount: "2 unidades",
      },
      {
        id: "28",
        name: "Muçarela",
        amount: "100 g",
      },
      {
        id: "29",
        name: "Manjericão",
        amount: "1 xícara",
      },
    ],
    instructions: [
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
        id: "30",
        name: "Cebola",
        amount: "1 unidade",
      },
      {
        id: "31",
        name: "Gengibre",
        amount: "1 pedaço",
      },
      {
        id: "32",
        name: "Limão",
        amount: "1 unidade",
      },
    ],
    instructions: [
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
        id: "33",
        name: "Chocolate em pó",
        amount: "100 g",
      },
      {
        id: "34",
        name: "Leite condensado",
        amount: "1 lata",
      },
      {
        id: "35",
        name: "Massa de bolo",
        amount: "1 pacote",
      },
    ],
    instructions: [
      "Em uma tigela, misture o chocolate em pó com o leite condensado.",
      "Adicione a massa de bolo e misture bem.",
      "Forme pequenas camadas e coloque em um refratário.",
      "Sirva gelado.",
    ],
  }
];
