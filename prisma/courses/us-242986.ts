/**
 * US-242986 — Accept & Process Dangerous Goods for Transportation by Air
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 242986 · elective
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * ── CRITICAL SCOPE STATEMENT ──────────────────────────────────────────────
 *
 * This course teaches the framework for accepting and processing dangerous
 * goods for air transport. It does NOT qualify anyone to perform acceptance,
 * complete an acceptance check, sign a NOTOC, or offer dangerous goods for
 * carriage.
 *
 * Acceptance is a function requiring current, formally assessed dangerous
 * goods training under ICAO Annex 18 and the Technical Instructions, approved
 * by the State of the Operator. An acceptance check performed by an untrained
 * person is the last defence failing, and aircraft have been lost that way.
 *
 * Module 16 states this to the learner. It must not be removed or softened,
 * and the course must not be marketed as DG certification.
 *
 * ── SOURCE AND CORRECTIONS ────────────────────────────────────────────────
 *
 * Built from the learner manual for US 242986 (release 01/07/2009,
 * registration ended 30/06/2012). The regulatory architecture, shipper and
 * operator responsibilities, forbidden goods, hidden dangerous goods,
 * excepted and limited quantities, variations, classification, documentation
 * and the acceptance process are taught as the manual sets them out.
 *
 * Corrected or added:
 *
 *   1. LITHIUM BATTERIES — absent from the manual entirely. They are now the
 *      most significant dangerous goods issue in air transport and the item an
 *      acceptance check most often has to catch. Module 14.
 *   2. CLASS 4 — the manual states "This class has no divisions. It comprises
 *      liquids, mixtures of liquids..." That text is copied from Class 3 and is
 *      wrong twice: Class 4 has three divisions and covers solids. The manual
 *      then contradicts itself by listing 4.1, 4.2 and 4.3 immediately below.
 *   3. TRAINING — the manual predates competency-based training and assessment
 *      (CBTA), which has replaced the category-based model.
 *   4. DOCUMENT RETENTION — the manual cites "Chapter 384 Subsidiary
 *      Legislation", which is Hong Kong law, not South African. Retention in
 *      South Africa runs through the Civil Aviation Regulations and SA-CATS-DG.
 *   5. ANNEX REFERENCE — the manual says "Chapter of Annex 8 deals with
 *      Operator Responsibility". Operator responsibilities are in Annex 18.
 *   6. MSDS → SDS — GHS replaced the Material Safety Data Sheet with the
 *      16-section Safety Data Sheet.
 *   7. e-AWB AND e-DGD — the manual describes two paper copies stapled to the
 *      back of the air waybill. Electronic air waybills and electronic
 *      dangerous goods declarations are now widely used.
 *   8. EDITIONS — IATA DGR is annual (67th edition for 2026); ICAO TI biennial.
 *   9. "PROVISIONS WHICH WILL BECOME MANDATORY AFTER 2013" — the remote and
 *      self-service check-in acknowledgement requirements the manual describes
 *      as forthcoming are long since in force.
 *
 * The manual's PDF metadata carries a different unit standard's title
 * (US242983), as with others in this series.
 */

