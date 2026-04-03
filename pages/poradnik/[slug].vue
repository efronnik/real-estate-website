<script setup lang="ts">
const route = useRoute();
const activeSignalIndex = ref(0);
const signalCardRefs = ref<HTMLElement[]>([]);
const activeMistakeIndex = ref(0);
const mistakeCardRefs = ref<HTMLElement[]>([]);
let signalsRaf = 0;
const currentChecklistSlide = ref(0);
const isChecklistPaused = ref(false);
const checklistImages = [
  "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8292799/pexels-photo-8292799.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7415036/pexels-photo-7415036.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7821510/pexels-photo-7821510.jpeg?auto=compress&cs=tinysrgb&w=1800"
];

type Article = {
  title: string;
  lead: string;
  category: string;
  readTime: string;
  points: string[];
  checklist: string[];
  frameworkEyebrow?: string;
  frameworkTitle?: string;
  mistakesTitle?: string;
  checklistTitle?: string;
  checklistCardText?: string;
  checklistMetric?: string;
  showFramework?: boolean;
  showMistakes?: boolean;
  researchFacts?: Array<{
    title: string;
    text: string;
    source: string;
  }>;
  deepDive?: Array<{
    title: string;
    text: string;
    bullets: string[];
  }>;
  framework?: string[];
  mistakes?: string[];
  closing?: string;
  signals?: Array<{
    title: string;
    why: string;
    action: string;
    image: string;
  }>;
};

