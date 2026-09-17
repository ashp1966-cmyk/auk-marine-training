/**
 * US-242987 — Identify, Pack, Mark & Label Dangerous Goods for Transportation by Air
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 242987 · elective
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * ── CRITICAL SCOPE STATEMENT ──────────────────────────────────────────────
 *
 * This course teaches the regulatory framework for dangerous goods by air. It
 * does NOT qualify anyone to classify, pack, mark, label, document or offer
 * dangerous goods for air transport.
 *
 * Under ICAO Annex 18 and the Technical Instructions, a person performing those
 * functions must hold current, formally assessed dangerous goods training from a
 * recognised provider, valid for a limited period. Signing a Shipper's
 * Declaration without it is a criminal offence in most jurisdictions, and the
 * consequence of getting it wrong is an aircraft fire.
 *
 * Module 15 states this to the learner explicitly. It must not be removed or
 * softened, and the course must not be marketed as DG certification.
 *
 * ── SOURCE AND CORRECTIONS ────────────────────────────────────────────────
 *
 * Built from the learner manual for US 242987 (release 01/07/2009, registration
 * ended 30/06/2012). The classification structure, packing group logic, marking
 * and labelling requirements and shipper responsibilities are unchanged in
 * principle and are taught as the manual sets them out.
 *
 * Corrected or added here:
 *
 *   1. LITHIUM BATTERIES — absent from the manual entirely. They are now the
 *      dominant dangerous goods issue in air transport, with their own entries,
 *      packing instructions, state-of-charge limits, passenger-aircraft
 *      prohibitions and a dedicated mark. Module 7 covers them.
 *   2. CLASS 4 DEFINITION — the manual states "Class 4: Flammable solids. This
 *      class has no divisions. It comprises liquids, mixtures of liquids..."
 *      That text is copied from Class 3 and is wrong twice: Class 4 has three
 *      divisions, and it covers solids. Corrected in Module 2.
 *   3. TRAINING REGIME — the manual predates competency-based training and
 *      assessment (CBTA), which has replaced the older category-based approach.
 *   4. EDITIONS — IATA DGR is reissued annually (67th edition for 2026); the
 *      ICAO Technical Instructions are biennial. Every quantity limit and packing
 *      instruction in this course is taught as structure, with the learner
 *      directed to the current edition for the number.
 *   5. DOCUMENTATION — the manual describes two paper copies stapled to the air
 *      waybill. Electronic dangerous goods declarations are now widely used.
 *   6. COMPETENT AUTHORITY — "Civil Aviation Authority" is, in South Africa, the
 *      South African Civil Aviation Authority (SACAA).
 *
 * The manual's own footer cites "Unit standard 242487" on every page where the
 * course is 242987, and its PDF metadata carries the title of a different unit
 * standard entirely (US242983). Neither affects the content.
 */

