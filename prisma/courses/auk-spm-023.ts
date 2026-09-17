/**
 * AUK SPM 023 — Freight Forwarding
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCE AND CURRENCY
 * Structured from the learner manual for SAQA US 252439 "Handle cargo for import
 * and export" (release 01/07/2009, registration ended 30/06/2012), broadened from
 * cargo handling to freight forwarding proper.
 *
 * The manual is sixteen years old and substantial parts of it are now wrong. The
 * corrections applied here, each of which reverses something the manual teaches:
 *
 *   1. LINER CONFERENCES. The manual teaches conference and non-conference lines
 *      as the market structure. Conferences are gone — the EU repealed their block
 *      exemption in October 2008 and the model collapsed globally. The 2026 market
 *      is three alliances (Gemini, Premier, Ocean Alliance) plus MSC operating
 *      independently. The EU Consortia Block Exemption Regulation itself lapsed on
 *      25 April 2024 and was not renewed.
 *   2. VGM. SOLAS Chapter VI Regulation 2 has required a Verified Gross Mass for
 *      every packed export container since 1 July 2016. Absent from the manual
 *      entirely, and it is now the single most common cause of a container being
 *      refused at the terminal.
 *   3. CTU CODE. The IMO/ILO/UNECE Code of Practice for Packing of Cargo Transport
 *      Units (2014) superseded the older guidelines the manual draws on.
 *   4. ISPM 15. Wood packaging treatment and marking. Absent from the manual and a
 *      routine cause of rejection at destination.
 *   5. TREMCARDS. Superseded by the ADR standardised "Instructions in Writing".
 *   6. IMDG CODE. Amendment 42-24 (2024 Edition) has been mandatory since
 *      1 January 2026, replacing 41-22. IATA DGR is on its 67th edition for 2026.
 *   7. VAT. 15% since 1 April 2018, not the 14% of the manual's era.
 *   8. INCOTERMS. 2020 edition; the manual predates even the 2010 revision.
 *   9. e-AWB. The air waybill is now electronic by default on most lanes.
 *  10. ADVANCE REPORTING. SARS cargo reporting requirements did not exist in 2009.
 *
 * The volumetric arithmetic in the manual is still correct and is retained:
 * ocean freight ton = weight or measure, whichever is greater; air volumetric
 * divisor 6000 cm³/kg.
 */