const articles: Record<string, Article> = {
  "7-sygnalow-ze-cena-blokuje-sprzedaz": {
    title: "7 sygnałów, że cena blokuje sprzedaż",
    lead:
      "Jeśli oferta długo stoi bez jakościowych zapytań, problemem często nie jest mieszkanie, tylko strategia ceny i pozycjonowanie.",
    category: "Warszawa / analiza rynku",
    readTime: "8 min czytania",
    points: [
      "Ruch w ogłoszeniu jest niski mimo poprawnych zdjęć i lokalizacji.",
      "Masz dużo pytań, ale mało realnych prezentacji.",
      "Większość rozmów zaczyna się od mocnej obniżki ceny.",
      "Po 2-3 tygodniach nie pojawiają się nowe profile kupujących.",
      "Porównywalne mieszkania w okolicy rotują szybciej.",
      "Oferta „wisi”, ale nie buduje presji decyzyjnej.",
      "Każda kolejna korekta ceny osłabia pozycję negocjacyjną."
    ],
    signals: [
      {
        title: "Niski ruch w ogłoszeniu od pierwszych dni",
        why: "Jeżeli oferta nie łapie uwagi na starcie, cena często jest poza „strefą decyzji” kupujących dla tej lokalizacji i standardu.",
        action: "Porównaj cenę z realnymi transakcjami i podobnymi mieszkaniami aktywnymi na rynku, nie tylko z pojedynczymi ofertami premium.",
        image: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Dużo wiadomości, mało prezentacji",
        why: "Kupujący klikają z ciekawości, ale rezygnują przed spotkaniem, gdy cena nie zgadza się z tym, co widzą w ofercie.",
        action: "Sprawdź spójność: cena vs. zdjęcia, opis, standard wykończenia i lokalizacja. Popraw komunikat wartości.",
        image: "https://images.pexels.com/photos/2725676/pexels-photo-2725676.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Każda rozmowa zaczyna się od mocnej obniżki",
        why: "To sygnał, że rynek postrzega ofertę jako zawyżoną i kupujący od razu testują granicę ustępstw.",
        action: "Przygotuj argumenty obrony ceny i scenariusz negocjacyjny. Jeśli argumentów brak - skoryguj cenę strategicznie, nie impulsowo.",
        image: "https://images.pexels.com/photos/7578876/pexels-photo-7578876.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Po 2-3 tygodniach nie pojawiają się nowe profile klientów",
        why: "Algorytm i rynek „odczytują” ofertę jako mniej atrakcyjną, a zasięg naturalnie słabnie.",
        action: "Zrób reset wejścia: aktualizacja materiałów, opisu i pozycjonowania ceny zamiast drobnych, częstych cięć.",
        image: "https://images.pexels.com/photos/7578913/pexels-photo-7578913.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Podobne mieszkania sprzedają się szybciej",
        why: "Gdy porównywalne nieruchomości rotują, a Twoja stoi, cena lub sposób prezentacji nie trafia w oczekiwania rynku.",
        action: "Przeprowadź krótką analizę konkurencji 1:1 i wskaż, gdzie oferta wypada gorzej lub drożej bez uzasadnienia.",
        image: "https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Brak presji decyzyjnej po prezentacjach",
        why: "Kupujący nie czują, że oferta jest „uczciwie wyceniona na teraz”, więc odkładają decyzję.",
        action: "Doprecyzuj warunki oferty i narrację wartości. Pokaż jasno, co uzasadnia cenę i jakie są koszty zwlekania.",
        image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Każda korekta ceny pogarsza pozycję negocjacyjną",
        why: "Seria przypadkowych obniżek buduje obraz sprzedającego pod presją, co zachęca do dalszego zbijania ceny.",
        action: "Przyjmij jedną zaplanowaną korektę opartą o dane i komunikuj ją jako element strategii, a nie desperacji.",
        image: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1800"
      }
    ],
    checklist: [
      "Zweryfikuj cenę na tle transakcji podobnych mieszkań.",
      "Sprawdź, czy komunikat ogłoszenia wspiera cenę.",
      "Ustal scenariusz korekty zamiast przypadkowych obniżek."
    ],
    frameworkEyebrow: "Plan pracy",
    frameworkTitle: "Plan działania na 14 dni",
    mistakesTitle: "Najczęstsze błędy przy korekcie ceny",
    checklistTitle: "Checklista do wdrożenia",
    checklistCardText: "Element checklisty do wdrożenia przed kolejnym etapem sprzedaży.",
    checklistMetric: "Checklista wdrożenia",
    framework: [
      "Dzień 1-2: audyt oferty - cena, zdjęcia, tytuł, opis i grupa docelowa.",
      "Dzień 3-4: analiza konkurencji 1:1 (metraż, standard, piętro, ekspozycja, lokalizacja).",
      "Dzień 5-7: poprawki komunikatu wartości i materiałów wizualnych bez zmiany ceny.",
      "Dzień 8-10: monitoring jakości zapytań, liczby prezentacji i przebiegu rozmów.",
      "Dzień 11-14: decyzja - utrzymanie ceny, repozycjonowanie albo jedna strategiczna korekta."
    ],
    mistakes: [
      "Wiele małych obniżek co kilka dni - rynek odczytuje to jako presję sprzedającego.",
      "Korekta ceny bez poprawy zdjęć i opisu - kupujący dalej nie widzą uzasadnienia wartości.",
      "Porównywanie się do najdroższych ofert zamiast do mieszkań realnie rotujących.",
      "Ustalanie ceny „żeby mieć z czego schodzić” bez planu negocjacyjnego.",
      "Decyzje pod wpływem pojedynczej opinii, a nie danych z pierwszych 10-14 dni."
    ],
    closing:
      "Najlepsza strategia to nie najniższa cena, ale cena, która jest wiarygodna dla rynku i obroniona jakością oferty. Gdy połączysz dane, komunikat i plan negocjacji, skracasz czas sprzedaży bez oddawania marży."
  },
  "home-staging-premium-bez-przepalania-budzetu": {
    title: "Home staging premium bez przepalania budżetu",
    lead:
      "Home staging premium to reżyseria doświadczenia kupującego: co widzi po wejściu, jak porusza się po mieszkaniu i co zapamięta po 15 minutach prezentacji.",
    category: "Home staging / premium",
    readTime: "10 min czytania",
    points: [
      "Zaprojektuj „pierwsze 20 sekund”: wejście, oś widoku i najmocniejszy kadr, który od razu komunikuje standard mieszkania.",
      "Buduj spójność materiałów i faktur (drewno, tkaniny, metal, szkło), żeby wnętrze było odczuwane jako premium, a nie „przestylizowane”.",
      "Ustaw warstwy światła: bazowe, zadaniowe i akcentowe. Jedna temperatura barwowa w całym mieszkaniu poprawia odbiór jakości.",
      "Pracuj na skali: mniej mebli, ale we właściwych proporcjach. Wolna przestrzeń jest w premium równie ważna jak wyposażenie.",
      "Stylizuj zapachem i dźwiękiem tła subtelnie, bez „efektu hotelowego” - kupujący ma czuć dom, nie scenografię.",
      "Spójność online/offline: kadr ze zdjęcia musi być możliwy do odtworzenia podczas prezentacji 1:1."
    ],
    signals: [
      {
        title: "Pierwszy kadr nie buduje efektu premium",
        why: "Jeśli wejście i główny kadr są przypadkowe, kupujący nie widzi jakości już na starcie i trudniej mu uzasadnić wysoką wartość nieruchomości.",
        action: "Ustal jeden dominujący punkt wejścia i kompozycję salonu, która od razu pokazuje skalę, światło i proporcje.",
        image: "https://images.pexels.com/photos/7031398/pexels-photo-7031398.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Za dużo dodatków, za mało przestrzeni",
        why: "Nadmiar dekoracji rozprasza uwagę i optycznie zmniejsza wnętrze. W segmencie premium działa selekcja, nie ilość.",
        action: "Zostaw 2-3 mocne akcenty na pomieszczenie i usuń elementy, które nie wspierają funkcji pokoju.",
        image: "https://images.pexels.com/photos/7535038/pexels-photo-7535038.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Niespójne oświetlenie psuje odbiór jakości",
        why: "Mieszanie temperatur światła i przypadkowe cienie sprawiają, że nawet dobre wnętrze wygląda taniej i mniej spójnie.",
        action: "Ujednolić temperaturę barwową i ustawić trzy warstwy światła: ogólne, punktowe i akcentowe.",
        image: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Zdjęcia nie zgadzają się z prezentacją na żywo",
        why: "Gdy klient widzi inną aranżację niż w ogłoszeniu, maleje zaufanie i rośnie ostrożność decyzyjna.",
        action: "Przed publikacją ustal finalny układ mebli i dodatków oraz odtwarzaj go 1:1 przy każdym pokazie.",
        image: "https://images.pexels.com/photos/7578932/pexels-photo-7578932.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Brak scenariusza trasy prezentacji",
        why: "Chaotyczne oprowadzanie powoduje, że kupujący pomija kluczowe atuty i zapamiętuje przypadkowe detale.",
        action: "Zaprojektuj trasę: wejście -> strefa dzienna -> strefa prywatna -> podsumowanie atutów na końcu.",
        image: "https://images.pexels.com/photos/7578912/pexels-photo-7578912.jpeg?auto=compress&cs=tinysrgb&w=1800"
      }
    ],
    checklist: [
      "Scenariusz trasy prezentacji: kolejność wejścia do pomieszczeń i punkt zatrzymania w każdym pokoju.",
      "Jednolita temperatura światła (np. 3000K) i kontrola odbić w lustrach, szybach oraz frontach połyskowych.",
      "Pakiet tekstyliów premium: zasłony, poduszki, narzuta i dywan w jednej, spokojnej palecie.",
      "Mikro-porządek powierzchni: blaty, stoliki, strefa wejścia i łazienka gotowe na zdjęcie „bez poprawek”.",
      "Test zapachu i akustyki 30 minut przed pokazem (wietrzenie, brak intensywnych odświeżaczy, cisza tła).",
      "Lista „last minute” na dzień prezentacji: światło, rolety, układ krzeseł, zamknięte schowki, świeże ręczniki."
    ],
    frameworkEyebrow: "Plan wdrożenia",
    frameworkTitle: "Scenariusz home staging premium",
    mistakesTitle: "Najczęstsze błędy w home stagingu premium",
    checklistTitle: "Checklista przed sesją i prezentacją",
    checklistCardText: "Kontrolny punkt stagingu premium do odhaczenia przed publikacją.",
    checklistMetric: "Staging premium",
    framework: [
      "Dzień 1-2: audyt doświadczenia kupującego - trasa wejścia, pierwsze kadry i elementy rozpraszające uwagę.",
      "Dzień 3-4: porządkowanie i mikro-naprawy estetyczne, które podnoszą odbiór jakości bez remontu.",
      "Dzień 5-7: ustawienie światła, tekstyliów i proporcji mebli w trzech kluczowych strefach mieszkania.",
      "Dzień 8-10: sesja foto + krótki walkthrough, potem korekta scenografii pod realny kadr i perspektywę obiektywu.",
      "Dzień 11-14: próba generalna prezentacji na żywo i check-lista operacyjna dla każdego terminu pokazu."
    ],
    mistakes: [
      "„Dekorowanie pod siebie” zamiast pod profil kupującego premium.",
      "Łączenie kilku modnych stylów jednocześnie, co daje efekt chaosu zamiast klasy.",
      "Nadmierna ilość dodatków, które zabierają uwagę od architektury i proporcji wnętrza.",
      "Zbyt ciemne lub nierówne oświetlenie - mieszkanie wygląda na mniejsze i mniej zadbane.",
      "Brak scenariusza pokazu: kupujący chodzi przypadkowo, a najmocniejsze atuty mieszkania pozostają niewidoczne."
    ],
    closing:
      "Premium staging nie polega na „upiększaniu”, tylko na projektowaniu odczuć: spokoju, jakości i zaufania do nieruchomości. Gdy kupujący intuicyjnie czuje porządek i proporcję, łatwiej przechodzi z fazy oglądania do fazy decyzji."
  },
  "dokumenty-do-sprzedazy-checklista-eksperta": {
    title: "Dokumenty do sprzedaży: checklista eksperta",
    lead:
      "W transakcji premium dokumenty nie są „formalnością na koniec”, tylko narzędziem budowania zaufania już od pierwszej rozmowy z kupującym.",
    category: "Formalności / bezpieczeństwo",
    readTime: "11 min czytania",
    points: [
      "Zbuduj „teczkę transakcyjną” przed publikacją: własność, obciążenia, opłaty i status lokalu w jednym pakiecie.",
      "Sprawdź zgodność danych między dokumentami źródłowymi, księgą wieczystą i stanem faktycznym nieruchomości.",
      "Przygotuj dokumenty pod dwa scenariusze: zakup gotówkowy i zakup kredytowy (różne tempo i wymagania banku).",
      "Zadbaj o aktualność zaświadczeń z terminem ważności, aby nie stracić czasu przy finalizacji.",
      "Ustal kolejność przekazywania dokumentów: które wysyłasz na etapie oferty, które dopiero po decyzji klienta.",
      "Każdy dokument opisz po ludzku jednym zdaniem: co potwierdza i dlaczego jest ważny dla bezpieczeństwa kupującego."
    ],
    signals: [
      {
        title: "Rozjazd między księgą wieczystą a stanem faktycznym",
        why: "Nawet drobna niespójność danych zwiększa ostrożność kupującego i wydłuża decyzję banku lub notariusza.",
        action: "Przed ofertą wykonaj audyt zgodności: właściciel, udziały, obciążenia, adres, powierzchnia, podstawa nabycia.",
        image: "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Brak aktualnych zaświadczeń o opłatach i braku zaległości",
        why: "Kupujący potrzebuje pewności, że lokal nie niesie ukrytych zobowiązań wobec wspólnoty/spółdzielni i dostawców.",
        action: "Przygotuj komplet aktualnych zaświadczeń i kontroluj ich ważność, aby nie odnawiać dokumentów na ostatniej prostej.",
        image: "https://images.pexels.com/photos/8297474/pexels-photo-8297474.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Niejasny status zameldowania i przekazania lokalu",
        why: "Nieuregulowane kwestie meldunkowe i brak planu przekazania podnoszą ryzyko prawne po stronie kupującego.",
        action: "Ustal harmonogram wymeldowania, protokół przekazania i listę elementów wyposażenia przekazywanych z lokalem.",
        image: "https://images.pexels.com/photos/6863333/pexels-photo-6863333.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Brak dokumentów energetycznych i technicznych na czas",
        why: "Braki formalne przy akcie powodują nerwowe przesunięcia terminów i osłabiają profesjonalny odbiór oferty.",
        action: "Zweryfikuj obowiązki ustawowe (w tym świadectwo charakterystyki energetycznej) odpowiednio wcześniej.",
        image: "https://images.pexels.com/photos/8292856/pexels-photo-8292856.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Dokumenty wysyłane „na raty” bez logiki",
        why: "Chaotyczny obieg dokumentów obniża zaufanie i zwiększa liczbę pytań zwrotnych od kupującego, banku i kancelarii.",
        action: "Zrób indeks dokumentów i udostępniaj je paczkami według etapu transakcji, z krótkim komentarzem do każdego pliku.",
        image: "https://images.pexels.com/photos/8293698/pexels-photo-8293698.jpeg?auto=compress&cs=tinysrgb&w=1800"
      }
    ],
    checklist: [
      "Dokument własności + podstawa nabycia (akt, spadek, darowizna lub inne źródło prawa).",
      "Aktualny odpis księgi wieczystej i kontrola wpisów/obciążeń.",
      "Zaświadczenia o braku zaległości wobec wspólnoty/spółdzielni i opłat lokalowych.",
      "Zaświadczenie o osobach zameldowanych oraz plan wymeldowania przed/po akcie.",
      "Świadectwo charakterystyki energetycznej (jeśli wymagane dla danej transakcji).",
      "Pakiet dla notariusza: dane stron, sposób płatności, termin wydania lokalu, elementy wyposażenia.",
      "Wariant kredytowy: zestaw dokumentów pod analizę bankową kupującego.",
      "Wzór protokołu zdawczo-odbiorczego i lista liczników/kluczy do przekazania."
    ],
    frameworkEyebrow: "Plan formalny",
    frameworkTitle: "Plan dokumentacyjny krok po kroku",
    mistakesTitle: "Najczęstsze błędy formalne przy sprzedaży",
    checklistTitle: "Checklista dokumentów i bezpieczeństwa",
    checklistCardText: "Punkt kontrolny formalności do potwierdzenia przed kolejnym etapem transakcji.",
    checklistMetric: "Bezpieczeństwo formalne",
    framework: [
      "Dzień 1-2: audyt stanu prawnego i lista braków dokumentacyjnych.",
      "Dzień 3-4: uzupełnienie zaświadczeń i potwierdzeń opłat z terminem ważności.",
      "Dzień 5-7: przygotowanie paczki dokumentów dla kupującego i notariusza.",
      "Dzień 8-10: weryfikacja scenariusza kredytowego (jeśli dotyczy) i odpowiedzi na pytania banku.",
      "Dzień 11-14: potwierdzenie warunków aktu, wydania lokalu i protokołu przekazania."
    ],
    mistakes: [
      "Przekonanie, że dokumenty „załatwi się na końcu” - to najczęstsza przyczyna opóźnień finału.",
      "Brak jednolitej wersji danych (adres, metraż, udziały) w różnych dokumentach.",
      "Niedoszacowanie czasu potrzebnego na uzyskanie zaświadczeń ze wspólnoty, spółdzielni i urzędów.",
      "Brak planu pod transakcję kredytową, mimo że kupujący finansuje zakup kredytem.",
      "Nieprzygotowany protokół wydania lokalu i zakres przekazywanego wyposażenia."
    ],
    closing:
      "Im bardziej uporządkowana dokumentacja, tym większe poczucie bezpieczeństwa po stronie kupującego i szybsza droga do aktu. W praktyce premium formalności są częścią strategii sprzedaży, nie dodatkiem do niej."
  },
  "negocjacje-ceny-scenariusze-rozmowy": {
    title: "Negocjacje ceny: scenariusze rozmowy",
    lead:
      "Skuteczne negocjacje to zarządzanie tempem, informacją i emocją rozmowy - nie tylko wymiana liczb przy stole.",
    category: "Negocjacje / strategie",
    readTime: "10 min czytania",
    points: [
      "Rozpisz trzy poziomy ustępstw: warunki idealne, akceptowalne i graniczne.",
      "Ustal kolejność tematów rozmowy - najpierw wartość i warunki, dopiero potem cena końcowa.",
      "Zdefiniuj reakcje na typowe zagrywki: cisza, deadline, porównania z tańszymi ofertami, presja emocjonalna.",
      "Przygotuj argumenty oparte na faktach transakcyjnych, nie na oczekiwaniach właściciela.",
      "Traktuj negocjacje jako proces kilku kroków, a nie jedną rozmowę „wszystko albo nic”.",
      "Po każdej rundzie zapisuj ustalenia i kolejny krok, żeby nie tracić kontroli nad dynamiką."
    ],
    signals: [
      {
        title: "Kupujący próbuje zbić cenę już w pierwszej minucie",
        why: "To test Twojej pewności i granic - jeśli szybko schodzisz z ceny, oddajesz przewagę na starcie całego procesu.",
        action: "Wróć do wartości oferty i danych porównawczych. Kwotę omawiaj po potwierdzeniu warunków transakcji.",
        image: "https://images.pexels.com/photos/7681104/pexels-photo-7681104.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Rozmowa kręci się wokół emocji, nie faktów",
        why: "Gdy dyskusja odrywa się od liczb i warunków, rośnie ryzyko ustępstw pod presją chwili.",
        action: "Przenoś rozmowę na konkret: standard, lokalizacja, stan prawny, terminy i porównywalne transakcje.",
        image: "https://images.pexels.com/photos/8292795/pexels-photo-8292795.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Druga strona stawia sztuczny deadline",
        why: "Presja czasu bywa narzędziem do wymuszenia szybkiej decyzji na niekorzystnych warunkach.",
        action: "Ustal minimalny czas na analizę i trzymaj się procedury decyzyjnej, nawet przy „ofertach tylko dziś”.",
        image: "https://images.pexels.com/photos/8292868/pexels-photo-8292868.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Brak pisemnego podsumowania po rozmowie",
        why: "Bez potwierdzenia ustaleń pojawiają się rozbieżne interpretacje i cofanie wcześniej uzgodnionych punktów.",
        action: "Po każdej rundzie wyślij krótkie podsumowanie: uzgodnione warunki, otwarte kwestie, termin kolejnego kroku.",
        image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1800"
      },
      {
        title: "Negocjacje bez scenariusza B",
        why: "Jeśli masz tylko jeden wariant, łatwo wejść w pozycję obronną i zaakceptować warunki poniżej celu.",
        action: "Przygotuj alternatywy: wariant ceny, wariant terminu wydania i wariant zakresu wyposażenia.",
        image: "https://images.pexels.com/photos/8297473/pexels-photo-8297473.jpeg?auto=compress&cs=tinysrgb&w=1800"
      }
    ],
    checklist: [
      "Tabela granic negocjacyjnych: cena, termin aktu, termin wydania, wyposażenie.",
      "Lista 3-5 argumentów wartości oferty opartych na danych i faktach lokalnych.",
      "Gotowe odpowiedzi na najczęstsze obiekcje (cena, stan, lokalizacja, koszty).",
      "Scenariusz pierwszej rozmowy: otwarcie, pytania kwalifikujące, kolejność tematów.",
      "Scenariusz drugiej rundy: jakie ustępstwo za jakie ustępstwo drugiej strony.",
      "Wzór wiadomości podsumowującej ustalenia po spotkaniu.",
      "Warunki „stop” - kiedy kończysz negocjacje i wracasz do rynku.",
      "Plan alternatywny na wypadek wycofania się kupującego."
    ],
    frameworkEyebrow: "Plan negocjacji",
    frameworkTitle: "Scenariusz rozmowy w 5 krokach",
    mistakesTitle: "Najczęstsze błędy w negocjacjach ceny",
    checklistTitle: "Checklista przygotowania do negocjacji",
    checklistCardText: "Punkt kontrolny przygotowania negocjacyjnego przed kolejną rundą rozmów.",
    checklistMetric: "Negocjacje",
    framework: [
      "Krok 1: przygotowanie mapy interesów obu stron i listy warunków poza ceną.",
      "Krok 2: rozmowa otwierająca - diagnoza motywacji kupującego i jego realnych ograniczeń.",
      "Krok 3: prezentacja wartości + pierwsza kotwica cenowa osadzona w danych.",
      "Krok 4: wymiana ustępstw warunkowych (nigdy jednostronnych) i pisemne podsumowanie.",
      "Krok 5: decyzja końcowa - akceptacja, kontynuacja z korektą lub kontrolowane zakończenie rozmów."
    ],
    mistakes: [
      "Zbyt szybkie ujawnienie minimalnej ceny akceptowalnej.",
      "Bronienie samej liczby zamiast całego pakietu warunków transakcji.",
      "Brak notatek i pisemnych podsumowań po rozmowach.",
      "Ustępstwa „za nic” - bez równoważnej koncesji drugiej strony.",
      "Podejmowanie decyzji pod wpływem presji czasu bez weryfikacji alternatyw."
    ],
    closing:
      "Dobre negocjacje nie polegają na twardości dla samej twardości, ale na konsekwencji i strukturze. Kiedy kontrolujesz tempo, kolejność tematów i zasady ustępstw, finalna cena jest skutkiem procesu, a nie przypadku."
  }
};

