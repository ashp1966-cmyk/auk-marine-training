/**
 * AUK SPM 001 — Shipping, Port & Ships Agency
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCES
 *   1. "Port Agency Operations — Learner Guide", AUK Marine and Mining (Pty) Ltd,
 *      2021. AUK's own material.
 *   2. FONASBA, "The Role, Responsibilities and Obligations of the Ship Agent in
 *      the International Transport Chain".
 *   3. FONASBA/BIMCO General Agency Agreement (GAA) standard form.
 *
 * CLIENT MATERIAL REMOVED — the learner guide was written for one named client
 * ("For Alpha Shipping Staff only") and contains material that must not appear in
 * a course sold to others:
 *   - The client's name, throughout.
 *   - A named list of ~30 competing South African agency operators. Publishing a
 *     competitor list inside a commercial training course is neither useful to a
 *     learner nor appropriate.
 *   - Two real disbursement estimates carrying a third party's actual rates,
 *     agency fees and margins. The DA structure is taught; the figures are not
 *     reproduced. Learners build their own from the current tariff book.
 *   - The contributor acknowledgement, which names an individual at a named firm.
 *
 * CURRENCY — the guide draws on Transnet's 2015 Long Term Planning Framework, the
 * 2016/17 Terminal Operating Guidelines and a 2021/22 tariff book. Port throughput
 * figures, forecasts and every tariff in it are now stale. This course teaches the
 * structure and the method, and directs learners to the current published sources
 * for any number they intend to quote. See the note at the foot of this file.
 */

