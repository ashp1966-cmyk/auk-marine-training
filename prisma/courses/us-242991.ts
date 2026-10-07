/**
 * US-242991 — Facilitate the Forwarding & Clearing of Dangerous Goods for Transportation
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 242991 · elective
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * ── SCOPE STATEMENT ───────────────────────────────────────────────────────
 * This course teaches the forwarding and clearing agent's role in moving
 * dangerous goods. It does NOT qualify a learner to classify dangerous goods,
 * sign a dangerous goods declaration, or act as the "qualified person" required
 * under regulation 277. Module 15 states this. Do not market it as DG
 * certification.
 *
 * ── SOURCE AND CORRECTIONS ────────────────────────────────────────────────
 * Built from the learner manual for US 242991 (release 01/07/2009,
 * registration ended 30/06/2012). The documentation requirements, consignor
 * and consignee duties, the Incoterm question, classification, packaging,
 * modal selection, NRTA Chapter VIII and storage-in-transit content are taught
 * as the manual sets them out — and the forwarder-perspective material in it
 * is genuinely good, which is why this course keeps its structure.
 *
 * Corrected or added:
 *
 *   1. MSDS → SDS. The manual says Material Safety Data Sheet throughout and
 *      cites ISO 11014 and ANSI Z400.1-1993 as the content standard. Under GHS,
 *      adopted here through SANS 10234, the document is a Safety Data Sheet in
 *      a prescribed 16-section format. Module 8.
 *   2. HAZARDOUS CHEMICAL AGENTS REGULATIONS replaced the Hazardous Chemical
 *      Substances Regulations 1995 that the manual relies on.
 *   3. SABS → SANS NUMBERING. The manual uses SABS 0228, 0229, 0231, 0232,
 *      0233 throughout. Those were renumbered: SANS 10228, 10229, 10231,
 *      10232, 10233. Both appear in the manual, inconsistently.
 *   4. CEFIC TREMCARDS. The manual asks "Why do we still use CEFIC
 *      Tremcards?" — the CEFIC system has since been discontinued, and
 *      internationally ADR moved to standardised Instructions in Writing. The
 *      South African instrument is the TREC under SANS 10232-4.
 *   5. LITHIUM BATTERIES — absent. Now the commonest undeclared dangerous good
 *      a forwarder handles. Module 14.
 *   6. ROAD TRAFFIC ACT 29 OF 1989 — superseded by the National Road Traffic
 *      Act 93 of 1996, which the manual also cites, inconsistently.
 *   7. ADG CODE — the manual cites the Australian Dangerous Goods Code for
 *      hazard and packing group information. Wrong jurisdiction; SANS 10228
 *      applies here.
 *   8. C&F — an obsolete term replaced by CFR in Incoterms 1990. Incoterms
 *      2020 is the current edition.
 *   9. PENALTY FIGURES — the manual's R100,000 maximum fine and R500 per
 *      substance Tremcard fines are of their era. Verify current levels.
 *  10. UN NUMBER RANGE — the manual says "UN0001 to about UN3500". The range
 *      now extends beyond UN3550.
 *  11. DRIVER TRAINING — the manual describes it as required "after a date to
 *      be determined by the Minister". That date has passed.
 *
 * The manual's PDF metadata carries the title "Clean and Store Glassware",
 * which is a template error of the same kind seen across this series.
 */