const article = computed(() => articles[String(route.params.slug)]);
const heroSlugs = [
  "7-sygnalow-ze-cena-blokuje-sprzedaz",
  "home-staging-premium-bez-przepalania-budzetu",
  "dokumenty-do-sprzedazy-checklista-eksperta",
  "negocjacje-ceny-scenariusze-rozmowy"
];
const hasHero = computed(() => heroSlugs.includes(String(route.params.slug)));
const frameworkHeroWords = ["Audyt", "Analiza", "Pozycja", "Monitoring", "Decyzja"];
const frameworkImages = [
  "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7578914/pexels-photo-7578914.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7948071/pexels-photo-7948071.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8293703/pexels-photo-8293703.jpeg?auto=compress&cs=tinysrgb&w=1800"
];
const mistakeImages = [
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8293693/pexels-photo-8293693.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg?auto=compress&cs=tinysrgb&w=1800"
];
const mistakeCards = computed(() =>
  (article.value?.mistakes ?? []).map((text, idx) => ({
    text,
    image: mistakeImages[idx % mistakeImages.length]
  }))
);
const frameworkSteps = computed(() => {
  const list = article.value?.framework ?? [];
  return list.map((step, idx) => {
    const [left, ...right] = step.split(":");
    return {
      label: String(idx + 1).padStart(2, "0"),
      title: left?.trim() || `Krok ${idx + 1}`,
      text: right.join(":").trim() || step,
      hero: frameworkHeroWords[idx] ?? "Etap",
      image: frameworkImages[idx % frameworkImages.length]
    };
  });
});
const checklistCards = computed(() =>
  (article.value?.checklist ?? []).map((text, idx) => ({
    title: text,
    text: article.value?.checklistCardText ?? "Element checklisty do wdrożenia przed kolejnym etapem sprzedaży.",
    metric: article.value?.checklistMetric ?? "Checklista wdrożenia",
    image: checklistImages[idx % checklistImages.length]
  }))
);
const showFrameworkSection = computed(() => (article.value?.showFramework ?? true) && frameworkSteps.value.length > 0);
const showMistakesSection = computed(() => (article.value?.showMistakes ?? true) && mistakeCards.value.length > 0);