export const us242987Modules = [
  {
    title: "1. What Dangerous Goods Are, and Who Regulates Them",
    content: `Dangerous goods are articles or substances capable of posing a significant risk to health, safety or property when transported by air.

They may be solids, liquids, gases or articles. The hazards include toxic, poisonous, radioactive, explosive, flammable, corrosive, oxidising, asphyxiating, biohazardous, pathogenic and allergenic materials — and physical conditions such as compressed gases and liquids, or hot materials.

**Classification is by immediate hazard in transport**, not long-term health effect. A substance that causes cancer over twenty years but is inert in a cargo hold is not a dangerous good for these purposes. One that will ignite at 40 °C is.

**The two documents**

**ICAO Technical Instructions (ICAO TI)** — the legal instrument, issued under Annex 18 to the Convention on International Civil Aviation. Biennial.

**IATA Dangerous Goods Regulations (IATA DGR)** — the airline industry's working manual, based on the ICAO TI and reissued **annually**. The 67th edition applies for 2026.

They contain the same list of dangerous goods. The DGR adds airline-industry material the ICAO TI does not cover — notably how to complete the Shipper's Declaration and the accompanying air waybill, which are commercial documents outside ICAO's jurisdiction.

The civil aviation authority recognises that compliance with the IATA DGR ensures compliance with the ICAO TI. In South Africa the authority is **SACAA**.

**The one structural difference worth knowing:** ICAO recognises **State variations**. IATA recognises **State and Operator variations**. Module 13 covers both.

**Cargo, not baggage — mostly**

Dangerous goods are prohibited in passenger baggage, with limited exceptions. But hazardous substances in baggage can pose a *greater* threat than cargo, precisely because they can reach an aircraft unnoticed.

The travelling public cannot be expected to know the characteristics of air transport, or the potential dangers of articles in their bags. Every member of staff involved is therefore responsible for vigilance, and the operator carries final responsibility for informing passengers and clients of the requirements.

**The commercial reality**

Dangerous goods may only be shipped with prior approval from the carrier, and only before pre-booking. Shipments may attract surcharges and usually need more transit time than general cargo.

**Delays and costs arising from improper identification, classification or documentation fall on the shipper.** That is the principle the whole course rests on, and Module 8 develops it.

**Regional note.** In the United States, dangerous goods are called *hazardous materials* or **HAZMAT**. The terms are interchangeable; the regulations are not, and US variations are among the most consequential in the system.`,
  },
  {
    title: "2. The Nine Classes and Their Divisions",
    content: `Dangerous goods are divided into nine classes by the type of hazard they pose. Some classes are subdivided into divisions where several types of substance share a hazard type — gases, for instance, can be toxic, flammable, or neither.

**Class 1 — Explosives**

Explosive substances, except where the predominant hazard belongs in another class. Explosive articles, except devices containing explosive substances in such limited quantity or character that accidental ignition in transport would not produce projection, fire, heat, smoke or loud noise outside the device. And articles or substances manufactured to produce a practical explosive or pyrotechnic effect.

| Division | Hazard |
| --- | --- |
| 1.1 | Mass explosion hazard |
| 1.2 | Projection hazard, but not mass explosion |
| 1.3 | Fire hazard, and a minor blast and/or minor projection hazard, but not mass explosion |
| 1.4 | No significant hazard |
| 1.5 | Very insensitive substances with a mass explosion hazard |
| 1.6 | Extremely insensitive articles without a mass explosion hazard |

**Division 1.4S is the only explosive acceptable on passenger aircraft.**

**Class 2 — Gases**

Compressed and liquefied gases, refrigerated liquefied gases, gases in solution, mixtures of gases, and mixtures of gases with vapours of other substances. Articles charged with a gas, and aerosols, belong here.

| Division | Hazard |
| --- | --- |
| 2.1 | Flammable gas |
| 2.2 | Non-flammable, non-toxic gas |
| 2.3 | Toxic gas |

**Class 3 — Flammable liquids**

**No divisions.** Liquids, mixtures of liquids, and liquids containing solids in solution or suspension, which give off a flammable vapour.

**Class 4 — Flammable solids; substances liable to spontaneous combustion; substances which emit flammable gases on contact with water**

**Three divisions.** Note carefully: older training material — including the source manual for this unit standard — states that Class 4 has no divisions and comprises liquids. **That is wrong on both counts.** The text was copied from Class 3.

| Division | Hazard |
| --- | --- |
| 4.1 | Flammable solids, self-reactive substances and desensitized explosives |
| 4.2 | Substances liable to spontaneous combustion |
| 4.3 | Substances which, in contact with water, emit flammable gases |

**Class 5 — Oxidising substances and organic peroxides**

Oxidisers are not necessarily combustible themselves, but may cause or contribute to the combustion of other materials.

| Division | Hazard |
| --- | --- |
| 5.1 | Oxidising substances |
| 5.2 | Organic peroxides |

**Class 6 — Toxic and infectious substances**

Substances liable to cause death, injury or harm to human health if swallowed, inhaled, or through skin contact.

| Division | Hazard |
| --- | --- |
| 6.1 | Toxic substances |
| 6.2 | Infectious substances |

**Class 7 — Radioactive material**

**No divisions.** For regulatory purposes, radioactive material is any substance with a specific activity greater than **70 kBq/kg**.

**Class 8 — Corrosive substances**

**No divisions.** Substances that can cause severe damage by chemical action on contact with living tissue, other materials, or the aircraft.

**Class 9 — Miscellaneous dangerous substances and articles**

Everything not covered by another class. Examples: asbestos · solid carbon dioxide (dry ice) · environmentally hazardous substances · life-saving appliances · internal combustion engines · polymeric beads · magnetised material · battery-powered equipment and vehicles.

**Lithium batteries also sit in Class 9**, and they are significant enough to have their own module — see Module 7.

**Hazard labels.** Each class has a distinctive label conveying information by colour and symbol. Not every country uses identical graphics — some use symbols without English wording, or wording in the national language. Refer to the national regulations of the country concerned.`,
  },
  {
    title: "3. UN Numbers, Proper Shipping Names and the DG List",
    content: `Dangerous goods in air transport are identified by **two things together**: a proper shipping name and a UN or ID number.

**The UN number**

A four-digit code identifying the substance internationally — a universal index that works regardless of language. **UN1088** is Acetal, wherever it is shipped.

UN and ID numbers exist to reduce confusion from misunderstood or mispronounced shipping names, and to help locate emergency response guidance when there is an incident.

**ID numbers** are the exception: a small number of entries have been assigned airline-industry identifiers in the 8000 series under the IATA DGR, and these are prefixed **ID** rather than UN.

**The Proper Shipping Name (PSN)**

Each regulated shipment has a **single correct description** — the proper shipping name. Without establishing it, a shipper cannot determine the net quantity permitted in a package or the correct packaging to use.

Three rules that matter:

**The PSN is the text in capital letters** in the DG List. Any text in lower case is descriptive only and is not part of the name.

**Trade names are not acceptable.** "Brand X Cleaner" is not a proper shipping name, whatever the label says.

**Generic entries need technical names.** Many entries are generic — "FLAMMABLE LIQUID, N.O.S." where n.o.s. means *not otherwise specified*. Generic names denoted in the commodity lists with asterisks **must be modified by adding the technical names of the hazardous constituents in brackets** after the shipping description. Those modifications must appear on the package markings and the shipping papers.

Common generic entries: UN1993 flammable liquid, n.o.s.; UN1954 flammable compressed gas, n.o.s.

**The Dangerous Goods List**

The complete list appears in the DGR (the "List of Dangerous Goods") and the ICAO TI (Table 3-1, "Dangerous Goods List"). Each entry gives:

- the proper shipping name
- the UN or ID number
- the primary class or division
- subsidiary risk(s), where applicable
- the label(s) to be used on the package
- the packing group, where assigned
- whether the item is permitted on passenger aircraft, restricted to cargo aircraft only, or forbidden
- the packing instructions, with **quantity limitations for passenger and for cargo aircraft**

*Worked reading.* Acetal is a flammable liquid, so Class 3, and is assigned **Packing Group II**. Its entry shows two parallel packing instruction lines. One shows specification packaging — limiting shipment to 5 litres per package on passenger aircraft, and up to 60 litres per package on cargo aircraft only. The second line shows a limited-quantities instruction, restricting shipment to 1 litre per package.

**How to find a PSN**

Check the DG List for the material by name. Or check the safety data sheet, which usually gives the proper shipping name under the transport information section.

**Every quantity figure in this module is illustrative.** Limits change between editions. Take the number from the current DGR or ICAO TI, every time.`,
  },
  {
    title: "4. Packing Groups and Subsidiary Risks",
    content: `**The three packing groups**

Packing groups relate to the **degree of hazard** within a class:

| Group | Degree of danger |
| --- | --- |
| **I** | Great danger |
| **II** | Medium danger |
| **III** | Minor danger |

Most substances are assigned a packing group on technical criteria; some on experience.

The packing group is not academic. It drives the **severity of the performance tests** the packaging must survive — in particular the drop height, which varies by group. A packaging certified for Group III will not do for a Group I substance.

Not every class uses packing groups. Classes 1, 2 and 7, and Division 6.2, do not assign them.

**Subsidiary risks**

Many dangerous goods have more than one hazard. A **primary class** is allocated, with significant additional hazards identified as **subsidiary risks**.

*Example.* **Benzyl bromide (UN1737)** is both a toxic liquid and a corrosive — Division 6.1 with subsidiary risk 8.

*Example.* **Methyl vinyl ketone (UN1251)** has a primary hazard of 6.1 — it is poisonous — but it is also flammable and corrosive.

**Do not treat a subsidiary risk as less important.** Where a package is damaged or leaking, all identified hazards must be regarded equally. For benzyl bromide, the corrosive subsidiary risk — it is corrosive to skin — may well be the more important consideration if the package has to be handled or moved.

That is a point worth dwelling on. The primary hazard determines classification and paperwork. The subsidiary risk may be the one that injures the person picking up the box.

**How this shows on the package**

The primary hazard is identified by the label bearing the **class or division number in the bottom corner**.

**Subsidiary risk labels do not show any class or division number.**

That is the visual test: number in the bottom corner means primary; no number means subsidiary. A package may carry more than one hazard label where there are different dangerous goods of different primary hazards in one package, or where a single item has a primary hazard plus one or more subsidiary risks.`,
  },
  {
    title: "5. Aircraft Limitations",
    content: `Articles and substances classified as dangerous goods carry limitations according to how dangerous they are. Three possibilities:

- **acceptable on both passenger and cargo aircraft**
- **restricted to cargo aircraft only**
- **forbidden for transport by air**

**Why the distinction matters before you pack**

**Before offering a shipment, the shipper must know whether it will travel on passenger-carrying or cargo-only aircraft**, because it directly affects the net quantity permitted in a package.

Some materials permitted on cargo aircraft are **prohibited** on passenger aircraft. In other cases the net quantity per package permitted on a passenger aircraft is **smaller** than the same material moved cargo-only.

This is visible in the DG List, where each entry has separate instructions for passenger aircraft and for cargo aircraft.

**The CARGO AIRCRAFT ONLY label**

Packages prepared to cargo-aircraft instructions must carry the **black-and-orange CARGO AIRCRAFT ONLY label**, and the accompanying documentation must state that the shipment is eligible for cargo aircraft only.

The rule runs one way only:

**A package bearing the CARGO AIRCRAFT ONLY label must fly on that type of aircraft alone.**
**A package authorised for passenger aircraft may travel on either type.**

**Forbidden goods**

Some goods are too hazardous to carry by air in any circumstances.

Certain dangerous goods normally not acceptable may nonetheless be transported **under exemption granted by the State of Origin, the State of Destination, and all States to be overflown**. That is a formal, documented process, not a commercial negotiation with the airline.

**Explosives on passenger aircraft**

**Division 1.4S is the only explosive acceptable on a passenger aircraft.** Everything else in Class 1 is cargo-only or forbidden.

**The practical sequence**

1. Establish the proper shipping name.
2. Read the DG List entry.
3. Determine whether the intended routing uses passenger or cargo aircraft.
4. Read the quantity limit for **that** column — not the other one.
5. Select packaging and quantity accordingly.

An agent who reads the cargo-aircraft column and books the consignment on a passenger flight has created a shipment that will be rejected at acceptance, if the acceptance check is done properly — and an incident, if it is not.`,
  },
  {
    title: "6. Excepted, Limited and Specification Quantities",
    content: `There are three packaging options under the international standards, with specific quantity limitations for each material under each.

**1. Specification packaging**

Performance-tested packaging, developed and tested under the **United Nations packaging specifications**. The severity of the qualifying tests is keyed in part to the **packing group** of the material intended to go in it.

A typical testing regime — for a drum intended to contain flammable liquid — includes a **drop test, a leak-proof test, an internal pressure (hydraulic) test, and a stacking test**.

The packing group matters most for the **drop test**, since drop height varies by group. The **internal pressure test** is keyed to the vapour pressure of the liquid being packaged.

**Frequently overlooked:** for combination packaging, the **inner** packaging must also satisfy an internal pressure test, again linked to the vapour pressure of the material.

This is why a shipper must know the technical characteristics of the chemical being shipped — not just its name.

Testing specifications are in the DGR and the ICAO TI, with separate provisions for radioactive materials.

**2. Limited quantities**

Certain materials in **Packing Groups II and III** may be transported under packaging exceptions for limited quantities.

These exceptions allow **non-specification combination packaging** — packaging not submitted for UN testing — for net quantities further restricted below the specification limits, **provided the packages can survive a 1.2-metre (4-foot) drop test**.

The principle is packaging down: large packages become very small packages placed inside outer packages. The double packaging protects the product and contains small leakage.

**Limited quantity entries are shown with italicised packing instructions preceded by the letter "Y."**

Two things learners get wrong:

**The gross weight of a limited quantity package must not exceed 30 kg.**

**Limited quantity shipments are still subject to all communication and documentation requirements.** They still need marking, labelling and documentation as dangerous goods. "Limited quantity" limits the packaging regime, not the paperwork.

**3. Excepted quantities**

Very small quantities of certain dangerous goods may be shipped **without hazard labels or specific dangerous goods documentation**.

They do require a mark stating they are **"Dangerous Goods in Excepted Quantities"**, showing the class and UN number of the contents — conventionally a red-bordered mark.

Approved packaging is not required; **good quality packaging** to the specification in the regulations is sufficient. Inner packagings should be constructed of plastic, glass, earthenware or metal.

**The comparison that matters**

| | Specification | Limited quantity | Excepted quantity |
| --- | --- | --- | --- |
| UN-tested packaging | Required | Not required | Not required |
| Hazard labels | Required | Required | Not required |
| DG documentation | Required | Required | Not required |
| Special mark | UN specification mark | — | Excepted quantity mark |
| Drop test | Full regime by packing group | 1.2 m | Per regulation |

**The eligible materials, the packing instructions and every quantity figure sit in the current DGR.** They change between editions. Look them up.`,
  },
  {
    title: "7. Lithium Batteries",
    content: `**This module covers material that does not appear in the 2009 source manual at all.** Lithium batteries have since become the single most significant dangerous goods issue in air transport, and the area where the regulations change most often.

**Why they are treated differently from everything else**

A lithium battery in thermal runaway produces its own oxygen. It cannot be extinguished by the Halon suppression systems fitted in aircraft cargo holds — the fire will burn until the energy is spent, propagating to adjacent cells as it goes.

That is the entire reason for the regulatory attention. It is not a paperwork problem.

**The four UN entries**

| UN number | Description |
| --- | --- |
| UN3090 | Lithium **metal** batteries (shipped alone) |
| UN3091 | Lithium metal batteries **contained in** or **packed with** equipment |
| UN3480 | Lithium **ion** batteries (shipped alone) |
| UN3481 | Lithium ion batteries **contained in** or **packed with** equipment |

The distinction between *contained in equipment*, *packed with equipment* and *shipped alone* determines the packing instruction, the quantity limit and in some cases whether the shipment may fly at all. Establish it before anything else.

**Standalone batteries and passenger aircraft**

**UN3480 and UN3090 — lithium ion and lithium metal batteries shipped on their own — are forbidden as cargo on passenger aircraft.** They are cargo aircraft only.

Batteries contained in or packed with equipment are treated differently. This is the distinction most commonly got wrong by shippers who assume "batteries are batteries".

**State of charge**

Lithium ion cells and batteries shipped alone must be offered at a **state of charge not exceeding 30%** of their rated capacity. Higher states of charge require approval from the appropriate authorities.

A battery at full charge carries the energy that makes a runaway severe. Limiting SoC limits the consequence.

**The lithium battery mark**

Packages containing lithium batteries under the smaller-quantity provisions must carry the **lithium battery mark** — which replaced the earlier lithium battery handling label. It shows the UN number(s) and a telephone number for additional information.

**Section II and the direction of travel**

Smaller consignments have historically been shippable under relaxed "Section II" provisions with reduced documentation. **Those provisions have been progressively tightened across successive editions**, with some removed entirely. Anyone relying on a Section II arrangement they used two years ago should check whether it still exists.

**Damaged, defective and recalled batteries**

Batteries identified as damaged, defective, or subject to recall for safety reasons are **forbidden for air transport** unless specifically approved. A battery that has swelled, been dropped, or shows any sign of damage does not fly.

**Equipment with batteries installed**

Powered equipment, mobility aids, electronic devices and vehicles all carry their own provisions. A device is not exempt because the battery is inside it.

**What this module deliberately does not give you**

Specific watt-hour limits, lithium content limits, packing instruction numbers, quantity thresholds and Section II eligibility.

Those change with every edition of the DGR, and a figure memorised from a training course is exactly how a shipper ends up offering a non-compliant consignment with complete confidence. **Take every number from the current edition.**

**The undeclared shipment problem**

Lithium batteries are frequently shipped undeclared — as "electronics", "spare parts", or "samples" — by shippers who do not know they are dangerous goods, and occasionally by those who do. Undeclared lithium batteries have destroyed aircraft and killed crew.

If you handle air cargo, a consignment described in vague terms, from a shipper you do not know, containing anything battery-powered, is worth a question. The cost of asking is a phone call.`,
  },
  {
    title: "8. The Shipper's Responsibilities",
    content: `Everyone involved in moving dangerous goods is responsible for complying with the regulations. **The shipper carries the greatest responsibility.**

**Before offering dangerous goods as air cargo, the shipper must ensure transport by air is not forbidden.**

**The responsibilities, as the regulations set them out**

- **Limit all packages** containing dangerous goods to the materials and quantities authorised for air transport under the DGR.
- **Ensure each shipment requiring a Shipper's Declaration** is accompanied by properly executed declaration documents conforming to the DGR.
- **Certify**, before tendering, that the contents are fully and accurately described on the shipping papers by proper shipping name; are not prohibited for transport by air; and are properly classified, packaged, marked, labelled and in proper condition for carriage.
- **Declare that all applicable air transport requirements have been met**, regardless of the routing or transport mode by which the shipment travels.

**The carrier reserves the right to reject any shipment containing known or suspected dangerous goods.**

**The Shipper's Declaration — who may sign it**

This is the point of the module.

**The declaration must be completed and signed by the shipper.**

**Neither the agent, nor the forwarder, nor the packer is permitted to complete the Shipper's Declaration for Dangerous Goods, and they may not sign it under any circumstances.**

That prohibition is absolute, and it exists because the declaration is a statement of fact about goods only the shipper can know. A forwarder who completes a declaration on a client's behalf — even helpfully, even accurately — has committed an offence and assumed a liability they cannot discharge.

Where the declaration is in paper form, **two copies are attached to the air waybill and both are signed by the shipper.** Electronic dangerous goods declarations are now widely used, and the signature requirement is satisfied electronically; the substance of who may make the declaration is unchanged.

**The legal position**

**It is a violation of law to tender cargo containing dangerous goods that have not been properly declared, identified, packaged, marked, labelled or documented.**

**Failure to properly identify a dangerous goods shipment can result in penalties or imprisonment.**

That is not a formality in the regulations. Prosecutions happen, and the person who signed is the person prosecuted.

**What the operator must do**

The operator must comply with the requirements for **acceptance, storage, loading, inspection, provision of information, emergency response, retention of records and training.**

Note "acceptance". The airline is required to check, and a well-run acceptance check catches shipper errors before they board. An agent whose consignments are repeatedly rejected at acceptance has a compliance problem, not bad luck.

**The forwarder's actual role**

You may not classify on the shipper's behalf. You may not complete or sign the declaration. What you can do is **check what you are given**: does the PSN match the class, does the packing instruction match the packaging, is the quantity within the limit for the intended aircraft, are the labels present and undamaged, is the documentation internally consistent.

Refusing a consignment whose paperwork does not add up is the single most valuable thing a forwarder does in this area.`,
  },
  {
    title: "9. Packaging and the UN Specification Mark",
    content: `**The three general requirements**

With few exceptions, dangerous goods must be packed according to a specific packing instruction. Packaging must:

- **be of good quality**
- **be compatible with its contents**
- **be able to withstand the normal conditions of air transport**

Most packagings must additionally meet prescribed specifications and performance tests for the design type, and must bear a **package specification marking**.

**Two general packing provisions apply in virtually every case:**

1. The packaging material **in direct contact** with the dangerous goods must be **resistant to any chemical or other action** of the goods.
2. The materials of the packaging must **not contain substances which may react dangerously with the contents**, form hazardous products, or significantly weaken the packaging.

**Types of packaging**

**Combination packaging** — a bottle in a box. An inner receptacle inside an outer packaging.

**Single packaging** — a drum.

**Generally, only combination packaging is permitted on passenger aircraft.** Single packaging is sometimes allowed for certain low-hazard (Packing Group III) dangerous goods.

**Outer package** — where the dangerous substance or article is not alone in the package.

**Overpack** — a package grouped together with other packages.

**Unit Load Device (ULD)** — where the package is loaded with other cargo in a container.

Each of these implies different conditions for marking, separation and loading.

**Segregation**

A primary concern is keeping incompatible dangerous goods apart. Some forms of explosives, for example, must not be loaded or packed together.

**The UN specification mark**

Dangerous goods must always be transported in approved packages unless they qualify as excepted quantities or limited quantities, or are not restricted.

**Approved packages are recognised by the UN mark.** The mark is followed by codes signifying type, packing group, limitations, year of manufacture and more.

The mark means the construction of the package corresponds to a **design type that has been tested** to the specifications in the regulations. Those tests are not gentle — packages are required to survive drops, heating, immersion, punctures and more.

**The shipper's obligation if they apply the mark**

This one carries real exposure. If the shipper is responsible for putting specification markings on a package, **they must assure that the package has satisfied all requirements**, including chemical compatibility and performance of all tests.

**Careful record keeping is essential**, because civil aviation authority inspectors may want to see all evidence of package testing during routine inspections of shipper facilities, or when investigating an incident.

Marking a package as UN-specification without holding the test evidence is a serious matter. The mark is a representation to everyone downstream that the package will perform.`,
  },
  {
    title: "10. Packing Instructions",
    content: `The Dangerous Goods List provides references to **packing instructions** — comprehensive directions on how a substance or article must be packed, including the materials to be used and provisions for ventilation, shock absorption and similar.

**How a packing instruction reads**

*Worked example.* A bottle of whisky shipped as limited quantities refers to packing instruction **Y309**. That instruction tells you:

- if the receptacle is **glass**, a maximum of 2.5 litres per package
- if **plastic or metal**, 5 litres per package
- it must be packed in a **sturdy outer package** with sufficient **cushioning and absorbent material** to prevent movement and leakage

A glass bottle above 2.5 litres is simply too big for that instruction, regardless of how well it is packed.

**Parallel packing instructions**

An entry in the DG List frequently shows **two lines** of packing instruction.

*Worked example — Acetal.* One line shows packing instructions for **specification packaging**, limiting shipments on passenger aircraft to 5 litres per package, while up to 60 litres per package may go by cargo aircraft only. A second line shows the **limited quantities** instruction, prefixed **Y**, restricting shipment to 1 litre per package.

Read both lines and know which one you are working to. The Y-prefixed instruction always carries the tighter quantity, because the packaging is less robust.

**Reading order**

1. Find the entry by proper shipping name.
2. Identify the packing group.
3. Determine passenger or cargo aircraft.
4. Read the packing instruction for **that** column.
5. Check whether a limited quantity option exists and whether you want it.
6. Go to the packing instruction itself and read it in full — the DG List gives you the reference, not the requirement.

**The step people skip is 6.** The DG List tells you *which* instruction applies. It does not tell you what the instruction says. Every year, consignments are packed to a remembered version of an instruction that has since changed.

**General packaging requirements**

These apply in virtually every case and are set out in the introductions to the packing instructions, in Section 5 of the IATA DGR and Part 4 of the ICAO TI. Read them once properly; they answer most questions before the specific instruction does.

**A note on quantities in this course**

Every litre and kilogram figure above is illustrative of **how an instruction is structured**, taken from the source material for teaching purposes. Limits change between editions.

**Never ship to a number you learned on a course. Ship to the number in the edition in force on the day.**`,
  },
  {
    title: "11. Marking",
    content: `Packages are **marked** to indicate what they contain. They are **labelled** to indicate the hazard. The two are different and the regulations treat them separately — Chapter 6.1 of Annex 18 deals with labels, Chapter 6.2 with markings.

**The standard markings on every package of dangerous goods**

- the **proper shipping name**
- the **UN or ID number**

That is the minimum, and it applies to every package unless the Technical Instructions provide otherwise.

**Additional markings in specific circumstances**

| Circumstance | Marking |
| --- | --- |
| Explosives | Net quantity and gross mass of the package |
| Radioactive material | Type of package, identification mark, and trefoil symbol where required |
| Dry ice | Net mass |
| Generic (n.o.s.) entries | Technical names of the hazardous constituents, in brackets |
| Excepted quantities | The excepted quantity mark, showing class and UN number |
| Lithium batteries | The lithium battery mark, where applicable |

**Specification markings on packaging**

Under Chapter 6.2.2 of Annex 18: each packaging manufactured to a specification in the Technical Instructions must be marked accordingly — **and no packaging may be marked with a packaging specification marking unless it meets that specification.**

Read that second half again. Applying a UN mark to a package that has not been tested to the corresponding design type is itself a breach, independent of anything that happens to the shipment.

**Language**

Chapter 6.3 of Annex 18 recommends that, **in addition to the languages required by the State of Origin**, and pending a more suitable universal form of expression, **English should be used** for markings related to dangerous goods.

**The relationship between marking and labelling**

**The proper shipping name and UN number must appear on the package in association with the label.** They work together: the label tells a handler what kind of hazard, the marking tells them exactly what substance — which is what the emergency responder needs.

**Why marking matters more than it looks**

Correct marking may be the clearest way of identifying a package containing dangerous goods **in a stressful environment**, particularly if the package has been damaged and there is a risk of contamination.

At that moment nobody is consulting the air waybill. They are reading what is written on the box.`,
  },
  {
    title: "12. Labelling and the Fixing of Labels",
    content: `**Two kinds of label**

**Hazard labels** convey the hazard the contents present in transport, by **colour and symbol**. They are **diamond shaped, with minimum dimensions of 100 mm × 100 mm.**

**Handling labels** specify handling conditions. They vary in colour, symbol and size.

**When a package carries more than one hazard label**

- there are different dangerous goods of **different primary hazards** in one package; or
- a single item of dangerous goods has a **primary hazard and one or more subsidiary risks**

**Telling primary from subsidiary**

**The primary hazard label bears the class or division number in the bottom corner.**
**Subsidiary risk labels do not show any class or division number.**

**Handling labels — when each is affixed**

| Label | Applied when |
| --- | --- |
| **Orientation** (upright arrows) | The package contains a liquid and must be kept upright |
| **CARGO AIRCRAFT ONLY** | The package is for transport only on a cargo aircraft |
| **Magnetised material** | The contents are magnetised material |

**Selecting the right labels**

The required hazard labels for each proper shipping name are **identified in the DG List** — you do not choose them from the class alone. Look up the entry.

**Fixing and condition of labels**

**Dangerous goods may not be loaded on an aircraft with damaged or missing labels.**

**Before accepting a package for loading**, the person supervising loading must inspect the goods to make sure the packages and labels are not damaged. They must also confirm all documentation is in order, and that the goods are loaded and secured safely.

That inspection is the last line of defence, and it is a physical one — someone looking at the box.

**The sequence, end to end**

1. Select the correct packaging for the material, packing group and packing instruction.
2. Fill it in accordance with the instruction.
3. If it is a specification package, ensure it bears the specification marking — and that you hold the test evidence.
4. Mark it with the proper shipping name and UN number, plus any additional markings.
5. Apply the hazard label(s) from the DG List entry, with the primary showing the class number.
6. Apply subsidiary risk labels, without class numbers.
7. Apply handling labels as appropriate.
8. Check every label is intact, legible and firmly fixed.

**Remove or obliterate old labels.** A package carrying a previous consignment's hazard label is worse than an unlabelled one — it directs an emergency responder to the wrong answer.`,
  },
  {
    title: "13. State and Operator Variations",
    content: `Variations are additional requirements imposed by individual governments or airlines, beyond the provisions in the regulations themselves.

**The definitions that matter**

**Operator** — a person, organisation or enterprise engaged in, or offering to engage in, an aircraft operation.

**State of Origin** — the State in whose territory the cargo was first loaded on an aircraft.

**State of the Operator** — the State in which the operator's principal place of business is located, or if there is no such place, the operator's permanent residence.

**Where they live**

State and operator variations are in **Section 2 of the IATA DGR** (Attachment 3 in the ICAO TI), and are amended in **post-publication addenda** circulated by both organisations.

Note the addenda. A variation can change between editions of the DGR, and an agent working only from the bound volume will miss it.

**The structural difference**

**ICAO recognises State variations. IATA recognises State and Operator variations.**

There is nothing preventing an operator from having variations to the Technical Instructions, **provided those variations are more restrictive**. Where operators have them, the practice is to file them in the IATA DGR.

Variations may apply to packing, marking, training, acceptance and handling.

**Two worked examples**

**A State variation.** USG-12 requires all consignments passing through the USA to carry emergency response information on the dangerous goods declaration, including a **24-hour emergency contact telephone number providing immediate access to a knowledgeable person**.

As with all US variations, this applies to shipments transported **to, from, or within** the US under international standards — **and to dangerous goods carried on a US-registered aircraft regardless of where it is travelling.**

That last clause catches people. A shipment between two African points, on an aircraft registered in the United States, is subject to US variations.

**An operator variation.** Qantas variation QF-02. The IATA regulations permit passengers and crew to bring book matches on board for personal use. QF-02 prohibits it.

**Practical consequences**

Some States prohibit entry of **infectious substances** without prior approval by the authorities, and some airlines will not carry them at all.

**Many airlines require advance arrangements** for dangerous goods. Unless a specialist dangerous goods agent or courier is used, senders — particularly of infectious substances — should **contact the operator directly** to check specific requirements and make the necessary arrangements.

**The working habit**

Before quoting or booking a dangerous goods consignment, establish the **routing** — including transit points and overflown States — and the **operator**, and then check Section 2 for both. A consignment compliant with the DGR and non-compliant with an operator variation will be rejected at acceptance, and the cost falls on the shipper.`,
  },
  {
    title: "14. Emergency Response and Incident Handling",
    content: `**Information to the ground**

To protect anyone who may have to deal with an aircraft on the ground in an emergency, information about what is on board must be made available wherever possible.

**If an in-flight emergency occurs and the situation permits, the commander must inform the appropriate air traffic services unit of the dangerous goods on board.** That information should include:

- the **proper shipping name**
- the **class and subsidiary risks**
- the **quantity**
- the **location on board**

Which is precisely why the documentation and the loading records have to be right. In an emergency, someone is reading them aloud over a radio.

**The reference document**

**Emergency Response Guidance for Aircraft Incidents Involving Dangerous Goods**, published by ICAO, or a similar document. In addition, there must be **company procedures for dealing with incidents**, including instructions on actions to be taken in emergencies.

**Handling a spill on the ground**

Where a package has been damaged to the extent that it spills its contents, the situation must be handled **promptly and correctly**.

**Regardless of the nature of the hazard:**

1. **Keep everyone not immediately required well away from the vicinity.**
2. **Take care of anyone who may have been harmed or contaminated, and note their names and addresses.**
3. **Consult a suitable Dangerous Goods Emergency Chart** before acting — the wrong action may make the situation worse.
4. **Obtain expert help as soon as possible.**

The third step is the one that gets skipped under pressure. Water on a Division 4.3 substance produces flammable gas. Well-intentioned action without reference to the chart has made incidents considerably worse.

**Getting expert help**

There are seldom established official channels. Local resources are often the fastest route — in the case of leaking toxins, for instance, the nearest hospital can put you in contact with a toxicologist.

**All handling agents should have an emergency chart readily available**, together with the procedures and kits to handle this type of emergency.

**The US emergency response variation**

USG-12 (US-12 in ICAO) requires shippers to supply a **valid 24-hour emergency response telephone number** which may be used to contact personnel with details about handling an emergency involving the material.

"Valid" means someone knowledgeable answers it at 0300. A number that rings out, or reaches a switchboard closed for the weekend, does not satisfy the requirement and will be picked up at acceptance in the US.

**Recording the incident**

Names and addresses of anyone potentially affected must be noted at the time. That record matters both for the individuals' health follow-up and for the investigation that will follow.`,
  },
  {
    title: "15. Training, Competence and the Limits of This Course",
    content: `**What this course is**

A structured grounding in the regulatory framework for dangerous goods by air: the classes, the identification system, packing groups, aircraft limitations, the three packaging regimes, lithium batteries, the shipper's responsibilities, marking, labelling, variations and emergency response.

It will let you read a Dangerous Goods List entry, understand what a packing instruction requires, recognise a non-compliant consignment, and hold an informed conversation with a shipper or a carrier.

**What this course is not**

**This course does not qualify you to classify, pack, mark, label, document or offer dangerous goods for transport by air.**

Under ICAO Annex 18 and the Technical Instructions, anyone performing those functions must hold **current, formally assessed dangerous goods training from a recognised provider**, valid for a limited period and subject to recurrent training.

**Do not sign a Shipper's Declaration on the strength of this course.** Do not complete one. Do not advise a client that a consignment is compliant because you recognise the class.

The consequence of getting dangerous goods wrong is not a rejected consignment. It is a fire in a cargo hold at 35,000 feet, and aircraft have been lost that way.

**Competency-based training and assessment**

The training regime has changed since older material was written. The industry has moved from a **category-based** model — where your job title determined which training package you received — to **competency-based training and assessment (CBTA)**.

Under CBTA, training is built around the **competencies a person actually needs for the functions they perform**, and is assessed against them. The shift matters because it puts the emphasis on demonstrated capability rather than attendance.

Confirm the current requirement with SACAA or the relevant authority, and with the training provider, before relying on any certificate.

**Why the industry insists on this**

**The ability to use the ICAO Technical Instructions matters because airlines operate globally.** Airlines need to keep training streamlined and avoid costly, confusing double training in both domestic and international regulations. Many countries will not accept shipments that are not prepared in accordance with the international classification, packaging and communication standards.

The ICAO standards are used in the industry in the form published by IATA as the **Dangerous Goods Regulations** — a reference known worldwide as the source of information on requirements and procedures. IATA gives detail ICAO does not, notably on preparing the **Shipper's Declaration for Dangerous Goods** and the accompanying **air waybill**, since air waybills are commercial documents outside ICAO's jurisdiction.

**The IATA DGR is based on the requirements of Annex 18 to the Chicago Convention and the subsequent editions of the ICAO Technical Instructions**, which are the legal documents relating to air transport of dangerous goods. The DGR applies to IATA member airlines, associate members and interline partners.

**The habit to leave with**

Every number in dangerous goods has an edition attached to it. Quantity limits, packing instructions, Section II eligibility, lithium battery provisions, state and operator variations — all of them change, most of them annually.

**Check the current edition. Every time. For every consignment.**

An agent who is uncertain and checks is doing the job. An agent who is confident and remembers is the one who eventually gets it wrong.`,
  },
];

