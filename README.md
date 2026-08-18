# Graveyard Insight

DEADCHAIN

Especificación completa del Frontend

Versión: 1.0
Fecha: Agosto 2026
Tipo: SPA / Web3 Intelligence Platform
Enfoque inicial: Solana
Frontend: Next.js + TypeScript
Estado: Especificación inicial de desarrollo

1. Visión del producto

DEADCHAIN es una plataforma de inteligencia blockchain centrada inicialmente en Solana que permite:

analizar wallets;

detectar actividad inactiva o abandonada;

identificar cuentas y activos potencialmente recuperables;

calcular métricas de actividad;

limpiar wallets;

recuperar rent cuando técnicamente sea posible;

explorar wallets dormidas;

descubrir whales inactivas;

analizar tokens;

posteriormente monitorizar movimientos.

La propuesta de valor principal:

Find what's dead. Recover what's yours.

El frontend debe transmitir tres conceptos:

DESCUBRIMIENTO + INTELIGENCIA + RECUPERACIÓN

No debe parecer un simple blockchain explorer ni un dashboard financiero tradicional.

2. Objetivos del frontend

Objetivo principal

Conseguir que un usuario pueda pasar de:

"¿Tengo algo olvidado en mi wallet?"

a:

"Tengo 0.0842 SOL recuperables y puedo recuperarlos."

en menos de un minuto.

Objetivos secundarios

Generar confianza.

Explicar claramente qué significa "dead", "dormant" y "recoverable".

Hacer que el análisis sea visualmente atractivo.

Facilitar compartir resultados.

Crear páginas públicas indexables.

Preparar la aplicación para múltiples blockchains.

Crear una base visual reutilizable para Explorer, Token Intelligence y Alerts.

3. Principios UX

3.1 Zero friction

No exigir:

registro;

email;

conexión de wallet;

para realizar el primer análisis.

El usuario puede introducir una dirección directamente.

3.2 Connect only when necessary

La wallet únicamente debe solicitarse cuando el usuario quiere:

recuperar fondos;

limpiar cuentas;

realizar una operación;

guardar una wallet;

activar alertas.

3.3 Resultado antes que configuración

No mostrar formularios complejos.

Flujo:

Wallet
↓
Scan
↓
Result
↓
Action


3.4 No confundir "dormant" con "dead"

La UI debe utilizar estados claramente diferenciados.

Active

Actividad reciente.

Dormant

Sin actividad durante un periodo significativo.

Abandoned

Patrones fuertes de inactividad.

Inaccessible

No existe una vía conocida para recuperar el activo.

Recoverable

Existe una operación técnicamente viable para recuperar valor.

Unknown

No hay suficiente información.

4. Dirección visual

Concepto

Forensic Crypto Intelligence

Referencias conceptuales:

forensic laboratory;

Bloomberg Terminal;

blockchain explorer;

cyber intelligence;

dark data visualization.

Evitar estética:

casino crypto;

meme coin;

exceso de neón;

interfaces saturadas;

"hacker cliché".

5. Tema visual

Dark-first

La aplicación tendrá como diseño principal un tema oscuro.

Background

Negro/gris extremadamente oscuro.

Superficies

Gris oscuro ligeramente elevado.

Texto

Blanco y grises.

Accent

Un único color de identidad.

Recomendación:

acid green / toxic green

Utilizado exclusivamente para:

recoverable;

success;

CTA principal;

valores positivos.

Warning

Ámbar.

Danger

Rojo.

Dormant

Violeta/gris.

No utilizar colores excesivamente saturados en todos los componentes.

6. Tipografía

Principal

Inter / Geist Sans.

Uso:

headings;

navegación;

cards;

botones;

contenido.

Monospace

Geist Mono / JetBrains Mono.

Uso:

wallet addresses;

transaction hashes;

token addresses;

números técnicos;

timestamps;

datos blockchain.

7. Grid

Desktop:

max-width: 1440px
padding: 24–40px


Breakpoints:

xs   < 480
sm   480
md   768
lg   1024
xl   1280
2xl  1536


La aplicación debe ser totalmente responsive.

8. Navegación principal

Desktop:

DEADCHAIN

Explore
Wallet
Tokens
Whales
Alerts

                    Search
                    Connect Wallet


Mobile:

DEADCHAIN       ☰