export const us242986Modules = [
  {
    title: "1. Dangerous Goods and the Philosophy of Carriage",
    content: `Dangerous goods are substances or articles which pose a risk to health, safety or property when transported by air, and which are classified according to the criteria in the ICAO Technical Instructions or the IATA Dangerous Goods Regulations.

They may be solids, liquids, gases or articles. The hazards include toxic, poisonous, radioactive, explosive, flammable, corrosive, oxidising, asphyxiating, biohazardous, pathogenic and allergenic materials, and physical conditions such as compressed gases and hot materials.

**Classification is by immediate hazard in transport**, not long-term health effect.

**The underlying philosophy**

In the early 1950s demand grew for moving hazardous materials by air. Experience from other transport modes had shown that, handled correctly, it could be done without undue risk **so long as the goods were suitably packaged and in limited quantities**. Combined with the aviation industry's knowledge of what an aircraft does to cargo — pressure change, temperature swing, vibration, acceleration — that produced the first industry regulations.

That is the whole philosophy, and it is worth stating plainly because everything else follows from it:

**Dangerous goods can be carried safely by air if, and only if, they are correctly classified, correctly packed, correctly marked and labelled, correctly documented, quantity-limited to the aircraft type, and loaded and segregated properly.**

Remove any one of those and the system does not work. The acceptance check exists to verify all six before the consignment boards.

**Why air is different**

A ship's crew can fight a fire for hours and reach a port of refuge. An aircraft cannot. A cargo hold fire at 35,000 feet gives the crew a very short window, and the suppression systems fitted are effective against some fires and not others.

That is why air dangerous goods rules are stricter than sea, why substances acceptable under the IMDG Code may be forbidden by air, and why quantity limits per package are so much smaller.

**Cargo, not baggage — mostly**

Dangerous goods are prohibited in passenger baggage, with limited exceptions. But hazardous substances in baggage can pose a **greater** threat than cargo, precisely because they reach the aircraft unnoticed.

The travelling public cannot be expected to know the characteristics of air transport, or the dangers in articles they carry. Every member of staff is therefore responsible for vigilance, and the operator carries final responsibility for informing passengers.

**The commercial frame**

Dangerous goods may only be shipped with prior approval from the carrier, and only before pre-booking. Shipments may attract surcharges and usually need more transit time.

**Delays and costs arising from improper identification, classification or documentation fall on the shipper.** And the carrier reserves the right to reject any shipment containing known or suspected dangerous goods.

**Regional note.** In the United States dangerous goods are called *hazardous materials* or **HAZMAT**. The terms are interchangeable; the regulations are not, and US variations are among the most consequential in the system.`,
  },
  {
    title: "2. The Regulatory Architecture",
    content: `Four layers, each sitting on the one below.

**1. The UN Model Regulations — the "Orange Book"**

The United Nations Economic and Social Council has a Sub-Committee of Experts on the Transport of Dangerous Goods and on the Globally Harmonised System. It maintains the **UN Recommendations on the Transport of Dangerous Goods, Model Regulations**, published as the Orange Book.

The list at its core runs to more than 3,000 entries, each assigned a **UN number** as a universal index.

The Model Regulations cover classification and definitions, listing, packing requirements including construction, testing and approval of packagings, marking, labelling, loading, documentation, stowage, segregation, emergency response, training and supervision.

They are **neither obligatory nor legally binding** on individual countries, but have gained wide international acceptance and form the basis of the modal instruments and many national laws.

**They cover transport only — not manufacture, use or disposal.**

**2. The Chicago Convention and Annex 18**

The International Civil Aviation Organization regulates the technical aspects of international civil aviation. Its most important legislative function is the formulation and adoption of **Standards and Recommended Practices (SARPs)**, incorporated into the technical annexes to the Convention on International Civil Aviation.

**Annex 18 — "The Safe Transport of Dangerous Goods by Air"** — sets down broad principles. One of its Standards requires that dangerous goods be carried in accordance with the **Technical Instructions**. States are required by Annex 18 to have inspection and enforcement procedures.

**Annex 17** deals with aviation security, and is relevant here: it aims to prevent explosives and incendiary devices being placed on board through concealment in otherwise legitimate shipments or through access via cargo handling areas. Cargo for carriage on passenger flights must be subjected to appropriate security control. Operators must not accept cargo on passenger flights unless security has been accounted for by a **regulated agent** — an agent, freight forwarder or other entity providing security controls accepted or required by the appropriate authority — or unless it is subjected to other security controls.

**3. The ICAO Technical Instructions**

The legal document. Biennial. It provides classification, the Dangerous Goods List, packing methods and quantity limits by aircraft type, packaging specifications and testing, marking and labelling requirements, documentation, acceptance, loading, and training.

The List identifies goods which are:

- **forbidden under any circumstances**
- **forbidden on both passenger and cargo aircraft normally**, but carriable in exceptional circumstances subject to exemption by the States concerned
- **forbidden on passenger aircraft but permitted on cargo aircraft**
- **permitted on both**

**4. The IATA Dangerous Goods Regulations**

The industry manual, reissued **annually** — the 67th edition applies for 2026. Based on Annex 18 and the Technical Instructions, and containing the same Dangerous Goods List.

It adds airline-industry material ICAO does not cover: how to complete the **Shipper's Declaration** and the accompanying **air waybill**, which are commercial documents outside ICAO's jurisdiction.

**IATA DGR applies to IATA member airlines, associate members and interline partners. Unless operating as such, the ICAO TI is the document to comply with.**

**The structural difference on variations:** ICAO recognises **State** variations. IATA recognises **State and Operator** variations.

**Quantity per package, not per aircraft**

A point the Technical Instructions make that surprises people: they restrict the quantity **per package** according to the degree of hazard and the aircraft type. **There is generally no restriction on the number of packages per aircraft.**`,
  },
  {
    title: "3. Training, Competence and CBTA",
    content: `**The requirement**

The Technical Instructions contain training requirements applying to **everyone involved in consigning, handling and carrying dangerous goods, cargo and passenger baggage**.

**Shippers** must ensure staff preparing consignments receive training, or that another organisation with trained staff is used.

**Operators** must ensure their own staff and those of their handling agents are trained. **Operator training programmes are subject to approval by the State of the Operator.**

**Recurrent training at 24-month intervals**, with training records kept.

**Why different roles need different training**

Operators include airlines, cargo terminal operators and ramp handling operators. Airline staff need different training from cargo terminal operators, who in turn need different training from ramp handling staff.

And under ICAO's requirement addressing hidden dangerous goods, **staff of freight forwarders must receive dangerous goods training commensurate with their functions — whether or not they are involved in the direct processing of dangerous goods.**

That last point is often missed. A counter clerk who never touches a Shipper's Declaration still needs training, because they are the person who might notice that "machine parts" from a new customer are unusually heavy and suspiciously well sealed.

**What has changed: CBTA**

The industry has moved from a **category-based** model — where your job title determined which training package you received — to **competency-based training and assessment**.

Under CBTA, training is built around the **competencies a person actually needs for the functions they perform**, and is assessed against them. The emphasis shifts from attendance to demonstrated capability.

For an acceptance role that is a meaningful change: the assessment is whether you can actually work an acceptance check correctly, not whether you sat in the room.

Confirm the current requirement with SACAA and with the training provider before relying on any certificate.

**ICAO's own programme**

ICAO has developed a dangerous goods training programme consisting of a revised **Dangerous Goods Training Manual** and training courses, assisting States in complying with Annex 18 and the Technical Instructions. It is directed towards safety inspectors but benefits anyone needing knowledge of the detailed provisions. Individuals completing a course receive a certificate directly from ICAO.

**Why continuous training matters**

The regulations change every year. Quantity limits move, packing instructions are revised, lithium battery provisions tighten, new UN entries appear and old ones are restricted.

An acceptance agent working from what they learned three years ago will pass consignments that are no longer compliant, and reject consignments that now are. Both are failures, and the first is the dangerous one.`,
  },
  {
    title: "4. Accident and Incident Reporting",
    content: `**Why it matters**

States are required to have procedures in place to investigate dangerous goods occurrences. Reporting is what makes that possible, and what surfaces the patterns — a shipper who repeatedly mis-declares, a commodity that keeps arriving undeclared, a packaging that keeps failing.

**The immediate report**

In the event of an accidental release or imminent accidental release, the person who has possession of the dangerous goods at the time must make an **immediate report** — also called the initial report.

For air transport, a person in possession when a **dangerous goods accident** or **dangerous goods incident**, as defined in the ICAO Technical Instructions, occurs on board an aircraft, at an airport or at an air cargo facility must immediately report it to the appropriate authorities, including the nearest Regional Civil Aviation Authorities, the Department of Transport, the carrier and the airport operator.

**South African Civil Aviation Regulations**

**Part 92.00.22 — accident and incident reporting.** The operator of an aircraft involved in a dangerous goods accident or incident within the Republic shall, **within 48 hours**, notify — in the case of an accident, any air traffic service unit or the nearest police station; in the case of an incident, any air traffic service unit. That unit or station must then immediately notify the Commissioner, and where it occurred at an aerodrome, the aerodrome manager.

The operator of a South African aircraft involved in such an accident or incident **outside** the Republic shall, as soon as practicable, notify the appropriate authority in the State where it occurred, and the Commissioner.

**Notification of undeclared or misdeclared dangerous goods.** The operator of an aircraft in which dangerous goods are conveyed within the Republic shall, **within 48 hours** after discovery of any undeclared or misdeclared dangerous goods, or dangerous goods not permitted, on board or in the baggage of a passenger or crew member, notify the Commissioner or the appropriate authority.

Particulars are prescribed in **SA-CATS-DG**. Confirm current regulation numbering and timeframes against the Civil Aviation Regulations in force.

**The written follow-up report**

Made by the employer of the person who had possession, or by the person if self-employed, **in writing, within 21 days**. It must include:

- name and business address of the person providing the information, and a contact telephone number
- date, time and location
- name and business address of the consignor
- classification of the dangerous goods
- estimated quantity released, and the total quantity in the means of containment before the release
- description of the means of containment based on identification markings, and of the failure or damage including how it occurred
- for a cylinder that suffered catastrophic failure, the certification safety marks and a description of the failure
- number of deaths and injuries
- an estimate of people evacuated from private residences, public areas or public buildings
- if an emergency response assistance plan was activated, the name of the person who responded

**In the event of an aircraft accident**

The Technical Instructions require that operators must, **as soon as possible**, inform the State in which the accident occurred of what dangerous goods were on board and where they were located.

This is why the NOTOC and the loading records matter. Somebody will be reading them out under pressure.

**What is reportable**

Explosives containers falling from a vehicle in transit · a bulk container of dangerous goods subjected to impact through roll-over or collision · unexpected fire or explosion involving or impinging on dangerous goods containers or storage · emissions exceeding minimum reporting parameters · packages of security risk substances found roadside with undetermined origin · stock-take discrepancies in explosives or security risk substances · a security breach such as theft · explosives left unattended · premature explosion of a charge · malfunction of safety-critical equipment with potential for a major incident · failure of refrigeration for ammonia or LNG storage · failure of inert blanket systems · temperature sensor failure in exothermic processes · **near misses at major hazard facilities**, since these indicate a safety management system failure.

**What is not normally reportable**

Small numbers of non-explosive dangerous goods packages found roadside with undetermined origin · escapes expected during normal operations, maintenance or transfers · boxes of explosives falling from a forklift with minor damage, no leakage and no injury or off-site effect · misfires not arising from product malfunction · traffic incidents where containers, fittings and goods remain intact and un-impacted · packages falling from a forklift with damage and minor leakage below reportable thresholds, with no injury, property damage or off-site effect.`,
  },
  {
    title: "5. The Shipper's Responsibilities",
    content: `Any person or company involved in the movement of dangerous goods is responsible for complying with the regulations. **The shipper has the greatest responsibility.**

**Before offering dangerous goods as air cargo, the shipper shall ensure that transport by air is not forbidden.**

**The responsibilities**

- **Limit all packages** to the materials and quantities authorised for air transport under the DGR
- **Ensure each shipment requiring a Shipper's Declaration** is accompanied by properly executed declaration documents conforming to the regulations
- **Certify**, before tendering, that the contents are fully and accurately described on the shipping papers by proper shipping name; are not prohibited for transport by air; and are properly classified, packaged, marked, labelled and in proper condition for carriage
- **Declare that all applicable air transport requirements have been met**, regardless of routing or the transport mode by which the shipment travels

**Who may sign the Shipper's Declaration**

This is the point of the module, and it is absolute.

**The Shipper's Declaration must be completed and signed by the shipper. Neither the agent, nor the forwarder, nor the packer is permitted to complete it, and they may not sign it under any circumstances.**

The declaration is a statement of fact about goods only the shipper can know. A forwarder who completes one on a client's behalf — even helpfully, even accurately — has committed an offence and assumed a liability they cannot discharge.

Where the declaration is in paper form, the original and duplicate are attached to the air waybill and both are signed by the shipper. **Electronic dangerous goods declarations are now widely used**, and the signature requirement is satisfied electronically. Who may make the declaration is unchanged.

**The Proper Shipping Name**

The PSN must be used on the documentation and the labelling. It is the name appearing in the DGR **in capital letters only**; any text in lower case is descriptive and is not part of the PSN. **Trade names are not acceptable.**

Generic entries marked with asterisks must be modified by adding the **technical names** of the hazardous constituents in brackets, and those modifications must appear on package markings and shipping papers.

**The legal position**

**It is a violation of law to tender cargo containing dangerous goods that have not been properly declared, identified, packaged, marked, labelled or documented.**

**Failure to properly identify a dangerous goods shipment can result in penalties or imprisonment.**

Prosecutions happen, and the person who signed is the person prosecuted.

**What an acceptance agent does with this**

You cannot classify on the shipper's behalf, complete their declaration, or sign it. What you do is **check what you are given**, and refuse what does not add up.

That is not obstruction. It is the function.`,
  },
  {
    title: "6. The Operator's Responsibilities",
    content: `**Operators include airlines, cargo terminal operators and ramp handling operators**, and each needs training appropriate to its role.

**The operator's obligations, from Annex 18 and the Technical Instructions**

Acceptance · storage · loading · inspection · provision of information · emergency response · retention of records · training.

**The operational checklist**

- Complete a dangerous goods **acceptance checklist**
- Check and verify the information on the Shipper's Declaration and the air waybill complies with the DGR
- Check each **outer packaging** is in good condition
- Verify the **general packing requirements** and the **specific packing instruction** have been followed
- Check all required **marking and labelling** has been properly applied to each package
- Check whether the shipment needs any **additional handling**
- Check and verify all **State and Operator variations** are applied
- Check the **flight booking** for specific dangerous goods, such as Cargo Aircraft Only
- Check whether **special documents** are attached where required
- **Identify hidden dangerous goods** in export shipments
- **Prepare and sign the NOTOC** for all dangerous goods
- Send **pre-advice** to destination for special handling information
- Observe **incompatibility and segregation** requirements
- **Store** dangerous goods per DGR requirements
- **Secure** dangerous goods to prevent movement in transport that would change package orientation
- **Stow** inside the aircraft per DGR and carrier requirements
- **Retain and file** all related documents

**The South African Civil Aviation Authority**

SACAA is an agency of the Department of Transport, established on 1 October 1998 under the **South African Civil Aviation Authority Act 40 of 1998**. Its mandate: regulating the civil aviation industry to ensure security and safety by complying with ICAO and taking the local context into account.

The Act provided for a stand-alone authority charged with promoting, regulating and enforcing civil aviation safety and security.

**SACAA's areas of oversight** include airports, airworthiness, certification, personnel, operations, airspace, accident and incident investigation, flight inspection and information services. Within each, the key responsibilities are to **set, monitor and enforce standards** and to promote safety.

South Africa was elected to the ICAO Council in 2003, and SACAA has taken a leading role in harmonising aviation regulations across SADC.

**Where the operator's responsibility bites hardest**

Three obligations carry the most weight in day-to-day acceptance work:

**Inspection for damage or leakage**, covered in Module 16. A leaking package must not be loaded, and if discovered after loading must be removed.

**Separation and segregation**, so that packages which might react dangerously are not stowed next to each other or where interaction could occur on leakage.

**Notification to the captain**, so that in an emergency the commander can tell air traffic services what is on board and where.

Each of those is a link in a chain that ends with a crew deciding what to do about a hold fire. None of them is paperwork.`,
  },
  {
    title: "7. Forbidden Goods and Exemptions",
    content: `**The six categories of dangerous goods by limitation**

- **Totally forbidden**
- **Forbidden unless exempted** — the national authority of the origin country may grant permission depending on the shipment
- **Carried on passenger or cargo aircraft**
- **Carried on cargo aircraft only (CAO)**
- **Excepted quantities**
- **Treated as non-dangerous goods** — items not falling under the nine classes

**Forbidden in aircraft under any circumstances**

- Explosives which **ignite or decompose when subjected to 75 °C (167 °F) for 48 hours**
- Explosives containing both **chlorates and ammonium salts**
- Explosives containing mixtures of **chlorates with phosphorus**
- **Solid explosives described as extremely sensitive to mechanical shock**
- **Liquid explosives described as moderately sensitive to mechanical shock**
- Any article or substance which, as presented for transport, is **liable to produce a dangerous evolution of heat or gas** under conditions normally encountered in air transport
- **Flammable solids and organic peroxides** having, as tested, explosive properties and packed such that the classification procedure would require an explosives label as a subsidiary risk label

**Forbidden unless exempted**

Chapter 4 of Annex 18 covers limitations on transport. Forbidden on aircraft unless exempted by the States concerned, or unless the Technical Instructions indicate transport under an approval issued by the State of Origin:

**(a)** articles and substances identified in the Technical Instructions as forbidden for transport in normal circumstances
**(b)** **infected live animals**

An exemption requires the agreement of the **State of Origin, the State of Destination, and all States to be overflown**. That is a formal documented process, not a commercial conversation with the airline.

**Incompatibility**

Incompatible goods must be segregated during storage and transport. Two substances or articles are **mutually incompatible when stowing them together may result in undue hazards in the case of leakage, spillage or any other accident**.

The extent of the hazard varies, and so do the segregation arrangements required. Segregation may be obtained by requiring certain distances, and intervening spaces may be filled with cargo compatible with the goods in question.

**Radioactive materials (Class 7) and explosives (Class 1) should be deemed incompatible with all other dangerous goods.**

**Two or more goods are compatible provided their interaction does not:**

- harm persons, property or the environment
- cause fire or explosion, or generate toxic, flammable or corrosive vapours or gases
- accelerate the combustion of other goods in the event of fire
- result in premature degradation or corrosion of other dangerous goods' packaging
- in a fire, spill or release, prove incompatible with the firefighting or dispersal media

**Specific incompatibilities to know**

- **Class 4.3** must not be stored next to goods in aqueous solution, or where water or foam is the chosen firefighting medium
- **Ammonium nitrate** is not compatible with tetranitromethane, dichloroisocyanuric acid, any bromate, chlorate, chlorite, hypochlorite or chloroisocyanurate, or any inorganic nitrate
- **Calcium hypochlorite** and its mixtures are incompatible with dichloroisocyanuric acid, ammonium nitrate, or any chloroisocyanurate
- **Concentrated strong acid and concentrated strong alkali** are incompatible
- **Toxic gases ammonia and chlorine** must be segregated — risk of explosion. Each different toxic gas should be segregated unless the safety data sheet says otherwise
- **Organic peroxides** are highly reactive — check the SDS

**Note the general rule and its limit.** Materials of the same class are usually compatible, but **not all materials with different UN numbers within a class will be**. Check the safety data sheet.`,
  },
  {
    title: "8. Hidden and Undeclared Dangerous Goods",
    content: `**The distinction, and why it matters**

**Undeclared** dangerous goods: the shipper **is aware** of the hazard and does not declare it, or mis-declares the cargo as something it is not. **This is a deliberate and unlawful act.**

**Hidden** dangerous goods: the shipper, agent or operator ships the goods **without being aware** of the hidden or concealed danger.

The response differs. Undeclared goods are a compliance and enforcement matter. Hidden goods are a training and vigilance matter — and they are why freight forwarder staff must receive dangerous goods training regardless of whether they handle declared dangerous goods.

Both produce the same outcome in the hold.

**Why hidden dangerous goods are so dangerous**

They are **not packed, labelled, stored or controlled in any way**. Nothing about them is designed for air transport. The crew do not know they are there, the NOTOC does not list them, and in an emergency nobody can tell the fire service what is burning.

**Descriptions that should prompt a question**

- Chemicals
- Consolidated shipments
- Diagnostic specimens
- Equipment
- Gas cylinders
- Medical supplies
- Personal effects
- Spare parts
- Toys

None of these is inherently suspicious. All of them routinely conceal dangerous goods — and the acceptance agent's job is to ask what is actually inside.

**"Personal effects"** may contain aerosols, matches, lighters, camping stoves, batteries, ammunition. **"Spare parts"** may contain batteries, compressed gas struts, airbag inflators, fuel-wetted engine components. **"Toys"** may contain lithium batteries or pyrotechnics. **"Equipment"** covers almost anything.

**What history shows**

**South African Airways Flight SA 295**, 28 November 1987 — a Boeing 747 crashed into the Indian Ocean near Mauritius after a fire in the cargo hold. All 159 on board died. It is suspected that undeclared dangerous goods started the fire.

**1996** — a major passenger airline carried undeclared calcium hypochlorite and liquid bleach from California to Jamaica. On arrival, airport personnel found smoke coming from the cargo doors and encountered toxic fumes on opening the compartment. The box burst into flames shortly after being removed from the hold.

**1998** — an undeclared shipment of electric storage batteries burst into flames en route by truck to an airport, where it had been scheduled for loading aboard a passenger aircraft.

**1999** — a cargo carrier transported an undeclared shipment of liquefied petroleum gas from Portland to New York. One day after arrival the package burst into flames at the carrier's sorting facility.

Note the pattern in the last two: both ignited **on the ground**, before or after the flight. Had the timing differed, both would have been in the air.

**The acceptance agent's position**

You cannot open every box. What you can do is:

- Question a **vague commodity description**
- Question a consignment from a **shipper you do not know**
- Notice **weight inconsistent with the description**
- Notice **packaging inconsistent with the description** — a heavily taped and sealed box of "documents"
- Notice **odour, staining or leakage**
- Notice **hazard markings or residual labels** on a supposedly general cargo consignment
- Ask the shipper directly what is inside

The cost of asking is a phone call. The cost of not asking has been paid, repeatedly, by people who were not in the room when the decision was made.`,
  },
  {
    title: "9. Passengers, Crew and Operator's Property",
    content: `Three categories of dangerous goods travel on aircraft outside the normal cargo provisions.

**1. Carried by passengers and crew**

Dangerous goods are prohibited in passenger baggage **with a few exceptions**. Permitted items typically include alcoholic beverages, medicinal and toilet articles including aerosols, hair spray, deodorant and shaving foam, safety matches or a lighter, and gas-powered hair curlers.

Some are subject to **restrictions on quantity and on where they may be packed** — carry-on, checked baggage, or on the person. The DGR contains the table; take the detail from the current edition.

The regime is a compromise. It would not be proper to discriminate against disabled passengers who need electric wheelchairs, so those are allowed. Hairspray and perfume may be hazardous, but getting passengers to abstain is unrealistic — the duty-free trolley is full of perfume.

**The problem is locating the passenger carrying unacceptable articles.** It falls mainly to passenger handling staff to watch for signs of potential hazard, since searching baggage would be improper or unlawful.

**Items that should prompt a question:**

- **Camping or hiking equipment** — butane, flammable liquids, matches, emergency flares
- **Toolboxes** — radioactive measuring equipment, gas-powered soldering irons, explosives, adhesives, corrosives, resins, paints, solvents
- **Diving equipment** — breathing apparatus, and diving torches that generate extreme heat when operated in air
- **Motion picture and stage articles** — special effects containing explosives or flammables
- **Automobile accessories** — corrosion protection substances and fuel additives such as nitromethane

**Passenger information** must be provided, as a minimum through placards at check-in counters and printing on tickets or ticket folders. Good practice is for check-in staff to ask each passenger about the articles on the placards.

**For remote and self-service check-in**, passengers must indicate they have understood the restrictions on dangerous goods in baggage before the check-in can complete. Operators should also provide the information via their websites. The source manual describes these as forthcoming after 2013; they are long since in force.

**2. Airworthiness and operating equipment**

Articles and substances which would otherwise be dangerous goods but which are **required aboard in accordance with airworthiness requirements and operating regulations**, or for specialised purposes identified in the Technical Instructions, are **excepted** from the provisions of Annex 18.

Fire extinguishers, oxygen bottles, life rafts, first aid kits.

**Replacements are not excepted.** Spares or replacements shipped as cargo must comply, in most respects, with the normal provisions for transport as dangerous goods. That distinction catches people — the extinguisher fitted to the aircraft is excepted; the replacement extinguisher in the hold is cargo.

**3. Operator's property**

A **permanent approval** is required for an operator to carry dangerous goods, with four exceptions:

1. **Articles and substances required for the airworthiness of the aircraft** — oxygen, fire extinguishers
2. **Catering or cabin service supplies** — dry ice, alcohol (whisky is classified as dangerous goods)
3. **Veterinary aids or humane killers for animals**
4. **Medical aids for a patient** — most commonly oxygen or compressed air, and electric wheelchairs

Other operator property in this category includes aircraft equipment, aircraft spares, solid carbon dioxide used in food and beverage service, and consumer goods such as aerosols, alcoholic beverages, perfumes and colognes for use or sale on the aircraft.

**The provisions of the DGR do not apply** to articles forming an integral part of the aircraft equipment, or to consumer commodities for use or sale on board.`,
  },
  {
    title: "10. Excepted and Limited Quantities",
    content: `Two relaxations, frequently confused. The difference determines what documentation an acceptance agent should expect to see.

**Excepted quantities**

Very small quantities may be transported **excepted from the marking, labelling and documentation requirements**. Applicable **only to goods acceptable on passenger aircraft**.

Note the manual's own correction: the term is **excepted** quantities, not "accepted" quantities. The heading in the source guide is wrong.

**Eligible:**

- Division 2.2 without a subsidiary risk
- Class 3, all packing groups
- Class 4, Packing Groups II and III, excluding all self-reactive substances
- Division 5.1, Packing Groups II and III
- Division 5.2, only when contained in a chemical kit or first aid kit
- Division 6.1, all except those with inhalation toxicity requiring Packing Group I
- Class 8, Packing Groups II and III, excluding gallium and mercury
- Class 9, other than magnetised material

**Excepted quantities cannot be applied to passenger baggage or airmail.**

**The E-codes.** Column F of the Dangerous Goods List gives a code E0 to E5:

| Code | Max per inner packaging | Max per outer packaging |
| --- | --- | --- |
| E0 | Not permitted as excepted quantity | — |
| E1 | 30 g / 30 mL | 1 kg / 1 L |
| E2 | 30 g / 30 mL | 500 g / 500 mL |
| E3 | 30 g / 30 mL | 300 g / 300 mL |
| E4 | 1 g / 1 mL | 500 g / 500 mL |
| E5 | 1 g / 1 mL | 300 g / 300 mL |

For gases, volumes refer to water capacity. **Where different dangerous goods with different codes are combined, the total in the outer packaging is limited to the most restrictive amount.**

**Marking.** Excepted quantities require a mark stating **"Dangerous Goods in Excepted Quantities"**, showing the class or division number and the name of the shipper or consignee if not shown elsewhere. Approved packaging is not required; good quality packaging to the specification in the regulations is sufficient, with inner packagings of plastic, glass, earthenware or metal.

**Limited quantities**

Some dangerous goods may be packed in simpler, though good quality, packages if the quantity is below a given amount.

**Limited quantity goods still need to be marked, labelled and documented as dangerous goods.** The relaxation applies to the packaging regime, not the paperwork. This is the single most common misunderstanding in the topic.

**The gross weight of a limited quantity package must not exceed 30 kg.**

The net amount allowed is specified in the Dangerous Goods List along with packing requirements, and limited quantity packing instructions are **prefixed "Y"**.

**The worked comparison — two bottles**

Two shipments. A 5-litre bottle of whisky at 43% alcohol, and a 5-litre bottle of Stroh Rum at 80%.

**The whisky**, at 5 L, can be shipped as **limited quantity** — that entry allows up to 10 L. It must be packed to packing instruction **Y309**, which is simpler than the instruction for receptacles over 10 L. It still needs all the labels and documentation required for dangerous goods. Receptacles under 5 L are not restricted at all. Excepted quantities do not apply, being limited to 1 L for flammable liquids.

**The Stroh Rum** at 80% is too much for limited quantities and needs the full treatment. At 1 L or less it could have gone as limited quantity.

**At 30 mL**, the Stroh Rum could go as **excepted quantity** — no flammable liquid label, no dangerous goods documentation, only the excepted quantities mark.

Same substance. Three regimes. The quantity decides.

**Every figure above is illustrative of structure.** Limits change between editions. Take the number from the edition in force.`,
  },
  {
    title: "11. State and Operator Variations",
    content: `Variations are requirements applied by individual governments or airlines **in addition to** the provisions in the regulations.

**Definitions**

**Operator** — a person, organisation or enterprise engaged in, or offering to engage in, an aircraft operation.
**State of Origin** — the State in whose territory the cargo was first loaded on an aircraft.
**State of the Operator** — the State in which the operator's principal place of business is located, or, failing that, the operator's permanent residence.

**Where they live**

**Section 2 of the IATA DGR** (Attachment 3 in the ICAO TI), amended in **post-publication addenda** circulated by both organisations.

The addenda matter. A variation can change between editions, and an agent working only from the bound volume will miss it.

**The constraint on operator variations**

Nothing prevents an operator having variations to the Technical Instructions **provided those variations are more restrictive**. Where operators have them, the practice is to file them in the IATA DGR.

Variations may apply to packing, marking, training, acceptance and handling.

**Worked examples**

**USG-12 (United States)** — requires all consignments passing through the USA to carry emergency response information on the dangerous goods declaration, including a **24-hour emergency contact telephone number providing immediate access to a knowledgeable person**.

As with all US variations, this applies to shipments transported **to, from or within** the USA under international standards — **and to dangerous goods carried on a US-registered aircraft regardless of where it is travelling.**

That last clause catches people. A consignment between two African points, on a US-registered aircraft, is subject to US variations.

**QF-02 (Qantas)** — the IATA regulations permit passengers and crew to bring book matches on board for personal use. QF-02 prohibits it.

**BHG-02 (Bahrain)** — forbids transport by aircraft of weapons and munitions; explosives unless required on board for operation or signalling; poisonous gases; germs; radioactive material, radioisotopes and similar substances; and any other prohibited item as determined by the competent authority — except with prior permission of Civil Aviation Affairs.

**GBG-05 (United Kingdom)** — Category A infectious substances (UN 2814 and UN 2900) and Biological substances Category B (UN 3373) are not permitted in international mail to or from the UK. Category A is not permitted in domestic mail; Category B only under special arrangements.

**ZAG-04 (South Africa)** — **radioactive material and infectious substances, including diagnostic specimens and biological products, are not permitted in mail either to, from or through the Republic of South Africa.**

**AF-02 (Air France)** — infectious substances, patient specimens, diagnostic specimens, clinical specimens and biological substances will only be accepted if assigned to UN 2814 or UN 2900, with limited exceptions for dried blood spots, pathogen-free blood or blood components for transfusion, and tissues or organs for transplantation.

**The point the manual makes about AF-02 and LH-12 is worth holding onto:** some operator restrictions are **not consistent with the principles of the regulations**. Air France and Lufthansa will carry blood and tissue samples only under UN 2814 or UN 2900, whereas under the classification criteria those would be assigned to UN 3373 Biological substance Category B, or would be exempt human or animal specimens.

A shipper complying correctly with the regulations can therefore still have a consignment rejected. That is legitimate — operator variations may be more restrictive — but it means **compliance with the DGR alone is not sufficient to guarantee acceptance.**

**The working habit**

Before accepting, establish the **routing** including transit points and overflown States, and the **operator**, then check Section 2 for both. Many airlines require advance arrangements for dangerous goods; senders of infectious substances in particular should contact the operator directly.`,
  },
  {
    title: "12. The Nine Classes and Subsidiary Risks",
    content: `Dangerous goods are divided into nine classes by the type of hazard. Some are divided into divisions where several types of substance share a hazard type.

**Class 1 — Explosives**

Explosive substances, except where the predominant hazard belongs in another class. Explosive articles, except devices containing explosive substances in such limited quantity or character that inadvertent or accidental ignition during transport would not cause projection, fire, heat, smoke or loud noise external to the device. And articles or substances manufactured to produce a practical explosive or pyrotechnic effect.

| Division | Hazard |
| --- | --- |
| 1.1 | Mass explosion hazard |
| 1.2 | Projection hazard, but not mass explosion |
| 1.3 | Fire hazard, and a minor blast and/or minor projection hazard, but not mass explosion |
| 1.4 | No significant hazard |
| 1.5 | Very insensitive substances with a mass explosion hazard |
| 1.6 | Extremely insensitive articles without a mass explosion hazard |

**Division 1.4S is the only explosive acceptable on passenger aircraft.**

Class 1 also carries **compatibility groups**, lettered A to S, which appear in the shipping description and determine what may be loaded together.

**Class 2 — Gases.** Compressed and liquefied gases, refrigerated liquefied gases, gases in solution, mixtures of gases, and mixtures of gases with vapours of other substances. Articles charged with a gas, and aerosols, belong here.

| Division | Hazard |
| --- | --- |
| 2.1 | Flammable gas |
| 2.2 | Non-flammable, non-toxic gas |
| 2.3 | Toxic gas |

**Class 3 — Flammable liquids.** No divisions. Liquids, mixtures of liquids, and liquids containing solids in solution or suspension, which give off a flammable vapour.

**Class 4 — Flammable solids; substances liable to spontaneous combustion; substances which emit flammable gases on contact with water**

**Three divisions.** Note carefully: older training material — including the source manual for this unit standard — states that Class 4 "has no divisions" and "comprises liquids", then lists the three divisions immediately below. **The first statement is wrong on both counts**; the text was copied from Class 3.

| Division | Hazard |
| --- | --- |
| 4.1 | Flammable solids, self-reactive substances, desensitized explosives |
| 4.2 | Substances liable to spontaneous combustion |
| 4.3 | Substances which, in contact with water, emit flammable gases |

**Class 5 — Oxidising substances and organic peroxides.** Oxidisers are not necessarily combustible themselves, but may cause or contribute to the combustion of other materials.

| Division | Hazard |
| --- | --- |
| 5.1 | Oxidising substances |
| 5.2 | Organic peroxides |

**Class 6 — Toxic and infectious substances.** Substances liable to cause death, injury or harm to human health if swallowed, inhaled, or through skin contact.

| Division | Hazard |
| --- | --- |
| 6.1 | Toxic substances |
| 6.2 | Infectious substances |

**Class 7 — Radioactive material.** No divisions. Any substance with a specific activity greater than **70 kBq/kg** (70 Bq/g).

**Class 8 — Corrosive substances.** No divisions. Substances that can cause severe damage by chemical action on contact with living tissue, other materials, or the aircraft.

**Class 9 — Miscellaneous.** Asbestos · solid carbon dioxide (dry ice) · environmentally hazardous substances · life-saving appliances · internal combustion engines · polymeric beads · magnetised material · battery-powered equipment and vehicles — and **lithium batteries**, which Module 14 covers separately.

**Subsidiary risks**

Many items have more than one hazard. A primary class is allocated, with significant additional hazards identified as subsidiary risks.

**Benzyl bromide (UN1737)** is both a toxic liquid and a corrosive — Division 6.1 with subsidiary risk 8.

**Methyl vinyl ketone (UN1251)** has a primary hazard of 6.1 but is also flammable and corrosive.

**Do not assume a subsidiary risk is less important.** Where a package is damaged or leaking, all identified hazards should be regarded equally. For benzyl bromide, the corrosive subsidiary risk may be the more important consideration if the package has to be handled or moved.

**The visual test:** the primary hazard label bears the **class or division number in the bottom corner**. **Subsidiary risk labels show no class or division number.**`,
  },
  {
    title: "13. Identification, Packing Groups and Radioactive Material",
    content: `**UN and ID numbers**

Dangerous goods in air transport are identified by **a proper shipping name and a UN or ID number together**.

The UN number is a four-digit code identifying the substance internationally. **UN1088** is Acetal anywhere in the world.

A few items assigned airline-industry identifiers in the **8000 series** under the IATA DGR are prefixed **ID** rather than UN.

These numbers exist to reduce confusion from misunderstood or mispronounced shipping names, and to assist in locating emergency response guidance when there is an incident.

**The Dangerous Goods List**

**Table 4.2 in the IATA DGR; Table 3-1 in the ICAO TI.** Each entry gives the proper shipping name, UN or ID number, primary class or division, subsidiary risks, the labels to be used, the packing group where assigned, whether the item is permitted on passenger aircraft or restricted to cargo aircraft only or forbidden, and the packing instructions with quantity limitations for each aircraft type.

*Worked reading.* Acetal is a flammable liquid, so Class 3, Packing Group II, UN1088. Its entry shows the hazard labels, the packing instructions and the net quantity limits per package for passenger and for cargo aircraft.

**Packing groups**

| Group | Degree of danger |
| --- | --- |
| **I** | Great danger |
| **II** | Medium danger |
| **III** | Minor danger |

Most substances are assigned on technical criteria; some on experience. Classes 1, 2 and 7, and Division 6.2, do not assign them.

**Packaging**

Packaging must be **of good quality**, **compatible with its contents**, and **able to withstand the normal conditions of air transport**. Most must also meet prescribed specifications and performance tests for the design type, and bear a **packaging specification marking** — the UN mark, followed by codes signifying type, packing group, limitations and year of manufacture.

**Combination packaging** is a bottle in a box. **Single packaging** is a drum. **Generally, only combination packaging is permitted on passenger aircraft**, with single packaging sometimes allowed for certain low-hazard Packing Group III goods.

Where the goods are not alone in the package you have an **outer package**; grouped with other packages an **overpack**; loaded with other cargo a **Unit Load Device**.

**Radioactive material — what an acceptance agent needs**

Radiation cannot be detected by any human sense, only by measuring equipment.

**Categories.** Packages and overpacks are assigned to one of three categories by surface radiation:

| Category | Surface radiation |
| --- | --- |
| I-White (RRW) | Up to 5 μSv/h |
| II-Yellow (RRY II) | Up to 0.5 mSv/h |
| III-Yellow (RRY III) | More than 0.5 but less than 2 mSv/h |

**Transport Index.** Determined by package size and radiation emitted. The TI governs where in an aircraft a package may be loaded and how far it must be separated from persons, live animals and undeveloped film.

**Transport indices are additive.** Three packages with TI of 2, 3 and 3.5 loaded in the same place give an accumulated TI of 8.5, which requires a considerably greater separation distance than any of them individually. Take the distances from the current tables.

**Receiving an aircraft carrying radioactive material.** Approach the hold while measuring radiation levels. If the instrument shows no significant radiation, proceed to the cargo hatch. Open the hold and measure inside. If the package appears undamaged, measure its surface. If radiation remains as expected, it is safe to unload.

**If at any point the radiation level increases significantly, stop and back away. Get qualified assistance and let them handle it.**

**Terms you will meet.** *Special form* — radioactive material in a sealed integral form that cannot, for practical purposes, produce contamination. *Surface Contaminated Object (SCO)* — an object not radioactive in itself but with radioactive material on its surface. *Low Specific Activity (LSA)* — material with limited activity by nature. *Fissile* — for regulatory purposes, uranium-233, uranium-235, plutonium-238, plutonium-239 and plutonium-241, and mixtures containing them.`,
  },
  {
    title: "14. Lithium Batteries in Acceptance",
    content: `**Absent from the source manual entirely. For an acceptance agent, this is now the single most important topic in the course.**

**Why they are treated differently**

A lithium battery in **thermal runaway** produces its own oxygen. It cannot be extinguished by the Halon suppression systems fitted in aircraft cargo holds. The fire burns until the stored energy is spent, propagating cell to cell.

Halon suppresses a conventional fire by interrupting the combustion chemistry. A battery in runaway does not need atmospheric oxygen, so there is nothing to interrupt.

**The four UN entries**

| UN number | Description |
| --- | --- |
| UN3090 | Lithium **metal** batteries (shipped alone) |
| UN3091 | Lithium metal batteries **contained in** or **packed with** equipment |
| UN3480 | Lithium **ion** batteries (shipped alone) |
| UN3481 | Lithium ion batteries **contained in** or **packed with** equipment |

The distinction between *contained in equipment*, *packed with equipment* and *shipped alone* determines the packing instruction, the quantity limit, and whether the shipment may fly at all. **Establish it first.**

**Standalone batteries and passenger aircraft**

**UN3480 and UN3090 — lithium ion and lithium metal batteries shipped on their own — are forbidden as cargo on passenger aircraft.** They are cargo aircraft only.

Batteries contained in or packed with equipment are treated differently. This is the distinction most commonly got wrong by shippers who assume batteries are batteries.

**State of charge**

Lithium ion cells and batteries shipped alone must be offered at a **state of charge not exceeding 30%** of rated capacity. Higher states of charge require approval from the appropriate authorities.

**The lithium battery mark**

Packages under the smaller-quantity provisions must carry the **lithium battery mark**, showing the UN number or numbers and a telephone number for additional information. It replaced the earlier lithium battery handling label.

**Section II and the direction of travel**

Smaller consignments have historically been shippable under relaxed **Section II** provisions with reduced documentation. **Those provisions have been progressively tightened across successive editions**, with some removed entirely. An arrangement used two years ago may no longer exist.

**Damaged, defective and recalled batteries**

**Forbidden for air transport** unless specifically approved. A battery that has swelled, been dropped, or shows any sign of damage does not fly.

**What an acceptance agent actually checks**

1. **Which UN entry** — and does the declaration match the physical configuration
2. **Passenger or cargo aircraft**, and does the routing match
3. **CAO label present** where required
4. **Lithium battery mark** present and legible where required
5. **Packing instruction** cited, and does the packaging match it
6. **State of charge** declared where applicable
7. **Package condition** — no swelling, no heat damage, no crushing
8. **Consistency** between the air waybill, the declaration and the package

**The undeclared problem**

Lithium batteries are frequently shipped undeclared — as "electronics", "spare parts", "samples" or "power banks" — by shippers who often do not know they are dangerous goods.

**This is the commonest undeclared dangerous good in air cargo**, and the one most likely to be sitting in a consignment presented as general cargo. Weight inconsistent with the description, a shipper you do not know, and anything battery-powered together justify a question.

**What this module deliberately does not give you**

Specific watt-hour limits, lithium content limits, packing instruction numbers, quantity thresholds and Section II eligibility.

Those change with every edition, and a figure memorised on a course is exactly how a consignment gets accepted with complete confidence and no compliance. **Take every number from the current edition.**`,
  },
  {
    title: "15. The Air Waybill and the Shipper's Declaration",
    content: `The presence of dangerous goods must be communicated not only through marks and labels on the package, but through shipping papers accompanying the materials.

**The air waybill**

The **airline contract for carriage**. It is **not normally used to transmit the required dangerous goods information** — except where dry ice is used to refrigerate non-hazardous materials, or the shipment is in excepted quantities.

**Who fills it in.** The IATA conditions state the air waybill must be filled in by the shipper, or in his name. It may be completed by the airline or an IATA agent, **but in the name of the shipper**. The shipper is responsible for the information being correct and complete, and for any damage or injury resulting from false information.

**A neutral air waybill** is a standard air waybill without identification of an issuing carrier. Airlines and agents print their own electronically from allotted number ranges. Electronic neutral air waybills let forwarders avoid holding stocks of carrier-specific forms.

**Two fields must be completed for dangerous goods:**

**Handling information** — *"Dangerous goods as per attached shipper's declaration"* or *"Dangerous goods as per attached DGD"*, and where applicable *"CARGO AIRCRAFT ONLY"* or *"CAO"*.

Where dangerous goods are in a consignment with non-dangerous goods, **the number of pieces of dangerous goods must be indicated** either before or after that statement.

**Nature and quantity of goods** — the entry as shown in the IATA Air Waybill Handbook and per the current DGR.

**For dangerous goods NOT requiring a Shipper's Declaration**, a full description goes in the nature and quantity box showing, in sequence: proper shipping name, class or division number, packing group, number of packages, net quantity per package, and packing instruction.

**The Shipper's Declaration for Dangerous Goods**

ICAO requires a **Dangerous Goods Transport Document**. In the IATA system this is separate from the air waybill and takes the form of a **red-bordered** airline industry document — the Shipper's Declaration for Dangerous Goods.

**Contents:**

- Name and address of shipper and consignee
- Aircraft type and limitations — Cargo Aircraft Only must also be noted on the air waybill
- Airports of origin and destination
- Shipment type — radioactive or non-radioactive
- Proper shipping name, and technical name where appropriate
- Hazard class
- UN or ID number
- Subsidiary risk
- Nature, quantity and type of packaging
- Packing instruction
- Any special authorisations
- Additional handling information
- Shipper's certification
- Page count — "1 of 2", "2 of 2"
- Place and date
- Name and title of signatory, and signature

**The air waybill number must be entered** in the top right corner of the declaration.

**Paper and electronic.** Traditionally the original and duplicate are completed, both signed, and attached to the air waybill. **Electronic dangerous goods declarations are now widely used**, and the signature requirement is satisfied electronically.

**Who may complete it — the rule that does not change**

**The Shipper's Declaration must be completed and signed by the shipper. Neither the forwarder, nor the agent, nor the packer may complete it, and they may not sign it under any circumstances.**

**Transport document requirements**

- May be in any form provided it contains all required information
- If both dangerous and non-dangerous goods are listed, **the dangerous goods are listed first or otherwise emphasised**
- May consist of more than one page, **consecutively numbered**
- Information must be **easy to identify, legible and durable**
- **Name and address of consignor and consignee**
- **Date** prepared or given to the initial carrier

For each substance or article: the **UN number preceded by "UN"**; the **proper shipping name**; the **class or division**, including for Class 1 the compatibility group letter, with subsidiary hazard class or division numbers following the primary **in brackets**; and the **packing group** where assigned, which may be preceded by "PG".

Generic and n.o.s. descriptions must be **supplemented with technical names**. Waste dangerous goods carry the proper shipping name **preceded by "WASTE"** unless already part of the name.

Plus the **total quantity** by volume or mass for each item with a different name, UN number or packing group — for Class 1, the **net explosive mass** — with the **number and kind of packagings** indicated. A statement of any **actions required of the carrier**. And a **certification or declaration** that the consignment is acceptable for transport and properly packaged, marked, labelled and in proper condition.

**Safety data sheets.** An SDS may accompany the shipment. Note the terminology: GHS replaced the Material Safety Data Sheet with the 16-section **Safety Data Sheet**. Older material, including the source manual, says MSDS.`,
  },
  {
    title: "16. The Acceptance Check, NOTOC and Retention",
    content: `**The acceptance check**

**Dangerous goods for air transport must be subjected to an inspection on acceptance** designed to check, as far as possible, that the packages and documents meet all applicable requirements.

**An acceptance checklist must be used, and the findings recorded.**

**If the shipper has not satisfactorily complied with all the requirements, the package cannot legally be transported and must be refused until the carrier is satisfied that all details are in order.**

That sentence is the function of the role. An acceptance agent who passes a non-compliant consignment to avoid an argument has removed the last check before the aircraft.

**Annex 18 — acceptance for transport**

An operator shall not accept dangerous goods for transport by air:

**(a)** unless accompanied by a completed dangerous goods transport document, except where the Technical Instructions indicate one is not required; and
**(b)** until the package, overpack or freight container has been **inspected in accordance with the acceptance procedures** in the Technical Instructions.

**An operator shall develop and use an acceptance checklist** as an aid to compliance.

*Note: the source manual attributes these to "Annex 8". Operator responsibilities are in **Annex 18**.*

**IATA publishes acceptance checklists** for radioactive shipments, non-radioactive shipments, and dry ice.

**Inspection for damage or leakage**

- Packages and overpacks, and freight containers containing radioactive materials, **shall be inspected for evidence of leakage or damage before loading**. **Leaking or damaged packages shall not be loaded.**
- A **unit load device shall not be loaded** unless inspected and found free from evidence of leakage or damage.
- Where a package loaded on an aircraft **appears damaged or leaking**, the operator shall **remove it**, or arrange removal by an appropriate authority, and thereafter ensure the remainder of the consignment is in proper condition and that **no other package has been contaminated**.
- Packages **shall be inspected for damage or leakage on unloading**. If found, **the area where they were stowed shall be inspected for damage or contamination**.

**Removal of contamination.** Any hazardous contamination found as a result of leakage or damage **shall be removed without delay**. An aircraft contaminated by radioactive materials **shall immediately be taken out of service** and not returned until radiation levels at accessible surfaces and non-fixed contamination are within the specified values.

**Loading, separation and segregation**

- Packages containing dangerous goods **which might react dangerously with one another shall not be stowed next to each other**, or in a position allowing interaction in the event of leakage
- Packages of **toxic and infectious substances** shall be stowed per the Technical Instructions
- Packages of **radioactive materials** shall be separated from persons, live animals and undeveloped film
- The operator shall **protect dangerous goods from damage** and **secure them to prevent any movement in flight which would change the orientation of the packages**
- Packages bearing the **"Cargo aircraft only" label shall be loaded so that a crew member or other authorised person can see, handle and — where size and weight permit — separate them from other cargo in flight**

**Dangerous goods shall not be carried in an aircraft cabin occupied by passengers or on the flight deck**, except as permitted by the Technical Instructions.

**The NOTOC**

**The commander must be provided with written information about the dangerous goods loaded on the aircraft.** Data from the Shipper's Declaration is copied to the **NOTOC — Notification To Captain**, also called NOTAC, Notification to Aircraft Commander.

**Its purpose is twofold.** It is a **legal document** by which the person responsible for loading certifies the regulations have been complied with. And it **informs the pilot in command** of what has been loaded, and how and where.

**The NOTOC must include:**

- the **proper shipping name** and **UN or ID number**
- the **class or division**, **subsidiary risks**, and **packing group**
- the **number of packages** and **where located**
- for radioactive materials, the **category** and **transport index**

Producing the NOTOC by computerised means is acceptable provided all required information is shown.

**Why it exists.** If an in-flight emergency occurs and the situation permits, the commander must inform the appropriate air traffic services unit of the dangerous goods on board — proper shipping name, class and subsidiary risks, quantity, and location. The NOTOC is what they read from.

The Technical Instructions allow the captain discretion, since he must judge the risk of diverting attention from controlling the aircraft. That discretion only works if the document in front of him is accurate.

**Document retention**

Retention periods are prescribed by the applicable national regulations. In South Africa these run through the **Civil Aviation Regulations and SA-CATS-DG**; confirm the current period before setting a policy.

*Note: the source manual cites "Chapter 384 Subsidiary Legislation" and a six-month retention period. That is Hong Kong legislation and does not apply in South Africa.*

**Annex 18 Chapter 11 — Compliance.** Each Contracting State shall establish **inspection, surveillance and enforcement procedures** to achieve compliance, including provisions for the inspection of both documents and cargo and operators' practices, and a method for investigating alleged violations. Each State shall take such measures as it deems appropriate, including **prescribing appropriate penalties for violations**. States should cooperate on violations, coordinating investigations and enforcement, exchanging compliance history, conducting joint inspections and exchanging technical staff.

**What this course does not do**

**It does not qualify you to perform acceptance, complete an acceptance check, sign a NOTOC, or offer dangerous goods for carriage.**

Those functions require **current, formally assessed dangerous goods training** from a recognised provider, under a programme approved by the State of the Operator, with recurrent training at prescribed intervals.

The acceptance check is the last point at which a non-compliant consignment can be stopped. An untrained person performing it is not a check — it is a signature on a form that says a check happened.

Aircraft have been lost carrying cargo that passed acceptance.`,
  },
];

