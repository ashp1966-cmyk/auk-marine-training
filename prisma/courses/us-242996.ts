/**
 * US-242996 — Handle Dangerous Goods During Warehousing & Storage
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 242996 · elective
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * ── SCOPE STATEMENT ───────────────────────────────────────────────────────
 * This course teaches the framework for storing and handling dangerous goods
 * in a warehouse. It does not qualify a learner to classify dangerous goods,
 * sign a dangerous goods declaration, or act as a dangerous goods safety
 * adviser. Module 15 states this. Do not market it as DG certification.
 *
 * ── SOURCE AND CORRECTIONS ────────────────────────────────────────────────
 * Built from the learner manual for US 242996 (release 01/07/2009,
 * registration ended 30/06/2012). Classification, segregation logic, storage
 * controls, placarding and incident reporting are taught as the manual sets
 * them out. Corrected or added:
 *
 *   1. MSDS → SDS. The manual says "Material Safety Data Sheet" throughout.
 *      Under the Globally Harmonised System, adopted in South Africa through
 *      SANS 10234, the document is a Safety Data Sheet in a prescribed
 *      16-section format. Module 5 covers it; the change is not cosmetic,
 *      because the section order is what makes an SDS usable in an emergency.
 *   2. GHS WORKPLACE LABELLING — absent from the manual. Nine pictograms,
 *      signal words, hazard and precautionary statements. Distinct from the
 *      transport diamonds the manual teaches. Module 6.
 *   3. HAZARDOUS CHEMICAL AGENTS REGULATIONS — the Hazardous Chemical
 *      Substances Regulations the manual's era relied on were replaced by the
 *      Hazardous Chemical Agents Regulations (2021) under the OHS Act.
 *   4. LITHIUM BATTERIES — absent. Now a leading cause of warehouse fires
 *      worldwide and a storage problem distinct from a transport one.
 *      Module 11.
 *   5. TREMCARD — the CEFIC TREMCARD system the manual describes has been
 *      superseded. For South African road transport the instrument is the TREC
 *      under SANS 10232-4; internationally, ADR Instructions in Writing.
 *   6. US EPA WASTE DEFINITIONS — the manual imports US EPA hazardous waste
 *      criteria wholesale. South African waste classification runs through the
 *      National Environmental Management: Waste Act 59 of 2008 and its norms
 *      and standards.
 *   7. ERG — the US DOT Emergency Response Guidebook referenced at Annex A of
 *      SANS 10232-3 is reissued periodically and the manual's hazmat.dot.gov
 *      URL is dead.
 *   8. IMDG — current amendment, not the 2009 edition.
 *
 * The manual's PDF metadata carries a different unit standard's title
 * (US242983), as with several others in this series.
 */