Menú:

Explore
Wallet
Tokens
Whales
Alerts

────────────

Documentation
About


9. Header

El header debe permanecer sticky.

Elementos:

[DEADCHAIN]

Explorer
Wallets
Tokens
Whales

                    [Search] [Connect Wallet]


Altura aproximada:

64px

Fondo parcialmente transparente con blur.

10. Global Search

Debe existir un buscador global.

Placeholder:

Search wallet, token or transaction...

Debe detectar automáticamente:

Solana wallet;

token mint;

transaction signature;

posteriormente EVM address.

Ejemplo:

Search:
7xK...92F


Resultado:

Wallet
Solana
7xK...92F


11. HOME

La home es la página más importante.

Hero

Pantalla inicial:

THE CRYPTO GRAVEYARD

Find what's dead.
Recover what's yours.

Discover dormant wallets,
abandoned assets and recoverable funds.

[ Paste wallet address........................ ]

[ ANALYZE WALLET ]


Debajo:

No wallet connection required.
Solana supported.


12. Hero animation

Cuando no existe interacción:

Animación muy sutil de:

partículas;

pequeños nodos;

líneas;

hashes;

wallet addresses.

No debe distraer.

Cuando el usuario empieza a escribir:

background animation reduce;

input adquiere protagonismo.

Al pulsar ANALYZE:

SCANNING BLOCKCHAIN


con una animación de análisis.

13. Live statistics

Debajo del hero:

GLOBAL GRAVEYARD

2,481,293
Dormant wallets

$482M
Dormant assets

$18.7M
Recoverable

18,492
Dormant whales


Durante MVP estos datos pueden ser específicos de Solana.

La interfaz debe estar preparada para cambiar:

SOLANA
ETHEREUM
BASE
BSC
ALL CHAINS


14. Home — explicación

Sección:

WHAT IS DEADCHAIN?

Tres cards:

DISCOVER

Find dormant and abandoned wallets.

ANALYZE

Understand what happened and what they hold.

RECOVER

Recover assets when technically possible.

15. Home — Recovery CTA

Sección:

FOUND MONEY IN YOUR WALLET?

Scan your wallet and discover
forgotten recoverable accounts.

[ SCAN MY WALLET ]


Esta sección debe utilizar un diseño visual más contrastado.

16. Home — Explore

Mostrar:

LATEST DISCOVERIES


Cards:

🐋 Dormant Whale
$4.2M
Inactive 4.8 years

🪦 Oldest Wallet
6.7 years

💰 Largest Recoverable
1.42 SOL


17. Home — Supported chains

MVP:

SOLANA


Las demás aparecen como:

ETHEREUM
COMING SOON

BASE
COMING SOON

BSC
COMING SOON


Esto genera expectativa sin fingir funcionalidades inexistentes.

18. Wallet Analysis Page

Ruta:

/wallet/[address]


Es la pantalla principal del producto.

19. Wallet header

WALLET AUTOPSY

7xK...92F

[Copy] [Explorer]

SOLANA

Last activity
847 days ago

Wallet age
4.8 years


Estado:

DORMANT


20. Dead Score

Elemento visual principal.

DEAD SCORE

94
/100


Visual:

circular progress;

número grande;

descripción.

Ejemplo:

Highly dormant

Debajo:

Based on transaction activity, asset movement and historical behavior.

21. Activity Score

Segundo indicador:

ACTIVITY

8 / 100

████░░░░░░░░░░░░░░


Descripción:

Very low recent activity.

22. Wallet summary

Grid:

Portfolio
$12,482

SOL Balance
2.81 SOL

Assets
47

Transactions
1,842

Last Activity
847d ago

Wallet Age
4.8y


En mobile:

cards apiladas.

23. Recoverable Card

Esta es la card más importante.

RECOVERABLE

0.0842 SOL

≈ $14.21

32 empty token accounts

[ RECOVER FUNDS ]


Badge:

READY


Microcopy:

Recoverable account rent. No private key required.

24. Wallet health

Sección:

WALLET HEALTH

Cleanliness       38/100
Activity          8/100
Asset diversity   72/100
Dormancy          94/100


Mostrar barras horizontales.

25. Assets table

Tabla:

ASSET
BALANCE
VALUE
STATUS
LAST MOVEMENT


Ejemplo:

SOL
2.81
$421
ACTIVE
2 days ago

BONK
18,421
$320
DORMANT
422 days

XYZ
12,421
$84
ABANDONED
1,284 days

TOKEN ACCOUNT
0
—
RECOVERABLE
—


26. Asset filters

Filtros:

All
Active
Dormant
Abandoned
Recoverable
Suspicious


Orden:

Value
Last activity
Balance
Status


27. Activity Timeline

Visualización:

WALLET ACTIVITY

2026
│
├── Aug 18
│
├── May 03
│
├── Jan 12
│
└── 2025
     ...


Eventos:

received;

sent;

swap;

NFT;

token movement;

account creation;

account closure.

28. Dormancy explanation

Sección:

WHY IS THIS WALLET DORMANT?

Mostrar razones:

✓ No outgoing transaction for 847 days
✓ No token movement for 422 days
✓ No DEX activity for 611 days
✓ 32 unused token accounts
✓ Activity declined 94%


Y:

CONFIDENCE

91%


29. Wallet action bar

Sticky bottom bar en desktop cuando sea necesario:

32 recoverable accounts

0.0842 SOL

[ CLEAN & RECOVER ]


En mobile:

CTA fijo inferior.

30. Recovery Flow

Ruta:

/recover


Pero idealmente se abre como modal/wizard desde wallet analysis.

31. Recovery Step 1

RECOVER FUNDS

We found:

32 empty token accounts

Estimated recovery:

0.0842 SOL

[ CONTINUE ]


32. Recovery Step 2

Preview:

RECOVERY PREVIEW

Accounts to close
32

You receive
0.0842 SOL

Network fee
~0.0001 SOL

Estimated net
0.0841 SOL


Warning:

Only empty/recoverable accounts will be closed.

33. Recovery Step 3

Connect wallet.

Wallet options:

[ Phantom ]

[ Solflare ]

[ Backpack ]


La interfaz debe utilizar adapters oficiales cuando estén disponibles.

34. Recovery Step 4

Transaction signing.

WAITING FOR WALLET

Approve the transaction
in your wallet.


Nunca pedir:

seed phrase;

private key;

password.

35. Recovery Step 5

Success.

RECOVERY COMPLETE

32 accounts closed

0.0842 SOL recovered

≈ $14.21

[ VIEW TRANSACTION ]

[ SHARE RESULT ]


Animación:

subtle particle burst;

counter animation;

checkmark.

36. Wallet Cleanup

Después del recovery:

WALLET CLEANLINESS

Before
38/100

After
100/100


Esto crea una experiencia gamificada.

37. Share Card

Generar tarjeta visual:

DEADCHAIN

WALLET CLEANED

32 accounts removed

0.0842 SOL recovered

CLEANLINESS
100/100

deadchain.xyz


Formatos:

1200 × 630 para X/social;

1080 × 1080;

vertical posteriormente.

38. Explorer

Ruta:

/explorer


Header:

DEAD WALLET EXPLORER

Explore dormant wallets across the blockchain.


39. Explorer filters

Sidebar desktop.

CHAIN
○ Solana

STATUS
☐ Dormant
☐ Abandoned
☐ Whale
☐ Oldest

VALUE
○ Any
○ $1K+
○ $10K+
○ $100K+
○ $1M+

DORMANCY
○ 1 year+
○ 3 years+
○ 5 years+


Mobile:

Button:

[ FILTERS ]


abre drawer.

40. Explorer results

Cards o tabla.

Desktop:

Wallet
Status
Value
Last Activity
Dead Score


Ejemplo:

7xK...92F
DORMANT
$4.2M
4.8 years
94

0x82...91F
DORMANT
$2.8M
5.2 years
97


41. Wallet public profile

Cada wallet tendrá una URL pública:

/wallet/7xK...92F


SEO-friendly.

Debe incluir:

title;

description;

wallet status;

estimated holdings;

activity;

dead score;

dormant period.

42. Token page

Ruta:

/token/[address]


Header:

TOKEN

XYZ

$0.0021

Market Cap
$18.2M

Holders
42,182


43. Token Dormancy

Elemento diferencial:

TOKEN ACTIVITY

Active holders
42%

Dormant holders
31%

Abandoned
18%

Unknown
9%


Y:

DORMANT SUPPLY

