/**
 * AUK SPM 018 — Condition Inspection & Pre-purchase Inspection for Vessels
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCE
 * Derived from "Conduct a Pre-Purchase and Condition Inspection — Learner Guide",
 * AUK Marine and Mining (Pty) Ltd, 01 02 2025, marked Strictly Confidential.
 * AUK's own material.
 *
 * PERSONAL DATA REMOVED: the source guide is personalised to a single named
 * learner on its title page. That name does not appear anywhere in this content
 * and must not be carried into the LMS.
 *
 * SCOPE NOTE: the source guide is written against TWO unit standards, AUK SPM 018
 * and AUK SPM 019. Only SPM 018 exists in the catalogue. Either SPM 019 needs its
 * own course row, or the guide's cover should be corrected — see the note at the
 * foot of this file.
 */

export const aukSpm018Modules = [
  {
    title: "1. What a Condition Inspection Is — and What It Is Not",
    content: `A condition inspection is a structured assessment of the overall state of a vessel, carried out for a client who is not the flag State and not the classification society. The client is usually an insurer, a financier, a prospective buyer, or an owner who wants an independent view of an asset they already hold.

That distinction shapes everything. You are not verifying statutory compliance on behalf of an administration. You are answering a commercial question: what is the real condition of this ship, and what does that mean for the person paying you?

**The family of shipboard inspections, and what separates them**

A **class survey** verifies compliance with a classification society's rules. It is carried out by a class surveyor, on class's authority, and it results in certificates being endorsed or conditions of class being imposed.

A **statutory survey** verifies compliance with a convention — SOLAS, MARPOL, Load Line — on behalf of the flag State or a recognised organisation acting for it.

A **port State control inspection** is enforcement. A PSC officer checks whether a foreign ship in their port meets international requirements, and can detain it.

A **vetting inspection** — SIRE 2.0 for tankers, or the dry bulk equivalents — assesses a ship's acceptability to a charterer or cargo interest.

A **condition inspection** does none of those things. It produces an opinion for a commercial client, and it has no regulatory force whatsoever. You cannot detain a ship, impose a condition of class, or require anything. What you can do is describe accurately what you found.

**Condition versus pre-purchase**

The two overlap heavily, and this course covers both, but the difference in depth matters.

A **condition inspection** asks: what state is this ship in? It suits insurance renewal, periodic asset review, and risk management.

A **pre-purchase inspection** asks the same question and then several more: what will it cost to put right, what liabilities come with it, and what should the buyer do about the price? It goes further into manufacturer details, equipment specifications, performance data and maintenance history, because the buyer is about to commit several million dollars on the strength of it.

Everything in a condition inspection appears in a pre-purchase inspection. The reverse is not true.

**Why insurers commission them**

An underwriter commissioning a condition inspection is managing exposure. They want to know whether the vessel is seaworthy, whether it has been maintained, whether its value matches what is being declared, and whether there are defects that will become claims. A report that says "generally satisfactory" without evidence is worth nothing to them. A report that says which hatch coamings are wasted, by how much, and what that implies for the next loaded passage is worth what they paid for it.

**The one sentence to carry through the course**

Your report will be read by someone who was not there, who cannot go and look, and who will make a financial decision on the strength of it. Everything that follows — the photography discipline, the document collection, the way defects are described — exists to serve that reader.`,
  },
  {
    title: "2. Reading a Ship: Structure, Machinery and Systems",
    content: `You cannot inspect what you cannot name. This module is the vocabulary and the mental model — not so you can recite it, but so that when you walk a duct keel at 0600 you know what you are looking at and what it should look like.

**Hull.** The hull provides buoyancy and structural strength and is the part most exposed to the sea. It is subdivided into compartments for stability and damage survival. What you are looking for: wastage, deformation, cropped and renewed plating, hard marks from previous contact, and the condition of coatings in the spaces that matter most.

**Decks and deck structure.** The main deck is the strength deck. Beneath it, deck plating, longitudinals, transverses and girders carry the ship's hull girder loading. Hatch covers and hatch coamings on a dry cargo ship are where water gets in, and they are the single most common area of serious finding on a bulk carrier.

**Superstructure.** Everything above the main deck — bridge, accommodation, funnel casing. Design and placement affect stability and visibility. Corrosion at the accommodation front and around exposed doors and windows tells you how the ship has been maintained where nobody has to look.

**Main engine.** Usually a large slow-speed two-stroke diesel, converting fuel to shaft power. What matters to you is not the theory but the record: running hours, overhaul history unit by unit, latest performance report, and whether the condition of the engine room matches what the paperwork claims.

**Auxiliary engines.** Generate electrical power. Look at running hours across the sets — a ship running one generator hard while two sit idle has either a fault or a management problem.

**Propeller and rudder.** Propulsion and steering. Blade damage, rope cutter condition, rudder stock wear-down readings and pintle clearances come from class records and the last drydock report rather than from what you can see afloat.

**Ballast tanks, cargo holds and tanks.** This is where the ship's real condition lives. Coating breakdown, hard rust scale, wasted brackets, holed air pipes. A ship can look immaculate on deck and be structurally compromised three metres below your feet.

**Duct keel, cofferdams, void spaces.** Rarely visited, rarely maintained, frequently the worst spaces aboard.

**Cargo systems.** Cranes, derricks and gantries; lashing fittings both fixed and loose; hatch covers and their securing arrangements. On tankers: cargo pumps, pipelines, manifolds, the pump room, and inert gas systems whose function is to keep tank atmospheres below the flammable range.

**Machinery and safety systems.** Pumps and piping, ventilation, firefighting systems, anchor and mooring equipment, life-saving appliances.

**Energy efficiency instrumentation.** EEXI, SEEMP, CII, and the engine or shaft power limitation arrangements (EPL and ShaPoLi) that many ships have fitted to meet EEXI. A buyer cares about these because a ship with a poor CII rating has a commercial problem that gets worse each year as the reduction factors tighten.

**How to use this module.** When you plan an inspection, work through this list and mark which items you will physically examine, which you will assess from records, and which you cannot assess at all in the circumstances you are given. That third category goes into your report as a stated limitation. An inspector who quietly omits what they could not see is writing a misleading report.`,
  },
  {
    title: "3. The Regulatory Frame the Inspector Actually Uses",
    content: `You are not auditing compliance. But almost every defect you find sits against a requirement somewhere, and citing it turns an opinion into a finding.

**The conventions that matter most on an inspection**

**SOLAS 1974** — construction, subdivision, machinery, fire protection, life-saving appliances, radio, navigation. The parent convention for most of what you will physically examine. Chapter V governs navigational equipment and charts; Chapter II-2 fire safety; Chapter III life-saving.

**MARPOL 73/78** — six Annexes covering oil, noxious liquids, packaged harmful substances, sewage, garbage and air emissions. The Oil Record Book, garbage record book, oily water separator condition and Annex VI arrangements are all inspectable and all tell you something about how the ship is run.

**Load Line 1966** — minimum permissible freeboard, and the condition of closing appliances, ventilators, air pipes and freeing ports that the assignment depends on. Load Line items are among the most commonly found and most easily evidenced defects on deck.

**COLREG 1972** — collision avoidance. Relevant to you mainly through navigation lights, shapes and sound signalling equipment.

**STCW** — crew competence and certification. You check that certificates exist and are valid, not that the holder is competent.

**MLC 2006** — accommodation, food and catering, hours of rest, employment agreements. Accommodation condition is a legitimate part of a condition inspection and often a revealing one.

**ISM Code** — the safety management system. For your purposes the SMS is evidence: a planned maintenance system that is current, defect reporting that is real, and a crew who can describe procedures indicate a ship that has been looked after.

**ISPS Code** — security. Usually peripheral to a condition inspection, but access control arrangements and restricted area markings are quick to observe.

**Ballast Water Management Convention** — the treatment system, its type approval, and whether it actually works. A BWM system that has never operated correctly is a real and expensive liability for a buyer.

**AFS Convention** — anti-fouling systems. Relevant to hull condition and to the cost of the next drydocking.

**The codes that attach to cargo**

IMSBC for solid bulk cargoes, including the Group A liquefaction hazard. IBC and IGC for chemicals and liquefied gases in bulk. IMDG for packaged dangerous goods. The CSS Code for stowage and securing. The Grain Code. The BLU Code for bulk carrier loading and unloading. Which of these applies depends entirely on the ship in front of you, and knowing which one applies is part of reading the ship correctly.

**Navigation and communications**

ECDIS is mandatory for the ship types and sizes phased in under SOLAS V, with type-approved equipment, backup arrangements, and ENCs meeting IHO S-57 and encrypted to S-63. On inspection, check: is the equipment type-approved, are charts up to date, is the backup arrangement real (a second independent ECDIS or a full folio of corrected paper charts), and have the officers got ECDIS-specific and type-specific familiarisation. GMDSS equipment, EPIRB and SART battery and service dates, and the AIS and LRIT arrangements complete the picture.

**How to use a citation**

"The starboard side No. 3 hatch coaming compression bar is wasted over approximately 1.5 metres" is a description. "The starboard side No. 3 hatch coaming compression bar is wasted over approximately 1.5 metres, compromising the weathertight integrity required under the Load Line Convention" is a finding a client can act on.`,
  },
  {
    title: "4. Class, Flag and the Certificate Set",
    content: `Two institutions stand behind every ship you will inspect, and understanding what each one does tells you what their documents are worth as evidence.

**The classification society** sets technical rules for design, construction and maintenance; approves plans; surveys during construction; and then surveys periodically through the ship's life — annual, intermediate and special (renewal) surveys on a five-year cycle. It issues a class certificate and assigns class notations describing what the ship is built and equipped for.

For an inspector, the class record is the single most valuable document set aboard. The **survey status report** tells you what is due, what is overdue and what conditions of class are outstanding. A ship with several overdue items or live conditions of class is telling you something before you have opened a single hatch.

**The flag State** carries legal responsibility for the ship under international law and may delegate survey and certification to a recognised organisation — usually the same classification society. Flag sets registration eligibility, manning levels through the Minimum Safe Manning Document, and national requirements above the conventions.

**Open registries** — Panama, Liberia, Marshall Islands and others — offer registration with fewer restrictions and lower cost. This is not in itself a criticism, but flag performance varies, and a ship's flag correlates with its PSC detention history in ways a buyer should understand.

**The certificate set you should expect to see**

Statutory: Safety Construction, Safety Equipment, Safety Radio, Load Line, IOPP, IAPP, Sewage, Ballast Water Management, Anti-Fouling, Tonnage, Minimum Safe Manning, MLC Certificate and DMLC Parts I and II, ISM Safety Management Certificate and a copy of the company's Document of Compliance, ISPS International Ship Security Certificate.

Class: class certificate, survey status, and any conditions of class or memoranda.

Commercial and operational: Continuous Synopsis Record, P&I certificate of entry, hull and machinery insurance, civil liability certificates for oil pollution where applicable, cargo gear register.

**What to actually check**

Validity dates are the least of it. Check the **endorsements** — an annual verification that has not been endorsed means the survey has not been done. Check that the company on the Document of Compliance is the entity actually managing the ship. Check whether certificates are full term or short term, because a short-term certificate means something was not satisfied. And check the ship's own certificate tracking: a master who produces a maintained expiry list is running a different ship from one who has to go looking.

**Conditions of class and the buyer**

A condition of class is class's formal requirement that something be rectified by a stated date. For a buyer they are both a warning and a negotiating position: they are documented, dated, priced by the yard, and undeniable. Listing them accurately is one of the most commercially useful things a pre-purchase report does.`,
  },
  {
    title: "5. Getting the Job: Scope, CV, Quotation and Indemnities",
    content: `Before any of the technical work, there is a commercial process. Getting it wrong costs you money and occasionally costs you the assignment.

**The CV.** Clients select inspectors on experience, and the CV is how that is assessed. It should be detailed and specific: ship types you have actually sailed on or inspected, ranks held, trades, and the inspection work you have done. A generic CV loses to a specific one every time.

**The quotation.** Quote a lump sum that includes everything you will spend: your fee, travel, accommodation, subsistence, visas. Agent's attendance, launch or boat hire and any medical or entry requirements are normally excluded and billed separately, but state that explicitly rather than leaving it to be discovered.

The commercial discipline that matters: **if it is not in your lump sum, you will not be paid for it.** Inspectors routinely lose money on a flight change or an extra night ashore because the quotation was silent.

**Payment terms.** Typically 30 days from satisfactory completion — meaning the job done, the report submitted, and the invoice raised against the agreed quotation. Your invoice must match your quotation. A mismatch delays payment and invites a query you will spend a week resolving.

**What you receive once the job is confirmed**

A properly organised client will issue: the scope of work, the checklist to be used, the protocols to follow, the indemnity arrangements, the agent's details, the vessel name, the port or anchorage, guidelines covering photographs, documents and camera settings, any special requirements, and the instructions for correspondence and uploading.

**Read the scope before you accept it.** The scope defines what you are being paid to do and what you will be held to. If it requires tank entry, confirm who is arranging gas-freeing and entry permits. If it requires a sea trial or a bunker survey, those are separate disciplines with their own time requirements. If it requires something you are not competent to do, say so before you board, not in the report.

**Indemnities.** Inspection work carries professional liability. A buyer who purchases a vessel on the strength of your report and then discovers a defect you missed will look for someone to blame. Understand what the indemnity arrangement covers, whether you hold professional indemnity insurance, and what limitation of liability applies. This is not administrative detail — it is the difference between a bad job and a ruinous one.

**The standard you are held to.** You are required to exercise all reasonable skill, care, diligence and proper professional and technical expertise and judgement in performing the work. That is the contractual standard, and it is also the standard a court would apply.`,
  },
  {
    title: "6. Preparation and Boarding",
    content: `**Liaison before travel.** Contact the agent early for the vessel's schedule, berth or anchorage, gate pass and port entry requirements. Vessel schedules move; a ship that was due alongside Tuesday sails Monday night. Confirm and reconfirm.

**Ask to stay aboard.** Request permission from the vessel or through the agent to remain on board overnight. On a two-day inspection this transforms the job: you start at 0600 instead of waiting for a launch, you see the ship working rather than the ship prepared for you, and you eat and talk with the crew, which is where a surprising amount of useful information comes from.

**Personal protective equipment.** Full PPE, yours, brought with you. Coveralls, safety boots, hard hat, gloves, eye protection, and a harness if your scope includes anything at height. Borrowed PPE fits badly and a ship that cannot lend you any is a finding in itself.

**Your own gadgets — and this list matters**

A **camera**. On tankers it must be **intrinsically safe (ex-proof)**. A non-approved camera on a tanker deck is a serious safety breach and will, quite rightly, get you removed from the ship.

A **beam torch and a headlamp**. Both. The headlamp keeps your hands free on a ladder; the beam torch reaches across a hold.

**Markers**, for scale in photographs and for marking positions.

**Additional instruments** as the scope requires: thermal imaging gun, gas detector, ultrasonic thickness gauge, hammer, moisture meter.

Do not rely on borrowing. A ship that is being sold has no particular incentive to equip you well.

**Safety on arrival.** Observe all health and safety rules applying at the location, including the ship's own and the terminal's. Familiarise yourself with the hazards you may encounter before you encounter them. You are responsible for the safety and adequacy of your own operations and methods — which means you decide whether to enter a space, and you carry the consequences of that decision.

**The opening meeting.** Meet the master and the relevant officers and engineers before you start. Cover:

- The scope and a tentative schedule of the inspection
- The support and cooperation you will need from the ship's staff
- The documents you will need collected
- Whether photographs of ship's staff are required, and consent for them

This meeting does the same work as an audit opening meeting. An inspector who arrives and starts photographing without explanation gets a defensive crew, closed doors and slow document production. An inspector who explains what they are doing and why usually finds that the chief engineer volunteers the thing that has been bothering him.

**A note on the ship's position.** The crew may know the vessel is being sold, or may not. Some will be worried about their jobs. Be straightforward about what you are doing and do not speculate about the transaction with them — it is not your information to share.`,
  },
  {
    title: "7. The Physical Inspection",
    content: `This is the core of the job. Twelve to sixteen hours of physical work across one or two days, covering the whole ship.

**The two non-negotiables**

**At least two ballast tanks and two cargo holds, entered and inspected from the bottom.** Not looked into from the access hatch — entered and worked from the tank top upward, safely, with proper entry permits and gas-freeing. This single requirement separates a real inspection from a walk round. Structural condition lives in the double bottom and the lower stool, and it cannot be assessed from a manhole.

**Safety governs.** If entry cannot be made safely — atmosphere not confirmed, no attendant, inadequate lighting or access — you do not enter, and the limitation goes in your report. An inspector injured or killed in a tank has helped nobody.

**Keep the client informed.** Update the client during breaks. A short message noting what you have covered and anything significant emerging lets them react while you are still aboard and able to look again.

**The areas to cover**

Hull · decks · hatch covers · hatch coamings · cargo tanks and holds · ballast and fuel tanks · duct keel, cofferdams and void spaces · deck machinery · outfitting and stores · cargo gear · tanker deck handling arrangements, pump room and cargo control room · accommodation · navigation equipment and aids · main engine and engine room · machinery spaces · life-saving appliances, fire-fighting appliances and pollution control equipment · superstructure · logbooks and documentation · certificates · training and drill records · ISM, ISPS and MLC compliance · the planned maintenance system and any digital systems aboard · spares · bunker survey where in scope.

**Sequence it deliberately.** Documents early, because they tell you where to look. Tanks and holds when the crew and permits are available, which usually means planning around cargo operations. Engine room with the chief engineer if possible, because his commentary while you walk is worth more than the same hour alone. Accommodation and galley at a time that does not disrupt meals. Deck in daylight.

**Interview as you go.** Ask the bosun how often the ballast tank coatings have been touched up. Ask the second engineer what breaks most often. Ask the third officer to show you the last LSA inspection. People will tell you things that never appear in a record.

**Fill the form as you go, not afterwards.** Record initial and key defects while you are standing in front of them. Detail that seems unforgettable at 1000 has gone by 1800, and the report you write three days later will be poorer for it.

**What you are actually looking for**

Not perfection. Every working ship has defects. You are looking for the pattern: whether defects are isolated or systemic, whether maintenance is planned or reactive, whether the condition of the spaces nobody visits matches the condition of the spaces everybody sees. A ship with a tidy engine room, a current PMS, and heavily wasted ballast tanks is telling you exactly where the money has been spent and where it has not.`,
  },
  {
    title: "8. Photography and Evidence Discipline",
    content: `The photographs are not illustrations. On most inspections they are the primary evidence, and the client will spend more time in the photo folders than in your text.

**Volume.** Aim for **over a thousand photographs**, of which **at least four hundred** cover decks, pipelines and fittings. That number surprises people the first time. It should not: a bulk carrier has seven holds, each with coamings, cleats, compression bars, cross-joints, ladders, bilge wells and tank top plating, and each of those needs enough frames to establish condition rather than assert it.

**Resolution — and this is the counter-intuitive part.** Take ship photographs at **medium resolution, not high**. The client needs to receive, store and circulate several thousand images, and a folder of 12-megapixel files defeats that. **Documents are the exception** — photograph those at high resolution, because they will be read.

**Intrinsically safe camera on tankers**, without exception.

**Where access is restricted** — a deck you cannot walk, a tank you cannot enter, a space closed for cargo operations — use an approved camera if one can be borrowed from the vessel, or take zoom photographs from the bridge, bridge wings or another safe vantage point. Then record in the report that the coverage was obtained at distance and why.

**Landscape orientation for all vessel photographs.** Reports and slide layouts are landscape. Portrait images waste half the page and look amateurish when the client assembles the pack.

**File and folder discipline**

Organise into folders as the client specifies, and sub-folder the documents by subject — main engine decarbonisation, auxiliary engine performance, class survey status, and so on. A client who has to open forty files to find the lube oil analysis will remember it.

**Do not duplicate photographs across folders.** It inflates the pack and creates confusion about how many instances of a defect you actually found.

**Do not rename files** unless renaming serves identification. Camera-sequential filenames preserve the order in which you walked the ship, which is itself information — and the embedded timestamps corroborate when you were where.

**What makes a photograph evidence rather than decoration**

Include something for scale — a marker, a glove, a torch, a hand. Take a wide shot establishing where you are, then the close shot showing the defect. Without the wide shot, a photograph of wasted plating could be from any ship on earth.

Photograph the nameplate, the tag, the frame number, the tank marking. "Corrosion in a ballast tank" is worth little. "Corrosion at the forward bulkhead of No. 3 port water ballast tank, frame 84, with the tank marking visible in the establishing shot" is worth a great deal.

And photograph what is **right** as well as what is wrong. A report containing only defects implies a ship in poor condition. Balanced coverage is both fairer and more credible.`,
  },
  {
    title: "9. Documents to Collect and What They Tell You",
    content: `Collect the documents early. They direct the physical inspection, and they are frequently the most revealing part of the job.

**The core set**

- Vessel particulars — one page
- Crew list
- Latest class survey status and listing
- Last service records for navigation equipment, fire-fighting appliances and life-saving appliances
- Main engine and auxiliary engine running hour records
- Main engine overhaul records, all units
- Auxiliary engine overhaul records
- Latest main engine performance report
- Performance reports for all auxiliary engines
- Last lubricating oil analysis report
- Machinery particulars
- Hull particulars
- General arrangement plan
- Capacity plan, docking plan, shell expansion where obtainable
- Last drydock report and specification
- Planned maintenance system extract showing overdue items
- Defect list and outstanding requisitions
- Oil Record Book and garbage record book
- PSC inspection history
- Certificate set, as covered in Module 4

**Reading them, not just collecting them**

**Running hours against overhaul records.** Compare unit by unit against the maker's recommended intervals. Units significantly over interval indicate deferred maintenance and a cost the buyer will inherit.

**Main engine performance report.** Exhaust temperature deviation between units, scavenge pressure, maximum pressure, specific fuel consumption against the shop test. Drift tells you about turbocharger condition, fuel injection and general wear.

**Lubricating oil analysis.** Iron content trends indicate liner and ring wear. Water content indicates a cooler leak. A single report tells you a little; a series tells you the direction of travel — so ask for the last several, not just the latest.

**Class survey status.** Overdue items, conditions of class, and how long anything has been outstanding. A condition of class that has been extended twice is a different signal from one raised last month.

**PSC history.** Detentions, deficiency counts and the nature of the deficiencies. A pattern of ISM-related deficiencies across multiple ports indicates a management problem rather than a hardware one.

**PMS overdue report.** Ask for it specifically. Every ship has some overdue items; the questions are how many, how long, and whether any are critical equipment.

**The cross-check that matters most**

Take one defect you found physically and trace it through the paperwork. Was it reported? Is it in the PMS? Is there a requisition? Was it raised at the last class survey? Whether the ship's own systems knew about the thing you found by walking tells you more about how the vessel is run than any single document will.

**Handling and confidentiality.** These documents belong to the owner and are given to you for a defined purpose. Photograph them at high resolution, keep them organised, and do not circulate them beyond the client engagement.`,
  },
  {
    title: "10. Defects, Risk and Writing the Report",
    content: `**Report within the deadline.** Typically two to three days from disembarkation. Your client is usually working to a transaction timetable, and a report that arrives after the decision has been made is worth nothing however good it is.

**Use the client's template.** Most clients provide one, often with a sample completed report. Use it. Inspectors who impose their own format create work for the client and irritation with it.

**Describing a defect**

Four components, every time:

**What** — the specific item, with its identifier. Not "a fire hydrant" but "the fire hydrant at frame 62, starboard side, main deck".

**Where** — located precisely enough that another person could go and find it.

**Condition** — measurable where possible. Extent in metres or square metres, depth of wastage in millimetres if gauged, percentage of coating breakdown. "Significant corrosion" means nothing; two people will read it two different ways.

**Consequence** — what it means. Weathertight integrity compromised. Equipment unavailable for its designed purpose. Requirement not met. Cost to rectify at the next opportunity.

**Recommendation** — for a pre-purchase inspection especially, actionable advice: repair now, repair at next drydock, monitor, or accept.

**The evidence standard**

Everything in the report must be traceable to something you saw, measured, or were shown. "The crew appear poorly trained" is opinion and has no place. "Three of the four officers interviewed could not locate the emergency fire pump starting instructions" is evidence.

Where you could not inspect something, say so explicitly and say why. A report with stated limitations is professional. A report that silently omits what could not be examined is misleading, and if the buyer relies on it, that omission is your liability.

**Risk assessment**

Group your findings by what they threaten: structural integrity, machinery reliability, safety systems, operational procedures, environmental compliance, crew competence and certification, emergency preparedness, security. This lets a client see whether the ship has one serious problem or a broad pattern of neglect — a distinction that entirely changes what they do next.

**For a pre-purchase report, the defect list is the commercial document**

The buyer will use it to negotiate. Which means each item needs an indication of severity, a view on timing, and where you are competent to give one, an indication of cost or an indication that a yard quotation is needed. Items that are genuinely conditions of class carry particular weight because they are documented, dated and undeniable.

**Submission**

Load the report, photographs and documents into the folder structure the client specified, in the manner they specified. Check the pack opens and is complete before you send it. Then invoice against your quotation.

**One more thing, and it costs more than people expect.** Check your dates. A report dated before the inspection it describes, or with the wrong vessel name carried over from a previous template, undermines every finding in it. The reader who spots the error starts wondering what else was done carelessly — and they are not wrong to.`,
  },
  {
    title: "11. Sale and Purchase: Stakeholders and Process",
    content: `A pre-purchase inspection sits inside a transaction. Understanding the transaction tells you why the buyer needs what they need, and when.

**The stakeholders**

The **buyer** commissions the inspection and uses it to decide and to negotiate. The **seller** provides access and documentation, and wants a smooth sale. The **broker** introduces the parties, coordinates, and assists in negotiation. **Marine surveyors and inspection companies** — you — provide an accurate, unbiased assessment.

Behind them: the **classification society**, whose certificates and survey status you rely on; the **flag State**, present and prospective; **lenders**, who may require your report before approving finance; **insurers and P&I clubs**, who use it to assess insurability and terms; **legal advisers** on both sides; **charterers**, where the ship is bought with employment attached; and **shipyards**, who may quote against your defect list.

Your report may be read by most of these. Write it accordingly.

**The process, in sequence**

**1. Inspection and evaluation.** The pre-purchase inspection is carried out and the report evaluated.

**2. Firm offer.** The buyer makes an outright offer specifying: the vessel; the full name and registered address of the buying entity — and it must be the same entity from which all payments are made; the sellers as per the vessel's registry certificate; the price; the place of delivery; the laycan; the deposit terms; and the balance terms. The offer is made subject to a mutually agreed MOA.

**3. Negotiation.** Counter-offers on the main terms. Once the main terms are agreed the vessel goes "on subjects".

**4. Memorandum of Agreement.** Drafted on a standard form, usually the Norwegian Sale Form, and signed by both parties.

**5. Escrow.** An escrow agent is appointed, fees usually split equally. The agent conducts KYC and due diligence on both parties and confirms readiness to receive funds. An escrow agreement is signed.

**6. Deposit.** Typically ten percent of the purchase price, lodged within three banking days of the escrow agent's confirmation.

**7. Observers.** Once the deposit is lodged, the buyer is usually permitted to place observers aboard — commonly two — who remain until delivery for familiarisation. If you inspected the vessel, these people will be working from your report.

**8. Notices of delivery.** The seller gives approximate notices — commonly 20, 10, 5 and 3 days — of the vessel's arrival at the place of delivery.

**9. Documents.** Both sides prepare their delivery documents, exchange drafts, and finalise. The buyer appoints a lawyer to prepare buyer's documents and verify the seller's.

**10. Underwater inspection.** On arrival at the place of delivery, an underwater inspection is carried out in lieu of drydocking. Divers and class attendance are arranged and paid for as the MOA provides — check the actual clause in the form being used rather than assuming, because who bears which cost varies with how the clause has been amended.

**11. Notice of Readiness.** Tendered by the seller once the underwater inspection is complete. The buyer remits the ninety percent balance plus the approximate cost of bunkers and lubricants remaining on board.

**12. Closing.** Within three banking days of NOR, at the escrow agent's office. Original documents are exchanged, release instructions given, the Protocol of Delivery and Acceptance signed, and the buyer's crew take over.

**Where your report actually bites**

Between steps 1 and 3. The defect list is the buyer's negotiating instrument, and a defect properly evidenced and costed moves the price. A defect vaguely described does not, because the seller's broker will dismiss it and the buyer has nothing to point to.`,
  },
  {
    title: "12. The Legal Frame and the Memorandum of Agreement",
    content: `You are not a lawyer and you should not offer legal advice. But you should understand the document your report feeds into.

**The legal framework**

Above the transaction sit UNCLOS on registration and nationality; the IMO conventions on safety, pollution and labour; and the liability conventions including the CLC for oil pollution. Beneath it sit national laws — the flag State's registration requirements, taxation and duties, and the rules governing maritime liens and mortgages.

**Liens matter to a buyer more than almost anything else.** A maritime lien for unpaid crew wages, salvage, or repairs travels with the ship regardless of who owns her. A buyer who takes delivery of a vessel carrying undisclosed liens has bought someone else's debt. Confirming clear title, free of liens, mortgages and encumbrances, is a core part of legal due diligence, and it runs in parallel with your technical work.

**The Norwegian Sale Form**

Published by the Norwegian Shipbrokers' Association, the NSF is the most widely used standard form for second-hand tonnage. The 2012 edition is the one most commonly referenced, and a 2023 edition also exists — confirm which edition is in use before relying on clause numbers.

Its principal clauses cover: the parties and vessel details; purchase price; deposit; inspection, including the buyer's right to inspect and the consequences of what inspection reveals; documentation the seller must provide; delivery — time, place and condition, free of cargo and encumbrances, in the same condition as inspected, fair wear and tear excepted; payment; the obligations of each side; warranties, which are deliberately limited; cancellation; default; governing law and arbitration, usually English or Norwegian law with arbitration in London or Oslo; notices; entire agreement; force majeure; name and marking, requiring the buyer to change the vessel's name after delivery; confidentiality; and the allocation of taxes and duties.

**The clause that concerns you directly is inspection.** The form gives the buyer a right to inspect, and what that inspection reveals determines whether the buyer proceeds, renegotiates or withdraws. Your report is what the buyer acts on. Which means the inspection clause is, in practical terms, the clause that makes your work commercially consequential.

**"Same condition as inspected, fair wear and tear excepted"** is worth understanding properly. The vessel must be delivered in the condition it was in when inspected, allowing only for normal deterioration in the interval. Your report, with its photographs and dates, is the evidence of what that condition was. If a defect appears between inspection and delivery, your pack is how the buyer establishes that it was not there before. This is a further reason for photographic thoroughness: you may be documenting a baseline that becomes contractual.

**On deposits — check the form, do not rely on summaries.** The treatment of the deposit, when it becomes at risk and in what circumstances it is refundable, is governed by the specific clause in the specific edition as amended by the parties. General statements about deposits being "non-refundable on signing" are unreliable; secondary summaries of the NSF frequently contradict themselves on exactly this point. Read the clause.

**What you say and do not say**

Report condition. Report defects with evidence. Give technical recommendations on repair and timing. Do not opine on whether the buyer should proceed, do not value the vessel unless valuation is within your scope and competence, and do not interpret the MOA. Those are for the broker, the valuer and the lawyer — and staying inside your own competence is what keeps your report credible and your liability contained.

---

## Working the full checklist on the AUK inspection platform

This course has taught the method. The complete inspection checklist — every section, every question, structured the way an inspection actually runs — sits on the AUK ship inspection platform, together with the defect recording and report generation tools described in Modules 7 to 10.

Access is available to learners on request.

**To request access:** email **info@auk-maritime.com**

**Platform:** https://inspections.auk-maritime.com/login

**Cost:** R950 per month. Cancel at any time.

Working through the checklist against a vessel record is the closest thing to a real assignment short of boarding one. If you intend to take inspection work, the checklist is the tool you will use on the job, and familiarity with it before your first assignment is worth considerably more than the monthly cost.`,
  },
];