export const aukSpm023Modules = [
  {
    title: "1. What a Freight Forwarder Actually Does",
    content: `A freight forwarder arranges the movement of goods on behalf of a shipper. That single sentence hides a great deal, because the forwarder is the only party in the chain who sees the whole journey.

The carrier sees its own leg. The terminal sees its own yard. Customs sees its own border. The shipper sees a factory gate and an invoice. The forwarder is the one who has to make all of it connect, and who gets the call when it does not.

**The two capacities, and why the distinction matters**

A forwarder acting as **agent** arranges carriage on the shipper's behalf and contracts with carriers as the shipper's representative. Liability is limited: the forwarder is answerable for its own negligence in arranging, not for the carrier's performance.

A forwarder acting as **principal** — issuing its own transport document, consolidating, operating as an NVOCC — contracts with the shipper in its own name and subcontracts the actual carriage. It is now a carrier in law, and it carries a carrier's liability for the whole journey it has contracted for.

Most forwarders do both, sometimes on the same consignment, and many do not clearly know which capacity they are in on a given shipment. When something is lost or damaged, that question decides who pays.

**What the job actually consists of**

Booking space with carriers and negotiating rates. Preparing and checking documents. Arranging customs clearance, or doing it as a licensed clearing agent. Consolidating small consignments into full containers or air unit loads. Arranging packing, marking and containerisation. Arranging cargo insurance where instructed. Tracking and reporting. Handling claims. And advising the client, which is the part that distinguishes a forwarder from a booking clerk.

**Where forwarders make and lose money**

The margin in consolidation is real: a forwarder buys container or aircraft space at volume rates and sells it in smaller parcels. The margin in documentation and clearing is a fee for expertise. The losses come from the same places every time — a wrong tariff heading that triggers a customs stop, a missing certificate that leaves a container on the quay accruing demurrage, an under-declared weight that gets a box rejected at the gate, and a claim that turns out to be uninsured because nobody confirmed who was arranging cover.

**The through-line of this course**

Almost every expensive failure in freight forwarding is a detail that someone assumed had been handled by someone else. The forwarder's actual value is in not assuming.`,
  },
  {
    title: "2. Chargeable Weight and Cargo Measurement",
    content: `Freight is charged on whichever is greater — what the cargo weighs, or the space it occupies. A carrier moving a container of feathers and a container of steel plate is selling the same slot, so it prices on whichever measure the cargo actually consumes.

**Chargeable weight** is the greater of the actual weight or the volumetric weight. Everything else follows from that.

**Actual weight** is the total packed gross weight of the consignment — what it really weighs on the scale, including packing.

**Ocean freight: the freight ton**

For sea freight, the unit is the **freight ton**, sometimes written W/M for weight or measure. One freight ton is either one tonne (1,000 kg) or one cubic metre, whichever produces the higher freight.

Volume in cubic metres is length × breadth × height in metres, using the **export packed dimensions** — not the dimensions of the product. The crate is what occupies the slot, not what is inside it.

*Worked example.* 35 boxes, each weighing 410 kg, each measuring 1.25 m × 0.80 m × 0.75 m.

Actual weight: 35 × 410 kg = 14,350 kg = **14.35 tonnes**
Volume per box: 1.25 × 0.80 × 0.75 = 0.75 m³
Total volume: 0.75 × 35 = **26.25 m³**

The greater is 26.25, so the consignment is charged on **26.25 freight tons**. This cargo is light for its size — it "measures out" before it "weighs out".

*The reverse case.* A crate of machinery weighing 3,500 kg with a volume of 2.5 m³ charges on **3.5 freight tons**, because the weight exceeds the volume. Dense cargo weighs out first.

**Air freight: the volumetric divisor**

Air uses centimetres and a divisor:

    Volumetric weight (kg) = (L × B × H in cm) ÷ 6000

*Worked example.* One carton, 60 kg actual, measuring 40 × 30 × 25 cm.

40 × 30 × 25 = 30,000 cm³ ÷ 6000 = **5 kg volumetric**
Actual weight = **60 kg**

The greater is 60 kg, so the consignment is charged on actual weight.

**A currency note the manual predates.** 6000 is the IATA standard divisor for general air cargo and is still correct. The express integrators — DHL, FedEx, UPS and similar — commonly use **5000**, which produces a higher volumetric weight and therefore a higher charge for the same box. Check the divisor in the tariff you are quoting from rather than assuming.

**Why this matters beyond the invoice**

Chargeable weight drives the quotation, the mode decision, and often the packing specification. Reducing packed volume by 10% on a measurement cargo reduces the freight by 10%. That is why reinforced lightweight packing exists, and why an experienced forwarder will sometimes tell a shipper to repack.`,
  },
  {
    title: "3. Categories of Cargo and Unitisation",
    content: `**Bulk cargo** moves loose and unpacked. Liquids — crude oil, refined products, chemicals, vegetable oils — and dry bulks such as coal, iron ore, grain, fertiliser, manganese and chrome. Parcels are large, typically hundreds or thousands of tonnes, and the cargo is loaded and discharged by purpose-built equipment: grabs, conveyors, elevators, pipelines. Bulk is cheap per tonne because handling is mechanised and fast.

South African bulk trades are a large part of the national freight picture: coal through Richards Bay, iron ore and manganese through Saldanha Bay and Ngqura, grain through Durban and Cape Town.

**Break bulk cargo** is packed in cases, boxes, cartons, crates, drums and bales, or is robust and dimensioned enough to need no packing at all — road rollers, tractors, steel plate, rails, transformers, project cargo. Handling is labour-intensive, slow and relatively expensive, and the cargo is exposed to far more handling damage than anything in a box. Break bulk should be consolidated wherever the cargo allows it.

**Unitised cargo** is the answer to break bulk's handling cost. Consolidation happens two ways: palletisation and containerisation.

**Palletised cargo.** A pallet is a platform, usually timber or high-impact plastic, built to be lifted by forklift. Once loaded it is handled as a single unit. Loads are secured by strapping and shrink-wrapping. Pallet sizes vary by region, and exporters should use ISO standard pallets where the destination allows — a pallet that does not fit the destination's handling equipment or racking creates cost at the far end.

**Containerised cargo.** The dominant mode for general cargo. Two commercial arrangements matter:

**FCL** — full container load. One shipper's cargo fills the box. The container is packed at the shipper's premises, sealed, and not opened until destination. Lower risk of pilferage and handling damage.

**LCL** — less than container load, also called groupage. Several shippers' consignments are consolidated into one container at a depot, then deconsolidated at destination. Cheaper for small volumes, but the cargo is handled more and shares a box with cargo you did not choose — which is where compatibility becomes a live issue.

**Container types you will actually book:** 20ft and 40ft general purpose; 40ft high cube; reefer (temperature-controlled); open top (over-height cargo, tarpaulin roof); flat rack (out-of-gauge and heavy lifts); tank container (bulk liquids in the container trade); ventilated (coffee, cocoa).

**TEU and FEU.** A TEU is a twenty-foot equivalent unit; an FEU is forty. Actual external lengths are 6.06 m and 12.19 m. Container capacity and vessel size are quoted in TEU.

**Out-of-gauge.** Cargo exceeding the container envelope — over-length, over-width, over-height — needs flat rack or break bulk, attracts surcharges, and needs the route surveyed for bridges, tunnels and axle limits. Check this before quoting, not after.`,
  },
  {
    title: "4. Export Packing, Marking and ISPM 15",
    content: `**Three words that get confused**

**Packaging** is the box, bottle or wrapping that encloses the product and forms part of its presentation. **Labelling** is the information on that packaging — and most countries legislate what must appear for certain products. **Packing** is the outer protective layer that gets the goods through the journey: carton, crate, shrink-wrapped pallet, drum or container.

Freight forwarding is concerned mainly with packing.

**What the journey does to cargo**

*In the aircraft:* acceleration and deceleration on take-off and landing; turbulence alternating heavy loading with near-weightlessness; falling atmospheric pressure with altitude, which causes liquid containers to leak; hold temperatures typically ranging 2 °C to 35 °C but loaded in whatever weather is on the apron.

*At airport terminals:* mechanised handling at good airports, rough handling at poor ones; pilferage where security is weak; cargo held outdoors in whatever weather while awaiting loading.

*On road vehicles:* almost all cargo travels by road at one or both ends. Transfer depots and cartage warehouses each add a handling event and a pilferage opportunity.

*On the sea voyage:* break bulk is slung, netted, conveyed and dropped; goods are stacked on and knocked against other goods; destination handling may be less sophisticated than origin; condensation forms in the hold even on ships with dehumidification.

**The four design problems.** Every export packing specification is answering four questions: breakage, moisture, pilferage and excess weight. Moisture is the most underestimated — temperature change causes condensation inside the packing, and condensation causes rust and staining on goods that never went near the sea.

**Pilferage is designed against, not just guarded against.** Do not print contents or brand names on the outside. Use straps, seals and shrink wrap. Containerisation itself is the single biggest reduction in pilferage exposure available.

**What drives the specification:** value of the goods, statutory requirements, fragility, terms in the sales contract, temperature variation in transit, marine insurance requirements, size and weight, facilities at the ports involved, and transport conditions in the receiving country.

**Marking**

Each package should carry: the consignment identification number, port or place of destination, country of origin, gross weight, measurements, and hazard marking under the IMDG Code where applicable. Buyers usually specify the export marks they want.

Beyond that: shipper's mark; weight in kilograms; number of packages and case dimensions; handling marks using ISO graphic symbols; cautionary markings such as "This Side Up" or "Use No Hooks", in English and in the language of the destination; port of entry; hazard labels; and ingredients where required, in the destination language.

Practical discipline: stencil in waterproof ink, mark on three faces — preferably the top and two ends or two sides — and **completely remove all old markings from previously used packaging**. A container or crate carrying two sets of marks is a misrouting waiting to happen.

**ISPM 15 — absent from the old manual and a routine cause of rejection**

Solid wood packaging material — pallets, crates, cases, dunnage, bracing — moving in international trade must be treated and marked under **ISPM 15**, the IPPC's phytosanitary standard for wood packaging.

Treatment is by heat treatment (HT) or methyl bromide fumigation (MB, now restricted or prohibited in many countries), and treated material carries the IPPC mark: the IPPC wheat symbol, the ISO country code, the producer or treatment provider code, and the treatment code.

Untreated or unmarked wood packaging gets consignments refused entry, ordered re-exported, or fumigated and destroyed at the importer's cost at destination. It applies to the packaging, not the goods, which is precisely why people forget it. Processed wood products — plywood, OSB, particle board — are exempt, as is material under 6 mm thick.

**Insurance consequence.** Underwriters can and do decline claims for damage caused by packing inadequate for the mode of transport chosen. Packing is not just a physical question; it is an insurance one.`,
  },
  {
    title: "5. The CTU Code: Packing and Securing a Container",
    content: `The **IMO/ILO/UNECE Code of Practice for Packing of Cargo Transport Units (CTU Code, 2014)** is the international reference for packing containers and other transport units. It replaced the older guidelines that the 2009-era material draws on, and it is the document a surveyor or an insurer will measure your packing against.

**Why it exists.** Badly packed containers cause vessel fires, container stack collapses, road rollovers and cargo losses. A significant proportion of container-related incidents trace to packing rather than to carriage.

**The principles**

**Pack for a tight fit.** Cargo that can move will move. A ship rolls, a truck brakes, a crane accelerates — and unsecured cargo inside a sealed box travels several metres before hitting something.

**Distribute weight evenly, and keep the centre of gravity low and central.** Uneven longitudinal distribution overloads one end of the chassis and can exceed axle limits on the road leg even when the total weight is legal. The CTU Code gives guidance on permissible eccentricity.

**Fill the gaps.** Dunnage — timber, paper board, inflatable airbags — fills voids. Where gaps are large, use timber bracing rather than more dunnage.

**Lash where a tight fit is not achievable.** Lashing rings are provided on corner posts and top and bottom side rails of standard dry containers. Lashing angle and material strength both matter; a lashing at the wrong angle contributes little restraint.

**Consider all the forces.** Longitudinal, transverse and vertical accelerations differ by mode — road braking, rail shunting, sea rolling and pitching. A container packed adequately for a road leg may be inadequately secured for the sea leg that follows.

**Segregate incompatible cargo**, which Module 10 covers for dangerous goods and Module 7 for tainting and contamination.

**Check the container before packing.** A container that is not weathertight, has a damaged floor, holed panels, or a previous cargo residue should be rejected. Once you pack it, the condition is your problem. The "light test" — closing the doors and looking for daylight — costs a minute.

**Packing certificate.** For containers carrying dangerous goods, a **container packing certificate** is required, signed by the person responsible for the packing, declaring that the CTU was clean and sound, the cargo properly segregated, secured and placarded.

**The forwarder's exposure**

Where the forwarder packs the container, the forwarder owns the packing. Where the shipper packs and seals it, the forwarder is relying on a declaration they cannot verify — and should say so in the transport document, which is why "Shipper's Load, Stow and Count" or "Said to Contain" clauses exist on bills of lading.

That clause protects the carrier's position on the contents. It does not protect anyone if a badly packed box causes a casualty.`,
  },
  {
    title: "6. Choosing the Mode",
    content: `International carriage moves by ocean, air or land, or by a combination. The forwarder's advice on which to use is one of the most commercially significant things they do.

**What governs the choice**

Total cost, including the hidden ones — insurance premium, finance cost of goods in transit, and the working capital tied up for the duration. Size, weight and nature of the goods. Special requirements: heavy lift, refrigeration, security, special handling. Nature and cost of the packing each mode demands. Characteristics of the goods: hazardous, fragile, high-value, temperature-sensitive, perishable. Out-of-gauge dimensions. Urgency. Availability of special equipment. Frequency, reliability and regularity of services. Terms of the sales contract, which may specify a mode. Location of the parties relative to ports, airports and railheads. Facilities at both ends, including whether the consignee can actually handle a container.

**The three-way tension**

Speed, cost and cargo safety pull against each other and cannot all be optimised. Faster generally costs more. Safety may mean investigating the whole route, not just the main leg — the loss usually happens on the leg nobody examined.

**Transit time is more than sailing time.** Actual port-to-port time, plus frequency of sailings. A service that is two days faster but sails fortnightly is slower in practice than a weekly service, because the cargo waits.

**The trade-off that has changed since the old manual.** Reliability now varies materially between carriers and alliances in a way it did not when conferences published schedules and largely kept to them. Schedule reliability across the industry has often sat in the 50–65% range in recent years, while the best-performing alliance networks have run far higher. Comparing carriers on rate alone is no longer sufficient advice — a cheap service that rolls your booking twice is not cheap.

**Where each mode wins**

*Ocean:* almost everything by volume. Lowest cost per tonne-kilometre, highest capacity, slowest, and the only realistic option for bulk and heavy project cargo.

*Air:* high value relative to weight, perishable, urgent, seasonal, or where the alternative is impassable. Two structural shifts pushed air freight growth — technology products getting lighter, smaller and more valuable, and just-in-time inventory practice, which trades freight cost against working capital and warehousing. Air also allows lighter packing and attracts no cargo dues.

*Road:* essential at both ends of nearly every movement, and the primary mode into Southern African neighbours.

*Rail:* cost-effective for bulk over distance where the infrastructure performs.

**Consequences of getting it wrong.** A mode chosen without regard to the goods produces late delivery, demurrage, deterioration of perishables, damage the packing was not designed for, and a customer relationship that does not survive the second occurrence.`,
  },
  {
    title: "7. Ocean Freight and the Modern Liner Market",
    content: `**This module corrects the largest single error in older forwarding material.**

The 2009-era manual teaches the market as divided into **conference lines** — groups of carriers agreeing common rate structures and scheduled services — and **non-conference lines** competing against them. That was accurate for decades. It is not accurate now.

**Conferences are gone.** The European Union repealed the block exemption that permitted liner conferences with effect from October 2008, and the model collapsed globally thereafter. A forwarder quoting "conference rates" in 2026 is quoting from a world that no longer exists.

**What replaced them: vessel-sharing alliances**

Carriers now cooperate operationally — sharing vessels, slots and port rotations — while competing on price. Alliances are not rate-fixing arrangements; they are capacity-sharing ones, and each member sells its own slots at its own rates.

The alliance map was substantially redrawn in 2025. As at 2026 the structure is:

| Grouping | Members |
| --- | --- |
| Gemini Cooperation | Maersk, Hapag-Lloyd |
| Ocean Alliance | CMA CGM, COSCO, Evergreen, OOCL |
| Premier Alliance | ONE, HMM, Yang Ming |
| Independent | MSC, and various niche and regional operators |

The 2M alliance between Maersk and MSC ended, Hapag-Lloyd left THE Alliance to form Gemini with Maersk from February 2025, the remaining THE Alliance members regrouped as Premier, and Ocean Alliance extended its agreement to 2032. MSC, now the largest carrier by capacity, operates independently.

**One further regulatory change worth knowing:** the EU Consortia Block Exemption Regulation, which exempted vessel-sharing consortia from certain competition rules, lapsed on 25 April 2024 and was not renewed. Consortia now have to self-assess against general competition law.

**What this means practically for a forwarder.** Alliance membership determines the service network, the port rotation, and whether your cargo moves directly or transships. Gemini's hub-and-spoke design, for example, removed some direct calls in favour of transshipment — adding port time but improving schedule reliability. Knowing which alliance serves a port pair is now part of quoting it honestly.

**Liners and tramps**

**Liners** run regular scheduled services between defined port ranges, carrying general cargo, sailing on published dates whether full or not. Container ships, and the diminishing number of general cargo liners and Ro-Ro services.

**Tramps** do not run fixed schedules. They trade worldwide seeking cargo — ore, coal, grain, sugar, fertiliser — and are fixed by charter party for a voyage or a period. Bulk carriers and most tankers work this way.

**Vessel types**

*Container ships (cellular vessels)* — internal cell guides into which boxes are lowered by gantry crane, with further tiers stacked and lashed on deck. Sized in TEU, from feeders of a few hundred to ULCVs above 24,000 TEU.

*Bulk carriers* — single-deck, large hatches, self-trimming holds. Handysize through Capesize, with Newcastlemax and beyond at the top end.

*Ro-Ro and pure car carriers* — built-in ramps, cargo driven on and off, contrasted with lo-lo where cranes lift on and off.

*Tankers* — crude, product, chemical and gas carriers, segregated by cargo and sized from coastal tankers to VLCCs and ULCCs.

*Multipurpose and heavy lift* — project cargo, out-of-gauge, and ships' own heavy-lift gear where shore cranes are inadequate.

**Freight and surcharges**

The base freight rate is rarely the invoice. Expect: bunker adjustment factor (BAF) or a low-sulphur equivalent; currency adjustment factor (CAF); terminal handling charges at both ends (THC); documentation fee; ISPS or security surcharge; general rate increase (GRI); peak season surcharge (PSS); congestion surcharge; war risk surcharge where applicable; and equipment imbalance surcharge.

A quotation that shows the base rate and hides the surcharges is not a quotation. Quote all-in, or list the surcharges explicitly — a client who discovers them on the invoice does not come back.`,
  },
  {
    title: "8. Air Freight",
    content: `**When air makes sense**

Nature of the product — perishable, live, seasonal, urgent. Speed, where the cost of not having the goods exceeds the freight: medical supplies, spares for a plant that is down, samples against a tender deadline. Cash flow, because faster delivery means faster payment. Poor alternatives — landlocked countries, degraded rail and road, congested ports. Lower stock levels, since frequent delivery reduces inventory, warehousing and the capital tied up in both. Lighter and cheaper packing. Better security. High value relative to weight. And no cargo dues.

The two structural drivers behind air freight's growth still hold: technology products keep getting lighter, smaller and more valuable, and just-in-time inventory practice trades freight cost against working capital.

**Two service types**

**Direct service**, offered by airlines and by forwarders. Goods move from origin airport to destination airport under a single air waybill, on the earliest possible flight, by the most direct routing. Fast and expensive — and on small parcels, punitively so, because every minimum charge applies.

**Consolidated service**, offered by a consolidator, normally a forwarder. The forwarder buys volume space from the airline at a rate below the airline's published tariff, consolidates several shippers' goods into one large consignment under a master air waybill, and issues each shipper a house air waybill. Cheaper, with longer transit because consolidation and deconsolidation take time.

This is the core forwarding margin in air: buy wholesale, sell retail, and the client still pays less than going direct.

**The e-AWB — a change the old manual predates**

The air waybill is now electronic by default on most lanes. IATA's e-AWB programme replaced the paper document with an electronic contract of carriage between forwarder and carrier. Paper is the exception rather than the rule, and the "original for shipper / original for consignee / original for carrier" structure survives largely as data.

The air waybill is **not** a document of title. It is a receipt and a contract of carriage, and it is non-negotiable. Cargo is released to the named consignee on identification, not against surrender of the document. This is a fundamental difference from a bill of lading, and it has real consequences: a shipper who ships by air to an unpaid buyer has already lost control of the goods.

**Liability**

Air carriage is governed by the **Montreal Convention 1999** where both states are party, or the older Warsaw system where they are not. Carrier liability for cargo is limited per kilogram unless a higher value is declared and a supplementary charge paid. The limit is expressed in Special Drawing Rights and is revised periodically — check the current figure rather than quoting one from memory.

For most commercial cargo the limit is well below the value of the goods, which is the argument for cargo insurance rather than reliance on carrier liability.

**Dangerous goods by air** are governed by the ICAO Technical Instructions, applied commercially through the **IATA Dangerous Goods Regulations**, which are reissued annually — the 67th edition applies for 2026. Air DG rules are stricter than sea: substances acceptable under the IMDG Code may be forbidden by air, and lithium batteries in particular carry restrictions that change frequently.`,
  },
  {
    title: "9. Road Freight and Cross-Border Africa",
    content: `Road carries almost every consignment at one or both ends, and it is the primary mode from South Africa into the region — Zimbabwe, Zambia, Mozambique, Malawi, the DRC, and the BLNS countries of Botswana, Lesotho, Namibia and Eswatini.

**Service types.** Door-to-door, where the haulier collects at the exporter's premises and delivers to the importer's; and depot-to-depot, which is cheaper and leaves both ends to the parties.

**Permits.** Cross-border road transport requires permits, and the forwarder must confirm the haulier holds them — for each country the goods transit, not only the destination. Movements between South Africa and the SACU states require the appropriate cross-border permit. A truck turned back at a border for a missing permit costs days.

**Equipment.** Tri-axle and superlink configurations dominate. A standard tri-axle trailer takes one 40ft container, two 20ft containers, or 12 metres of break bulk on the deck. Each country imposes its own limits on vehicle length, axle loading and gross combination mass — and an overloaded vehicle is detained at the weighbridge, not waved through.

**The real challenges on African road freight**

Vehicle maintenance costs on poor surfaces. Road condition. Low and narrow bridges that dictate routing for high or wide loads. General infrastructure. Vehicle carrying capacity against what the cargo needs. Pilferage, particularly at stops and overnight. **Congestion at border posts**, which is the single largest and least predictable cost in regional road freight — Beitbridge and Kasumbalesa queues have run to days. Language differences across borders. Customs clearance delays at each frontier. The extra cost of containerisation where cargo must be transferred. And maximising deck capacity so space is not wasted.

**What the forwarder should be doing about it.** Build realistic border dwell into transit estimates rather than quoting the theoretical drive time. Pre-clear where the customs administration allows it. Confirm permits and vehicle compliance before dispatch. And tell the client the truth about transit variability — a client who is told five to eight days and gets seven is satisfied; a client told four and gets seven is not.

**Liability.** Road carriage liability in cross-border African movements is governed by the contract of carriage and the applicable national law. CMR, the European road carriage convention, does not apply in Southern Africa — so the terms of the haulier's own conditions matter, and they are usually heavily limited.

**Rail.** Where it performs, rail is cost-effective for bulk and containers over distance. In the South African context, rail capacity and reliability constraints on the coal and iron ore corridors have pushed volume onto road, with knock-on congestion effects at ports and borders. A forwarder quoting a rail solution should confirm current service performance rather than the published capability.`,
  },
  {
    title: "10. Dangerous Goods Across Modes",
    content: `Dangerous goods are regulated by mode, and the rules differ. A consignment acceptable by sea may be forbidden by air.

| Mode | Instrument |
| --- | --- |
| Sea | IMDG Code — **Amendment 42-24 (2024 Edition), mandatory since 1 January 2026** |
| Air | ICAO Technical Instructions, applied via the IATA Dangerous Goods Regulations — 67th edition for 2026 |
| Road | ADR, and national equivalents |
| Rail | RID |

**The IMDG Code amendment cycle matters.** Amendments are biennial, with a one-year voluntary transition. Amendment 42-24 was adopted by IMO Resolution MSC.556(108) in May 2024, could be applied voluntarily from 1 January 2025, and has been mandatory since 1 January 2026 — fully replacing 41-22. Documentation still referencing 41-22 is invalid, and safety data sheets whose transport section cites the superseded amendment will stop shipments.

Amendment 42-24 brought in new UN entries for sodium-ion batteries and for battery-powered vehicles, which may no longer be declared under the generic UN 3171; tighter provisions for carbon (UN 1361/1362); a new definition of degree of filling; and updated placarding expectations.

**The shipper's declaration**

Dangerous goods must be accompanied by a signed declaration completed by the **shipper — no other party**. The forwarder may not complete it on the shipper's behalf, because the declaration is a statement of fact about goods only the shipper knows.

It identifies the substance and its hazards, and declares that the goods are correctly classified, packed, marked, labelled and in condition for carriage by the intended mode. The shipper must give the **proper shipping name**, the **hazard class and any subsidiary risk**, the **UN number**, and the **packing group**.

FIATA publishes an internationally recognised standard form, the Shippers Declaration for the Transport of Dangerous Goods (SDT), for sea, rail, road and inland waterway.

**Supporting documents.** A container packing certificate for packed CTUs. A shipping note marked for dangerous goods. Stowage information including the **EmS** number referencing the emergency schedules and the **MFAG** number referencing medical first aid guidance. Any special certificates the IMDG Code requires.

**Notifications.** The shipping line must be notified in writing in advance. Port authorities must be notified of dangerous goods passing through the port. Subcontracting road or rail carriers on a multimodal movement must be told the nature of the consignment.

**Instructions in Writing — this replaces Tremcards**

Older material refers to **Tremcards** (Transport Emergency Cards) carried by drivers. These have been superseded. ADR now requires a standardised four-page **Instructions in Writing** document, issued by the carrier, in a language each crew member can read, covering actions on incident, general hazard-class guidance, and the protective equipment to be carried.

Do not teach or issue Tremcards as current practice.

**The knowledge gap, which has not closed**

The old manual noted that knowledge of dangerous goods documentation is weakest furthest from the port, and that many people in shipping lines, forwarding agents and container packing operations are less well informed about IMDG requirements than the risk warrants. That observation remains accurate. Container fires attributable to mis-declared or undeclared dangerous goods continue to destroy ships and kill crew.

**The forwarder's position.** You cannot verify what is inside a sealed box. What you can do is refuse business where the paperwork does not add up, check the declaration for internal consistency, and decline to book cargo whose description invites suspicion. "The shipper declared it" is a defence that works better before a loss than after one.`,
  },
  {
    title: "11. Documents, Title and Liability",
    content: `**Bill of lading — three functions at once**

A receipt for the goods as shipped. Evidence of the contract of carriage. And a **document of title**, which is what makes it different from everything else in the chain: the holder of the original controls delivery of the goods.

*Straight (non-negotiable)* bills consign to a named party. *Order* bills are transferable by endorsement, which is how the document finances trade — a bank holding the original controls the cargo until the buyer pays. *Bearer* bills deliver to whoever holds them, and are correspondingly risky.

**Shipped on board** versus **received for shipment** matters: a documentary credit almost always requires an on-board notation, and a received-for-shipment bill will not satisfy it.

**Clean** versus **claused**: a clean bill records no defect in the goods or packing. A claused or "dirty" bill records damage or deficiency, and will normally be rejected under a letter of credit. Never accept a request to issue a clean bill against a letter of indemnity for goods that were not clean — it is a misrepresentation to the eventual holder and the indemnity may be unenforceable.

**Sea waybill.** Non-negotiable, no document of title, cargo released to the named consignee on identification. Faster, no courier risk, no original to lose — appropriate where there is no need to control delivery against payment, such as intra-group shipments.

**Air waybill.** Non-negotiable, not a document of title, as covered in Module 8.

**FIATA documents**

FIATA, the International Federation of Freight Forwarders Associations, publishes standard forms the industry recognises:

**FBL** — Negotiable FIATA Multimodal Transport Bill of Lading. The forwarder issues it as **carrier** and accepts liability for the whole multimodal journey.
**FWB** — Non-negotiable FIATA Multimodal Transport Waybill.
**FCR** — Forwarders Certificate of Receipt. Confirms the forwarder holds the goods irrevocably for the named consignee. Not a document of title.
**FCT** — Forwarders Certificate of Transport.
**FWR** — FIATA Warehouse Receipt.
**SDT** — Shippers Declaration for the Transport of Dangerous Goods.
**SIC** — Shippers Intermodal Weight Certification.

Issuing an FBL is a decision, not a formality: it puts the forwarder in the position of carrier for the entire journey.

**Liability regimes by mode**

| Mode | Regime | Character of the limit |
| --- | --- | --- |
| Sea | Hague, Hague-Visby or Hamburg Rules, depending on the contract and jurisdiction | Per package or per kilogram, whichever is higher under Hague-Visby |
| Air | Montreal Convention 1999, or Warsaw system | Per kilogram, in SDR |
| Road (Europe) | CMR | Per kilogram, in SDR |
| Road (Southern Africa) | Contract and national law | Usually heavily limited by the haulier's own conditions |

Every one of these limits is well below the value of most commercial cargo. The practical conclusion for a client is always the same: **carrier liability is not insurance**. If the client wants the value of the goods protected, they need a marine cargo policy — and somebody needs to confirm in writing who is arranging it, because the Incoterm decides whether that is the buyer or the seller.

**Other documents in the file.** Commercial invoice. Packing list. Certificate of origin, including preference certificates under trade agreements. Phytosanitary and veterinary certificates. Inspection certificates. Insurance certificate. Letter of credit. Export or import permits. Customs declaration.

**Standard trading conditions.** Most forwarders contract on published standard trading conditions which limit liability, impose short claim notification periods and create a lien over goods for unpaid charges. They only apply if properly incorporated into the contract with the client — which means brought to the client's attention before the business is accepted, not printed on the back of the invoice afterwards.`,
  },
  {
    title: "12. South African Customs, VGM and Compliance",
    content: `**The VGM requirement — absent from older material and now unavoidable**

Since **1 July 2016**, SOLAS Chapter VI Regulation 2 has required a **Verified Gross Mass** for every packed container before it may be loaded aboard a vessel. No VGM, no loading. This is the single most common reason a container is refused at the terminal gate.

The VGM is the gross mass of the cargo plus dunnage and securing material plus the container tare. Two permitted methods:

**Method 1** — weigh the packed, sealed container on calibrated equipment.
**Method 2** — weigh all packages, dunnage and securing material and add the container's tare mass, using a documented procedure approved by the national administration.

The **shipper named on the bill of lading** is responsible for the VGM and must submit it, signed, to the carrier and terminal by the cut-off. A forwarder acting as shipper on its own bill carries that responsibility.

Estimating is not permitted. Under-declared weights cause stack collapses and vehicle overloading, which is the reason the rule exists.

**South African customs, in outline**

Customs is administered by SARS under the **Customs and Excise Act 91 of 1964**. The Customs Control Act 31 of 2014 and Customs Duty Act 30 of 2014 have been enacted but their implementation has been phased and partly deferred — confirm the operative position before relying on either.

**Registration and licensing.** Importers and exporters must be registered with SARS, and clearing agents licensed. A foreign buyer who is not a registered South African exporter cannot self-clear, which is why EXW is so often the wrong Incoterm on a South African export.

**Declaration.** Clearance is by bill of entry — the SAD 500 in its familiar form — supported by the commercial invoice, packing list, transport document, certificate of origin where preference is claimed, and permits where required.

**Advance reporting.** SARS requires electronic reporting of conveyances and goods ahead of arrival and departure, on prescribed timeframes by mode. This did not exist when the older manuals were written, and late or missing reports cause stops and penalties.

**Duty and VAT on import**

Customs value in South Africa is determined on an **FOB basis**, not CIF. Freight and insurance in a CIF purchase price must be stripped out before duty is calculated; inland costs to the place of export in an EXW purchase must be added.

Import VAT is charged on the **added tax value**:

    ATV = customs value + 10% uplift + non-rebated customs duty
    Import VAT = ATV × 15%

The 10% uplift does not apply to goods from BLNS/SACU countries. VAT has been **15%** since 1 April 2018.

**Export VAT.** Direct exports, where the vendor is contractually responsible for delivery to an address outside South Africa and pays for it, are zero-rated subject to documentary proof held within the prescribed period. Indirect exports, where the buyer removes the goods, are standard-rated at 15% with a possible refund through the VAT Refund Administrator. The Incoterm is a strong indicator of which applies, but the test is who is contractually responsible for delivery.

**Tariff classification.** The Harmonised System heading drives the duty rate, the permit requirements and the preference eligibility. Misclassification is the most common cause of a customs stop, and it is the forwarder or clearing agent who explains it.

**Trade agreements.** SACU, SADC, the EU Economic Partnership Agreement, and the **African Continental Free Trade Area**, under which trading began in January 2021. Preferential rates require a valid origin certificate and compliance with the rules of origin — which are technical, agreement-specific, and frequently got wrong.

**Other compliance.** ISPS security surcharges and access control at ports. Cargo dues payable to the port authority. Container weight and road axle limits. Import and export permits under ITAC for controlled goods. Sanctions screening on counterparties and destinations, which has become materially more demanding.`,
  },
  {
    title: "13. Delivery, Non-Compliance and the Forwarder's Liability",
    content: `**The export sequence**

Book space with the carrier. Arrange any pre-shipment inspection before packing, allowing time to meet the ship date, and obtain the clean report of findings. Produce, inspect and pack the goods in accordance with the sale contract, marked for export, unitised or containerised as required. Prepare the final commercial invoice and packing list. Issue written shipping instructions to the forwarder, with the invoice, packing list, copy letter of credit, sale contract and any import permit. Obtain special documents — certificate of origin, consular invoice, phytosanitary certificate — through the forwarder. Arrange marine insurance **if the Incoterm places that obligation on the seller**. Submit the VGM. The forwarder then dispatches the consignment and lodges the documents with customs and the other authorities.

**The import sequence**

The importer issues a clearing instruction to the clearing agent, with the customs purpose code, tariff headings and delivery instructions. That instruction goes to the agent with the bill of lading or air waybill, commercial invoice, packing list, certificate of origin and any other required document. The agent lodges the bill of entry with customs and pays duty and import VAT on the importer's behalf. On customs release, the agent obtains cargo release from the shipping line and the port after paying cargo dues, terminal handling and any storage. For FCL, transport is arranged to the importer's premises — carrier haulage or merchant haulage. For LCL or groupage, the container goes to a depot for unpacking and the cargo is then delivered. The importer receives the goods, checks for loss and damage, and signs the delivery receipt.

**Check before signing.** A delivery receipt signed clean is evidence the goods arrived in good order. Where damage is visible, it must be noted on the receipt at the time. Where damage is concealed, notice must be given to the carrier within the period the applicable regime allows — and those periods are short, often three days for concealed damage.

**Consequences of non-compliance**

Poor or insufficient packing loses or damages the goods, and may void the insurance claim as well.

Poor or incorrect marking causes misdelivery or non-delivery.

Bad or incomplete documentation causes late delivery, storage and demurrage. Demurrage and detention accrue daily and are the single largest avoidable cost in the whole process.

Incorrect description of goods triggers customs stops for examination, with the examination cost, the delay and the storage all falling on the importer.

Poor carrier and routing selection produces long lead times and delays.

**Add the ones the old manual could not have known about:** no VGM means the box is not loaded. Untreated wood packaging means the consignment is refused, fumigated or destroyed at destination. A mis-declared dangerous good can burn the ship.

**Where the forwarder's liability actually bites**

The forwarder is liable for its own negligence in performing or arranging — booking the wrong vessel, lodging a wrong declaration, failing to pass on handling instructions, missing a permit. Where the forwarder acts as principal and issues its own transport document, it takes on carrier's liability for the whole contracted journey.

Standard trading conditions limit that exposure, but only where they were properly incorporated, and they never cover fraud or the forwarder's own deliberate default.

**The habit worth leaving with.** Before the consignment moves, ask three questions: what has been assumed rather than confirmed; who is insuring this and has anyone said so in writing; and what is the one document that, if missing, stops this shipment. Ask them every time, and most of what appears in the claims file never happens.

---

## Working live consignments on the AUK Supply Chain Manager

This course has taught the method. Costing a consignment properly — the seven-term Incoterm chain from EXW to DDP, four freight modes, live exchange rates, SARS customs calculations, the quote register and the port and border time ledgers — is done on the AUK Supply Chain Manager.

Access is available to learners on request.

**To request access:** email **info@auk-maritime.com**

**Platform:** https://logistics.auk-maritime.com/sign-in

**Cost:** R950 per month. Cancel at any time.

The border time ledgers are seeded with real historical AUK data, so the transit estimates you build reflect what those crossings actually take rather than the theoretical drive time. That alone is worth the access to anyone quoting regional road freight.`,
  },
];