const nextChecklistSlide = () => {
  if (!checklistCards.value.length) return;
  currentChecklistSlide.value = (currentChecklistSlide.value + 1) % checklistCards.value.length;
};

const checklistRelativeIndex = (idx: number) => {
  const len = checklistCards.value.length;
  if (!len) return 0;
  let diff = (idx - currentChecklistSlide.value + len) % len;
  if (diff > len / 2) diff -= len;
  return diff;
};

let checklistTimer: ReturnType<typeof setInterval> | null = null;

const setSignalRef = (el: Element | null, idx: number) => {
  if (!el) return;
  signalCardRefs.value[idx] = el as HTMLElement;
};

const setMistakeRef = (el: Element | null, idx: number) => {
  if (!el) return;
  mistakeCardRefs.value[idx] = el as HTMLElement;
};

const updateActiveSignal = () => {
  if (!import.meta.client || signalCardRefs.value.length === 0) return;

  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  signalCardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });

  activeSignalIndex.value = closest;
};

const updateActiveMistake = () => {
  if (!import.meta.client || mistakeCardRefs.value.length === 0) return;

  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  mistakeCardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });

  activeMistakeIndex.value = closest;
};

const onSignalsScroll = () => {
  if (signalsRaf) return;
  signalsRaf = window.requestAnimationFrame(() => {
    updateActiveSignal();
    updateActiveMistake();
    signalsRaf = 0;
  });
};