27.8%


44. Token holder table

RANK
WALLET
BALANCE
VALUE
LAST MOVEMENT
STATUS


Filtros:

whale;

dormant;

active;

abandoned.

45. Whales

Ruta:

/whales


Hero:

DORMANT WHALES

Track wallets that hold serious money but haven't moved in years.

Cards:

$14.2M
6.1 years dormant

$8.9M
5.7 years dormant

$6.3M
4.9 years dormant


46. Whale profile

WHALE

0x82A...91F

Portfolio
$14.2M

Dormant
6.1 years

Dead Score
98


Portfolio breakdown:

SOL      42%
USDC     31%
XYZ      19%
Other     8%


47. Alerts

Ruta:

/alerts


MVP puede mostrar:

COMING SOON


Pero diseñar desde el principio.

Posteriormente:

WATCHED WALLETS

7xK...92F
🐋 Dormant whale

0x82...91F
💰 $4.2M

[ ADD WALLET ]


48. Alert creation

WATCH WALLET

Address
7xK...92F

Alert me when:

☐ Wallet becomes active
☐ Large transaction
☐ Token movement
☐ Balance change

Delivery:

☐ Email
☐ Telegram
☐ Browser


49. Search experience

Al pulsar el buscador:

Modal:

SEARCH DEADCHAIN

Wallet address
Token address
Transaction

Recent searches


Resultados en tiempo real.

50. Loading states

Nunca mostrar una pantalla blanca.

Durante análisis:

ANALYZING WALLET

[✓] Resolving address
[✓] Fetching balances
[✓] Loading token accounts
[✓] Checking activity
[•] Calculating Dead Score
[ ] Checking recovery


Cada etapa debe actualizarse.

51. Skeleton loading

Para:

cards;

tables;

charts;

wallet summary.

Evitar spinners genéricos siempre que sea posible.

52. Error states

Invalid address

INVALID ADDRESS

This doesn't look like a valid
Solana wallet address.

[ TRY AGAIN ]


Wallet not found

WALLET NOT FOUND

We couldn't retrieve blockchain
data for this address.


RPC error

BLOCKCHAIN DATA TEMPORARILY UNAVAILABLE

Try again in a moment.


Recovery unavailable

NOT RECOVERABLE

We found the account, but there is
currently no supported recovery action.


53. Empty states

Ejemplo:

NO RECOVERABLE ACCOUNTS

Your wallet is already clean.

✨ Cleanliness: 100/100


Esto convierte una ausencia de datos en una experiencia positiva.

54. Tooltips

Los conceptos blockchain deben explicarse.

Ejemplo:

Dead Score

A proprietary indicator estimating how dormant a wallet appears based on blockchain activity.

Recoverable

Funds that can be reclaimed through a supported blockchain operation.

Dormant

No significant activity detected during the selected period.

55. Responsive design

Desktop

Dashboard completo.

Tablet

Reducir:

sidebar;

grids;

table columns.

Mobile

Prioridad:

wallet;

score;

recoverable;

assets;

activity.

Las tablas se convierten en cards.

56. Mobile navigation

Bottom navigation:

Home
Explore
Wallet
Whales
Menu


El botón Wallet puede mostrar:

Connect


si no hay wallet conectada.

57. Animaciones

Utilizar Framer Motion.

Animaciones recomendadas:

page transitions;

score counter;

progress bars;

card reveal;

scan progress;

recovery success;

hover effects;

number changes.

No utilizar animaciones permanentes excesivas.

58. Scan animation

Esta será una pieza de identidad.

Durante análisis:

      ┌─────────────┐
      │             │
      │    7xK...   │
      │             │
      └─────────────┘

       SCANNING
     ─────────────


Una línea de scanner recorre el bloque.

Al finalizar:

AUTOPSY COMPLETE


59. Componentes principales

Crear un sistema de componentes desde el inicio.

/components

ui/
    Button
    Card
    Badge
    Input
    Modal
    Drawer
    Tooltip
    Tabs
    Progress
    Skeleton

layout/
    Header
    Sidebar
    MobileNav
    Footer

wallet/
    WalletHeader
    WalletScore
    WalletSummary
    WalletAssets
    WalletActivity
    WalletHealth
    RecoverableCard
    WalletStatus