export const aukSpm023Quiz = [
  {
    q: "A forwarder issues its own transport document, consolidates the cargo and subcontracts the carriage. In what capacity is it acting, and with what consequence?",
    options: [
      "As agent, with liability limited to negligence in arranging",
      "As principal, taking on a carrier's liability for the whole journey contracted",
      "As broker, with no liability for the cargo",
      "As clearing agent, liable only for the customs declaration",
    ],
    answer: 1,
  },
  {
    q: "A sea consignment comprises 35 boxes, each 410 kg, each measuring 1.25 m × 0.80 m × 0.75 m. On what is freight charged?",
    options: ["14.35 freight tons, on weight", "26.25 freight tons, on volume", "35 freight tons, one per box", "0.75 freight tons, the volume of one box"],
    answer: 1,
  },
  {
    q: "A crate of machinery weighs 3,500 kg and measures 2.5 m³. What is the freight tonnage?",
    options: ["2.5, on volume", "3.5, on weight", "6.0, weight plus volume", "1.4, weight divided by volume"],
    answer: 1,
  },
  {
    q: "A carton measures 40 × 30 × 25 cm and weighs 60 kg. Using the IATA divisor, what is the chargeable weight for air freight?",
    options: ["5 kg volumetric", "60 kg actual", "65 kg, the two combined", "30 kg, the average"],
    answer: 1,
  },
  {
    q: "Which volumetric divisor do express integrators such as DHL, FedEx and UPS commonly apply, and what is its effect?",
    options: [
      "6000, the same as IATA, with no difference in charge",
      "5000, producing a higher volumetric weight and a higher charge for the same box",
      "7000, producing a lower charge",
      "They charge on actual weight only",
    ],
    answer: 1,
  },
  {
    q: "When calculating volume for ocean freight, which dimensions are used?",
    options: [
      "The dimensions of the product itself",
      "The export packed dimensions, since the packing is what occupies the slot",
      "The internal dimensions of the container",
      "The dimensions declared on the commercial invoice",
    ],
    answer: 1,
  },
  {
    q: "How is the international liner market structured in 2026?",
    options: [
      "Conference lines setting common rates, and non-conference lines competing against them",
      "Three vessel-sharing alliances — Gemini, Ocean Alliance and Premier — plus MSC and others operating independently",
      "A single global consortium regulated by the IMO",
      "National shipping lines allocated trades by bilateral agreement",
    ],
    answer: 1,
  },
  {
    q: "Which carriers form the Gemini Cooperation?",
    options: ["Maersk and MSC", "Maersk and Hapag-Lloyd", "ONE, HMM and Yang Ming", "CMA CGM, COSCO, Evergreen and OOCL"],
    answer: 1,
  },
  {
    q: "What is the essential difference between a modern alliance and the liner conferences that preceded them?",
    options: [
      "Alliances are larger",
      "Alliances share vessels, slots and port rotations operationally, but members compete on price; conferences fixed rates",
      "Alliances are regulated by the IMO; conferences were not",
      "There is no substantive difference",
    ],
    answer: 1,
  },
  {
    q: "Since when has a Verified Gross Mass been required before a packed container may be loaded aboard a vessel?",
    options: ["1 July 2016, under SOLAS Chapter VI Regulation 2", "1 January 2020, under the IMDG Code", "1 July 2016, under the CTU Code", "It is recommended but not mandatory"],
    answer: 0,
  },
  {
    q: "Who carries responsibility for submitting the VGM?",
    options: [
      "The terminal operator",
      "The shipper named on the bill of lading",
      "The carrier",
      "The packer of the container, whoever that is",
    ],
    answer: 1,
  },
  {
    q: "Under VGM Method 2, what is weighed?",
    options: [
      "The packed sealed container on a weighbridge",
      "All packages, dunnage and securing material, with the container tare added, under an approved documented procedure",
      "The cargo only, with weight estimated for packing",
      "The vehicle before and after loading",
    ],
    answer: 1,
  },
  {
    q: "Which document governs the packing and securing of containers?",
    options: [
      "The IMDG Code",
      "The IMO/ILO/UNECE Code of Practice for Packing of Cargo Transport Units (CTU Code, 2014)",
      "SOLAS Chapter VI",
      "The Hague-Visby Rules",
    ],
    answer: 1,
  },
  {
    q: "What does ISPM 15 regulate, and why is it so often overlooked?",
    options: [
      "Container weight limits — it is superseded by VGM",
      "Treatment and marking of solid wood packaging material — it applies to the packaging, not the goods",
      "Dangerous goods segregation — it is duplicated in the IMDG Code",
      "Export packing dimensions for air freight",
    ],
    answer: 1,
  },
  {
    q: "A consignment arrives with untreated, unmarked timber pallets. What is the likely outcome?",
    options: [
      "A minor documentary penalty",
      "Refusal of entry, re-export, or fumigation and destruction at the importer's cost",
      "No consequence provided the goods themselves are compliant",
      "Automatic acceptance if the pallets are under 6 mm thick",
    ],
    answer: 1,
  },
  {
    q: "Which edition of the IMDG Code is mandatory in 2026?",
    options: ["Amendment 40-20", "Amendment 41-22", "Amendment 42-24 (2024 Edition)", "Amendment 43-26"],
    answer: 2,
  },
  {
    q: "Who may complete the dangerous goods declaration?",
    options: [
      "The freight forwarder, on the shipper's behalf",
      "The shipper, and no other party",
      "The carrier's agent at the port",
      "Whichever party packs the container",
    ],
    answer: 1,
  },
  {
    q: "Older material refers to Tremcards. What has replaced them?",
    options: [
      "The EmS Guide",
      "The standardised four-page ADR Instructions in Writing, issued by the carrier",
      "The container packing certificate",
      "Nothing — Tremcards remain current practice",
    ],
    answer: 1,
  },
  {
    q: "What does the EmS number on a dangerous goods consignment refer to?",
    options: [
      "The emergency schedules for shipboard response",
      "The medical first aid guide",
      "The emergency contact for the manufacturer",
      "The stowage position on the vessel",
    ],
    answer: 0,
  },
  {
    q: "Which of the following is a document of title, giving its holder control over delivery of the goods?",
    options: ["Air waybill", "Sea waybill", "Order bill of lading", "Forwarders Certificate of Receipt (FCR)"],
    answer: 2,
  },
  {
    q: "A shipper exports by air to a buyer who has not yet paid. What is the significance of the air waybill being non-negotiable?",
    options: [
      "The goods are released to the named consignee on identification, so the shipper has lost control of them",
      "The airline holds the goods until payment is confirmed",
      "The shipper may redirect the goods at any time before delivery",
      "The consignee must surrender an original before collection",
    ],
    answer: 0,
  },
  {
    q: "A forwarder issues a FIATA FBL. What has it done?",
    options: [
      "Confirmed it holds the goods for the consignee, without accepting carrier liability",
      "Issued a negotiable multimodal bill of lading as carrier, accepting liability for the whole journey",
      "Issued a warehouse receipt",
      "Certified the shipper's intermodal weight declaration",
    ],
    answer: 1,
  },
  {
    q: "Why is carrier liability not a substitute for cargo insurance?",
    options: [
      "Carriers routinely deny all claims",
      "The limits under Hague-Visby, Montreal and CMR are per package or per kilogram and fall well below the value of most commercial cargo",
      "Carrier liability covers only the main leg, never the inland legs",
      "Cargo insurance is legally compulsory on all international shipments",
    ],
    answer: 1,
  },
  {
    q: "On what basis is customs value determined for imports into South Africa?",
    options: ["CIF, including freight and insurance", "FOB, at the place of export", "The commercial invoice total as presented", "DDP, including duty and VAT"],
    answer: 1,
  },
  {
    q: "How is import VAT calculated on goods arriving from outside SACU?",
    options: [
      "Customs value × 15%",
      "(Customs value + 10% uplift + non-rebated duty) × 15%",
      "(Invoice value + freight + insurance) × 14%",
      "Customs value × 14%, plus duty",
    ],
    answer: 1,
  },
  {
    q: "A foreign buyer wants to purchase EXW from a South African supplier. What is the practical obstacle?",
    options: [
      "EXW may not be used for containerised cargo",
      "The buyer is not a registered South African exporter and cannot lodge the export declaration",
      "EXW requires the seller to arrange marine insurance",
      "SARS does not recognise EXW",
    ],
    answer: 1,
  },
  {
    q: "Why should a quotation show surcharges explicitly rather than only the base freight rate?",
    options: [
      "Carriers require it",
      "BAF, CAF, THC, ISPS, GRI and similar surcharges frequently exceed the base rate, and a client who meets them first on the invoice does not return",
      "It is a SARS requirement",
      "Surcharges are refundable if itemised",
    ],
    answer: 1,
  },
  {
    q: "Why is comparing ocean carriers on rate alone now inadequate advice?",
    options: [
      "Rates are fixed by alliance agreement",
      "Schedule reliability differs materially between carriers and alliances, so a cheap service that rolls bookings is not cheap",
      "All carriers now charge identical rates",
      "Rates are no longer published",
    ],
    answer: 1,
  },
  {
    q: "What is the largest and least predictable cost driver in Southern African cross-border road freight?",
    options: ["Fuel price", "Border post congestion", "Vehicle purchase cost", "Driver wages"],
    answer: 1,
  },
  {
    q: "Concealed damage is discovered after a clean delivery receipt was signed. What determines whether a claim survives?",
    options: [
      "Nothing — a clean receipt extinguishes the claim entirely",
      "Whether notice was given to the carrier within the short period the applicable liability regime allows",
      "Whether the goods were insured for full value",
      "Whether the forwarder acted as agent or principal",
    ],
    answer: 1,
  },
];

