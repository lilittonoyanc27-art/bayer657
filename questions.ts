export interface DialogueLine {
  speaker: string;
  speakerHy: string;
  textEs: string;
  textHy: string;
}

export interface Option {
  letter: string;
  textEs: string;
  textHy: string;
}

export interface Question {
  id: number;
  categoryEs: string;
  categoryHy: string;
  dialogue: DialogueLine[];
  options: Option[];
  correctLetter: string;
}

export const questions: Question[] = [
  {
    id: 1,
    categoryEs: "En el aeropuerto",
    categoryHy: "Աերոպորտում",
    dialogue: [
      {
        speaker: "Empleado",
        speakerHy: "Աշխատակից",
        textEs: "Buenos días. ¿Puedo ver sus pasaportes?",
        textHy: "Բարի լույս։ Կարո՞ղ եմ տեսնել ձեր անձնագրերը։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "Claro, __________",
        textHy: "Իհարկե, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "aquí los tiene.", textHy: "ահա դրանք։" },
      { letter: "B", textEs: "no tenemos hambre.", textHy: "մենք քաղցած չենք։" },
      { letter: "C", textEs: "el hotel está cerrado.", textHy: "հյուրանոցը փակ է։" },
      { letter: "D", textEs: "queremos dos cafés.", textHy: "մենք երկու սուրճ ենք ուզում։" }
    ],
    correctLetter: "A"
  },
  {
    id: 2,
    categoryEs: "Recogida de equipaje",
    categoryHy: "Ուղեբեռի ստացում",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Disculpe, no encuentro mi maleta.",
        textHy: "Ներեցեք, ես չեմ գտնում իմ ճամպրուկը։"
      },
      {
        speaker: "Empleado",
        speakerHy: "Աշխատակից",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "¿Cómo es su maleta?", textHy: "Ինչպիսի՞ն է ձեր ճամպրուկը։" },
      { letter: "B", textEs: "¿Qué quiere comer?", textHy: "Ի՞նչ եք ուզում ուտել։" },
      { letter: "C", textEs: "¿Dónde está el museo?", textHy: "Որտե՞ղ է թանգարանը։" },
      { letter: "D", textEs: "¿A qué hora se despierta?", textHy: "Ժամը քանի՞սին եք արթնանում։" }
    ],
    correctLetter: "A"
  },
  {
    id: 3,
    categoryEs: "En el taxi",
    categoryHy: "Տաքսիում",
    dialogue: [
      {
        speaker: "Taxista",
        speakerHy: "Տաքսու վարորդ",
        textEs: "¿Adónde quieren ir?",
        textHy: "Ո՞ւր եք ուզում գնալ։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Al hotel Central, por favor.", textHy: "«Սենտրալ» հյուրանոց, խնդրում եմ։" },
      { letter: "B", textEs: "Dos bocadillos, por favor.", textHy: "Երկու սենդվիչ, խնդրում եմ։" },
      { letter: "C", textEs: "No quiero esta camisa.", textHy: "Ես չեմ ուզում այս վերնաշապիկը։" },
      { letter: "D", textEs: "El museo abre mañana.", textHy: "Թանգարանը բացվում է վաղը։" }
    ],
    correctLetter: "A"
  },
  {
    id: 4,
    categoryEs: "En el hotel",
    categoryHy: "Հյուրանոցում",
    dialogue: [
      {
        speaker: "Recepcionista",
        speakerHy: "Ընդունարանի աշխատակից",
        textEs: "Buenas tardes. ¿Tienen una reserva?",
        textHy: "Բարի երեկո։ Ամրագրում ունե՞ք։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Sí, __________",
        textHy: "Այո՛, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "está a nombre de Gayane Petrosyan.", textHy: "այն Գայանե Պետրոսյանի անունով է։" },
      { letter: "B", textEs: "queremos ir a la playa.", textHy: "մենք ուզում ենք գնալ լողափ։" },
      { letter: "C", textEs: "el tren llega tarde.", textHy: "գնացքն ուշ է հասնում։" },
      { letter: "D", textEs: "esta chaqueta es pequeña.", textHy: "այս բաճկոնը փոքր է։" }
    ],
    correctLetter: "A"
  },
  {
    id: 5,
    categoryEs: "En la habitación de hotel",
    categoryHy: "Հյուրանոցի սենյակում",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Disculpe, el aire acondicionado no funciona.",
        textHy: "Ներեցեք, օդորակիչը չի աշխատում։"
      },
      {
        speaker: "Recepcionista",
        speakerHy: "Ընդունարանի աշխատակից",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Ahora enviamos a alguien para revisarlo.", textHy: "Հիմա որևէ մեկին կուղարկենք՝ այն ստուգելու։" },
      { letter: "B", textEs: "La cuenta está incluida.", textHy: "Հաշիվը ներառված է։" },
      { letter: "C", textEs: "El autobús sale a las cinco.", textHy: "Ավտոբուսը մեկնում է ժամը հինգին։" },
      { letter: "D", textEs: "Esta camiseta está de oferta.", textHy: "Այս շապիկը զեղչով է։" }
    ],
    correctLetter: "A"
  },
  {
    id: 6,
    categoryEs: "Desayuno en el hotel",
    categoryHy: "Նախաճաշ հյուրանոցում",
    dialogue: [
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "¿A qué hora sirven el desayuno?",
        textHy: "Ժամը քանի՞սին են մատուցում նախաճաշը։"
      },
      {
        speaker: "Recepcionista",
        speakerHy: "Ընդունարանի աշխատակից",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "De siete a diez de la mañana.", textHy: "Առավոտյան ժամը յոթից մինչև տասը։" },
      { letter: "B", textEs: "En la segunda calle a la derecha.", textHy: "Երկրորդ փողոցում՝ աջ կողմում։" },
      { letter: "C", textEs: "Cuesta treinta euros.", textHy: "Այն արժե երեսուն եվրո։" },
      { letter: "D", textEs: "Necesito una talla más grande.", textHy: "Ինձ ավելի մեծ չափս է պետք։" }
    ],
    correctLetter: "A"
  },
  {
    id: 7,
    categoryEs: "En la calle",
    categoryHy: "Փողոցում",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Perdone, ¿cómo podemos llegar a la Plaza Mayor?",
        textHy: "Ներեցեք, ինչպե՞ս կարող ենք հասնել Պլասա Մայոր։"
      },
      {
        speaker: "Hombre",
        speakerHy: "Տղամարդ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Sigan todo recto y giren a la izquierda.", textHy: "Շարունակեք ուղիղ և թեքվեք ձախ։" },
      { letter: "B", textEs: "La habitación está en el tercer piso.", textHy: "Սենյակը երրորդ հարկում է։" },
      { letter: "C", textEs: "Quiero pagar con tarjeta.", textHy: "Ես ուզում եմ վճարել քարտով։" },
      { letter: "D", textEs: "He perdido mi pasaporte.", textHy: "Ես կորցրել եմ անձնագիրս։" }
    ],
    correctLetter: "A"
  },
  {
    id: 8,
    categoryEs: "En el metro",
    categoryHy: "Մետրոյում",
    dialogue: [
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "Disculpe, ¿esta línea va al centro?",
        textHy: "Ներեցեք, այս գիծը գնո՞ւմ է կենտրոն։"
      },
      {
        speaker: "Mujer",
        speakerHy: "Կին",
        textEs: "No, __________",
        textHy: "Ո՛չ, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "tienen que cambiar en la próxima estación.", textHy: "դուք պետք է փոխեք գիծը հաջորդ կայարանում։" },
      { letter: "B", textEs: "la comida está muy rica.", textHy: "ուտելիքը շատ համեղ է։" },
      { letter: "C", textEs: "la tienda cierra a las nueve.", textHy: "խանութը փակվում է ժամը իննին։" },
      { letter: "D", textEs: "quiero una habitación doble.", textHy: "ես ուզում եմ երկտեղանոց սենյակ։" }
    ],
    correctLetter: "A"
  },
  {
    id: 9,
    categoryEs: "En la parada de autobús",
    categoryHy: "Ավտոբուսի կանգառում",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "¿Cuándo pasa el próximo autobús?",
        textHy: "Ե՞րբ է անցնում հաջորդ ավտոբուսը։"
      },
      {
        speaker: "Hombre",
        speakerHy: "Տղամարդ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Dentro de unos diez minutos.", textHy: "Մոտ տասը րոպեից։" },
      { letter: "B", textEs: "Desde hace dos semanas.", textHy: "Երկու շաբաթից ի վեր։" },
      { letter: "C", textEs: "Durante tres noches.", textHy: "Երեք գիշերվա ընթացքում։" },
      { letter: "D", textEs: "A nombre de Gor.", textHy: "Գոռի անունով։" }
    ],
    correctLetter: "A"
  },
  {
    id: 10,
    categoryEs: "En la estación de tren",
    categoryHy: "Կայարանում",
    dialogue: [
      {
        speaker: "Empleado",
        speakerHy: "Աշխատակից",
        textEs: "¿Quieren un billete de ida o de ida y vuelta?",
        textHy: "Ուզո՞ւմ եք մեկ ուղղությամբ, թե գնալու և վերադառնալու տոմս։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "De ida y vuelta, por favor.", textHy: "Գնալու և վերադառնալու, խնդրում եմ։" },
      { letter: "B", textEs: "La cuenta, por favor.", textHy: "Հաշիվը, խնդրում եմ։" },
      { letter: "C", textEs: "Sin azúcar, por favor.", textHy: "Առանց շաքարի, խնդրում եմ։" },
      { letter: "D", textEs: "Una talla más pequeña.", textHy: "Մեկ չափս փոքր։" }
    ],
    correctLetter: "A"
  },
  {
    id: 11,
    categoryEs: "Retraso del tren",
    categoryHy: "Գնացքը ուշանում է",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "¿Por qué todavía no ha llegado el tren?",
        textHy: "Ինչո՞ւ գնացքը դեռ չի հասել։"
      },
      {
        speaker: "Empleado",
        speakerHy: "Աշխատակից",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Lleva veinte minutos de retraso.", textHy: "Այն քսան րոպե ուշանում է։" },
      { letter: "B", textEs: "El desayuno está incluido.", textHy: "Նախաճաշը ներառված է։" },
      { letter: "C", textEs: "La farmacia está cerrada.", textHy: "Դեղատունը փակ է։" },
      { letter: "D", textEs: "No aceptamos devoluciones.", textHy: "Մենք վերադարձ չենք ընդունում։" }
    ],
    correctLetter: "A"
  },
  {
    id: 12,
    categoryEs: "En la cafetería",
    categoryHy: "Սրճարանում",
    dialogue: [
      {
        speaker: "Camarero",
        speakerHy: "Մատուցող",
        textEs: "Buenas tardes. ¿Qué van a tomar?",
        textHy: "Բարի երեկո։ Ի՞նչ եք խմելու։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Para mí, un café con leche.", textHy: "Ինձ համար՝ կաթով սուրճ։" },
      { letter: "B", textEs: "Quiero una habitación tranquila.", textHy: "Ես հանգիստ սենյակ եմ ուզում։" },
      { letter: "C", textEs: "Vamos a visitar el museo.", textHy: "Մենք պատրաստվում ենք այցելել թանգարան։" },
      { letter: "D", textEs: "El autobús está lleno.", textHy: "Ավտոբուսը լիքն է։" }
    ],
    correctLetter: "A"
  },
  {
    id: 13,
    categoryEs: "En el restaurante",
    categoryHy: "Ռեստորանում",
    dialogue: [
      {
        speaker: "Camarero",
        speakerHy: "Մատուցող",
        textEs: "¿Ya saben qué van a pedir?",
        textHy: "Արդեն գիտե՞ք՝ ինչ եք պատվիրելու։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "Sí, __________",
        textHy: "Այո՛, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "yo voy a tomar la paella.", textHy: "ես պաելյա եմ վերցնելու։" },
      { letter: "B", textEs: "la estación está lejos.", textHy: "կայարանը հեռու է։" },
      { letter: "C", textEs: "hemos perdido las llaves.", textHy: "մենք կորցրել ենք բանալիները։" },
      { letter: "D", textEs: "mañana vamos al museo.", textHy: "վաղը գնում ենք թանգարան։" }
    ],
    correctLetter: "A"
  },
  {
    id: 14,
    categoryEs: "Error en el pedido",
    categoryHy: "Սխալ պատվերում",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Disculpe, yo he pedido una ensalada, no una sopa.",
        textHy: "Ներեցեք, ես աղցան եմ պատվիրել, ոչ թե ապուր։"
      },
      {
        speaker: "Camarero",
        speakerHy: "Մատուցող",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Lo siento, ahora mismo se la cambio.", textHy: "Ներեցեք, հենց հիմա այն կփոխեմ։" },
      { letter: "B", textEs: "El museo cierra a las seis.", textHy: "Թանգարանը փակվում է ժամը վեցին։" },
      { letter: "C", textEs: "No hay habitaciones libres.", textHy: "Ազատ սենյակներ չկան։" },
      { letter: "D", textEs: "El autobús pasa cada hora.", textHy: "Ավտոբուսն անցնում է ամեն ժամ։" }
    ],
    correctLetter: "A"
  },
  {
    id: 15,
    categoryEs: "Pedir la cuenta",
    categoryHy: "Հաշիվը խնդրելը",
    dialogue: [
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "Disculpe, __________",
        textHy: "Ներեցեք, __________"
      },
      {
        speaker: "Camarero",
        speakerHy: "Մատուցող",
        textEs: "Claro, ahora mismo.",
        textHy: "Իհարկե, հենց հիմա։"
      }
    ],
    options: [
      { letter: "A", textEs: "¿nos puede traer la cuenta?", textHy: "կարո՞ղ եք մեզ հաշիվը բերել։" },
      { letter: "B", textEs: "¿dónde está la estación?", textHy: "որտե՞ղ է կայարանը։" },
      { letter: "C", textEs: "¿tiene una talla más grande?", textHy: "ավելի մեծ չափս ունե՞ք։" },
      { letter: "D", textEs: "¿a qué hora abre el museo?", textHy: "ժամը քանի՞սին է բացվում թանգարանը։" }
    ],
    correctLetter: "A"
  },
  {
    id: 16,
    categoryEs: "Pago en el restaurante",
    categoryHy: "Վճարում ռեստորանում",
    dialogue: [
      {
        speaker: "Camarero",
        speakerHy: "Մատուցող",
        textEs: "¿Van a pagar juntos o por separado?",
        textHy: "Միասի՞ն եք վճարելու, թե առանձին։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Juntos, por favor.", textHy: "Միասին, խնդրում եմ։" },
      { letter: "B", textEs: "En el segundo piso.", textHy: "Երկրորդ հարկում։" },
      { letter: "C", textEs: "Durante una semana.", textHy: "Մեկ շաբաթվա ընթացքում։" },
      { letter: "D", textEs: "A las ocho y media.", textHy: "Ժամը ութ անց կես։" }
    ],
    correctLetter: "A"
  },
  {
    id: 17,
    categoryEs: "En la tienda de ropa",
    categoryHy: "Հագուստի խանութում",
    dialogue: [
      {
        speaker: "Dependienta",
        speakerHy: "Վաճառողուհի",
        textEs: "¿En qué puedo ayudarla?",
        textHy: "Ինչո՞վ կարող եմ օգնել ձեզ։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Busco un vestido para una cena.", textHy: "Ես ընթրիքի համար զգեստ եմ փնտրում։" },
      { letter: "B", textEs: "Necesito comprar un billete de tren.", textHy: "Ինձ պետք է գնացքի տոմս գնել։" },
      { letter: "C", textEs: "Quiero reservar una habitación.", textHy: "Ես ուզում եմ սենյակ ամրագրել։" },
      { letter: "D", textEs: "He perdido mi teléfono.", textHy: "Ես կորցրել եմ հեռախոսս։" }
    ],
    correctLetter: "A"
  },
  {
    id: 18,
    categoryEs: "Talla de ropa",
    categoryHy: "Հագուստի չափսը",
    dialogue: [
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "Esta camisa me queda pequeña.",
        textHy: "Այս վերնաշապիկն ինձ փոքր է։"
      },
      {
        speaker: "Dependiente",
        speakerHy: "Վաճառող",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Le traigo una talla más grande.", textHy: "Ձեզ ավելի մեծ չափս կբերեմ։" },
      { letter: "B", textEs: "El tren sale del andén cinco.", textHy: "Գնացքը մեկնում է հինգերորդ հարթակից։" },
      { letter: "C", textEs: "El desayuno termina a las diez.", textHy: "Նախաճաշն ավարտվում է ժամը տասին։" },
      { letter: "D", textEs: "Tiene que cambiar de línea.", textHy: "Դուք պետք է փոխեք գիծը։" }
    ],
    correctLetter: "A"
  },
  {
    id: 19,
    categoryEs: "Devolución de producto",
    categoryHy: "Ապրանքի վերադարձ",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Quisiera devolver estos zapatos.",
        textHy: "Ես կցանկանայի վերադարձնել այս կոշիկները։"
      },
      {
        speaker: "Dependienta",
        speakerHy: "Վաճառողուհի",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "¿Tiene el recibo?", textHy: "Կտրոնն ունե՞ք։" },
      { letter: "B", textEs: "¿Quiere algo para beber?", textHy: "Խմելու որևէ բան ուզո՞ւմ եք։" },
      { letter: "C", textEs: "¿Cuántas noches se queda?", textHy: "Քանի՞ գիշեր եք մնում։" },
      { letter: "D", textEs: "¿Ha visitado Barcelona?", textHy: "Այցելե՞լ եք Բարսելոնա։" }
    ],
    correctLetter: "A"
  },
  {
    id: 20,
    categoryEs: "En el museo",
    categoryHy: "Թանգարանում",
    dialogue: [
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "¿Podemos hacer fotos aquí?",
        textHy: "Կարո՞ղ ենք այստեղ լուսանկարել։"
      },
      {
        speaker: "Empleado",
        speakerHy: "Աշխատակից",
        textEs: "Sí, pero __________",
        textHy: "Այո՛, բայց __________"
      }
    ],
    options: [
      { letter: "A", textEs: "sin flash.", textHy: "առանց լուսարձակի։" },
      { letter: "B", textEs: "sin billete.", textHy: "առանց տոմսի։" },
      { letter: "C", textEs: "sin desayuno.", textHy: "առանց նախաճաշի։" },
      { letter: "D", textEs: "sin maleta.", textHy: "առանց ճամպրուկի։" }
    ],
    correctLetter: "A"
  },
  {
    id: 21,
    categoryEs: "Excursión",
    categoryHy: "Էքսկուրսիա",
    dialogue: [
      {
        speaker: "Guía",
        speakerHy: "Էքսկուրսավար",
        textEs: "La visita empieza dentro de cinco minutos.",
        textHy: "Այցելությունը սկսվում է հինգ րոպեից։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Perfecto, __________",
        textHy: "Հիանալի է, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "esperamos aquí.", textHy: "մենք այստեղ կսպասենք։" },
      { letter: "B", textEs: "pagamos por separado.", textHy: "մենք առանձին ենք վճարում։" },
      { letter: "C", textEs: "necesito otra talla.", textHy: "ինձ ուրիշ չափս է պետք։" },
      { letter: "D", textEs: "el tren está lleno.", textHy: "գնացքը լիքն է։" }
    ],
    correctLetter: "A"
  },
  {
    id: 22,
    categoryEs: "Pedir una foto",
    categoryHy: "Խնդրել լուսանկարել",
    dialogue: [
      {
        speaker: "Mujer",
        speakerHy: "Կին",
        textEs: "¿Quieren que les haga una foto?",
        textHy: "Ուզո՞ւմ եք՝ ձեզ լուսանկարեմ։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Sí, muchas gracias.", textHy: "Այո՛, շատ շնորհակալություն։" },
      { letter: "B", textEs: "No, la cuenta está mal.", textHy: "Ո՛չ, հաշիվը սխալ է։" },
      { letter: "C", textEs: "Sí, tenemos una reserva.", textHy: "Այո՛, մենք ամրագրում ունենք։" },
      { letter: "D", textEs: "No, quiero una camisa azul.", textHy: "Ո՛չ, ես կապույտ վերնաշապիկ եմ ուզում։" }
    ],
    correctLetter: "A"
  },
  {
    id: 23,
    categoryEs: "Conocer a un local",
    categoryHy: "Ծանոթություն տեղաբնակի հետ",
    dialogue: [
      {
        speaker: "Hombre",
        speakerHy: "Տղամարդ",
        textEs: "¿De dónde son?",
        textHy: "Որտեղի՞ց եք։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Somos de Armenia.", textHy: "Մենք Հայաստանից ենք։" },
      { letter: "B", textEs: "Estamos en el hotel.", textHy: "Մենք հյուրանոցում ենք։" },
      { letter: "C", textEs: "Vamos en autobús.", textHy: "Մենք գնում ենք ավտոբուսով։" },
      { letter: "D", textEs: "Tenemos dos maletas.", textHy: "Մենք երկու ճամպրուկ ունենք։" }
    ],
    correctLetter: "A"
  },
  {
    id: 24,
    categoryEs: "Primera vez en España",
    categoryHy: "Առաջին անգամ Իսպանիայում",
    dialogue: [
      {
        speaker: "Mujer",
        speakerHy: "Կին",
        textEs: "¿Es la primera vez que vienen a España?",
        textHy: "Առաջին անգա՞մ եք գալիս Իսպանիա։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "No, __________",
        textHy: "Ո՛չ, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "ya estuvimos aquí el año pasado.", textHy: "մենք արդեն այստեղ եղել ենք անցյալ տարի։" },
      { letter: "B", textEs: "el museo está cerrado hoy.", textHy: "թանգարանն այսօր փակ է։" },
      { letter: "C", textEs: "queremos pagar con tarjeta.", textHy: "մենք ուզում ենք վճարել քարտով։" },
      { letter: "D", textEs: "la habitación no está limpia.", textHy: "սենյակը մաքուր չէ։" }
    ],
    correctLetter: "A"
  },
  {
    id: 25,
    categoryEs: "Planes para la noche",
    categoryHy: "Երեկոյան ծրագրեր",
    dialogue: [
      {
        speaker: "Amigo",
        speakerHy: "Ընկեր",
        textEs: "¿Qué planes tienen para esta noche?",
        textHy: "Ի՞նչ ծրագրեր ունեք այս երեկոյի համար։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Vamos a cenar en el centro.", textHy: "Մենք պատրաստվում ենք ընթրել կենտրոնում։" },
      { letter: "B", textEs: "El tren llegó con retraso.", textHy: "Գնացքն ուշացումով հասավ։" },
      { letter: "C", textEs: "La tienda está de oferta.", textHy: "Խանութում զեղչ է։" },
      { letter: "D", textEs: "La habitación tiene balcón.", textHy: "Սենյակն ունի պատշգամբ։" }
    ],
    correctLetter: "A"
  },
  {
    id: 26,
    categoryEs: "Invitación",
    categoryHy: "Հրավեր",
    dialogue: [
      {
        speaker: "Amigo",
        speakerHy: "Ընկեր",
        textEs: "¿Les apetece venir con nosotros al concierto?",
        textHy: "Ցանկանո՞ւմ եք մեզ հետ գալ համերգի։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Claro, nos encantaría.", textHy: "Իհարկե, մեծ հաճույքով։" },
      { letter: "B", textEs: "No, el equipaje está aquí.", textHy: "Ո՛չ, ուղեբեռն այստեղ է։" },
      { letter: "C", textEs: "Sí, la farmacia está cerca.", textHy: "Այո՛, դեղատունը մոտ է։" },
      { letter: "D", textEs: "No, quiero devolverlo.", textHy: "Ո՛չ, ես ուզում եմ այն վերադարձնել։" }
    ],
    correctLetter: "A"
  },
  {
    id: 27,
    categoryEs: "En la farmacia",
    categoryHy: "Դեղատանը",
    dialogue: [
      {
        speaker: "Farmacéutico",
        speakerHy: "Դեղագործ",
        textEs: "¿Qué le pasa?",
        textHy: "Ի՞նչ է պատահել ձեզ։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Me duele la garganta y tengo tos.", textHy: "Կոկորդս ցավում է և հազ ունեմ։" },
      { letter: "B", textEs: "Quiero una habitación con balcón.", textHy: "Ես պատշգամբով սենյակ եմ ուզում։" },
      { letter: "C", textEs: "Necesito un billete de ida.", textHy: "Ինձ մեկ ուղղությամբ տոմս է պետք։" },
      { letter: "D", textEs: "Busco una camiseta blanca.", textHy: "Ես սպիտակ շապիկ եմ փնտրում։" }
    ],
    correctLetter: "A"
  },
  {
    id: 28,
    categoryEs: "Teléfono perdido",
    categoryHy: "Կորած հեռախոս",
    dialogue: [
      {
        speaker: "Policía",
        speakerHy: "Ոստիկան",
        textEs: "¿Dónde vio su teléfono por última vez?",
        textHy: "Որտե՞ղ եք վերջին անգամ տեսել ձեր հեռախոսը։"
      },
      {
        speaker: "Gor",
        speakerHy: "Գոռ",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "Creo que lo dejé en el taxi.", textHy: "Կարծում եմ՝ այն թողել եմ տաքսիում։" },
      { letter: "B", textEs: "Quiero reservar una mesa.", textHy: "Ես ուզում եմ սեղան ամրագրել։" },
      { letter: "C", textEs: "La comida estaba muy buena.", textHy: "Ուտելիքը շատ համեղ էր։" },
      { letter: "D", textEs: "Llegaremos mañana por la mañana.", textHy: "Մենք կհասնենք վաղը առավոտյան։" }
    ],
    correctLetter: "A"
  },
  {
    id: 29,
    categoryEs: "Cambio de reserva",
    categoryHy: "Ամրագրման փոփոխություն",
    dialogue: [
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Necesitamos cambiar la fecha de nuestra reserva.",
        textHy: "Մենք պետք է փոխենք մեր ամրագրման ամսաթիվը։"
      },
      {
        speaker: "Recepcionista",
        speakerHy: "Ընդունարանի աշխատակից",
        textEs: "__________",
        textHy: "__________"
      }
    ],
    options: [
      { letter: "A", textEs: "¿Para qué fecha quieren cambiarla?", textHy: "Ո՞ր ամսաթվով եք ուզում փոխել այն։" },
      { letter: "B", textEs: "¿Qué quieren pedir de comer?", textHy: "Ի՞նչ եք ուզում պատվիրել ուտելու համար։" },
      { letter: "C", textEs: "¿Dónde compraron esta maleta?", textHy: "Որտե՞ղ եք գնել այս ճամպրուկը։" },
      { letter: "D", textEs: "¿Cuánto cuesta el autobús?", textHy: "Որքա՞ն արժե ավտոբուսը։" }
    ],
    correctLetter: "A"
  },
  {
    id: 30,
    categoryEs: "Malentendido",
    categoryHy: "Չհասկանալ զրուցակցին",
    dialogue: [
      {
        speaker: "Hombre",
        speakerHy: "Տղամարդ",
        textEs: "Tienen que coger la segunda calle y después cruzar la plaza.",
        textHy: "Դուք պետք է մտնեք երկրորդ փողոցը, ապա անցնեք հրապարակը։"
      },
      {
        speaker: "Gayane",
        speakerHy: "Գայանե",
        textEs: "Perdone, __________",
        textHy: "Ներեցեք, __________"
      }
    ],
    options: [
      { letter: "A", textEs: "¿puede repetirlo un poco más despacio?", textHy: "կարո՞ղ եք դա մի փոքր ավելի դանդաղ կրկնել։" },
      { letter: "B", textEs: "¿puede traer la cuenta?", textHy: "կարո՞ղ եք հաշիվը բերել։" },
      { letter: "C", textEs: "¿tiene una talla más grande?", textHy: "ավելի մեծ չափս ունե՞ք։" },
      { letter: "D", textEs: "¿está incluido el desayuno?", textHy: "նախաճաշը ներառվա՞ծ է։" }
    ],
    correctLetter: "A"
  }
];