onMounted(() => {
  updateActiveSignal();
  updateActiveMistake();
  window.addEventListener("scroll", onSignalsScroll, { passive: true });
  window.addEventListener("resize", onSignalsScroll, { passive: true });
  checklistTimer = setInterval(() => {
    if (!isChecklistPaused.value) nextChecklistSlide();
  }, 5200);
});

onBeforeUnmount(() => {
  if (signalsRaf) window.cancelAnimationFrame(signalsRaf);
  window.removeEventListener("scroll", onSignalsScroll);
  window.removeEventListener("resize", onSignalsScroll);
  if (checklistTimer) clearInterval(checklistTimer);
});
</script>

<template>
  <div>
    <main class="article-page" :class="{ 'article-page--hero': hasHero }">
      <section v-if="article && hasHero" class="section article-hero">
        <video class="article-hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="/Hero-7.mp4" type="video/mp4" />
        </video>
        <div class="article-hero-overlay" aria-hidden="true"></div>
        <div class="container article-hero-shell">
          <p class="eyebrow">{{ article.category }}</p>
          <h1 class="section-title">{{ article.title }}</h1>
          <p class="section-copy">{{ article.lead }}</p>
          <p class="article-meta">{{ article.readTime }}</p>
        </div>
      </section>

      <section v-if="article" class="section">
        <div class="container article-shell">
          <template v-if="!hasHero">
            <p class="eyebrow">{{ article.category }}</p>
            <h1 class="section-title">{{ article.title }}</h1>
            <p class="section-copy">{{ article.lead }}</p>
            <p class="article-meta">{{ article.readTime }}</p>
          </template>

          <div v-if="article.signals?.length" class="signals-layout">
            <aside class="signals-copy">
              <div class="signals-progress">{{ activeSignalIndex + 1 }} / {{ article.signals.length }}</div>
              <p class="signals-lead">{{ article.signals[activeSignalIndex]?.title }}</p>
            </aside>

            <div class="signals-visuals">
              <article
                v-for="(signal, idx) in article.signals"
                :key="signal.title"
                :ref="el => setSignalRef(el, idx)"
                class="signal-card"
                :class="{ active: idx === activeSignalIndex }"
                :style="{ '--bg': `url(${signal.image})` }"
              >
                <p><strong>Dlaczego to ważne:</strong> {{ signal.why }}</p>
                <p><strong>Co zrobić:</strong> {{ signal.action }}</p>
              </article>
            </div>
          </div>

          <div v-if="article.deepDive?.length" class="article-deep-dive">
            <article v-for="section in article.deepDive" :key="section.title" class="surface article-deep-card">
              <h2>{{ section.title }}</h2>
              <p>{{ section.text }}</p>
              <ul>
                <li v-for="item in section.bullets" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </div>

        <div v-if="showFrameworkSection" class="article-process-wrap">
          <ProcessSection
            :eyebrow="article?.frameworkEyebrow ?? 'Plan pracy'"
            :title="article?.frameworkTitle ?? 'Plan działania na 14 dni'"
            :steps="frameworkSteps"
          />
        </div>

        <div class="container article-shell">

          <div v-if="showMistakesSection" class="article-mistakes-layout">
            <aside class="article-mistakes-copy">
              <h2>{{ article?.mistakesTitle ?? "Najczęstsze błędy przy korekcie ceny" }}</h2>
              <p>
                To punkty, które najczęściej psują pozycję negocjacyjną i wydłużają sprzedaż. Jeśli wyeliminujesz je
                na starcie, decyzje cenowe będą bardziej przewidywalne i oparte na danych.
              </p>
            </aside>

            <div class="article-mistakes-visuals">
              <div class="article-mistakes-grid">
                <article
                  v-for="(item, idx) in mistakeCards"
                  :key="item.text"
                  :ref="el => setMistakeRef(el, idx)"
                  class="article-mistake-item"
                  :class="{ active: idx === activeMistakeIndex }"
                >
                  <img :src="item.image" :alt="item.text" />
                  <p>{{ item.text }}</p>
                </article>
              </div>
            </div>
          </div>

          <div v-if="article?.researchFacts?.length" class="article-research-grid">
            <article v-for="fact in article.researchFacts" :key="fact.title" class="surface article-research-card">
              <h3>{{ fact.title }}</h3>
              <p>{{ fact.text }}</p>
              <p class="article-research-source">{{ fact.source }}</p>
            </article>
          </div>

          <div v-if="checklistCards.length" class="article-checklist-stage">
            <div class="article-checklist-head">
              <h2 class="section-title">{{ article?.checklistTitle ?? "Checklista do wdrożenia" }}</h2>
            </div>

            <div
              class="article-checklist-carousel"
              @mouseenter="isChecklistPaused = true"
              @mouseleave="isChecklistPaused = false"
            >
              <article
                v-for="(item, idx) in checklistCards"
                :key="item.title"
                class="article-checklist-panel"
                :class="{
                  center: checklistRelativeIndex(idx) === 0,
                  left: checklistRelativeIndex(idx) === -1,
                  right: checklistRelativeIndex(idx) === 1,
                  hidden: Math.abs(checklistRelativeIndex(idx)) > 1
                }"
                :style="{ '--bg': `url(${item.image})` }"
                @click="currentChecklistSlide = idx"
              >
                <div class="article-checklist-panel-overlay">
                  <p class="article-checklist-kicker">{{ String(idx + 1).padStart(2, '0') }}</p>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                  <div class="article-checklist-metric">{{ item.metric }}</div>
                </div>
              </article>
            </div>

            <div class="article-checklist-dots" role="tablist" aria-label="Nawigacja checklisty">
              <button
                v-for="(item, idx) in checklistCards"
                :key="`checklist-dot-${item.title}`"
                class="article-checklist-dot"
                :class="{ active: idx === currentChecklistSlide }"
                :aria-label="`Przejdź do elementu checklisty ${idx + 1}`"
                @click="currentChecklistSlide = idx"
              >
                <span class="dot-core"></span>
              </button>
            </div>
          </div>

          <p v-if="article.closing" class="article-closing">{{ article.closing }}</p>
        </div>
      </section>

      <section v-else class="section">
        <div class="container article-shell">
          <p class="eyebrow">Poradnik</p>
          <h1 class="section-title">Artykuł nie został znaleziony</h1>
          <p class="section-copy">Sprawdź listę materiałów na stronie poradnika.</p>
          <a href="/poradnik" class="link-arrow">Wróć do poradnika</a>
        </div>
      </section>
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.article-page--hero {
  background: #ece7de;
}