export const aukSpm001Modules = [
  {
    title: "1. What a Ship Agent Actually Does",
    content: `Around 90% of world trade moves by sea, and roughly 98% of South Africa's international trade passes through its eight commercial ports. Every one of those ship calls needs someone standing between the vessel and the shore. That is the agent.

**The definition that matters**

The IMO FAL Convention defines the ship agent as the party representing the ship's owner and/or charterer — the **Principal** — in port. Where instructed, the agent arranges a berth with the port, arranges all relevant port and husbandry services, attends to the requirements of the Master and crew, clears the ship with the port and other authorities including preparing and submitting the documentation, and releases or receives cargo on the Principal's behalf.

Read that again and notice what it does not say. It does not say the agent decides anything. The agent acts **on instructions**, within an authority the Principal grants. Everything in this course follows from that.

**The port agent as single window**

FONASBA describes the port agent as the de facto port single window — the conduit for all information exchanged between the vessel and the shore. Draw the diagram and the agent sits in the middle, with lines running out to:

Tugs and pilots · stevedores and terminals · other port services · statutory authorities · surface transport by road and rail · shippers, receivers, forwarding agents and NVOCCs · other contractors and social services.

And behind the agent, the Master and the owners or operators.

Nobody else in the port has that view. The terminal sees its own yard. The pilot sees the channel. Customs sees the declaration. The agent has to make all of it connect, in the right order, before the vessel's laytime runs out.

**The scale of the job**

When FONASBA built its Port Procedures Survey it identified **more than 130 separate operations** a port agent may be required to undertake. No single port call needs all of them. But the range indicates what the role demands: not deep expertise in one thing, but working competence across the whole call, kept current as regulations and tariffs change.

**What makes a good agent**

Local knowledge, contacts, and being sufficiently well established to actually deliver. An agent who cannot get a berth planner on the phone at 0200, or who does not know that a particular terminal will refuse a vessel without a hold cleanliness certificate, costs the Principal money in ways that never appear on an invoice.

**Why this matters commercially**

A vessel on charter costs its operator a daily hire rate whether it is working cargo or waiting. Every hour the agent saves is money. Every hour lost through a missed notice, a late nomination or a document that was not ready is money too — and the Principal will know exactly which.`,
  },
  {
    title: "2. Types of Agency Appointment",
    content: `More than one agent may attend the same vessel. Knowing which appointment you hold determines what you do, who instructs you, and who pays you.

**Port agent.** Represents the operator of the vessel — who may also be the owner. Nominates the vessel with the port authority, arranges arrival, berthing and sailing formalities including berth allocation and pre-planning, handles vessel disbursements, coordinates with charterers and cargo agents, and is responsible for the discharging and loading operations. This is the central appointment and the one most of this course addresses.

**Cargo agent (charterers' agent).** Represents the charterer. Handles on-board cargo functions and all cargo documentation, is responsible for discharge and loading operations, and liaises with the port agent. In the liner and break-bulk trades the cargo or liner agent also solicits cargo for the line — maintaining contact with local shippers, quoting schedules, rates and conditions of carriage, and sometimes offering inland transport and customs clearance alongside.

**Owners' protecting agent (husbandry agent).** Represents the actual owner where someone else has appointed the port agent. Handles husbandry: doctor and dentist, crew changes, stores and provisions, cash to Master, spares, technical repairs such as radar. Appointed when an owner wants their own eyes on a call being run by the charterer's nominee.

**Shipper's or receiver's agent.** Represents the seller or buyer. Carries out clearing and forwarding: bill of lading presentation, statutory documentation, customs cargo clearances.

**Other appointments.** A principal may appoint an agent for anything within a defined or general scope. These often arise from unscheduled events — an emergency port call, a breakdown, a pollution incident, or action by customs or immigration.

**Why a second agent gets appointed**

Where the charter party gives the charterer the right to nominate the agent, the owner may still want independent representation, and vice versa. The exact role and even the title of that second agent is settled case by case.

**The agency clause in the charter party**

The appointment is declared in the charter party, at either charterers' option or owners' option, and **in all cases owners or operators pay the agency fees.**

Owners generally push for owners' option, which gives them flexibility on rates and — bluntly — more room to manage how delays are recorded. Charterers should push for charterers' option so they have their own agent watching their interests.

The drafting matters. This wording works:

> "Load Port Agents — Charterers Option with Owners paying appointed agents customary fees."

Adding "as long as the same are competitive" should be avoided. It reopens the fee at the moment the appointment is needed and gives the paying party a lever against an agent who is supposed to be independent of them.

**Bills of lading and the release of cargo**

Agents at the load port release original bills of lading under the Principal's authority; at discharge they release cargo under the Principal's authority.

An original bill of lading functions like a cash cheque — whoever presents it is entitled to the cargo. Given the fraud that occurs, check it completely, including the clauses. A bill stamped **"received for shipment"** is not the same as **"shipped on board"** and does not automatically give the holder title to the cargo. Releasing against the wrong document is the single most expensive mistake available to an agent.`,
  },
  {
    title: "3. South Africa's Eight Commercial Ports",
    content: `Eight commercial ports, all operated and managed by Transnet National Ports Authority. A ninth, Port Nolloth, handles no commercial cargo and is leased in its entirety to De Beers.

Know what each port is **for**. An agent who quotes a manganese call at the wrong port, or promises a container service where none exists, has lost the business before the vessel sails.

**Richards Bay.** The coal port, and by tonnage the largest. Around 2,000 vessels a year. Dry bulk, break-bulk, liquid bulk and coal berths, with a substantial marine craft fleet including pilot helicopters. Long-range forecasts are dominated by export coal, with growth expected across dry bulk, break-bulk and liquid bulk including LNG.

**Durban.** The busiest by vessel numbers — around 3,800 calls a year — and the country's main container port. Over 40 operating berths across container, dry bulk, break-bulk, liquid bulk, automotive and passenger. Also the main repair centre, with a floating dock. Growth is forecast in liquid bulk and containers.

**East London.** Small, around 350 calls a year, focused on industrial and agricultural cargo and heavily tied to the local automotive industry. The only river port. Constrained for future expansion.

**Gqeberha (Port Elizabeth).** Containers, manganese ore, vehicles and general cargo, around 850 calls a year. Container terminal with three berths and modern gantry cranes and straddle carriers, plus break-bulk, bulk and tanker berths. Throughput is expected to decline as manganese moves to Ngqura. Note the name: the city was renamed Gqeberha in 2021, though "Port Elizabeth" persists in older documents and some commercial usage.

**Ngqura.** The newest port, built deep-water, positioned to take Gauteng overflow and transshipment. Container, dry bulk, break-bulk and liquid bulk terminals with drafts up to 18 m. The manganese ore export terminal relocating from Gqeberha is the major growth driver, alongside liquid bulk.

**Mossel Bay.** The smallest commercial port. Around 290 calls a year, mostly offshore support and liquid bulk handled through conventional buoy and single point moorings rather than quayside.

**Cape Town.** Containers, bulk and general cargo, around 2,100 calls a year. Container dominant, with substantial bulk liquid. Six general cargo berths across the multipurpose and Combi terminals handling up to 90 different commodities, from timber to frozen fish. Also the main fishing and cruise port.

**Saldanha Bay.** The deepest port in the country, with channels dredged beyond 23 m. Iron ore accounts for around 90% of exports, with liquid bulk and general break-bulk making up the rest. Multi-purpose, iron ore and crude oil berths. Development expected in LNG and rig repair.

**Port technology you will actually use**

**IPMS** — the Integrated Port Management System. Web-based, used across all eight ports to automate marine processes that were previously manual. The ID100 vessel nomination is processed here.

**Joint Operations Centres** in all eight ports, giving real-time central visibility of port operations.

**Order-to-Cash** — the online transacting platform. Clients maintain their own profiles, place sales orders, view credit limits, and download invoices and statements. Cargo dues orders go through here.

**Navis SPARCS N4** — the terminal operating system in the container facilities.

**MSRS** — the Marine Services Reservation System, which governs the order of berthing.

**A word on the figures.** Throughput and forecast numbers in older training material derive from Transnet's 2015 Long Term Planning Framework. They are indicative of each port's character, which is why they are described qualitatively above. Before quoting a number to a principal, take it from the current TNPA publication.`,
  },
  {
    title: "4. The Landlord Model, Licensing and Registration",
    content: `**The South African port model**

TNPA is the **landlord**. It manages, controls and administers the national ports system on behalf of the State, and is responsible for its safe, efficient and economic functioning. It provides marine services — pilotage, towage, berthing, VTS — and charges port dues, light dues and berth dues.

**Transnet Port Terminals (TPT)** is an operator, running cargo terminals. Other terminals are run by private operators under agreement with TNPA.

That split matters on every disbursement account you build: some charges are landlord-side and payable to TNPA, others are terminal-side and payable to TPT or a private operator. Confusing them produces an estimate that is wrong in both directions.

**Licensing under the National Ports Act 12 of 2005**

TNPA has established guidelines for agreements, licences and permits, grouped by the kind of activity:

**Group A — agreements under section 56.** Terminal operations including cargo handling and storage within terminal boundaries; ship repair facilities; new offshore cargo handling facilities; dedicated passenger terminals.

**Group B — licences under section 57.** Stevedoring; waste disposal; private floating crane operators.

**Group C — exemptions under section 57(7).** Waste disposal and firefighting by the local municipality; loading and offloading of fish from small vessels.

**Group D — port rules licences or registrations.** Fire protection and maintenance; bunkering; pollution control; diving including hull cleaning and propeller polishing; pest control; **and vessel agents.**

**Group E — permits.** Access permits for persons and vehicles; small vessel and pleasure vessel permits.

Note where the agent sits: Group D. **You must be registered with the port before you can do business with the port or the vessel.**

**Vessel agent registration**

Registration covers agents who arrange berthing; loading and discharging; services from terminal operators, stevedores, tallymen and other contractors; bunkering, repairs, husbandry, crew changes, passengers, stores and spare parts; technical, nautical and medical assistance; appointment of surveyors; documentation required by the Authority and by consulates; clearance of the vessel and all services relating to its movement through the port; payment for marine services including tugs, pilotage, light dues, berthing and VTS; and compliance with the MSRS.

**Duration.** Existing agents are registered for three years. New entrants get a probationary 12 months.

**The conditions, and what they actually mean**

**SAASOA membership.** Where an association exists in the port, the agent must be a member of the South African Association of Ship Operators and Agents. Exemption is possible on good cause if membership is refused or cancelled.

**The appointment letter.** The agent must give the Authority a letter indicating that it represents the vessel, **at least three days before arrival** — shorter notice only on good cause shown.

**No authority to bind TNPA.** The agent may not act, or purport to act, on the Authority's behalf. The Authority is not vicariously liable for the agent's acts or omissions.

**Contactability.** The agent must be readily contactable at berthing, at sailing, at ship's supply, and during loading or discharging. That is a 24-hour obligation in practice.

**Competent contractors only** — ship chandlers, vessel searchers, ship surveyors, baggage handlers, cargo surveyors, cargo tallies. **Licensed stevedores only.**

**Payment liability.** This one is heavy: **the agent is responsible for payment to the Authority of all port dues, fees, fines and any other monies due to the Authority by the vessel's owner.** If the owner does not pay, the Authority looks to you. Module 9 explains why funding in advance is not optional.

**Suspension and cancellation.** The Authority may suspend, withdraw or cancel the registration on good cause including breach of these conditions, following a fair procedure, and the agent has no claim arising from it — only a right to written reasons.`,
  },
  {
    title: "5. The Port Call: Nomination to Sailing",
    content: `This is the operational spine of the job. Every step has a deadline, and the deadlines are what the terminal plans against.

**Nomination — the ID100**

The nomination of bona fide vessels for which cargo has actually been fixed is the prerequisite for port planning. TPT has adopted TNPA's vessel nomination document, the **ID100**, as the official nomination instrument.

The agent submits a completed ID100 to **both** the TNPA berth planner and the CPO of the relevant terminal. It is processed in IPMS. Cargo dues orders go through Order-to-Cash.

A vessel is nominated for **one specific port and one specific time**.

**The notice cascade**

Nomination documents: **no less than 14 days before ETA.**

A window is provisionally allocated on the bar chart on receipt of the ID100, but is only **firmed and prioritised for seniority** using the updated ETA confirmation received from the agent **within five days of ETA**, accurate to within eight hours.

Once nominated, the agent must submit a written ETA update on the **10th, 7th, 5th, 3rd, 2nd and last day** before ETA.

Miss these and the vessel loses its place in the queue. This is the most common self-inflicted delay in agency work.

**Marine notification**

Vessels should radio the Harbour Master **48 hours before arrival** with ETA, draught, freeboard and reason for calling. The order of berthing follows the MSRS, and **cargo-working vessels take precedence over non-cargo-working vessels.**

**Berth allocation**

Berthing is scheduled by the CPO together with the TNPA berth planner, in accordance with the nomination process.

Cargo availability drives priority: if a planned vessel arrives without at least **80% of its cargo in the terminal stack**, with the balance available on road or rail inside the port, the next planned arrival takes the berth.

**Hatch and vessel preparedness.** Where a bulk vessel must present a hold cleanliness certificate before cargo work can begin, that requirement must be declared at Phase II for planning.

**The phases**

**Phase II — planning for cargo working.** Takes place with the CPO within the firm five-day notice period, and no less than **24 hours before cargo work commences.** Resources are agreed here, subject to terminal limitations. Phase II forms and the stowage plan go to the CPO, with landing and shipping orders as the Terminal Operating Guidelines require.

**Cargo availability.** 100% of liner and non-liner export cargo must be available before berthing, so as not to delay the vessel, impede other port users, or slow the rotation of vessels on the berth.

**Phase III — daily meetings.** Mandatory, to monitor cargo working progress, review performance against norms, trigger corrective action, and re-plan resources where they materially change. The agent attends these.

**Vacating the berth.** The vessel or its representative is responsible for ensuring the vessel vacates the berth on completion of cargo working, or when TPT requests it for any legitimate reason.

**The agent's scope on a cargo vessel**

Attend the daily meeting with the CPO and TNPA berth planner. Liaise with shipper, receiver and Master. Liaise with the port for the berth and enter it on IPMS. Complete pre-arrival **ISPS at 96 hours** and pratique. Prepare the cost estimate from the current TNPA and TPT tariff books. Keep everyone updated daily. Once berthed, attend daily, keep Principal and Master updated, monitor progress and push cargo operations. Receive the Notice of Readiness. Do inward clearance once berthed. Complete cargo documents including the Statement of Facts and any damage records. Do outward clearance and sail the vessel.

**On a non-cargo vessel**, the scope narrows: attend the daily meeting, act as owner's agent, estimate costs on the Principal's request, handle crew, stores and stowaways under owner and Master instructions, deal with hatches or cargo failed by a surveyor, and work with the cargo agents to assist the Master.`,
  },
  {
    title: "6. Ships, Role Players and What Vessels Need",
    content: `**Ship types you will handle**

**Container vessels** — up to 400 m and above 18,000 TEU, averaging around 20 knots. Need specialised terminals and gantry cranes.

**Bulk carriers** — dry loose cargo: grain, sugar, fertiliser, ore, coal. Single deck, large hatches.

**Break-bulk vessels** — general cargo that must be handled individually rather than in containers.

**Reefer vessels** — temperature-controlled or frozen cargo.

**Tankers** — liquids, with dedicated designs for LNG and chemicals.

**Ro-Ro** — wheeled cargo driven on and off over ramps, in contrast to lo-lo where cranes lift on and off.

**Multi-purpose vessels** — several cargo types in one hull.

**Barges** — cargo carried in a floating pontoon, loaded and discharged without the carrying vessel coming alongside.

**Who is who, and why the distinction is not academic**

**Owner.** The "original" owner. Ultimately responsible for the crew and for the vessel's mechanical and safety equipment. Usually not involved with the cargo beyond carrying it.

**Manager.** Technically manages the vessel for the owner.

**Disponent owner.** A time or period charterer who controls the **commercial** operation of the ship — deciding ports of call and cargoes fixed.

**Operator.** The company that has taken the vessel on time charter. On a time-chartered vessel the disponent owner is also the operator.

**Charterer.** The person or firm contracting with the owner, disponent owner or operator for carriage of cargo by sea for a stipulated time or voyage.

Get this wrong and you address correspondence to the party with no authority over the decision you need. Establish at appointment **who your Principal actually is**, and who else has an interest in the call.

**What a vessel needs to operate — and where the agent may be asked to help**

Safe manning and the SMC · management, maintenance and the PMS · ISM compliance · vessel chartering for cargo · hull insurance · P&I club cover · drydocking and underwater surveys · statutory compliance · audits · surveys and certification · SOLAS and MARPOL compliance · voyage planning and navigation · IMO codes · ISPS · port State control · crew articles.

The agent does not perform most of these. The agent knows they exist, knows which of them can stop a vessel sailing, and knows who to call.

**Port call items the agent handles directly**

**ISPS clearance** — 96 hours before arrival, to the MRCC.
**Inward and outward clearance** — the appointed agent's responsibility.
**Notice of Readiness** — tendered by vessel or agent.
**Notices** — per the charter party, to TNPA and TPT.
**Crew and husbandry** — crew changes, doctor, spares, cash to Master, provisions.
**Appointment of the agent** — flowing from the charter party.
**Repairs** — arranging repair facilities.
**Grain compliance** — grain loading approval from SAMSA.
**Salvage and port of refuge** — where a casualty arises.
**Stowage plan and loading/discharge sequence** — prepared and submitted to TPT.
**Vessel's gear and shore gear** — per charter party and port capability.
**Cargo gear survey** — and the chain register.
**Laytime and laycan** — charter party, SOF, mate's receipt.
**Mate's receipt and bill of lading.**
**Vessel preparation for the port.**`,
  },
  {
    title: "7. Chartering and Charter Parties",
    content: `The agent does not negotiate the charter party. But the charter party decides who pays for what, who appoints the agent, and when laytime runs — so an agent who cannot read one is working blind.

**Three types of chartering engagement**

**Bareboat or demise charter.** Long term. No administration or technical maintenance included. The charterer obtains possession and full control, including legal and financial responsibility for the vessel, and bears all operating expenses — fuel, crew, port expenses, P&I and hull insurance. Usually many years, sometimes ending in the charterer acquiring title, effectively hire purchase. Naming and branding of the vessel is permitted. The charterer becomes the disponent owner.

**Time charter.** Hire of the vessel for a period. The owner still manages the vessel — crew, machinery. The time charterer selects ports, directs the vessel and sets speeds, and is responsible for all port costs and fuel. The owner remains responsible for crew costs and running repairs. Damage during the charter is covered by the time charterer under on-hire/off-hire provisions. Daily hire is paid to the owner.

**Voyage charter.** Hire of vessel and crew for a voyage between load and discharge port, with positioning and repositioning for owner's account. The charterer pays per metric tonne or a lump sum. All port costs — tugs, pilots — plus fuel and crew are for the owner's account. Stevedoring and cargo handling follow the Incoterm. Done on terms, with despatch and demurrage applicable, or on CQD.

**Fixture terms**

**CQD — customary quick despatch.** Risk lies with the time charterer, operator or owner. Accept only where the port and terminal are thoroughly known, because all delays including weather are for that party's account. Poor performance in a port makes CQD unacceptable.

**Fixed terms.** Clearly defined time frames and tonnages. Declared load and discharge rate per day. Declared inclusions and exclusions: weather permitting, meal and tea breaks, shift changes, public holidays and weekends, turn time, despatch and demurrage rates. Risk is shared between charterers and operators through despatch and demurrage.

**Abbreviations you must read on sight**

SSHINC — Saturdays, Sundays, holidays included
SSHEX — Saturdays, Sundays, holidays excluded
SSHEXUU — Saturdays, Sundays, holidays excluded unless used
WWD — weather working day
FIOST — free in and out, stowed and trimmed
BENDS — both ends
APS — arrived pilot station
DOP — dropping outward pilot
MOLOO / MOLCHOP — more or less in owner's option / charterer's option

**Cargo tolerances and load rates.** Declared so both parties know what is expected — for example 50,000 mt MOLOO, or a min/max range — with a declared load rate so despatch and demurrage can be calculated.

**Laycan.** Laydays commencement and cancelling. The earliest date laytime can commence and the latest date after which the charterer may cancel the charter party. It protects both sides: ship and cargo both need to be available. Accepting a vessel before laydays, or waiving cancellation, is in the charterer's option but needs mutual consent, and may require changes to other agreed terms.

**Despatch and demurrage.** A bonus and penalty system. Demurrage is normally linked to the vessel's daily hire rate. Despatch is usually half the demurrage rate, sometimes equal to it.

**The rule that catches people: once on demurrage, always on demurrage.** When a vessel goes onto demurrage, no deductions are made for excepted periods such as Sundays, even where the charter party excludes them for laytime.

**Standard forms.** Charter party forms are published by BIMCO and others. Use the form the parties have agreed and read the amendments — the rider clauses matter more than the printed form.

**The fixture process, and where the agent picks it up**

*Pre-fixture:* information is gathered from the charterer, the charterer's reputation and recent shipments are checked, load and discharge rates are examined, commission is negotiated, and the market is scouted for tonnage.

*Fixture:* owners are approached, a rate offer goes to the charterer, vessel questionnaires are exchanged, the charter party is circulated and amended, ship details and certificates are provided, the fixture recap is confirmed, subjects are lifted and the charter party signed.

*Post-fixture loading:* the agent is nominated. From there it is the agent's work — nominating the vessel with the port, monitoring stevedores, shipper and cargo movement daily, confirming bill of lading drafts in time, reporting loading speed, berth and weather daily, keeping owner and charterer informed of the loading stage, checking NOR and SOF on completion to establish whether demurrage arose, and checking the freight invoice.

*Post-fixture discharge:* confirming freight and commission payment, ensuring the discharge port agent has the nomination and ETA, monitoring the queue and berthing prospects daily, reporting the discharge process, holidays and weather, and checking NOR and SOF for the final demurrage calculation.`,
  },
  {
    title: "8. Laytime, NOR and the Statement of Facts",
    content: `Laytime calculation is the application of contractually agreed terms, conditions and exceptions to the cargo operation. Its purpose is to determine the payment obligations between the parties for how long the vessel stayed in port.

This is where the agent's paperwork turns into money, in both directions.

**The two outcomes**

**Despatch** — paid by the owner or charterer to the shipper, because the vessel spent **less** time in port than contractually agreed.

**Demurrage** — paid by the shipper to the owner or charterer, because the vessel spent **more** time in port than agreed.

**What you need to run the calculation**

*Agreed port stay and load time:*
- The agreed clauses in the charter party
- Terms — SHINC or SHEX
- NOR acceptance rules
- Load rates
- Turn time
- Port customary waiting hours
- Weather clauses
- Despatch and demurrage rates

*A signed Notice of Readiness*, which determines the accepted NOR time under the charter party or sales contract. Where the vessel is compelled to wait for a berth or at inner anchorage, **NOR must be tendered at the port limits.** Get this wrong and the clock starts hours or days later than it should.

*A signed Statement of Facts.*

**The Statement of Facts**

The SOF is compiled by the charterers' agent and **must be signed by both the Master and the agent**. It is a legal document.

It is a detailed, minute-by-minute record of all times from NOR to sailing. It determines the actual total time in port, and it separates **terminal delays** from **vessel delays** — which is the distinction the whole demurrage claim turns on.

**Why the SOF is the most important document you will produce**

Months later, when a demurrage claim runs to hundreds of thousands of rand, the SOF is the evidence. If it is vague, if a delay is recorded without its cause, if a stoppage has a start time and no end time, the party disadvantaged by the ambiguity will argue it and may well win.

Record what happened, when, and why. "1420 — cargo operations suspended" is incomplete. "1420 — cargo operations suspended, rain, shore crane stopped by terminal" attributes the delay, and attribution is what the calculation needs.

If the Master disputes an entry, record the dispute rather than arguing it into a single version. A signed SOF with a noted disagreement is worth more than an unsigned one.

**The agent's position**

You are producing a document that will be used against one of the parties in the room. Do it accurately, sign it honestly, and do not allow either side to edit it after the fact. An agent who adjusts a SOF to suit whoever is paying that month has destroyed the only thing that makes them worth appointing.`,
  },
  {
    title: "9. Disbursement Accounts and Quotations",
    content: `The disbursement account is how the agent is judged. An estimate that is materially wrong — in either direction — damages the relationship even when every service was delivered properly.

**The two sides of the account**

**Landlord side — payable to TNPA.** Port dues, based on gross tonnage and duration. Light dues. SAMSA levy. VTS charges. Berth dues. Pilotage, in and out. Towage, in and out. Berthing services (mooring gangs). Refuse removal.

**Terminal side — payable to TPT or the private operator.** Cargo handling, stevedoring, tally, landing and shipping charges, terminal handling, storage.

**Agency and third-party items.** Owners' or port agency fee. Cargo agency fee. Recoveries. Security and guards. ISPS fee and stowaway search. Hold survey. Crew sign-on and sign-off. Sea rescue and seafarer levies. Sundries — transport, couriers, cash to Master.

**Cargo dues** are charged per tonne and are normally for the account of the shipper or receiver rather than the vessel.

**How the structure works**

Port dues, light dues and VTS are calculated on **gross tonnage**, usually as a basic charge plus an amount per 100 GT, multiplied by the period in port. Pilotage and towage are charged per movement — in and out counted separately — and scale with vessel size. Berthing services are usually charged per operation.

Agency fees are commonly structured as a basic first-day rate plus a lower per-day rate thereafter, with recoveries charged separately on a similar basis.

**Learn the shape, take the numbers from the tariff book.** TNPA and TPT publish tariffs annually, and they change. Any estimate built from a rate you remember, or from a previous year's spreadsheet, will be wrong. Work from the current published tariff, every time.

**Who pays the cargo costs**

This is decided by the charter party terms — FIOST, FIOS, liner terms and so on — which determine whether the vessel or the cargo interest pays for stevedoring and tally. Read the charter party before you build the estimate.

Receivers and shippers handle their own clearing costs, which take in cargo dues, shipping and landing port costs, and customs.

Some ports operate **leasehold** arrangements, where the shipper or receiver pays the terminal the landing or shipping charge and uses their own shore labour and facilities instead of the port's. Know which arrangement applies at the terminal you are quoting.

**Building a comprehensive quotation**

Take the Principal's requirements, break them into line items, and price each one from the current tariff. Show the port stay assumed, the GT and DWT used, the cargo tonnage, and the exchange rate applied if quoting in USD.

**State your assumptions.** A quotation that assumes a one-day stay and a 12,000 GT vessel is only valid for those inputs. When the vessel stays four days, the Principal should be able to see immediately why the final DA differs from the estimate, rather than concluding you underquoted to win the appointment.

**The funding discipline behind all of this**

Recall from Module 4 that the agent is liable to the Authority for all port dues, fees and fines owed by the vessel's owner. Recall from Module 11 that the agent is not required or expected to commit its own funds to finance the Principal's obligations.

Those two facts together give you one rule: **get funded in advance.** The estimate exists so the Principal can remit funds before the call, not so you can discover afterwards what you are owed.

If funding does not arrive, the agency agreement gives you remedies — informing suppliers and authorities that you have not been put in funds, taking measures to detain the vessel until funds are received, retaining documents, and terminating with immediate effect. Those are serious steps, and the fact that they exist in the standard form tells you how often this problem arises.`,
  },
  {
    title: "10. Services: In-House, Outsourced and Licensed",
    content: `An agent coordinates a long list of services, most supplied by third parties, many requiring their own licence. Knowing which is which decides what you can do yourself, what you must subcontract, and where a business could be developed.

**Services around a typical call**

Stevedoring · tally · warehousing · loading and discharging · hold cleaning · terminal operations · draft and hold survey · cargo and damage survey · LSA and FFA servicing · ship chandling · cash to Master and security services · pest control · slop and garbage collection and disposal · berthing services · bunkering · ship repair · technicians · container cleaning · hull cleaning and diving · car surveys · container surveys · vessel audits · off-port-limits services · ship-to-ship transfer · vessel broking.

**Which of these are licensed**

Several require a licence before they may be provided in a South African port, under the framework in Module 4. **Stevedoring** requires a TNPA licence — and the agent may only contract licensed stevedores. **Bunkering, pollution control, diving including hull cleaning and propeller polishing, pest control, waste disposal** all sit under the port licensing regime. **LSA and FFA servicing stations** require SAMSA approval. **Ship-to-ship transfer** requires SAMSA approval.

Because these are licensed, they are normally outsourced by an agency. That is a regulatory reality, not a commercial preference.

**What an agency can do in-house**

Agency work itself — nomination, clearance, documentation, disbursement accounts, coordination, husbandry arrangement, SOF preparation, laytime calculation — is fully performable in-house once staff are trained. That is the core business and the margin.

**Where the opportunity sits**

Outsourced licensed services can be developed internally later, once the licence is obtained and the capability built. Treat the outsourced list as a map of adjacent businesses rather than a permanent boundary.

**The agent's obligation when selecting suppliers**

The registration conditions require that **only competent vessel contractors** be used — ship chandlers, vessel searchers, ship surveyors, baggage handlers, cargo surveyors, cargo tallies — and **only licensed stevedores.**

This is not a formality. If you appoint an unlicensed stevedore and something goes wrong, you have breached a condition of your own registration, and the Authority may suspend or cancel it.

**Advising the Principal**

The value an agent adds here is knowing who is good. A Principal choosing between two surveyors or two chandlers has no basis to decide; you do. Offer the recommendation, disclose any interest you hold in the supplier, and let the Principal choose. An agent who steers work to a related party without saying so has a conflict that will eventually surface.`,
  },
  {
    title: "11. The Agency Agreement",
    content: `The relationship between agent and Principal should be in writing. The industry standard is the **FONASBA/BIMCO General Agency Agreement**, and its structure is worth knowing even when the parties use something else.

**How the form is built**

**Part I** is the box layout — the commercial particulars. **Part II** is the standard terms. **Annexes A, B and C** cover remuneration, funding and an expanded description of activities. Where they conflict, **Part I prevails** over Part II and the Annexes, to the extent of the conflict and no further.

**The boxes that decide everything**

Date · agent's full style and address, and whether they hold FONASBA Quality Standard certification · principal's full style and address · commencement date and period · notice of termination · **territory** — the ports, places or geographic area · **trade** · **activities** · remuneration · funding · liability cap · bank details for both parties · contact details for both · dispute resolution · additional clauses.

**Territory, trade and activities are the three that define the appointment.** An agent unclear on any of them will eventually do work they are not paid for, or fail to do work the Principal assumed was covered.

**The five categories of activity**

**Marketing and sales** — maintaining contact with shippers, consignees, forwarders and charterers; keeping the Principal informed of opportunities; providing statistics; public relations and trade association participation; agreeing a budget.

**Port agency** — arranging berthing, loading and discharging in accordance with local custom; coordinating stevedores and terminal operators, reporting to authorities, arranging and checking documentation; inward and outward clearance; keeping the Principal informed of port and working conditions likely to affect despatch; reporting the vessel's position and preparing the statement of facts or port log; placing orders for goods and services.

**Husbandry agency** — attending the Master and crew matters, consular requirements, medical and dental treatment, crew changes; ordering and receiving goods, services, supplies and spares; arranging bunkers; arranging and coordinating repairs; day-to-day running of the vessel.

**General agency** — coordinating all activities of port and sub-agents to ensure proper performance across the Territory; attending to claims handling, with all claims expenses for the Principal's account.

**Documentation** — issuing bills of lading, manifests, delivery orders, certificates and other documents on the Principal's behalf.

**Exclusivity, both ways**

The agent will not represent competing shipping companies, or engage in NVOCC or freight forwarding activities in the Territory in direct competition with the specified trade, without prior written consent — not to be unreasonably withheld.

The Principal undertakes not to appoint anyone else in the Territory for the specified activities, **unless required to by a charter party or other contract of carriage** — which is exactly the situation Module 2 describes. Where that happens, all other activities remain with the agent.

**Sub-agents**

The agent may appoint sub-agents with the Principal's prior written approval. The form offers two alternative liability positions, and the parties strike out the one that does not apply. **If no choice is made, the stricter one applies** — the agent is responsible for loss or damage arising from the sub-agent's negligent, reckless or wilful acts. The alternative limits the agent's responsibility to failure to exercise due care in appointing and supervising.

Either way, the agent is **not** responsible for failing to exercise due care in appointing a sub-agent **nominated by the Principal**, and **is** responsible for the acts of its own subsidiaries.

**Money**

The agent collects monies due to the Principal — freight, storage, demurrage, terminal handling. Checks all invoices and vouchers and prepares a proper disbursement account per voyage or period. Presses authorities and operators for timely invoices. Keeps records available for inspection, at the Principal's cost. Advises the Principal of tariff amendments as they become known. Calculates freight and charges with reasonable skill and care. **Passes on all available discounts.** Remits monies at agreed intervals, with bank charges for the Principal's account, and may retain money from freight collected to cover past and current disbursements and remuneration, subject to providing regular cash position statements.

Two provisions deserve emphasis:

**The agent shall not be required or expected to use or commit its own funds to finance the Principal's interests or obligations.**

**The agent shall ensure that the Principal's funds are accounted separately from its own.** Client money is not working capital.

**Insurance**

The agent maintains cover for negligent acts or defaults in performing its obligations, and public liability insurance. The Principal maintains P&I or charterers' cover as appropriate — and **if the Principal does not have it, the agent may terminate with immediate effect.** Either party may require evidence of the other's cover.`,
  },
  {
    title: "12. Authority, Liability and \"As Agents Only\"",
    content: `The agent's legal position is narrow and precise, and misunderstanding it is how agents end up personally liable for other people's contracts.

**Delegated authority**

At appointment, the Principal issues instructions detailing the services required **and the limits of delegated authority.** Within those limits the agent may enter into agreements or contracts, disburse funds, and make arrangements that bind the Principal or incur costs on their behalf.

Outside those limits, the agent is acting on its own account. That is the whole risk in one sentence.

**"As agents only"**

Provided the agent has not exceeded its delegated authority, the Principal assumes the obligations and indemnifies the agent for any costs resulting from contracts or arrangements the agent entered into on the Principal's behalf.

But the agent is entitled to that protection **only if it describes itself, in all correspondence — written, verbal and otherwise — "as agents only."**

That phrase is not decoration. It is the mechanism by which a third party is put on notice that the contract is with the Principal, not with you. An agent who signs a stevedoring contract without it may find the stevedore looking to the agent for payment, and the indemnity may not save them.

Put it in your email signature, on your letterhead, on every order you place, and say it on the phone.

**Where the agent is personally exposed anyway**

**Port dues and Authority charges.** The vessel agent registration conditions make the agent responsible for payment to the Authority of all port dues, fees, fines and other monies owed by the vessel's owner. "As agents only" does not displace a condition you accepted to obtain your registration.

**Negligence.** The agent is liable for its own negligent acts and defaults — a missed notice, a wrong declaration, a document released against the wrong bill of lading.

**Exceeding authority.** As above.

**Sub-agents.** Depending on which alternative was agreed, and unavoidably for your own subsidiaries.

**The liability cap**

The GAA provides for a liability cap in Part I. It applies **only if an amount is stated**; leave the box blank and the default provision applies instead. Check which position you are in before you need to rely on it.

**Termination and what survives it**

On termination, whether or not due to the agent's default, all disbursements and remuneration outstanding — or arising in connection with activities being provided at the time of termination — are settled by the Principal.

Termination is without prejudice to all rights accrued before the termination date. Neither party escapes what was already owed.

**Non-payment remedies**

Where the Principal fails to meet its financial obligations, the agent may inform suppliers, service providers or authorities that it has not been put in funds; take necessary measures to **detain the vessel in port** until funds are received; retain documents in its possession; and terminate immediately by written notice.

Detaining a vessel is a serious step with commercial consequences, and it should not be taken without advice. But knowing the remedy exists shapes how you handle the conversation at day three of an unfunded call.

**The professional standard**

Acting as local representative, the agent provides local knowledge and expertise and ensures the Principal's requirements are performed with the utmost efficiency and despatch. That requires being fully conversant with the regulations and requirements of the port, area or sector; holding a wide range of relevant contacts; and being sufficiently well established to deliver the level of service the Principal needs.

That is the standard you would be measured against if it were ever tested.`,
  },
  {
    title: "13. Competing, Professional Bodies and Keeping Current",
    content: `**The South African agency market is crowded.** Dozens of registered vessel agents operate across the eight ports, ranging from single-port operators to subsidiaries of global logistics groups and shipping lines.

That shapes the economics. Agency fees are negotiated and are subject to competition, so an agent competing on price alone is competing on the one dimension where a global group has the advantage.

**Where an independent agent actually competes**

**Responsiveness.** The registration conditions require the agent to be readily contactable at berthing, sailing, ship's supply, and during cargo work. Meeting that properly, rather than nominally, is noticed.

**Accuracy of the estimate.** A Principal who can rely on your DA estimate will use you again. One who is surprised by the final account will not.

**Quality of the SOF and the laytime position.** An agent whose Statements of Fact survive a demurrage dispute is worth more than one whose do not.

**Local knowledge.** Knowing which terminal will refuse a vessel on hold cleanliness, which berth silts, how long the manganese queue actually runs — this is not in any tariff book.

**Honesty about delays.** An agent who reports a problem at 0600 is more valuable than one who reports it at 1800 with a solution attached.

**The agency fee**

The fee is based on the volume of work undertaken, agreed by negotiation, and often subject to competition from other agents. Its form varies: a **flat fee** is common in port agency, while a **component-based fee** is more usual for cargo agency.

Whatever the structure, remember from the charter party that **owners or operators pay the agency fee**, even where the charterer appoints.

**FONASBA**

The Federation of National Associations of Ship Brokers and Agents, established 1969, is the global body for ship brokers and ship agents, with members in more than 50 maritime nations. Its remit is to promote and protect the professions worldwide.

It holds consultative status with the IMO, UNCTAD, the World Customs Organisation and the European Commission. The Baltic Exchange, BIMCO, INTERTANKO and the Shipbrokers' Register are members, and it maintains close relations with Intercargo and with European bodies representing shipowners, port authorities and terminal operators.

FONASBA makes **no distinction** between firms providing agency services as their main business and those providing it alongside shipowning, operating or cargo handling. If you perform the functions of an agent, you are one.

The **FONASBA Quality Standard** certification appears as a box on the General Agency Agreement, which indicates how the market treats it — as a signal worth asking about.

**SAASOA** — the South African Association of Ship Operators and Agents. Membership is a condition of vessel agent registration in ports where the association exists.

**Keeping current, which is the actual job**

Everything in this course has a version. Tariffs are republished annually. The Terminal Operating Guidelines are revised. Port rules change. IMO instruments amend on a cycle. Charter party forms are updated. Port infrastructure and terminal arrangements change — the manganese relocation to Ngqura being the obvious current example.

FONASBA's observation that the port agent must have a broad range of knowledge **and keep it up to date** is the part people underestimate. An agent working from a three-year-old tariff spreadsheet and a remembered version of the ToG will eventually produce an estimate that is wrong, miss a notice deadline that has moved, or contract a supplier whose licence has lapsed.

Build the habit: check the tariff before every estimate, check the notice requirements before every nomination, and read the charter party for every call rather than assuming it matches the last one.`,
  },
  {
    title: "14. Exhibit: Ship Repair Facilities by Port",
    content: `Arranging repairs is a standing agency function — Module 6 lists it among the port call items the agent handles directly, and a Principal asking "can this be done in Cape Town or must we go to Durban?" expects an answer.

All eight commercial ports offer some ship or boat repair and maintenance capability. **Saldanha Bay, Cape Town, Durban and Ngqura currently present the best options for the offshore sector.** Development plans at Saldanha Bay and Richards Bay are intended to make those ports destinations of choice for rigs, jack-ups and related vessels.

**The three categories of repair**

**Floating or wet repairs** — carried out in the bay, vessel afloat.
**Quayside repairs** — at some multi-purpose terminals and dedicated repair quays.
**Dry repairs** — drydocks, floating docks, syncrolifts and slipways.

Capacity constraints across the system are being addressed through new infrastructure, largely under Operation Phakisa.

**Port by port**

| Port | Repair capability |
| --- | --- |
| **Saldanha Bay** | One of the largest and deepest natural harbours in southern Africa, dredged to 23 m below chart datum. An artificial breakwater improves conditions within the bay. Development is centred on oil and gas, and the natural draft suits the sector. |
| **Cape Town** | Full-service general cargo port operating 24 hours, seven days. Well equipped for ship repair and suited to the offshore oil industries on both the west and east coasts of Africa. A 200-tonne SWL floating crane, two graving docks, a syncrolift, and dedicated onshore and quayside areas. |
| **Mossel Bay** | Midway between Cape Town and Gqeberha. Home to PetroSA and other oil industry projects. The only South African port operating two offshore mooring points within port limits. Marine engineering firms available for all classes of onboard repair. A 250-tonne slipway. |
| **Gqeberha (Port Elizabeth)** | Geographically well positioned as a multi-cargo port handling dry bulk, bulk liquid, general cargo and containers. **Not well developed for dedicated ship repair.** |
| **Ngqura** | South Africa's newest port. Handles container, dry and liquid bulk vessels, and can accommodate rig repairs and surveys. Identified as a potential service provider to the offshore oil and gas sector, and has already taken rigs for servicing. Bordered by the Coega Industrial Development Zone, the country's largest IDZ. |
| **East London** | The only commercial river port on the coastline. Positioned as a gateway between Africa and global markets. Private contractors undertake repair and maintenance in the East London Graving Dock and at the repair quay adjacent to the drydock. |
| **Durban** | South Africa's premier multi-cargo port and among the busiest in Africa. Several ship repair yards and facilities. Regularly attracts repair, maintenance and survey work from the offshore sector. |
| **Richards Bay** | Established in 1976 primarily for coal export, and now one of the world's leading bulk ports. Repairs are generally accommodated within the Small Craft Harbour at the Repair Berth. Plans under Operation Phakisa aim to add repair infrastructure and capitalise on the adjacent IDZ. |

**How to use this as an agent**

Match the requirement to the capability before you quote. A vessel needing drydocking has four realistic options — Cape Town's graving docks, the East London graving dock, Durban's yards, or Saldanha for the larger offshore units. A vessel needing a syncrolift has two. A rig needing servicing points at Ngqura or Saldanha.

**Gqeberha is the one to watch for.** It is well connected and handles four cargo types, so a Principal may assume repair capability follows. It does not, and telling them before they divert is considerably better than telling them after.

Where the work falls outside the port's capability, the answer is a repair port recommendation with a positioning voyage costed, not an attempt to arrange something locally that the facility cannot actually do.

**Currency note.** Facility capability changes as infrastructure projects complete, and Operation Phakisa targets have moved since the programme launched. Confirm current capability with the port and the repair contractor before committing a Principal to a repair port.`,
  },
];