export const us242986Quiz = [
  {
    q: "What is the underlying philosophy of carrying dangerous goods by air?",
    options: [
      "Dangerous goods should be avoided by air wherever possible",
      "They can be carried safely provided they are suitably packaged and in limited quantities, correctly classified, marked, documented and loaded",
      "Only goods classified below Packing Group II may be carried",
      "Carriage is permitted only on cargo aircraft",
    ],
    answer: 1,
  },
  {
    q: "Which document is the legal instrument for the air transport of dangerous goods?",
    options: [
      "The IATA Dangerous Goods Regulations",
      "The ICAO Technical Instructions, issued under Annex 18 to the Chicago Convention",
      "The UN Orange Book",
      "The Shipper's Declaration",
    ],
    answer: 1,
  },
  {
    q: "What does the IATA DGR add that the ICAO Technical Instructions do not cover?",
    options: [
      "The Dangerous Goods List",
      "Classification criteria",
      "How to complete the Shipper's Declaration and the accompanying air waybill, which are commercial documents outside ICAO's jurisdiction",
      "Packing instructions",
    ],
    answer: 2,
  },
  {
    q: "To whom does the IATA DGR apply, and what applies otherwise?",
    options: [
      "All operators worldwide; there is no alternative",
      "IATA member airlines, associate members and interline partners; otherwise the ICAO TI is the document to comply with",
      "Only to shippers, not operators",
      "Only to operators registered in ICAO Council member states",
    ],
    answer: 1,
  },
  {
    q: "Do the UN Model Regulations (Orange Book) cover manufacture, use and disposal of dangerous goods?",
    options: [
      "Yes, all three",
      "No — they cover transport only",
      "They cover manufacture and disposal but not use",
      "They cover disposal only",
    ],
    answer: 1,
  },
  {
    q: "Under Annex 17, what must happen before an operator accepts cargo for carriage on a passenger flight?",
    options: [
      "The shipper must hold an export licence",
      "Security must have been accounted for by a regulated agent, or the cargo subjected to other security controls",
      "The cargo must be screened by the State of Destination",
      "The consignment must be under 30 kg",
    ],
    answer: 1,
  },
  {
    q: "The Technical Instructions restrict quantity in what way?",
    options: [
      "Per aircraft, by total weight of dangerous goods",
      "Per package, according to the degree of hazard and aircraft type — there is generally no restriction on the number of packages per aircraft",
      "Per consignment, regardless of packaging",
      "Per flight sector",
    ],
    answer: 1,
  },
  {
    q: "At what interval is recurrent dangerous goods training required?",
    options: ["12 months", "24 months", "36 months", "60 months"],
    answer: 1,
  },
  {
    q: "Whose approval is required for an operator's dangerous goods training programme?",
    options: [
      "IATA",
      "The State of the Operator",
      "The State of Origin of each consignment",
      "No approval is required",
    ],
    answer: 1,
  },
  {
    q: "Which staff of freight forwarders must receive dangerous goods training?",
    options: [
      "Only those who complete Shipper's Declarations",
      "Only those who physically handle dangerous goods packages",
      "All staff, commensurate with their functions, whether or not they are involved in the direct processing of dangerous goods",
      "Only supervisors and managers",
    ],
    answer: 2,
  },
  {
    q: "The dangerous goods training model has moved from category-based to what?",
    options: [
      "Annual attendance-based refresher courses",
      "Competency-based training and assessment (CBTA)",
      "Employer self-certification",
      "Online-only assessment",
    ],
    answer: 1,
  },
  {
    q: "Within what period must an operator notify the authorities of a dangerous goods accident or incident within South Africa?",
    options: ["24 hours", "48 hours", "7 days", "21 days"],
    answer: 1,
  },
  {
    q: "Within what period must the written follow-up report be made?",
    options: ["48 hours", "7 days", "21 days", "90 days"],
    answer: 2,
  },
  {
    q: "Undeclared dangerous goods are discovered on board within the Republic. What must the operator do?",
    options: [
      "Note it in the flight file for the next audit",
      "Notify the Commissioner or the appropriate authority within 48 hours of discovery",
      "Report it only if a release occurred",
      "Report it to IATA within 21 days",
    ],
    answer: 1,
  },
  {
    q: "Following an aircraft accident, what does the Technical Instructions require of the operator?",
    options: [
      "Nothing until the investigation is opened",
      "To inform, as soon as possible, the State in which the accident occurred of what dangerous goods were on board and where they were located",
      "To inform only the State of the Operator",
      "To inform the shipper before any authority",
    ],
    answer: 1,
  },
  {
    q: "Which of these is a reportable incident?",
    options: [
      "An escape of dangerous goods expected during normal maintenance",
      "A near miss at a major hazard facility",
      "A misfired shot not arising from product malfunction",
      "A traffic incident where containers and goods remain intact and un-impacted",
    ],
    answer: 1,
  },
  {
    q: "Who may complete and sign the Shipper's Declaration for Dangerous Goods?",
    options: [
      "The shipper, forwarder or packer",
      "The shipper only — no other party may complete or sign it under any circumstances",
      "Any person holding current DG training",
      "The operator's acceptance agent",
    ],
    answer: 1,
  },
  {
    q: "What is the Proper Shipping Name, and how is it identified?",
    options: [
      "The chemical name from the safety data sheet",
      "The name appearing in the DGR in capital letters only; text in lower case is descriptive and not part of the PSN",
      "The trade name registered by the manufacturer",
      "The UN number written in words",
    ],
    answer: 1,
  },
  {
    q: "What is the potential consequence of failing to properly identify a dangerous goods shipment?",
    options: [
      "A surcharge on the freight rate",
      "Penalties or imprisonment",
      "Refusal by the carrier only",
      "A written warning from the State of Origin",
    ],
    answer: 1,
  },
  {
    q: "Which is NOT among the operator's obligations under Annex 18?",
    options: [
      "Acceptance, storage, loading and inspection",
      "Classification of the goods on the shipper's behalf",
      "Provision of information and emergency response",
      "Retention of records and training",
    ],
    answer: 1,
  },
  {
    q: "Which of these explosives is forbidden in aircraft under any circumstances?",
    options: [
      "Division 1.4S explosives",
      "Explosives containing both chlorates and ammonium salts",
      "Any Division 1.3 explosive",
      "Explosives in limited quantities",
    ],
    answer: 1,
  },
  {
    q: "An explosive ignites or decomposes when subjected to 75 °C for 48 hours. What is its status?",
    options: [
      "Cargo aircraft only",
      "Forbidden in aircraft under any circumstances",
      "Permitted with a subsidiary risk label",
      "Permitted in limited quantities",
    ],
    answer: 1,
  },
  {
    q: "Certain dangerous goods not normally acceptable may be carried under exemption granted by whom?",
    options: [
      "The operator",
      "The State of Origin, the State of Destination, and all States to be overflown",
      "IATA and ICAO jointly",
      "The State of the Operator alone",
    ],
    answer: 1,
  },
  {
    q: "Which classes should be deemed incompatible with all other dangerous goods?",
    options: ["Classes 3 and 8", "Classes 1 and 7", "Classes 2 and 5", "Classes 4 and 6"],
    answer: 1,
  },
  {
    q: "Class 4.3 goods must not be stored next to what?",
    options: [
      "Class 8 corrosives",
      "Goods in aqueous solution, or where water or foam is the chosen firefighting or dispersal medium",
      "Radioactive material only",
      "Foodstuffs",
    ],
    answer: 1,
  },
  {
    q: "What distinguishes hidden dangerous goods from undeclared dangerous goods?",
    options: [
      "Hidden goods are in baggage; undeclared goods are in cargo",
      "With undeclared goods the shipper is aware of the hazard and does not declare it, which is deliberate and unlawful; with hidden goods the shipper is unaware of the concealed danger",
      "Hidden goods are always Class 9",
      "There is no difference in law",
    ],
    answer: 1,
  },
  {
    q: "Which of these commodity descriptions is a recognised hidden dangerous goods risk?",
    options: [
      "Printed paper only",
      "Personal effects, spare parts, toys, equipment and consolidated shipments",
      "Fresh cut flowers",
      "Textiles",
    ],
    answer: 1,
  },
  {
    q: "What happened to South African Airways Flight SA 295 in November 1987?",
    options: [
      "It was hijacked over the Indian Ocean",
      "It crashed into the Indian Ocean near Mauritius after a cargo hold fire, with all 159 aboard killed; undeclared dangerous goods are suspected",
      "It made an emergency landing after a battery fire, with no casualties",
      "It was destroyed on the ground by a cargo fire",
    ],
    answer: 1,
  },
  {
    q: "A fire extinguisher is fitted to the aircraft as required equipment. A replacement extinguisher is shipped as cargo. How are they treated?",
    options: [
      "Both are excepted from the provisions of Annex 18",
      "The fitted extinguisher is excepted; the replacement shipped as cargo must comply, in most respects, with the normal provisions for dangerous goods",
      "Both must be declared as dangerous goods",
      "Neither is regulated",
    ],
    answer: 1,
  },
  {
    q: "A permanent approval is required for an operator to carry dangerous goods, with how many exceptions, and what are they?",
    options: [
      "Two — airworthiness items and catering supplies",
      "Four — airworthiness articles, catering or cabin service supplies, veterinary aids or humane killers, and medical aids for a patient",
      "Three — airworthiness, medical and security items",
      "None — approval is always required",
    ],
    answer: 1,
  },
  {
    q: "To which aircraft do excepted quantity provisions apply?",
    options: [
      "Cargo aircraft only",
      "Goods acceptable on passenger aircraft only",
      "Both equally, without distinction",
      "Neither — excepted quantities are a surface transport concept",
    ],
    answer: 1,
  },
  {
    q: "Under code E2, what is the maximum quantity per inner and per outer packaging?",
    options: [
      "1 g/1 mL inner; 300 g/300 mL outer",
      "30 g/30 mL inner; 500 g/500 mL outer",
      "30 g/30 mL inner; 1 kg/1 L outer",
      "1 g/1 mL inner; 500 g/500 mL outer",
    ],
    answer: 1,
  },
  {
    q: "Different dangerous goods with different E codes are combined in one outer packaging. What limit applies?",
    options: [
      "The sum of the individual limits",
      "The most restrictive amount",
      "The least restrictive amount",
      "Combination is not permitted",
    ],
    answer: 1,
  },
  {
    q: "May excepted quantities be applied to passenger baggage or airmail?",
    options: ["Yes, to both", "Yes, to airmail only", "No, to neither", "Yes, to passenger baggage only"],
    answer: 2,
  },
  {
    q: "Are limited quantity shipments exempt from marking, labelling and documentation?",
    options: [
      "Yes — that is the purpose of the relaxation",
      "No — they still need to be marked, labelled and documented as dangerous goods; the relaxation applies to the packaging regime",
      "Only the documentation is waived",
      "Only the labelling is waived",
    ],
    answer: 1,
  },
  {
    q: "What is the maximum gross weight of a limited quantity package?",
    options: ["5 kg", "10 kg", "30 kg", "50 kg"],
    answer: 2,
  },
  {
    q: "Which letter prefixes limited quantity packing instructions in the Dangerous Goods List?",
    options: ["E", "L", "Q", "Y"],
    answer: 3,
  },
  {
    q: "What is the constraint on an operator introducing its own variation to the Technical Instructions?",
    options: [
      "Operators may not impose variations",
      "The variation must be more restrictive than the Technical Instructions",
      "The variation must be approved by ICAO",
      "The variation may be more or less restrictive",
    ],
    answer: 1,
  },
  {
    q: "US variation USG-12 applies to which shipments?",
    options: [
      "Shipments originating in the USA only",
      "Shipments to, from or within the USA under international standards, and dangerous goods on a US-registered aircraft regardless of where it is travelling",
      "Passenger aircraft shipments to the USA only",
      "Cargo aircraft shipments only",
    ],
    answer: 1,
  },
  {
    q: "South African variation ZAG-04 prohibits what?",
    options: [
      "All lithium batteries in cargo",
      "Radioactive material and infectious substances, including diagnostic specimens and biological products, in mail to, from or through South Africa",
      "All Class 1 explosives on South African registered aircraft",
      "Aerosols in passenger baggage",
    ],
    answer: 1,
  },
  {
    q: "Air France variation AF-02 requires blood and tissue samples to be assigned to UN 2814 or UN 2900. Why is this significant?",
    options: [
      "It matches the classification criteria exactly",
      "Under the regulations those materials would be assigned to UN 3373 or be exempt specimens, so compliance with the DGR alone does not guarantee acceptance",
      "It is a State variation, not an operator variation",
      "It applies only to domestic French shipments",
    ],
    answer: 1,
  },
  {
    q: "Which division is the only explosive acceptable on passenger aircraft?",
    options: ["1.3", "1.4S", "1.5", "1.6"],
    answer: 1,
  },
  {
    q: "How many divisions does Class 4 have?",
    options: [
      "None — it comprises liquids which give off flammable vapour",
      "Two",
      "Three — flammable solids; substances liable to spontaneous combustion; substances which emit flammable gases on contact with water",
      "Four",
    ],
    answer: 2,
  },
  {
    q: "For regulatory purposes, radioactive material is any substance with specific activity greater than what?",
    options: ["7 kBq/kg", "70 kBq/kg", "700 kBq/kg", "70 MBq/kg"],
    answer: 1,
  },
  {
    q: "How is a primary hazard label distinguished from a subsidiary risk label?",
    options: [
      "The primary label is larger",
      "The primary label bears the class or division number in the bottom corner; subsidiary risk labels show no class or division number",
      "Subsidiary labels are square",
      "Subsidiary labels are red-bordered",
    ],
    answer: 1,
  },
  {
    q: "A radioactive package has a surface radiation of 0.3 mSv/h. Which category is it?",
    options: ["I-White", "II-Yellow", "III-Yellow", "It exceeds all categories and may not be carried"],
    answer: 1,
  },
  {
    q: "Three radioactive packages with transport indices of 2, 3 and 3.5 are loaded in the same place. What is the effect?",
    options: [
      "The highest single TI of 3.5 governs the separation distance",
      "The indices are additive, giving 8.5, which requires a greater separation distance",
      "TI does not apply once packages are consolidated",
      "The average of 2.83 governs",
    ],
    answer: 1,
  },
  {
    q: "While approaching an aircraft hold carrying radioactive material, the radiation level increases significantly. What is the correct action?",
    options: [
      "Proceed quickly and unload the package",
      "Stop, back away, obtain qualified assistance and let them handle the situation",
      "Open the hold to ventilate before proceeding",
      "Measure the package surface before deciding",
    ],
    answer: 1,
  },
  {
    q: "Which lithium battery UN entries are forbidden as cargo on passenger aircraft when shipped alone?",
    options: ["UN3091 and UN3481", "UN3480 and UN3090", "All four entries", "None"],
    answer: 1,
  },
  {
    q: "Lithium ion cells shipped alone must be offered at what state of charge?",
    options: [
      "Fully charged, to demonstrate function",
      "Not exceeding 30% of rated capacity",
      "Not exceeding 50% of rated capacity",
      "Fully discharged",
    ],
    answer: 1,
  },
  {
    q: "Why can a lithium battery fire not be extinguished by an aircraft cargo hold Halon system?",
    options: [
      "Halon is ineffective above 200 °C",
      "A battery in thermal runaway produces its own oxygen, so there is no combustion chemistry for the Halon to interrupt",
      "The holds are not fitted with Halon",
      "It can be extinguished, given sufficient discharge",
    ],
    answer: 1,
  },
  {
    q: "A consignment of damaged or recalled lithium batteries is presented for air transport. What is the position?",
    options: [
      "Acceptable cargo aircraft only with double packaging",
      "Forbidden for air transport unless specifically approved",
      "Acceptable at reduced state of charge",
      "Acceptable as excepted quantities",
    ],
    answer: 1,
  },
  {
    q: "What must be entered in the \"handling information\" box of the air waybill for a dangerous goods consignment?",
    options: [
      "The UN number and packing group",
      "\"Dangerous goods as per attached shipper's declaration\", and where applicable \"CARGO AIRCRAFT ONLY\" or \"CAO\"",
      "The proper shipping name and net quantity",
      "The shipper's emergency contact number",
    ],
    answer: 1,
  },
  {
    q: "Dangerous goods are in a consignment together with non-dangerous goods. What additional information is required on the air waybill?",
    options: [
      "The value of the dangerous goods portion",
      "The number of pieces of dangerous goods, indicated before or after the declaration statement",
      "A separate air waybill for the dangerous goods",
      "Nothing additional",
    ],
    answer: 1,
  },
  {
    q: "Who is responsible for the accuracy of the information on the air waybill?",
    options: [
      "The airline that issues it",
      "The shipper — it must be completed by the shipper or in his name, and he is responsible for damage or injury resulting from false information",
      "The IATA agent completing it",
      "The consignee",
    ],
    answer: 1,
  },
  {
    q: "What is a neutral air waybill?",
    options: [
      "An air waybill for non-hazardous cargo only",
      "A standard air waybill without identification of an issuing carrier, allowing forwarders to avoid holding carrier-specific stock",
      "An air waybill issued by a freight forwarder acting as principal",
      "An air waybill used only for excepted quantities",
    ],
    answer: 1,
  },
  {
    q: "A shipper presents a consignment that does not satisfy all the requirements. What must the acceptance agent do?",
    options: [
      "Accept it and note the discrepancy on the NOTOC",
      "Refuse it until the carrier is satisfied that all details are in order",
      "Accept it if the shortfall is documentary rather than physical",
      "Accept it and report the shipper to the authority",
    ],
    answer: 1,
  },
  {
    q: "A package is found to be leaking after it has been loaded on the aircraft. What must the operator do?",
    options: [
      "Note it and continue, provided the leak is small",
      "Remove it, or arrange its removal, and thereafter ensure the remainder of the consignment is in proper condition and no other package has been contaminated",
      "Reposition it away from other cargo",
      "Seal the package and offload at destination",
    ],
    answer: 1,
  },
  {
    q: "How must packages bearing the \"Cargo aircraft only\" label be loaded?",
    options: [
      "In the rearmost hold in all cases",
      "So that a crew member or other authorised person can see, handle and, where size and weight permit, separate them from other cargo in flight",
      "In a sealed unit load device",
      "Adjacent to the flight deck access",
    ],
    answer: 1,
  },
  {
    q: "What is the twofold purpose of the NOTOC?",
    options: [
      "To record freight charges and confirm customs clearance",
      "It is a legal document certifying the regulations have been complied with, and it informs the pilot in command of what has been loaded, how and where",
      "To notify the consignee and the destination handling agent",
      "To record the acceptance check and the shipper's certification",
    ],
    answer: 1,
  },
  {
    q: "Which of these must appear on the NOTOC?",
    options: [
      "The shipper's VAT number and the freight rate",
      "The proper shipping name, UN/ID number, class or division, subsidiary risks, packing group, number of packages and location, and for radioactive material the category and transport index",
      "The packing instruction number and the drop test height",
      "The consignee's contact details only",
    ],
    answer: 1,
  },
  {
    q: "Under Annex 18 Chapter 11, what must each Contracting State establish?",
    options: [
      "A national dangerous goods training academy",
      "Inspection, surveillance and enforcement procedures, including provisions for inspecting documents, cargo and operators' practices",
      "A compensation scheme for dangerous goods incidents",
      "A register of all dangerous goods shipments",
    ],
    answer: 1,
  },
  {
    q: "Does completing this course qualify a learner to perform an acceptance check and sign a NOTOC?",
    options: [
      "Yes, on successful completion",
      "No — those functions require current, formally assessed dangerous goods training under a programme approved by the State of the Operator",
      "Yes, for non-radioactive shipments only",
      "Yes, provided a supervisor countersigns",
    ],
    answer: 1,
  },
];