export const aukSpm018Quiz = [
  {
    q: "What primarily distinguishes a condition inspection from a class survey?",
    options: [
      "A condition inspection is more technically detailed",
      "A condition inspection produces an opinion for a commercial client and carries no regulatory force",
      "A condition inspection may only be carried out in drydock",
      "A condition inspection is carried out by the flag State",
    ],
    answer: 1,
  },
  {
    q: "How does a pre-purchase inspection differ in scope from a condition inspection?",
    options: [
      "It is narrower, focusing only on the hull",
      "It covers everything a condition inspection covers, plus equipment specifications, performance data and the liabilities and costs a buyer would inherit",
      "It excludes machinery, which is assessed separately by class",
      "There is no difference; the terms are interchangeable",
    ],
    answer: 1,
  },
  {
    q: "During the physical inspection, what is the minimum tank and hold coverage required?",
    options: [
      "Visual check into all tanks from the access hatch",
      "At least two ballast tanks and two cargo holds, entered and inspected from the bottom",
      "One ballast tank only, if the vessel is over 10 years old",
      "Tank entry is not part of a condition inspection",
    ],
    answer: 1,
  },
  {
    q: "Approximately how many photographs should a full inspection produce?",
    options: ["Around 100", "Around 300", "Over 1,000, with at least 400 of decks, pipelines and fittings", "As few as possible, to keep the pack manageable"],
    answer: 2,
  },
  {
    q: "What resolution should be used for vessel photographs, and what is the exception?",
    options: [
      "High resolution throughout, for maximum detail",
      "Medium resolution for vessel photographs; documents photographed at high resolution",
      "Low resolution throughout, to minimise file size",
      "High resolution for vessel photographs; medium for documents",
    ],
    answer: 1,
  },
  {
    q: "Why must an intrinsically safe camera be used on tankers?",
    options: [
      "It produces better images in low light",
      "Non-approved electrical equipment is an ignition source in a potentially flammable atmosphere",
      "It is required by the classification society for image authentication",
      "It automatically embeds location data required for the report",
    ],
    answer: 1,
  },
  {
    q: "Why should photograph files generally not be renamed?",
    options: [
      "Renaming corrupts the embedded metadata",
      "Camera-sequential filenames preserve the order in which the ship was walked, and timestamps corroborate it",
      "The client's software cannot open renamed files",
      "Renaming is prohibited under the MOA",
    ],
    answer: 1,
  },
  {
    q: "An inspector cannot enter a cargo hold because the atmosphere has not been confirmed and no attendant is available. What is the correct action?",
    options: [
      "Enter briefly, keeping the visit short",
      "Do not enter, and record the limitation explicitly in the report",
      "Enter with a gas detector and no attendant",
      "Omit the hold from the report to avoid raising doubt",
    ],
    answer: 1,
  },
  {
    q: "Which document set most quickly indicates a vessel with deferred structural or equipment issues?",
    options: [
      "The crew list",
      "The class survey status, showing overdue items and conditions of class",
      "The garbage record book",
      "The Continuous Synopsis Record",
    ],
    answer: 1,
  },
  {
    q: "What does a series of lubricating oil analysis reports reveal that a single report does not?",
    options: [
      "The maker's recommended oil grade",
      "The trend — rising iron content indicating liner and ring wear, or water ingress from a cooler leak",
      "The vessel's fuel consumption",
      "Whether the oil was purchased from an approved supplier",
    ],
    answer: 1,
  },
  {
    q: "Which best describes a properly written defect entry?",
    options: [
      "\"Significant corrosion noted in ballast tanks.\"",
      "\"Corrosion at the forward bulkhead of No. 3 port water ballast tank, frame 84, coating breakdown over approximately 4 square metres, affecting structural protection; recommend re-coating at next drydock.\"",
      "\"Ballast tanks generally in poor condition and require attention.\"",
      "\"The crew have not maintained the ballast tanks properly.\"",
    ],
    answer: 1,
  },
  {
    q: "Why must limitations on inspection be stated explicitly in the report?",
    options: [
      "Because the client's template requires a limitations section",
      "Because a report that silently omits what could not be examined is misleading, and reliance on it creates liability for the inspector",
      "Because class requires it",
      "Because it reduces the inspector's fee proportionally",
    ],
    answer: 1,
  },
  {
    q: "Within what period is an inspection report typically required after disembarkation?",
    options: ["Same day", "Two to three days", "Two weeks", "One month"],
    answer: 1,
  },
  {
    q: "What should a lump sum quotation include?",
    options: [
      "The inspection fee only, with all expenses billed separately",
      "All costs the inspector will incur — fee, travel, accommodation, subsistence — with exclusions such as agent's attendance and boat hire stated explicitly",
      "Fee and travel only; accommodation is always the client's cost",
      "Fee plus a percentage uplift for contingency",
    ],
    answer: 1,
  },
  {
    q: "When is payment normally made for an inspection assignment?",
    options: [
      "On acceptance of the quotation",
      "On boarding the vessel",
      "Around 30 days after the job is completed, the report submitted and the invoice raised against the agreed quotation",
      "In two stages, half on boarding and half on disembarkation",
    ],
    answer: 2,
  },
  {
    q: "Under SOLAS, what backup arrangement is required for a vessel relying on ECDIS?",
    options: [
      "No backup is required once ECDIS is type-approved",
      "A second independent ECDIS unit, or a full folio of corrected paper charts for the intended voyage",
      "A handheld GPS receiver",
      "A printed copy of the passage plan",
    ],
    answer: 1,
  },
  {
    q: "Which standards govern the format and encryption of Electronic Navigational Charts?",
    options: ["S-100 and S-102", "S-57 for data format and S-63 for encryption", "MSC.232(82) and MSC.192(79)", "ISO 19011 and ISO 9001"],
    answer: 1,
  },
  {
    q: "Why is a maritime lien a serious concern for a prospective buyer?",
    options: [
      "It prevents the vessel from being reflagged",
      "It attaches to the vessel and survives the change of ownership, so the buyer inherits the debt",
      "It invalidates the class certificate",
      "It only affects vessels registered under open registries",
    ],
    answer: 1,
  },
  {
    q: "In the standard sale and purchase sequence, when is the deposit normally lodged?",
    options: [
      "Before the pre-purchase inspection",
      "Typically 10% within three banking days of the escrow agent confirming readiness to receive funds, following MOA signature",
      "On tendering of Notice of Readiness",
      "At the closing meeting, together with the balance",
    ],
    answer: 1,
  },
  {
    q: "What happens immediately after the buyer's deposit is lodged?",
    options: [
      "The vessel is deregistered from its current flag",
      "The buyer is usually permitted to place observers aboard, who remain until delivery for familiarisation",
      "The Protocol of Delivery and Acceptance is signed",
      "The seller tenders Notice of Readiness",
    ],
    answer: 1,
  },
  {
    q: "What is carried out on the vessel's arrival at the place of delivery, in lieu of drydocking?",
    options: ["A sea trial", "An underwater inspection", "A full class renewal survey", "A port State control inspection"],
    answer: 1,
  },
  {
    q: "Which document is signed at the closing meeting to effect the transfer?",
    options: ["The Memorandum of Agreement", "The Protocol of Delivery and Acceptance", "The Continuous Synopsis Record", "The Notice of Readiness"],
    answer: 1,
  },
  {
    q: "Under the Norwegian Sale Form, in what condition must the vessel be delivered?",
    options: [
      "In class, with all defects rectified",
      "In the same condition as at inspection, fair wear and tear excepted, free of cargo and encumbrances",
      "In the condition specified by the buyer's technical manager",
      "Newly drydocked with fresh bottom coatings",
    ],
    answer: 1,
  },
  {
    q: "Why is photographic thoroughness particularly important given the NSF delivery condition clause?",
    options: [
      "Photographs are required by the classification society",
      "The inspection pack establishes the baseline condition against which delivery condition is measured, so it may become contractually significant",
      "Photographs replace the need for a written report",
      "The seller retains copyright in the vessel's appearance",
    ],
    answer: 1,
  },
  {
    q: "An inspector finds a tidy engine room, a current planned maintenance system, and heavily wasted ballast tanks. What does this pattern most likely indicate?",
    options: [
      "A data error in the PMS",
      "Maintenance effort and spending concentrated where it is visible, and withheld from spaces nobody enters",
      "That the ballast tanks were recently flooded with contaminated water",
      "Nothing — the areas are unrelated",
    ],
    answer: 1,
  },
  {
    q: "Which of these falls outside the inspector's proper scope?",
    options: [
      "Describing defects with evidence and recommending repair timing",
      "Advising the buyer whether to proceed with the purchase and interpreting the MOA",
      "Listing outstanding conditions of class",
      "Stating what could not be inspected and why",
    ],
    answer: 1,
  },
];