export const aukSpm001Quiz = [
  {
    q: "How does the IMO FAL Convention define a ship agent?",
    options: [
      "The party that owns or charters the vessel",
      "The party representing the ship's owner and/or charterer — the Principal — in port",
      "The terminal operator responsible for cargo handling",
      "The statutory authority that clears the vessel",
    ],
    answer: 1,
  },
  {
    q: "Approximately how many separate operations did FONASBA identify that a port agent may be required to undertake?",
    options: ["Around 20", "Around 50", "More than 130", "More than 500"],
    answer: 2,
  },
  {
    q: "Which agency appointment nominates the vessel with the port authority, arranges berthing and sailing formalities, and handles vessel disbursements?",
    options: ["Cargo agent", "Port agent", "Owners' protecting agent", "Shipper's agent"],
    answer: 1,
  },
  {
    q: "Under the charter party, who pays the agency fee?",
    options: [
      "The charterer, in all cases",
      "Owners or operators, in all cases",
      "Whichever party nominated the agent",
      "It is split equally between owner and charterer",
    ],
    answer: 1,
  },
  {
    q: "Why should the charter party wording \"...as long as the same are competitive\" be avoided in an agency clause?",
    options: [
      "It is not recognised by BIMCO",
      "It reopens the fee at the moment the appointment is needed and gives the paying party leverage over a supposedly independent agent",
      "It prevents the agent from appointing sub-agents",
      "It transfers the fee liability to the charterer",
    ],
    answer: 1,
  },
  {
    q: "A bill of lading is presented stamped \"received for shipment\". What is its significance?",
    options: [
      "It is equivalent to \"shipped on board\" and the holder may take the cargo",
      "It does not automatically grant the holder title to the cargo",
      "It is invalid and must be returned to the shipper",
      "It applies only to containerised cargo",
    ],
    answer: 1,
  },
  {
    q: "How many commercial ports does South Africa have, and who manages them?",
    options: [
      "Six, managed by Transnet Port Terminals",
      "Eight, managed by Transnet National Ports Authority",
      "Nine, managed by SAMSA",
      "Eight, managed by private concessionaires",
    ],
    answer: 1,
  },
  {
    q: "Which port is the deepest, with channels dredged beyond 23 m, and handles predominantly iron ore?",
    options: ["Richards Bay", "Ngqura", "Saldanha Bay", "Durban"],
    answer: 2,
  },
  {
    q: "In the South African port model, what is TNPA's role?",
    options: [
      "Terminal operator responsible for cargo handling",
      "Landlord — managing and administering the ports system on behalf of the State, and providing marine services",
      "Regulator of stevedoring licences only",
      "Customs and border authority",
    ],
    answer: 1,
  },
  {
    q: "Under the National Ports Act licensing framework, in which group do vessel agents fall?",
    options: [
      "Group A — section 56 agreements",
      "Group B — section 57 licences",
      "Group D — port rules licences or registrations",
      "Group E — access permits",
    ],
    answer: 2,
  },
  {
    q: "For how long is a new entrant vessel agent registered?",
    options: ["Three years", "Five years", "A probationary period of 12 months", "Indefinitely, subject to annual fees"],
    answer: 2,
  },
  {
    q: "The vessel's owner fails to pay port dues. Under the vessel agent registration conditions, what is the agent's position?",
    options: [
      "The agent has no liability, having acted as agents only",
      "The agent is responsible for payment to the Authority of all port dues, fees, fines and other monies due by the owner",
      "Liability is shared equally between agent and owner",
      "The Authority must pursue the owner directly and cannot look to the agent",
    ],
    answer: 1,
  },
  {
    q: "How far in advance must the agency appointment letter reach the Authority?",
    options: ["24 hours before arrival", "At least three days before arrival", "14 days before arrival", "On the vessel's arrival"],
    answer: 1,
  },
  {
    q: "Which document is the official vessel nomination instrument, and where does it go?",
    options: [
      "The ID100, to both the TNPA berth planner and the terminal CPO",
      "The Notice of Readiness, to the Harbour Master",
      "The Statement of Facts, to TPT",
      "The stowage plan, to the CPO only",
    ],
    answer: 0,
  },
  {
    q: "How far before ETA must the nomination documents be submitted?",
    options: ["48 hours", "Five days", "No less than 14 days", "30 days"],
    answer: 2,
  },
  {
    q: "When is a bar chart window firmed and prioritised for seniority?",
    options: [
      "On receipt of the ID100",
      "Using the updated ETA confirmation received within five days of ETA, accurate to within eight hours",
      "On the vessel's arrival at the pilot station",
      "24 hours before cargo working commences",
    ],
    answer: 1,
  },
  {
    q: "A planned vessel arrives but has only 60% of its cargo in the terminal stack. What is the consequence?",
    options: [
      "The vessel berths as planned and loads what is available",
      "The next arriving planned vessel takes the berth",
      "The terminal charges a penalty but berths the vessel",
      "The vessel must re-nominate 14 days out",
    ],
    answer: 1,
  },
  {
    q: "When must Phase II cargo working planning take place?",
    options: [
      "Within the firm five-day notice period, and no less than 24 hours before cargo working commences",
      "On arrival at the berth",
      "14 days before ETA",
      "After the first shift of cargo operations",
    ],
    answer: 0,
  },
  {
    q: "How far in advance must ISPS pre-arrival clearance be submitted?",
    options: ["24 hours", "48 hours", "72 hours", "96 hours"],
    answer: 3,
  },
  {
    q: "Under a bareboat or demise charter, who bears the operating expenses including fuel, crew, port expenses, P&I and hull insurance?",
    options: ["The owner", "The charterer, who becomes the disponent owner", "Shared equally", "The port agent"],
    answer: 1,
  },
  {
    q: "Under a time charter, who is responsible for crew costs and running repairs?",
    options: ["The time charterer", "The owner", "The disponent owner", "The operator, who is always a third party"],
    answer: 1,
  },
  {
    q: "What does \"laycan\" specify?",
    options: [
      "The daily load rate and cargo tolerance",
      "The earliest date laytime may commence and the latest date after which the charterer may cancel the charter party",
      "The period during which demurrage accrues",
      "The notice period for vacating the berth",
    ],
    answer: 1,
  },
  {
    q: "A vessel goes onto demurrage. Sunday is an excepted period under the charter party. What happens?",
    options: [
      "Sunday is deducted as normal",
      "No deductions are made — once on demurrage, always on demurrage",
      "Half the Sunday is deducted",
      "The parties must renegotiate the rate",
    ],
    answer: 1,
  },
  {
    q: "What does SSHEXUU mean?",
    options: [
      "Saturdays, Sundays, holidays included",
      "Saturdays, Sundays, holidays excluded unless used",
      "Shifting hours excluded, unless used",
      "Sundays and holidays excluded, undetermined usage",
    ],
    answer: 1,
  },
  {
    q: "Which payment is made by the shipper to the owner or charterer because the vessel was in port longer than agreed?",
    options: ["Despatch", "Demurrage", "Detention", "Deadfreight"],
    answer: 1,
  },
  {
    q: "Where a vessel must wait for a berth or at inner anchorage, where must the Notice of Readiness be tendered?",
    options: ["Alongside the berth", "At the port limits", "At the pilot station only", "On completion of inward clearance"],
    answer: 1,
  },
  {
    q: "Who compiles the Statement of Facts, and who must sign it?",
    options: [
      "The terminal operator; signed by the CPO",
      "The charterers' agent; signed by the Master and the agent",
      "The Master alone",
      "TNPA; signed by the Harbour Master",
    ],
    answer: 1,
  },
  {
    q: "Which SOF entry is adequate for a later demurrage claim?",
    options: [
      "\"1420 — cargo operations suspended\"",
      "\"1420 — cargo operations suspended, rain, shore crane stopped by terminal\"",
      "\"Afternoon — some delays experienced\"",
      "\"1420 — stoppage, cause to be confirmed\"",
    ],
    answer: 1,
  },
  {
    q: "On a disbursement account, which of these is a landlord-side charge payable to TNPA?",
    options: ["Stevedoring", "Terminal handling", "Pilotage and towage", "Cargo tally"],
    answer: 2,
  },
  {
    q: "Under the FONASBA/BIMCO General Agency Agreement, what is the position on the agent's own funds?",
    options: [
      "The agent must advance funds and recover them from the Principal afterwards",
      "The agent shall not be required or expected to use or commit its own funds to finance the Principal's interests or obligations",
      "The agent may use its own funds up to the liability cap",
      "The agreement is silent on the point",
    ],
    answer: 1,
  },
  {
    q: "Under the GAA, sub-agent liability offers two alternatives. If no choice is struck out, which applies?",
    options: [
      "Neither — the clause fails",
      "The stricter alternative: the agent is responsible for loss or damage from the sub-agent's negligent, reckless or wilful acts",
      "The limited alternative: responsibility only for failure to exercise due care in appointment and supervision",
      "Liability passes entirely to the Principal",
    ],
    answer: 1,
  },
  {
    q: "What must an agent do to benefit from the Principal's indemnity for contracts entered into on the Principal's behalf?",
    options: [
      "Hold FONASBA Quality Standard certification",
      "Describe itself in all correspondence — written, verbal and otherwise — \"as agents only\"",
      "Register the contract with TNPA",
      "Obtain the Principal's signature on each contract",
    ],
    answer: 1,
  },
  {
    q: "Under the GAA, the liability cap in Part I applies in what circumstances?",
    options: [
      "Always, at a default industry figure",
      "Only if an amount is stated; if the box is left blank, the default provision applies instead",
      "Only where the Principal is a charterer rather than an owner",
      "Only after the first year of the agreement",
    ],
    answer: 1,
  },
  {
    q: "The Principal has no P&I or charterers' cover in place. What does the GAA allow the agent to do?",
    options: [
      "Nothing — insurance is the Principal's own risk",
      "Terminate the agreement with immediate effect by written notice",
      "Purchase cover and charge it to the Principal",
      "Reduce its own public liability cover proportionally",
    ],
    answer: 1,
  },
  {
    q: "The Principal fails to meet its financial obligations. Which remedy does the GAA give the agent?",
    options: [
      "Sell the cargo to recover the debt",
      "Take necessary measures to detain the vessel in port until funds are received",
      "Transfer the debt to the terminal operator",
      "Claim against the vessel's P&I club directly",
    ],
    answer: 1,
  },
  {
    q: "Under the GAA, how must the Principal's funds be handled?",
    options: [
      "Held in the agent's general operating account",
      "Accounted separately from the agent's own funds",
      "Remitted daily regardless of outstanding disbursements",
      "Held by the Authority in escrow",
    ],
    answer: 1,
  },
  {
    q: "Which fee structure is common in port agency, as opposed to cargo agency?",
    options: [
      "A commission on freight",
      "A flat fee, whereas cargo agency more commonly uses a component-based fee",
      "A percentage of demurrage recovered",
      "A per-tonne rate in all cases",
    ],
    answer: 1,
  },
  {
    q: "Membership of which association is a condition of vessel agent registration where the association exists in the port?",
    options: ["FONASBA", "SAASOA", "BIMCO", "Intercargo"],
    answer: 1,
  },
  {
    q: "What distinction does FONASBA draw between firms whose main business is agency and those providing it alongside other marine services?",
    options: [
      "Only main-business agents may hold FONASBA membership",
      "No distinction — if you perform the functions of an agent, you are one",
      "Part-time agents are limited to husbandry work",
      "Only main-business agents may issue bills of lading",
    ],
    answer: 1,
  },
  {
    q: "Which contractors may an agent engage for stevedoring?",
    options: [
      "Any competent contractor of the agent's choosing",
      "Only stevedores holding a valid licence issued by the Authority",
      "Only stevedores nominated by the terminal operator",
      "Only stevedores who are SAASOA members",
    ],
    answer: 1,
  },
  {
    q: "A Principal asks whether a vessel can be drydocked at Gqeberha (Port Elizabeth). What is the position?",
    options: [
      "Yes — it is a multi-cargo port with full repair facilities",
      "No — the port is well positioned for cargo but is not well developed for dedicated ship repair",
      "Only for vessels under 10,000 GT",
      "Only floating dock repairs are available",
    ],
    answer: 1,
  },
  {
    q: "Which port offers two graving docks, a syncrolift and a 200-tonne SWL floating crane, operating 24 hours a day?",
    options: ["Durban", "Cape Town", "Saldanha Bay", "East London"],
    answer: 1,
  },
  {
    q: "Which is the only commercial river port on the South African coastline, with repair work undertaken at its graving dock and adjacent repair quay?",
    options: ["Mossel Bay", "Richards Bay", "East London", "Ngqura"],
    answer: 2,
  },
  {
    q: "Which port is the only one operating two offshore mooring points within port limits?",
    options: ["Saldanha Bay", "Mossel Bay", "Ngqura", "Richards Bay"],
    answer: 1,
  },
  {
    q: "At Richards Bay, where are repairs generally accommodated?",
    options: [
      "At the coal terminal berths",
      "Within the Small Craft Harbour at the Repair Berth",
      "At a dedicated graving dock",
      "Repairs are not undertaken at Richards Bay",
    ],
    answer: 1,
  },
];