export const us242996Modules = [
  {
    title: "1. Dangerous Goods in Storage",
    content: `Dangerous goods are goods which pose a risk during transport, storage and handling, and could harm people, property or the environment.

They may be solids, liquids, gases or articles. The hazards include toxic, poisonous, radioactive, explosive, flammable, corrosive, oxidising, asphyxiating, biohazardous, pathogenic and allergenic materials, plus physical conditions such as compressed gases and hot materials.

**Classification is by immediate hazard**, not long-term health effect. A substance causing cancer over twenty years but inert on a rack is not classified as a dangerous good; one that ignites at 40 °C is.

**Why storage is a different problem from transport**

Most dangerous goods training is transport training. Warehousing is not the same discipline, and the differences matter.

**Time.** A consignment is in a truck for hours and on a rack for months. Slow deterioration, seal failure, temperature cycling and label fading all become live risks.

**Quantity and concentration.** A vehicle carries one load. A warehouse may hold hundreds of pallets of incompatible materials in one fire compartment.

**Proximity.** In transport, segregation is achieved by not loading things together. In a warehouse it must be achieved by distance, barriers and layout — and the layout was usually designed before anyone knew what would be stored in it.

**People.** Pickers, forklift drivers, contractors and cleaners move through the space continuously, most of them without dangerous goods training.

**Fire load.** The single biggest warehouse risk. A fire involving stored dangerous goods can defeat the suppression system, produce toxic smoke over a wide area, and generate contaminated firewater that becomes an environmental incident in its own right.

**The regulatory backdrop**

The UN Sub-Committee of Experts on the Transport of Dangerous Goods maintains the **UN Model Regulations**, published as the *Orange Book*. These are not binding in themselves, but they are the basis of the modal instruments — IMDG for sea, ICAO TI and IATA DGR for air, ADR for road, RID for rail, ADN for inland waterway — and of national law.

The UN Recommendations cover transport. They do **not** cover manufacture, use or disposal. That gap is why warehousing sits under occupational health and safety law and national standards rather than the transport codes alone.

**The South African position, in outline**

- **Occupational Health and Safety Act 85 of 1993**, and the **Hazardous Chemical Agents Regulations** made under it
- **SANS 10228** — identification and classification of dangerous goods
- **SANS 10263** — warehousing of dangerous goods: enclosed storage areas, covered and uncovered outdoor yards
- **SANS 10232** — emergency information systems
- **National Road Traffic Act 93 of 1996**, Chapter VIII, for road transport
- **National Environmental Management: Waste Act 59 of 2008** for waste
- Local authority by-laws, particularly fire

Module 4 develops these.`,
  },
  {
    title: "2. The Nine Classes and Divisions",
    content: `Dangerous goods are grouped into nine classes on the basis of the chemical characteristics producing the risk. Each class has a diamond hazard label conveying the hazard by colour and symbol.

**Class 1 — Explosives**

| Division | Hazard |
| --- | --- |
| 1.1 | Mass explosion hazard |
| 1.2 | Projection hazard, not mass explosion |
| 1.3 | Fire hazard with minor blast and/or minor projection, not mass explosion |
| 1.4 | No significant hazard |
| 1.5 | Very insensitive substances with a mass explosion hazard |
| 1.6 | Extremely insensitive articles without a mass explosion hazard |

Class 1 also carries **compatibility groups**, lettered A to S, which determine what may be stored or loaded together. Division 1.4S is the least restricted.

**Class 2 — Gases**

| Division | Hazard |
| --- | --- |
| 2.1 | Flammable gases |
| 2.2 | Non-flammable, non-toxic gases |
| 2.3 | Toxic gases |

**Class 3 — Flammable liquids.** No divisions.

**Class 4 — Flammable solids; substances liable to spontaneous combustion; substances which emit flammable gases on contact with water**

| Division | Hazard |
| --- | --- |
| 4.1 | Flammable solids, self-reactive substances, desensitized explosives |
| 4.2 | Substances liable to spontaneous combustion |
| 4.3 | Substances which, in contact with water, emit flammable gases |

**Class 5 — Oxidising substances and organic peroxides**

| Division | Hazard |
| --- | --- |
| 5.1 | Oxidising substances |
| 5.2 | Organic peroxides |

**Class 6 — Toxic and infectious substances**

| Division | Hazard |
| --- | --- |
| 6.1 | Toxic substances |
| 6.2 | Infectious substances |

**Class 7 — Radioactive material.** No divisions.

**Class 8 — Corrosive substances.** No divisions.

**Class 9 — Miscellaneous dangerous substances and articles.** Includes asbestos, dry ice, environmentally hazardous substances, magnetised material, polymeric beads, life-saving appliances, and **lithium batteries** — see Module 11.

**Primary and subsidiary hazards**

Many materials have more than one hazard. **Methyl vinyl ketone (UN1251)** has a primary hazard of 6.1 — it is poisonous — and is also flammable and corrosive.

For storage this matters more than for transport, because a subsidiary risk changes who a material may be stored beside. **Where a package bears a subsidiary risk label, the segregation appropriate to that subsidiary hazard applies where it is more stringent than the primary.**

Not every country uses identical graphics. Some use symbols without English wording, or wording in the national language.

**Not all dangerous goods are marked as such.** A large consignment of unmarked toxic substances stored near foodstuffs, or magnetised material beside sensitive electronics, is a real risk that looks like nothing at a glance. Classification is what tells you; appearance is not.`,
  },
  {
    title: "3. Identification: UN Numbers, Shipping Names and Packing Groups",
    content: `**The UN number**

A four-digit code identifying a substance internationally. UN1993 is flammable liquid, n.o.s., anywhere in the world. It survives language, so it is what an emergency responder looks for first.

**Generic entries.** Less common substances move under generic codes such as **UN1993 flammable liquid, not otherwise specified** or **UN1954 flammable compressed gas, N.O.S.** — *n.o.s.* meaning not otherwise specified. Generic entries must be supplemented with the **technical names** of the hazardous constituents.

For a warehouse this is important: "UN1993" on a drum tells you the class but not what is in it. The technical name and the SDS do.

**The Proper Shipping Name**

The single correct description for transport purposes. Found in the Dangerous Goods List of the applicable modal code, **printed in capital letters** — any lower-case text is descriptive only and is not part of the name. **Trade names are not acceptable.**

**Packing groups**

Packing groups denote the degree of danger within a class:

| Group | Degree of danger |
| --- | --- |
| **I** | Great danger |
| **II** | Medium danger |
| **III** | Minor danger |

Classes 1, 2 and 7, and Division 6.2, do not assign packing groups.

For storage, the packing group has a specific consequence in segregation: **where one of two incompatible materials is Packing Group I or II, a greater separation distance or another means of segregation is recommended.**

**Combustible liquids**

A category worth knowing because it sits outside the nine classes but behaves like Class 3 in a fire. A combustible liquid has a flashpoint **above** the Class 3 threshold — it is not classified as a dangerous good for transport, but in a warehouse it contributes fire load and appears on segregation charts in its own right.

Treat a combustible liquid as a **fire risk substance** for segregation purposes.

**What identification gives you**

Before you can decide where something may be stored, you need four facts:

1. The **class and any divisions**
2. Any **subsidiary risks**
3. The **packing group**, where assigned
4. The **specific substance**, from the SDS

Three of those come off the package. The fourth comes from the SDS, and Module 5 explains why you cannot skip it.`,
  },
  {
    title: "4. The South African Legal Framework",
    content: `**The Occupational Health and Safety Act 85 of 1993**

The primary statute. It provides for the health and safety of persons at work and of persons in connection with the use of plant and machinery, and for the protection of persons other than those at work against hazards arising from work activities.

Under it sit regulations. The one that governs chemical exposure in a warehouse is the **Hazardous Chemical Agents Regulations**, which replaced the older Hazardous Chemical Substances Regulations that material of the 2009 era relied on. Anyone working from a pre-2021 reference is working from a superseded regulation.

The HCA Regulations impose duties on the employer covering assessment of exposure, the hierarchy of control, exposure limits, monitoring, medical surveillance, information and training, and record keeping.

**SANS standards that apply to storage**

| Standard | Subject |
| --- | --- |
| **SANS 10228** | Identification and classification of dangerous goods for transport |
| **SANS 10229** | Packaging and large packaging for dangerous goods |
| **SANS 10231** | Transport of dangerous goods — operational requirements for road |
| **SANS 10232** | Emergency information systems (four parts) |
| **SANS 10234** | GHS classification and labelling of chemicals |
| **SANS 10263** | Warehousing of dangerous goods — enclosed storage areas, covered and uncovered outdoor yards |

**SANS 10263 is the warehousing standard**, and it is the one most directly relevant to this course.

**The status of a code of practice**

This distinction is frequently misunderstood.

**The provisions of an approved code of practice are not mandatory.** A person may comply with the underlying regulation in some other way, provided the alternative method also fulfils the requirement. **A person cannot be prosecuted simply for failing to comply with a code of practice.**

**However** — in legal proceedings, failure to observe a relevant approved code can be used as evidence that a person or company contravened or failed to comply with the law. If you have not adopted the method in the code, **it is up to you to show the legal requirement was met another way.**

So a code should be followed unless there is an alternative that demonstrably meets the regulation. "We didn't follow SANS 10263" is a defensible position only if you can show what you did instead and why it was adequate.

**The wider legislative field**

Dangerous goods touch a large number of statutes: the Hazardous Substances Act 15 of 1973, Explosives Act 26 of 1956, National Environmental Management Act 107 of 1998, NEM: Waste Act 59 of 2008, NEM: Air Quality Act 39 of 2004, National Water Act 36 of 1998, Nuclear Regulator Act 47 of 1999, Compensation for Occupational Injuries and Diseases Act 130 of 1993, Disaster Management Act 57 of 2002, National Road Traffic Act 93 of 1996, Fire Brigade Services Act 99 of 1987 — and local authority by-laws, particularly on fire.

You are not expected to know these. The point of the list is that "comply with national legislation" is too vague to be an instruction. **The practical route is: identify the goods, consult the SDS, apply SANS 10263 and the HCA Regulations, and check your local fire by-law.**

**Waste**

Where dangerous goods become waste — expired stock, contaminated spill material, damaged packages — classification and disposal run through the **NEM: Waste Act** and its norms and standards, not the transport codes. Older material importing US EPA criteria is describing a different jurisdiction.`,
  },
  {
    title: "5. From MSDS to SDS",
    content: `**This module corrects the largest single change since the source manual was written.**

The manual refers throughout to the **Material Safety Data Sheet (MSDS)**. Under the **Globally Harmonised System of Classification and Labelling of Chemicals (GHS)**, adopted in South Africa through **SANS 10234**, the document is a **Safety Data Sheet (SDS)** in a prescribed 16-section format.

This is not a rename. The old MSDS had no mandated structure, so the fire-fighting information might be on page 1 of one sheet and page 4 of another. The SDS has a fixed section order, which is what makes it usable by someone under pressure who has never seen that particular sheet before.

**The sixteen sections, in order**

| § | Content |
| --- | --- |
| 1 | Identification of the substance and supplier |
| 2 | Hazards identification |
| 3 | Composition and information on ingredients |
| 4 | First-aid measures |
| 5 | Fire-fighting measures |
| 6 | Accidental release measures |
| 7 | **Handling and storage** |
| 8 | Exposure controls and personal protection |
| 9 | Physical and chemical properties |
| 10 | Stability and reactivity |
| 11 | Toxicological information |
| 12 | Ecological information |
| 13 | Disposal considerations |
| 14 | **Transport information** |
| 15 | Regulatory information |
| 16 | Other information, including date of revision |

**Learn sections 4, 5, 6, 7 and 10 by their numbers.** In an incident, being able to say "section 5" rather than searching sixteen pages is the difference between a fast response and a slow one.

**The five sections a warehouse actually lives in**

**§7 Handling and storage** — the section this whole course is about. Incompatibilities, temperature limits, ventilation, container material.

**§10 Stability and reactivity** — conditions to avoid, incompatible materials, hazardous decomposition products. This is where you find out that a material reacts with water, or degrades above 30 °C.

**§5 Fire-fighting measures** — suitable and unsuitable extinguishing media. The word **unsuitable** is the one that matters; using water on a Division 4.3 material makes the incident worse.

**§6 Accidental release measures** — spill response, containment, clean-up.

**§4 First-aid measures** — what to do for the person, before the ambulance.

**Where SDSs must be kept**

**An SDS must be held for every chemical stored and used on site.** It must be kept **in the same location as the chemicals**, so it is available where the incident happens — and also in a **central, separate location**, so a fire in the store does not destroy the only copy.

That duplication is deliberate and people skip it. A folder that burned with the racking is not an SDS system.

**Currency**

SDSs must be kept **current**. Suppliers and importers are required to review them whenever:

- the formulation of a product changes
- new information on hazardous properties or health effects becomes available
- it becomes apparent the information may not be accurate, current or comprehensive

**Obtain the SDS from the manufacturer or supplier**, and check the revision date in section 16. An SDS more than a few years old is worth requesting again.

**Where dangerous goods are unstable except under controlled conditions**, the SDS must give full details of those conditions and specify the recommended proportion and safe limits for every stabilising ingredient. That information does not exist anywhere else.

**The habit**

Before anything is racked: read section 7, read section 10, and check section 5 for unsuitable media. Three sections, two minutes, and it is the whole basis of a defensible storage decision.`,
  },
  {
    title: "6. GHS Labelling in the Workplace",
    content: `A warehouse deals with **two labelling systems at once**, and confusing them is common.

**Transport labels** — the class diamonds from Module 2. They communicate the hazard in transit, and they appear on packages and on transport units.

**GHS workplace labels** — the supplier label on the container, communicating hazard to the person handling it. Different symbols, different purpose.

Both may be on the same drum. Neither replaces the other.

**The GHS label elements**

**Pictogram** — a red-bordered diamond with a black symbol on white. Nine in total: explosive, flammable, oxidising, compressed gas, corrosive, acute toxicity (skull and crossbones), health hazard (the silhouette with a starburst), harmful/irritant (exclamation mark), and environmental hazard.

**Signal word** — **DANGER** for more severe hazards, **WARNING** for less severe. One or the other, never both on the same label.

**Hazard statements** — standardised phrases describing the nature of the hazard, coded H-plus-three-digits. H225 is "highly flammable liquid and vapour."

**Precautionary statements** — standardised phrases on prevention, response, storage and disposal, coded P-plus-three-digits.

**Product identifier** and **supplier details**.

**Why the distinction matters in a store**

The transport diamond tells you the class, which drives segregation. The GHS pictogram tells you the health and physical hazard to the person picking it up, which drives PPE and handling.

**The skull-and-crossbones and the exclamation mark are both "toxic" in ordinary speech and mean very different things in GHS** — acute toxicity that can kill, versus an irritant. A picker treating them alike is either over-protected or under-protected.

**Decanted and repackaged material**

This is where workplaces fail. When a substance is decanted into a smaller container for use, **the new container must be labelled**. An unlabelled decant bottle is the classic warehouse incident: nobody knows what it is, so nobody knows what to do when it spills, and the SDS cannot be found because the product name is unknown.

**Faded and damaged labels**

Labels fade in sunlight and abrade in handling. A container whose label is illegible has effectively become an unknown substance, and unknown substances are expensive to deal with — they cannot be used, moved or disposed of until identified.

**Housekeeping rules that follow:**

- Cargo must be stored so **labels and package markings face outward** and can be read.
- "This side up" labels and orientation arrows **mean exactly that** and must be complied with.
- Remove or obliterate **old markings** on re-used packaging. A drum carrying two conflicting labels directs a responder to the wrong answer.
- Inspect labels on a routine cycle and re-label before they become unreadable.`,
  },
  {
    title: "7. Risk Assessment for Storage",
    content: `**A risk assessment should be carried out for each storage location.** It must consider not only the dangerous goods themselves but also the nature of other cargo stored alongside them.

**What the assessment must address**

- identification of the dangerous goods held
- mode of transport in and out
- site classification
- potential spillage or leakage
- fires and explosions
- incompatibility and segregation
- machinery used in or around the storage area — welding equipment produces flame
- the impact of an incident on the surrounding area, including adjacent buildings
- risks associated with occasional work such as repairs and maintenance
- security of the goods stored
- provision of safety equipment and PPE

**External hazard sources**

Activities and structures not directly involved in the storage may still constitute a hazard to it:

- adjacent dangerous goods storages
- proximity of other work areas, including on-site offices
- other activities on the premises — plant and machinery operation, vehicle movement, deliveries of other hazardous materials, personnel movement in normal and emergency conditions, visitor access, portable ignition sources
- fire risks, including concentrations of combustible material or uncontrolled vegetation on or off the premises
- activities and installations on neighbouring premises
- weather — temperature extremes, wind, lightning, rainfall and flooding potential
- off-premises features: main roads, railway lines, airports, gas pipelines, water mains, high-voltage lines, radio and mobile transmitters
- **proximity of sensitive facilities** — schools, hospitals, child and aged care, theatres, shopping centres, residences

That last one determines the consequence side of the assessment. The same drum of flammable liquid carries a different risk 50 metres from a school than it does on an industrial estate.

**Physical properties that drive the hazard**

From the SDS, section 9 and section 10:

physical state · flashpoint · viscosity · density · particle size · vapour pressure · solubility and pH · reactivity · boiling and freezing points · electrical and heat conductivity · nature and concentration of combustion products

**Vapour pressure and flashpoint together** tell you whether a flammable atmosphere can form in the store at ambient temperature. That is the question a warehouse assessment most needs answered.

**Factors in choosing a storage method**

- the severity of the hazard — likelihood of injury or property damage
- how severe the injury or damage would be, and how many people could be affected
- the state of knowledge about the hazard and how it may be removed or mitigated
- what manufacturers and suppliers know about it
- methods other workplaces use for similar goods
- information available from industry bodies and government agencies
- availability and suitability of controls for these premises and these employees
- the cost of the control, weighed against the benefit gained

**Review.** A risk assessment is not a document you write once. Stock changes, neighbours change, and the assessment that was adequate for what you held last year may not cover what you hold now.`,
  },
  {
    title: "8. Segregation and Compatibility",
    content: `**Compatible**, in relation to two or more substances, means they will not react together to cause a fire, explosion, harmful reaction, or the evolution of flammable, toxic or corrosive vapours.

**Two substances are incompatible when storing them together may result in undue hazard in the case of leakage, spillage or any other accident.**

**Three factors to consider**

**Compatibility** — will they react.
**Mixed packing** — packed in the same receptacle.
**Mixed loading** — stored or loaded in the same unit.

**Reactions to consider**

**Physical** — dilution, dissolution, abrasion, phase change, leaching, adsorption. Heat generated from acid mixing with water is a physical reaction that injures people.

**Chemical** — a chemical change in one or more goods on contact. An oxidising agent such as pool chlorine mixing with a hydrocarbon such as oil or brake fluid.

**Worked incompatibilities**

- **Class 5.1 oxidising agents and flammable materials** — separate buildings, separated by enough distance that an incident in one does not involve the other
- **Concentrated acids and alkalis** — reaction hazard
- **Cyanides and acids** — generates toxic gas
- **Calcium hypochlorite and isocyanurate pool chlorine products** — reaction and fire hazard
- **Toxic gases ammonia and chlorine** — must be segregated, risk of explosion
- **Class 4.3 and anything aqueous** — including solutions that are not themselves dangerous goods

**Class-level rules**

**Classes 1 and 7 should be deemed incompatible with all other dangerous goods.**

**Class 6.1 toxic substances must be segregated from foodstuffs.** Substances marked as or known to be toxic, Packing Groups I, II and III, must not be carried in the same transport unit as substances known to be foodstuffs, feeds or other edible substances for human or animal consumption. Relaxation may be allowed for PG II and III where the competent authority is satisfied packing and segregation prevent contamination.

**A unit that has carried toxic substances must be inspected for contamination before re-use**, and a contaminated unit must not be returned to service until decontaminated.

**Class 2 gases** are generally not recommended for storage with any other class, particularly flammables — risk of flame impingement. Corrosives damage cylinder walls. In a fire, cylinders need copious water to stay cool.

**Class 6.1** is not recommended for storage with fire-risk goods or gas cylinders; in a fire the toxic material is liberated and spread by the heat or by cylinder explosion.

**Two or more goods within the same class with incompatible subsidiary risks must be kept apart.**

**Class 4.3 must not be stored where water or foam is the fire suppression medium.**

**Segregation methods, in ascending order**

1. **Separation distance** — a documented gap. 1.5 m is generally sufficient to prevent contamination in minor storage; segregation charts commonly specify 3 m or 5 m depending on classes and packing group.
2. **Impervious barrier** — a physical bund or wall.
3. **Fire-rated partition** — for the more severe pairings.
4. **Separate detached building** — for organic peroxides, highly pyrophoric Class 4.2, and Class 4.3 where water-based suppression cannot be excluded.

**Measure liquid distances from the edge of the spill catchment area, not from the package.** A 3 m gap between two drums with a shared bund is not 3 m of segregation.

**Packing group escalates the requirement.** Where one of the incompatible materials is PG I or PG II, use greater distance or a more robust method.

**Oxidisers need segregating from combustibles that are not dangerous goods at all** — polymeric beads, cotton bales, excess packing material. Chlorine and other halogens are potent oxidisers even where no oxidiser subsidiary risk is assigned.

**On segregation charts**

Compatibility charts are useful and are only a guide. **They do not replace the SDS or the risk assessment.** Goods with different UN numbers within the same class may be incompatible — ammonium nitrate and calcium hypochlorite are both Class 5.1 and are incompatible with a list of other 5.1 materials.

**Check the SDS, section 10, every time.** The chart tells you the general rule; the SDS tells you about the substance in front of you.`,
  },
  {
    title: "9. Warehouse Controls",
    content: `The physical controls that make a dangerous goods store defensible.

**Ventilation**

Provide adequate natural or mechanical ventilation sufficient to prevent a flammable or harmful atmosphere forming. The level and type depend on the goods and whether they are stored or used.

If relying on natural ventilation:

- **Vents at floor level and near the ceiling.** Most dangerous goods gases and vapours are heavier than air and will vent at floor level; high vents let fresh air circulate in.
- **Vent directly to outside**, never into another room.
- **A useful guide: at least 1 m² of vent area per 50 m² of floor area.** The actual requirement depends on room size and restrictions to free air circulation.

Ventilation may be dispensed with only where a **documented** risk assessment shows the likelihood of a release into the atmosphere is negligible.

**Ignition control**

Keep ignition sources away from flammable or combustible goods — classes or subsidiary risks 2.1, 3, 4.1, 4.2, 4.3, and combustible liquids.

**Naked flames from direct-fired heaters, and flames from maintenance work, at least 5 metres from the goods.** Store away from heating appliances.

Where stored goods can generate flammable or explosive atmospheres, use **compatibly safe or flameproof electrical equipment**.

Hot work — welding, cutting, grinding — needs a permit system in any dangerous goods area.

**Spill containment**

Prevent any potential flow of dangerous goods to other parts of the premises, to a watercourse, or to the property boundary. Channels and land slope are the usual means.

**Containment capacity must be sufficient to hold the spillage**, and for transfer operations at least the quantity of the largest container.

Keep clean-up equipment on the premises able to cope with spills from the **largest package** kept there. Clean up spills and leaks immediately.

**Contaminated, spilt or leaked goods should not be returned to their original packaging** except for disposal, or where it is known this will not increase the risk. Dispose of waste from a clean-up safely.

Any container or equipment used for dangerous goods and no longer needed for that purpose must be **cleaned free of dangerous goods or otherwise made safe.**

**Fire protection**

- A water supply available at a nearby location for emergency use
- Portable extinguishers **appropriate to the type and quantity** of goods, at or near the storage
- All fire protection equipment maintained in operable condition
- Emergency management procedures in place — fire wardens, evacuation points

**Note the "appropriate" qualifier.** A water extinguisher beside Class 4.3 goods is worse than no extinguisher, because somebody will use it.

**Housekeeping and access**

- Keep areas clear of combustible matter and refuse
- Outdoor storage: clear combustible vegetation for **at least 3 metres**
- Do not block entry or access routes
- Do not store where goods could hinder escape in a fire, spill or leak
- **Secure storage areas against unauthorised entry**
- Provide sufficient lighting to allow work to be done safely
- Display all relevant **emergency contact telephone numbers** prominently

**Placards on the store**

A **placard** is a notice posted in a place or attached to a vehicle. A **label** is a printed sign affixed to a package. They are not interchangeable terms.

**Placards must be installed where dangerous goods are stored for an extended period.** They give the fire brigade the information they need before they enter — which is the entire point, and the reason placards must be visible from outside.`,
  },
  {
    title: "10. Storage Practice",
    content: `The day-to-day rules. Most of these come directly from a supplier's SDS section 7, and the general ones below apply where the SDS is silent.

**Follow the SDS first.** Where the label or SDS specifies measures or equipment for storage and handling, adopt those. The general rules that follow are a floor, not a ceiling.

**Racking and stacking**

- Store packages on **surfaces resistant to attack by their contents if spilt**, and which will not react dangerously with spilt goods
- Stow packages so the risk of **falling or being dislodged** is minimised
- Store so that **leakage cannot adversely affect other dangerous goods** in the area
- **Liquid dangerous goods must not be stored above solid dangerous goods** in paper or absorbent packaging
- **Glass containers of liquids at lower levels** — a dropped glass container from height is a spill and an injury
- **Solid dangerous goods should not be in direct contact with the floor surface**, to avoid contact with liquids that reach floor level

**Special storage conditions**

Where goods require particular conditions to remain stable — stabilisers, refrigeration — **make regular documented checks that those conditions are maintained.** A refrigeration failure over a weekend is how self-reactive materials become incidents.

**Aerosols**

Where aerosols are stored together in outer packaging, **enclose the storage in a strong mesh enclosure** to reduce the risk from projectiles in a fire. A fire in an aerosol pallet launches cans across the building.

**Decanting and transfer**

Where goods are transferred by pumping, decanting, dispensing or filling, ensure:

- **Spill containment able to hold at least the quantity of the largest container**
- The container being filled and any transfer equipment is **earthed** where static could be generated and there is risk of igniting flammable vapours
- The transfer **reduces vapour generation** and avoids splashing or spillage
- The place of transfer is **set aside for the purpose**, **adjacent to but not within** the storage area, **free of ignition sources**, free of obstruction and with room to work
- **Decontamination materials and clean-up equipment kept close by**
- The receiving container is **suitable and cannot be damaged** by the goods — not a plastic container that could be softened or embrittled

And, from Module 6: **label the decanted container.**

**Stock management**

- **Store minimal quantities** — quantities sufficient for foreseeable use, not for convenience
- **Check containers, seals and stoppers regularly for deterioration** and replace as necessary
- **Regularly review chemicals in storage and correctly dispose of those no longer required**

That last one is the most commonly ignored control in the industry. Warehouses accumulate part-used, unlabelled and expired chemicals that nobody will claim, and which become an expensive disposal problem and a live hazard in a fire.

**Transport staging areas**

Where goods are assembled ready for transport, ensure:

- The holding period **does not exceed five consecutive working days**
- All goods are packaged or contained, marked, stowed, secured, placarded, segregated and documented
- Incompatible goods segregated **according to the particular transport mode**
- Goods kept apart from foodstuffs, including stock feed
- Ignition sources controlled, spill provision made, appropriate fire protection provided

**Loading and securing**

Correct loading and stowage — lashing and securing to prevent movement — prevents accidents arising from load shift. That applies in the racking as much as in the vehicle.`,
  },
  {
    title: "11. Lithium Batteries in Storage",
    content: `**Absent from the source manual entirely, and now among the most significant fire risks in warehousing worldwide.**

**Why a stored battery is a different problem from a transported one**

A battery in **thermal runaway** generates its own oxygen. It cannot be smothered. The fire will burn until the stored energy is spent, propagating cell to cell and pallet to pallet.

In transport, the exposure is one consignment for a limited period. In a warehouse you may hold thousands of cells in one fire compartment, on racking, above and below other stock, for months.

**Standard sprinkler systems are frequently inadequate** for lithium battery storage at volume. Water cools surrounding materials and slows propagation, but does not stop a cell already in runaway.

**Where they turn up**

Not just as stock. Forklift and pallet-truck batteries. Charging stations. Scanners, tablets and handhelds on charge overnight. Returned and damaged customer goods awaiting assessment. E-waste awaiting disposal.

**A warehouse that stocks no batteries may still be full of them.**

**The storage controls that matter**

**State of charge.** Cells held at high charge carry more energy to release. Where the goods allow it, store at a reduced state of charge.

**Segregation and fire compartmentation.** Treat bulk lithium battery storage as a distinct fire risk requiring separation from other stock, and consider detached storage for large volumes.

**Damaged, defective and recalled cells.** These are the highest-risk items in the building and they arrive routinely through returns. **Quarantine them separately, in fire-resistant containment, away from the main stock, and move them out quickly.** A swollen cell in a returns cage beside general stock is an incident waiting for a warm day.

**Charging areas.** Designate them. Do not charge on wooden pallets or beside combustible stock. Do not leave charging unattended overnight without detection. Fit thermal detection where the volume justifies it.

**Temperature.** Heat accelerates degradation and lowers the threshold for runaway. A steel-roofed warehouse in a Gauteng summer is a materially worse storage environment than a specification sheet assumes.

**Detection.** Early detection is the only effective intervention. Conventional smoke detection may not respond until the fire is established; thermal and off-gas detection respond considerably earlier.

**Firewater.** A lithium battery fire takes very large volumes of water over a long period, and that water becomes contaminated. Containment capacity and the environmental consequence both need planning before the event.

**The undeclared problem**

Lithium batteries arrive in warehouses inside equipment, described as "electronics", "spares" or "samples", by shippers who often do not know they are dangerous goods.

If you receive a consignment described vaguely, from a shipper you do not know, containing anything battery-powered, it is worth a question before it goes on a rack. The cost of asking is a phone call.

**Insurance and regulatory attention**

Insurers have tightened lithium battery storage conditions materially, and local fire by-laws are following. A warehouse holding volume battery stock without declaring it to its insurer may find a fire claim declined.`,
  },
  {
    title: "12. Workplace Hazards, PPE and the Hierarchy of Control",
    content: `**The five kinds of workplace hazard**

**Chemical** — liquids, vapours, gases or dust. Direct contact causes skin irritation or burns; inhalation affects the lungs and the ability to breathe; and they can cause fires or explosions.

**Physical** — temperature extremes, noise, vibration. Heat causes heat sickness and dehydration; cold affects concentration; noise damages hearing.

**Biological** — germs passed between people, infected sharps, contaminated objects. A risk for those working with sewage or animals.

**Psychosocial** — work pressure, unrealistic deadlines, leading to stress, depression and anxiety.

**Ergonomic** — cramped spaces, poor seating, prolonged standing. Backache, wrist strain, shoulder pain.

**Hazardous substances in particular**

Substances hazardous to health are those that are **toxic, very toxic, corrosive, harmful or irritant**. They may be solids, liquids, gases, mists or fumes. Biological agents and dusts in substantial concentrations count too.

**Routes of entry: inhalation, ingestion, and contact through skin and mucous membranes**, including the eyes.

Effects may be immediate or delayed. A cleaner splashing bleach on skin suffers a burn with little long-term effect in most cases — but a splash in the eye can permanently damage sight. A carpenter exposed to wood dust for years may develop lifelong lung problems.

**How to tell if a health problem is work-related**

- Did it start only after commencing this kind of work?
- Does it get worse at work and better on holiday?
- Do other workers in the same place have similar problems?

**The hierarchy of control**

Applied in order. Each step is preferred over the ones below it.

**1. Eliminate** — do not use the hazardous substance, or avoid the procedure causing exposure.

**2. Substitute** — change the material or working practice to one less hazardous.

**3. Enclose** — contain the substance or process in a closed system.

**4. Control** —
- **Engineering controls**: local exhaust ventilation, or increased dilution ventilation to lower atmospheric concentration
- **Procedural controls**: reduce numbers exposed or time spent, carry out in specified areas, routine monitoring and health surveillance

**5. Personal protective equipment** — gloves, impervious aprons or overalls, respiratory protection.

**PPE is last, and it is last for a reason.** It protects one person, only while worn correctly, and fails silently. Control the source first; control between source and worker second; PPE as a last resort or an additional measure.

**Employer duties**

- Design processes to minimise emission, release and spread
- Consider **all** routes of exposure when developing controls
- Make controls proportionate to the health risk
- Choose the most effective and reliable options
- Where adequate control cannot be achieved otherwise, provide suitable PPE **in combination with** other measures
- **Check and review all control measures regularly** for continuing effectiveness
- **Inform and train all employees** on the hazards, the risks and the use of controls
- Ensure the introduction of controls does not increase overall risk

**Risk assessment is the employer's responsibility.** It may be delegated to someone with knowledge of the process and the regulations, and outside expertise called in where needed — but the existing knowledge in the workplace should be used before deciding outside help is necessary.

**Most simple assessments can be done in-house:** list all substances and products, gather information on each and the associated risks, and read labels, catalogues and safety data sheets.

**PPE for dangerous goods handling**

Appropriate to the goods being handled, worn when handling, and **periodically checked and maintained**. Gloves compatible with the specific chemical — nitrile is not universal — eye protection, and respiratory protection where the SDS section 8 requires it.`,
  },
  {
    title: "13. Preparing Goods for Transport: Documentation",
    content: `Goods leaving the warehouse need documentation, and the warehouse is usually where errors originate.

**Supplier and package marking**

The supplier of dangerous goods should ensure the goods are packed in accordance with the applicable regulations, with the packaging in sound condition and compatible with the contents, and in accordance with any specific storage and handling requirements from the manufacturer.

Packages prepared for transport requiring marking must carry the **South African shipper contact name and address**, plus for each type of dangerous goods:

- the **Proper Shipping Name**
- the **UN Number**
- the **Class label**
- all applicable **Subsidiary Risk labels**

**Inner packagings**, where marked, carry the proper shipping name or technical name, the class label and applicable subsidiary risk labels.

**The dangerous goods transport document**

The consignor who offers dangerous goods for transport must describe them on a transport document. It may be in any form provided it contains all required information.

- If both dangerous and non-dangerous goods are listed, **the dangerous goods are listed first or otherwise emphasised**
- It may run to more than one page, **consecutively numbered**
- Information must be **easy to identify, legible and durable**
- **Name and address of consignor and consignee**
- **Date** the document was prepared or given to the initial carrier

For each substance or article:

- **UN number preceded by "UN"**
- **Proper shipping name**
- **Class or Division**, including for Class 1 the compatibility group letter. Subsidiary hazard class or division numbers follow the primary, **in brackets**
- **Packing group**, where assigned, which may be preceded by "PG"

Plus:

- Generic and n.o.s. descriptions **supplemented with technical names**
- Waste dangerous goods: the proper shipping name **preceded by the word "WASTE"**, unless already part of the name
- **Total quantity** by volume or mass for each item bearing a different name, UN number or packing group. For Class 1, the **net explosive mass**. For salvage packagings, an estimate. The **number and kind of packagings** — drum, box — also indicated
- A statement of any **actions required of the carrier**, such as emergency arrangements
- A **certification or declaration** that the consignment is acceptable for transport and the goods are properly packaged, marked, labelled and in proper condition

**Who signs**

**The Shipper's Declaration for Dangerous Goods must be completed and signed by the shipper.** Neither the forwarder, nor the agent, nor the packer may complete it, and **they may not sign it under any circumstances.**

That applies across modes. For surface freight — sea, inland waterway, road, rail — the equivalent is the Shipper's Declaration for the Transport of Dangerous Goods, also called a Dangerous Goods Note.

**For a warehouse, the practical consequence:** you may prepare information, check it and query it. You may not sign the declaration on a customer's behalf, however convenient.

**Air freight specifics**

Documents accompanying the shipment: the **air waybill** and the **Shipper's Declaration for Dangerous Goods**. An SDS may also accompany.

On the air waybill, two fields must be completed:

- **Handling information**: "Dangerous goods as per attached shipper's declaration," and where applicable **"CARGO AIRCRAFT ONLY" (CAO)**
- **Nature and quantity of goods**: per the current IATA DGR

**Road transport emergency information**

South African road transport requires emergency information to travel with the vehicle. Under **SANS 10232-4** this is the **TREC** — Transport Emergency Card.

Older material refers to the **TREMCARD**, generated from the CEFIC system. That system has been superseded; internationally ADR now requires standardised **Instructions in Writing** issued by the carrier. **Confirm the current South African requirement under SANS 10232-4 rather than issuing a TREMCARD.**

Whatever the instrument, the requirements are consistent: it details the substances carried and their hazards, states the actions to be taken in an emergency, is for use by the driver or the emergency services, is carried in the cab, is legible and original rather than a photocopy, and one is required for each dangerous goods item in the load.`,
  },
  {
    title: "14. Placarding Transport Units",
    content: `**Transport units** comprise road transport tank and freight vehicles, railway tank and freight wagons, and multimodal freight containers and portable tanks.

**Placards are affixed to the exterior of transport units** to warn that the contents are dangerous goods and present risks. Placards correspond to the **primary risk** of the goods contained, except that:

**(a)** Placards are **not required** on units carrying any quantity of **Division 1.4 Compatibility Group S** explosives, dangerous goods packed in **limited quantities**, or **excepted packages** of Class 7 radioactive material.

**(b)** Where a unit carries substances of more than one division within Class 1, **only the placard indicating the highest risk** need be affixed.

**Subsidiary risk placards** are displayed for those subsidiary risks specified in Column 4 of the Dangerous Goods List. However, a unit containing goods of more than one class **need not bear a subsidiary risk placard if that hazard is already indicated by a primary risk placard.**

**Placement**

Units carrying dangerous goods, or the residue of dangerous goods in unpurged tanks, display placards **clearly visible on at least two opposing sides**, and in any case positioned to be seen by all those involved in loading or unloading.

Where a unit has a **multiple compartment tank** carrying two or more dangerous goods or residues, appropriate placards are displayed **along each side at the position of the relevant compartments**.

On a vehicle without sides, placards may be affixed directly to the cargo-carrying unit provided they are readily visible. For physically large tanks or containers, the placards on the tank or container suffice.

**Specification**

Except for Class 7, a placard shall:

**(a)** be **not less than 250 mm × 250 mm**, with a line of the same colour as the symbol running **12.5 mm inside the edge** and parallel to it
**(b)** correspond to the label for the class with respect to **colour and symbol**
**(c)** display the **number of the class or division** — and for Class 1, the compatibility group letter

Where a vehicle has insufficient area for larger placards, **250 mm per diamond side** is the minimum.

**Class 7 placards.** Large freight containers carrying packages other than excepted packages, and tanks, bear **four placards** of minimum 250 mm per side with a 5 mm border, affixed **vertically to each side wall and each end wall**. As an alternative to both labels and placards, enlarged labels only, at 250 mm per diamond side, are permitted.

**UN numbers on transport units**

Except for Class 1 goods, UN numbers are displayed on consignments of:

**(a)** solids, liquids or gases in **tank transport units**, including each compartment of a multi-compartment tank
**(b)** **packaged dangerous goods of a single commodity constituting a full load**
**(c)** unpackaged LSA-1 or SCO-1 Class 7 material in or on a vehicle, container or tank
**(d)** packaged radioactive material with a single UN number under exclusive use

The UN number is displayed in **black digits not less than 65 mm high**, either:

**(a)** against a white background in the **lower half of each placard**, or
**(b)** on an **orange rectangular panel not less than 120 mm high and 300 mm wide, with a 10 mm black border**, placed immediately adjacent to each placard

**The rule that gets broken most often**

**Any placards which do not relate to the contents shall be removed.**

A container still placarded from its last load directs the fire brigade to the wrong hazard. That is worse than no placard at all, and removing them is a warehouse task — the placard goes on at loading and comes off at unloading.`,
  },
  {
    title: "15. Emergency Response and Incident Reporting",
    content: `**Emergency procedures**

Controls adequate for normal activities are not sufficient for a major spillage or release. Establish procedures accounting for:

- the nature and quantity of the dangerous goods
- the types and likelihood of emergencies
- the fire protection and emergency equipment provided
- the physical features of the site
- access to the premises
- the number of people on the premises and on adjoining premises

**Display all relevant emergency contact telephone numbers prominently.**

**SANS 10232 — the emergency information system**

| Part | Subject |
| --- | --- |
| Part 1 | Emergency information system for road transport |
| Part 2 | Emergency information system for rail transport |
| **Part 3** | **Emergency Response Guides (ERGs)** |
| Part 4 | Transport emergency card (TREC) |

**SANS 10232-3** specifies a standard procedure of initial response, in the form of Emergency Response Guides to be followed by a **first responder** on arrival at an incident involving materials classified as dangerous goods under SANS 10228.

An **ERG** is compiled for a group of materials sharing the same emergency response. ERGs facilitate early assessment of potential hazards and indicate the response to mitigate the incident, and are intended for use until more detailed information becomes available.

**Annex A of SANS 10232-3 is the Emergency Response Guidebook**, the US Department of Transportation guidebook in a format suitable for emergency use. It is reissued periodically and should be obtained in its current edition.

**Definitions that matter**

**First responder** — the first person to arrive at the scene who is able to correctly identify the goods and hazards and communicate with an emergency service, directly or through a base station.

**Initial isolation distance** — the minimum distance in metres at which people must be kept from the spill.

**In-place protection** — moving persons into buildings and keeping them inside until the danger has passed.

**Small spill** — leakage from a single package not exceeding 200 kg or 200 L, from a small cylinder, or a small leakage from a larger package.

**Near miss** — an unplanned event that did not result in injury, illness or damage but had the potential to do so.

**First response procedure**

**No person shall attempt to approach a spill or suspected leakage unless equipped with the appropriate personal protective clothing** in accordance with the "Public safety" information in the applicable ERG.

The safety precautions in the Emergency Response Guidebook **shall be strictly adhered to.**

Regardless of the nature of the hazard:

1. **Keep everyone not immediately required well away.**
2. **Take care of anyone harmed or contaminated, and note their names and addresses.**
3. **Consult the appropriate ERG before acting.** The wrong action makes it worse — water on a Division 4.3 material generates flammable gas.
4. **Obtain expert help as soon as possible.**

**Reporting**

Two reports are required: an **immediate** report and a **written follow-up**.

**The immediate report** must be made by the person in possession of the goods at the time of an accidental release or imminent release. It should include as much as is known of: the shipping name or UN number; the quantity in the containment before the release and the quantity known or suspected released; the condition of the means of containment and whether transport conditions were normal when it failed; for a cylinder that suffered catastrophic failure, a description of the failure; the location; the number of deaths and injuries; and an estimate of people evacuated.

**The written follow-up report** must be made by the employer, or by the person if self-employed, **within 21 days**. It includes the reporter's name, business address and contact number; date, time and location; consignor's name and business address; classification of the goods; estimated quantity released and total quantity before release; description of the means of containment and of the failure or damage including how it occurred; certification safety marks for a failed cylinder; deaths and injuries; people evacuated; and the name of anyone who responded under an emergency response assistance plan.

**Under SANS 10231, all accidents involving dangerous goods vehicles must be reported to the National Department of Transport within 30 days**, on the prescribed reporting form. Under SANS 10232, a written report shall be completed and signed by the first responder and forwarded to the Department of Transport, Dangerous Goods Inspectorate, **within 24 hours** — one report per placarded vehicle involved.

Confirm current reporting timeframes and forms against the standards in force.

**Reportable and non-reportable**

Reportable includes: explosives containers falling from a vehicle in transit; a bulk container of explosives or dangerous goods subjected to impact through roll-over or collision; unexpected fire or explosion involving or impinging on dangerous goods containers or storage; emissions exceeding minimum reporting parameters; security risk substances found roadside with origins undetermined; stock-take discrepancies in explosives or security risk substances; a security breach such as theft; explosives left unattended; premature explosion of a charge; malfunction of safety-critical equipment with potential for a major incident; failure of refrigeration for ammonia or LNG storage; failure of inert blanket systems; temperature sensor failure in exothermic processes; and **near misses at major hazard facilities**, since these indicate a safety management system failure.

Not normally reportable includes: small numbers of non-explosive dangerous goods packages found roadside with undetermined origin; escapes expected during normal operations, maintenance or transfers; boxes of explosives falling from a forklift with minor damage, no leakage and no injury or off-site effect; misfires not arising from product malfunction; traffic incidents where containers, fittings and goods remain intact and un-impacted; and packages falling from a forklift with damage and minor leakage below reportable thresholds, with no injury, property damage or off-site effect.

**What this course does not do**

It gives you the framework, the standards and the reasoning. **It does not qualify you to classify dangerous goods, sign a dangerous goods declaration, or act as a dangerous goods safety adviser.** Those require separate, formally assessed training.

If you are responsible for a dangerous goods store, obtain **SANS 10263** and the current **SANS 10232** parts, hold current SDSs for everything on site, and have your risk assessment reviewed by someone competent. This course tells you what to ask for. It does not replace it.`,
  },
];