export const aukSpm018Practical = {
  title: "Plan and Report a Condition Inspection",
  description: `A three-part assessed exercise built on the working protocol taught in Modules 5 to 10.

**Part 1 — Scope and quotation.** Learners receive an enquiry for a condition inspection of a named ship type at a specified port, with a client scope and stated constraints. They produce a lump sum quotation with exclusions stated, a kit list appropriate to the vessel type — including whether an intrinsically safe camera is required — and an inspection plan sequencing the areas of Module 7 against the vessel's cargo operations.

**Part 2 — Defect writing.** Learners are issued a set of inspection photographs with brief field notes and must convert each into a properly structured defect entry: what, where, condition with measurable extent, consequence with the requirement engaged where applicable, and recommendation. Vague entries are marked down; entries asserting what the photograph does not show are marked down harder.

**Part 3 — Limitations and cross-check.** Given a scenario in which two of four planned tank entries could not be made, learners draft the limitations section of the report. They then take one physical defect and trace it through the vessel's own systems — defect list, PMS, requisitions, last class survey — and state what the result indicates about how the vessel is managed.

Assessed on evidential discipline, correct identification of the requirement engaged, and whether the learner distinguishes what they observed from what they inferred.`,
};

export const aukSpm018Outcomes = [
  "Distinguish condition inspection from class survey, statutory survey, PSC inspection and vetting, and explain what each can and cannot determine",
  "Identify a vessel's principal structural, machinery and cargo systems and assess what each reveals about overall condition",
  "Apply the conventions and codes relevant to inspection findings, and cite the requirement a defect engages",
  "Interpret class survey status, conditions of class, certificate endorsements and PSC history",
  "Scope, quote and accept an inspection assignment, including exclusions, indemnities and professional liability",
  "Prepare for and conduct a shipboard inspection safely, including tank and hold entry within safe limits",
  "Apply photographic and evidence discipline to produce a defensible inspection pack",
  "Collect and interpret technical documentation, including running hours, overhaul records, performance reports and oil analysis trends",
  "Write defect entries with measurable extent, stated consequence and actionable recommendation",
  "Explain the sale and purchase process, the role of each stakeholder, and where the inspection report bears on the transaction",
];

