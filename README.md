# Dobry Dźwięk — nowa strona

Statyczna strona [dobrydzwiek.pl](https://dobrydzwiek.pl): Astro + Decap CMS.

```sh
npm install
npm run dev
```

Edycja treści w przeglądarce (lokalnie): w drugim terminalu `npm run cms`, potem otwórz `/admin/`.

Build: `npm run build` → katalog `dist/`. Hosting: Cloudflare Pages lub Netlify (`publish: dist`). Po publikacji włącz Git Gateway / OAuth, wpisz ID GA4 w ustawieniach CMS.

## Docker

Produkcyjny podgląd (nginx, port 8080):

```sh
docker compose up --build
```

Tryb deweloperski (Astro na 4321, CMS na 8081):

```sh
docker compose --profile dev up
```

Potem otwórz [http://localhost:4321/admin/](http://localhost:4321/admin/). Nie uruchamiaj `npm run cms` ręcznie w kontenerze `dev` — przeglądarka łączy się z `localhost:8081` na Twoim Macu, a ten port publikuje usługa `cms`.

Poza Dockerem: `npm run dev` i w drugim terminalu `npm run cms`.