recovery/
    RecoverySummary
    RecoveryPreview
    WalletSelector
    TransactionStatus
    RecoverySuccess

explorer/
    ExplorerFilters
    ExplorerTable
    WalletResultCard

token/
    TokenHeader
    TokenStats
    HolderTable
    DormancyChart

charts/
    ActivityChart
    DormancyChart
    PortfolioChart


60. Estado global

Utilizar:

Zustand

Para:

wallet connection
selected chain
current wallet
scan state
recovery state
preferences


React Query / TanStack Query para datos remotos.

61. Routing

Next.js App Router.

app/

page.tsx

wallet/
    [address]/
        page.tsx

explorer/
    page.tsx

token/
    [address]/
        page.tsx

whales/
    page.tsx

alerts/
    page.tsx

recover/
    page.tsx

docs/
    page.tsx


62. Data layer

No introducir llamadas API directamente en componentes.

Utilizar:

/lib/api

walletApi
tokenApi
explorerApi
recoveryApi
pricingApi


Hooks:

useWalletAnalysis()
useWalletAssets()
useWalletActivity()
useRecoverableAccounts()
useToken()
useDormantWhales()


63. Tipado

Todos los datos deben estar fuertemente tipados.

Ejemplo conceptual:

WalletAnalysis

address
chain
status
deadScore
activityScore
cleanlinessScore
balance
portfolioValue
lastActivity
walletAge
assets
recoverable


Nunca utilizar any salvo casos excepcionales.

64. Seguridad frontend

Reglas obligatorias:

Nunca

almacenar seed phrases;

almacenar private keys;

pedir claves;

enviar claves al backend;

construir interfaces que parezcan solicitar claves.

Wallet signing

Siempre:

Frontend
↓
Build transaction
↓
Wallet adapter
↓
User approval
↓
Blockchain


65. Transaction UX

Antes de cualquier firma:

WHAT WILL HAPPEN

Close
32 token accounts

Receive
0.0842 SOL

Network fee
0.0001 SOL

Total
0.0841 SOL

[ CANCEL ]

[ SIGN TRANSACTION ]


Esto reduce errores y aumenta confianza.

66. SEO

Aunque sea una SPA visual, DEADCHAIN debe utilizar capacidades SEO de Next.js.

Páginas indexables:

/wallet/[address]
/token/[address]
/whales
/explorer


Metadata dinámica.

Ejemplo:

Dead Wallet 7xK...92F — DEADCHAIN


Structured data cuando sea apropiado.

67. Social previews

Cada wallet pública debe generar Open Graph.

Ejemplo:

DEADCHAIN

Wallet 7xK...92F

Dead Score: 94
Dormant: 4.8 years
Recoverable: 0.0842 SOL


Esto hará que compartir enlaces sea mucho más atractivo.

68. Performance

Objetivos:

Lighthouse

Performance:

90+

Accessibility:

95+

Best Practices:

95+

SEO:

95+

69. Optimización

Server Components donde tenga sentido.

Client Components únicamente donde sean necesarios.

Lazy loading para charts.

Virtualización para tablas grandes.

Cache de consultas.

Debounce del buscador.

Skeleton states.

Optimización de fuentes.

Compresión de imágenes.

70. Accessibility

Cumplir WCAG AA.

Especialmente:

keyboard navigation;

focus states;

aria labels;

contraste;

screen reader support;

botones claramente identificables.

71. Analytics

Desde el MVP instrumentar:

page_view

wallet_search

wallet_analysis_started

wallet_analysis_completed

recoverable_found

connect_wallet_clicked

wallet_connected

recovery_started

recovery_signed

recovery_completed

share_clicked

explorer_search

token_viewed


Esto permitirá saber dónde abandonan los usuarios.

72. Conversión principal

El funnel más importante:

LANDING
   ↓
WALLET SEARCH
   ↓
ANALYSIS
   ↓
RECOVERABLE DISCOVERED
   ↓
CONNECT WALLET
   ↓
SIGN
   ↓
RECOVERY
   ↓
SHARE


La métrica principal del MVP debería ser:

% de wallets analizadas que encuentran valor recuperable

Y después:

% que completa recovery

73. Gamificación

Sistema inicial:

Wallet Cleanliness

0–100.

Dead Score

0–100.

Recovery

Cantidad recuperada.

Explorer badges

Posteriormente:

🧹 Wallet Cleaner
🐋 Whale Hunter
🪦 Graveyard Explorer
💰 Recovery Master


No introducir NFT/token inicialmente.

74. Microcopy

El tono debe ser:

directo;

inteligente;

ligeramente oscuro;

divertido;

nunca infantil.

Ejemplos:

Your wallet has some unfinished business.

We found something you forgot.

This wallet hasn't moved in 1,284 days.

32 accounts are collecting dust.

You can recover 0.0842 SOL.

Your wallet is clean.

75. Landing copy

Hero:

Find what's dead. Recover what's yours.

Subheadline:

Discover dormant wallets, abandoned assets and recoverable funds across the blockchain.

CTA:

ANALYZE WALLET

Secondary:

Explore the Graveyard

76. MVP — páginas obligatorias

La primera versión frontend debe incluir:

✓ Home
✓ Wallet search
✓ Wallet Autopsy
✓ Dead Score
✓ Wallet health
✓ Asset classification
✓ Recoverable accounts
✓ Recovery flow
✓ Wallet connection
✓ Transaction preview
✓ Recovery success
✓ Share result
✓ Explorer
✓ Responsive mobile
✓ Error states
✓ Loading states
✓ SEO metadata


77. MVP — páginas que NO desarrollar todavía

No invertir inicialmente en:

✗ User accounts
✗ Subscription system
✗ Ethereum
✗ BSC
✗ Advanced alerts
✗ Telegram
✗ API dashboard
✗ AI assistant
✗ Token
✗ DAO
✗ Social network


Todo eso puede venir después.

78. Orden de desarrollo frontend

Sprint 1 — Foundation

Next.js

TypeScript

Tailwind

component system

dark theme

layout

header

responsive navigation

routing

Sprint 2 — Home

Hero

wallet input

scan animation

live statistics

feature sections

recovery CTA

responsive

Sprint 3 — Wallet Autopsy

wallet header

status

Dead Score

summary

assets

health

activity

recoverable card

Sprint 4 — Recovery

recovery modal

account selection

preview

wallet connection

signing state

success state

share card

Sprint 5 — Explorer

filters

wallet cards

table

wallet public pages

sorting

pagination

Sprint 6 — Polish

animations

loading states

error states

mobile

accessibility

SEO

OG cards

analytics

performance

79. Arquitectura visual final

El producto debe sentirse como:

                  DEADCHAIN
                      │
          ┌───────────┴───────────┐
          │                       │
       DISCOVER                 RECOVER
          │                       │
      Explorer                Wallet
          │                       │
       Wallets                Cleanup
          │                       │
       Tokens                 Recovery
          │
       Whales


Pero todo debe converger en una idea:

UNDERSTAND WHAT'S HAPPENING TO YOUR ASSETS.

80. Prioridad absoluta

Si hay que sacrificar funcionalidades para acelerar el lanzamiento, el orden es:

1. Wallet Scan

Debe ser excelente.

2. Recoverable

Debe ser extremadamente claro.

3. Recovery

Debe sentirse seguro.

4. Dead Score

Debe ser visualmente memorable.

5. Share

Debe hacer que el producto sea viral.

6. Explorer

Debe generar SEO y descubrimiento.

Todo lo demás después.

81. Definición de "Frontend MVP terminado"

El frontend estará listo cuando un usuario pueda:

Entrar en DEADCHAIN.

Entender el producto en menos de 5 segundos.

Introducir una dirección Solana.

Ver una animación de análisis.

Obtener un informe visual.

Entender si su wallet está dormida.

Ver sus activos.

Ver qué es recuperable.

Conectar su wallet.

Ver exactamente qué transacción va a firmar.

Firmarla.

Ver cuánto recuperó.

Compartir el resultado.

Volver al Explorer.

Ese será nuestro Vertical Slice 1.

82. Resultado esperado

DEADCHAIN no debe parecer:

"otro Solana wallet checker".

Debe parecer:

una plataforma de inteligencia blockchain que casualmente puede recuperar dinero.

La recuperación es el hook económico.

El Graveyard es el hook visual.

El Explorer es el hook SEO.

Las Whales y Alerts serán el hook de retención.

Y la API será posteriormente el hook B2B.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/752fb58e-7971-4706-8ee8-29c0215d5301).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