export const us242986Practical = {
  title: "Work the Acceptance Check",
  description: `Four assessed exercises built around the acceptance function. None involves accepting a live consignment, and the brief states that explicitly.

**Part 1 — Documentation verification.** Learners receive completed Shipper's Declarations and air waybills and must verify each against the Dangerous Goods List: is the proper shipping name correct and in the right form, is the UN number right, do the class, subsidiary risk and packing group match the entry, is the quantity within the limit for the aircraft type booked, is the packing instruction correct, is the handling information box completed properly, and was the declaration signed by the right party.

Several contain deliberate errors — a trade name used as a PSN, a missing technical name on an n.o.s. entry, a cargo-aircraft quantity on a passenger booking, a declaration signed by a forwarder.

**Part 2 — Package inspection.** Given photographs or descriptions, learners identify defects: missing or damaged hazard labels, primary and subsidiary labels confused, missing CAO label, missing orientation labels, absent UN specification marking, leakage or staining, and package condition inconsistent with the declared contents.

**Part 3 — Hidden dangerous goods.** Learners review a set of general cargo consignments with commodity descriptions, weights, shipper details and packaging notes, and identify which warrant a question and why. At least one contains undeclared lithium batteries.

This is the exercise that matters most. An acceptance agent's real value is noticing what is not declared.

**Part 4 — Variations and NOTOC.** Given a routing with transit points and a named operator, learners identify the applicable State and Operator variations and any additional requirements. They then draft the NOTOC content for a mixed dangerous goods load, including a radioactive consignment with its category and transport index.

Assessed on: accurate cross-reference to the Dangerous Goods List; correct application of the passenger versus cargo distinction; whether the learner refuses non-compliant consignments rather than passing them with a note; and whether hidden dangerous goods are identified.

**Learners must work from a current edition of the regulations.** Any answer taken from a figure quoted in the course notes rather than looked up is marked down, even where it happens to be correct.`,
};