export const aukSpm023Practical = {
  title: "Quote, Document and Move a Consignment",
  description: `A four-part exercise following one consignment from enquiry to delivery.

**Part 1 — Chargeable weight and mode.** Learners receive consignment dimensions, weights and a delivery deadline for three scenarios: a dense cargo, a measurement cargo, and an urgent high-value cargo. They calculate chargeable weight for both sea and air, recommend a mode with reasoning, and state what would change the recommendation.

**Part 2 — Packing, marking and compliance.** For the chosen scenario the learner specifies the packing, the marking set, whether ISPM 15 applies and what mark is required, and how the VGM will be obtained and by whom. Where the cargo is dangerous, they identify the governing instrument by mode and list the documents the shipper must provide.

**Part 3 — Quotation.** The learner produces an all-in quotation, itemising base freight and every surcharge, stating inclusions and exclusions, and identifying who is arranging cargo insurance and on what authority. Quotations showing only a base rate are marked down.

**Part 4 — Failure analysis.** Given a consignment that went wrong — a container refused at the gate, a consignment fumigated at destination, a customs stop for examination — the learner identifies the root cause, who bore the cost, and the single check that would have prevented it.

Assessed on arithmetical accuracy, correct identification of the governing instrument, and whether the learner distinguishes what was confirmed from what was assumed.`,
};