export const aukSpm018Summary =
  "Conduct condition and pre-purchase inspections to a standard a client can act on. Covers ship structure and systems, the conventions and class framework behind a finding, scoping and quoting the assignment, safe shipboard inspection including tank and hold entry, the photographic and documentary discipline that makes a report defensible, defect writing with measurable evidence, and the sale and purchase process the pre-purchase report feeds into.";

export const aukSpm018 = {
  code: "AUK SPM 018",
  title: "Condition Inspection & Pre-purchase Inspection for Vessels",
  summary: aukSpm018Summary,
  outcomes: aukSpm018Outcomes,
  modules: aukSpm018Modules,
  quiz: aukSpm018Quiz,
  practical: aukSpm018Practical,
  passMark: 70, // 19 of 26
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Condition inspection checklist — by area, per Module 7
 *   2. Pre-purchase inspection checklist — extended, with equipment specification fields
 *   3. Document collection checklist — the Module 9 list as a tick sheet
 *   4. Photography and folder structure guide — naming, resolution, sub-foldering
 *   5. Defect entry template — what / where / condition / consequence / recommendation
 *   6. Quotation template with standard inclusions and exclusions
 *   7. Sample inspection report (anonymised) — vessel, owner and client removed
 *   8. Kit list by vessel type, flagging IS camera requirement for tankers
 *
 * Items 1, 3 and 5 carry the most weight — an inspector who leaves with usable
 * checklists and a defect template will produce better reports immediately.
 *
 * ── NOTES ON THE SOURCE GUIDE ──────────────────────────────────────────────
 *
 * 1. PERSONAL DATA. The guide's title page names an individual learner. That
 *    name is not in this content and must not be added. If the guide is reissued
 *    as a general handout, remove it at source.
 *
 * 2. TWO UNIT STANDARDS. The cover cites "AUK SPM 018 & AUK SPM 019". Only
 *    SPM 018 exists in the catalogue. Either SPM 019 needs its own row, or the
 *    cover is wrong. Worth resolving before the guide is issued again.
 *
 * 3. NSF DEPOSIT CLAUSE — CONTRADICTION IN THE SOURCE. Under the Norwegian Sale
 *    Form section, the guide states both that the deposit "is refundable if the
 *    seller fails to meet the conditions of the sale" and that it "becomes
 *    non-refundable upon signing the Memorandum of Agreement". Those cannot both
 *    be right as written. This course therefore directs learners to read the
 *    actual clause in the edition in use rather than relying on a summary.
 *    Correct it in the guide.
 *
 * 4. UNDERWATER INSPECTION COSTS. The guide states the buyer bears the cost of
 *    both the divers and the class surveyor, citing NSF 2012 clause 6. Cost
 *    allocation here is frequently amended by the parties, so this course says
 *    to check the clause as agreed rather than asserting a fixed position.
 *    Verify against the form before teaching it as settled.
 *
 * 5. DATED EXAMPLE. The specimen offer in the guide carries a 2021 laycan.
 *    Refresh it, or make it generic, so the handout does not read as stale.
 *
 * 6. NSF EDITION. The guide references NSF 2012 throughout. A 2023 edition
 *    exists; confirm which edition the course should teach as current before the
 *    next intake, since clause numbering differs.
 */
