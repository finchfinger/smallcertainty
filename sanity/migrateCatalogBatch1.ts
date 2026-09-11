import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
const apply=process.argv.includes("--apply");

if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
if(apply&&!token) throw new Error("SANITY_API_WRITE_TOKEN is required with --apply.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const batch=process.argv.includes("--batch=9")?9:process.argv.includes("--batch=8")?8:process.argv.includes("--batch=7")?7:process.argv.includes("--batch=6")?6:process.argv.includes("--batch=5")?5:process.argv.includes("--batch=4")?4:process.argv.includes("--batch=3")?3:process.argv.includes("--batch=2")?2:1;
const files=batch===9?["content/catalog-revision/batch-9-culture-places.md"]:batch===8?["content/catalog-revision/batch-8-sport-outdoors.md"]:batch===7?["content/catalog-revision/batch-7-kids.md"]:batch===6?["content/catalog-revision/batch-6-womens.md"]:batch===5?["content/catalog-revision/batch-5-mens.md"]:batch===4?["content/catalog-revision/batch-4-garden-body.md"]:batch===3?["content/catalog-revision/batch-3-office-tech-accessories.md"]:batch===2?["content/catalog-revision/batch-2-kitchen.md"]:[
  "content/catalog-revision/batch-1-home.md",
  "content/catalog-revision/batch-1-bedroom.md",
  "content/catalog-revision/batch-1-bath.md",
];

const honorableMentionUrls:Record<string,string>={
  "Vitra Mariposa":"https://www.vitra.com/en-us/product/details/mariposa-3-seater",
  "B&B Italia Camaleonda":"https://www.bebitalia.com/en-us/en-us-camaleonda-divani.html",
  "Carl Hansen & Søn CH25":"https://www.carlhansen.com/en/en/collection/chairs/lounge-chairs/ch25",
  "Vitra Grand Repos":"https://www.vitra.com/en-us/product/details/grand-repos",
  "Vitra Standard Chair":"https://www.vitra.com/en-us/product/details/standard-chair",
  "Herman Miller Eames DCM":"https://store.hermanmiller.com/dining-furniture-chairs-stools/eames-molded-plywood-dining-chair-metal-base-dcm-upholstered/100699492.html",
  "Artek Table 91":"https://www.artek.fi/en/products/aalto-table-round",
  "Carl Hansen & Søn CH337":"https://www.carlhansen.com/en/en/collection/tables-desks/dining-tables/ch337",
  "Vitra Guéridon Bas":"https://www.vitra.com/en-us/product/details/gueridon-bas",
  "Artek Table 90B":"https://shop.artek.fi/products/aalto-table-90b",
  "String System":"https://www.stringfurniture.com/en-us/products/system",
  "USM Haller":"https://us.usm.com/pages/usm-haller-system",
  "Vitra Butterfly Stool":"https://www.vitra.com/en-us/product/details/butterfly-stool",
  "Magis Déjà-vu Stool":"https://www.magisdesign.com/product/deja-vu-stool/",
  "Artek Kiila":"https://www.artek.fi/en/products/kiila-coat-stand",
  "Schönbuch Sticks":"https://www.schoenbuch.com/collection/furniture/coat-racks/sticks",
  "Nanimarquina Tres":"https://us.nanimarquina.com/products/tres",
  "Märta Måås-Fjetterström":"https://mmf.se/collections/marta-maas-fjetterstrom",
  "Vitra Akari 10A":"https://www.vitra.com/en-us/product/details/akari-10a",
  "Santa & Cole TMM":"https://usa.santacole.com/en/lighting/floor-lamps/tmm-414/",
  "Flos Snoopy":"https://flos.com/en/us/snoopy/M-snoopy.html",
  "Louis Poulsen PH 3/2":"https://www.louispoulsen.com/en/catalog/private/table/ph-32-table",
  "Klippan Gotland":"https://www.klippanhomestore.co.uk/collections/swedish-and-gotland-wool",
  "Artek Siena":"https://www.artek.fi/en/products/patterns-and-textiles",
  "Arne Jacobsen Bankers":"https://www.rosendahl.com/en/intl/arne-jacobsen-clocks/products/aj-bankers-wall-clock-whiteblackred-oe21-cm-43630",
  "Vitra Ball Clock":"https://www.vitra.com/en-us/product/details/ball-clock",
  "Georg Jensen Koppel":"https://www.georgjensen.com/en-us/home-decor/vases/koppel-vase-large/10009656.html",
  "Vitra Nuage":"https://www.vitra.com/en-us/product/details/nuage",
  "Miele Complete C3":"https://www.mieleusa.com/c/complete-c3-series-2234.htm",
  "Numatic Henry":"https://www.myhenry.com/machines",
  "Zeitraum Mo":"https://www.zeitraum-moebel.de/products/beds/mo/",
  "Thuma Classic":"https://www.thuma.co/products/classic-bed",
  "Hästens Maranga":"https://www.hastens.com/en/beds/maranga",
  "Hastens Maranga":"https://www.hastens.com/en/beds/maranga",
  "Saatva Classic":"https://www.saatva.com/mattresses/saatva-classic",
  "St Geneve Embassy Down":"https://www.stgeneve.com/products/embassy-pillow/",
  "Tempur-Pedic TEMPUR-Neck":"https://www.tempurpedic.com/shop-pillows/tempur-neck-pillow/v/572/",
  "Sferra Grande Hotel":"https://www.sferra.com/products/grande-hotel-collection",
  "Tekla Percale":"https://teklafabrics.com/category/bedding",
  "Feathered Friends Bavarian 700":"https://featheredfriends.com/collections/down-comforters/products/feathered-friends-bavarian-down-comforter",
  "Sferra Somerset":"https://www.sferra.com/products/somerset-duvet",
  "Kartell Componibili":"https://www.kartell.com/en/componibili",
  "Zeitraum Mellow":"https://www.zeitraum-moebel.de/products/side-tables/nightstand/",
  "Anglepoise Type 75":"https://www.anglepoise.com/usa/product/type-75-desk-lamp-slate-grey/",
  "Flos Tab":"https://flos.com/en/wo/tab-table-black/F6563030.html",
  "Seiko Everything Alarm Clock":"https://www.seikoclocksusa.com/collections/alarm-clocks",
  "Lexon Flip Premium":"https://lexon-design.com/uk/flip-premium",
  "Tekla Organic Cotton":"https://teklafabrics.com/category/bathroom",
  "Frette Unito":"https://www.frette.com/en_US/unito-bath-towel.html",
  "Marimekko Unikko":"https://www.marimekko.com/eu_en/unikko-shower-curtain-180x200-cm-sand-off-white-hay-emerald-075930-818",
  "Coyuchi Organic Cotton":"https://www.coyuchi.com/products/organic-shower-curtain",
  "Hansgrohe Raindance Select S":"https://www.hansgrohe-usa.com/articledetail-raindance-select-s-showerhead-240-2-jet-1-8-gpm-04720000",
  "Grohe Rainshower":"https://www.grohe.us/products/260-shower-head-10-3-sprays-1-75-gpm",
  "Dornbracht Tara":"https://www.dornbracht.com/us-en/products/bathroom/tara",
  "Fantini Nostromo":"https://www.fantini.it/en-us/product/49-4424-5013e812bu",
  "BetteStarlet":"https://www.bette.de/en/products/baths/bettestarlet/",
  "Agape Spoon":"https://www.agapedesign.it/en-GB/bathtubs/spoon/",
  "Agape Ottocento":"https://www.agapedesign.it/en-GB/washbasins/ottocento/",
  "Laufen Val":"https://www.laufen.com/collections/val",
  "Fritz Hansen Adnet Circular":"https://www.fritzhansen.com/en/categories/by-series/adnet/adnet-circular-mirror",
  "FontanaArte 0024":"https://www.fontanaarte.com/en/0024.html",
};

Object.assign(honorableMentionUrls,{
  "Tojiro DP 210mm":"https://www.tojiro-japan.com/products/tojiro-dp-3layered-by-vg10-chef-knife-210mm/",
  "Wüsthof Classic Ikon":"https://www.wusthof.com/products/classic-ikon-8-inch-chefs-knife",
  "Hasegawa FRK":"https://hasegawakagaku.com/products/wood-core-soft-rubber-cutting-board/",
  "John Boos Maple Block":"https://www.johnboos.com/products/boos-blocks/cutting-boards/",
  "Demeyere Industry 5":"https://www.zwilling.com/us/demeyere-industry-5-12.5-inch-frying-pan-48628.html",
  "Mauviel M’Cook":"https://mauviel-usa.com/collections/mcook",
  "Field No. 10":"https://fieldcompany.com/products/no-10-cast-iron-skillet",
  "Smithey No. 12":"https://smithey.com/products/no-12-cast-iron-skillet",
  "All-Clad D3 3-Quart":"https://www.all-clad.com/d3-stainless-3-ply-bonded-cookware-sauce-pan-with-lid-3-quart.html",
  "Staub Cocotte":"https://www.zwilling.com/us/staub-cast-iron-5.5-qt-round-cocotte-1102625.html",
  "Lodge Enameled Dutch Oven":"https://www.lodgecastiron.com/product/enameled-dutch-oven",
  "Vollrath Wear-Ever":"https://www.vollrathfoodservice.com/products/smallwares/cookware-bakeware/wear-ever-bakeware/sheet-pans",
  "USA Pan":"https://www.usapan.com/half-sheet-pan-1050hs",
  "RSVP Endurance":"https://www.rsvp-intl.com/product/endurance-precision-pierced-colander/",
  "OXO Good Grips":"https://www.oxo.com/5-qt-stainless-steel-colander.html",
  "Victorinox REX":"https://www.victorinox.com/en-US/Products/Cutlery/Graters-and-Peelers/REX-Peeler/p/6.0900",
  "OXO Swivel Peeler":"https://www.oxo.com/swivel-peeler-349.html",
  "Unicorn Magnum":"https://www.unicornmills.org/magnum-plus.html",
  "Zassenhaus Berlin":"https://www.zassenhaus-brandshop.com/en/Zassenhaus-Pepper-and-salt-mill-BERLIN/",
  "Blendtec Classic 575":"https://www.blendtec.com/products/classic-575",
  "Breville Super Q":"https://www.breville.com/en-us/product/bbl920",
  "Ankarsrum Assistent Original":"https://www.ankarsrum.com/us/product/assistent-original/",
  "KitchenAid Bowl-Lift":"https://www.kitchenaid.com/countertop-appliances/stand-mixers/bowl-lift-stand-mixers.html",
  "Breville A Bit More":"https://www.breville.com/en-us/product/bta720",
  "Rowlett Regent":"https://rowlett.co.uk/product/regent-toasters/",
  "Ratio Six":"https://ratiocoffee.com/products/ratio-six",
  "Fellow Aiden":"https://fellowproducts.com/products/aiden-precision-coffee-maker",
  "Fellow Ode Gen 2":"https://fellowproducts.com/products/ode-brew-grinder-gen-2",
  "Comandante C40":"https://www.comandantegrinder.com/grinders/c40-mk4-nitro-blade",
  "Rancilio Silvia Pro X":"https://www.ranciliogroup.com/rancilio/silvia-pro-x/",
  "Profitec GO":"https://www.profitec-espresso.com/en/products/go",
  "Alessi 9090":"https://us.alessi.com/products/9090-espresso-coffee-maker",
  "Giannini Giannina":"https://www.giannini.it/en/products/giannina/",
  "Hario Buono":"https://www.hario-usa.com/products/v60-buono-pour-over-kettle",
  "Dualit Classic":"https://www.dualit.com/products/classic-kettle",
  "Kinto Leaves to Tea":"https://kinto-usa.com/collections/teaware/products/21231",
  "Marimekko Oiva":"https://www.marimekko.com/us_en/home/tableware/teapots",
  "Heath Ceramics Coupe":"https://www.heathceramics.com/collections/coupe-line",
  "Hasami Porcelain":"https://hasami-porcelain.com/collections/all",
  "Iittala Kartio":"https://www.iittala.com/en-us/tableware/drinkware/tumblers/kartio",
  "Bormioli Rocco Bodega":"https://www.bormiolirocco.com/en/product/bodega/",
  "Gabriel-Glas Gold Edition":"https://gabriel-glasinternational.com/products/gold-edition/",
  "Riedel Veritas":"https://www.riedel.com/en-us/collections/riedel-veritas",
  "Château Laguiole":"https://www.chateau-laguiole.com/",
  "Le Creuset Waiter’s Friend":"https://www.lecreuset.com/waiters-friend-corkscrew/WT110.html",
  "Bragard Grand Chef":"https://www.bragardusa.com/aprons/",
  "Maison Empereur":"https://empereur.fr/en/kitchen-textiles/",
  "Vipp 17":"https://vipp.com/en-us/products/bins/vipp17-pedal-bin",
  "Brabantia Bo Touch":"https://www.brabantia.com/us/waste-bins/bo-touch-bins/",
});

Object.assign(honorableMentionUrls,{
"The World of Interiors":"https://www.worldofinteriors.com/","Apartamento":"https://www.apartamentomagazine.com/","Neue Zürcher Zeitung":"https://www.nzz.ch/","Le Monde":"https://www.lemonde.fr/","Mastering the Art of French Cooking":"https://www.penguinrandomhouse.com/books/352690/mastering-the-art-of-french-cooking-volume-1-by-julia-child-louisette-bertholle-and-simone-beck/","The River Cafe Cookbook":"https://www.penguin.co.uk/books/355168/the-river-cafe-cookbook-by-rose-gray-and-ruth-rogers/","Go":"https://www.usgo.org/","Catan":"https://www.catan.com/catan","Man Ray Chess Set":"https://www.manraytrust.com/","DGT Timeless":"https://digitalgametechnology.com/products/chess-pieces/timeless-chess-pieces","Hotel Il Pellicano, Porto Ercole":"https://www.pellicanohotels.com/hotel-il-pellicano/"," Sour Tape":"https://example.com","Aman Tokyo":"https://www.aman.com/hotels/aman-tokyo","Elkano, Getaria":"https://www.restauranteelkano.com/en/","Le Bernardin, New York":"https://www.le-bernardin.com/","Bar Leone, Hong Kong":"https://www.barleonehk.com/","Connaught Bar, London":"https://www.the-connaught.co.uk/restaurants-bars/connaught-bar/","Café Sperl, Vienna":"https://www.cafesperl.at/","Koffee Mameya Kakeru, Tokyo":"https://www.koffee-mameya.com/","Poilâne, Paris":"https://www.poilane.com/","Sullivan Street Bakery, New York":"https://www.sullivanstreetbakery.com/","Tsutaya Books Marylebone":"https://example.com","Tsutaya Books, Tokyo":"https://store.tsite.jp/daikanyama/english/","Tsutaya Books Marylebone, London":"https://example.com","Tsutaya Books Daikanyama, Tokyo":"https://store.tsite.jp/daikanyama/english/","Daunt Honorable":"https://example.com","Libreria Bocca, Milan":"https://www.libreriabocca.com/","Rough Trade East, London":"https://www.roughtrade.com/en-gb/stores/london-east","Amoeba Music, Los Angeles":"https://www.amoeba.com/","Mitsukoshi Nihombashi, Tokyo":"https://www.mistore.jp/store/nihombashi.html","KaDeWe, Berlin":"https://www.kadewe.de/","Metrograph, New York":"https://metrograph.com/","Cinéma du Panthéon, Paris":"https://www.whynotproductions.fr/pantheon/","Nishiki Market, Kyoto":"https://kyoto.travel/en/other_attractions/131.html","Borough Market, London":"https://boroughmarket.org.uk/","Fondation Beyeler, Riehen":"https://www.fondationbeyeler.ch/en/","The Menil Collection, Houston":"https://www.menil.org/","Stockholm Public Library":"https://biblioteket.stockholm.se/bibliotek/stadsbiblioteket","NYPL Schwarzman Building":"https://www.nypl.org/locations/schwarzman","Englischer Garten, Munich":"https://www.muenchen.de/en/sights/englischer-garten-munichs-green-oasis","Yoyogi Park, Tokyo":"https://www.tokyo-park.or.jp/park/yoyogi/index.html","Plage de Saleccia, Corsica":"https://www.visit-corsica.com/","Fteri Beach, Kefalonia":"https://www.visitgreece.gr/islands/ionian-islands/kefalonia/","Brera, Milan":"https://www.yesmilano.it/en/neighborhoods/brera","Frederiksberg, Copenhagen":"https://www.visitcopenhagen.com/copenhagen/neighbourhoods/frederiksberg","Tokyo Station":"https://www.jreast.co.jp/e/stations/e1039.html","Antwerpen-Centraal":"https://www.belgiantrain.be/en/station-information/antwerpen-centraal"
});

Object.assign(honorableMentionUrls,{
"Richard Sachs Custom":"https://richardsachs.com/","Alex Singer Randonneur":"https://www.cycles-alex-singer.fr/","POC Ventral Air MIPS":"https://poc.com/en-us/product/ventral-air-mips","Specialized Prevail 3":"https://www.specialized.com/us/en/s-works-prevail-3/p/1000208086","Yonex EZONE 98":"https://www.yonex.com/tennis/racquets/ezone","Babolat Pure Drive 98":"https://www.babolat.com/us/pure-drive-98/","Wilson A2000":"https://www.wilson.com/en-us/baseball/baseball-gloves/a2000","Mizuno Pro":"https://mizunousa.com/baseball-mizuno-pro","Nike Flight":"https://www.nike.com/w/soccer-balls-1gdj0z8y8c","Puma Orbita Ultimate":"https://us.puma.com/us/en/sports/soccer/balls","Wilson Evolution":"https://www.wilson.com/en-us/product/evolution-game-basketball-wz10012","Spalding TF-1000 Legacy":"https://www.spalding.com/tf-1000-legacy-indoor-game-basketball/","Arena Cobra Ultra":"https://www.arenasport.com/en_us/cobra-ultra-swipe-mirror-goggles.html","Swedish Goggles":"https://www.malmsten.com/en/products/swedish-goggles","Jade Harmony":"https://jadeyoga.com/products/harmony-mat","Liforme Original":"https://liforme.com/products/liforme-yoga-mat","Klättermusen Raido 55":"https://www.klattermusen.com/en/backpacks/","Osprey Exos 58":"https://www.osprey.com/exos-58-exos58s22-224","MSR Hubba Hubba":"https://www.msrgear.com/tents/backpacking-tents/hubba-hubba-bikepack-2-person-tent/","Big Agnes Copper Spur UL2":"https://www.bigagnes.com/products/copper-spur-ul2","Feathered Friends Swallow UL 20":"https://featheredfriends.com/products/feathered-friends-swallow-ul-20-30-down-sleeping-bag","Nemo Disco":"https://www.nemoequipment.com/products/disco-mens-endless-promise-down-sleeping-bag","Black Diamond Spot 400-R":"https://blackdiamondequipment.com/products/spot-400-r-headlamp","Nitecore NU25 UL":"https://www.nitecorestore.com/NU25-UL-Headlamp-p/fl-nite-nu25ul.htm","Porter-Yoshida Tanker Boston":"https://www.yoshidakaban.com/en/product/105781.html","Aer Gym Duffel":"https://aersf.com/products/gym-duffel-3","Klean Kanteen Classic":"https://www.kleankanteen.com/collections/classic-water-bottles","Sigg Traveller":"https://sigg.com/us/water-bottles/traveller/","Zojirushi Stainless Mug":"https://shop.zojirushi.com/collections/vacuum-insulated-mugs-bottles","Thermos Stainless King":"https://thermos.com/collections/stainless-king-collection","Opinel No. 8":"https://www.opinel-usa.com/products/no-8-opinel-stainless-steel-blade","Case Trapper":"https://caseknives.com/collections/trapper","Leica Noctivid 8x42":"https://leica-camera.com/en-US/sport-optics/binoculars/noctivid/noctivid-8x42","Zeiss Victory SF 8x42":"https://www.zeiss.com/consumer-products/us/nature-observation/binoculars/victory-sf/victory-sf-8x42.html"
});

Object.assign(honorableMentionUrls,{
"Sunspel Classic Cotton":"https://us.sunspel.com/collections/womens-t-shirts","Leset Margo":"https://leset.com/collections/margo","Charvet Cotton Poplin":"https://www.charvet.com/","Margaret Howell Cotton Shirt":"https://www.margarethowell.co.uk/collections/womens-shirts","Extreme Cashmere No. 167":"https://extreme-cashmere.com/collections/all","John Smedley Poppy":"https://www.johnsmedley.com/women","Max Mara Wool Blazer":"https://us.maxmara.com/clothing/jackets-and-blazers","Margaret Howell":"https://www.margarethowell.co.uk/collections/womens-jackets","Mackintosh Humbie":"https://www.mackintosh.com/us/women/humbie","Loro Piana Roadster":"https://us.loropiana.com/en/woman/coats-and-trench","OrSlow 105":"https://orslow.jp/en/products/105-standard-fit-denim","Toteme Straight-Leg":"https://toteme.com/collections/denim","Araks Antonia":"https://www.araks.com/collections/underwear","Uniqlo AIRism Ultra Seamless":"https://www.uniqlo.com/us/en/women/innerwear/airism","Pantherella Merino":"https://www.pantherella.com/womens-merino-wool-socks","Maria La Rosa":"https://marialarosa.it/en/collections/socks","Desmond & Dempsey":"https://desmondanddempsey.com/collections/womens-pyjamas","Derek Rose":"https://www.derek-rose.com/collections/womens-pajamas","Novesta Star Master":"https://novesta.sk/en/star-master","Moonstar Gym Classic":"https://www.moonstar.co.jp/product/shoes/gym-classic/","ASICS Novablast 6":"https://www.asics.com/us/en-us/novablast/","Saucony Ride":"https://www.saucony.com/en/ride/","Danner Mountain 600":"https://www.danner.com/women/hike/mountain-600.html","Scarpa Rush TRK GTX":"https://us.scarpa.com/rush-trk-gtx-women-s","Smartwool Classic Hike":"https://www.smartwool.com/en-us/women/socks/hiking/classic-hike","Falke TK2":"https://www.falke.com/us_en/women/socks/trekking/","J.M. Weston 180":"https://jmweston.com/collections/women-loafers","G.H. Bass Whitney":"https://www.ghbass.com/collections/womens-loafers","Chanel Ballet Flat":"https://www.chanel.com/us/fashion/p/G02819Y0155294305/ballet-flats-lambskin-patent-calfskin/","Mansur Gavriel Dream Ballerina":"https://www.mansurgavriel.com/collections/flats","Haflinger GZ":"https://haflingerusa.com/products/gz-classic-grizzly-clog","Mahabis Classic":"https://mahabis.com/products/classic-slippers","Rains Curve":"https://www.rains.com/collections/womens-raincoats","Crescent Down Works Montagne":"https://crescentdownworks.com/collections/jackets","Nanga Aurora Tex":"https://nanga.jp/en/product/wear/aurora-tex-down-jacket/","Hunza G Square Neck":"https://www.hunzag.com/collections/swimwear","Solid & Striped Anne-Marie":"https://solidandstriped.com/collections/one-pieces",
"Swatch Skin":"https://www.swatch.com/en-us/watches/skin/","Hermès Heure H":"https://www.hermes.com/us/en/product/heure-h-watch/","Ray-Ban Original Wayfarer":"https://www.ray-ban.com/usa/sunglasses/RB2140original-wayfarer-classic-black/901","Persol 649":"https://www.persol.com/usa/0PO0649--24-31","Comme des Garçons Classic Zip":"https://shop-us.doverstreetmarket.com/collections/comme-des-garcons-wallet","Il Bussetto":"https://ilbussetto.it/en/collections/wallets","Loewe Pebble":"https://www.loewe.com/usa/en/women/accessories/belts","A.P.C. Grace":"https://www.apc-us.com/collections/women-belts","Loewe Puzzle":"https://www.loewe.com/usa/en/women/bags/puzzle","Bottega Veneta Andiamo":"https://www.bottegaveneta.com/en-us/women/bags/andiamo","Begg x Co Wispy":"https://www.beggxco.com/collections/wispy-cashmere-scarves","Johnstons of Elgin":"https://johnstonsofelgin.com/en-us/collections/womens-cashmere-scarves","Hestra Kathryn":"https://www.hestragloves.us/kathryn","Sermoneta":"https://sermonetagloves.com/collections/women","Johnstons of Elgin Cashmere Hat":"https://johnstonsofelgin.com/en-us/collections/womens-cashmere-hats","Rototo Watch Cap":"https://www.rototo.jp/collections/caps"
});

Object.assign(honorableMentionUrls,{
"Lady White Co. Our T-Shirt":"https://ladywhiteco.com/products/our-t-shirt-white","Merz b. Schwanen 215":"https://merzbschwanen.com/shop/215-01-men-s-loopwheeled-t-shirt-7-2oz-classic-fit-white-144","Kamakura Vintage Ivy":"https://kamakurashirts.com/collections/vintage-ivy","Gitman Vintage":"https://gitmanvintage.com/collections/oxford","John Smedley Marcus":"https://www.johnsmedley.com/marcus","Howlin’ Birth of the Cool":"https://howlinknitwear.com/products/birth-of-the-cool","John Smedley Adrian":"https://www.johnsmedley.com/adrian","Fedeli":"https://www.fedelicashmere.com/collections/polo-shirts","Ring Jacket Model 3":"https://ringjacket.com/collections/jackets","Boglioli K-Jacket":"https://www.bogliolimilano.com/collections/k-jacket","Resolute 710":"https://www.resolute.jp/products/710/","Full Count 1101":"https://fullcount.co.jp/en/products/1101","Incotex":"https://www.slowear.com/collections/incotex-men","Buzz Rickson Original-Spec":"https://www.buzzricksons.jp/collections/trousers","Hanro Cotton Sporty":"https://www.hanro.com/en-us/men/collections/cotton-sporty","CDLP Boxer Brief":"https://cdlp.com/products/boxer-brief","Falke Airport":"https://www.falke.com/us_en/p/airport-men-s-socks/14435_3000/","Bresciani Merino":"https://www.bresciani.it/en/collections/men-merino-wool-socks","Sunspel Cotton Pajamas":"https://us.sunspel.com/collections/mens-pyjamas","Tekla Poplin Sleepwear":"https://teklafabrics.com/category/sleepwear","Onitsuka Tiger Mexico 66":"https://www.onitsukatiger.com/us/en-us/mexico-66/c/ao20100000/","Moonstar Gym Classic":"https://www.moonstar.co.jp/product/shoes/gym-classic/","ASICS Novablast 6":"https://www.asics.com/us/en-us/novablast/","Saucony Ride 19":"https://www.saucony.com/en/ride/","Danner Mountain Light II":"https://www.danner.com/mountain-light-ii-5-brown.html","Scarpa Rush TRK GTX":"https://us.scarpa.com/rush-trk-gtx-men-s","Smartwool Classic Hike":"https://www.smartwool.com/en-us/men/socks/hiking/classic-hike","Falke TK2":"https://www.falke.com/us_en/p/tk2-explore-men-trekking-socks/16154_2020/","Alden Indy 403":"https://www.aldenshop.com/products/403-indy-boot-brown-chromexcel","R.M. Williams Comfort Craftsman":"https://www.rmwilliams.com/comfort-craftsman-boot-chestnut-yearling-leather.html","Edward Green Chelsea":"https://www.edwardgreen.com/shop/chelsea-black-calf-black-202-last.html","Church’s Consul":"https://www.church-footwear.com/us/en/p/consul-leather-oxford-shoes/","Haflinger GZ":"https://haflingerusa.com/products/gz-classic-grizzly-clog","Giesswein Vent":"https://us.giesswein.com/products/vent-slippers-men","Stutterheim Stockholm":"https://stutterheim.com/en-us/men/jackets/stockholm","Patagonia Torrentshell":"https://www.patagonia.com/product/mens-torrentshell-3-layer-rain-jacket/85241.html","Nanga Aurora Tex":"https://nanga.jp/en/product/wear/aurora-tex-down-jacket/","Patagonia Down Sweater":"https://www.patagonia.com/product/mens-down-sweater/84675.html","Vilebrequin Moorea":"https://www.vilebrequin.com/us/en/men-swimtrunks-moorea/","Patagonia Baggies":"https://www.patagonia.com/product/mens-baggies-shorts-5-inch/57022.html",
"Braun AW10":"https://us.braun-clocks.com/collections/watches","Casio G-Shock DW-5600":"https://www.casio.com/us/watches/gshock/product.DW-5600E-1V/","Ray-Ban Original Wayfarer":"https://www.ray-ban.com/usa/sunglasses/RB2140original-wayfarer-classic-black/901","Oliver Peoples O’Malley":"https://www.oliverpeoples.com/usa/0OV5183--1005","Il Bussetto Bi-Fold":"https://ilbussetto.it/en/collections/wallets","Bellroy Slim Sleeve":"https://bellroy.com/products/slim-sleeve-wallet","Kreis Leather":"https://kreis-ledermanufaktur.de/en/collections/belts","Tanner Goods":"https://www.tannergoods.com/collections/belts","Charvet Grenadine":"https://www.charvet.com/","Hermès Silk Twill":"https://www.hermes.com/us/en/category/men/ties-bow-ties-and-pocket-squares/ties/","Hestra Geoffrey":"https://www.hestragloves.us/geoffrey-cork","Merola":"https://www.merolagloves.it/en/collections/men-gloves","Drake’s Wool-Silk":"https://us.drakes.com/collections/scarves","Johnstons of Elgin":"https://johnstonsofelgin.com/en-us/collections/mens-cashmere-scarves","Rototo Watch Cap":"https://www.rototo.jp/collections/caps","Inis Meáin Merino Hat":"https://inismeain.ie/collections/accessories","New Era 59FIFTY":"https://www.neweracap.com/collections/59fifty-fitted","Polo Ralph Lauren Chino Cap":"https://www.ralphlauren.com/men-accessories-hats-scarves-gloves/cotton-chino-ball-cap/0074699638.html"
});

Object.assign(honorableMentionUrls,{
"HAY Palissade":"https://www.hay.com/hay/furniture/outdoor-furniture/palissade-collection/","Knoll Bertoia":"https://www.knoll.com/design-plan/product/bertoia-side-chair-outdoor","Fermob Luxembourg":"https://www.fermob.com/en_us/collections/luxembourg.html","EMU Round":"https://www.emu.it/en/collections/round/","Barlow Tyrie Lutyens":"https://www.teak.com/product/lutyens-bench/","Louis Poulsen AJ 50":"https://www.louispoulsen.com/en/catalog/professional/outdoor/aj-50-wall","Santa & Cole Cestita Alubat":"https://usa.santacole.com/en/lighting/portable-lamps/cestita-alubat/","Eternit Spindel":"https://www.swisspearl.com/products/garden/spindel","Ferm Living Hourglass":"https://fermliving.us/products/hourglass-pot-large-black","Burgon & Ball":"https://www.burgonandball.com/collections/watering-cans","Stelton Original":"https://www.stelton.com/products/original-watering-can","Gardena Comfort FLEX":"https://www.gardena.com/int/products/watering/hose/comfort-flex-hose/","Gilmour Flexogen":"https://gilmour.com/products/hoses/flexogen-super-duty-hose","Okatsune 103":"https://okatsune-europe.com/en/okatsune-103-pruning-shears/","ARS VS-8Z":"https://www.arscorporation.jp/product/detail-index.html?id=34","Burgon & Ball RHS":"https://www.burgonandball.com/collections/spades","Spear & Jackson Kew":"https://www.spear-and-jackson.com/products/garden-tools/digging-tools/kew-gardens-collection","Haemmerlin Crusader":"https://www.haemmerlin.com/products/wheelbarrows/","True Temper":"https://www.ames.com/product/true-temper-wheelbarrows/","PK Original":"https://www.pkgrills.com/the-original-pk-grill-smoker-classic-silver/","Big Green Egg":"https://biggreenegg.com/products/large-big-green-egg/","Solo Stove Yukon":"https://www.solostove.com/en-us/p/yukon","Kadai Fire Bowl":"https://www.kadai.com/firebowls/",
"Philips Sonicare 9900 Prestige":"https://www.usa.philips.com/c-p/HX9990_12/sonicare-9900-prestige-power-toothbrush-with-senseiq","Curaprox CS 5460":"https://curaprox.us/toothbrushes/manual-toothbrushes/cs-5460-ultra-soft-p116","Henson AL13":"https://hensonshaving.com/products/henson-al13-in-aircraft-aluminum","Gillette Mach3":"https://gillette.com/en-us/products/razors-trimmers-and-blades/mach3-razor","Denman D3":"https://denmanbrushus.com/products/d3-original-styler-7-row","Kent OS11":"https://kentbrushes.com/products/oval-cushion-pure-bristle-nylon-hairbrush-os11","Parlux Alyon":"https://www.parlux.it/en/products/parlux-alyon/","Laifen Swift":"https://www.laifentech.com/products/laifen-swift-special-high-speed-hair-dryer","Seki Edge SS-106":"https://sekiedge.com/products/ss-106-fingernail-clipper","Tweezerman":"https://www.tweezerman.com/stainless-steel-fingernail-clipper.html","Sachajuan Normal Hair":"https://sachajuan.com/products/normal-hair-shampoo","Kérastase Bain Satin":"https://www.kerastase-usa.com/collections/nutritive/bain-satin-shampoo.html","Aesop Resurrection":"https://www.aesop.com/us/p/body-hand/hand-washes-and-balms/resurrection-aromatique-hand-wash/","Le Labo Hinoki":"https://www.lelabofragrances.com/hinoki-hand-soap-982.html","Eucerin Oil Control":"https://www.eucerin.co.uk/products/sun-protection/oil-control-face-sun-gel-creme-spf-50plus","Beauty of Joseon Relief Sun":"https://beautyofjoseon.com/products/relief-sun-rice-probiotics","Aesop Resurrection Balm":"https://www.aesop.com/us/p/body-hand/hand-washes-and-balms/resurrection-aromatique-hand-balm/","O’Keeffe’s Working Hands":"https://okeeffescompany.com/products/working-hands","Chanel No. 5":"https://www.chanel.com/us/fragrance/p/125530/n5-eau-de-parfum-spray/","Hermès Eau d’Orange Verte":"https://www.hermes.com/us/en/product/eau-d-orange-verte-eau-de-cologne-V107419V0/"
});

Object.assign(honorableMentionUrls,{
"Vitra Compas Direction":"https://www.vitra.com/en-us/product/details/compas-direction","USM Haller Kitos":"https://us.usm.com/pages/usm-kitos","Herman Miller Embody":"https://www.hermanmiller.com/products/seating/office-chairs/embody-chairs/","Steelcase Gesture":"https://www.steelcase.com/products/office-chairs/gesture/","Artemide Tizio":"https://www.artemide.com/en/product/?family=tizio","Flos Kelvin":"https://flos.com/en/us/kelvin-led/M-kelvin-led.html","Leuchtturm1917":"https://www.leuchtturm1917.us/classic-notebooks-1.html","Stalogy 365 Days":"https://stalogy.com/en/products/018/","Pilot Custom 823":"https://pilotpen.us/Product?0=40&1=55&cid=100103","Kaweco Sport":"https://www.kaweco-pen.com/en/series/classic-sport/","Mitsubishi Hi-Uni HB":"https://www.mpuni.co.jp/products/pencils/black/hiuni.html","Tombow Mono 100":"https://www.tombow.com/en/products/mono_100/","Kai 5210":"https://kaiscissors.com/product/5210-8-inch-professional-series-shear/","Ernest Wright General Purpose":"https://ernestwright.co.uk/product/general-purpose-scissors/","Midori Aluminum Multi Ruler":"https://www.midori-japan.co.jp/english/products/multi-ruler/","Staedtler Mars":"https://www.staedtler.com/intl/en/products/technical-drawing-instruments/rulers-set-squares/",
"MacBook Pro 14-inch":"https://www.apple.com/macbook-pro-14-and-16/","Framework Laptop 13":"https://frame.work/products/laptop13-diy-intel-ultra-1","Eizo FlexScan":"https://www.eizo.com/products/flexscan/","Dell UltraSharp":"https://www.dell.com/en-us/shop/dell-ultrasharp-monitors/ar/4009","Keychron Q1 Max":"https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard","Logitech MX Keys S":"https://www.logitech.com/en-us/products/keyboards/mx-keys-s.920-011406.html","Logitech MX Master 3S":"https://www.logitech.com/en-us/products/mice/mx-master-3s.910-006556.html","Razer Pro Click":"https://www.razer.com/productivity/razer-pro-click","Bowers & Wilkins Px7 S3":"https://www.bowerswilkins.com/en-us/product/over-ear-headphones/px7-s3/","Bose QuietComfort Ultra":"https://www.bose.com/p/headphones/bose-quietcomfort-ultra-headphones/QCUH-HEADPHONEARN.html","Bang & Olufsen Beosound A1":"https://www.bang-olufsen.com/en/us/speakers/beosound-a1","Audio Pro Addon T3":"https://www.audiopro.com/en/product/addon-t3-plus/","Leica Q3":"https://leica-camera.com/en-US/photography/cameras/q/q3-black","Fujifilm X100VI":"https://fujifilm-x.com/en-us/products/cameras/x100vi/","Rega Planar 3 RS Edition":"https://www.rega.co.uk/products/planar-3-rs-edition","Pro-Ject Debut PRO":"https://www.project-audio.com/en/product/debut-pro/","Roberts Revival":"https://www.robertsradio.com/en-gb/revival-radios","Revo SuperConnect":"https://revo.co.uk/products/superconnect",
"Blunt Classic":"https://bluntumbrellas.com/products/blunt-classic","Davek Elite":"https://davekny.com/products/the-davek-elite","Fjällräven Räven 28":"https://www.fjallraven.com/us/en-us/bags-gear/backpacks-bags/laptop-bags/raven-282/","Master-Piece Potential":"https://shop.master-piece.co.jp/en/products/01741-v3","Longchamp Le Pliage":"https://www.longchamp.com/us/en/le-pliage/","Baggu Standard":"https://www.baggu.com/products/standard-baggu-black","Filson Original Briefcase":"https://www.filson.com/rugged-twill-original-briefcase.html","Frank Clegg Zip-Top Briefcase":"https://frankcleggleatherworks.com/zip-top-briefcase.html","Porter-Yoshida Boston Bag":"https://www.yoshidakaban.com/en/product/search.html?kw=boston","Filson Medium Duffle":"https://www.filson.com/rugged-twill-duffle-bag-medium.html","Globe-Trotter Centenary Carry-On":"https://us.globe-trotter.com/products/centenary-carry-on","Briggs & Riley Baseline Essential":"https://www.briggs-riley.com/products/essential-carry-on-spinner","Craighill Wilson Keyring":"https://craighill.co/products/wilson-keyring","Il Bussetto Key Holder":"https://ilbussetto.it/en/products/key-holder/","Simonnot-Godard Cotton Handkerchief":"https://simonnot-godard.com/en/handkerchiefs/","Muji Cotton Handkerchief":"https://www.muji.us/collections/handkerchiefs"
});

Object.assign(honorableMentionUrls,{
"YOYO³":"https://www.stokke.com/USA/en-us/category/yoyo-strollers","Uppababy Cruz":"https://uppababy.com/strollers/full-size/cruz-v2/","Britax Poplar S":"https://us.britax.com/shop/car-seats/poplar-s-convertible-car-seat","Nuna Rava":"https://nunababy.com/usa/rava-convertible-car-seat","BabyBjörn Harmony":"https://www.babybjorn.com/products/baby-carriers/baby-carrier-harmony/","Tula Free-to-Grow":"https://babytula.com/collections/free-to-grow-baby-carriers","Ergobaby Evolve":"https://ergobaby.com/evolve-3-in-1-bouncer","Stokke Steps":"https://www.stokke.com/USA/en-us/high-chairs/stokke-steps/","Nomi":"https://www.evonomie.com/","IKEA Antilop":"https://www.ikea.com/us/en/p/antilop-high-chair-with-tray-white-silver-color-silver-color-s29067293/","Vitra Panton Junior":"https://www.vitra.com/en-us/product/details/panton-junior","Magis Me Too Little Big":"https://www.magisdesign.com/product/little-big/","Deuter Schmusebär":"https://www.deuter.com/us-en/shop/backpacks/p612214-children-s-backpack-schmusebar","L.L.Bean Junior Original":"https://www.llbean.com/llb/shop/121112","OmieBox":"https://www.omielife.com/products/omiebox","Bentgo Kids Stainless":"https://bentgo.com/products/bentgo-kids-stainless-steel-lunch-box","Early Rider Charger 12":"https://us.earlyrider.com/products/charger-12","Strider 12 Sport":"https://striderbikes.com/buy/shop-all/balance-bikes/12-sport/","Frog 44":"https://www.frogbikes.com/en_US/frog-44-kids-bike.html","Early Rider Belter":"https://us.earlyrider.com/collections/belter","Globber Go Up":"https://www.globber.com/us/product-category/go-up/","Scoot & Ride Highwaykick":"https://www.scootandride.com/en/highwaykick/","Davos Wooden Sled":"https://www.graf-schlitten.ch/en/","L.L.Bean Toboggan":"https://www.llbean.com/llb/shop/51406","Reima Vesi":"https://www.reima.com/en/products/raincoat-vesi","Hatley Splash":"https://hatley.com/collections/kids-rainwear","Kapla 200":"https://www.kapla.com/en/kapla-200-box.html","HABA Basic Building Blocks":"https://www.habausa.com/collections/blocks","Magna-Tiles":"https://www.magnatiles.com/products/classic-100-piece-set","Kapla":"https://www.kapla.com/en/","Jellycat Bashful Bunny":"https://us.jellycat.com/bashful-bunny/","Maileg Bunny":"https://www.mailegusa.com/collections/bunnies-rabbits","Stockmar Wax Crayons":"https://www.stockmar.de/en/products/wax-crayons/","Crayola 24-Count":"https://www.crayola.com/products/crayons/24-count-crayons-52-3024","The Snowy Day":"https://www.penguinrandomhouse.com/books/303357/the-snowy-day-by-ezra-jack-keats/","Goodnight Moon":"https://www.harpercollins.com/products/goodnight-moon-margaret-wise-brown","The Red Balloon":"https://www.criterion.com/films/343-the-red-balloon","Paddington 2":"https://www.warnerbros.com/movies/paddington-2"
});

type Draft={section:string;label:string;winner:string;description:string;winnerUrl:string;mentions:string[]};

const slugify=(value:string)=>value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

function parseDraftFile(path:string):Draft[]{
  const source=readFileSync(resolve(path),"utf8");
  const sectionChunks=source.split(/^## /m).slice(1);
  if(!sectionChunks.length) throw new Error(`Missing section in ${path}`);
  return sectionChunks.flatMap(sectionChunk=>{
    const section=sectionChunk.match(/^(.+)$/m)?.[1].trim();
    if(!section) throw new Error(`Missing section name in ${path}`);
    return sectionChunk.split(/^### /m).slice(1).map(chunk=>{
    const lines=chunk.trim().split("\n");
    const label=lines.shift()!.trim();
    while(lines[0]?.trim()==="") lines.shift();
    const winnerLine=lines.shift()!.trim();
    while(lines[0]?.trim()==="") lines.shift();
    const winner=winnerLine.match(/^\*\*(.+)\*\*$/)?.[1];
    const mentionsLine=lines.find(line=>line.startsWith("Honorable mentions: "));
    const linkLine=lines.find(line=>/^\[Visit site\]\(https?:\/\//.test(line));
    if(!winner||!mentionsLine||!linkLine) throw new Error(`Malformed draft: ${section} / ${label}`);
    const winnerUrl=linkLine.match(/^\[Visit site\]\((.+)\)$/)![1];
    const description=lines.slice(0,lines.indexOf(linkLine)).join("\n").trim();
    const mentions=mentionsLine.replace("Honorable mentions: ","").split(";").map(value=>value.trim());
      return {section,label,winner,description,winnerUrl,mentions};
    });
  });
}

const drafts=files.flatMap(parseDraftFile);
const aliases:Record<string,string>={
  "best-bath-towel":"best-towels",
  "best-pillow":"best-pillows",
};
const sectionSlug=(title:string)=>({"GARDEN & YARD":"garden","MEN’S CLOTHING":"mens-clothing","MEN’S ACCESSORIES":"mens-accessories","WOMEN’S CLOTHING":"womens-clothing","WOMEN’S ACCESSORIES":"womens-accessories",KIDS:"children","SPORT & OUTDOORS":"sport",PLACES:"travel"}[title]||slugify(title));
const sectionTitle=(title:string)=>({"GARDEN & YARD":"Garden","MEN’S CLOTHING":"Men’s Clothing","MEN’S ACCESSORIES":"Men’s Accessories","WOMEN’S CLOTHING":"Women’s Clothing","WOMEN’S ACCESSORIES":"Women’s Accessories",KIDS:"Children","SPORT & OUTDOORS":"Sport",PLACES:"Places"}[title]||title[0]+title.slice(1).toLowerCase());
const sectionOrder:Record<string,number>=batch===9?{CULTURE:16,PLACES:17}:batch===8?{"SPORT & OUTDOORS":14}:batch===7?{KIDS:15}:batch===6?{"WOMEN’S CLOTHING":10,"WOMEN’S ACCESSORIES":11}:batch===5?{"MEN’S CLOTHING":8,"MEN’S ACCESSORIES":9}:batch===4?{"GARDEN & YARD":7,BODY:13}:batch===3?{OFFICE:5,TECH:6,ACCESSORIES:12}:batch===2?{KITCHEN:4}:{HOME:1,BEDROOM:2,BATH:3};

async function main(){
  const missing=[...new Set(drafts.flatMap(d=>d.mentions))].filter(name=>!honorableMentionUrls[name]);
  if(missing.length) throw new Error(`Missing honorable-mention URLs: ${missing.join(", ")}`);

  const current=await client.fetch<Array<{_id:string;label:string;slug:string;section:string}>>(
    `*[_type=="catalogItem"&&defined(slug.current)]{_id,label,"slug":slug.current,"section":section->slug.current}`,
  );
  const sections=await client.fetch<Array<{_id:string;slug:string}>>(
    `*[_type=="catalogSection"]{_id,"slug":slug.current}`,
  );
  const bySlug=new Map(current.map(item=>[item.slug,item]));
  const sectionBySlug=new Map(sections.map(section=>[section.slug,section]));

  console.log(`${apply?"APPLY":"DRY RUN"}: ${drafts.length} catalog rows, ${drafts.length*3} products, ${Object.keys(sectionOrder).length} sections.`);
  for(const section of Object.keys(sectionOrder)){
    const slug=sectionSlug(section);
    console.log(`${sectionBySlug.has(slug)?"update":"create"} section ${section} (${slug})`);
  }
  for(const draft of drafts){
    const slug=slugify(draft.label);
    const existing=bySlug.get(slug)||bySlug.get(aliases[slug]);
    console.log(`${existing?"update":"create"} ${draft.section} / ${draft.label}: ${draft.winner}`);
  }
  if(!apply){
    console.log("Dry run complete. Re-run with --apply to write to Sanity.");
    return;
  }

  let tx=client.transaction();
  for(const [title,sortOrder] of Object.entries(sectionOrder)){
    const slug=sectionSlug(title);
    const id=sectionBySlug.get(slug)?._id||`catalog-section-${slug}`;
    tx=tx.createIfNotExists({_id:id,_type:"catalogSection",title:sectionTitle(title),slug:{_type:"slug",current:slug},sortOrder,icon:"home",published:true});
    tx=tx.patch(id,patch=>patch.set({title:sectionTitle(title),slug:{_type:"slug",current:slug},sortOrder,published:true}));
    sectionBySlug.set(slug,{_id:id,slug});
  }

  for(const draft of drafts){
    const slug=slugify(draft.label);
    const oldSlug=aliases[slug];
    const item=bySlug.get(slug)||bySlug.get(oldSlug);
    const itemId=batch>=5?`catalog-item-${sectionSlug(draft.section)}-${slug}`:item?._id||`catalog-item-${slug}`;
    const products=[{name:draft.winner,url:draft.winnerUrl,description:draft.description},...draft.mentions.map(name=>({name,url:honorableMentionUrls[name],description:undefined}))];
    products.forEach(product=>{
      const productId=`product-${slugify(product.name)}`;
      const data={name:product.name,slug:{_type:"slug",current:slugify(product.name)},outboundUrl:product.url,published:true,...(product.description?{description:product.description}:{})};
      tx=tx.createIfNotExists({_id:productId,_type:"product",...data});
      tx=tx.patch(productId,patch=>patch.set(data));
    });
    const recommendations=products.map((product,index)=>({_key:`pick-${index+1}-${slugify(product.name)}`,_type:"recommendation",rank:index+1,product:{_type:"reference",_ref:`product-${slugify(product.name)}`},...(index===0?{editorialNote:draft.description}:{}),outboundUrlOverride:product.url,published:true}));
    const data={label:draft.label,slug:{_type:"slug",current:slug},productName:draft.winner,outboundUrl:draft.winnerUrl,section:{_type:"reference",_ref:sectionBySlug.get(sectionSlug(draft.section))!._id},sortOrder:drafts.filter(value=>value.section===draft.section).findIndex(value=>value.label===draft.label)+1,published:true,recommendations,lastReviewed:new Date().toISOString().slice(0,10)};
    tx=tx.createIfNotExists({_id:itemId,_type:"catalogItem",...data});
    tx=tx.patch(itemId,patch=>patch.set(data));
  }

  if(batch>=5){
    const targetIds=new Set(drafts.map(draft=>`catalog-item-${sectionSlug(draft.section)}-${slugify(draft.label)}`));
    const legacy=await client.fetch<Array<{_id:string;label:string}>>(
      `*[_type=="catalogItem"&&published==true&&section->slug.current in $sectionSlugs]{_id,label}`,
      {sectionSlugs:[...new Set(drafts.map(draft=>sectionSlug(draft.section)))]},
    );
    const retired=legacy.filter(item=>!targetIds.has(item._id));
    retired.forEach(item=>{tx=tx.patch(item._id,patch=>patch.set({published:false}));});
    console.log(`Retiring ${retired.length} legacy rows to prevent duplicates.`);
  }

  if(batch===2){
    const retired=await client.fetch<Array<{_id:string;label:string}>>(
      `*[_type=="catalogItem"&&slug.current in ["best-cookware","best-mixing-bowls","best-kitchen-scale","best-rice-cooker"]]{_id,label}`,
    );
    retired.forEach(item=>{tx=tx.patch(item._id,patch=>patch.set({published:false}));});
    console.log(`Retiring ${retired.length} superseded Kitchen rows: ${retired.map(item=>item.label).join(", ")}`);
  }

  const result=await tx.commit();
  console.log(`Committed Batch ${batch} migration: ${result.documentIds.length} documents touched.`);
}

main().catch(error=>{console.error(error);process.exit(1);});