export const us242991Modules = [
  {
    title: "1. The Forwarder's Position in the Dangerous Goods Chain",
    content: `A forwarding and clearing agent moving dangerous goods occupies an uncomfortable position: substantial responsibility, limited authority, and liability that attaches whether or not you were the one who got it wrong.

**What you can and cannot do**

**You cannot classify.** Classification is the consignor's duty. You cannot determine that a substance is UN1993 Packing Group II on a client's behalf.

**You cannot sign the declaration.** The dangerous goods declaration is signed by the consignor, and for air the Shipper's Declaration may not be completed or signed by a forwarder, agent or packer under any circumstances.

**What you can do — and must** — is arrange, verify, transmit and refuse. You check that what you have been given is complete, internally consistent and in the right format. You pass the information to every party that needs it. And you decline consignments where the paperwork does not add up.

**Liability runs cradle to grave**

Where the carrier is not carrying their own goods, the consignor and consignee are expected to be more familiar with the hazards of the products than anyone else in the chain. **Consequently they are held responsible for compliance — as well as the operator and the driver.**

And the forwarder sits inside that. From SANS 10231:

> *"Relevant parties such as marketing agents, sales agents or transport brokers would be regarded as assuming the role of their principals for the provision of all the necessary information to the consignor."*

**Freight forwarders dealing with the international transport of dangerous goods therefore need to be especially aware of their obligations.** Acting for a principal does not insulate you; it puts you in their shoes for the purpose of supplying information.

**A misunderstanding worth correcting immediately**

There is a common belief among clearing and forwarding agents that the only documents required are an SDS and a transport emergency card.

**That is incorrect.**

The documents the road transport authorities require to be handed over are the **transport emergency card** and the **Dangerous Goods Declaration** in the prescribed format — and, where a freight container is packed, a **container packing certificate**.

**Declaration forms supplied by overseas suppliers are very often not in the format the South African regulations require.** Delays follow while the documents are corrected, and heavy fines are possible.

**The regulatory frame you work inside**

| Mode | Instrument |
| --- | --- |
| Air | ICAO Technical Instructions, applied through the IATA DGR |
| Sea | IMDG Code |
| Road, South Africa | National Road Traffic Act 93 of 1996, Chapter VIII, incorporating the SANS codes |
| Road, Europe | ADR |
| Rail | RID |

The IMDG Code exists to harmonise national laws, and **in many cases exceeds the regulations in individual countries** so that dangerous goods meet a common international standard. Its objective is to facilitate the safe movement of hazardous cargo internationally **and to enable the unrestricted movement of such cargo** — both halves matter.

**The qualified person**

Regulation 277 requires that **the operator, consignor or consignee nominate a "qualified person"** to perform the tasks prescribed in Chapter VIII — at the loading point, during transportation, and at the offload point.

A forwarder who takes on those tasks without a nominated qualified person behind them is operating outside the regulation.`,
  },
  {
    title: "2. Why Dangerous Goods Documentation Differs",
    content: `**Non-hazardous shipment documentation is straightforward.** A transport document — bill of lading, air waybill or road waybill — a commercial invoice and a packing list.

**Dangerous goods documentation is materially more complex**, and the reason is not bureaucratic. It is that the documents are the only means by which the hazard travels with the cargo.

**What the transport document must achieve**

The primary requirement of a dangerous goods transport document is to **convey the fundamental information relative to the hazard of the goods being offered for transport**.

The primary documentary requirement is that **the goods should be properly described and classified, and a declaration made as to their nature, marking, labelling and packing**. This is done either by annotation to an existing transport or cargo handling document, or through a separate document.

**Why accuracy matters more here than anywhere else**

For consignments involving dangerous goods, with the added safety and environmental exposure, **it is doubly important that accurate information is available**.

The necessity for **reliability and precision of data** passing between the parties responsible for documenting, packing and handling ensures the safe and efficient movement of the goods.

Documents should therefore be prepared so they **comply with legislation, facilitate the movement, and above all provide information which enables the goods to be handled safely.**

That third purpose is the one people forget. A document that satisfies the regulator but cannot be used by a firefighter at 0300 has failed at the thing it exists for.

**Planning for compliance**

Before assessing the effect of the legislation, the operator or consignor needs to establish what goods or substances they manufacture or transport are classified as dangerous under **SANS 10228**.

Build a register with, for each substance:

- **UN number**
- **Technical name**
- **Classification**
- **Exempt quantity**
- **Compatibility restrictions on multiloads** with other classified goods

From that, the placarding, documentation and transport emergency card requirements follow.

**The document set for a road movement**

- **Transport emergency card** for each substance transported
- **Dangerous Goods Declaration** in the required format, listing the substances
- **A clear indication of the route** to be followed by the driver
- **Container packing certificate** where a freight container has been packed
- **Waste classification confirmation** where applicable

**Delivery documentation** — invoices, delivery notes, waybills — has **no specific format** and is the same as for non-hazardous goods. That exception surprises people and is worth knowing: the special requirements attach to the hazard documents, not to the commercial paperwork.

**How information is transmitted**

Information about dangerous goods is transmitted by various means, of which **some — a telephone call, for instance — carry no legal effect and must be confirmed by other means**.

Recommended means of confirmation:

- a suitable **annotation on a transport or cargo handling document**
- a **dangerous goods declaration form**
- **electronic means** — EDI and its successors

Electronic communication between shipper, forwarder, carrier and other parties is used increasingly, and the direction of travel is towards it. **But there remains a need for a paper document to provide information on action required in an emergency and for controls en route.** The vehicle still needs something in the cab.`,
  },
  {
    title: "3. The Dangerous Goods Declaration",
    content: `Refer to **SANS 10232-1**.

**The dangerous goods declaration shall bear the heading "DANGEROUS GOODS DECLARATION"** and shall contain:

- **The proper shipping name** in accordance with SANS 10228
- **The UN number**
- **The hazard class and the packing group**, where applicable
- **The quantity and type of packaging**, or the word "bulk" where applicable
- **The gross mass, and the net mass or volume** of the goods
- **The names and contact details** of the following parties where applicable: **consignor, product manufacturer, product owner, product custodian, the party contracting the operator, the operator, and the consignee**

Note the breadth of that last list. It is not just consignor and consignee — the declaration is designed so that anyone responding to an incident can reach whoever actually knows about the substance.

**Not all these details may be available where dangerous goods are being imported into South Africa.** That is a recognised practical limitation, and it is exactly where a clearing agent's work begins.

**The two declarations**

**Signed by the consignor:**

> *"I hereby declare that the content of this consignment is fully and accurately described above by the proper shipping name, and is classified, packaged, marked and labelled/placarded, and is in all respects in proper condition for transport in accordance with the relevant national legislation."*

**Signed by the driver:**

> *"The consignment above has been received into my vehicle. My vehicle is correctly placarded and I am in possession of all necessary transport documentation pertaining to the transport of dangerous goods, including information to be followed in the case of an emergency."*

Two signatures, two different assertions. The consignor certifies the goods. The driver certifies the vehicle and the documents.

**Storage and retention**

**The Dangerous Goods Declaration shall be stored in the designated space** in the vehicle.

**Copies shall be retained by the consignor for a minimum of 90 days after the date of shipment** where no incident is reported. **If an incident is reported, the declaration shall be retained for the duration of the relevant investigation.**

Confirm current retention periods against the standard in force.

**UN numbers**

Four-digit numbers identifying dangerous substances and articles in international transport. Some substances have their own; groups of chemicals or products with similar properties share one — flammable liquid, not otherwise specified, is **UN1993**.

**A chemical in solid state may receive a different UN number from the liquid phase** where the hazardous properties differ significantly, and **substances at different purities or concentrations may also receive different UN numbers**.

That is a trap for a forwarder working from a product name alone. The same trade name at two concentrations can be two different UN numbers, two different packing groups, and two different sets of requirements.

UN numbers are assigned by the UN Committee of Experts and published in the Model Regulations — the Orange Book. The range now extends beyond UN3550; older material citing "UN0001 to about UN3500" is out of date.

**For air freight**

With few exceptions, dangerous goods must be accompanied by a **Shipper's Declaration for Dangerous Goods**, prepared by the shipper, giving the operator details and declaring compliance. It includes:

- whether for **passenger or cargo aircraft only**
- **proper shipping name**
- **class or division**
- **UN/ID number**
- **packing group**
- **subsidiary risks**
- **net quantity, type of packaging, number of packages**
- for radioactive materials: **name or symbol of the radionuclide, activity, and category of the package**

A few dangerous goods do not require a Shipper's Declaration — **dry ice used for perishables which are not themselves dangerous goods** being the common example.`,
  },
  {
    title: "4. The Transport Emergency Card",
    content: `**What it is**

A **transport emergency card** must be carried in the cab of a vehicle transporting dangerous goods by road. It contains instructions and information the driver can refer to in the event of an incident involving the load.

**Its purpose** is to provide information on the nature of the load and recommendations on what actions should be taken in case of an incident.

Spillage of hazardous substances can have grave consequences for the people involved and the environment **if the correct reaction is not carried out**. The correct reaction depends on the nature of each individual substance or mixture — which is why **each substance classified as dangerous goods must have its own card where the Emergency Response Guide differs**.

**Why it exists at all:** not everyone is trained to know how to react, and everyone needs to be able to do something when it happens.

**TREC and TREMCARD — the position**

The South African Department of Transport has made it **compulsory that a transport emergency card is carried in the cab for each dangerous goods substance on the vehicle**.

Historically two forms existed:

**TREMCARD** — generated from the European Council of Chemical Manufacturers' Federation (CEFIC) system.
**TREC** — the South African template created by the SABS, in accordance with **SANS 10232-4**.

Under the 15th amendment to the regulations under the National Road Traffic Act 93 of 1996, **regulation 273 amended the definition of "Tremcard" to include TREC cards**, so both were valid.

**But the CEFIC TREMCARD system has since been discontinued**, and internationally ADR replaced Tremcards with standardised four-page **Instructions in Writing** issued by the carrier.

**Use the TREC under SANS 10232-4.** Do not commission or accept a CEFIC TREMCARD as a current instrument, and confirm the position under the regulations in force.

**Why TREC is the better instrument in any event**

**TREC uses the ERG system used by South African emergency services.**

**CEFIC used the European Hazard Identification (HI) number system, which is not compatible with ERG numbers, is not recognised in the South African standards or regulations, and could cause confusion in an emergency.**

TRECs were formulated by the SABS to suit South African road freight conditions.

That is the substantive argument, and it holds independently of which system is still being published: an emergency card whose numbering the attending fire service does not use is worse than no card, because it invites the wrong action.

**What a compliant card looks like**

The Department of Transport is specific:

- It must be a **CEFIC Tremcard or, in accordance with SANS 10232-4, a TREC**
- It must be in **English**
- It must be an **original** — no photocopies or other means of reproduction
- It must be **readable**
- It must have **red bands on its left and right margins** to be easily recognisable
- It must be **fully completed** with product name, company name, address and a telephone number to help emergency responders
- **All selection sentences must be chosen** — miscible or not miscible with water, lighter or heavier than water — to help those involved in an incident

That last requirement is routinely ignored. A card with the selection sentences left unmarked tells a responder nothing about whether to use water.

**Correctness and integrity**

The card must be created by **accredited companies or individuals**, because the information in it is used to determine:

- appropriate **first aid and firefighting** actions
- **spill containment** actions

**Incorrect actions could have a very serious impact on human lives in any incident, fire or spillage.**

**Consequences of non-compliance**

Not being in possession of a valid card when transporting dangerous goods by road is an offence, attracting traffic contravention fines for: no card available; card incomplete; incorrect software used to produce it; and obsolete, expired or non-original cards — **each assessed per substance**.

**Insurance companies are unlikely to cover the costs of an incident if the proper documents were not carried on the vehicle.** That exposure usually exceeds the fine by a wide margin.

Penalty amounts change; verify current levels rather than relying on figures in training material.`,
  },
  {
    title: "5. Container Packing Certificate and Waste Confirmation",
    content: `**The container packing certificate**

Refer to **SANS 10231**.

**For every container containing hazardous cargo being shipped anywhere in the world, a packing declaration must be completed and supplied to the container operator or shipping line.**

It must:

**(a)** satisfy all **IMDG Code** requirements
**(b)** satisfy the requirements of **any and all carriers or authorities through whose hands the container will pass** — municipalities, the rail operator, the port authority, the carrier, and the overseas counterparts

**When packages containing dangerous goods are packed into a freight container, the consignor shall provide a container packing certificate**, stored in the designated space, specifying the **container identity number** and certifying that packing was carried out in accordance with the following:

- The container was **clean, dry and fit** to receive the goods
- **Goods that are incompatible have not been packed together** in the same container
- **Packaging complies** with national legislation and international regulations where applicable
- **All packages have been externally inspected for damage or leakage**, and only sound packages loaded
- **All packages have been properly stowed and secured**, with dunnage if necessary, to prevent movement
- **The freight container and all packages have been properly labelled and placarded**
- **Drums have been stowed in an upright position**

**Combining it with the declaration.** The container packing certificate may be combined with the Dangerous Goods Declaration where a signed declaration phrase is included, such as:

> *"It is declared that the packing of goods into this container has been carried out in accordance with the relevant clause of SANS 10231."*

**For freight containers packed outside South Africa**, reference shall be made to international regulations.

**The container packing certificate is not required for tank containers.**

**Who this binds**

**When packing their own shipping containers, shippers and forwarders are legally bound and responsible for documentation, segregation and proper securing.** They must ensure those packing the container are properly trained and aware of the rigorous standards of securing and bracing required for sea transport.

That is a direct statement of forwarder liability. If your people packed the box, the certificate is your assertion.

**Choosing a consolidator**

A shipper wants cargo to arrive intact and needs a container packer who is competent and understands the IMDG Code.

**When placing dangerous goods with a consolidator, shippers and forwarders should visit the premises, inspect the work, and form a view of the standards of care and attention. Good consolidators will welcome this interest.**

**The cheapest consolidator may not be the best performer**, and a small sum saved by not securing cargo properly may lead to an expensive loss later if the cargo is stopped or damaged in transit.

**Waste classification confirmation**

Where a vehicle transports **waste containing any material listed as a dangerous substance in SANS 10228**, and the total quantity of such material — by itself or combined with other such materials — **exceeds the exempt quantity**, the vehicle shall carry **written confirmation of the classified waste**.

Waste is the category most often missed, because nobody thinks of it as a cargo. A drum of contaminated solvent going for disposal is a dangerous goods movement with the same documentary requirements as a drum of new product.`,
  },
  {
    title: "6. Consignor and Consignee Duties",
    content: `**Definitions**

**Consignor** — the person who offers dangerous goods for transport in a vehicle referred to in regulation 274(1), **including the manufacturer or his or her duly appointed agent**.

**Consignee** — the person who accepts dangerous goods which have been transported in such a vehicle.

**Consignor duties**

- Ensure the **operator of the vehicle has been advised** of the nature, quantities and hazards of the goods being carried
- Advise the **emergency response requirements**
- **Supply all the necessary documentation**
- Ensure the vehicle is equipped with the appropriate **placards and transport emergency cards**, and that **the goods are compatible**

**Classification** — it is the duty of the consignor or shipper to **carry out the correct classification and identification** of the goods they are supplying.

The consignor must establish: what is classed as hazardous goods; the correct UN or substance identification number for the class being transported; what goods may form part of a multiload and how they must be loaded on the vehicle.

**Packaging selection** — the consignor is responsible for **selecting packaging and labelling**. **UN specification packaging must be used**, with an exemption for limited quantity receptacles in combination packages.

**Warning marks and labels** — the consignor is responsible for **marking and labelling of packages**. Above the threshold capacity, packages must be marked with the **UN number**, the **primary class danger label**, and the **subsidiary hazard label** where applicable. The labels are **100 mm diamond-shaped** and must conform to the designs in the regulations.

**Preparation of the transport document** for the transport operator.

**Compatibility — regulation 278.** The consignor shall ensure that a **multiload of dangerous goods transported on a vehicle is compatible** as prescribed in Annex D to SANS 10232-1.

**Classification authority — regulation 279.** If there is **any doubt** as to the appropriate classification, the goods **shall be classified by an approved classification authority** in accordance with SANS 10228. Goods shall be presented by the consignor **packed in packaging approved by an approved test station and certification authority**, and marked as contemplated in SANS 10233 and SANS 10229.

Note what regulation 279 gives you. Where a client is uncertain about classification, the answer is not a best guess — it is referral to an approved classification authority. A forwarder who lets a doubtful classification proceed has passed up the mechanism the regulation provides.

**Consignee duties**

The consignee accepts the goods. But the more consequential question for a forwarder is **who is the consignor**, which Module 7 addresses.

**Everybody is responsible**

Where the carrier is not carrying their own goods, the consignor and consignee are expected to be more familiar with the particular hazards of the products. **Consequently they are held responsible for compliance, as well as the operator and the driver.**

**The operator, consignor and consignee must each nominate a "qualified person"** to handle the tasks concerning the transportation of the dangerous goods, under regulation 277.

**Liability is assumed from cradle to grave.** Clearing and forwarding agents acting on behalf of an importer or exporter arrange transport, and in doing so **must present the required documents to the transport company and ensure the transport company is qualified in terms of the Act to carry the cargo in the required manner.**

Checking that your haulier is actually authorised to carry the class in question is a forwarder obligation, not a courtesy.`,
  },
  {
    title: "7. Who Is the Consignor? The Incoterm Question",
    content: `This module addresses the single most practically useful point in the source material, and the one a clearing agent meets on every import.

**The grey area**

There is genuine uncertainty about **who is responsible for producing the required forms — the transport emergency card and the declaration — when transporting goods by road from the harbour to the consignee's destination**.

**The Incoterm of the contract determines who owns the goods from harbour to the point of destination in South Africa — in other words, who is the consignor and who is the consignee.**

**How it resolves**

**Where the contract is CIF or CFR** (the manual says "C&F", an obsolete term replaced by CFR in the 1990 revision), the **overseas supplier is the consignor up to the point of destination** and is therefore responsible.

**However — the overseas supplier may not be familiar with the format of the South African declaration form.** That is the practical problem, and it is why the theoretical answer does not help you on a Tuesday afternoon at the port.

**Where the Incoterm is FOB**, the **importer is the consignor from the harbour to the point of destination**, and is therefore responsible.

**The working position**

**The importer — the consignee — should supply the clearing agent with the declaration form and the transport emergency card, to avoid any delays.**

That is a pragmatic rule rather than a legal one, and it is worth stating to a client at the quotation stage rather than discovering the gap when the container is on the quay.

**Why the theoretical answer fails in practice**

**Declaration forms supplied by overseas suppliers are very often not in the format the regulations require.** You then have a container at the port, a form that does not comply, and a supplier in a different time zone who does not understand the request.

**Delays follow, and heavy fines are possible.**

**The forwarder's move.** Establish the Incoterm at booking. If it is CIF or CFR, tell the client early that the overseas consignor's documentation will need checking against the South African format, and ask for it in advance. If it is FOB or EXW, tell the client they are the consignor and the documentation obligation is theirs.

Either way the conversation happens before the vessel arrives, not after.

**A note on Incoterms editions**

The source material uses **C&F**, which was replaced by **CFR** in Incoterms 1990. The current edition is **Incoterms 2020**, with eleven rules. A contract citing an old edition is governed by that edition — Incoterms do not expire — but new contracts should use 2020 and the edition should always be cited expressly.

The full treatment of Incoterms, including which rules suit containerised cargo and how each affects customs valuation and VAT, is in US-252437.

**The broader principle**

The Incoterm decides who bears cost and risk at each point, and therefore who holds the consignor's duties at each point. It is not merely a pricing term. On a dangerous goods movement it determines **who must classify, who must package, who must document, and who is prosecuted if none of it was done.**`,
  },
  {
    title: "8. From MSDS to SDS",
    content: `**This module corrects the largest single change since the source manual was written.**

The manual refers throughout to the **Material Safety Data Sheet**, and cites **ISO 11014** or **ANSI Z400.1-1993** as the content standard.

Under the **Globally Harmonised System**, adopted in South Africa through **SANS 10234**, the document is a **Safety Data Sheet (SDS)** in a prescribed **16-section format**.

This is not a rename. The old MSDS had no mandated structure, so firefighting information might appear on page 1 of one sheet and page 4 of another. **The fixed section order is what makes an SDS usable by someone under pressure who has never seen that particular sheet before.**

**The sixteen sections**

| § | Content |
| --- | --- |
| 1 | Identification of the substance and supplier |
| 2 | Hazards identification |
| 3 | Composition and information on ingredients |
| 4 | First-aid measures |
| 5 | Fire-fighting measures |
| 6 | Accidental release measures |
| 7 | Handling and storage |
| 8 | Exposure controls and personal protection |
| 9 | Physical and chemical properties |
| 10 | Stability and reactivity |
| 11 | Toxicological information |
| 12 | Ecological information |
| 13 | Disposal considerations |
| 14 | **Transport information** |
| 15 | Regulatory information |
| 16 | Other information, including date of revision |

**Section 14 is the forwarder's section.** It gives the UN number, proper shipping name, transport hazard class, packing group, environmental hazards, and any special precautions. It is where you go first on any consignment.

**The legal basis**

The **Occupational Health and Safety Act 85 of 1993** requires that any person who designs, manufactures, imports, sells or supplies any article or substance for use at work shall ensure, as far as is reasonably practicable, that it is **safe and without risks to health when properly used** and complies with all prescribed requirements.

Such a person must take the steps necessary to ensure information is available about the use of the substance at work, the risks associated with it, the conditions necessary for safe use, and **the procedures to be followed in the case of an accident**.

**Every person who manufactures, imports, sells or supplies a hazardous chemical shall, as far as reasonably practicable, provide the person receiving it, free of charge, with a safety data sheet** containing the prescribed information, to enable the user to take the necessary measures for health and safety protection.

**Every employer who uses a hazardous chemical at work shall be in possession of a copy of the relevant safety data sheet**, and **make that information available at the request of any interested or affected person.**

Note the regulation change: the **Hazardous Chemical Agents Regulations** replaced the Hazardous Chemical Substances Regulations 1995 that the manual relies on.

**What the forwarder extracts from it**

- **Composition and information on ingredients**
- **Identification of primary and secondary hazards**, recorded in the hazardous cargo register
- **First-aid measures**, and inform all first aiders
- **Fire-fighting measures and procedures**
- **Measures on accidental release**
- **Handling and storage procedure**, taking segregation into account
- **Exposure control and personal protection** requirements
- **Physical and chemical properties**
- **Stability and reactivity**
- **Toxicological information**
- **Disposal considerations**
- **What is required if the goods are to be transported** to a customer or another site

**Sources of information, and their limits**

**The SDS** from the manufacturer, importer or supplier.

**Class information** — the class indicates a key hazard but **is generally not sufficient on its own, because there are significant differences in the chemical and physical properties of individual products within a class.**

**Package labels and markings** — information on the package **will often be insufficient to cover anything more than the most basic use.** Some consumer packages carry enough for most handling situations, including spill clean-up and disposal, but that is the exception.

**The forwarder's discipline.** Section 14 tells you what to declare. Section 2 tells you the hazard. Section 10 tells you what it must not travel with. Read all three before booking, and keep the SDS with the file.

**Currency.** Suppliers must review a safety data sheet whenever the formulation changes, new hazard information emerges, or it becomes apparent the information may not be accurate or current. **Check the revision date in section 16.**

Products such as food flavouring, perfumes, chemicals and electronic equipment can be classed as dangerous goods. **It is always important to obtain the safety data sheet from the manufacturer to determine whether the product can in fact be forwarded as regular cargo.**`,
  },
  {
    title: "9. Identification and Classification",
    content: `**The nine classes**

| Class | Hazard |
| --- | --- |
| 1 | Explosives |
| 2 | Gases |
| 3 | Flammable liquids |
| 4 | Flammable solids; substances liable to spontaneous combustion; substances which, in contact with water, emit flammable gases |
| 5 | Oxidising substances and organic peroxides |
| 6 | Toxic and infectious substances |
| 7 | Radioactive material |
| 8 | Corrosive substances |
| 9 | Miscellaneous dangerous substances and articles |

Classes 2, 4, 5 and 6 carry divisions; Class 1 carries divisions and compatibility groups. The full treatment is in US-242996 and US-242987.

**Packing groups**

The packing group denotes **the magnitude of danger the material poses from its hazard**.

| Group | Degree of danger |
| --- | --- |
| **I** | Great danger |
| **II** | Medium danger |
| **III** | Minor danger |

**Packing groups are assigned to** Classes 3 and 4, Divisions 5.1 and 6.1, Class 8 and some Class 9 substances.

**Packing groups are NOT assigned to** Class 1 explosives, Class 2 gases and gas mixtures, Division 6.2 infectious substances, or Class 7 radioactive material.

**Packing group designators are written in Roman numerals** — PG II, not PG 2.

**Two consequences that matter to a forwarder**

**Segregation.** Where one of two incompatible materials is **Packing Group I or II**, a **greater segregation distance or another means of segregation** is recommended.

**Packaging test severity.** When performance testing a package to determine that the design meets the minimum UN criteria, **the packing group of the product is one of the factors determining the test protocol**. Testing for a PG I product is **considerably more stringent** than for PG III.

So a package certified for PG III will not do for a PG I substance, and a forwarder accepting a PG I consignment in PG III-marked packaging has a non-compliance on their hands.

**Who classifies**

**The consignor.** Companies **cannot decide for themselves** what is hazardous and what is not — all goods appearing in the dangerous goods list incorporated in **SANS 10228** are regarded as hazardous.

**Where there is any doubt**, regulation 279 requires classification by an **approved classification authority** in accordance with SANS 10228.

**What a forwarder verifies**

You do not classify. You check that the classification you have been given is internally consistent:

- Does the **UN number** match the **proper shipping name** in SANS 10228?
- Does the **class** match the UN number?
- Is the **packing group** one that this class actually uses?
- Are **subsidiary risks** shown where the entry requires them?
- For a **generic or n.o.s. entry**, have the **technical names** been supplied?
- Does the **SDS section 14** agree with the declaration?

Any mismatch goes back to the consignor before the consignment moves.

**A note on sources**

The source manual cites the **ADG Code** — the Australian Dangerous Goods Code — for information about the relative hazards of classes, subsidiary risks and the characteristics of packing groups.

That is the wrong jurisdiction. **In South Africa the reference is SANS 10228**, with the IMDG Code for sea and the ICAO TI / IATA DGR for air.`,
  },
  {
    title: "10. Packaging and UN Approval",
    content: `**SANS 10229 — Packaging of dangerous goods for road and rail transportation in South Africa.**

Once goods have been properly identified and classified, they **must be packed according to strict guidelines**. That packaging has been designed and manufactured to high standards and has **undergone rigorous testing to ensure its soundness**.

**What a UN approved package is**

A package that has been **designed and tested, prepared exactly as it is to be used in transport, without failure of performance**, in accordance with the requirements of the ICAO Technical Instructions, the IATA DGR or the IMDG Code.

The procedure ensures the package is **suitable and safe** for the transport of dangerous goods, and that it is **registered and therefore fully traceable**.

**What constitutes the package "design"**

The design is not just the box. It includes:

- **Method and materials of construction**
- **Type of sealing mechanism and closure**
- **Dimensions, weight and capacity**
- **Whether it is for liquids or solids**
- For combination packages: a **tested and certified inner packaging with the closure it was tested with**
- An **intermediary packaging**
- An **outer packaging**
- The **type of inserts** holding the inner inside the outer in a stable position
- **Absorbent and cushioning material**
- The **internal configuration** of the packaging components
- The **closing tape** with which the outer may be sealed, and **the manner of sealing**

Read that list and the point becomes clear: **a UN approval covers a specific assembly, not a generic box.** Substituting a different inner bottle, a different cap, or sealing with the wrong tape breaks the approval — and a forwarder who accepts a "UN approved drum" without checking whether the assembly matches the tested design has verified nothing.

**Testing in South Africa**

Packs may be purchased abroad, but **if manufactured in South Africa they must be tested by the SABS**, which then allocates a United Nations mark to packs that comply. **Approved pack details are entered into the SABS register.**

**Submitting samples for testing:**

- Sample packs **should not contain the actual dangerous goods** but similar substances of a non-dangerous nature
- Where empty packs bear danger labels, these **should be overprinted "Sample only"**
- Containers filled with non-hazardous products **must be certified as non-hazardous** and the labels overprinted accordingly
- Empty or filled packs **must be treated with care during transit** to ensure they arrive intact
- The SABS advises on the **number of samples** required and the detailed information needed

**Radioactive packages are not tested by the SABS** — those are approved separately by the competent authority for nuclear matters.

**Why air transport is the hardest case**

**The pressure reductions, temperature variations and vibrations experienced in transport — air transport in particular — place dangerous goods at high risk. If suitable precautions are not taken, temperature and pressure changes can cause liquids to expand or cavitate, resulting in receptacles bursting.**

**General packing principles**

- The receptacle must be **tested to withstand anticipated pressure changes** from temperature increase, altitude variation and so on
- **Special attention to closures, gaskets, can seams and soldered joints**
- Packs of **Class 3 flammable liquids** must withstand a **specified minimum internal gauge pressure without leakage** when filled to the appropriate ullage
- **Breakable or puncturable inner packs** — glass, earthenware, plastic — must be **well cushioned in absorbent material and packed in strong outer containers**, with **fragile labels** applied
- **Absorbent materials must be carefully selected**; some products require **non-combustible and/or non-reactive** absorbents
- **All packing must be resistant to its contents.** Nothing in the packing may be eroded by the contents or form a hazardous compound with them — certain plastics react to some solvents
- **Each restricted article must be packed separately.** External packing must not contain smaller packs of substances which, when mixed, would create excessive heat or gas or produce corrosive substances
- **Friction-type lids** on metal containers of paints and similar products **must be fitted with retaining clips or other locking devices**
- **Sacks, where permitted, must be water resistant and tightened** to prevent sifting of contents

**Marking**

Packages above the threshold capacity must carry the **UN number**, the **primary class danger label**, and any **subsidiary hazard label** — **100 mm diamond-shaped labels** conforming to the designs in the regulations.

Verification markings on the packaging are explicit essential embedded knowledge for this unit standard. **Learn to read the UN mark**: it tells you the package type, the packing group it was certified for, whether it is for liquids or solids, the year of manufacture and the certifying country.`,
  },
  {
    title: "11. Choosing the Mode",
    content: `**Dangerous goods shipments must be prepared in accordance with the regulations for the mode actually used.**

| Mode | Instrument | Scope |
| --- | --- | --- |
| **Air** | IATA DGR, under the ICAO TI | All countries working under ICAO regulations, and any airline under IATA |
| **Sea** | IMDG Code | Any sea transport |
| **Road (Europe)** | ADR | Countries that have adopted ADR, plus EU directives |
| **Road (South Africa)** | National Road Traffic Act 93 of 1996, Chapter VIII, with the SANS codes | All vehicles in the Republic |
| **Rail** | RID | Any rail transport |

South Africa has **not** adopted ADR. Its road regime is the NRTA and the incorporated SANS codes, which were themselves based on the UN Recommendations and the associated ADR provisions.

**What determines the mode**

Classification and documentation come first, but the practical drivers are:

**Whether the goods are permitted on that mode at all.** Substances acceptable under the IMDG Code may be forbidden by air. Air rules are the strictest.

**Passenger or cargo aircraft**, for air — which changes the permitted net quantity per package and sometimes the acceptability altogether.

**Whether the ocean carrier will take the class.** **Most ocean carriers will not approve dangerous goods other than IMO Classes 3, 8 and 9.** Shipping other classes requires a carrier with **specialised equipment** used to transport those particular classes.

That is a booking constraint a forwarder needs to know before quoting. A Class 5.1 consignment is not simply a Class 3 consignment at a different rate.

**Transit time.** Dangerous goods shipments usually need more transit time than regular cargo, and attract surcharges.

**Prior approval.** Dangerous goods may only be shipped with **prior approval from the carrier, and only before pre-booking**.

**The three requirements common to every mode**

All intended shipments of dangerous goods must be:

- **Correctly packed, marked and labelled**
- Accompanied by the **required documents** — including a Shipper's Declaration where applicable, **completed and signed by the shipper only**
- Compliant with **all State and Operator variations**

**The shipper is responsible for declaring, packaging and labelling dangerous goods.**

**Where the risk sits**

**Transportation of dangerous goods is a risk when they are not correctly packed or handled. If the goods are hidden, declared incorrectly, left completely undeclared, or packed or labelled incorrectly, health and safety is compromised.**

Products such as **food flavouring, perfumes, chemicals and electronic equipment** can be classed as dangerous goods. **Always obtain the safety data sheet from the manufacturer to determine whether the product can be forwarded as regular cargo.**

That sentence is the whole of a forwarder's defence against undeclared dangerous goods: when the commodity description is vague and the shipper is new, ask for the SDS before you book.

**Road and rail in South Africa**

The cartage of dangerous goods by road is generally handled by **highly skilled road haulage operators**, many operating nationally and some across Southern Africa.

**The controlling regulations are extremely stringent and have become progressively more severe**, adjusting as more sophisticated but increasingly hazardous substances are developed within the chemical and allied industries.

**Packaging for road and rail is governed by SANS 10229.**`,
  },
  {
    title: "12. South African Road Transport Law",
    content: `**The framework**

South Africa provides for the control of the carriage of dangerous goods by road in **Chapter VIII of the National Road Traffic Act 93 of 1996**, and the regulations incorporate numerous codes of practice and specifications compiled by the SABS, now published as SANS.

**The regulations and standards were implemented on 3 August 2001.**

Note: the source manual also cites the **Road Traffic Act 29 of 1989**. That Act has been superseded by the 1996 Act.

**Any company transporting products classed as hazardous must comply with SANS 10228**, and **failure to comply is a criminal offence**. Companies could also face heavy costs in spill clean-ups that may not be covered by their insurance policies. Penalty levels change — verify current figures.

**What is classed as dangerous.** **All goods appearing in the dangerous goods list incorporated in SANS 10228.** Companies cannot decide for themselves.

**The incorporated standards**

Under regulation 273 and 273A, the following are incorporated into the regulations. The manual uses the old SABS numbering; the current SANS numbers are given here:

| Standard | Subject |
| --- | --- |
| SANS 1398 | Road tank vehicles for petroleum-based flammable liquids |
| SANS 1518 | Design requirements for road tankers |
| **SANS 10228** | Identification and classification of dangerous substances and goods |
| **SANS 10229** | Packaging of dangerous goods for road and rail transportation |
| **SANS 10230** | Inspection requirements for road vehicles |
| **SANS 10231** | Operational requirements for road vehicles |
| **SANS 10232-1** | Emergency information system for road transportation |
| **SANS 10232-3** | Emergency action codes |
| **SANS 10232-4** | Transport emergency card (TREC) |
| **SANS 10233** | Intermediate bulk containers for dangerous substances |

These codes are based on the **UN Recommendations — the Orange Book — and the associated European ADR regulations**.

**Key regulations**

**274 — Application.** Applies to all vehicles registered in the Republic **wherever they may be**, and to all vehicles other than those registered in the Republic **whenever they are within the Republic**, in or on which dangerous goods are transported.

**275 — Transportation prohibited** unless in accordance with Chapter VIII.

**276 — Exemptions.** The Minister may, after consultation with the competent authority, grant exemption in respect of a specific consignment by notice in the Gazette, and may amend or cancel any exemption granted.

**277 — Duties of operator, driver, consignor and consignee**, as prescribed in Chapter VIII. **The operator, consignor or consignee shall nominate a qualified person** to perform the prescribed tasks, and may nominate one for any purpose deemed necessary.

**278 — Compatibility.** The consignor shall ensure a multiload is compatible as prescribed in **Annex D to SANS 10232-1**.

**279 — Classification and certification.** Doubtful classifications go to an **approved classification authority**. Goods must be presented **packed in packaging approved by an approved test station and certification authority**, marked per SANS 10233 and SANS 10229.

**280 — Driver training.** For vehicles carrying dangerous goods with a **gross vehicle mass exceeding 3,500 kg**, or vehicles to which SANS 1398 or SANS 1518 apply, **operators shall ensure drivers undergo training at an approved institution**. The syllabus must contain at least:

- interpretation and implementation of the instructions on the transport emergency card
- theoretical and practical training relevant to the vehicle type and class of dangerous goods
- detailed instruction on the emergency action response system and practical training on emergency action
- **duties of the driver before proceeding on a route** — vehicle condition, documents to be kept, route instructions, warning signs and devices, correct type and number of fire extinguishers, protective clothing
- **behaviour expected on the route** — planning stops, procedure during stops, permitted driving periods, action on an incident
- **procedure on reaching the destination**

Institutions issue a certificate on successful completion.

**281 — Documents held by the driver.** The driver shall ensure the **transport emergency cards and manifests** required are held **in the designated space in the cab** while dangerous goods are being transported. On demand the driver shall produce a **professional driving permit** where applicable, **a document clearly indicating the route** planned in accordance with SANS 10231, and those documents.

**282 and 283 — Dangerous goods inspectors.** A certificate of appointment is issued reflecting the designation, conditions, classes in respect of which the inspector is appointed, and the powers to be exercised.

An inspector may **stop and enter any motor vehicle** on which a substance suspected to be dangerous goods is transported, or **enter any premises** where a related operation is or is suspected to be carried out, and may: inspect or search; examine, extract and remove samples; open packagings; **detain a vehicle** reasonably suspected of non-compliance; **demand documents**; demand information; weigh, count, measure, mark or seal; examine and copy books and documents; demand explanation of entries; inspect operations and processes; and **seize** any substance, book, document or object appearing to provide proof of a contravention.

**An inspector must exhibit the appointment certificate on demand** where exercising powers in the presence of persons affected.

**A protection worth knowing:** an inspector or approved authority **shall not open dangerous goods packages, or unload or decant dangerous goods, unless** the operator was duly notified, the local authority authorised it, **and a qualified person supervises** the unloading, decanting or opening.

**Enforcement** has tightened. Traffic authorities historically did not enforce the law to its full extent, but newly appointed traffic officers are now required to be trained in the law relating to the transport of dangerous goods.`,
  },
  {
    title: "13. Operational Requirements on the Road",
    content: `**The regulations apply to the entire period during which the goods are being transported — including loading of the vehicle and the purging and cleaning of equipment.**

That scope catches people. A tanker being cleaned after discharge is still within the regulations.

**Vehicle requirements**

All road vehicles carrying a dangerous substance are **prohibited from using public roads unless labelled as the regulations require**. The vehicle must display:

- **Substance identification number**
- **The appropriate hazard warning label**
- **The emergency action code**
- **The telephone number for all-hours specialist advice**

Every vehicle must be:

- A **roadworthy, proper and suitable vehicle** in respect of the route, the goods concerned, and the circumstances of the conveyance
- **Used within appropriate safety limitations, precautions and requirements** regarding route, circumstances and commodity
- **Not overloaded** with regard to its authorised gross vehicle mass

**Hazardous cargoes require the highest standard of vehicle operation and management**, and are subject to further specific requirements according to the nature of the cargo.

**The operator's responsibilities on the road**

- The **substance loaded or unloaded corresponds to the labels displayed** on the vehicle
- **Safety procedures are adhered to**
- If **spillage occurs**, the correct emergency procedures are followed and the contamination appropriately cleaned up
- The driver is **in possession of the transport emergency cards**

**Any contravention is a punishable offence.**

**Routing and speed**

For explosives specifically:

- Persons conveying explosives **shall avoid towns and villages as far as practicable**, and a local authority may **prescribe the route** within its area of jurisdiction, subject to reasonable facilities for reaching the destination
- Where it is necessary to **halt during a journey**, the vehicle must remain **at least 500 metres from inhabited buildings and 200 metres from a public road**, and the person in charge **shall keep a constant watch over the explosives**

More generally, **vehicles carrying dangerous goods are bound to steer clear of densely populated areas and routes of heavy traffic.**

**Responsible hauliers stick to the regulations. There are, however, inexperienced or uninformed hauliers who expose others to danger and risk** — which is why a forwarder's duty to check that the transport company is qualified under the Act is not a formality.

**Driving hours**

**It is essential that the driver of a vehicle carrying dangerous goods stays alert and competent at all times.** The **Basic Conditions of Employment Act** lays down the permitted driving hours.

**Vehicle accidents**

Where an accident occurs and the product is exposed, spilled or in danger, **the driver is responsible and must take immediate action**. In all such cases the driver must contact the **local emergency services — fire brigade or police — as well as the owners of the vehicle and the load**.

**The driver must first take into consideration the safety of the public at large**, and may therefore have to take emergency action before the emergency services arrive:

- **Donning protective clothing**
- **Moving casualties away from further risk**
- **Keeping other people and vehicles away from the incident**
- **Moving the vehicle to a more remote area**

Note that these are actions the driver takes **with reference to the transport emergency card**, not from general instinct. Module 4 explains why the card's selection sentences — miscible or not with water, lighter or heavier than water — have to be completed for this to work.

**Any person involved in the movement or potential movement of hazardous cargo should keep abreast of the various regulations in place.** They change.`,
  },
  {
    title: "14. Lithium Batteries for the Forwarder",
    content: `**Absent from the source manual entirely, and now the commonest undeclared dangerous good a forwarder handles.**

**Why they matter at your desk specifically**

You are the point at which a consignment described as "electronics", "spare parts", "samples" or "power banks" either gets questioned or does not.

A lithium battery in **thermal runaway** produces its own oxygen. It cannot be smothered, and aircraft cargo hold suppression systems cannot stop it. In a ship's container stack it can propagate across a bay before anyone reaches it.

**The four UN entries**

| UN number | Description |
| --- | --- |
| UN3090 | Lithium **metal** batteries (shipped alone) |
| UN3091 | Lithium metal batteries **contained in** or **packed with** equipment |
| UN3480 | Lithium **ion** batteries (shipped alone) |
| UN3481 | Lithium ion batteries **contained in** or **packed with** equipment |

**Establish the configuration first.** *Contained in equipment*, *packed with equipment* and *shipped alone* determine the packing instruction, the quantity limit, and whether the shipment may move at all.

**By air**

**UN3480 and UN3090 — standalone lithium ion and lithium metal batteries — are forbidden as cargo on passenger aircraft.** Cargo aircraft only.

Lithium ion cells shipped alone must be at a **state of charge not exceeding 30%** of rated capacity.

Packages under the smaller-quantity provisions carry the **lithium battery mark**.

**Section II provisions**, which allowed reduced documentation for smaller consignments, have been **progressively tightened across successive editions**, with some removed. An arrangement used two years ago may no longer exist.

**By sea**

The IMDG Code carries its own lithium battery provisions, and the current amendment introduced changes including new entries for **sodium-ion batteries** and for **battery-powered vehicles**, which may no longer be declared under the generic UN 3171.

**Damaged, defective and recalled cells**

**Forbidden for transport** unless specifically approved. A battery that has swelled, been dropped, or shows any sign of damage does not move.

**What a forwarder actually does**

1. **Ask.** When a commodity description is vague and anything could be battery-powered, ask for the SDS and the UN entry before booking.
2. **Check the configuration** against the declaration — alone, with equipment, or in equipment.
3. **Check the mode is permitted** for that entry and routing.
4. **Check the carrier will take it.** Many will not, or will only on specific services.
5. **Check the package condition** on receipt.
6. **Refuse what does not add up.**

**What this module deliberately does not give you**

Watt-hour limits, lithium content limits, packing instruction numbers, quantity thresholds and Section II eligibility. **Those change with every edition.** Take every number from the edition in force.

**The commercial point**

Carriers and insurers have tightened lithium battery conditions materially. A forwarder who books undeclared battery cargo — even unknowingly — faces claim repudiation, carrier sanction, and in a serious case prosecution.

The cost of asking the question is a phone call.`,
  },
  {
    title: "15. Booking, Storage in Transit and the Limits of the Role",
    content: `**Booking dangerous goods**

**Dangerous goods may only be shipped with approval from the carrier prior to scheduling, and are subject to surcharges.**

**It is the shipper's responsibility to identify, declare and provide the necessary and correct documentation in advance.** Delays and costs due to improper identification, classification or incorrect or missing documentation are the shipper's responsibility.

**Before scheduling the shipment**, the shipper should complete a **Dangerous Goods Declaration** in the proper form to submit with the shipment to the carrier, requesting the necessary information from the manufacturer or seller.

**The hazardous cargo request**

When requesting a quotation for a sea shipment containing dangerous goods, in addition to the general cargo description, **always provide at least**:

- **UN number**
- **IMO class**
- **Flash point**
- **Packing group**

**Prepare a hazardous cargo request in advance and submit it with the import or export quote or booking request.** A booking made without these four items will come back for them, and the delay is yours.

**Who needs to be told**

Many parties are involved in the handling and control of dangerous goods shipments:

**Transporters · the port authority · customs · the police · shipping agents · cargo handlers**

**All of these rely on timeous information about the shipment, and each must be advised by the shipper or freight forwarder.**

That is the coordination function, and it is the part of the job nobody else can do. The carrier knows its own leg. You are the only party who sees the whole movement.

**Operational procedures for shippers and forwarders**

Dangerous goods procedures encompass: security; information for cargo booking and the shipper's declaration; the declaration itself and its legal context; the packing certificate; additional certification including weathering and exemption certificates, letters of indemnity and competent authority approval; appropriate packaging including UN packaging code requirements; marking and labelling; limited quantities; **segregation of multi-hazard loads**; shippers' declarations for cargo consolidators; mixed load procedures and consolidators' duties; cargo inspections; and **the consequences of not declaring dangerous goods**.

**Storage in transit**

An operator is responsible to **minimise any potential hazards resulting from the storage of dangerous goods consignments while in transit**.

**Complete a risk assessment on a regular basis** of all potential hazards associated with the stowage of dangerous goods in each potential location, with the aim of minimising the hazard. **The assessment should establish whether there are any foreseeable ways in which packages could become damaged** — through bad handling, for instance — or be affected by environmental conditions.

**The storage area should:**

- Be in a **secured area with adequate lighting**, present at all times
- Have **adequate ventilation**, away from direct sunlight and sources of heat
- Be **located away from major vehicle routes** to prevent damage by forklift trucks
- Be **located close to an exit** so consignments can be moved away in case of fire or leakage
- **Contain designated areas for the various classes or divisions** in accordance with the segregation table
- Have a **segregation chart posted nearby**
- **Limit the height at which packages are stored**

**The limits of this role**

This course teaches the forwarding and clearing agent's part in moving dangerous goods: arranging and evaluating documentation, verifying classification against the SDS, confirming packaging, selecting the mode, and organising storage.

**It does not qualify you to classify dangerous goods, to sign a dangerous goods declaration, or to act as the "qualified person" required under regulation 277.**

Classification is the consignor's duty, referred to an approved classification authority where there is doubt. The declaration is signed by the consignor — and for air, by the shipper alone, never by a forwarder, agent or packer. The qualified person is a nominated role requiring specific competence.

**What you are qualified to do, once trained, is the thing that actually prevents most incidents: check what you are given, and refuse what does not add up.**

A forwarder who queries a vague commodity description, insists on a declaration in the correct format, asks for the SDS before booking, and declines the consignment where the answers do not come, has done more for safety than any amount of downstream inspection.

**Keeping current**

Every instrument in this course has a version. The IMDG Code amends biennially. The IATA DGR is annual. SANS codes are revised. Regulations are amended by Gazette. Penalty levels change.

**Any person involved in the movement of hazardous cargo should keep abreast of the regulations in place.** A forwarder working from a three-year-old understanding will eventually book a consignment that is no longer compliant — with complete confidence.`,
  },
];