export const aukSpm001Practical = {
  title: "Run a Port Call: Estimate, Notices and Statement of Facts",
  description: `A three-part exercise following one vessel from appointment to sailing.

**Part 1 — The disbursement estimate.** Learners receive a vessel's particulars (GT, DWT, LOA), a cargo description and tonnage, a nominated port and an expected port stay, together with the charter party terms governing cargo costs. Working from the **current** TNPA and TPT tariff publications, they build a line-by-line DA estimate separating landlord-side from terminal-side charges, identify which items fall to the vessel and which to the cargo interest, and state every assumption on which the estimate depends.

Marked on completeness, correct landlord/terminal allocation, correct application of the charter party cargo terms, and whether the assumptions are stated clearly enough that a variance could be explained afterwards.

**Part 2 — The notice schedule.** For the same vessel, learners produce the full notice and submission timetable from appointment through to sailing: agency appointment letter, ID100 nomination, the ETA update cascade, the 48-hour marine notification, ISPS pre-arrival, Phase II planning, and inward and outward clearance. Each entry carries its deadline, its recipient and the consequence of missing it.

**Part 3 — Statement of Facts and laytime.** Learners are given a log of events from a real port call — arrival, NOR tender, berthing, cargo operations, stoppages for weather, shift changes, equipment breakdown and terminal delays — and must produce a Statement of Facts in proper form, then calculate laytime used against the charter party terms and determine whether despatch or demurrage arises, and in what amount.

Assessors look for stoppages recorded with their cause attributed, delays correctly separated into vessel and terminal, correct application of the SHINC/SHEX terms, and correct treatment of excepted periods once the vessel is on demurrage.`,
};