export const us242987Quiz = [
  {
    q: "How are dangerous goods classified for transport purposes?",
    options: [
      "With reference to long-term health effects",
      "With reference to the immediate hazard they pose in transport",
      "By the value of the consignment",
      "By the country of origin",
    ],
    answer: 1,
  },
  {
    q: "What is the relationship between the ICAO Technical Instructions and the IATA Dangerous Goods Regulations?",
    options: [
      "They are competing standards and a shipper chooses one",
      "The ICAO TI is the legal instrument; the IATA DGR is based on it and adds airline-industry material such as the Shipper's Declaration and air waybill",
      "The IATA DGR is the legal instrument and the ICAO TI is advisory",
      "They cover different classes of dangerous goods",
    ],
    answer: 1,
  },
  {
    q: "What is the structural difference between ICAO and IATA regarding variations?",
    options: [
      "ICAO recognises operator variations; IATA recognises State variations",
      "ICAO recognises State variations; IATA recognises State and Operator variations",
      "Neither recognises variations",
      "Both recognise only State variations",
    ],
    answer: 1,
  },
  {
    q: "How many classes of dangerous goods are there?",
    options: ["Six", "Seven", "Nine", "Eleven"],
    answer: 2,
  },
  {
    q: "Which is the ONLY explosive acceptable on a passenger aircraft?",
    options: ["Division 1.1", "Division 1.4S", "Division 1.5", "Division 1.6"],
    answer: 1,
  },
  {
    q: "How many divisions does Class 4 have, and what does it cover?",
    options: [
      "No divisions; it covers liquids which give off flammable vapour",
      "Three divisions; flammable solids, substances liable to spontaneous combustion, and substances which emit flammable gases on contact with water",
      "Two divisions; flammable solids and oxidisers",
      "Three divisions, all covering liquids",
    ],
    answer: 1,
  },
  {
    q: "Which classes have NO divisions?",
    options: ["Classes 1, 2 and 4", "Classes 3, 7 and 8", "Classes 5, 6 and 9", "Classes 2, 5 and 6"],
    answer: 1,
  },
  {
    q: "For regulatory purposes, radioactive material is any substance with a specific activity greater than what?",
    options: ["7 kBq/kg", "70 kBq/kg", "700 kBq/kg", "70 MBq/kg"],
    answer: 1,
  },
  {
    q: "Which division covers toxic gases?",
    options: ["2.1", "2.2", "2.3", "6.1"],
    answer: 2,
  },
  {
    q: "Dry ice, asbestos, magnetised material and internal combustion engines all fall into which class?",
    options: ["Class 4", "Class 5", "Class 8", "Class 9"],
    answer: 3,
  },
  {
    q: "What is the Proper Shipping Name, and how is it identified in the Dangerous Goods List?",
    options: [
      "The trade name of the product, shown in bold",
      "The name appearing in capital letters; text in lower case is descriptive only and not part of the PSN",
      "Any name that accurately describes the contents",
      "The name on the safety data sheet, in full",
    ],
    answer: 1,
  },
  {
    q: "A shipper proposes to use the product's trade name on the declaration. Is this acceptable?",
    options: [
      "Yes, provided it is the registered trade name",
      "No — trade names are not acceptable; the Proper Shipping Name must be used",
      "Yes, if the UN number is also shown",
      "Only for limited quantity shipments",
    ],
    answer: 1,
  },
  {
    q: "What does \"n.o.s.\" mean, and what additional requirement attaches to such entries?",
    options: [
      "Not on ship — the entry is air-only",
      "Not otherwise specified — generic names marked with asterisks must be modified by adding technical names of hazardous constituents in brackets",
      "No other substances — the package may contain only that material",
      "Normal operating shipment — no special requirement",
    ],
    answer: 1,
  },
  {
    q: "What prefix identifies the small number of entries assigned airline-industry identifiers in the 8000 series?",
    options: ["UN", "ID", "IA", "AN"],
    answer: 1,
  },
  {
    q: "Which packing group represents the greatest danger?",
    options: ["Packing Group I", "Packing Group II", "Packing Group III", "Packing Group A"],
    answer: 0,
  },
  {
    q: "Why does the packing group matter for packaging selection?",
    options: [
      "It determines the colour of the hazard label",
      "It keys the severity of the performance tests, in particular the drop height",
      "It determines whether documentation is required",
      "It sets the maximum gross weight at 30 kg",
    ],
    answer: 1,
  },
  {
    q: "Benzyl bromide (UN1737) is Division 6.1 with subsidiary risk 8. If the package is leaking and must be moved, which hazard may be the more important consideration?",
    options: [
      "The primary toxic hazard, always",
      "The corrosive subsidiary risk — it is corrosive to skin",
      "Neither; the package should not be touched",
      "The hazards are ranked and only the primary applies",
    ],
    answer: 1,
  },
  {
    q: "How do you distinguish a primary hazard label from a subsidiary risk label?",
    options: [
      "The primary label is larger",
      "The primary label bears the class or division number in the bottom corner; subsidiary risk labels show no class or division number",
      "Subsidiary labels are bordered in red",
      "Subsidiary labels are square rather than diamond",
    ],
    answer: 1,
  },
  {
    q: "A package bears the CARGO AIRCRAFT ONLY label. On which aircraft may it fly?",
    options: [
      "Either passenger or cargo aircraft",
      "Cargo aircraft only",
      "Passenger aircraft, if the quantity is reduced",
      "Either, with the operator's approval",
    ],
    answer: 1,
  },
  {
    q: "A package prepared to passenger-aircraft instructions may fly on which aircraft?",
    options: [
      "Passenger aircraft only",
      "Either passenger or cargo aircraft",
      "Cargo aircraft only",
      "Neither, without re-marking",
    ],
    answer: 1,
  },
  {
    q: "Why must a shipper know before packing whether a consignment will travel passenger or cargo?",
    options: [
      "Because the freight rate differs",
      "Because it directly affects the net quantity of material permitted in a package, and some materials permitted cargo-only are prohibited on passenger aircraft",
      "Because the air waybill format differs",
      "Because only cargo aircraft require a declaration",
    ],
    answer: 1,
  },
  {
    q: "Certain dangerous goods not normally acceptable for air transport may be carried under exemption granted by whom?",
    options: [
      "The operator alone",
      "The State of Origin, the State of Destination, and all States to be overflown",
      "IATA",
      "The shipper's national authority only",
    ],
    answer: 1,
  },
  {
    q: "What is the maximum gross weight of a limited quantity package?",
    options: ["5 kg", "10 kg", "30 kg", "50 kg"],
    answer: 2,
  },
  {
    q: "Which packing groups are eligible for limited quantity packaging exceptions?",
    options: ["Packing Group I only", "Packing Groups I and II", "Packing Groups II and III", "All packing groups"],
    answer: 2,
  },
  {
    q: "What drop test must limited quantity packaging survive?",
    options: ["0.8 metre", "1.2 metre", "1.8 metre", "The full UN test regime by packing group"],
    answer: 1,
  },
  {
    q: "Which letter prefixes packing instructions for limited quantities in the Dangerous Goods List?",
    options: ["L", "Q", "Y", "E"],
    answer: 2,
  },
  {
    q: "Are limited quantity shipments exempt from documentation requirements?",
    options: [
      "Yes — that is the point of the exception",
      "No — they remain subject to all communication and documentation requirements; the exception relates to the packaging regime",
      "Only if under 5 kg",
      "Only on cargo aircraft",
    ],
    answer: 1,
  },
  {
    q: "What distinguishes excepted quantities from limited quantities?",
    options: [
      "Excepted quantities require UN-specification packaging; limited quantities do not",
      "Excepted quantities may be shipped without hazard labels or specific dangerous goods documentation, but require an excepted quantity mark",
      "Excepted quantities apply only to Class 9",
      "There is no difference",
    ],
    answer: 1,
  },
  {
    q: "A typical UN performance testing regime for a drum intended to contain flammable liquid includes which tests?",
    options: [
      "Drop test only",
      "Drop, leak-proof, internal pressure (hydraulic) and stacking tests",
      "Fire and impact tests",
      "Vibration and compression tests only",
    ],
    answer: 1,
  },
  {
    q: "For combination packaging, which requirement is described as frequently overlooked?",
    options: [
      "The outer packaging must be UN-marked",
      "The inner packaging must also satisfy an internal pressure test, linked to the vapour pressure of the material",
      "The absorbent material must be certified",
      "The package must be weighed before dispatch",
    ],
    answer: 1,
  },
  {
    q: "Generally, which type of packaging is permitted on passenger aircraft?",
    options: [
      "Single packaging only",
      "Combination packaging, with single packaging sometimes allowed for certain low-hazard Packing Group III goods",
      "Any packaging bearing the UN mark",
      "Overpacks only",
    ],
    answer: 1,
  },
  {
    q: "Which two general packing provisions apply in virtually every case?",
    options: [
      "The packaging must be new, and must be waterproof",
      "The material in direct contact must resist chemical action of the goods, and packaging materials must not react dangerously with the contents or weaken the packaging",
      "The packaging must be UN-marked and under 30 kg",
      "The packaging must be combination type and absorbent-lined",
    ],
    answer: 1,
  },
  {
    q: "Who may complete and sign the Shipper's Declaration for Dangerous Goods?",
    options: [
      "The shipper, the forwarder or the packer",
      "The shipper only — neither the agent, forwarder nor packer may complete or sign it",
      "Any IATA-trained person",
      "The carrier's acceptance staff",
    ],
    answer: 1,
  },
  {
    q: "What is the potential consequence of failing to properly identify a dangerous goods shipment?",
    options: [
      "A surcharge on the freight",
      "Penalties or imprisonment",
      "Refusal by the carrier only",
      "A warning letter from IATA",
    ],
    answer: 1,
  },
  {
    q: "Which of these is the operator required to comply with?",
    options: [
      "Classification of the goods on the shipper's behalf",
      "Acceptance, storage, loading, inspection, provision of information, emergency response, retention of records and training",
      "Completion of the Shipper's Declaration",
      "Determination of the proper shipping name",
    ],
    answer: 1,
  },
  {
    q: "Which lithium battery UN entries are forbidden as cargo on passenger aircraft when shipped alone?",
    options: [
      "UN3091 and UN3481",
      "UN3480 and UN3090",
      "All four lithium battery entries",
      "None — all may travel on passenger aircraft with correct packaging",
    ],
    answer: 1,
  },
  {
    q: "Lithium ion cells and batteries shipped alone must be offered at what state of charge?",
    options: [
      "Fully charged, to demonstrate function",
      "Not exceeding 30% of rated capacity",
      "Not exceeding 50% of rated capacity",
      "Fully discharged",
    ],
    answer: 1,
  },
  {
    q: "Why can a lithium battery fire not be extinguished by an aircraft cargo hold suppression system?",
    options: [
      "The holds are unpressurised",
      "A battery in thermal runaway produces its own oxygen, so the fire burns until the energy is spent",
      "The suppression system is only fitted to passenger aircraft",
      "The fire burns too cold to trigger the system",
    ],
    answer: 1,
  },
  {
    q: "What is the position on batteries identified as damaged, defective, or subject to safety recall?",
    options: [
      "They may be shipped cargo-only with double packaging",
      "They are forbidden for air transport unless specifically approved",
      "They may be shipped at reduced state of charge",
      "They may be shipped as excepted quantities",
    ],
    answer: 1,
  },
  {
    q: "What are the two standard markings required on every package of dangerous goods?",
    options: [
      "Class number and gross weight",
      "Proper shipping name and UN/ID number",
      "Shipper's name and destination",
      "Packing instruction number and packing group",
    ],
    answer: 1,
  },
  {
    q: "What are the minimum dimensions of a hazard label?",
    options: ["50 mm × 50 mm", "75 mm × 75 mm", "100 mm × 100 mm", "150 mm × 150 mm"],
    answer: 2,
  },
  {
    q: "When is an orientation label applied?",
    options: [
      "When the package contains a liquid and must be kept upright",
      "When the package is over 30 kg",
      "When the contents are magnetised",
      "When the package is an overpack",
    ],
    answer: 0,
  },
  {
    q: "Under Annex 18 Chapter 6.2.2, when may a packaging be marked with a packaging specification marking?",
    options: [
      "Whenever the shipper believes it is of adequate quality",
      "Only where it meets the appropriate packaging specification in the Technical Instructions",
      "Whenever it has passed a drop test",
      "Only where the operator has approved it",
    ],
    answer: 1,
  },
  {
    q: "What does Annex 18 Chapter 6.3 recommend regarding languages for markings?",
    options: [
      "Only the language of the State of Origin",
      "In addition to languages required by the State of Origin, English should be used",
      "Only English",
      "The language of the destination State only",
    ],
    answer: 1,
  },
  {
    q: "May dangerous goods be loaded on an aircraft with damaged or missing labels?",
    options: [
      "Yes, if the documentation is complete",
      "No",
      "Yes, on cargo aircraft only",
      "Yes, if the shipper certifies the contents",
    ],
    answer: 1,
  },
  {
    q: "Where are State and Operator variations found?",
    options: [
      "Section 2 of the IATA DGR (Attachment 3 in ICAO), and in post-publication addenda",
      "Section 5 of the IATA DGR",
      "Annex 18 only",
      "The Dangerous Goods List entry for each substance",
    ],
    answer: 0,
  },
  {
    q: "An operator wishes to impose a variation to the Technical Instructions. What is the constraint?",
    options: [
      "Operators may not impose variations",
      "The variation must be more restrictive than the Technical Instructions",
      "The variation must be approved by IATA",
      "The variation may be more or less restrictive",
    ],
    answer: 1,
  },
  {
    q: "US variation USG-12 requires emergency response information. To which shipments does it apply?",
    options: [
      "Shipments originating in the USA only",
      "Shipments to, from or within the USA, and dangerous goods on a US-registered aircraft regardless of where it is travelling",
      "Passenger aircraft shipments only",
      "Lithium battery shipments only",
    ],
    answer: 1,
  },
  {
    q: "In an in-flight emergency, what information must the commander provide to air traffic services about dangerous goods on board?",
    options: [
      "The consignee's details and the air waybill number",
      "Proper shipping name, class and subsidiary risks, quantity, and location on board",
      "The shipper's emergency telephone number only",
      "The packing instruction numbers used",
    ],
    answer: 1,
  },
  {
    q: "A package has spilled its contents on the ground. What must be done BEFORE taking remedial action?",
    options: [
      "Photograph the package for the claim",
      "Consult a suitable Dangerous Goods Emergency Chart — the wrong action may make the situation worse",
      "Apply water to dilute the substance",
      "Move the package to an isolated area",
    ],
    answer: 1,
  },
  {
    q: "Following a spill, what must be recorded about anyone who may have been harmed or contaminated?",
    options: [
      "Nothing, unless they require treatment",
      "Their names and addresses",
      "Only their employer's details",
      "Their medical history",
    ],
    answer: 1,
  },
  {
    q: "Does completing this course qualify a learner to sign a Shipper's Declaration for Dangerous Goods?",
    options: [
      "Yes, on successful completion",
      "No — that requires current, formally assessed dangerous goods training from a recognised provider",
      "Yes, for limited quantity shipments only",
      "Yes, provided a qualified person countersigns",
    ],
    answer: 1,
  },
  {
    q: "The dangerous goods training regime has moved from a category-based model to what?",
    options: [
      "Annual refresher attendance",
      "Competency-based training and assessment (CBTA)",
      "Self-certification by the employer",
      "Online-only assessment",
    ],
    answer: 1,
  },
  {
    q: "How often is the IATA Dangerous Goods Regulations reissued?",
    options: ["Every five years", "Biennially", "Annually", "Only when ICAO amends Annex 18"],
    answer: 2,
  },
  {
    q: "A shipper packs a consignment to a quantity limit they memorised on a training course two years ago. What is the risk?",
    options: [
      "None, provided the substance is unchanged",
      "Limits change between editions; the consignment may be non-compliant and must be checked against the edition in force",
      "The packaging will fail the drop test",
      "The declaration will be rejected on format grounds only",
    ],
    answer: 1,
  },
];