.article-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(24rem, 56vh, 38rem);
  display: grid;
  align-items: center;
  padding: 0;
  background: #0d0f11;
}

.article-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(7, 7, 8, 0.82), rgba(7, 7, 8, 0.68)),
    radial-gradient(circle at 16% 14%, rgba(186, 152, 89, 0.24), transparent 45%);
}

.article-hero-shell {
  position: relative;
  z-index: 2;
  padding: clamp(2rem, 5vh, 3.4rem) 0;
}

.article-hero-shell .section-title,
.article-hero-shell .section-copy {
  color: #f5efe2;
}

.article-hero-shell .section-title {
  max-width: 13ch;
}

.article-hero-shell .section-copy {
  max-width: 56ch;
  color: rgba(245, 239, 226, 0.9);
}

.article-hero-shell .article-meta {
  color: rgba(245, 239, 226, 0.72);
}

.article-shell {
  display: grid;
  gap: 0.9rem;
}

.article-meta {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(19, 19, 19, 0.56);
}

.article-deep-dive {
  margin-top: 0.9rem;
  display: grid;
  gap: 0.8rem;
}

.article-deep-card {
  padding: 1rem;
}

.article-deep-card h2 {
  margin-bottom: 0.45rem;
}

.article-deep-card ul {
  margin-top: 0.55rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.3rem;
}