export const us242986Outcomes = [
  "Explain the philosophy underpinning the carriage of dangerous goods by air and define dangerous goods as the regulations do",
  "Describe the regulatory architecture from the UN Model Regulations through Annex 18 and the ICAO Technical Instructions to the IATA DGR",
  "Explain the training and competence requirements, including CBTA and recurrent training intervals",
  "Apply the accident and incident reporting requirements, including immediate and written follow-up reports",
  "Identify the shipper's roles and responsibilities, including who may complete and sign the Shipper's Declaration",
  "Identify the operator's roles and responsibilities and the oversight function of SACAA",
  "Identify dangerous goods forbidden under any circumstances and those forbidden unless exempted",
  "Recognise hidden and undeclared dangerous goods and the commodity descriptions that conceal them",
  "Apply the provisions for dangerous goods carried by passengers and crew, and those that are the operator's property",
  "Distinguish excepted quantities from limited quantities and apply the E-code table",
  "Identify and apply State and Operator variations for a given routing and operator",
  "Classify dangerous goods into the nine classes and divisions, and identify subsidiary risks and compatibility groups",
  "Cross-reference UN and ID numbers to the Dangerous Goods List and apply packing groups",
  "Apply the specific acceptance requirements for radioactive material, including categories and transport index",
  "Identify the acceptance requirements for lithium batteries across all four UN entries",
  "Verify the air waybill and the Shipper's Declaration against the regulations",
  "Complete an acceptance checklist, inspect for damage and leakage, and prepare a NOTOC",
];