export const us242996Quiz = [
  {
    q: "What distinguishes dangerous goods storage from dangerous goods transport as a risk problem?",
    options: [
      "Storage is inherently safer because the goods are stationary",
      "Time, quantity, proximity, people movement and fire load all increase in a warehouse, and segregation must be achieved by layout rather than by not loading together",
      "Storage is governed by the IMDG Code and transport by SANS",
      "There is no material difference",
    ],
    answer: 1,
  },
  {
    q: "Do the UN Recommendations on the Transport of Dangerous Goods cover the manufacture, use and disposal of dangerous goods?",
    options: [
      "Yes, all four are covered",
      "No — they cover transport only, which is why warehousing sits under OHS law and national standards",
      "They cover manufacture and disposal but not use",
      "They cover disposal only",
    ],
    answer: 1,
  },
  {
    q: "Which South African standard deals specifically with the warehousing of dangerous goods?",
    options: ["SANS 10228", "SANS 10231", "SANS 10232", "SANS 10263"],
    answer: 3,
  },
  {
    q: "Which SANS standard covers the identification and classification of dangerous goods for transport?",
    options: ["SANS 10228", "SANS 10229", "SANS 10234", "SANS 10263"],
    answer: 0,
  },
  {
    q: "What is the legal status of an approved code of practice?",
    options: [
      "Mandatory — failure to comply is itself an offence",
      "Not mandatory, but failure to observe it can be used in evidence that a person contravened the law, and the burden shifts to show the requirement was met another way",
      "Advisory only, with no legal consequence",
      "Mandatory for employers but not for employees",
    ],
    answer: 1,
  },
  {
    q: "Which Act is the primary workplace safety statute governing dangerous goods storage in South Africa?",
    options: [
      "The National Road Traffic Act 93 of 1996",
      "The Occupational Health and Safety Act 85 of 1993",
      "The Hazardous Substances Act 15 of 1973",
      "The Explosives Act 26 of 1956",
    ],
    answer: 1,
  },
  {
    q: "Which regulations made under the OHS Act now govern chemical exposure in the workplace?",
    options: [
      "The Hazardous Chemical Substances Regulations 1995",
      "The Hazardous Chemical Agents Regulations",
      "The General Safety Regulations",
      "The Major Hazard Installation Regulations",
    ],
    answer: 1,
  },
  {
    q: "Under GHS, what has replaced the Material Safety Data Sheet?",
    options: [
      "The Chemical Hazard Notice",
      "The Safety Data Sheet, in a prescribed 16-section format",
      "The Product Information Sheet",
      "Nothing — MSDS remains the correct term",
    ],
    answer: 1,
  },
  {
    q: "Which SDS section covers handling and storage?",
    options: ["Section 4", "Section 5", "Section 7", "Section 14"],
    answer: 2,
  },
  {
    q: "Which SDS section gives conditions to avoid, incompatible materials and hazardous decomposition products?",
    options: ["Section 9", "Section 10", "Section 12", "Section 15"],
    answer: 1,
  },
  {
    q: "Which SDS section would tell you that water is an unsuitable extinguishing medium?",
    options: ["Section 4 — First-aid measures", "Section 5 — Fire-fighting measures", "Section 6 — Accidental release measures", "Section 8 — Exposure controls"],
    answer: 1,
  },
  {
    q: "Where must safety data sheets be kept?",
    options: [
      "In a central office file only",
      "In the same location as the chemicals, and also in a central separate location",
      "With the transport documents only",
      "Electronically, with no physical copy required",
    ],
    answer: 1,
  },
  {
    q: "When must a supplier review a safety data sheet?",
    options: [
      "Every five years without exception",
      "Whenever the formulation changes, whenever new hazard or health information becomes available, and whenever the information may not be accurate, current or comprehensive",
      "Only when requested by a customer",
      "Only when the product is reclassified under GHS",
    ],
    answer: 1,
  },
  {
    q: "How do GHS workplace labels differ from transport hazard diamonds?",
    options: [
      "They are the same system with different names",
      "GHS labels use red-bordered pictograms, a signal word, and coded hazard and precautionary statements, and communicate hazard to the handler; transport diamonds communicate hazard in transit and drive segregation",
      "GHS labels apply only to imported goods",
      "Transport diamonds replaced GHS labels",
    ],
    answer: 1,
  },
  {
    q: "What are the two GHS signal words?",
    options: ["CAUTION and DANGER", "DANGER and WARNING", "WARNING and NOTICE", "HAZARD and CAUTION"],
    answer: 1,
  },
  {
    q: "A substance is decanted into a smaller container for use in the warehouse. What must happen?",
    options: [
      "Nothing, provided it is used the same day",
      "The new container must be labelled",
      "A new SDS must be issued",
      "The decant must be recorded on the transport document",
    ],
    answer: 1,
  },
  {
    q: "Where a package bears a subsidiary risk label, which segregation applies?",
    options: [
      "The primary hazard segregation always",
      "The segregation appropriate to the subsidiary hazard, where it is more stringent than that required by the primary",
      "An average of the two",
      "Subsidiary risks do not affect segregation",
    ],
    answer: 1,
  },
  {
    q: "Which classes should be deemed incompatible with all other dangerous goods?",
    options: ["Classes 3 and 8", "Classes 1 and 7", "Classes 2 and 6", "Classes 4 and 5"],
    answer: 1,
  },
  {
    q: "Class 6.1 toxic substances must be segregated from what, without exception for Packing Group I?",
    options: ["Corrosives", "Foodstuffs, feeds and other edible substances", "Radioactive material", "Oxidising agents"],
    answer: 1,
  },
  {
    q: "A transport unit has carried toxic substances. What must happen before re-use?",
    options: [
      "Nothing, if the packages were intact",
      "It must be inspected for contamination, and if contaminated must not return to service until decontaminated",
      "It must be repainted",
      "It must be placarded for its next load only",
    ],
    answer: 1,
  },
  {
    q: "Why must Class 4.3 goods be segregated from aqueous solutions even where those solutions are not dangerous goods?",
    options: [
      "Because they may dissolve",
      "Because Class 4.3 substances emit flammable gases on contact with water",
      "Because water damages the packaging",
      "Because it is an insurance requirement only",
    ],
    answer: 1,
  },
  {
    q: "What fire suppression constraint applies to Class 4.3 storage areas?",
    options: [
      "Sprinklers must be set to a higher temperature rating",
      "The area must not be serviced by a water-based fire suppression system",
      "Foam suppression is mandatory",
      "No constraint applies",
    ],
    answer: 1,
  },
  {
    q: "When measuring a segregation distance where one of the goods is a liquid, from where is the distance measured?",
    options: [
      "From the centre of the pallet",
      "From the edge of the spill catchment area",
      "From the outer face of the package",
      "From the nearest rack upright",
    ],
    answer: 1,
  },
  {
    q: "Where one of two incompatible materials is Packing Group I or II, what does this imply for segregation?",
    options: [
      "No change — the class determines the distance",
      "A greater segregation distance or another means of segregation is recommended",
      "A lesser distance is permitted because packaging is stronger",
      "Segregation is not required for PG I",
    ],
    answer: 1,
  },
  {
    q: "Two goods are in the same class with different UN numbers. Are they necessarily compatible?",
    options: [
      "Yes — same class means compatible",
      "No — goods with different UN numbers within the same class may be incompatible; the SDS must be checked",
      "Only if they share a packing group",
      "Only if neither has a subsidiary risk",
    ],
    answer: 1,
  },
  {
    q: "Oxidising agents must also be segregated from what, beyond the classes shown on a compatibility chart?",
    options: [
      "Nothing further",
      "Combustible materials that are not dangerous goods — polymeric beads, cotton bales, excess packing material",
      "Radioactive material only",
      "Foodstuffs only",
    ],
    answer: 1,
  },
  {
    q: "When relying on natural ventilation, where should vents be placed and why?",
    options: [
      "At ceiling level only, since vapours rise",
      "At floor level and near the ceiling — most dangerous goods vapours are heavier than air and vent at floor level, while high vents admit fresh air",
      "At floor level only",
      "On one wall only, to create directional flow",
    ],
    answer: 1,
  },
  {
    q: "What is the guide figure for vent area relative to floor area in a naturally ventilated dangerous goods store?",
    options: [
      "At least 1 m² of vent per 10 m² of floor",
      "At least 1 m² of vent per 50 m² of floor",
      "At least 1 m² of vent per 200 m² of floor",
      "There is no guide figure",
    ],
    answer: 1,
  },
  {
    q: "How far should naked flames from direct-fired heaters or maintenance work be kept from flammable or combustible dangerous goods?",
    options: ["At least 1 metre", "At least 3 metres", "At least 5 metres", "At least 10 metres"],
    answer: 2,
  },
  {
    q: "For outdoor storage, how far must combustible vegetation be cleared?",
    options: ["At least 1 metre", "At least 3 metres", "At least 5 metres", "Clearance is not required"],
    answer: 1,
  },
  {
    q: "What capacity must clean-up equipment kept on the premises be able to cope with?",
    options: [
      "A one-litre spill",
      "Spills from the largest package kept at the premises",
      "10% of total stock held",
      "Whatever the local fire service specifies",
    ],
    answer: 1,
  },
  {
    q: "Spilt or contaminated goods have been cleaned up. May they be returned to their original packaging?",
    options: [
      "Yes, always",
      "Not except for disposal, or where it is known this will not increase the risk",
      "Yes, if the package is undamaged",
      "Only with the supplier's written consent",
    ],
    answer: 1,
  },
  {
    q: "Which of these storage arrangements is prohibited?",
    options: [
      "Glass containers of liquids stored at lower levels",
      "Liquid dangerous goods stored above solid dangerous goods in paper or absorbent packaging",
      "Solid dangerous goods raised off the floor surface",
      "Packages stored on surfaces resistant to attack by their contents",
    ],
    answer: 1,
  },
  {
    q: "Why should aerosols stored together in outer packaging be enclosed in a strong mesh enclosure?",
    options: [
      "To prevent theft",
      "To reduce the risk from projectiles in the event of a fire involving the aerosols",
      "To improve ventilation",
      "To satisfy labelling requirements",
    ],
    answer: 1,
  },
  {
    q: "Where should decanting and transfer of dangerous goods be carried out?",
    options: [
      "Within the storage area, for convenience",
      "In a place set aside for the purpose, adjacent to but not within the storage area, free of ignition sources and obstruction",
      "Anywhere with spill containment",
      "Outdoors only",
    ],
    answer: 1,
  },
  {
    q: "Why must the container being filled and the transfer equipment be earthed?",
    options: [
      "To prevent corrosion",
      "Because static electricity generated during transfer could ignite flammable vapours",
      "To comply with electrical regulations generally",
      "To allow level sensing to work",
    ],
    answer: 1,
  },
  {
    q: "In a transport staging area, how long may dangerous goods be held?",
    options: ["24 hours", "Not exceeding five consecutive working days", "Up to one month", "There is no limit"],
    answer: 1,
  },
  {
    q: "Why can a lithium battery in thermal runaway not be smothered?",
    options: [
      "It burns at too high a temperature",
      "It generates its own oxygen, so the fire burns until the stored energy is spent",
      "The casing prevents suppressant reaching the cells",
      "It can be smothered, with the right agent",
    ],
    answer: 1,
  },
  {
    q: "Which of these is the highest-risk lithium battery item routinely present in a warehouse?",
    options: [
      "Sealed new stock on pallets",
      "Damaged, defective or recalled cells arriving through returns",
      "Batteries installed in forklifts",
      "Batteries in handheld scanners",
    ],
    answer: 1,
  },
  {
    q: "What is the appropriate handling of damaged or swollen lithium cells in a warehouse?",
    options: [
      "Return them to the main stock rack pending assessment",
      "Quarantine them separately in fire-resistant containment, away from main stock, and move them out quickly",
      "Discharge them fully and store with general waste",
      "Store them outdoors without containment",
    ],
    answer: 1,
  },
  {
    q: "In the hierarchy of control, where does personal protective equipment sit?",
    options: [
      "First — it protects the individual directly",
      "Last — after elimination, substitution, enclosure and engineering and procedural controls",
      "Second, after elimination",
      "It sits outside the hierarchy",
    ],
    answer: 1,
  },
  {
    q: "What are the three routes by which hazardous substances enter the body?",
    options: [
      "Inhalation, ingestion, and contact through skin and mucous membranes",
      "Inhalation, injection and radiation",
      "Ingestion, absorption and vibration",
      "Contact, noise and heat",
    ],
    answer: 0,
  },
  {
    q: "Who carries responsibility for the risk assessment of hazardous substances in the workplace?",
    options: ["The supplier", "The employer", "The health and safety representative", "The local authority"],
    answer: 1,
  },
  {
    q: "Which of these must be included on a dangerous goods transport document for each substance?",
    options: [
      "The purchase order number and the customer's VAT number",
      "UN number preceded by \"UN\", the proper shipping name, the class or division with subsidiary risks in brackets, and the packing group where assigned",
      "The SDS revision date and the supplier's contact",
      "The GHS pictogram codes",
    ],
    answer: 1,
  },
  {
    q: "Waste dangerous goods are being transported for disposal. How is the description affected?",
    options: [
      "No change is required",
      "The proper shipping name is preceded by the word \"WASTE\", unless already part of the name",
      "The UN number is omitted",
      "The packing group is downgraded to III",
    ],
    answer: 1,
  },
  {
    q: "Who may complete and sign a Shipper's Declaration for Dangerous Goods?",
    options: [
      "The shipper, the forwarder or the packer",
      "The shipper only — no other party may complete or sign it",
      "The warehouse manager, as the party with custody",
      "The carrier, on presentation of the goods",
    ],
    answer: 1,
  },
  {
    q: "Placards are not required on transport units carrying which of the following?",
    options: [
      "Any Class 3 goods under 100 litres",
      "Division 1.4 Compatibility Group S explosives, dangerous goods in limited quantities, or excepted packages of Class 7 material",
      "Any goods with a subsidiary risk only",
      "Goods in combination packaging",
    ],
    answer: 1,
  },
  {
    q: "What are the minimum dimensions of a dangerous goods placard, other than for Class 7?",
    options: ["100 mm × 100 mm", "150 mm × 150 mm", "250 mm × 250 mm", "300 mm × 300 mm"],
    answer: 2,
  },
  {
    q: "How high must the UN number digits be when displayed on a transport unit?",
    options: ["25 mm", "45 mm", "65 mm", "100 mm"],
    answer: 2,
  },
  {
    q: "A container arrives still placarded from its previous load. What must be done?",
    options: [
      "Leave it — an extra placard is a precaution",
      "Remove it — any placards which do not relate to the contents shall be removed",
      "Cover it with the new placard",
      "Report it to the Department of Transport",
    ],
    answer: 1,
  },
  {
    q: "Which SANS 10232 part contains the Emergency Response Guides?",
    options: ["Part 1", "Part 2", "Part 3", "Part 4"],
    answer: 2,
  },
  {
    q: "What is the South African transport emergency card instrument under SANS 10232-4?",
    options: ["The TREMCARD, generated from the CEFIC system", "The TREC", "The ERG", "The Dangerous Goods Note"],
    answer: 1,
  },
  {
    q: "A package has spilled. What must be done BEFORE taking remedial action?",
    options: [
      "Photograph the scene for the insurer",
      "Consult the appropriate Emergency Response Guide — the wrong action may make the situation worse",
      "Apply water to dilute the spill",
      "Move the package outside",
    ],
    answer: 1,
  },
  {
    q: "May a person approach a spill or suspected leakage without appropriate protective clothing?",
    options: [
      "Yes, if the spill is small",
      "No — no person shall approach unless equipped with appropriate PPE per the Public Safety information in the applicable ERG",
      "Yes, if they hold DG training",
      "Yes, provided they do not touch the material",
    ],
    answer: 1,
  },
  {
    q: "Within what period must the written follow-up report of a dangerous goods incident be made?",
    options: ["24 hours", "7 days", "21 days", "90 days"],
    answer: 2,
  },
  {
    q: "Which of these is a reportable incident?",
    options: [
      "A driver pulling off for a scheduled rest period logged in the driver's log",
      "A near miss at a major hazard facility",
      "An escape of dangerous goods expected during normal maintenance",
      "A misfired shot not arising from product malfunction",
    ],
    answer: 1,
  },
  {
    q: "Why are near misses at major hazard facilities reportable?",
    options: [
      "Because insurance requires it",
      "Because they can indicate a failure with the facility's safety management system",
      "Because all events at such facilities are reportable",
      "Because the goods involved are always Class 1",
    ],
    answer: 1,
  },
  {
    q: "Does completing this course qualify a learner to sign a dangerous goods declaration?",
    options: [
      "Yes, on successful completion",
      "No — that requires separate, formally assessed dangerous goods training",
      "Yes, for warehousing consignments only",
      "Yes, provided a supervisor countersigns",
    ],
    answer: 1,
  },
];