export const aukSpm023Outcomes = [
  "Explain the freight forwarder's role, and distinguish acting as agent from acting as principal and the liability that follows",
  "Calculate chargeable weight for sea and air consignments and apply the correct volumetric basis",
  "Identify cargo categories and select appropriate unitisation, container type and FCL or LCL arrangement",
  "Specify export packing and marking, including ISPM 15 treatment of wood packaging material",
  "Apply the CTU Code to the packing and securing of containers",
  "Compare transport modes on cost, speed, reliability and cargo safety, and justify a recommendation",
  "Describe the modern liner market, including vessel-sharing alliances, service types and freight surcharges",
  "Apply the dangerous goods regime appropriate to each mode, including IMDG Amendment 42-24 and the IATA DGR",
  "Identify transport documents, distinguish documents of title from receipts, and state the liability regime by mode",
  "Apply South African customs, VGM and VAT requirements to import and export consignments",
  "Explain the consequences of non-compliance and where the forwarder's own liability arises",
];

export const aukSpm023Summary =
  "Freight forwarding as it is practised now. Chargeable weight and cargo measurement, export packing and marking including ISPM 15, container packing under the CTU Code, mode selection, the modern liner market of vessel-sharing alliances, air and cross-border road freight, dangerous goods across all four modal regimes, transport documents and liability limits, and South African customs, VGM and VAT requirements. Built on SAQA US 252439 and updated throughout to the 2026 regulatory position.";