export const us242987Practical = {
  title: "Read the List, Check the Consignment",
  description: `Four assessed exercises. None involves preparing a live dangerous goods shipment, and the assessment brief states that explicitly — this course does not confer authority to offer dangerous goods for air transport.

**Part 1 — Reading the Dangerous Goods List.** Learners are given extracts from a current Dangerous Goods List and, for each of several substances, must identify the proper shipping name, UN number, class and division, any subsidiary risk, the packing group, whether it is permitted on passenger aircraft or restricted to cargo aircraft, and which packing instruction and quantity limit applies for the stated routing.

**Part 2 — Classification reasoning.** Given safety data sheet extracts, learners determine which class each material would fall into and what subsidiary risks would apply, then explain why a generic n.o.s. entry would or would not be appropriate and what technical names would be required.

**Part 3 — Compliance check on a prepared consignment.** Learners receive photographs or descriptions of packages together with their documentation, and must identify every non-compliance: wrong or missing markings, incorrect or damaged labels, primary and subsidiary labels confused, quantity exceeding the limit for the intended aircraft, CARGO AIRCRAFT ONLY label absent where required, declaration completed by the wrong party, and packaging inappropriate to the packing group.

This is the exercise that matters most. A forwarder's real function in dangerous goods is checking what a shipper presents, and refusing it when it does not add up.

**Part 4 — Variations and routing.** Given a routing with transit points and a named operator, learners identify which State and Operator variations would apply, including where a US-registered aircraft brings US variations into a movement between two non-US points, and state what additional requirements follow.

Assessed on accurate reading of the List, correct application of the passenger versus cargo distinction, and whether the learner identifies non-compliances rather than assuming a prepared consignment is correct.

**Learners are required to work from a current edition of the regulations.** Any answer taken from a figure quoted in the course notes rather than looked up is marked down, regardless of whether it happens to be right.`,
};