export const us242991Quiz = [
  {
    q: "What can a forwarding and clearing agent NOT do in relation to dangerous goods?",
    options: [
      "Arrange transport and book cargo",
      "Classify the goods and sign the dangerous goods declaration",
      "Verify documentation for completeness and consistency",
      "Refuse a consignment whose paperwork does not add up",
    ],
    answer: 1,
  },
  {
    q: "Under SANS 10231, how are marketing agents, sales agents and transport brokers regarded?",
    options: [
      "As independent third parties with no information obligations",
      "As assuming the role of their principals for the provision of all necessary information to the consignor",
      "As carriers for liability purposes",
      "As exempt from Chapter VIII requirements",
    ],
    answer: 1,
  },
  {
    q: "A clearing agent believes the only documents required are an SDS and a transport emergency card. Is this correct?",
    options: [
      "Yes, for road movements within South Africa",
      "No — the road transport authorities require the transport emergency card and the Dangerous Goods Declaration in the prescribed format, plus a container packing certificate where applicable",
      "Yes, provided the consignment is under the exempt quantity",
      "Yes, for imports but not exports",
    ],
    answer: 1,
  },
  {
    q: "Under regulation 277, who must nominate a \"qualified person\"?",
    options: [
      "The driver only",
      "The operator, consignor or consignee",
      "The classification authority",
      "The freight forwarder",
    ],
    answer: 1,
  },
  {
    q: "What is the primary documentary requirement for dangerous goods?",
    options: [
      "That the commercial invoice shows the correct value",
      "That the goods are properly described and classified, and a declaration made as to their nature, marking, labelling and packing",
      "That a bill of lading is issued in original form",
      "That the packing list matches the invoice",
    ],
    answer: 1,
  },
  {
    q: "How does delivery documentation — invoices, delivery notes, waybills — differ for dangerous goods?",
    options: [
      "It must be printed on red-bordered stationery",
      "There is no specific format; it is the same as for non-hazardous goods",
      "It must be countersigned by the qualified person",
      "It must be retained for 90 days",
    ],
    answer: 1,
  },
  {
    q: "Which means of transmitting dangerous goods information carries no legal effect on its own?",
    options: [
      "An annotation on a transport document",
      "A telephone call",
      "A dangerous goods declaration form",
      "An EDI transmission",
    ],
    answer: 1,
  },
  {
    q: "Which standard governs the content of the Dangerous Goods Declaration?",
    options: ["SANS 10228", "SANS 10229", "SANS 10232-1", "SANS 10233"],
    answer: 2,
  },
  {
    q: "Which parties' names and contact details must appear on the Dangerous Goods Declaration where applicable?",
    options: [
      "Consignor and consignee only",
      "Consignor, product manufacturer, product owner, product custodian, the party contracting the operator, the operator, and the consignee",
      "The carrier and the insurer",
      "The qualified person and the driver",
    ],
    answer: 1,
  },
  {
    q: "Who signs the declaration certifying that the vehicle is correctly placarded and that all necessary transport documentation is held?",
    options: ["The consignor", "The driver", "The consignee", "The qualified person"],
    answer: 1,
  },
  {
    q: "For how long must the consignor retain copies of the Dangerous Goods Declaration where no incident is reported?",
    options: ["30 days", "90 days", "6 months", "5 years"],
    answer: 1,
  },
  {
    q: "A chemical is supplied at two different concentrations. What follows?",
    options: [
      "The UN number is the same for both",
      "Substances at different purities or concentrations may receive different UN numbers, with different packing groups and requirements",
      "Only the packing group changes",
      "Concentration is irrelevant to classification",
    ],
    answer: 1,
  },
  {
    q: "Which dangerous goods consignment does not require a Shipper's Declaration for air transport?",
    options: [
      "Any limited quantity consignment",
      "Dry ice used for perishables which are not themselves dangerous goods",
      "Any Class 9 consignment",
      "Consignments under 30 kg gross",
    ],
    answer: 1,
  },
  {
    q: "Why must each dangerous goods substance have its own transport emergency card where the Emergency Response Guide differs?",
    options: [
      "To satisfy the insurer's documentation requirements",
      "Because the correct reaction to a spill depends on the nature of each individual substance or mixture",
      "Because the regulations require one card per package",
      "To allow the driver to claim per-substance allowances",
    ],
    answer: 1,
  },
  {
    q: "What is the advantage of a TREC over a CEFIC Tremcard in a South African emergency?",
    options: [
      "TRECs are cheaper to produce",
      "TREC uses the ERG system used by South African emergency services, whereas CEFIC used European Hazard Identification numbers not recognised in the South African standards",
      "TRECs may be photocopied",
      "TRECs do not require the product name",
    ],
    answer: 1,
  },
  {
    q: "Which of these is NOT a requirement for a compliant transport emergency card?",
    options: [
      "It must be in English",
      "It must be an original, not a photocopy",
      "It must be laminated and stored in the load compartment",
      "It must have red bands on its left and right margins",
    ],
    answer: 2,
  },
  {
    q: "Why must all selection sentences on the card be chosen — miscible or not with water, lighter or heavier than water?",
    options: [
      "To complete the form for audit purposes",
      "To help the people involved in an incident determine the correct response, including whether water may be used",
      "To identify the manufacturer",
      "To allocate the emergency action code",
    ],
    answer: 1,
  },
  {
    q: "A container packing certificate must certify which of the following?",
    options: [
      "That the container was fumigated before loading",
      "That the container was clean, dry and fit; incompatible goods were not packed together; packages were externally inspected; packages were properly stowed and secured; the container and packages were labelled and placarded; and drums were stowed upright",
      "That the goods were insured to full value",
      "That the container weight was verified by the terminal",
    ],
    answer: 1,
  },
  {
    q: "For which type of unit is a container packing certificate NOT required?",
    options: ["Reefer containers", "Flat racks", "Tank containers", "Open-top containers"],
    answer: 2,
  },
  {
    q: "Who is legally bound and responsible for documentation, segregation and proper securing when packing their own shipping containers?",
    options: [
      "The carrier",
      "Shippers and forwarders",
      "The terminal operator",
      "The classification authority",
    ],
    answer: 1,
  },
  {
    q: "What does the guidance say about choosing a consolidator on price alone?",
    options: [
      "Price is the primary consideration since standards are regulated",
      "The cheapest consolidator may not be the best performer, and a small sum saved by not securing cargo may lead to an expensive loss later",
      "Consolidators may not be inspected by shippers",
      "Price is irrelevant since all consolidators are certified",
    ],
    answer: 1,
  },
  {
    q: "When must a vehicle carry written confirmation of classified waste?",
    options: [
      "For any waste movement",
      "Where the waste contains material listed as a dangerous substance in SANS 10228 and the total quantity exceeds the exempt quantity",
      "Only for radioactive waste",
      "Only where the waste is exported",
    ],
    answer: 1,
  },
  {
    q: "Whose duty is it to carry out the correct classification and identification of dangerous goods?",
    options: ["The carrier", "The consignor or shipper", "The freight forwarder", "The consignee"],
    answer: 1,
  },
  {
    q: "Under regulation 279, what must happen if there is any doubt as to the appropriate classification?",
    options: [
      "The consignor makes a best estimate and notes it on the declaration",
      "The goods must be classified by an approved classification authority in accordance with SANS 10228",
      "The goods must be declared under a generic n.o.s. entry",
      "The carrier decides",
    ],
    answer: 1,
  },
  {
    q: "Under regulation 278, what must the consignor ensure about a multiload?",
    options: [
      "That it does not exceed the vehicle's gross mass",
      "That it is compatible as prescribed in Annex D to SANS 10232-1",
      "That it consists of a single class only",
      "That it is accompanied by a single declaration",
    ],
    answer: 1,
  },
  {
    q: "The Incoterm of the contract is CIF. Who is the consignor from the harbour to the point of destination?",
    options: [
      "The South African importer",
      "The overseas supplier",
      "The clearing agent",
      "The carrier",
    ],
    answer: 1,
  },
  {
    q: "The Incoterm is FOB. Who is the consignor from the harbour to the point of destination?",
    options: [
      "The overseas supplier",
      "The importer",
      "The shipping line",
      "Neither — no consignor exists for the inland leg",
    ],
    answer: 1,
  },
  {
    q: "Why is the theoretical answer on CIF consignor responsibility often unhelpful in practice?",
    options: [
      "Because CIF is not recognised in South African law",
      "Because the overseas supplier may not be familiar with the format of the South African declaration form, causing delays and potential fines",
      "Because CIF shipments are exempt from declaration requirements",
      "Because the Incoterm does not affect consignor status",
    ],
    answer: 1,
  },
  {
    q: "What is the recommended working position on who supplies the declaration and transport emergency card for the inland leg?",
    options: [
      "The carrier should produce them",
      "The importer, as consignee, should supply the clearing agent with the declaration form and the transport emergency card to avoid delays",
      "The clearing agent should produce them from the SDS",
      "The port authority issues them on arrival",
    ],
    answer: 1,
  },
  {
    q: "Under GHS, what replaced the Material Safety Data Sheet?",
    options: [
      "The Chemical Hazard Notice",
      "The Safety Data Sheet, in a prescribed 16-section format under SANS 10234",
      "The Product Information Sheet",
      "Nothing — MSDS remains the correct term",
    ],
    answer: 1,
  },
  {
    q: "Which SDS section is the forwarder's primary reference for declaring a consignment?",
    options: ["Section 2 — Hazards identification", "Section 9 — Physical and chemical properties", "Section 14 — Transport information", "Section 15 — Regulatory information"],
    answer: 2,
  },
  {
    q: "Under the OHS Act, what must a supplier of a hazardous chemical provide to the person receiving it?",
    options: [
      "A certificate of analysis, at cost",
      "A safety data sheet, free of charge, containing the prescribed information",
      "A transport emergency card",
      "A classification certificate from an approved authority",
    ],
    answer: 1,
  },
  {
    q: "Why is class information alone generally insufficient for a forwarder?",
    options: [
      "Because class numbers change between editions",
      "Because there are significant differences in the chemical and physical properties of individual products within a class",
      "Because class information is not shown on the declaration",
      "Because classes apply only to sea transport",
    ],
    answer: 1,
  },
  {
    q: "To which classes are packing groups NOT assigned?",
    options: [
      "Classes 3, 8 and 9",
      "Class 1 explosives, Class 2 gases, Division 6.2 infectious substances, and Class 7 radioactive material",
      "Classes 4 and 5 only",
      "Packing groups apply to all nine classes",
    ],
    answer: 1,
  },
  {
    q: "How are packing group designators written?",
    options: ["Arabic numerals — PG 2", "Roman numerals — PG II", "Letters — PG B", "Either form is acceptable"],
    answer: 1,
  },
  {
    q: "How does the packing group affect performance testing of a package?",
    options: [
      "It does not — all packages face the same tests",
      "It is one of the factors determining the test protocol; testing for a PG I product is considerably more stringent than for PG III",
      "It determines only the drop height",
      "It affects only the marking, not the testing",
    ],
    answer: 1,
  },
  {
    q: "Which standard governs packaging of dangerous goods for road and rail transportation in South Africa?",
    options: ["SANS 10228", "SANS 10229", "SANS 10231", "SANS 10232"],
    answer: 1,
  },
  {
    q: "What does a UN package \"design\" include?",
    options: [
      "The outer box dimensions only",
      "Construction method and materials, sealing mechanism and closure, dimensions and capacity, whether for liquids or solids, the certified inner packaging with its tested closure, inserts, absorbent and cushioning material, internal configuration, and the closing tape and manner of sealing",
      "The UN mark and the year of manufacture",
      "The packing instruction number",
    ],
    answer: 1,
  },
  {
    q: "A sample pack is submitted to the SABS for testing. What must it contain?",
    options: [
      "The actual dangerous goods, to give a realistic test",
      "Similar substances of a non-dangerous nature, with any danger labels overprinted \"Sample only\"",
      "Nothing — packs must be submitted empty and unmarked",
      "Water in all cases",
    ],
    answer: 1,
  },
  {
    q: "Why does air transport place dangerous goods at particularly high risk?",
    options: [
      "Because aircraft holds are unpressurised",
      "Because pressure reductions, temperature variations and vibrations can cause liquids to expand or cavitate, resulting in receptacles bursting",
      "Because flight times are longer than sea transit",
      "Because air cargo is handled more roughly",
    ],
    answer: 1,
  },
  {
    q: "What is required of friction-type lids on metal containers of paints and similar products?",
    options: [
      "They must be sealed with adhesive tape",
      "They must be fitted with retaining clips or other suitable locking devices",
      "They must be replaced with screw closures",
      "They must be inverted during transport",
    ],
    answer: 1,
  },
  {
    q: "What size and shape are the hazard labels required on packages?",
    options: ["75 mm square", "100 mm diamond-shaped", "150 mm rectangular", "250 mm diamond-shaped"],
    answer: 1,
  },
  {
    q: "Which instrument governs dangerous goods by road in South Africa?",
    options: [
      "ADR, as adopted into South African law",
      "The National Road Traffic Act 93 of 1996, Chapter VIII, incorporating the SANS codes",
      "The IMDG Code",
      "The Road Traffic Act 29 of 1989",
    ],
    answer: 1,
  },
  {
    q: "Which IMO classes will most ocean carriers approve without specialised equipment?",
    options: ["Classes 1, 2 and 7", "Classes 3, 8 and 9", "Classes 4, 5 and 6", "All classes equally"],
    answer: 1,
  },
  {
    q: "When requesting a sea freight quotation for dangerous goods, what minimum information must be provided beyond the general cargo description?",
    options: [
      "Value, weight, dimensions and destination",
      "UN number, IMO class, flash point and packing group",
      "Proper shipping name and consignee details",
      "Container type and preferred sailing",
    ],
    answer: 1,
  },
  {
    q: "Regulation 274 applies the dangerous goods provisions to which vehicles?",
    options: [
      "Only vehicles registered in the Republic while within its borders",
      "All vehicles registered in the Republic wherever they may be, and all other vehicles whenever they are within the Republic",
      "Only vehicles exceeding 3,500 kg GVM",
      "Only commercial vehicles operated for reward",
    ],
    answer: 1,
  },
  {
    q: "Under regulation 280, driver training applies to vehicles carrying dangerous goods above what gross vehicle mass?",
    options: ["1,500 kg", "3,500 kg", "7,500 kg", "16,000 kg"],
    answer: 1,
  },
  {
    q: "Which of these must the driver produce on demand?",
    options: [
      "The commercial invoice and packing list",
      "A professional driving permit where applicable, a document clearly indicating the planned route, and the transport emergency cards and manifests",
      "The consignor's classification certificate",
      "The SDS for each substance",
    ],
    answer: 1,
  },
  {
    q: "A dangerous goods inspector wishes to open dangerous goods packages. What conditions must be met?",
    options: [
      "None — the inspector's powers are unconditional",
      "The operator must have been duly notified, the local authority must have authorised it, and a qualified person must supervise",
      "The consignor must be present",
      "A court order must be obtained",
    ],
    answer: 1,
  },
  {
    q: "The regulations apply during which period?",
    options: [
      "Only while the vehicle is in motion on a public road",
      "The entire period during which the goods are being transported, including loading of the vehicle and the purging and cleaning of equipment",
      "From departure until arrival at the consignee",
      "Only while the vehicle is placarded",
    ],
    answer: 1,
  },
  {
    q: "What must a vehicle carrying a dangerous substance display?",
    options: [
      "The operator's licence number and the consignee's details",
      "The substance identification number, the appropriate hazard warning label, the emergency action code, and the telephone number for all-hours specialist advice",
      "The UN number and gross mass only",
      "The route plan and the driver's permit number",
    ],
    answer: 1,
  },
  {
    q: "When a vehicle carrying explosives must halt during a journey, what distances apply?",
    options: [
      "100 metres from buildings and 50 metres from a public road",
      "At least 500 metres from inhabited buildings and 200 metres from a public road, with a constant watch kept",
      "1 kilometre from any structure",
      "No specific distances are prescribed",
    ],
    answer: 1,
  },
  {
    q: "Following a road accident where product is exposed or spilled, who must the driver contact?",
    options: [
      "The consignee only",
      "The local emergency services — fire brigade or police — as well as the owners of the vehicle and the load",
      "The classification authority",
      "The port authority",
    ],
    answer: 1,
  },
  {
    q: "Which lithium battery entries are forbidden as cargo on passenger aircraft when shipped alone?",
    options: ["UN3091 and UN3481", "UN3480 and UN3090", "All four entries", "None"],
    answer: 1,
  },
  {
    q: "What is the position on damaged, defective or recalled lithium batteries?",
    options: [
      "Acceptable with double packaging",
      "Forbidden for transport unless specifically approved",
      "Acceptable by sea but not by air",
      "Acceptable at reduced state of charge",
    ],
    answer: 1,
  },
  {
    q: "A consignment is described as \"electronics\" by a shipper you do not know. What is the appropriate forwarder response?",
    options: [
      "Book it as general cargo — the description is the shipper's responsibility",
      "Ask for the safety data sheet and the UN entry before booking",
      "Book it and note the uncertainty on the file",
      "Refuse all consignments from unknown shippers",
    ],
    answer: 1,
  },
  {
    q: "Which parties must be advised of a dangerous goods shipment by the shipper or freight forwarder?",
    options: [
      "The carrier only",
      "Transporters, the port authority, customs, the police, shipping agents and cargo handlers",
      "The consignee and the insurer",
      "The classification authority and the SABS",
    ],
    answer: 1,
  },
  {
    q: "Where should a dangerous goods storage area in transit be located relative to an exit?",
    options: [
      "As far from the exit as possible, to limit access",
      "Close to an exit, so consignments may be moved away in case of fire or leakage",
      "Adjacent to the main vehicle route for ease of handling",
      "Location relative to exits is not specified",
    ],
    answer: 1,
  },
  {
    q: "Which of these is a requirement for a dangerous goods storage area in transit?",
    options: [
      "Storage at maximum height to save floor area",
      "Designated areas for the various classes in accordance with the segregation table, with a segregation chart posted nearby",
      "Storage in direct sunlight to aid inspection",
      "Location adjacent to major vehicle routes for accessibility",
    ],
    answer: 1,
  },
  {
    q: "Does completing this course qualify a learner to sign a dangerous goods declaration?",
    options: [
      "Yes, on successful completion",
      "No — the declaration is signed by the consignor, and for air by the shipper alone; a forwarder, agent or packer may never sign it",
      "Yes, for road movements within South Africa",
      "Yes, provided a qualified person countersigns",
    ],
    answer: 1,
  },
  {
    q: "What is described as the most valuable thing a trained forwarder does for dangerous goods safety?",
    options: [
      "Classifying goods accurately on the client's behalf",
      "Checking what they are given and refusing what does not add up",
      "Negotiating lower dangerous goods surcharges",
      "Producing the transport emergency card",
    ],
    answer: 1,
  },
];