export const aukSpm023 = {
  code: "AUK SPM 023",
  title: "Freight Forwarding",
  summary: aukSpm023Summary,
  outcomes: aukSpm023Outcomes,
  modules: aukSpm023Modules,
  quiz: aukSpm023Quiz,
  practical: aukSpm023Practical,
  passMark: 70, // 21 of 30
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Chargeable weight calculator / worksheet — sea and air, worked and blank
 *   2. Export packing and marking checklist, including ISPM 15 decision point
 *   3. VGM procedure template — Method 1 and Method 2, with declaration form
 *   4. Container type and dimension reference card, with TEU/FEU and payloads
 *   5. Surcharge glossary — BAF, CAF, THC, ISPS, GRI, PSS and the rest
 *   6. Document matrix — which document, which mode, title or receipt, liability regime
 *   7. Dangerous goods instrument map by mode, with current edition/amendment
 *   8. All-in quotation template with standard inclusions and exclusions
 *
 * Items 1, 3 and 8 carry the most weight — they are the three things a forwarder
 * does on every consignment.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 * This course states several figures and structures that change. Verify:
 *   - Alliance membership (redrawn in 2025; Ocean Alliance committed to 2032)
 *   - IMDG Code amendment in force (42-24 mandatory from 1 Jan 2026; the cycle
 *     is biennial with a one-year voluntary transition)
 *   - IATA DGR edition (annual; 67th edition for 2026)
 *   - SA VAT rate (15% since 1 April 2018)
 *   - Montreal Convention SDR liability limits (revised periodically)
 *   - Status of the Customs Control Act 31 of 2014 and Customs Duty Act 30 of 2014,
 *     whose implementation has been phased and partly deferred
 *   - Incoterms edition taught (2020)
 *
 * ── NOTE ON THE SOURCE MANUAL ─────────────────────────────────────────────
 * The learner manual for US 252439 (release 2009, registration ended 2012) teaches
 * liner conferences as the market structure, refers to Tremcards as current, omits
 * VGM, ISPM 15 and the CTU Code entirely, and predates Incoterms 2010 and 2020.
 * It should not be issued to learners in its present form. The arithmetic in it —
 * freight ton, the 6000 divisor — remains correct and is retained here.
 *
 * Note also that US 252439 is "Handle cargo for import and export", which is
 * narrower than freight forwarding. This course covers the unit standard's outcomes
 * and adds the forwarding content the standard does not reach: the forwarder's
 * capacity and liability, FIATA documents, liability regimes, freight rating and
 * surcharges, and customs. If the course is ever mapped to the unit standard for
 * assessment purposes, that gap runs the other way and is not a problem.
 */