export const us242996Practical = {
  title: "Assess a Store, Segregate a Load, Respond to a Spill",
  description: `Four assessed exercises. None involves handling live dangerous goods, and the brief says so — this course does not confer authority to classify or declare dangerous goods.

**Part 1 — Reading the SDS.** Learners receive safety data sheets for several substances and must extract, for each: the class and any subsidiary risk, the packing group, the storage requirements from section 7, the conditions to avoid and incompatible materials from section 10, and the unsuitable extinguishing media from section 5. They then state what each fact means for where that substance may be racked.

**Part 2 — Segregation plan.** Given a mixed stock list — including at least one Class 5.1 oxidiser, one Class 3 flammable liquid, one Class 8 corrosive, one Class 6.1 toxic substance, a pallet of foodstuffs and a quantity of lithium batteries — learners produce a segregation plan for a defined warehouse footprint, stating the method used for each pair, the distance or barrier, and the reasoning. Where the chart and the SDS disagree, they must say which governs and why.

**Part 3 — Storage audit.** Learners review photographs or a described scenario of a non-compliant store and identify every failure: labels facing inward, liquids racked above absorbent-packed solids, glass at height, an unlabelled decant container, an obstructed exit, combustible refuse against the racking, a water extinguisher beside Class 4.3 goods, an out-of-date SDS, missing placards, and stock that should have been disposed of.

This is the exercise that matters most. A warehouse role is mostly noticing.

**Part 4 — Incident response and reporting.** Given a spill scenario, learners set out the first-response sequence in order, identify the ERG information needed, state who must be informed and when, and draft the content of both the immediate report and the written follow-up.

Assessed on: correct use of the SDS rather than assumption; segregation decisions justified by reference to class, subsidiary risk and packing group; completeness of the audit; and whether the response sequence puts consulting the ERG before acting.`,
};