export const us242987Outcomes = [
  "Explain what dangerous goods are and identify the regulatory instruments governing their carriage by air",
  "Identify dangerous goods by UN/ID number and proper shipping name using the Dangerous Goods List",
  "Classify dangerous goods into the nine classes and their divisions, and identify subsidiary risks",
  "Apply packing groups and explain how they determine packaging performance requirements",
  "Determine passenger aircraft, cargo aircraft and forbidden limitations for a given substance",
  "Distinguish specification, limited quantity and excepted quantity packaging regimes",
  "Identify the specific requirements applying to lithium batteries, including state of charge and passenger aircraft prohibitions",
  "Describe the shipper's responsibilities, including who may complete and sign the Shipper's Declaration",
  "Apply packaging requirements and interpret the UN specification marking",
  "Read and apply a packing instruction, including parallel and Y-prefixed instructions",
  "Apply marking requirements, including additional markings for specific circumstances",
  "Apply labelling requirements and distinguish hazard labels from handling labels",
  "Identify applicable State and Operator variations for a given routing and operator",
  "Describe emergency response procedures and the information required in an incident",
  "Explain the training and competence required to offer dangerous goods for air transport",
];

export const us242987Summary =
  "The regulatory framework for dangerous goods in air transport: the nine classes and their divisions, UN numbers and proper shipping names, packing groups and subsidiary risks, passenger and cargo aircraft limitations, the three packaging regimes, lithium batteries, the shipper's responsibilities and the Shipper's Declaration, packaging and the UN specification mark, packing instructions, marking, labelling, State and Operator variations, and emergency response. Taught to the current ICAO Technical Instructions and IATA Dangerous Goods Regulations. This course does not qualify a learner to offer dangerous goods for air transport — see Module 15.";