export const us242986Summary =
  "The acceptance function for dangerous goods in air transport: the philosophy of carriage, the regulatory architecture from the UN Model Regulations through Annex 18 to the IATA DGR, training and CBTA, accident and incident reporting, shipper and operator responsibilities, forbidden goods and exemptions, hidden and undeclared dangerous goods, passenger and crew provisions, excepted and limited quantities, State and Operator variations, classification and radioactive material, lithium batteries, the air waybill and Shipper's Declaration, and the acceptance check, NOTOC and document retention. This course does not qualify a learner to perform acceptance — see Module 16.";

export const us242986 = {
  code: "US-242986",
  title: "Accept & Process Dangerous Goods for Transportation by Air",
  summary: us242986Summary,
  outcomes: us242986Outcomes,
  modules: us242986Modules,
  quiz: us242986Quiz,
  practical: us242986Practical,
  passMark: 70, // 45 of 64
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Acceptance checklist walkthrough — annotated, non-radioactive
 *   2. Acceptance checklist walkthrough — radioactive, with TI and category fields
 *   3. Hidden dangerous goods prompt card — commodity descriptions and what to ask
 *   4. Lithium battery acceptance decision tree, with a "check current edition" banner
 *   5. Shipper's Declaration field-by-field guide with common errors marked
 *   6. Air waybill dangerous goods entries — handling information and nature/quantity
 *   7. NOTOC content checklist
 *   8. Variations lookup workflow — routing, overflown States, operator
 *
 * Items 1, 3 and 5 carry the most weight — they are what an acceptance agent uses.
 *
 * ── DO NOT PRINT QUANTITY LIMITS ON ANY MATERIAL ──────────────────────────
 * Every quantity limit, packing instruction number and lithium battery threshold
 * changes between editions. Materials must direct the learner to the current
 * DGR rather than reproduce numbers that will be wrong within a year and will
 * be trusted because they came from AUK.
 *
 * ── SCOPE STATEMENT — DO NOT REMOVE ───────────────────────────────────────
 * This course does not qualify anyone to perform acceptance, complete an
 * acceptance check, sign a NOTOC, or offer dangerous goods for carriage. Those
 * require current, formally assessed DG training under a programme approved by
 * the State of the Operator. Module 16 states this. Do not market the course as
 * DG certification.
 *
 * ── CORRECTIONS TO THE SOURCE MANUAL ──────────────────────────────────────
 *   1. Lithium batteries — absent. Now Module 14.
 *   2. Class 4 — "no divisions … comprises liquids", copied from Class 3, then
 *      contradicted two lines later by listing 4.1, 4.2 and 4.3. Corrected and
 *      flagged to the learner, since they may meet the old text.
 *   3. CBTA has replaced category-based training.
 *   4. Document retention — the manual cites "Chapter 384 Subsidiary
 *      Legislation" and a six-month period. That is Hong Kong law. South
 *      African retention runs through the Civil Aviation Regulations and
 *      SA-CATS-DG.
 *   5. "Chapter of Annex 8 deals with Operator Responsibility" — it is Annex 18.
 *   6. MSDS → SDS under GHS.
 *   7. e-AWB and e-DGD now widely used; the manual describes paper copies
 *      stapled to the back of the air waybill.
 *   8. Editions — DGR annual (67th for 2026), ICAO TI biennial.
 *   9. Remote and self-service check-in DG acknowledgement, described in the
 *      manual as becoming mandatory after 2013, is long since in force.
 *
 * The manual's PDF metadata carries a different unit standard's title
 * (US242983), as with others in this series.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *   - Current IATA DGR edition and ICAO TI edition
 *   - All lithium battery provisions — these change most often
 *   - Section II eligibility and any further restrictions
 *   - State and Operator variations, including post-publication addenda
 *   - SACAA Civil Aviation Regulations Part 92 numbering and SA-CATS-DG
 *   - Reporting timeframes and document retention periods
 *   - CBTA implementation status
 */