.article-block {
  padding: 1rem;
}

.article-block ul {
  margin-top: 0.55rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
}

.article-closing {
  margin-top: 0.25rem;
  padding: 0.9rem 1rem;
  border-left: 2px solid rgba(186, 152, 89, 0.84);
  background: rgba(186, 152, 89, 0.08);
  color: rgba(19, 19, 19, 0.84);
}

.signals-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: 2rem;
  align-items: start;
}

.signals-copy {
  position: sticky;
  top: 120px;
  padding-right: 1.2rem;
  border-right: 1px solid rgba(20, 20, 20, 0.15);
}

.signals-copy h2 {
  margin-top: 0.7rem;
  font-size: clamp(2.1rem, 4.8vw, 4rem);
  line-height: 0.94;
  letter-spacing: -0.03em;
  font-weight: 500;
}

.signals-progress {
  margin-top: 0.2rem;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: rgba(19, 19, 19, 0.48);
}

.signals-titles {
  margin-top: 0.9rem;
  display: grid;
  gap: 0.55rem;
}

.signals-lead {
  margin-top: 0.9rem;
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  line-height: 1.02;
  color: rgba(19, 19, 19, 0.96);
}

.signals-visuals {
  display: grid;
  gap: 1.25rem;
}

.signal-card {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background-image:
    linear-gradient(180deg, rgba(10, 10, 10, 0.18), rgba(10, 10, 10, 0.62)),
    var(--bg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  min-height: clamp(220px, 28vw, 320px);
  padding: 1.15rem;
  display: grid;
  align-content: start;
  transform: scale(0.985);
  opacity: 0.72;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.signal-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 8, 8, 0.48), rgba(8, 8, 8, 0.62));
  z-index: 0;
}

.signal-card.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.34);
}

.signal-card p {
  position: relative;
  z-index: 1;
  margin: 0;
  color: rgba(247, 242, 232, 0.96);
  line-height: 1.5;
  font-size: clamp(1.08rem, 1.35vw, 1.28rem);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.58);
  max-width: 48ch;
}

.signal-card p + p {
  margin-top: 0.72rem;
  padding-top: 0.72rem;
  border-top: 1px solid rgba(255, 255, 255, 0.24);
}

.signal-card p strong {
  color: #ffffff;
}

.article-mistakes-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.2rem, 2.4vw, 2.2rem);
  align-items: start;
}

.article-mistakes-copy {
  position: sticky;
  top: 120px;
  padding-right: 1.2rem;
  border-right: 1px solid rgba(20, 20, 20, 0.15);
}