export const us242987 = {
  code: "US-242987",
  title: "Identify, Pack, Mark & Label Dangerous Goods for Transportation by Air",
  summary: us242987Summary,
  outcomes: us242987Outcomes,
  modules: us242987Modules,
  quiz: us242987Quiz,
  practical: us242987Practical,
  passMark: 70, // 39 of 56
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. The nine classes and divisions — one-page reference with label artwork
 *   2. Hazard label vs handling label chart, with the primary/subsidiary test
 *   3. Packaging regime comparison — specification / limited / excepted
 *   4. Lithium battery decision tree — UN entry by configuration, with a
 *      prominent "check current edition" banner
 *   5. Consignment compliance checklist — what to check before accepting
 *   6. Sample Dangerous Goods List extracts for the practical (current edition)
 *   7. Marking and labelling placement diagram
 *   8. Emergency response actions card
 *
 * Item 5 carries the most practical weight — checking what a shipper presents is
 * the forwarder's actual function here.
 *
 * ── DO NOT PRINT QUANTITY LIMITS ON ANY MATERIAL ──────────────────────────
 * Every quantity limit, packing instruction number and lithium battery threshold
 * changes between editions. Materials must direct the learner to the current
 * DGR, not reproduce numbers that will be wrong within a year and will be
 * trusted because they came from AUK.
 *
 * ── SCOPE STATEMENT — DO NOT REMOVE ───────────────────────────────────────
 * This course does not qualify anyone to classify, pack, mark, label, document
 * or offer dangerous goods for air transport. That requires current, formally
 * assessed DG training from a recognised provider. Module 15 states this to the
 * learner. It must not be softened, and the course must not be marketed or
 * described anywhere as dangerous goods certification.
 *
 * ── CORRECTIONS TO THE SOURCE MANUAL ──────────────────────────────────────
 *   1. Lithium batteries — absent entirely. Now Module 7.
 *   2. Class 4 — the manual says it has no divisions and comprises liquids.
 *      Both wrong; the text is copied from Class 3. Corrected, and the error is
 *      flagged to the learner in Module 2 because they may meet the old text.
 *   3. Training regime — CBTA has replaced category-based training.
 *   4. Editions — DGR annual (67th for 2026), ICAO TI biennial.
 *   5. Paper declarations stapled to the air waybill — electronic DGDs are now
 *      widely used.
 *   6. "Civil Aviation Authority" — in South Africa, SACAA.
 *
 * The manual's footer cites "Unit standard 242487" throughout where the course is
 * 242987, and its PDF metadata carries a different unit standard's title
 * (US242983). Neither affects content, but both suggest the document was
 * assembled from a template without proofing.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *   - Current IATA DGR edition and ICAO TI edition
 *   - All lithium battery provisions — these change most often
 *   - Section II eligibility and any further restrictions
 *   - State and Operator variations, including post-publication addenda
 *   - SACAA requirements for DG training and acceptance
 *   - CBTA implementation status
 */
