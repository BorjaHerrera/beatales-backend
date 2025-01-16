const beatlesSongs = [
  {
    name: 'Let it Be',
    story:
      'Nació de un sueño que tuvo Paul McCartney en un momento de crisis personal. En el sueño, su madre fallecida, Mary, lo consolaba y le decía: Let it be. Inspirado por este encuentro, Paul escribió la canción al día siguiente. Aunque algunos interpretan la frase Mother Mary como una referencia religiosa, McCartney ha aclarado que es un tributo a su madre, quien murió cuando él tenía solo 14 años.',
    youtube: 'https://music.youtube.com/watch?v=CGj85pVzRJs&si=q-mbdfZZGb4yRsB8'
  },
  {
    name: 'Hey Jude',
    story:
      "Aunque todos creen que Hey Jude es sobre un amor perdido, en realidad fue escrita por Paul McCartney para consolar a Julian Lennon, el hijo de John Lennon, durante el proceso de divorcio de sus padres. McCartney pensó que la canción podría animar a Julian a superar las dificultades emocionales. El título original era 'Hey Jules'. Lo cambió por 'Jude' porque pensó que sonaba mejor.",
    youtube: 'https://music.youtube.com/watch?v=mQER0A0ej0M&si=DeGG9G4hrxScajir'
  },
  {
    name: 'Yesterday',
    story:
      'Paul McCartney compuso Yesterday en 1965, pero la melodía le llegó de una manera muy peculiar. La música se le ocurrió mientras dormía. Una mañana corrió al piano para tocarla para no olvidarla. Al principio, no estaba seguro de si había creado la canción o si la había escuchado antes, así que se la mostró a varias personas. Como aún no tenía letra, Paul improvisó unas palabras para acompañar la melodía. Scrambled eggs, oh my baby how I love your legs, not as much as I love scrambled eggs, oh we should eat some scrambled eggs.',
    youtube: 'https://music.youtube.com/watch?v=TQemQRL_YVQ&si=avCxnBJ63Nvz6bGO'
  },
  {
    name: 'Being for the Benefit of Mr Kite',
    story:
      'La letra es el anuncio de un circo victoriano y sale de un cartel que Lennon compró, que describía los diferentes artistas que participaban en él. No es literalmente lo mismo, porque Lennon tuvo que hacer una letra con sus versos pero si ves el cartel reconoces un montón de frases. De hecho se venden facsímiles del cartel hoy, lo puedes encontrar en Internet.',
    youtube: 'https://music.youtube.com/watch?v=bJVWZy4QOy0&si=O3BQULBmrPTVTU8Y'
  },
  {
    name: 'Eleanor Rigby',
    story:
      'Aunque mucha gente supone que Eleanor Rigby es una canción de Paul, lo cierto es que en cierto modo fue una composición de todos los Beatles. La letra la hicieron hablando los cuatro y probando diferentes versos. En la primera versión Father MacKenzie era Father McCartney, pero no querían hacer referencia a uno de los miembros, así que buscaron en la guía telefónica y el primer apellido que les encajó fue McKenzie o McKenzie. Además, el icónico arreglo de cuerdas fue creado por George Martin, el productor de los Beatles, y se inspiró en el estilo del compositor Bernard Herrmann.',
    youtube: 'https://music.youtube.com/watch?v=HuS5NuXRb5Y&si=0Hto_94cewynh04a'
  },
  {
    name: 'Strawberry Fields Forever',
    story:
      'Strawberry Fields Forever fue una canción inusualmente larga en su grabación. Lennon no estaba seguro de qué tipo de arreglo deseaba y se fueron probando diferentes opciones, con cuerdas, vientos... Finalmente, se resolvió que la mitad de la canción se tomaría de una de las versiones completadas y la otra mitad de la otra. Aunque las grabaciones no coincidían en tempo ni tonalidad, lograron ajustarlas con modificaciones que hicieron posible la transición entre ambas.',
    youtube: 'https://music.youtube.com/watch?v=HtUH9z_Oey8&si=iXxhkRsasBkgUmrR'
  },
  {
    name: 'Dear Prudence',
    story:
      "Fue escrita para Prudence Farrow, hermana de Mia Farrow. Ambas estaban con los Beatles en Rishikesh, India, en 1968, para estudiar meditación trascendental con el Maharishi Mahesh Yogi. Prudence se tomó la práctica muy en serio, pasando largos períodos aislada meditando, lo que preocupó a los demás. Lennon compuso la canción como un llamado cariñoso para que 'saliera a jugar'.",
    youtube: 'https://music.youtube.com/watch?v=wQA59IkCF5I&si=lStOx-483ZXLOHPY'
  },
  {
    name: 'Sexy Sadie',
    story:
      'Fue escrita por Lennon como una crítica al Maharishi Mahesh Yogi. Lennon se desilusionó profundamente tras rumores de que el Maharishi había tenido comportamientos inapropiados, presuntamente hacia Mia Farrow. Aunque no hay pruebas concluyentes de estos rumores, la percepción de Lennon hacia el gurú cambió drásticamente, llevándolo a escribir la canción como un reproche.',
    youtube: 'https://music.youtube.com/watch?v=tSk5U4oHhu0&si=2Yu0KkCfuTy6J2tq'
  },
  {
    name: 'Golden Slumbers',
    story:
      'Golden Slumbers es una canción inspirada por una vieja partitura a la que Paul tuvo acceso. Aunque el documento contenía la letra, la música del pentagrama no era clara, así que Paul compuso una melodía basada en la letra.',
    youtube: 'https://music.youtube.com/watch?v=AcQjM7gV6mI&si=LE9ex3nsCBXROMUL'
  },
  {
    name: 'You Never Give Me Your Money',
    story:
      'Habla de los problemas de negocios que tuvieron los Beatles cuando Allen Klein les empezó a hacer el managing. La canción es de Paul, que sufrió especialmente con el tema porque él quería que lo hiciese el padre de Linda Eastman, su suegro. Parte de las tensiones de la ruptura vino por este tema.',
    youtube: 'https://music.youtube.com/watch?v=BpndGZ71yww&si=9G7serp3pbgWLtKP'
  },
  {
    name: 'The End',
    story:
      'Se pensó como la última canción de los Beatles. Con esa idea, decidieron hacer algo especial: cada uno de los tres guitarristas haría un solo, y Ringo tocaría un solo de batería.',
    youtube: 'https://music.youtube.com/watch?v=12R4FzIhdoQ&si=0_vajFFCP5nf8M5a'
  },
  {
    name: 'Back in the USSR',
    story:
      'En Back in the U.S.S.R., Ringo Starr no toca la batería. Durante su ausencia temporal de la banda, Paul McCartney se hizo cargo de la batería. Cuando Ringo decidió volver, los demás lo recibieron con flores en su batería.',
    youtube: 'https://music.youtube.com/watch?v=nS5_EQgbuLc&si=c1Kti9-tC3bi6JRH'
  },
  {
    name: 'She Came in through the Bathroom Window',
    story:
      "Paul McCartney vivió una experiencia peculiar cuando un grupo de fans conocidas como las 'Apple Scruffs' logró entrar en su casa en Londres. Una de ellas se coló a través de una ventana del baño. La canción tiene un aire irónico y desenfadado.",
    youtube: 'https://music.youtube.com/watch?v=NVv7IzEVf3M&si=B4cmp6cbCPtMEBWq'
  },
  {
    name: "A Hard Day's Night",
    story:
      "A Hard Day's Night es una frase absurda que viene de Ringo Starr, quien solía decir cosas graciosas y fuera de contexto. Aunque carece de sentido lógico, el título se adoptó por su atractivo sonoro.",
    youtube: 'https://music.youtube.com/watch?v=AMSiHdrHl0g&si=sSipBskWfZKykENI'
  },
  {
    name: 'Lucy in the Sky with Diamonds',
    story:
      'Según John Lennon, Lucy in the Sky with Diamonds fue inspirada por un dibujo de su hijo Julian. Aunque el título coincide con las siglas LSD, Lennon siempre negó cualquier conexión intencional con la droga.',
    youtube: 'https://music.youtube.com/watch?v=aGPTfxdw_lw&si=hnRJtntqmvMU5hq1'
  }
];

module.exports = beatlesSongs;
