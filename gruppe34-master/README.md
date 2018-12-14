# Prosjekt 4 - Gruppe34

Applikasjonen kjører her http://it2810-34.idi.ntnu.no/prosjekt4/
Du må være på NTNU sitt nett eller bruke VPN for at det skal fungere.

## Introduksjon
Vi har laget en nettside der du kan søke blant IMDb’s Top 250 rangerte filmer.
Man vil kunne filtrere søket slik at man kun får filmer i det ønskede tidsrommet. 
Det er også funksjonalitet for å sortere søket etter år, tittel og rangering. 
Dersom du trykker på en film vil du få opp mer informasjon om den gjeldende filmen, i tillegg vil du kunne gi filmen en rating (0-10). 
Gjennomsnittlig rating blir vist over. Vi har implementert søket sånn at dersom kjører et tomt søk vil du få opp alle filmer.

## Installasjon

Disse stegene gir deg et fungerende prosjekt lokalt på din maskin.

### Krav til programvare

Du trenger [git](https://git-scm.com/downloads) for å laste ned repoet.
Du trenger [node.js](https://nodejs.org/en/download/) for å installere det som trengs for å kjøre applikasjonen.
Følg instruksjonene i lenkene.

### Installasjon

Disse instruksene installerer applikasjonen og starter lokale webservere.

1. Klon repoet til din maskin

```
git clone https://gitlab.stud.idi.ntnu.no/it2810-h18/prosjekt3/gruppe34.git
```

2. Gå inn i server mappen og installer det du trenger gjennom npm

```
cd gruppe34/server && npm install.
```

3. Gå inn i react mappen og installer det du trenger gjennom npm

```
cd ../search && npm install
```

4. Start express server fra gruppe34/server

```
node app
```

5. Start react server fra gruppe34/search

```
npm start
```

Applikasjonen kjører nå på http://localhost:3000.

#### Database
Vi bruker mongodb. For å sette opp en database som fungerer med vår kode:
1. last ned mongodb til ditt OS fra deres [hjemmeside](https://docs.mongodb.com/manual/installation/).
2. start mongod
```
mongod
```
3. start mongo
```
mongo
```
4. lag en database som er kalt 'movies'
```
use movies
```
5. lag en bruker
```
db.createUser({
    user: 'myusername',
    pwd: 'mypassword',
    roles: [{ role: 'readWrite', db:'movies'}]
})
```
6. lag en collection kalt 'top' og gå ut av mongo shell
```
db.createCollection("top")
```
7. Endre mongod conf filen (Ubuntu) og restart mongod
```
sudo emacs -nw  /etc/mongod.conf
```
```
net:
  port: 27017
  bindIp: 0.0.0.0  

security:
  authorization: 'enabled'  
```
```
sudo service mongod restart
```

8. Last ned datasettet vi har brukt fra [dataworld](https://data.world/studentoflife/imdb-top-250-lists-and-5000-or-so-data-records/workspace/file?filename=IMDB_Top250movies2_OMDB_Detailed.csv) og kall den top.csv
9. Fra terminal på egen pc, gå inn i mappen du har lastet ned datasettet og bruk mongoimport
```
mongoimport -h (din ip adresse):27017 -u myusername -p mypassword -d movies -c top --type csv --file top.csv --headerline
```

Husk å endre koden vår til å kalle riktig ipadresse, brukernavn og passord i search/src/index.js og server/app.js

## Designvalg

### GraphQL

Vi valgte å bruke GraphQL istedenfor for REST for å utforske ny teknologi. Vi syntes teknologien virket kul, og ville heller bruke tiden på å sette oss inn i GraphQL enn å skrive REST API.

Med REST API vil kan typisk fetche data ved å aksessere flere endepunkter. Hvis man i en tenkt database har informasjon om forskjellige brukere og deres favorittfilmer vil man da måtte aksessere to endepunkter, f.eks. /users/<id> og /users/<id>/favorites. Det første endepunktet vil være for å hente ut brukerinformasjon, og den neste vil da returnere all favorittfilmene til den brukeren.

Med GraphQL vil dette kunne blitt løst med en query som inneholder de spesifikke kravene og serveren svarer med et JSON objekt med svar som følger strukturen til queryen. Ved å skrive queryer der klient-siden bare henter ut data man trenger unngår man et av de største problemene med REST, nemlig over- og underfetching. Eksempel på query:

```
query {
	user(id: <id>){
		name
		favorites{
			title
		}
	}
}

```

I vår applikasjon kunne vi like gjerne brukt REST API istedenfor GraphQL, da vi ikke henter ut informasjon fra forskjellige «endepunkter». Men, vi henter ikke alltid ut all informasjon vi har i databasen, og det er her GraphQL sine queries har vært behjelpelig.

### ApolloClient

Fra nettsiden apollographql.com: «Apollo Client is the best way to use GraphQL to build client applications». Grunnen til at vi valgte å bruke Apollo Client var fordi det eksisterte bra dokumentasjon for akkurat den kombinasjonen vi trengte, nemlig GraphQL og React. Klienten gjorde det lett å bygge React komponenter som fetcher og sender data til GraphQL serveren.

### MongoDB

MongoDB er en dokument-orientert database med sitt eget query språk. Vi valgte å bruke MongoDB som database etter at vi innså hvor fint det var å modellere objekter med Mongoose driveren, og det var et hav av tutorials på akkurat denne kombinasjonen. Samtidig er måten GraphQL objekter og mongoose modeller bygd opp veldig likt, noe som gjorde oppsettet simplere.

I tillegg valgte vi å bruke et bibliotek som heter «graphql-to-mongodb». Med dette biblioteket ble det å definere en schema veldig mye lettere, da biblioteket kommer med middleware som man kan legge til over «resolve» funksjonen. Biblioteket genererer querier basert i vår GraphQLSchema i kjøretid, basert på GraphQLTypen vår. Så parser den dette til MongoDB query parametere.

## Komponentstruktur

I dette prosjektet endte vi opp med kun 3 egne komponenter(+App). Det er hovedsakelig grunnet bruk av tredjeparts-komponenter, i tillegg til at websiden vår har et ganske "basic" design. Under en illustrasjon av komponentstrukturen vår, der vi har utelatt tredjepartskomponenter.

![Komponentstruktur_bilde](ComponentstructureImage.png)

### Tredjeparts komponenter

Grunnen til at vi valgte å bruke rammeverk med ferdige komponenter er at sparer vi mye tid på design, noe som ikke spesifikt er et læringsmål. Derimot er det et læringsmål å finne og velge gode tredjeparts komponenter. Vi har kanskje ikke vært like gode på akkurat det i de tidligere prosjektene, og det har ført til noe unødvendig tid brukt på styling av elementer.

#### Material-UI

Material-UI er react-komponenter som er basert på Google's Material design. Vi valgte å bruke dette rammeverket fordi det innholder omtrent alt man trenger av UI-komponenter. Hver enkelt komponent har mange forskjellige standardiserte designvalg, og det gjør det veldig enkelt å finne en komponent som passer bra til siden sin.

Material-UI er tilgjengelig som en npm pakke, som betyr at alt du trenger å gjøre for å legge det til i ditt prosjekt er å skrive følgende i konsoll når du er i prosjektmappen:

```
npm install @material-ui/core
```

Fra Material-UI har vi brukt følgende komponenter: Button, Card, CardContent, TextField, Modal, Typography.
Et eksempel på bruk av en slik komponent:

1. Importer den gjeldende komponenten med følgende kode:

```
import Button from "@material-ui/core/Button";
```

2. Når man da har importert komponenten kan den brukes på følgende måte:

```
  <Button
    variant="contained"
    onClick={...someFunction...}
    color="default">
  </Button>
```

## State management basert på Redux

Vi valgte å bruke Redux i til å håndtere state i dette prosjektet. I starten av prosjektet var vi litt fram og tilbake i valget mellom Redux og MobX. Vi kom etterhvert frem til at det var fordeler og ”ulemper” med begge to, og valgte derfor Redux ettersom vi fant mange bra guides og god dokumentasjon.
Hovedforskjellen mellom Redux og MobX (som forelesningen også pekte ut) er at MobX er enkelt å komme i gang med mens Redux krever noe mer forståelse og koding.

Vi valgte å organisere lage egne filer for alle actions og reducers. Vi kunne samlet alle actions i samme fil, men valgte å dele de opp for å holde det oversiktlig.
Navngivningen valgte vi også å gjøre ganske oversiktlig, ved å gi actions navn etter reduceren de skulle håndteres i.

For eksempel har navngivnings-forholdet som vist under:

```
	action => reducer,  	changeSorting.js =>  changeSortingReducer.js
```

Storen vår ser slik ut:

```
const reducers = combineReducers({
    moviesStore: AddMoviesReducer,
    changeSearch: changeSearchReducer,
    clickedMovie: clickedMovieReducer,
    sortBy: changeSortingReducer,
    fromFilter: fromFilterReducer,
    toFilter: toFilterReducer,
})

const store = createStore(
    reducers
)
```

På denne måten reducerne våre actions til å endre state. Dette gjøres via ”dispatch”-funksjonen og actions, og gjør at man bare får endringer i state som man har tatt høyde for.
Så for hver ulik endring vi gjør i state (store), må har vi en action som beskriver denne handlingen (med en type-verdi). Under testing fant vi noen feil ved bruk av reducerne,
se mer informasjon om dette lenger ned i testing delen.

For å hente verdier fra store må man da aksessere de gjeldene feltene i staten. Dette gjøres først ved for eksempel følgende kode:

```
const mapStateToProps = state => {
  return {
    moviesStore: state.moviesStore,
    text: state.changeSearch,
    clickedMovie: state.clickedMovie
  };
};
```
Denne koden sammen med connect(maptStateToProps) gjør at man wrapper en Redux-Provider rundt komponenten.

### Vanlig håndtering av state

I App og movieItem-komponenten vår valgte vi å bruke vanlig react state i tillegg til Redux state.
Vi gjorde dette for å slippe en del ”overhead” ved bruk av Redux på veldig lokale ting.
En av tingene vi lagret i lokal state var for eksempel om Modal-komponenten skulle vises eller ikke.
Redux var smart å bruke totalt sett, men på småting som en variabel i lokalt i en komponent tenkte vi at det var best å bruke vanlig react state management.

## Testing

Vi har brukt både jest og cypress til testing. Jest testene ligger under [test](search/__test__) mappen.
Med jest testet vi actions og reducer og snapshots av komponenter for å se at de laster som forventet.

### Snapshot av komponenter

Under snapshottestene av komponenten ønsker vi å teste selve komponentene uten at de er koblet til/wrappet rundt den gjennom connect() funksjonen. Dette løste vi med å eksportere komponenten uten wrapperen i tillegg, slik som Redux [dokumentasjonen](https://redux.js.org/recipes/writingtests#connected-components) anbefaler.
For å teste komponentene trenger vi derfor kun å mocke Apollo Clienten, og dette gjør vi med MockProvider.
Der det trengs lager vi fiktive data for å laste komponenten hvor vi sender det inn som parameter. For eksempel i MovieItem hvor vi sender inn title og year.

### Redux

Vi har valgt å teste Redux actions og reducere gjennom jest. Actions tester vi ved å se om riktig action blir opprettet og riktig action blir returnert. Testing av reducerne sjekker vi at reduceren returnerer ny state. Under testing fant vi feil i hvordan vi bruker reducerne, se mer om dette under "Testresultat". Vi skrev derfor bare en test for reducerne, da dette ville ha skjedd på alle.

### Cypress

Cypress har vi brukt til å teste komponentenes funksjonalitet(unit testing), at de funker sammen (integrasjonstesting) og end-to-end testing. Testene ligger under [movies](cypress/integration/movies).
Her har vi prøvd etter beste evne å følge [best-practice](https://docs.cypress.io/guides/references/best-practices.html), for eksempel med å ha flere "assertions" i en test og gi elementene vi tester data-cy attributter istedet for å akssessere med id og klassenavn. I og med at vi har brukt mange material UI komponenter, lot ikke dette seg alltid gjøre fordi de oppretter ekstra elementer enn det vi har tilgang til i koden.

Vi tester det å gjøre et enkelt søk, filtrering og sortering. I disse testene testes også at knapper responderer på trykk, dropdown lister funkerer og at komponenter fungerer sammen. Vi har også laget en unittest for movieItem komponenten i cypress. Her tester vi mer spesifikt fillTitle og setInputValue funksjonene.

### Kjør testene

Jest testene kan kjøres fra gruppe34/search ved bruk av:

```
npm test components && npm test redux
```

Obs: slik det er satt opp nå funker det ikke å skrive kun npm test da det vil også starte cypress testene via jest.

Cypress testene kjøres slik:

1. Åpne cypress fra search mappen med

```
npm run cypress:open
```

2. Trykk på "Run all Specs" i cypress for å kjøre alle testene

### Testresultat

Jest:
Under testing av reducerne fant vi en feil i implementasjonen hvor vi har manglet [] rundt det som returneres i hver action type. Det gjør at vi ikke returnerer en liste av objekter, men i stedet bare et objekt. Det betyr at staten(objektet) blir endret og således bryter med en av Redux prinsippene som sier at state er "read-only." Feilen ble funnet for sent til at vi rakk å endre det. Denne testen er kommentert ut i reducers.test.js.
Måten man optimalt sett skulle ha gjort det på var ved å ta inn forrige state og en action og deretter returnert en kopi av den forrige staten i tillegg til den nye endringen. Da hadde vi endt opp med et array som inneholdt alle states, og man vil også da hele tiden kunne ha hentet ut den nyeste og gjeldende tilstanden.

Cypress: Alle testene kjører som forventet. Applikasjonen funker som den skal.

## Kilder
* https://reactjs.org/
* https://redux.js.org/
* https://www.apollographql.com/docs/
* https://www.howtographql.com/
* https://material-ui.com/
* https://expressjs.com/
* https://docs.mongodb.com/
* https://www.cypress.io/
* https://jestjs.io/