export const aukSpm001Outcomes = [
  "Explain the ship agent's role under the FAL Convention and the agent's position as the port single window",
  "Distinguish port, cargo, owners' protecting and shipper's agency appointments, and identify which applies",
  "Describe South Africa's eight commercial ports, their cargo profiles and their operating systems",
  "Apply the TNPA landlord model, the National Ports Act licensing groups and the vessel agent registration conditions",
  "Run a port call from nomination through the notice cascade, Phase II and Phase III, to outward clearance",
  "Identify vessel role players and establish who the Principal is and who else has an interest in the call",
  "Read a charter party for the terms that govern agency appointment, cargo costs, laytime and laycan",
  "Tender and check a Notice of Readiness, compile a Statement of Facts, and calculate laytime, despatch and demurrage",
  "Build a disbursement account estimate separating landlord-side from terminal-side charges, from current tariffs",
  "Apply the FONASBA/BIMCO General Agency Agreement, including activities, funding, sub-agents and insurance",
  "Operate within delegated authority, use \"as agents only\" correctly, and identify where the agent is personally exposed",
];

export const aukSpm001Summary =
  "Ship agency as it is practised in South African ports. The agent's role and legal position, the four types of appointment, all eight commercial ports and the TNPA landlord model, vessel agent registration and its conditions, the full port call from ID100 nomination through the notice cascade to outward clearance, charter parties and chartering types, Notice of Readiness and Statement of Facts, laytime, despatch and demurrage, disbursement accounts and quotations, and the FONASBA/BIMCO General Agency Agreement.";