export const us242991Practical = {
  title: "Assemble and Verify a Dangerous Goods File",
  description: `Four assessed exercises following one consignment through the forwarding and clearing process. None involves handling live dangerous goods, and the brief says so.

**Part 1 — Establish who the consignor is.** Learners receive three import scenarios with different Incoterms — CIF, FOB and EXW — and must determine for each who holds consignor duties on the inland leg, who is therefore responsible for the declaration and transport emergency card, and what they would tell the client at booking stage to avoid a delay at the port.

**Part 2 — Verify the file.** Given a set of documents — a supplier's declaration, a safety data sheet, a bill of lading and packing list — learners must identify every deficiency: declaration not in the prescribed format, missing party details, missing technical names on an n.o.s. entry, UN number inconsistent with the proper shipping name, packing group assigned to a class that does not use them, SDS section 14 disagreeing with the declaration, and a missing container packing certificate.

**Part 3 — Read the SDS and build the register entry.** Learners extract from a safety data sheet the UN number, proper shipping name, class and subsidiary risk, packing group, exempt quantity and compatibility restrictions, and produce the register entry described in Module 2. They then state what the section 10 incompatibilities mean for multiload compatibility under regulation 278.

**Part 4 — Book it.** Learners prepare a hazardous cargo request for a sea shipment with the four minimum items, identify which parties must be advised, state what carrier approval is required, and identify a scenario in which the consignment should be refused rather than booked.

Assessed on: correct identification of the consignor under each Incoterm; completeness of the document check; whether the learner refers doubtful classifications to an approved classification authority rather than guessing; and whether the refusal scenario is correctly identified.

**Learners must work from current editions of the SANS codes and the modal instruments.** Any answer taken from a figure quoted in the course notes rather than looked up is marked down.`,
};

