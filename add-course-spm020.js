// Adds "Maritime Environmental Management" (AUK SPM 020) — FULL DEPTH VERSION
// 93 lessons (module overview + one deep lesson per learning outcome, including
// what-you-must-do, evidence of competence, and real shipboard failure modes)
// + 20-question final assessment quiz + capstone practical.
// Extracted and adapted from AUK_EMS_Shipboard_Training_Curriculum_v1.0.
//
// Run once with:  npx tsx add-course-spm020.js
// Safe to re-run — upserts on course code AUK SPM 020.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const course = {
  "code": "AUK SPM 020",
  "title": "Maritime Environmental Management",
  "category": "Maritime",
  "durationLabel": "2 days",
  "summary": "A comprehensive shipboard environmental management programme covering MARPOL Annexes I, IV, V and VI \u2014 bilge and oily water separation, sludge and incineration, sewage and grey water, garbage management, air emissions and fuel quality, ballast water and biofouling, documentation and certification, and the self-inspection and reporting culture that keeps a ship's environmental compliance defensible under Port State Control scrutiny.",
  "outcomes": [
    "Identify which MARPOL Annex governs any shipboard waste stream and locate the ship's environmental documentation set",
    "Operate the oily water separator, incinerator, sewage and grey water systems within their discharge criteria",
    "Maintain the Oil Record Book and Garbage Record Book with entries that will withstand external verification",
    "Apply Special Area, Emission Control Area and ballast water management requirements correctly on passage",
    "Plan and conduct a rigorous environmental self-inspection and write closable findings",
    "Explain the personal, corporate and commercial consequences of a pollution offence or false record"
  ],
  "modules": [
    {
      "title": "M01.0 \u2014 EMS Foundations and the Legal Framework: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can explain how an international pollution-prevention instrument becomes a specific task on their own watch, identify which instrument governs a given waste stream, and state the personal and corporate consequences of failing to comply.\n\nThis module is grounded in:\n\u2022 MARPOL 73/78 Annexes I to VI, and the concept of Special Areas and Emission Control Areas\n\u2022 SOLAS 1974 Chapter IX and the ISM Code, in particular elements 5, 7, 8, 10 and 12\n\u2022 Resolution A.982(24) \u2014 Revised guidelines for the identification and designation of Particularly Sensitive Sea Areas\n\u2022 Flag State law, and coastal or port State law where it exceeds MARPOL"
    },
    {
      "title": "M01.1 \u2014 Describe the structure of MARPOL 73/78 and identify the Annex that governs any given shipboard waste stream",
      "content": "MARPOL is not a single rulebook. It is six technical Annexes, each with its own definitions, discharge criteria, equipment requirements, certificate and record book. A seafarer who cannot say which Annex governs the substance in front of them cannot know which rule applies to it, and will default to habit.\n\n\nWhat you must be able to do:\n\u2022 Name each of the six Annexes and the waste stream it governs\n\u2022 Given a substance \u2014 bilge water, galley waste, refrigerant, cooking oil, sewage, exhaust gas \u2014 state the governing Annex without hesitation\n\u2022 State which certificate corresponds to which Annex: IOPP to Annex I, ISPP to Annex IV, IAPP and EIAPP to Annex VI\n\u2022 State which record book corresponds to which Annex: Oil Record Book to Annex I, Garbage Record Book to Annex V, Ozone-Depleting Substances Record Book and fuel changeover records to Annex VI\n\n\nHow this is proven in practice:\n\u2022 Correctly sorts a set of twelve waste-stream cards into Annexes in under two minutes\n\u2022 Locates the correct certificate in the ship's certificate file when named a waste stream\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Treating cooking oil as food waste. It is not \u2014 it is a prohibited discharge under Annex V\n\u2022 Assuming grey water is covered by Annex IV. It is not covered by MARPOL at all, which is precisely why it catches ships out in the United States and Turkey\n\u2022 Assuming that because the ship has an incinerator, anything can go in it"
    },
    {
      "title": "M01.2 \u2014 Explain the chain from IMO instrument, through flag and port State law and the company system, to the individual task",
      "content": "MARPOL binds States, not seafarers. It reaches the seafarer through four translations: the flag State enacts it, the port State enforces it on arrival, the company writes it into the safety management system, and the officer performs it. Each translation can add requirements but never subtract them.\n\n\nWhat you must be able to do:\n\u2022 Explain why a company procedure may be stricter than MARPOL and must still be followed\n\u2022 Explain why a port State requirement may be stricter than both, and takes effect the moment the ship enters those waters\n\u2022 Identify where in the ship's documented system to find the procedure for a given operation\n\u2022 Recognise that a charterer's instruction is contractual, not statutory, and can never authorise a breach of MARPOL\n\n\nHow this is proven in practice:\n\u2022 Traces one requirement \u2014 for example the retention period for a bunker delivery note \u2014 from the Annex, through the flag circular, to the shipboard procedure and the physical file\n\u2022 Correctly states who to consult when a charterer's instruction and a statutory requirement conflict\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 'The company procedure says so' offered as the only justification, with no understanding of the underlying rule \u2014 this collapses under questioning by an inspector\n\u2022 Believing a charterer's approval provides legal cover for a discharge\n\u2022 Assuming the flag State position applies in a foreign port"
    },
    {
      "title": "M01.3 \u2014 Define Special Areas, Emission Control Areas and Particularly Sensitive Sea Areas, and state their operational effect",
      "content": "These three designations are frequently confused. A Special Area is a MARPOL discharge regime. An Emission Control Area is a MARPOL Annex VI air-emission regime. A Particularly Sensitive Sea Area is a designation carrying associated protective measures such as routeing or reporting. Each changes what the ship may do, and each has a boundary that must appear on the passage plan.\n\n\nWhat you must be able to do:\n\u2022 List the MARPOL Annex I Special Areas and state the discharge effect within them\n\u2022 Identify the Emission Control Areas in force and the fuel sulphur limit within them\n\u2022 Explain that inside an Annex I Special Area, discharge from machinery spaces is prohibited for ships of 400 GT and above\n\u2022 Identify boundaries on the passage plan and confirm the ship's readiness before entry, not on arrival\n\n\nHow this is proven in practice:\n\u2022 Marks Special Area and Emission Control Area boundaries on a sample passage plan and states the actions required before each boundary\n\u2022 States the Southern South African waters Special Area status and its practical effect on a coastal voyage\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Discovering the boundary on the chart at the moment of crossing, with no changeover completed and no tank capacity planned\n\u2022 Confusing a Particularly Sensitive Sea Area with a Special Area and assuming a discharge is permitted\n\u2022 Treating the coastline as the baseline where a declared baseline applies"
    },
    {
      "title": "M01.4 \u2014 State the personal, corporate and commercial consequences of a pollution offence or a false record",
      "content": "Environmental prosecutions are unusual in that they routinely reach individuals. In several jurisdictions the offence that produces the prison sentence is not the discharge but the false record and the obstruction that follows it. Learners must understand that signing a record they know to be untrue is a separate and more serious act than the discharge itself.\n\n\nWhat you must be able to do:\n\u2022 Explain that an officer may be personally prosecuted, fined, imprisoned and have their certificate of competency endorsed or withdrawn\n\u2022 Explain that a false entry in a statutory record book presented to an inspector is commonly charged as a distinct offence\n\u2022 Explain the commercial consequences: detention, off-hire, loss of charter, loss of Voluntary Environmental Compliance Program standing, insurance implications\n\u2022 Explain that pressure from any source is not a defence, and describe the routes available for raising concern\n\n\nHow this is proven in practice:\n\u2022 Explains, in their own words, why 'I was told to' offers no protection\n\u2022 Correctly identifies at least three routes for raising a concern, including at least one outside the shipboard line of command\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Believing seniority transfers liability upward \u2014 it does not remove liability from the person who signed\n\u2022 Believing that a discharge in international waters is beyond reach \u2014 the record book travels with the ship into the next port\n\u2022 Silence, on the assumption that someone senior has already dealt with it"
    },
    {
      "title": "M01.5 \u2014 Locate and use the ship's environmental documentation set",
      "content": "In an inspection, the inability to find a document is treated as the absence of the document. Every learner must be able to physically produce the ship's environmental documents within a few minutes.\n\n\nWhat you must be able to do:\n\u2022 Locate the IOPP Certificate and its Supplement, the ISPP, IAPP and EIAPP Certificates, and check their validity dates\n\u2022 Locate the shipboard oil pollution emergency plan, garbage management plan, ballast water management plan, biofouling management plan and energy efficiency plan\n\u2022 Locate the manuals for the oily water separator, incinerator, sewage plant and refrigeration plant, and the NOx Technical File\n\u2022 Explain what the IOPP Supplement lists and why the physical plant must match it\n\n\nHow this is proven in practice:\n\u2022 Produces any six named documents within five minutes\n\u2022 Compares the tank list in the IOPP Supplement against the ship's actual tank arrangement and identifies any discrepancy\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A bilge primary tank fitted on board but absent from the IOPP Supplement \u2014 a common and consequential finding\n\u2022 Expired type-approval certificates for pollution-prevention equipment\n\u2022 Manuals stored in a locked office to which the duty engineer has no key"
    },
    {
      "title": "M02.0 \u2014 Vessel Condition, Hull and Environmental Housekeeping: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can carry out a structured external and internal environmental condition inspection of the hull, machinery space and deck, identify evidence of leakage or discharge, and record findings so they lead to corrective action rather than sitting in a notebook.\n\nThis module is grounded in:\n\u2022 MARPOL Annex I regulations 12, 15 and 34\n\u2022 Resolution MEPC.378(80) \u2014 2023 Guidelines for the control and management of ships' biofouling\n\u2022 AFS Convention 2001, including the cybutryne restriction and the IAFS Certificate\n\u2022 Coating Technical File requirements under the Performance Standard for Protective Coatings"
    },
    {
      "title": "M02.1 \u2014 Inspect the hull and overboard discharge openings for evidence of oil staining and report findings",
      "content": "Streaking below an overboard opening is the single most visible external evidence of an unlawful or accidental discharge. Inspectors look at the hull before they board. So should the ship's own staff.\n\n\nWhat you must be able to do:\n\u2022 Identify every overboard opening on the ship's side by name and function, working from the shell expansion and piping diagrams\n\u2022 Distinguish oil staining from rust streaking, marine growth and normal coating wear\n\u2022 Inspect the eductor and cargo hold bilge eductor discharge openings specifically, which are commonly overlooked\n\u2022 Photograph, locate and report a stain with enough precision that another person can find it\n\n\nHow this is proven in practice:\n\u2022 Produces a marked-up profile drawing identifying all overboard openings\n\u2022 Correctly classifies staining in a set of ten photographs\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Painting over the stain before establishing its cause \u2014 this destroys evidence and, if discovered, is treated as concealment\n\u2022 Reporting 'some staining on the ship's side' with no location, no photograph and no date\n\u2022 Inspecting only the accommodation side because it is the side alongside"
    },
    {
      "title": "M02.2 \u2014 Inspect machinery space bilges, tank tops and bilge wells for oil concentration and staining",
      "content": "A clean bilge is not cosmetic. It is the primary evidence that leaks are being found and fixed rather than accumulated and discharged. Persistent oil in a bilge well means a leak that has not been traced.\n\n\nWhat you must be able to do:\n\u2022 Inspect all bilge wells, tank tops and the areas beneath machinery for oil accumulation\n\u2022 Trace an accumulation back to its source rather than simply pumping it away\n\u2022 Identify and report leaking glands, flanges, drains and gauge connections\n\u2022 Assess the condition of lagging for oil contamination, which is both a pollution and a fire risk\n\n\nHow this is proven in practice:\n\u2022 Completes a bilge inspection record identifying condition, any accumulation and the traced source\n\u2022 Raises a defect report against a specific item of equipment rather than a general observation\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Cleaning the bilge before an inspection without recording that it was done or why\n\u2022 Oil-soaked lagging left in place because replacing it is a shipyard job\n\u2022 Recording 'bilges clean' as a standing entry that is copied week after week"
    },
    {
      "title": "M02.3 \u2014 Check oil tank air vents, flame arrester screens and sounding arrangements for evidence of overflow",
      "content": "An overflow through an air vent is a pollution incident in waiting and often the first physical sign of a bunkering or transfer discipline problem.\n\n\nWhat you must be able to do:\n\u2022 Inspect vent heads and flame arrester screens for oil traces and for blockage\n\u2022 Confirm self-closing sounding cocks operate and are not gagged open\n\u2022 Confirm sounding pipes are accessible in the loaded condition\n\u2022 Confirm save-alls and drip trays are empty, drained to the correct destination and not plugged\n\n\nHow this is proven in practice:\n\u2022 Demonstrates operation of a self-closing sounding cock and explains why gagging it is prohibited\n\u2022 Identifies the correct drainage destination for each save-all on the ship\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Sounding cocks wired or wedged open for convenience during bunkering\n\u2022 Save-all drains led to the bilge rather than to a sludge or drain tank\n\u2022 Flame arrester screens blocked, which risks tank over- or under-pressure as well as overflow"
    },
    {
      "title": "M02.4 \u2014 Explain hull coating condition, biofouling and anti-fouling system requirements",
      "content": "Biofouling is both an invasive species pathway and a fuel-consumption issue, and it now sits inside a formal IMO guidance framework. Anti-fouling systems are separately regulated by the AFS Convention.\n\n\nWhat you must be able to do:\n\u2022 Explain the purpose of the biofouling management plan and record book and what entries they require\n\u2022 Explain the purpose of the Coating Technical File and that in-service maintenance and partial recoating are recorded in it\n\u2022 Explain that the anti-fouling system is certified under the AFS Convention and that certain substances are prohibited\n\u2022 Relate fouling condition to fuel consumption and therefore to carbon intensity performance\n\n\nHow this is proven in practice:\n\u2022 Makes a correct entry in a specimen biofouling record book following an in-water inspection\n\u2022 Locates the Coating Technical File and the IAFS Certificate on board\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A biofouling management plan present but never used, with an empty record book\n\u2022 In-water cleaning carried out in a port that prohibits it, or without capture of the removed material\n\u2022 Coating Technical File not updated after a drydock recoating"
    },
    {
      "title": "M03.0 \u2014 Bilge Water Management: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can manage the bilge water stream from source to lawful disposal, keep it separate from the sludge and clean-drain streams, prevent contamination that defeats the oil content meter, and record every movement correctly.\n\nThis module is grounded in:\n\u2022 MARPOL Annex I regulations 12, 14, 15, 17 and 34\n\u2022 Resolution MEPC.107(49) \u2014 Revised guidelines and specifications for pollution prevention equipment for machinery space bilges\n\u2022 MEPC.1/Circ.642 as amended \u2014 Revised guidelines for systems for handling oily wastes in machinery spaces, incorporating guidance notes for an Integrated Bilge Water Treatment System\n\u2022 MEPC.1/Circ.640 \u2014 voluntary declaration of quantities retained in bilge water holding tanks"
    },
    {
      "title": "M03.1 \u2014 Trace the complete bilge water system on the ship's own piping diagram and physically on the plates",
      "content": "A learner who cannot trace the system on the actual pipework cannot judge whether a connection is legitimate. Diagram literacy and physical tracing are different skills and both are required.\n\n\nWhat you must be able to do:\n\u2022 Locate the bilge piping diagram and confirm it is the current class-approved version\n\u2022 Trace bilge wells, the bilge primary tank if fitted, the bilge holding tank, the transfer pump, the separator, the oil content meter, the three-way valve and the overboard line\n\u2022 Identify every cross-connection: cargo hold bilges to engine room bilges, engine room bilges to the fire line, emergency bilge suction on main sea water pumps, bow thruster bilge eductor\n\u2022 State the purpose of the vacuum-break loop and why it must not be blanked\n\n\nHow this is proven in practice:\n\u2022 Walks the system with an assessor, naming each component and its function\n\u2022 Marks up a blank piping diagram and identifies all sealed valves\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Relying on an out-of-date diagram that does not reflect a later modification\n\u2022 Being unable to say where the emergency bilge suction discharges to\n\u2022 Not knowing which valves on the system are required to be sealed"
    },
    {
      "title": "M03.2 \u2014 Prevent chemicals and solids from entering the bilge system and explain why they defeat the oil content meter",
      "content": "The oil content meter measures optically. Solids such as soot and mud, and emulsifying chemicals, produce readings that do not correspond to oil content \u2014 either false alarms that tempt the crew to work around the equipment, or false low readings that mask genuine oil. The integrity of the whole system depends on what is allowed into it.\n\n\nWhat you must be able to do:\n\u2022 Identify the chemicals in use in the machinery space that are harmful to the environment or that interfere with separation, using the safety data sheets and the separator manual\n\u2022 Explain how emulsifiers defeat gravity separation and why degreasers must never be used in bilge wells\n\u2022 Identify activities that introduce solids \u2014 soot blowing residues, boiler and economiser washing, tank cleaning, grit blasting \u2014 and state the controls for each\n\u2022 Explain the function of a bilge primary tank in settling solids before treatment\n\n\nHow this is proven in practice:\n\u2022 Produces a list of machinery space chemicals classified as acceptable or prohibited near the bilge system, referenced to safety data sheets\n\u2022 Explains the control applied to one specific activity, for example economiser washing\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Using a general-purpose degreaser to clean a bilge well, then wondering why the separator will not run\n\u2022 Landing boiler wash water into the bilge holding tank with no separate arrangement\n\u2022 Treating repeated false alarms as an equipment fault rather than a contamination symptom"
    },
    {
      "title": "M03.3 \u2014 Manage the bilge holding tank and, where fitted, the bilge primary tank",
      "content": "Retention capacity is what makes lawful behaviour possible. A ship that has run out of tank capacity has removed its own ability to comply, and every subsequent decision is made under pressure.\n\n\nWhat you must be able to do:\n\u2022 Sound and record the bilge holding tank on the required routine and reconcile against the Oil Record Book\n\u2022 Inspect and clean the tank on the maintenance routine and record the inspection and cleaning dates\n\u2022 Plan capacity against the passage: know how long the ship can hold before disposal becomes necessary\n\u2022 Explain the recording position for the primary bilge tank, including cleaning dates and any evaporation\n\n\nHow this is proven in practice:\n\u2022 Produces a capacity plan for a stated passage showing generation rate, available capacity and the disposal decision point\n\u2022 Shows tank inspection and cleaning records consistent with the maintenance system\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Discovering the tank is full while inside a Special Area\n\u2022 No record of the last internal inspection or cleaning\n\u2022 Soundings recorded in a private notebook rather than the controlled record"
    },
    {
      "title": "M03.4 \u2014 Distinguish clean drain tanks from bilge tanks and verify that clean drain discharges are genuinely non-oily",
      "content": "Clean drain tanks \u2014 collecting air cooler condensate, economiser and air-conditioning drains \u2014 are a lawful separate route to sea. They are also a well-known bypass opportunity, so they attract scrutiny. The ship must be able to prove the line is traced, listed and monitored.\n\n\nWhat you must be able to do:\n\u2022 Physically trace the clean drain lines and confirm they are not connected to the bilge system or the separator\n\u2022 Confirm the clean drain tanks are listed in the IOPP Supplement\n\u2022 State the verification method used before discharge, and where it is recorded\n\u2022 State the action if a clean drain tank becomes contaminated: it ceases to be clean, is routed to the bilge holding tank, and the event is recorded\n\n\nHow this is proven in practice:\n\u2022 Traces the line and cross-references it to the IOPP Supplement entry\n\u2022 Describes the alternative disposal route via the separator if contamination occurs\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A clean drain tank in use but not listed in the IOPP Supplement\n\u2022 No stated verification method \u2014 'it's clean water' offered as the answer\n\u2022 A contaminated clean drain tank discharged anyway because there is no alternative route planned"
    },
    {
      "title": "M03.5 \u2014 Apply the discharge criteria for machinery space bilge water and record the operation",
      "content": "This is the decision the whole module exists to support. It is a sequence of conditions, all of which must hold, and it ends in a record.\n\n\nWhat you must be able to do:\n\u2022 State every condition in MARPOL Annex I regulation 15 for discharge outside a Special Area\n\u2022 State the position inside a Special Area for ships of 400 GT and above\n\u2022 Apply the decision ladder in Figure 4 to a given set of circumstances and reach the correct answer\n\u2022 Make the correct Oil Record Book entry immediately after the operation\n\n\nHow this is proven in practice:\n\u2022 Reaches the correct decision on eight of eight scenario cards, with no critical error\n\u2022 Writes a correct and complete Oil Record Book entry for a permitted discharge\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Treating 'below 15 ppm' as the only condition and forgetting en route, Special Area and equipment status\n\u2022 Discharging at anchor or while drifting\n\u2022 Making the record at the end of the watch, or the end of the week, rather than immediately"
    },
    {
      "title": "M04.0 \u2014 Oily Water Separator and the 15 ppm Oil Content Meter: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can operate the 15 ppm separating equipment and oil content meter correctly, test and prove the automatic stopping arrangement, maintain the equipment to the required standard, and recognise the physical signatures of tampering.\n\nThis module is grounded in:\n\u2022 MARPOL Annex I regulations 14, 15 and 34\n\u2022 Resolution MEPC.107(49), including the requirement for the oil content meter to be calibrated at intervals not exceeding five years\n\u2022 MEPC.1/Circ.642 as amended\n\u2022 SOLAS Chapter II-1 bilge pumping arrangements"
    },
    {
      "title": "M04.1 \u2014 Operate the 15 ppm separating equipment in accordance with the maker's instructions and the ship's procedure",
      "content": "Most separator failures are operational, not mechanical: wrong start-up sequence, flooding not completed, feed rate too high, air not vented. An operator who follows the sequence gets clean water; one who improvises gets alarms and then feels pressure to work around them.\n\n\nWhat you must be able to do:\n\u2022 State the correct start-up sequence including flooding, venting and the establishment of flow\n\u2022 Operate within the rated throughput and explain why exceeding it defeats separation\n\u2022 Recognise the normal running signature \u2014 pressures, temperatures, sight glass appearance \u2014 and detect deviation\n\u2022 Shut down correctly, including flushing where the maker requires it\n\u2022 Explain why the equipment is operated in daylight during manned engine room hours\n\n\nHow this is proven in practice:\n\u2022 Performs a complete start-up, run and shutdown under observation, following the posted instructions\n\u2022 Explains the consequence of each step being omitted\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Starting on a partly flooded chamber, producing an immediate alarm\n\u2022 Running at a rate above the rated capacity to clear a tank before arrival\n\u2022 Operating at night with the engine room unmanned, which is exactly the pattern investigators look for"
    },
    {
      "title": "M04.2 \u2014 Test and prove the oil content meter, the alarm and the automatic stopping arrangement",
      "content": "The automatic three-way valve is the last line of defence. A test that only confirms the alarm sounds is not a test of the stopping device. The learner must prove the valve actually moves and the flow actually diverts.\n\n\nWhat you must be able to do:\n\u2022 Carry out the zero and calibration check to the maker's procedure and record it\n\u2022 Test the oil detection probe and prove automatic and manual drainage of oil from the chamber\n\u2022 Prove the three-way valve operation, the bilge pump trip where fitted, and the vacuum-break loop function\n\u2022 Retrieve the operating log from the oil content meter and interpret it\n\u2022 Confirm the meter's date and time correspond to the ship's reference time so that logs can be reconciled\n\n\nHow this is proven in practice:\n\u2022 Completes a full functional test under observation and records it correctly\n\u2022 Downloads and interprets a meter log, identifying periods of operation and any alarms\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Testing the alarm but never proving the valve moves\n\u2022 A meter clock hours or days out, making log reconciliation impossible and creating suspicion where none is warranted\n\u2022 Calibration overdue \u2014 the five-yearly calibration is commonly aligned with IOPP renewal and commonly forgotten"
    },
    {
      "title": "M04.3 \u2014 Maintain the separating equipment, including internal inspection and the essential spares holding",
      "content": "Maintenance evidence is what proves the equipment is genuinely in service rather than nominally fitted. A separator that has never consumed a coalescer element has probably never done any work.\n\n\nWhat you must be able to do:\n\u2022 Carry out internal inspection of the first and second stage chambers when opportunity permits, and record the condition\n\u2022 Renew coalescer elements at the required interval and record the renewal\n\u2022 Maintain the essential spares holding, stored, labelled and inventoried separately\n\u2022 Relate spare parts consumption to running hours and recognise when the two do not agree\n\n\nHow this is proven in practice:\n\u2022 Shows maintenance records, spares inventory and consumption history that are mutually consistent\n\u2022 Explains what a coalescer element looks like at renewal and why\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 No coalescer renewal recorded across several years of claimed operation\n\u2022 Essential spares mixed into general stores and untraceable\n\u2022 An unusual spares order \u2014 for example a sudden three-way valve replacement \u2014 with no corresponding defect record"
    },
    {
      "title": "M04.4 \u2014 Recognise the physical signatures of bypass and tampering",
      "content": "This outcome is deliberately taught to operators and not only to auditors. Ratings and junior engineers are usually the first to see a bypass being rigged, and they need to recognise it and know what to do.\n\n\nWhat you must be able to do:\n\u2022 Identify freshly removed, cleaned or painted pipework in way of the separator, pumps and overboard line, and know to ask why\n\u2022 Inspect the first section of piping upstream of the overboard valve for oil residue\n\u2022 Distinguish graphite deposit from oil residue by the simple beaker test \u2014 graphite sinks in clean water, oil floats and forms a sheen\n\u2022 Identify unauthorised flanges, hose connections and portable pump arrangements\n\u2022 Explain the reporting route, including routes outside the immediate line of command\n\n\nHow this is proven in practice:\n\u2022 Correctly classifies residue samples in a bench test\n\u2022 Identifies three tampering indicators from a photograph set and states the action for each\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Assuming black residue in the overboard pipe is always oil, producing a false allegation\n\u2022 Seeing a rigged hose and saying nothing\n\u2022 Recording a concern in a personal notebook rather than through a formal route"
    },
    {
      "title": "M04.5 \u2014 Respond correctly to equipment failure",
      "content": "Equipment fails. The compliance outcome depends entirely on what happens next. A ship that reports promptly and obtains an exemption is in a different position from one that keeps quiet and improvises.\n\n\nWhat you must be able to do:\n\u2022 Record the failure in the Oil Record Book under the correct code, with the time, the reason and the time of restoration\n\u2022 Notify the Chief Engineer and Master, and through them the company, flag State and class\n\u2022 Explain the flag State exemption process and why it is applied for before the situation becomes critical\n\u2022 Plan retention and shore disposal for the period of unavailability\n\n\nHow this is proven in practice:\n\u2022 Writes a correct record entry for an equipment failure and restoration\n\u2022 Produces a notification and contingency plan for a stated failure scenario\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 No record of the failure at all, leaving an unexplained gap in operations\n\u2022 Waiting until the tanks are nearly full before telling anyone\n\u2022 Attempting a repair that constitutes an unapproved modification"
    },
    {
      "title": "M05.0 \u2014 Sludge and Oil Residue Management: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can manage oil residue from generation to lawful disposal, maintain the absolute separation between the sludge and bilge systems, plan capacity so that the ship never runs out of options, and evidence every disposal.\n\nThis module is grounded in:\n\u2022 MARPOL Annex I regulations 12, 13 and 17, as amended by resolution MEPC.187(59)\n\u2022 MEPC.1/Circ.642 as amended\n\u2022 Port reception facility requirements under MARPOL Annex I regulation 38"
    },
    {
      "title": "M05.1 \u2014 Identify all sources of oil residue and ensure they are led to the correct tank",
      "content": "Sludge arrives from many places: separator and purifier discharge, sump and tank drains, filter cleaning, cargo of drain trays. If any of these routes to the bilge instead of the sludge tank, the ship has created a compliance problem at the source.\n\n\nWhat you must be able to do:\n\u2022 List every sludge source on the ship and its destination tank\n\u2022 Confirm that all oily mixture drainage from tanks and cleaning activities is led to a sludge tank\n\u2022 Explain that once fuel oil is added to a sludge tank, the entire contents are treated as sludge\n\u2022 Identify the tanks listed in the IOPP Supplement and confirm the physical arrangement matches\n\n\nHow this is proven in practice:\n\u2022 Produces a sludge source and destination map for the ship\n\u2022 Cross-references it against the IOPP Supplement\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Purifier drains led to a bilge well 'because it is closer'\n\u2022 Adding fuel to a sludge tank to improve incinerator burning without appreciating the recording consequence\n\u2022 Tanks in use that do not appear in the Supplement"
    },
    {
      "title": "M05.2 \u2014 Verify the absolute separation between the sludge system and the bilge system",
      "content": "This is the hardest boundary in Annex I and the one that attracts criminal investigation when it is crossed. The regulation is explicit: sludge tanks have no discharge connections to the bilge system, the oily bilge water holding tank, the tank top or the separator. The only common point is disposal to a reception facility.\n\n\nWhat you must be able to do:\n\u2022 State the requirement in regulation 12 as amended and explain what it prohibits\n\u2022 Physically verify that no such connection exists, including blanks, spool pieces and change-over valves\n\u2022 Verify sludge transfer arrangements between sludge tanks, and confirm they do not create a path to the bilge\n\u2022 Identify and challenge any temporary arrangement, hose or portable pump that could create a path\n\n\nHow this is proven in practice:\n\u2022 Completes a verification walk-round with the assessor, checking every potential connection point\n\u2022 Correctly identifies a deliberately introduced illegitimate connection in a mock-up\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A change-over valve that permits incinerator settling tank drainage to the bilge holding tank, unblanked\n\u2022 A blank fitted but not secured, or with the bolts stored beside it\n\u2022 Assuming that because a valve is normally shut, the connection is acceptable \u2014 the regulation prohibits the connection, not merely its use"
    },
    {
      "title": "M05.3 \u2014 Plan and manage sludge capacity across the voyage",
      "content": "Sludge generation is predictable. Roughly, it is a percentage of fuel consumed, and it varies with fuel quality and purifier performance. A ship that tracks this can plan disposal. A ship that does not will eventually have a full tank and no port.\n\n\nWhat you must be able to do:\n\u2022 Calculate expected sludge generation from bunker consumption and compare it to actual generation\n\u2022 Recognise when actual generation departs from expectation and investigate why\n\u2022 Plan disposal against the voyage, allowing for notice periods, charterer approvals and port availability\n\u2022 State and apply the contingency plan when the tank approaches capacity, including early escalation to the company\n\n\nHow this is proven in practice:\n\u2022 Produces a sludge budget for a stated voyage and identifies the disposal decision point\n\u2022 Explains what an unexpectedly low generation figure might indicate\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Generation figures that are suspiciously low and unexplained \u2014 a recognised indicator that sludge is leaving the ship by an unlawful route\n\u2022 Requesting shore reception with insufficient notice, then facing a full tank\n\u2022 Treating evaporation as an unlimited capacity solution"
    },
    {
      "title": "M05.4 \u2014 Execute disposal to a reception facility and evidence it correctly",
      "content": "Shore disposal is the primary route. The receipt is the ship's proof, and it must be capable of standing on its own years later.\n\n\nWhat you must be able to do:\n\u2022 Prepare for and carry out a sludge discharge to a barge or truck, including connection, sampling and quantity measurement\n\u2022 Obtain a receipt showing quantity, type, date, time and the receiver's identity\n\u2022 Retain the receipt for three years and file it so it can be produced against the corresponding record entry\n\u2022 Explain the standard discharge connection requirement and its dimensions\n\n\nHow this is proven in practice:\n\u2022 Completes a disposal checklist and produces a compliant receipt\n\u2022 Matches a supplied set of receipts to record book entries and identifies the mismatch\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A receipt showing only 'sludge' with no quantity\n\u2022 Quantity on the receipt inconsistent with the tank soundings before and after\n\u2022 Receipts filed loose and lost before the three years expire"
    },
    {
      "title": "M05.5 \u2014 Manage evaporation and decanting correctly, and record them",
      "content": "Water is decanted or evaporated from sludge to make it burnable. Both are legitimate. Both change the tank contents and both must be recorded, because an unrecorded reduction in tank volume looks exactly like an unlawful discharge.\n\n\nWhat you must be able to do:\n\u2022 Explain the purpose of decanting and evaporation and the correct method for each\n\u2022 State where the water removed goes and record its destination\n\u2022 Make the correct record entry for evaporation and for decanting\n\u2022 Explain why an unexplained fall in sludge tank soundings is treated as an adverse finding\n\n\nHow this is proven in practice:\n\u2022 Writes correct record entries for a decanting and an evaporation operation\n\u2022 Explains the volumetric consequence and how it will appear in the sounding book\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Evaporation carried out routinely but never recorded, so the tank appears to empty itself\n\u2022 Decanted water led to the bilge with no entry\n\u2022 Relying on evaporation as the primary disposal strategy"
    },
    {
      "title": "M06.0 \u2014 Shipboard Incineration: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can operate and maintain a shipboard incinerator safely and within its design limits, determine what may and may not be incinerated, manage ash lawfully, and record the operation in the correct record book.\n\nThis module is grounded in:\n\u2022 MARPOL Annex VI regulation 16 \u2014 shipboard incineration\n\u2022 Resolution MEPC.244(66) \u2014 2014 Standard specification for shipboard incinerators\n\u2022 MARPOL Annex I regulation 17 and Annex V recording requirements\n\u2022 SOLAS Chapter II-2 fire safety provisions"
    },
    {
      "title": "M06.1 \u2014 State what may and may not be incinerated on board",
      "content": "The incinerator is not a general waste disposal device. Annex VI regulation 16 prohibits the incineration of specified substances, and burning the wrong material produces emissions the unit was never designed to handle and residues that are then themselves a problem.\n\n\nWhat you must be able to do:\n\u2022 List the substances whose shipboard incineration is prohibited under Annex VI regulation 16\n\u2022 State that cargo residues covered by Annexes I, II and III, and contaminated packing materials, must not be incinerated\n\u2022 State the position on polychlorinated biphenyls, on refuse containing more than traces of heavy metals, and on refined petroleum products containing halogen compounds\n\u2022 State the position on polyvinyl chlorides where the unit is not type-approved for them\n\u2022 State the position on exhaust gas cleaning system residues\n\n\nHow this is proven in practice:\n\u2022 Correctly sorts a set of waste cards into may-incinerate and must-not-incinerate\n\u2022 Locates the incinerator type-approval certificate and states what it permits\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Burning oily rags and plastics together because they are both 'waste'\n\u2022 Burning cargo-related residues to avoid a reception facility charge\n\u2022 Assuming that if it fits in the charging door it may be burnt"
    },
    {
      "title": "M06.2 \u2014 Operate the incinerator within its design burning rate and prove its safety functions",
      "content": "Incinerator ratings are established with a specified test material. Modern waste burns hotter and faster, so operators routinely exceed the design rate without realising it. Overfiring destroys refractory, distorts the casing and produces smoke that will be noticed from ashore.\n\n\nWhat you must be able to do:\n\u2022 State the design burning rate and the water decanting volume from the ship's documentation\n\u2022 Calculate the actual burning rate achieved and compare it to the design rate\n\u2022 Test flame failure, interlocks, safety cut-outs and forced draught fan operation and record the results\n\u2022 Operate on diesel oil as a minimum where sludge temperature does not permit waste oil firing\n\u2022 Explain the daylight and manned-hours operating rule and any port or regional restriction\n\n\nHow this is proven in practice:\n\u2022 Produces a burning rate calculation from actual operating data\n\u2022 Completes a safety function test under observation\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Charging to clear a backlog before arrival and exceeding the design rate\n\u2022 Operating with a flame failure device known to be unreliable\n\u2022 Operating in port where the port prohibits it"
    },
    {
      "title": "M06.3 \u2014 Inspect the incinerator internally and externally and maintain it",
      "content": "Refractory condition determines whether the unit reaches and holds combustion temperature. Cracked or spalled refractory means incomplete combustion, smoke, and eventually casing damage.\n\n\nWhat you must be able to do:\n\u2022 Carry out external examination for gas or smoke leakage and confirm casing insulation condition\n\u2022 Inspect the firebox for refractory cracking, spalling and signs of overheating, and record the condition with photographs\n\u2022 Inspect main burner, pilot burner and igniter for condition and operation\n\u2022 Inspect the waste oil tank: drains clear, heating coil, level gauge, thermometer, stirrer, and the last internal cleaning date\n\u2022 Confirm warning and instruction plates are legible and that the manufacturer, model, serial number and capacity are permanently marked\n\n\nHow this is proven in practice:\n\u2022 Completes an inspection record with photographs and a clear condition statement\n\u2022 Correctly grades refractory condition against reference photographs\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Recording 'refractory satisfactory' with no photograph, then reporting a crack at the next inspection with no history\n\u2022 Waste oil tank stirrer inoperative, so water is never properly distributed and burning is erratic\n\u2022 Illegible instruction plates, a common and easily fixed finding"
    },
    {
      "title": "M06.4 \u2014 Manage incinerator ash lawfully",
      "content": "Ash is not simply waste. Incinerator ash is a prohibited discharge under Annex V, and ash from plastics or from products containing heavy metals requires particular care. It must be segregated, stored and landed.\n\n\nWhat you must be able to do:\n\u2022 State that incinerator ash may not be discharged to sea\n\u2022 Segregate and store ash separately, in suitable closed containers\n\u2022 Record ash landings in the Garbage Record Book with quantity and receipt\n\u2022 Explain the additional care required for ash from products containing heavy metals\n\n\nHow this is proven in practice:\n\u2022 Shows compliant ash storage arrangements\n\u2022 Makes a correct Garbage Record Book entry for an ash landing\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Ash swept over the side in the belief that it is inert\n\u2022 Ash mixed with general garbage, defeating segregation\n\u2022 No receipt obtained for an ash landing"
    },
    {
      "title": "M06.5 \u2014 Record incineration in the correct record book",
      "content": "The split confuses people constantly. Sludge incineration is an Oil Record Book operation. Garbage incineration is a Garbage Record Book operation. Oily rags and cooking oil go in the Garbage Record Book. Getting this wrong produces an apparent gap in one book and an apparent surplus in the other.\n\n\nWhat you must be able to do:\n\u2022 Record sludge incineration in the Oil Record Book under the correct code\n\u2022 Record garbage, oily rag and cooking oil incineration in the Garbage Record Book\n\u2022 Record non-operation of the incinerator in the Oil Record Book where the ship's procedure requires it\n\u2022 Maintain the running hours record and reconcile it against both record books\n\n\nHow this is proven in practice:\n\u2022 Correctly allocates ten incineration events between the two record books\n\u2022 Reconciles a running hours log against supplied record book entries and identifies the discrepancy\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Sludge incineration recorded in the Garbage Record Book\n\u2022 Running hours that do not correspond to any recorded operation\n\u2022 Long periods of non-operation with no explanation, followed by an implausible burst of activity before arrival"
    },
    {
      "title": "M07.0 \u2014 Oil Record Book Part I \u2014 Entries and Integrity: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can make timely, accurate and complete entries in the Oil Record Book Part I using the correct codes, correct an error properly, and \u2014 at verifier level \u2014 cross-check a record set against soundings, meter logs, receipts and capacities to detect inconsistency or falsification.\n\nThis module is grounded in:\n\u2022 MARPOL Annex I regulation 17 and Appendix III\n\u2022 Resolution MEPC.187(59) \u2014 amendments introducing the current definitions and entry codes\n\u2022 MEPC.1/Circ.736/Rev.2 \u2014 Guidance for the recording of operations in the Oil Record Book Part I\n\u2022 MEPC.1/Circ.640 \u2014 voluntary declaration of quantities retained in bilge water holding tanks"
    },
    {
      "title": "M07.1 \u2014 Apply the correct operation code and item number to any machinery space operation",
      "content": "The codes are not decorative. An operation recorded under the wrong code is, in evidential terms, an operation not recorded. Codes C to I cover the machinery space operations of all ships.\n\n\nWhat you must be able to do:\n\u2022 State what each of codes C, D, E, F, G, H and I covers\n\u2022 Select the correct code and item number for a given operation without reference to notes\n\u2022 Record quantities, times, positions and tank identities in the required form\n\u2022 Explain when an operation requires entries under more than one code \u2014 for example collecting sludge from a bilge water holding tank\n\n\nHow this is proven in practice:\n\u2022 Codes fifteen operations correctly with no more than one error and no critical error\n\u2022 Explains the two-entry requirement for a sludge collection from a bilge tank\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Using code I as a catch-all for anything difficult\n\u2022 Recording a bilge discharge under C rather than D or E\n\u2022 Recording quantities without stating the tank"
    },
    {
      "title": "M07.2 \u2014 Make an entry that is timely, complete, signed and countersigned",
      "content": "Almost every defensive quality of the record book comes from the timing and the signatures. An entry written at the time by the person who did the work carries weight. One written up later, in a different hand, does not.\n\n\nWhat you must be able to do:\n\u2022 Make the entry without delay on completion of the operation\n\u2022 Sign as officer in charge of the operation\n\u2022 Ensure each completed page is signed by the Master\n\u2022 Ensure the Chief Engineer countersigns operations as required by the ship's procedure\n\u2022 Explain the three-year retention requirement and where the book is kept\n\n\nHow this is proven in practice:\n\u2022 Writes a complete entry for an observed operation within the same watch\n\u2022 Identifies missing signatures in a supplied specimen page\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A week of entries written up in one sitting in identical handwriting and ink\n\u2022 Master's page signature missing on several pages\n\u2022 The book kept in the Chief Engineer's cabin and unavailable to the duty engineer"
    },
    {
      "title": "M07.3 \u2014 Correct an error in the prescribed manner",
      "content": "Errors happen. How they are corrected is what an inspector reads. A single struck line, corrected, initialled and dated is normal and unremarkable. An erasure, an overwrite or correction fluid is treated as evidence of concealment.\n\n\nWhat you must be able to do:\n\u2022 Strike through the erroneous entry with a single line so it remains legible\n\u2022 Write the correction, then initial and date it with rank\n\u2022 Never erase, overwrite, use correction fluid or remove a page\n\u2022 Apply the same discipline to the tank sounding record\n\n\nHow this is proven in practice:\n\u2022 Correctly executes three corrections on a specimen page under observation\n\u2022 Identifies improper corrections in a supplied specimen\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Overwriting a digit so that the original is unreadable\n\u2022 Correction fluid \u2014 which in practice is read as an admission\n\u2022 A page torn out, however innocent the reason"
    },
    {
      "title": "M07.4 \u2014 Reconcile the Oil Record Book against the other shipboard evidence",
      "content": "The record book does not exist in isolation. It must agree with tank soundings, oil content meter logs, disposal receipts, running hours and rated capacities. Inspectors reconcile these. So must the ship, before the inspector arrives.\n\n\nWhat you must be able to do:\n\u2022 Reconcile record entries against the tank sounding record and identify differences\n\u2022 Reconcile against the oil content meter operating log, allowing for clock differences\n\u2022 Reconcile recorded processing and incineration rates against rated capacities and identify impossibilities\n\u2022 Reconcile disposal quantities against receipts\n\u2022 Correct or explain any discrepancy in writing at the time it is found\n\n\nHow this is proven in practice:\n\u2022 Reconciles a supplied three-month record set and identifies all planted discrepancies\n\u2022 Writes an explanation for a genuine discrepancy in a form that would satisfy an inspector\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Soundings kept in an uncontrolled notebook that does not match the official record\n\u2022 Recorded processing volumes that exceed the separator's rated capacity for the hours claimed\n\u2022 Discrepancies noticed but left unexplained"
    },
    {
      "title": "M07.5 \u2014 Recognise the patterns associated with falsification (EMS-C)",
      "content": "Verifiers must be able to look at a record set and see the shape of a problem. This is taught explicitly so that Masters and Chief Engineers find issues on their own ships before someone else does.\n\n\nWhat you must be able to do:\n\u2022 Recognise repetitive or identical entries for operations that in reality vary\n\u2022 Recognise round-number quantities appearing consistently where measurement would produce variation\n\u2022 Recognise entries that are chronologically impossible given the ship's movements or the equipment's capacity\n\u2022 Recognise handwriting, ink and pressure discontinuities indicating retrospective completion\n\u2022 Take the correct action on discovering an anomaly, including preserving the record and escalating outside the ship where required\n\n\nHow this is proven in practice:\n\u2022 Identifies at least five of six planted falsification indicators in a specimen set\n\u2022 Writes a correct escalation note that preserves evidence and does not accuse\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Confronting the individual before securing the record\n\u2022 Correcting the record retrospectively to 'tidy it up', which converts a finding into an offence\n\u2022 Deciding it is a company matter and not reporting it"
    },
    {
      "title": "M08.0 \u2014 Sewage Treatment and Discharge: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can operate and maintain a sewage treatment plant, apply the discharge criteria correctly including the untreated discharge rate calculation, and identify where regional rules are stricter than MARPOL.\n\nThis module is grounded in:\n\u2022 MARPOL Annex IV regulations 9, 11 and 12\n\u2022 Resolution MEPC.227(64) as amended by MEPC.284(70) \u2014 effluent standards and performance tests for sewage treatment plants\n\u2022 Resolution MEPC.157(55) \u2014 standards for the rate of discharge of untreated sewage\n\u2022 Regional and national requirements exceeding Annex IV"
    },
    {
      "title": "M08.1 \u2014 Apply the MARPOL Annex IV discharge criteria",
      "content": "Three routes exist: an approved treatment plant, comminuted and disinfected sewage beyond 3 nautical miles, or untreated sewage beyond 12 nautical miles at a controlled rate. Each carries conditions and the ship must know which route it is using.\n\n\nWhat you must be able to do:\n\u2022 State the distance, speed and rate conditions for each of the three routes\n\u2022 State that the ship must be en route at not less than 4 knots for the distance-based routes\n\u2022 Explain that treated effluent from an approved plant may be discharged at any distance subject to the plant meeting its standard\n\u2022 Explain that discharge from a holding tank must still respect the rate limit\n\n\nHow this is proven in practice:\n\u2022 Reaches the correct decision on six scenario cards with no critical error\n\u2022 States the conditions from memory\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Emptying a holding tank at maximum pump rate once past 12 miles\n\u2022 Discharging while drifting or at anchor\n\u2022 Assuming a plant that is fitted is necessarily working and approved"
    },
    {
      "title": "M08.2 \u2014 Calculate the maximum permitted discharge rate for untreated sewage",
      "content": "This is a formula every officer on a ship without a treatment plant is expected to be able to produce on demand. It is asked at inspections precisely because it separates those who understand the requirement from those who have memorised a distance.\n\n\nWhat you must be able to do:\n\u2022 State the formula from resolution MEPC.157(55): DR = 0.00926 \u00d7 V \u00d7 D \u00d7 B\n\u2022 Identify each term and its unit: discharge rate in cubic metres per hour, speed in knots, draught in metres, moulded breadth in metres\n\u2022 Calculate the permitted rate for the ship's own particulars at a stated speed and draught\n\u2022 Compare the calculated rate to the actual pump capacity and state the operational consequence\n\n\nHow this is proven in practice:\n\u2022 Calculates the rate correctly for three sets of particulars\n\u2022 States whether the ship's discharge pump could exceed the permitted rate and what control is applied\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Using beam instead of moulded breadth, or displacement instead of draught\n\u2022 Calculating the rate but never comparing it to the pump's actual output\n\u2022 Not knowing the formula exists"
    },
    {
      "title": "M08.3 \u2014 Operate and maintain the sewage treatment plant",
      "content": "A biological plant is a living system. It fails slowly and invisibly when it is neglected, and by the time the effluent is visibly wrong the biology has been dead for weeks.\n\n\nWhat you must be able to do:\n\u2022 Confirm air supply, air pressure, reducing valve and gauge condition, and aeration device operation\n\u2022 Carry out chemical dosing to the maker's regime and explain the purpose of each product\n\u2022 Carry out the residual chlorine test to the maker's procedure and record the result\n\u2022 Check discharge pump condition, leakage, vibration and automatic cut-in and cut-out\n\u2022 Explain what must never be put into the system: solvents, chemicals, oil, excessive paper, sanitary items\n\n\nHow this is proven in practice:\n\u2022 Performs a residual chlorine test and records it\n\u2022 Explains the purpose of each dosing chemical in the ship's regime\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Aeration blower belt slipping for months, killing the biology\n\u2022 Cleaning chemicals dumped into a toilet, sterilising the plant\n\u2022 Residual chlorine testing chemicals expired or absent"
    },
    {
      "title": "M08.4 \u2014 Verify certification, holding capacity and hospital drainage arrangements",
      "content": "Certification and arrangement details are where inspections concentrate, because they can be verified from a chair.\n\n\nWhat you must be able to do:\n\u2022 Locate the type approval certificate and the ISPP Certificate and check validity\n\u2022 Confirm the permanent plate affixed to the plant, which some administrations specifically look for\n\u2022 Confirm holding tank capacity is adequate for the ship's port stays and calculate the holding time available\n\u2022 Confirm whether hospital and dispensary drainage is connected to the sewage system and explain why it matters\n\u2022 Confirm the overboard valve is sealed and logged\n\n\nHow this is proven in practice:\n\u2022 Produces certificates and states expiry dates\n\u2022 Calculates available holding time from tank capacity and complement\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 ISPP Certificate expired and unnoticed\n\u2022 Holding capacity adequate for a short call but not for the ship's actual port stays\n\u2022 Hospital drainage arrangement unknown to the duty engineer"
    },
    {
      "title": "M08.5 \u2014 Identify regional requirements stricter than MARPOL and plan for them",
      "content": "Annex IV is a floor. Several important trading areas impose no-discharge regimes, and the definition of nearest land changes where declared baselines apply.\n\n\nWhat you must be able to do:\n\u2022 Identify no-discharge zones and stricter regimes on the intended voyage\n\u2022 Explain the Great Barrier Reef and Bohai Bay baseline position\n\u2022 Explain the position in United States waters and in Turkish waters\n\u2022 Build the requirement into the passage plan and check capacity against it\n\n\nHow this is proven in practice:\n\u2022 Annotates a passage plan with sewage discharge restrictions and identifies the capacity implication\n\u2022 States where to obtain current regional requirements\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Discovering a no-discharge zone on arrival with a full holding tank\n\u2022 Measuring from the visible coast where a baseline applies\n\u2022 Relying on out-of-date guidance"
    },
    {
      "title": "M09.0 \u2014 Grey Water Management: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can explain why grey water is a compliance risk despite not being regulated by MARPOL, manage the holding and discharge arrangements, and identify the jurisdictions where it is controlled.\n\nThis module is grounded in:\n\u2022 Grey water is not regulated as a discharge under MARPOL\n\u2022 United States Vessel General Permit and the emerging Vessel Incidental Discharge Act regime\n\u2022 Turkish, Egyptian and other national requirements\n\u2022 Class environmental notations, where the ship carries one"
    },
    {
      "title": "M09.1 \u2014 Explain the regulatory position of grey water and why it is a trap",
      "content": "Because MARPOL does not regulate it, crews assume it is unregulated everywhere. It is not. The United States, Turkey and several other jurisdictions control it, and class environmental notations impose requirements independently. The absence of a MARPOL rule is exactly what makes it dangerous.\n\n\nWhat you must be able to do:\n\u2022 State that grey water is not a MARPOL-regulated discharge\n\u2022 Identify grey water sources: galley, laundry, showers, wash basins, deck drains where they lead to the grey water system\n\u2022 Identify the jurisdictions and regimes that do control it on the ship's trading pattern\n\u2022 Explain the effect of a class environmental notation on grey water handling and recording\n\n\nHow this is proven in practice:\n\u2022 Lists the ship's grey water sources and the tanks serving them\n\u2022 Identifies the controlling requirement for two named ports on the trading pattern\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 'It's just washing water' as the operative belief\n\u2022 Discharging in a United States port in the belief that MARPOL silence means permission\n\u2022 Not knowing whether the ship carries an environmental notation"
    },
    {
      "title": "M09.2 \u2014 Manage grey water holding capacity and discharge arrangements",
      "content": "Grey water is generated continuously and in volume. Where machinery spaces are not under the accommodation there may be more than one tank. Capacity planning is the whole game.\n\n\nWhat you must be able to do:\n\u2022 Identify all grey water holding tanks and their capacities\n\u2022 Calculate holding time from generation rate and complement\n\u2022 Check discharge pump condition, leakage and vibration\n\u2022 Confirm the overboard valve is sealed and the seal number logged\n\n\nHow this is proven in practice:\n\u2022 Calculates available holding time and compares it to the longest planned port stay\n\u2022 Confirms the seal against the log\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Only one tank identified where the ship has two\n\u2022 Holding time calculated on paper but never checked against an actual port stay\n\u2022 Overboard valve unsealed because 'grey water isn't regulated'"
    },
    {
      "title": "M09.3 \u2014 Control grey water quality at source",
      "content": "Where grey water is regulated, the requirements often concern what is in it \u2014 phosphates in detergents, oil and grease from the galley, food solids. Source control is cheaper and more reliable than treatment.\n\n\nWhat you must be able to do:\n\u2022 Explain the phosphate-free soap expectation where it applies, and the availability of product information\n\u2022 Explain galley grease trap maintenance and why it matters to grey water quality\n\u2022 Explain that cooking oil must never enter the grey water system\n\u2022 Brief catering and accommodation staff on source control\n\n\nHow this is proven in practice:\n\u2022 Reviews the ship's cleaning product inventory against the requirement\n\u2022 Inspects and reports on grease trap condition\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Grease trap never cleaned, so galley waste passes straight through\n\u2022 Cleaning products purchased on price with no attention to specification\n\u2022 Catering staff never briefed"
    },
    {
      "title": "M10.0 \u2014 Garbage Management: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can classify, segregate, store, dispose of and record every category of shipboard garbage in accordance with Annex V, and apply the stricter requirements applying in special areas and sensitive sea areas.\n\nThis module is grounded in:\n\u2022 MARPOL Annex V regulations 3, 4, 5, 6, 7, 9 and 10\n\u2022 Resolution MEPC.295(71) \u2014 2017 Guidelines for the implementation of MARPOL Annex V\n\u2022 Resolution A.982(24) \u2014 Particularly Sensitive Sea Areas\n\u2022 Garbage Management Plan and Garbage Record Book requirements"
    },
    {
      "title": "M10.1 \u2014 Classify garbage into the Annex V categories and segregate it correctly at source",
      "content": "Segregation happens at the bin, by whoever is holding the waste. If it is wrong there, nothing downstream can fix it. This is why the awareness tier exists.\n\n\nWhat you must be able to do:\n\u2022 Name the Annex V garbage categories and give examples of each\n\u2022 Segregate correctly at the point of generation using the ship's colour coding and marking\n\u2022 Identify materials that are commonly misclassified: cooking oil, e-waste, oily rags, medical waste, aerosols, batteries\n\u2022 Explain why mixed garbage must be treated according to its most restrictive component\n\n\nHow this is proven in practice:\n\u2022 Sorts twenty items correctly into the ship's bin arrangement\n\u2022 Explains the treatment of a mixed bag containing plastic and food waste\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Cooking oil put with food waste\n\u2022 Plastic-lined paper cups treated as paper\n\u2022 Bins unmarked or marked in a language part of the crew does not read"
    },
    {
      "title": "M10.2 \u2014 Apply the discharge criteria, including special area and sensitive area restrictions",
      "content": "The matrix in Figure 8 is the core knowledge. It is also the part learners most often half-remember, which is worse than not remembering at all.\n\n\nWhat you must be able to do:\n\u2022 State the discharge position for each category outside special areas, inside special areas, and in the Antarctic and Arctic\n\u2022 State the food waste comminution requirement and the 25 millimetre screen\n\u2022 Explain the meaning of en route in this context\n\u2022 Identify the special areas and sensitive sea areas on the ship's trading pattern and their specific restrictions\n\n\nHow this is proven in practice:\n\u2022 Completes a blank version of the Figure 8 matrix with no critical error\n\u2022 Applies the matrix correctly to eight scenario cards\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Discharging comminuted food waste at 5 nautical miles inside a special area\n\u2022 Treating the Great Barrier Reef as ordinary coastal water\n\u2022 Discharging while manoeuvring or at anchor and calling it en route"
    },
    {
      "title": "M10.3 \u2014 Maintain garbage storage arrangements",
      "content": "Storage is where inspections concentrate because it is visible from the deck. Poor storage also produces the pressure that leads to unlawful discharge.\n\n\nWhat you must be able to do:\n\u2022 Maintain the garbage station: marked, colour-coded, metal drums with metal lids, secured\n\u2022 Confirm garbage locker ventilation operates where fitted\n\u2022 Assess whether locker capacity is adequate for the trading pattern and matches the capacity stated in the Garbage Management Plan\n\u2022 Maintain segregation in remote locations, including the engine room workshop\n\u2022 Manage the specific requirements for narcotics, medical waste and expired medicines, including disposal receipts\n\n\nHow this is proven in practice:\n\u2022 Completes a garbage station inspection against a checklist\n\u2022 Compares actual locker capacity to the capacity stated in the plan\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Plastic drums with no lids in an open deck garbage station\n\u2022 Locker capacity in the plan that bears no relation to the actual locker\n\u2022 No receipts for controlled disposals"
    },
    {
      "title": "M10.4 \u2014 Maintain the Garbage Record Book and reconcile it against the Oil Record Book",
      "content": "The two books overlap at incineration, and the overlap is where errors cluster. Oily rags and cooking oil are Annex V. Sludge is Annex I. Both may go through the same incinerator on the same day.\n\n\nWhat you must be able to do:\n\u2022 Make correct Garbage Record Book entries for discharge, incineration and landing, with category, quantity and position\n\u2022 Obtain and retain disposal receipts\n\u2022 Reconcile incineration entries between the Garbage Record Book and the Oil Record Book\n\u2022 Explain the retention requirement and who signs\n\n\nHow this is proven in practice:\n\u2022 Makes six correct entries covering discharge, incineration and landing\n\u2022 Identifies the misallocated entries in a supplied paired record set\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Incineration of oily rags recorded in the Oil Record Book\n\u2022 Quantities estimated with no method and no consistency\n\u2022 Landing entries without receipts"
    },
    {
      "title": "M10.5 \u2014 Maintain the Garbage Management Plan, placards and training records",
      "content": "The plan is a required document that must reflect the actual ship. Placards must be posted where the decision is made, not on an office noticeboard.\n\n\nWhat you must be able to do:\n\u2022 Confirm the plan reflects the ship's actual arrangements, capacities and procedures\n\u2022 Confirm placards are correctly posted, legible and in the working languages of the crew\n\u2022 Maintain the garbage training record and confirm it is current\n\u2022 Explain the designation of the person responsible for carrying out the plan\n\n\nHow this is proven in practice:\n\u2022 Audits the plan against the ship and lists discrepancies\n\u2022 Confirms placard placement and legibility throughout the ship\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A plan describing a bin arrangement the ship no longer uses\n\u2022 Placards only in English on a multinational crew\n\u2022 Training record last updated two crew changes ago"
    },
    {
      "title": "M11.0 \u2014 Ozone-Depleting Substances and Nitrogen Oxides: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can identify the refrigerants on board and manage them under the ODS regime, state the NOx Tier applicable to each engine and prove it, maintain the NOx Technical File and the Record Book of Engine Parameters, and operate correctly within a NOx Tier III area.\n\nThis module is grounded in:\n\u2022 MARPOL Annex VI regulation 12 \u2014 ozone-depleting substances, and the ODS Record Book\n\u2022 MARPOL Annex VI regulation 13 \u2014 nitrogen oxides, Tiers I, II and III\n\u2022 NOx Technical Code 2008, including the Record Book of Engine Parameters and survey methods\n\u2022 Resolution MEPC.291(71) and the annual spot-check provisions for selective catalytic reduction\n\u2022 Resolution MEPC.392(82) \u2014 Canadian Arctic and Norwegian Sea Emission Control Areas"
    },
    {
      "title": "M11.1 \u2014 Identify every refrigerant on board and determine whether it is an ozone-depleting substance",
      "content": "The question is not whether the ship has a refrigeration plant. It is whether every charge on board, including the ones nobody thinks about, has been identified. Water coolers, control room air conditioning units, deck reefer containers and portable units all contain a charge.\n\n\nWhat you must be able to do:\n\u2022 Produce a complete inventory of every refrigerant charge on board, including small and portable units\n\u2022 Identify which refrigerants are ozone-depleting substances and which are not\n\u2022 Confirm any ODS on board is listed in the appendix to the IAPP Certificate\n\u2022 Explain that deliberate emission of ODS is prohibited and that leakage must be minimised\n\n\nHow this is proven in practice:\n\u2022 Produces the ship's complete refrigerant inventory with the type and approximate charge of each unit\n\u2022 Correctly classifies a list of refrigerant designations as ODS or non-ODS\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 An inventory that covers the provision plant and air conditioning but omits deck containers and water coolers\n\u2022 An ODS charge on board that is not listed on the IAPP Certificate appendix\n\u2022 Assuming that because the main plant uses a modern refrigerant, no ODS exists anywhere on the ship"
    },
    {
      "title": "M11.2 \u2014 Operate a leakage prevention regime and maintain the required records",
      "content": "Refrigerant loss is normally slow and invisible. A regime that detects loss early protects both the environment and the plant. Records must show that the regime is actually running, not merely written down.\n\n\nWhat you must be able to do:\n\u2022 Carry out and record routine leak testing and detector checks\n\u2022 Record refrigerant top-up quantities and relate them to the charge of the unit\n\u2022 Maintain the refrigeration log required by the ship's class notation, where one is carried\n\u2022 Recognise that a rising top-up rate is a leak that has not been found\n\n\nHow this is proven in practice:\n\u2022 Completes a leak test record and interprets a twelve-month top-up history\n\u2022 Identifies from a supplied history the unit that is losing charge\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Top-ups recorded as a running total with no unit identified\n\u2022 Leak detector unserviceable for months with no defect raised\n\u2022 Log entries made monthly in identical figures, which cannot be real"
    },
    {
      "title": "M11.3 \u2014 Manage the removal and landing of ODS and ODS-containing equipment",
      "content": "When ODS or equipment containing it leaves the ship, it must go to a reception facility and it must be recorded. Ships that have made such a discharge keep an ODS Record Book permanently on board.\n\n\nWhat you must be able to do:\n\u2022 State the requirement for an ODS Record Book where ODS has been discharged to a land-based reception facility\n\u2022 Record removal, recharging and landing with quantities and receiver details\n\u2022 Obtain and retain the reception receipt\n\u2022 Explain that the record is maintained permanently on board\n\n\nHow this is proven in practice:\n\u2022 Makes a correct ODS Record Book entry for a landing operation\n\u2022 Produces a compliant receipt specification\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Equipment landed at a repair yard with no record and no receipt\n\u2022 No ODS Record Book on a ship that has made such a landing\n\u2022 Recovered refrigerant vented because recovery equipment was unavailable"
    },
    {
      "title": "M11.4 \u2014 State the NOx Tier applicable to each engine and produce the supporting documentation",
      "content": "Tier is determined by the engine's construction date and the ship's operating area. Every engineer should be able to answer, without hesitation, what Tier each engine is and how that is proved.\n\n\nWhat you must be able to do:\n\u2022 State the Tier of the main engine and each auxiliary engine and the basis for it\n\u2022 Locate the EIAPP Certificate and Statement of Compliance for each engine\n\u2022 Locate the approved NOx Technical File and explain what it contains\n\u2022 Explain the survey method used for each engine as set out in its Technical File\n\n\nHow this is proven in practice:\n\u2022 Produces the EIAPP Certificate and Technical File for a named engine and states its Tier\n\u2022 Explains the applicable survey method in outline\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Not knowing the Tier of the auxiliary engines, only the main engine\n\u2022 A photocopy of the Technical File on board where the original approved copy is required\n\u2022 The Technical File not updated after component renewal"
    },
    {
      "title": "M11.5 \u2014 Maintain NOx-critical components and the Record Book of Engine Parameters",
      "content": "A NOx-critical component is identified by its IMO number. Fitting an uncertified part, or fitting a certified part without recording it, breaks the chain of compliance even though the engine may run perfectly.\n\n\nWhat you must be able to do:\n\u2022 Identify NOx-critical components \u2014 commonly fuel valve spindles and guides, nozzles, and pump plunger and barrel assemblies\n\u2022 Verify on receipt that the component's IMO identification matches the Technical File listing\n\u2022 Record every substitution in the Record Book of Engine Parameters, with specification, date and supplier\n\u2022 Photograph the IMO number of the component fitted and attach it to the maintenance record as permanent evidence\n\u2022 For electronically controlled engines, verify the engine control system survey record, including hardware identification numbers and software checksums\n\n\nHow this is proven in practice:\n\u2022 Makes a correct Record Book of Engine Parameters entry for a component renewal\n\u2022 Verifies a supplied component certificate against a Technical File extract\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A component fitted with no record, discovered at IAPP renewal\n\u2022 No Record Book of Engine Parameters started at all \u2014 a common finding on ships where nobody has been told it is expected\n\u2022 Photographs of IMO numbers duplicated between work orders, which destroys their evidential value"
    },
    {
      "title": "M11.6 \u2014 Operate correctly within a NOx Tier III area",
      "content": "Tier III applies to specified engines in specified areas. Where the ship relies on exhaust gas recirculation or selective catalytic reduction, entry and exit must be recorded and the system must be proved to be working.\n\n\nWhat you must be able to do:\n\u2022 Identify the NOx Tier III areas on the intended voyage\n\u2022 Record area entry and exit correctly in the required log\n\u2022 Maintain the exhaust gas recirculation record book where fitted\n\u2022 Carry out and record the annual spot check for a selective catalytic reduction system and verify the reduction rate against the Technical File\n\u2022 State the recent additions to the Emission Control Area map and their applicability dates\n\n\nHow this is proven in practice:\n\u2022 Annotates a passage plan with Tier III boundaries and states the records required at each\n\u2022 Interprets a supplied spot-check result against a Technical File value\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Entry and exit times recorded in the deck log but not in the required record\n\u2022 Reduction rate never verified, so the system's continuing effectiveness is unproven\n\u2022 Assuming the Emission Control Area map is static \u2014 the Canadian Arctic and Norwegian Sea entered into force on 1 March 2026, with the fuel requirement following on 1 March 2027"
    },
    {
      "title": "M12.0 \u2014 Sulphur Oxides, Fuel Oil Quality and Bunker Management: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can plan and execute a compliant fuel changeover, conduct a bunkering operation with correct sampling and documentation, manage fuel segregation and compatibility, and produce the complete evidence set on demand.\n\nThis module is grounded in:\n\u2022 MARPOL Annex VI regulations 14 and 18, including the 0.50 per cent global limit and the 0.10 per cent Emission Control Area limit\n\u2022 The carriage ban on non-compliant fuel oil where no approved equivalent arrangement is fitted\n\u2022 Bunker Delivery Note and MARPOL sample requirements, including retention periods\n\u2022 Resolution MEPC.392(82) and the current Emission Control Area designations"
    },
    {
      "title": "M12.1 \u2014 State the applicable sulphur limits and identify the areas in which each applies",
      "content": "Two numbers, several boundaries, and a map that changes. The 0.50 per cent global limit and the 0.10 per cent Emission Control Area limit are stable; the list of areas is not.\n\n\nWhat you must be able to do:\n\u2022 State the global limit and the Emission Control Area limit\n\u2022 Name the Emission Control Areas currently in force and any applicability dates still running\n\u2022 Explain the carriage ban and its exception for ships with an approved exhaust gas cleaning system\n\u2022 Identify additional regional limits, such as those applying at berth in certain jurisdictions\n\u2022 State where current information is obtained and how often it is checked\n\n\nHow this is proven in practice:\n\u2022 Lists the Emission Control Areas on the ship's trading pattern with the applicable limit and date\n\u2022 Explains the carriage ban in their own words\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Working from a map printed several years ago\n\u2022 Believing the carriage ban does not apply because the fuel is 'only in a storage tank'\n\u2022 Overlooking a regional at-berth requirement stricter than MARPOL"
    },
    {
      "title": "M12.2 \u2014 Plan and execute a fuel changeover",
      "content": "Changeover is where the compliance requirement and the engineering risk meet. Done too late, the ship is non-compliant. Done too fast, the fuel pumps seize and the ship blacks out. Both outcomes are avoidable by calculation.\n\n\nWhat you must be able to do:\n\u2022 Calculate changeover time from system volume, flow rate and the ship's flushing characteristics\n\u2022 Work backwards from the boundary to determine the start time\n\u2022 Control viscosity and temperature ramp rates to avoid thermal shock\n\u2022 Confirm completion before the boundary and record tank, quantity, position, date and time\n\u2022 State the responsibilities, back-up arrangements and record-keeping in the written changeover procedure\n\n\nHow this is proven in practice:\n\u2022 Produces a changeover plan for a stated boundary crossing, with times\n\u2022 Completes a changeover record correctly\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Starting the changeover on sighting the boundary\n\u2022 Ramping temperature fast to save time, and losing a fuel pump\n\u2022 A changeover record showing completion but no start time, so the duration cannot be assessed"
    },
    {
      "title": "M12.3 \u2014 Conduct bunkering with correct sampling, documentation and protest procedure",
      "content": "Bunkering produces the evidence the ship will be judged on for the next year. The sample and the delivery note are the entire defence if a fuel dispute or a compliance question arises.\n\n\nWhat you must be able to do:\n\u2022 Follow the bunkering procedure including pre-transfer checks, communications and the safety plan\n\u2022 Take samples correctly using the statutory sampling kit, at the correct point, throughout the delivery\n\u2022 Seal, label and sign samples jointly with the supplier, and distribute the sample set correctly\n\u2022 Retain the MARPOL sample on board for not less than twelve months, or until the fuel is consumed, under the ship's control\n\u2022 Retain the Bunker Delivery Note for three years\n\u2022 Issue a Letter of Protest at the time, signed by the supplier where possible, when the delivery note is incomplete or the fuel is off specification, and notify the company and the stemming party immediately\n\n\nHow this is proven in practice:\n\u2022 Completes a bunkering document set including a sample label and a Letter of Protest\n\u2022 States the retention period for each document without prompting\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Samples drawn at the start of the delivery only, which does not represent the parcel\n\u2022 A Letter of Protest written days later, when its evidential weight has largely gone\n\u2022 MARPOL samples stored in an unsecured locker where their integrity cannot be assured"
    },
    {
      "title": "M12.4 \u2014 Manage fuel segregation and compatibility",
      "content": "Mixing incompatible residual fuels precipitates asphaltenes. The result is not a slow degradation but a rapid blocking of filters and purifiers, often within hours, and frequently at the worst possible moment.\n\n\nWhat you must be able to do:\n\u2022 Explain asphaltene precipitation and why incompatible fuels cannot simply be blended\n\u2022 State the safeguards where very low sulphur, high sulphur and distillate fuels share a manifold line\n\u2022 Explain the consequence of mixing distillate with residual fuel\n\u2022 Plan tank allocation so that segregation is maintained through the voyage\n\n\nHow this is proven in practice:\n\u2022 Produces a tank allocation plan for a stated bunkering that maintains segregation\n\u2022 Explains the line flushing and blanking arrangements used on the ship\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Topping up a part-full tank with a different parcel to save a tank\n\u2022 No line flushing between grades on a single manifold line\n\u2022 Assuming that because both parcels meet the sulphur limit they are compatible"
    },
    {
      "title": "M12.5 \u2014 Maintain consumption measurement and reconcile it",
      "content": "Flow meters, soundings and reported figures must agree. Where they do not, the ship must know why before someone else asks.\n\n\nWhat you must be able to do:\n\u2022 Confirm flow meter arrangements for main engine, auxiliaries and boiler, and confirm they are working and calibrated\n\u2022 Confirm flow meters are correctable for changes in fuel data\n\u2022 Apply temperature and density corrections to sounding-based quantities\n\u2022 Reconcile soundings, flow meter readings, the Oil Record Book and figures reported to charterers\n\u2022 Explain why no unofficial or rough sounding notebook may be kept\n\n\nHow this is proven in practice:\n\u2022 Completes a reconciliation of a supplied data set and identifies the discrepancy\n\u2022 Applies a temperature and density correction correctly\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Uncorrected soundings recorded as final figures\n\u2022 A private notebook of 'real' figures alongside the official record \u2014 this converts a discrepancy into evidence of deliberate misstatement\n\u2022 Boiler consumption unmetered and estimated by habit"
    },
    {
      "title": "M12.6 \u2014 Understand exhaust gas cleaning system compliance where fitted",
      "content": "A scrubber is an equivalent arrangement, and it carries its own monitoring, recording and discharge obligations. Where it is not working, the ship is not compliant, however good the fuel logistics.\n\n\nWhat you must be able to do:\n\u2022 State that the system is approved as an equivalent to compliant fuel and must meet its approved monitoring manual\n\u2022 Confirm sensor calibration for pH, polycyclic aromatic hydrocarbons, turbidity and continuous emissions monitoring, as required by the approved manual\n\u2022 Confirm emissions and discharge data are retained for not less than eighteen months, including through any device change\n\u2022 Maintain the record book covering malfunction, maintenance, daily records during sensor failure, alkali consumption for closed-loop operation, and wash water and sludge shore discharge with receipts\n\u2022 Confirm the discharge water analysis is current and valid\n\u2022 Confirm the system is operating in the correct mode for the area\n\n\nHow this is proven in practice:\n\u2022 Audits a supplied scrubber record set and identifies gaps\n\u2022 States the data retention period and the position when a monitoring device is replaced\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Data retained on a device that was replaced, with the historical record lost\n\u2022 Operating outside the approved mode inside an Emission Control Area\n\u2022 Wash water residue landed with no receipt"
    },
    {
      "title": "M13.0 \u2014 Environmental Seals, Documentation and Certification: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can operate the environmental seal regime end to end, maintain the environmental documentation set, verify certification validity, and produce a complete and consistent evidence package on demand.\n\nThis module is grounded in:\n\u2022 MARPOL Annexes I, IV, V and VI certification requirements\n\u2022 ISM Code elements 10 and 11 \u2014 maintenance and documentation\n\u2022 Company environmental seal control procedure\n\u2022 Voluntary Environmental Compliance Program style requirements, where the ship operates under one"
    },
    {
      "title": "M13.1 \u2014 Identify every valve and connection required to be sealed",
      "content": "The seal list is ship-specific and must be complete. A valve that could put a regulated substance into the sea and is not on the list is a gap that will be found.\n\n\nWhat you must be able to do:\n\u2022 Identify from the ship's arrangements every overboard valve and connection requiring a seal: separator overboard, sludge discharge port and starboard, sewage overboard, grey water overboard, bunker manifold valves, bilge cross-connections, emergency bilge suction, bow thruster bilge eductor, tank connection and fuel preparation room bilge overboards\n\u2022 Identify additional sealing points required by charterers or by a voluntary compliance programme\n\u2022 Confirm the pollution response locker is sealed and its inventory list displayed, signed and dated\n\u2022 Explain the purpose of a warning notice at a sealed valve\n\n\nHow this is proven in practice:\n\u2022 Produces a complete seal register for the ship, cross-referenced to the piping diagrams\n\u2022 Identifies a valve omitted from a supplied incomplete register\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Bow thruster compartment eductor overboard omitted because it is outside the machinery space\n\u2022 Charterer-required seals treated as optional\n\u2022 Response locker sealed but the inventory list unsigned"
    },
    {
      "title": "M13.2 \u2014 Operate seal control, logging and verification",
      "content": "The seal is only evidence if the log is contemporaneous and the seals are controlled stock. Loose seals in a drawer make the entire regime worthless.\n\n\nWhat you must be able to do:\n\u2022 Control seal stock so that seals are issued only by the Master or Chief Engineer\n\u2022 Record seal number, location, date fitted and the fitting officer's signature\n\u2022 Carry out physical verification by sighting each seal and comparing the number to the log, initialling the check\n\u2022 Explain why reading the log without sighting the seal is not verification\n\n\nHow this is proven in practice:\n\u2022 Carries out a verification round and correctly identifies the seal whose number does not match the log\n\u2022 Explains the stock control arrangement in force on the ship\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Seals stored where any crew member can take one\n\u2022 Verification recorded as complete in less time than the round physically takes\n\u2022 Seal numbers recorded in blocks in advance"
    },
    {
      "title": "M13.3 \u2014 Break and replace a seal under proper authority",
      "content": "Seals are meant to be broken \u2014 for lawful operations. What matters is that the authority, the reason and the timing are recorded before the seal is cut, and that a new seal follows immediately.\n\n\nWhat you must be able to do:\n\u2022 Obtain and record the Master's or Chief Engineer's authority before breaking a seal\n\u2022 Record the reason, time and authority in the seal log\n\u2022 Fit and log a new numbered seal immediately after the operation\n\u2022 Where the operation was a discharge, record the new seal number in the Oil Record Book as well\n\u2022 State what to do if a seal is found broken with no record\n\n\nHow this is proven in practice:\n\u2022 Executes a complete break, operate, re-seal and record sequence under observation\n\u2022 States the escalation route for an unexplained broken seal\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Seal broken first, authority sought afterwards\n\u2022 New seal fitted days later\n\u2022 An unexplained broken seal quietly replaced, which is far worse than reporting it"
    },
    {
      "title": "M13.4 \u2014 Maintain the environmental documentation set and verify certification",
      "content": "The document set is the ship's account of itself. It must be complete, current, filed so it can be produced, and consistent with the physical ship.\n\n\nWhat you must be able to do:\n\u2022 Verify validity and endorsement status of the IOPP and its Supplement, ISPP, IAPP, EIAPP and any additional certificates\n\u2022 Confirm the physical arrangements match the IOPP Supplement, including tank listings\n\u2022 Maintain the required manuals and plans in an accessible location known to the Master and Chief Engineer\n\u2022 Maintain the environmental file structure: pipe leakage and breakage records, pollution prevention equipment training records, incinerator running hours, refrigeration log, sewage and grey water records, stern tube monitoring records\n\u2022 Confirm the hazardous materials inventory documentation is in order and understand the current ship recycling regime\n\u2022 Confirm posted operating instructions and regulatory placards are present, legible and correctly located\n\n\nHow this is proven in practice:\n\u2022 Completes a documentation audit against a structured list and produces a finding list\n\u2022 Identifies a supplement and physical arrangement mismatch\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A tank in use that does not appear in the IOPP Supplement\n\u2022 Placards posted in the ship's office rather than at the point of decision\n\u2022 Manuals present but nobody able to find them within the time an inspector will wait"
    },
    {
      "title": "M13.5 \u2014 Control flexible hoses, portable pumps and temporary arrangements",
      "content": "The portable pump and the flexible hose are the physical means by which almost every bypass is created. Controlling them is therefore a direct control on the offence.\n\n\nWhat you must be able to do:\n\u2022 Maintain an inventory of flexible hoses at or above the specified size and of portable pumps\n\u2022 Tag each item and store them in a controlled location with the inventory displayed\n\u2022 Verify the inventory physically at the required interval\n\u2022 Challenge any hose or pump found rigged and establish its purpose\n\n\nHow this is proven in practice:\n\u2022 Verifies a supplied inventory against a physical store and identifies the item that is missing and the one that is not listed\n\u2022 States the action on finding a hose rigged between a sludge tank drain and a deck scupper\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 An inventory that has not been verified physically for months\n\u2022 Hoses stored loose around the machinery space\n\u2022 A rigged hose observed and rationalised rather than challenged"
    },
    {
      "title": "M14.0 \u2014 Ballast Water, Biofouling and Invasive Species: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can operate the ballast water management system in compliance with the D-2 standard, maintain the ballast water record, manage biofouling under the current guidelines, and meet national requirements on invasive species.\n\nThis module is grounded in:\n\u2022 Ballast Water Management Convention 2004, regulations D-1 and D-2, and the Ballast Water Record Book\n\u2022 Ballast Water Management Plan and the type-approved treatment system's operational manual\n\u2022 Resolution MEPC.378(80) \u2014 2023 biofouling guidelines\n\u2022 AFS Convention 2001\n\u2022 National requirements, including regional inspection regimes for invasive pests"
    },
    {
      "title": "M14.1 \u2014 Operate the ballast water treatment system and record operations correctly",
      "content": "Treatment systems fail quietly and often. The record must show what was actually done, including bypasses and failures, because a clean record with a broken system is worse than an honest one.\n\n\nWhat you must be able to do:\n\u2022 Operate the system in accordance with its type-approval and operational manual\n\u2022 Record every ballasting, deballasting, treatment, internal transfer and exchange in the Ballast Water Record Book\n\u2022 Record system failure, bypass and any contingency measure, with times and reasons\n\u2022 Explain the D-1 exchange and D-2 performance standards and which applies to the ship\n\u2022 Complete the mandatory onboard familiarisation and training for the fitted system and record it\n\n\nHow this is proven in practice:\n\u2022 Makes correct record entries for a ballasting operation and a system failure\n\u2022 Demonstrates or describes the system start-up and treatment sequence\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Bypass used but not recorded, leaving an untreated discharge unexplained\n\u2022 Training on the specific fitted system never carried out, only generic ballast training\n\u2022 Record entries made from the ballast plan rather than from what actually happened"
    },
    {
      "title": "M14.2 \u2014 Plan ballast operations against port and national requirements",
      "content": "Ballast rules are heavily national. Ports impose reporting, sampling, timing and exchange requirements that go beyond the Convention, and several require advance notification.\n\n\nWhat you must be able to do:\n\u2022 Identify national and port requirements on the intended voyage, including reporting formats and notice periods\n\u2022 Plan uptake and discharge to avoid prohibited areas, shallow water and sediment disturbance\n\u2022 Explain sediment management and the requirements for tank sediment removal and disposal\n\u2022 Prepare for a port State sampling inspection\n\n\nHow this is proven in practice:\n\u2022 Produces a ballast plan for a voyage that includes a port with additional requirements\n\u2022 Lists the notifications required and their deadlines\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Discovering a reporting requirement on arrival\n\u2022 Ballast uptake in shallow or turbid water immediately before a discharge port\n\u2022 Sediment disposal arrangements never considered"
    },
    {
      "title": "M14.3 \u2014 Manage biofouling under the current guidelines",
      "content": "Biofouling management moved from good practice to a structured guideline framework with resolution MEPC.378(80), and several jurisdictions now inspect against it. It is also a direct fuel consumption and carbon intensity issue.\n\n\nWhat you must be able to do:\n\u2022 Explain the purpose and content of the biofouling management plan and record book\n\u2022 Record inspections, in-water cleaning, drydock cleaning and coating renewal\n\u2022 Explain the concept of niche areas and why they dominate the risk: sea chests, thruster tunnels, rudder stock, propeller boss, internal seawater cooling systems\n\u2022 Explain the requirements applying to in-water cleaning, including capture of removed material and jurisdictions where it is prohibited\n\u2022 Relate fouling to fuel consumption and carbon intensity performance\n\n\nHow this is proven in practice:\n\u2022 Makes a correct biofouling record book entry following an inspection\n\u2022 Identifies the niche areas on a supplied ship arrangement\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Plan and record book present but never used\n\u2022 In-water cleaning carried out where it is prohibited, or without capture\n\u2022 Fouling treated as a hull maintenance matter unconnected to compliance or fuel"
    },
    {
      "title": "M14.4 \u2014 Meet anti-fouling system and invasive pest requirements",
      "content": "The anti-fouling system is separately certified, and certain jurisdictions run seasonal inspection regimes for invasive insect pests that can result in a ship being turned away.\n\n\nWhat you must be able to do:\n\u2022 Locate the anti-fouling system certificate and declaration and explain what they cover\n\u2022 Explain that certain anti-fouling substances are prohibited and what that means at recoating\n\u2022 Describe the inspection and certification regime for invasive insect pests in the relevant regions, including the ports and seasons where it applies\n\u2022 Carry out and record a self-inspection for egg masses in the required locations\n\n\nHow this is proven in practice:\n\u2022 Produces the anti-fouling certification for the ship\n\u2022 Carries out a structured self-inspection following the published guidance and records it\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Anti-fouling certification not updated after recoating\n\u2022 Self-inspection carried out only on accessible deck areas, missing the high and shadowed locations where egg masses are actually laid\n\u2022 Using an obsolete name for the pest regime and therefore searching the wrong guidance"
    },
    {
      "title": "M15.0 \u2014 Special Regimes \u2014 Dual-Fuel Vessels, Energy Efficiency and Ship Recycling: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can manage the environmental requirements specific to dual-fuel vessels, explain and support the ship's energy efficiency and carbon intensity obligations, and maintain the hazardous materials inventory in accordance with the current ship recycling regime.\n\nThis module is grounded in:\n\u2022 IGF Code and dual-fuel vessel operational requirements\n\u2022 MARPOL Annex VI Chapter 4 \u2014 energy efficiency, including the Energy Efficiency Existing Ship Index, the Ship Energy Efficiency Management Plan and operational carbon intensity\n\u2022 Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships, in force since 26 June 2025\n\u2022 Inventory of Hazardous Materials requirements\n\u2022 Exhaust gas cleaning system approved onboard monitoring manual requirements"
    },
    {
      "title": "M15.1 \u2014 Manage the environmental controls specific to dual-fuel and gas-fuelled vessels",
      "content": "Gas-fuelled ships add a set of environmental controls that do not exist on conventional ships, and methane release is both a safety and a greenhouse gas issue.\n\n\nWhat you must be able to do:\n\u2022 Confirm tank connection space and fuel preparation room bilge overboard valves are closed, sealed and placarded\n\u2022 Confirm manual gas tank venting valves are closed and sealed and the seal numbers logged\n\u2022 Confirm gas manifold vent and purging valves are closed and blanked\n\u2022 Verify the gas detection system is fully functional on vent masts and double-wall piping, with no disabled or simulated sensors\n\u2022 Maintain the gas bunkering log and confirm the quality certificate is received and filed\n\n\nHow this is proven in practice:\n\u2022 Completes a dual-fuel specific verification round and records the result\n\u2022 Identifies a simulated sensor in a supplied system status screen\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 A sensor placed in simulation during commissioning and never restored\n\u2022 Vent valve seals fitted but numbers not logged\n\u2022 Gas bunkering records incomplete because the format differs from oil bunkering"
    },
    {
      "title": "M15.2 \u2014 Explain the ship's energy efficiency obligations and the crew's part in them",
      "content": "Energy efficiency instruments sit in MARPOL Annex VI Chapter 4 and are usually managed ashore, but the data and the operational decisions come from the ship. Crew who understand the mechanism produce better data and better decisions.\n\n\nWhat you must be able to do:\n\u2022 Explain the purpose of the Ship Energy Efficiency Management Plan and what entries it requires\n\u2022 Explain the Energy Efficiency Existing Ship Index and, where an engine power limitation is fitted, the operational implications and the documentation carried\n\u2022 Explain operational carbon intensity reporting and the ship's part in producing accurate data\n\u2022 Explain how hull and propeller condition, trim, speed and auxiliary load affect the outcome\n\u2022 Explain the fuel data reporting obligations the ship contributes to\n\n\nHow this is proven in practice:\n\u2022 Explains, in their own words, how a decision taken on the bridge or in the engine room affects the ship's reported carbon intensity\n\u2022 Locates the energy efficiency plan and the engine power limitation documentation where fitted\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Treating energy efficiency as an office matter with no shipboard action\n\u2022 Engine power limitation arrangements in place but the watchkeepers unaware of the operating restriction\n\u2022 Fuel data submitted without verification, producing a carbon intensity result nobody on board can explain"
    },
    {
      "title": "M15.3 \u2014 Maintain the Inventory of Hazardous Materials",
      "content": "The Hong Kong Convention entered into force on 26 June 2025. The inventory is now a live document that must be maintained through the ship's service life, not a survey artefact produced once.\n\n\nWhat you must be able to do:\n\u2022 Explain the structure of the inventory and what Part I covers\n\u2022 Explain the certification pathway and the transitional arrangement running to 26 June 2030\n\u2022 Maintain Part I when new material is installed, using material declarations and suppliers' declarations of conformity\n\u2022 Explain the restriction on new installation of listed hazardous materials\n\u2022 Confirm whether the ship is asbestos-free and where that is documented\n\n\nHow this is proven in practice:\n\u2022 Records an inventory update following a supplied equipment installation, with the correct supporting declarations\n\u2022 Locates the ship's inventory certification and states its status\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Inventory produced at survey and never updated, so it no longer describes the ship\n\u2022 Equipment accepted on board with no material declaration\n\u2022 Asbestos status assumed rather than documented"
    },
    {
      "title": "M15.4 \u2014 Verify exhaust gas cleaning system compliance at verifier level",
      "content": "Where a scrubber is fitted, the verifier must be able to audit the whole evidence chain rather than accept that the system is running.\n\n\nWhat you must be able to do:\n\u2022 Audit sensor calibration against the approved onboard monitoring manual\n\u2022 Verify eighteen months of emissions and discharge data are available, including across any device change\n\u2022 Audit the record book for malfunction, maintenance, sensor-failure daily records, alkali consumption and residue landing receipts\n\u2022 Verify the discharge water analysis is current and appropriate to the trading pattern\n\u2022 Verify the system is operated in the correct mode for each area entered\n\n\nHow this is proven in practice:\n\u2022 Audits a supplied record set and produces a finding list\n\u2022 Identifies the gap created by an undocumented device replacement\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Accepting a running system as evidence of compliance\n\u2022 Data gap at a device change treated as unavoidable\n\u2022 Mode verification never carried out"
    },
    {
      "title": "M16.0 \u2014 EMS Self-Inspection, Gap Analysis and Reporting Culture: Overview",
      "content": "By the end of this module you will be able to: On completion the learner can plan and conduct a structured shipboard environmental self-inspection, write findings that lead to closure, verify records against physical evidence, and sustain a reporting culture in which concerns are raised early.\n\nThis module is grounded in:\n\u2022 ISM Code elements 9, 10 and 12 \u2014 reports of non-conformity, maintenance, and internal audit\n\u2022 MARPOL record-keeping and verification requirements across all Annexes\n\u2022 Company environmental self-inspection procedure and the six-monthly interval\n\u2022 Voluntary compliance programme gap analysis requirements, where applicable"
    },
    {
      "title": "M16.1 \u2014 Plan and conduct the periodic environmental self-inspection",
      "content": "The self-inspection is the ship's own check, normally at six-monthly intervals and normally the Master's responsibility with the Chief Engineer. Its value depends entirely on whether it is done properly or performed as a paper exercise the day before it is due.\n\n\nWhat you must be able to do:\n\u2022 Plan the inspection against a structured scope covering every system in this programme\n\u2022 Delegate specific checks appropriately while retaining responsibility for the review and completion\n\u2022 Allocate realistic time \u2014 a genuine inspection cannot be completed in an afternoon\n\u2022 Enter findings into the maintenance and defect system so they generate work and are tracked\n\u2022 Explain how the self-inspection relates to, and does not replace, inspection by shore staff\n\n\nHow this is proven in practice:\n\u2022 Produces an inspection plan with scope, delegation and timing\n\u2022 Explains the relationship between the self-inspection and the external inspection cycle\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 The inspection recorded as complete with every answer 'Yes' and no findings \u2014 statistically implausible and immediately obvious\n\u2022 Findings recorded in the checklist but never raised as work\n\u2022 The whole inspection delegated and then signed without review"
    },
    {
      "title": "M16.2 \u2014 Write a finding that leads to closure",
      "content": "A finding that says 'housekeeping to be improved' produces nothing. A finding that names the item, the location, the condition, the requirement and the required action produces a work order and eventually a closed defect.\n\n\nWhat you must be able to do:\n\u2022 Write findings in a consistent structure: what was found, where, against what requirement, and what is required\n\u2022 Distinguish a non-conformity from an observation and from an opportunity for improvement\n\u2022 Assign responsibility and a realistic target date\n\u2022 Verify closure by evidence rather than by assertion\n\n\nHow this is proven in practice:\n\u2022 Rewrites five weak findings into a form that could be actioned\n\u2022 Correctly classifies a set of findings as non-conformity or observation\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Findings written so vaguely that closure cannot be judged\n\u2022 Everything classified as an observation to keep the non-conformity count at zero\n\u2022 Closure recorded on the basis of an email saying it has been done"
    },
    {
      "title": "M16.3 \u2014 Verify records against physical evidence",
      "content": "This is the discipline that distinguishes an inspection from a walk-round. Every record claim should be testable against something physical, and the verifier's job is to test a sample of them.\n\n\nWhat you must be able to do:\n\u2022 Select a sample of record entries and trace each to physical evidence \u2014 a sounding, a seal, a receipt, a meter log, a spare part consumed\n\u2022 Reconcile across systems: record book against sounding book, incineration record against running hours, disposal entry against receipt, seal log against physical seal\n\u2022 Compare recorded rates against rated capacities and identify impossibilities\n\u2022 Investigate changes in operational pattern, cleaning, maintenance or spares ordering and establish the reason\n\n\nHow this is proven in practice:\n\u2022 Completes a verification sample on a supplied record set and produces evidence-based findings\n\u2022 Identifies a pattern change and formulates the questions to ask about it\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Verifying that records exist rather than that they are true\n\u2022 Sampling only the most recent month\n\u2022 Noticing a pattern change and accepting the first explanation offered"
    },
    {
      "title": "M16.4 \u2014 Manage an external inspection",
      "content": "Port State Control, vetting and voluntary programme inspections are won or lost in preparation. The ship that has already found its own problems is in a completely different position from the one discovering them alongside the inspector.\n\n\nWhat you must be able to do:\n\u2022 Prepare the environmental evidence package in advance so any document can be produced in minutes\n\u2022 Brief the crew on what will be asked and on answering honestly and within their own knowledge\n\u2022 Accompany the inspector, record what is examined and what is said, and avoid speculation\n\u2022 Respond to findings with a corrective action that addresses cause rather than symptom\n\u2022 Explain what to do if an inspector asks a question the crew member cannot answer\n\n\nHow this is proven in practice:\n\u2022 Produces a pre-inspection preparation plan\n\u2022 Role-plays an inspection interview without speculating or over-answering\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Crew coached to give particular answers, which is transparent and profoundly damaging\n\u2022 Documents produced slowly and incompletely, which changes the inspector's assumptions about everything else\n\u2022 Corrective actions that address the individual finding but not the reason it arose"
    },
    {
      "title": "M16.5 \u2014 Sustain a reporting culture",
      "content": "Every documented environmental prosecution has a period during which somebody on board knew. The single most effective control any ship has is a crew that raises concerns early and a command that does not punish them for it.\n\n\nWhat you must be able to do:\n\u2022 State the routes available for raising a concern, including at least one outside the shipboard line of command\n\u2022 Explain the protections that apply and their practical limits\n\u2022 Describe how to raise a concern in a way that preserves evidence and does not accuse\n\u2022 As a senior officer, respond to a concern in a way that makes the next one more likely rather than less\n\u2022 Explain the standing orders' role in setting the expectation\n\n\nHow this is proven in practice:\n\u2022 Writes a concern report that is factual, specific and non-accusatory\n\u2022 Responds to a supplied concern in a role-play, assessed on whether the reporter would come back a second time\n\n\nCommon failure modes seen on board \u2014 learn from these:\n\u2022 Reporting routes posted but not believed\n\u2022 A first report handled defensively, which reliably ensures there is no second one\n\u2022 Senior officers treating a report as a personal attack"
    }
  ],
  "practical": {
    "title": "Conduct a shipboard environmental self-inspection",
    "description": "Working in teams, plan a full environmental self-inspection: scope, delegation, timing and evidence to be sampled. Using the anonymised checklist as the instrument, inspect a real vessel or a comprehensive simulation. Write up findings individually, then peer-review each one for whether it could actually be closed \u2014 a finding must name the item, its location, the requirement it breaches, the required action, the responsible party and a date. Weak findings are rewritten. Close with two role-plays observed against a rubric: an external inspection interview, and a junior rating raising a concern about a hose seen rigged in the machinery space."
  },
  "quiz": [
    {
      "q": "A ship of 8,000 GT is proceeding on passage inside a MARPOL Annex I Special Area. The 15 ppm equipment is operating and the oil content meter reads 9 ppm. Machinery space bilge water may be discharged:",
      "options": [
        "Yes, because the reading is below 15 ppm",
        "Yes, provided the Chief Engineer authorises it",
        "No \u2014 discharge from machinery spaces inside an Annex I Special Area is prohibited for ships of 400 GT and above",
        "Yes, provided it is daylight"
      ],
      "answer": 2
    },
    {
      "q": "The MARPOL fuel sample taken at bunkering is retained on board for:",
      "options": [
        "Three months",
        "Six months",
        "Not less than twelve months, or until the fuel is consumed, whichever is later",
        "Three years"
      ],
      "answer": 2
    },
    {
      "q": "Untreated sewage discharge rate is calculated as:",
      "options": [
        "DR = 0.00926 \u00d7 V \u00d7 D \u00d7 B",
        "DR = 0.0926 \u00d7 V \u00d7 D \u00d7 B",
        "DR = 0.00926 \u00d7 V \u00d7 B \u00f7 D",
        "DR = V \u00d7 D \u00d7 B \u00f7 0.00926"
      ],
      "answer": 0
    },
    {
      "q": "An error made in the Oil Record Book three days ago is corrected by:",
      "options": [
        "Erasing and rewriting",
        "Correction fluid and rewriting",
        "A single struck line leaving the original legible, the correction written, initialled and dated with rank",
        "Removing the page"
      ],
      "answer": 2
    },
    {
      "q": "Which connection is expressly prohibited between an oil residue (sludge) tank and the rest of the ship?",
      "options": [
        "The standard discharge connection",
        "A connection to the incinerator",
        "A discharge connection to the bilge system, the oily bilge water holding tank, the tank top or the oily water separator",
        "A connection to another sludge tank"
      ],
      "answer": 2
    },
    {
      "q": "Incinerator ash may be discharged to sea:",
      "options": [
        "Beyond 12 nautical miles",
        "Beyond 25 nautical miles",
        "Only outside special areas",
        "Never"
      ],
      "answer": 3
    },
    {
      "q": "The global fuel oil sulphur limit outside Emission Control Areas is:",
      "options": [
        "0.10 % m/m",
        "0.50 % m/m",
        "1.00 % m/m",
        "3.50 % m/m"
      ],
      "answer": 1
    },
    {
      "q": "Comminuted food waste passing a 25 mm screen may be discharged outside special areas at a distance of more than:",
      "options": [
        "3 nautical miles, en route",
        "6 nautical miles, en route",
        "12 nautical miles, en route",
        "25 nautical miles, en route"
      ],
      "answer": 0
    },
    {
      "q": "The oil content meter must be calibrated at intervals not exceeding:",
      "options": [
        "One year",
        "Two years",
        "Five years",
        "Ten years"
      ],
      "answer": 2
    },
    {
      "q": "A rating reports a flexible hose rigged between a sludge tank drain and a deck scupper. The correct immediate action is to:",
      "options": [
        "Remove the hose and say nothing",
        "Thank the rating, preserve the situation and evidence, inform the Master and Chief Engineer, and record the report",
        "Ask the rating to check whether it has been used",
        "Note it in the deck log for the next inspection"
      ],
      "answer": 1
    },
    {
      "q": "Substitution of a NOx-critical component is recorded in:",
      "options": [
        "The Oil Record Book",
        "The Record Book of Engine Parameters",
        "The Garbage Record Book",
        "The planned maintenance system only"
      ],
      "answer": 1
    },
    {
      "q": "Oily rags incinerated on board are recorded in:",
      "options": [
        "The Oil Record Book",
        "The Garbage Record Book",
        "Both books",
        "Neither"
      ],
      "answer": 1
    },
    {
      "q": "Grey water discharge is:",
      "options": [
        "Regulated by MARPOL Annex IV",
        "Regulated by MARPOL Annex V",
        "Not regulated by MARPOL, but controlled by several national and regional regimes and by class environmental notations",
        "Prohibited within 12 nautical miles worldwide"
      ],
      "answer": 2
    },
    {
      "q": "A functional test of the 15 ppm system is complete only when:",
      "options": [
        "The alarm has sounded",
        "The oil content meter has been zeroed",
        "The automatic stopping arrangement has been proved, with the three-way valve seen to divert the flow",
        "The pump has been run for ten minutes"
      ],
      "answer": 2
    },
    {
      "q": "The Bunker Delivery Note is retained on board for:",
      "options": [
        "Twelve months",
        "Two years",
        "Three years",
        "Five years"
      ],
      "answer": 2
    },
    {
      "q": "A seal is found broken on the sewage overboard valve with no corresponding entry in the seal log. The correct action is to:",
      "options": [
        "Fit a new seal and log it with today's date",
        "Report it immediately to the Master and Chief Engineer, preserve the position, and investigate before re-sealing",
        "Ignore it if the valve is shut",
        "Record it in the Oil Record Book"
      ],
      "answer": 1
    },
    {
      "q": "Recorded sludge generation over three months is far below the expected proportion of fuel consumed, and no explanation appears anywhere in the records. This is:",
      "options": [
        "Evidence of efficient purifier operation",
        "A standard investigative indicator that sludge may be leaving the ship by an unrecorded route",
        "A reason to recalibrate the flow meters",
        "Not significant, as generation varies widely"
      ],
      "answer": 1
    },
    {
      "q": "The Hong Kong Convention on ship recycling entered into force on:",
      "options": [
        "26 June 2023",
        "26 June 2025",
        "1 March 2026",
        "26 June 2030"
      ],
      "answer": 1
    },
    {
      "q": "A charterer instructs the Master in writing to make a discharge that would breach MARPOL. The Master should:",
      "options": [
        "Comply, recording the instruction in the record book",
        "Comply if the flag State raises no objection",
        "Refuse, and report the instruction to the company \u2014 a commercial contract cannot authorise a statutory breach",
        "Seek the charterer's indemnity before complying"
      ],
      "answer": 2
    },
    {
      "q": "A completed environmental self-inspection covering the full scope records no findings at all. The most reasonable conclusion is that:",
      "options": [
        "The ship is in exemplary condition",
        "The inspection was probably not carried out with sufficient rigour",
        "The checklist needs to be made harder",
        "The inspector should be commended"
      ],
      "answer": 1
    }
  ]
};

async function main() {
  const auk = await prisma.provider.findFirst({ where: { id: "auk-marine" } });
  if (!auk) throw new Error("AUK provider not found — run db:seed first");

  const existing = await prisma.course.findFirst({ where: { code: course.code } });

  const data = {
    code: course.code,
    title: course.title,
    category: course.category,
    providerId: auk.id,
    durationLabel: course.durationLabel,
    price: 620000, // R6,200 — change in Admin > Courses if needed
    modes: ["online"],
    featured: true,
    published: true,
    summary: course.summary,
    outcomes: course.outcomes,
    modules: course.modules,
    practical: course.practical,
    photos: [],
    videos: [],
    materials: [],
    quiz: course.quiz,
  };

  if (existing) {
    await prisma.course.update({ where: { id: existing.id }, data });
    console.log(`✓ Updated existing course: ${course.code} — ${course.title}`);
  } else {
    await prisma.course.create({ data });
    console.log(`✓ Created course: ${course.code} — ${course.title}`);
  }

  console.log(`  ${course.modules.length} lessons, ${course.quiz.length} quiz questions, published=true`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