export const us242996Outcomes = [
  "Identify and classify dangerous goods by class, division, UN number, proper shipping name and packing group",
  "Explain the South African legal framework, including the OHS Act, the Hazardous Chemical Agents Regulations and the applicable SANS standards",
  "Read and apply a 16-section Safety Data Sheet, and distinguish it from the superseded MSDS format",
  "Distinguish GHS workplace labelling from transport hazard diamonds and apply both correctly",
  "Conduct a risk assessment for a dangerous goods storage location, including external hazard sources",
  "Determine compatibility and apply the appropriate segregation method, distance or barrier",
  "Specify warehouse controls for ventilation, ignition, spill containment, fire protection and security",
  "Apply safe storage practice for racking, stacking, decanting, aerosols and stock management",
  "Identify and control the specific risks of lithium battery storage",
  "Apply the hierarchy of control and specify appropriate personal protective equipment",
  "Prepare dangerous goods documentation and identify who may complete and sign a declaration",
  "Apply placarding requirements to transport units, including UN number display and placard removal",
  "Execute a first response to a dangerous goods incident using the Emergency Response Guides",
  "Complete immediate and written incident reports to the required content and timeframes",
];

export const us242996Summary =
  "Store and handle dangerous goods in a warehouse to the standard South African law and the SANS codes require. The nine classes and divisions, identification and packing groups, the OHS Act and Hazardous Chemical Agents Regulations, SANS 10228, 10232, 10234 and 10263, the 16-section Safety Data Sheet that replaced the MSDS, GHS workplace labelling, risk assessment, compatibility and segregation, ventilation and ignition control, spill containment, lithium battery storage, documentation, placarding, and emergency response and incident reporting. This course does not qualify a learner to classify or declare dangerous goods — see Module 15.";