export const us242991Outcomes = [
  "Explain the forwarding and clearing agent's role and liability in the dangerous goods chain",
  "Distinguish dangerous goods documentation from ordinary transport documentation and explain why it differs",
  "Apply the content requirements of the Dangerous Goods Declaration under SANS 10232-1",
  "Apply the requirements for the transport emergency card, including the TREC under SANS 10232-4",
  "Apply the container packing certificate requirements and waste classification confirmation",
  "Identify the duties of the consignor and consignee under the National Road Traffic Act regulations",
  "Determine who holds consignor duties on an inland leg from the Incoterm of the contract",
  "Read and apply a 16-section Safety Data Sheet, and distinguish it from the superseded MSDS format",
  "Verify the identification and classification of dangerous goods against SANS 10228",
  "Confirm packaging suitability against SANS 10229 and the UN approval requirements",
  "Select the appropriate modal instrument and identify carrier and booking constraints",
  "Apply Chapter VIII of the National Road Traffic Act 93 of 1996 and the incorporated SANS codes",
  "Apply operational requirements for road movements, including routing, driver duties and inspector powers",
  "Identify the specific requirements applying to lithium batteries across modes",
  "Organise storage of dangerous goods in transit and arrange bookings within industry time limits",
];

export const us242991Summary =
  "The forwarding and clearing agent's role in moving dangerous goods. Documentation requirements and how they differ from ordinary transport documents, the Dangerous Goods Declaration under SANS 10232-1, the TREC, the container packing certificate, consignor and consignee duties, determining who is the consignor from the Incoterm, reading the 16-section Safety Data Sheet that replaced the MSDS, verifying classification against SANS 10228, packaging and UN approval under SANS 10229, modal selection and carrier constraints, Chapter VIII of the National Road Traffic Act, lithium batteries, and storage in transit. This course does not qualify a learner to classify dangerous goods or sign a declaration — see Module 15.";