.article-mistakes-copy .eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.article-mistakes-copy h2 {
  margin-top: 0.72rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  max-width: 12ch;
}

.article-mistakes-copy p {
  margin-top: 0.8rem;
  color: rgba(19, 19, 19, 0.88);
  font-size: clamp(1.02rem, 1.25vw, 1.14rem);
  line-height: 1.58;
  font-weight: 500;
  max-width: 34ch;
}

.article-mistakes-visuals {
  display: grid;
  gap: 1.15rem;
  align-content: start;
}

.article-mistakes-grid {
  display: grid;
  gap: 0.62rem;
}

.article-mistake-item {
  position: relative;
  border: 1px solid rgba(19, 19, 19, 0.16);
  overflow: hidden;
  background: #131313;
  transform: scale(0.985);
  opacity: 0.8;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.article-mistake-item img {
  display: block;
  width: 100%;
  height: clamp(210px, 28vw, 320px);
  object-fit: cover;
  filter: saturate(0.88);
  transform: scale(1);
  transition: transform 0.6s ease;
}

.article-mistake-item.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(19, 19, 19, 0.3);
}

.article-mistake-item.active img {
  transform: scale(1.045);
}

.article-mistake-item::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:
    linear-gradient(180deg, rgba(6, 6, 6, 0.12), rgba(6, 6, 6, 0.88));
}

.article-mistake-item p {
  position: absolute;
  left: 0.78rem;
  right: 0.78rem;
  bottom: 0.7rem;
  margin: 0;
  color: #fffdf7;
  font-weight: 800;
  font-size: clamp(1.04rem, 1.35vw, 1.24rem);
  line-height: 1.22;
  z-index: 1;
  padding: 0.34rem 0.46rem;
  background: rgba(0, 0, 0, 0.42);
  border-left: 2px solid rgba(196, 160, 88, 0.95);
  text-shadow:
    0 3px 10px rgba(0, 0, 0, 0.78),
    0 0 1px rgba(0, 0, 0, 0.95);
}

.article-process-wrap {
  margin: clamp(4.8rem, 8vw, 8.2rem) 0;
}

.article-research-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.article-research-card {
  padding: 1rem;
}

.article-research-card h3 {
  margin-bottom: 0.45rem;
}

.article-research-source {
  margin-top: 0.6rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(19, 19, 19, 0.56);
}

.article-checklist-stage {
  margin: clamp(4.8rem, 8vw, 8.2rem) 0;
}

.article-checklist-head {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.article-checklist-head p {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(19, 19, 19, 0.56);
}

.article-checklist-head .section-title {
  margin-top: 0;
}

.article-checklist-carousel {
  position: relative;
  height: clamp(24rem, 44vw, 30rem);
  overflow: hidden;
}

.article-checklist-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(34rem, 72vw);
  min-height: 23rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.9) brightness(0.8);
  transform-origin: center center;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease;
  cursor: pointer;
}

.article-checklist-panel-overlay {
  min-height: 100%;
  padding: 1.25rem;
  background: linear-gradient(180deg, rgba(6, 6, 6, 0.44), rgba(6, 6, 6, 0.82));
  display: grid;
  gap: 0.65rem;
  grid-template-rows: auto auto 1fr auto;
}

.article-checklist-panel.center {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  z-index: 3;
}

.article-checklist-panel.left {
  transform: translate(calc(-50% - 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.article-checklist-panel.right {
  transform: translate(calc(-50% + 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.article-checklist-panel.hidden {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.article-checklist-panel h3 {
  font-size: 1.34rem;
  line-height: 1.1;
  color: #fbf8f2;
}

.article-checklist-panel p {
  color: rgba(245, 238, 227, 0.9);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
}

.article-checklist-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: #d2af72;
  font-weight: 700;
}

.article-checklist-metric {
  justify-self: start;
  padding: 0.4rem 0.72rem;
  background: rgba(186, 152, 89, 0.18);
  color: #f0d5a2;
  font-size: 0.8rem;
  font-weight: 600;
}

.article-checklist-dots {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.42rem;
  justify-content: center;
  align-items: center;
}

.article-checklist-dot {
  width: 1.35rem;
  height: 0.22rem;
  border: 0;
  border-radius: 999px;
  background: rgba(19, 19, 19, 0.2);
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
  padding: 0;
}

.article-checklist-dot.active {
  background: rgba(186, 152, 89, 0.9);
  transform: scaleX(1.08);
}


@media (max-width: 900px) {
  .article-mistakes-layout {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .article-mistakes-copy {
    position: static;
    top: auto;
    border-right: 0;
    padding-right: 0;
  }

  .article-research-grid {
    grid-template-columns: 1fr;
  }

  .article-mistakes-copy h2 {
    max-width: none;
  }

  .article-mistake-item img {
    height: clamp(190px, 42vw, 270px);
  }

  .article-mistake-item p {
    font-size: clamp(1rem, 3.4vw, 1.12rem);
  }

  .article-process-wrap {
    margin: clamp(4.2rem, 7vw, 6.2rem) 0;
  }

  .article-checklist-carousel {
    height: 19.2rem;
  }

  .article-checklist-stage {
    margin: clamp(4.2rem, 7vw, 6.2rem) 0;
  }

  .article-checklist-panel {
    width: min(20rem, 90vw);
    min-height: 16.2rem;
  }

  .article-checklist-panel.left,
  .article-checklist-panel.right {
    opacity: 0;
    pointer-events: none;
  }

  .signals-layout {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .signals-copy {
    position: static;
    top: auto;
    border-right: 0;
    padding-right: 0;
  }

  .signals-progress {
    margin-top: 1.2rem;
  }

  .signal-card {
    min-height: auto;
  }
}
</style>