export const us242996 = {
  code: "US-242996",
  title: "Handle Dangerous Goods During Warehousing & Storage",
  summary: us242996Summary,
  outcomes: us242996Outcomes,
  modules: us242996Modules,
  quiz: us242996Quiz,
  practical: us242996Practical,
  passMark: 70, // 41 of 58
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. The nine classes and divisions — reference card with transport diamonds
 *   2. GHS pictogram chart, with signal words and the H/P statement coding
 *   3. SDS 16-section navigation card — which section answers which question
 *   4. Segregation and compatibility chart, with the "SDS governs" caveat
 *   5. Storage audit checklist — the Part 3 practical as a working tool
 *   6. Lithium battery storage controls one-pager
 *   7. Spill response sequence card
 *   8. Incident report content checklist — immediate and 21-day written
 *
 * Items 3, 4 and 5 carry the most weight: they are what a storeman uses.
 *
 * ── DO NOT PRINT SEGREGATION DISTANCES AS ABSOLUTES ───────────────────────
 * Distances vary by standard, packing group and jurisdiction. Materials should
 * carry the same caveat the modules do: the chart is a guide, the SDS governs,
 * and SANS 10263 is the South African warehousing reference.
 *
 * ── SCOPE STATEMENT — DO NOT REMOVE ───────────────────────────────────────
 * This course does not qualify anyone to classify dangerous goods, sign a
 * dangerous goods declaration, or act as a dangerous goods safety adviser.
 * Module 15 states this. Do not market it as DG certification.
 *
 * ── CORRECTIONS TO THE SOURCE MANUAL ──────────────────────────────────────
 *   1. MSDS → SDS, 16-section GHS format (SANS 10234). The manual uses MSDS
 *      throughout. Module 5.
 *   2. GHS workplace labelling — absent. Module 6.
 *   3. Hazardous Chemical Agents Regulations replaced the older Hazardous
 *      Chemical Substances Regulations.
 *   4. Lithium batteries — absent. Module 11.
 *   5. TREMCARD superseded; SANS 10232-4 TREC for SA road, ADR Instructions in
 *      Writing internationally.
 *   6. US EPA hazardous waste criteria replaced with the NEM: Waste Act route.
 *   7. ERG reissued periodically; the manual's hazmat.dot.gov URL is dead.
 *   8. IMDG — current amendment, not the 2009 edition.
 *
 * The manual's PDF metadata carries a different unit standard's title
 * (US242983), as with others in this series.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *   - Current editions of SANS 10228, 10232 (all parts), 10234 and 10263
 *   - Hazardous Chemical Agents Regulations and any amendments
 *   - Current Emergency Response Guidebook edition
 *   - Incident reporting timeframes and prescribed forms
 *   - IMDG amendment and IATA DGR edition in force
 *   - Local authority fire by-laws, which vary by municipality
 *   - Insurer requirements for lithium battery storage, which are tightening
 */