export const aukSpm001 = {
  code: "AUK SPM 001",
  title: "Shipping, Port & Ships Agency",
  summary: aukSpm001Summary,
  outcomes: aukSpm001Outcomes,
  modules: aukSpm001Modules,
  quiz: aukSpm001Quiz,
  practical: aukSpm001Practical,
  passMark: 70, // 32 of 45
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Disbursement account estimate template — landlord and terminal sides separated,
 *      tariff fields blank so learners populate from the current tariff book
 *   2. Port call notice schedule — every deadline, recipient and consequence on one page
 *   3. Statement of Facts template and worked example
 *   4. Laytime calculation worksheet — NOR, turn time, SHINC/SHEX, despatch/demurrage
 *   5. Charter party reading checklist — the clauses an agent must extract before a call
 *   6. Agency appointment checklist — cargo vessel and non-cargo vessel scopes
 *   7. Port profile cards — the eight ports, cargo types, berths, operating systems
 *   8. FONASBA/BIMCO GAA Part I box-completion guide
 *
 * Items 1, 3 and 4 carry the most weight — they are the three documents an agent
 * produces on almost every call.
 *
 * ── SOURCE HANDLING ───────────────────────────────────────────────────────
 *
 * The AUK learner guide this is built from was written for one named client and
 * marked for that client's staff only. Removed and not to be reinstated:
 *   - The client's name.
 *   - A named list of around 30 competing South African agency operators.
 *   - Two real disbursement estimates carrying a third party's actual rates,
 *     agency fees and margins. The DA *structure* is taught in Module 9; the
 *     figures are not reproduced, and learners build their own from the current
 *     tariff book. Publishing another firm's rate card inside a course sold to
 *     the market would be indefensible.
 *   - The contributor acknowledgement naming an individual at a named firm.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *
 * The guide draws on Transnet's 2015 Long Term Planning Framework, the 2016/17
 * Terminal Operating Guidelines and a 2021/22 tariff book. Verify before teaching:
 *   - TNPA and TPT tariffs — republished annually, and every DA figure depends on them
 *   - The Terminal Operating Guidelines — notice periods and phase requirements
 *   - Port throughput and forecast figures — the course describes port character
 *     qualitatively for this reason; take numbers from current TNPA publications
 *   - Port Elizabeth was renamed Gqeberha in 2021; older documents use both
 *   - The manganese ore terminal relocation from Gqeberha to Ngqura — confirm status
 *   - Vessel agent registration conditions and SAASOA membership requirements
 *   - The FONASBA/BIMCO GAA edition in use
 *   - Incoterms 2020 is the current edition (Module 7 references chartering only;
 *     Incoterms are covered in full in US-252437)
 */