export const us242991 = {
  code: "US-242991",
  title: "Facilitate the Forwarding & Clearing of Dangerous Goods for Transportation",
  summary: us242991Summary,
  outcomes: us242991Outcomes,
  modules: us242991Modules,
  quiz: us242991Quiz,
  practical: us242991Practical,
  passMark: 70, // 43 of 61
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Dangerous Goods Declaration template per SANS 10232-1, with both declarations
 *   2. Container packing certificate template, and the combined-with-DGD wording
 *   3. Consignor / consignee responsibility matrix by Incoterm
 *   4. Document verification checklist — what to check on an inbound DG file
 *   5. SDS 16-section navigation card, with section 14 highlighted for forwarders
 *   6. Dangerous goods register template — UN number, technical name, classification,
 *      exempt quantity, compatibility restrictions
 *   7. Hazardous cargo request template — the four minimum items plus routing
 *   8. Lithium battery booking decision tree, with a "check current edition" banner
 *
 * Items 3, 4 and 7 carry the most weight — they are what a clearing agent uses daily.
 *
 * ── DO NOT PRINT PENALTY AMOUNTS OR QUANTITY LIMITS ───────────────────────
 * Fine levels, exempt quantities and lithium battery thresholds all change.
 * Materials must direct the learner to the instrument in force.
 *
 * ── SCOPE STATEMENT — DO NOT REMOVE ───────────────────────────────────────
 * This course does not qualify anyone to classify dangerous goods, sign a
 * dangerous goods declaration, or act as the "qualified person" under
 * regulation 277. Module 15 states this. Do not market it as DG certification.
 *
 * ── CORRECTIONS TO THE SOURCE MANUAL ──────────────────────────────────────
 *   1. MSDS → SDS, 16-section GHS format under SANS 10234. The manual cites
 *      ISO 11014 and ANSI Z400.1-1993 as the content standard.
 *   2. Hazardous Chemical Agents Regulations replaced the Hazardous Chemical
 *      Substances Regulations 1995.
 *   3. SABS 0228/0229/0231/0232/0233 renumbered to SANS 10228/10229/10231/
 *      10232/10233. The manual uses both forms inconsistently.
 *   4. CEFIC Tremcards discontinued; ADR moved to Instructions in Writing;
 *      SANS 10232-4 TREC is the South African instrument.
 *   5. Lithium batteries — absent. Now Module 14.
 *   6. Road Traffic Act 29 of 1989 superseded by the NRTA 93 of 1996.
 *   7. The ADG Code (Australian) cited for hazard and packing group
 *      information — wrong jurisdiction; SANS 10228 applies.
 *   8. "C&F" replaced by CFR in Incoterms 1990; Incoterms 2020 is current.
 *   9. Penalty figures are of their era — verify current levels.
 *  10. UN number range now extends beyond UN3550, not "about UN3500".
 *  11. Driver training described as required "after a date to be determined by
 *      the Minister" — that date has passed.
 *
 * The manual's PDF metadata carries the title "Clean and Store Glassware".
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *   - Current editions of SANS 10228, 10229, 10230, 10231, 10232 (all parts), 10233
 *   - NRTA Chapter VIII regulation numbering and any amendments by Gazette
 *   - Hazardous Chemical Agents Regulations
 *   - Current IMDG amendment and IATA DGR edition
 *   - Lithium battery provisions across modes
 *   - Penalty levels and DGD retention periods
 *   - Incoterms edition taught (2020)
 */
