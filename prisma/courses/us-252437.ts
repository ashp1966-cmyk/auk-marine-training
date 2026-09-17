/**
 * US-252437 — Interpret & Apply International Commercial Terms (Incoterms)
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 252437 · 3 credits · NQF Level 3
 * Core unit standard within SAQA ID 59365 (FETC: Freight Forwarding and
 * Customs Compliance).
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * CONTENT NOTES
 * - Written to Incoterms(R) 2020 (ICC Publication No. 723E). The unit standard
 *   predates 2020 and its assessment criteria were drafted against Incoterms
 *   2000, so module 11 is a legacy annex covering the 13 old terms and the
 *   migration map. That evidences SO1 AC1 without teaching obsolete practice
 *   as if it were current.
 * - SA VAT stated at 15% (unchanged since 1 April 2018; the 2025 proposals to
 *   raise it to 15.5% and 16% were reversed). Re-check the SARS Export
 *   Regulation and Interpretation Note 30 before each intake.
 * - Original prose throughout. No ICC rule text is reproduced, and no
 *   third-party learner manual is quoted.
 */

export const us252437Modules = [
  {
    title: "1. Why Delivery Terms Exist",
    content: `A seller in Johannesburg and a buyer in Hamburg agree a price "free on board". Both believe they know what that means. The seller believes their job ends when the container leaves the yard. The buyer believes the seller pays terminal handling at Durban. Neither is unreasonable — before 1936, "free on board" genuinely meant different things in different trading centres, and the dispute would be resolved by whichever national law the contract happened to fall under.

The International Chamber of Commerce, founded in Paris in 1919, published the first Incoterms in 1936 to close that gap. The point was never to write new law. It was to give buyer and seller a shorthand, three letters long, that means exactly the same thing in Durban, Rotterdam, Shanghai and Santos.

**Eight editions.** Revisions were published in 1953, 1967, 1976, 1980, 1990, 2000, 2010 and 2020. Each tracks a change in how goods actually move. The 1990 edition responded to electronic data interchange replacing paper. The 2010 edition cut 13 terms to 11 and abolished the "ship's rail" as a transfer point, because containerisation had made it meaningless. The 2020 edition, ICC Publication No. 723E, is the current one.

Editions do not expire. A contract can validly cite Incoterms 2000 in 2026, and if it does, the 2000 definitions apply. This is why the reference must always be explicit.

**Legal status.** The rules are not legislation. They are not a treaty. No country enacts them. They bind the parties only because the parties incorporate them into their contract of sale — and that incorporation is what gives them force. Once incorporated, a South African court or arbitrator will apply them as agreed contractual terms.

Three consequences follow, and they matter more than anything else in this module:

- **Cite the edition.** Write "FOB Durban (Incoterms 2020)", not "FOB Durban". Without the edition you have created exactly the ambiguity the rules exist to remove.
- **Name the place precisely.** "FCA South Africa" is worthless. "FCA Durban Container Terminal, Pier 2 (Incoterms 2020)" tells both parties where risk changes hands.
- **The rules govern the contract of sale only.** They do not govern the contract of carriage you sign with the shipping line, or the insurance policy, or the letter of credit — though they have consequences for all three.

Incoterms(R) is a registered trademark of the ICC.`,
  },
  {
    title: "2. What the Rules Govern — and What They Do Not",
    content: `Every Incoterm answers exactly three questions. Who arranges and pays for what part of the journey (cost). At what precise point the risk of loss or damage passes (risk). Who handles export clearance, import clearance and the associated documents (responsibility). That is the whole scope. Everything else in the transaction sits outside the rule.

**Ownership does not pass with the Incoterm.** This is the misconception that costs money. Title passes according to the governing law of the sale contract and whatever the parties agreed — commonly on payment, or on endorsement of the bill of lading. A seller under DDP may have delivered, borne all cost and all risk to the buyer's warehouse, and still hold title because payment has not cleared. Conversely, risk can have passed to a buyer who does not yet own the goods. Risk and title are separate tracks and they routinely diverge.

**Price and payment terms are not governed.** The rule tells you what is included in the price, not what the price is or when it is paid. Letters of credit, documentary collections and open-account terms live in the payment clause of the contract.

**Breach and remedy are not governed.** What happens if the goods are late, defective or never arrive is a question for the sale contract and the applicable law.

**Sanctions, prohibitions and licensing are not governed.** An Incoterm allocates who must obtain an export permit. It does not make the export lawful.

**Two parties only.** The rules recognise a seller and a buyer. Carriers, freight forwarders, customs brokers, terminal operators and banks all appear in the transaction, but none is a party to the Incoterm. When a rule says the seller must contract for carriage, it means the seller carries that obligation to the buyer — how the seller discharges it, and through which forwarder, is the seller's business.

**Delivery has two faces.** The word is used in two senses and confusing them causes disputes. It marks the moment the seller has performed and is released. It also marks the moment the buyer becomes obliged to take the goods. If the buyer fails to take delivery at the named point, risk passes anyway — the buyer cannot delay the transfer of risk by not showing up. This principle runs through every rule and it is the seller's protection.`,
  },
  {
    title: "3. Anatomy of a Rule",
    content: `Every one of the eleven rules is set out the same way: ten seller obligations (A1 to A10) mirrored against ten buyer obligations (B1 to B10). Once you can read the structure you do not need to memorise eleven rules — you look up the two or three articles that matter.

| Article | Subject |
| --- | --- |
| A1 / B1 | General obligations — supply conforming goods and documents; pay the price |
| A2 / B2 | Delivery — where and how the seller delivers, and the buyer takes delivery |
| A3 / B3 | Transfer of risk — the single most important article |
| A4 / B4 | Carriage — who contracts for it, and to where |
| A5 / B5 | Insurance — who must insure, and at what level of cover |
| A6 / B6 | Delivery / transport document — what proof the seller must provide |
| A7 / B7 | Export and import clearance, including security requirements |
| A8 / B8 | Checking, packaging and marking |
| A9 / B9 | Allocation of costs — a consolidated list in the 2020 edition |
| A10 / B10 | Notices — what each party must tell the other, and when |

**How to read any rule in ninety seconds.** Go to A2 and A3 first. A2 tells you the physical act that constitutes delivery; A3 tells you that risk passes at that act. Together they give you the risk line. Then go to A9/B9, which in the 2020 edition consolidates every cost item in one place — that gives you the cost line. Then check A4 and A5 for carriage and insurance obligations, and A7 for clearance. You now know the rule.

**What changed in 2020.** A small number of changes matter operationally:

- **DAT became DPU** (Delivered at Place Unloaded), moved to sit after DAP in the running order. More than cosmetic: DPU can name any place, not only a terminal, so a seller can now be obliged to unload at a buyer's inland warehouse.
- **CIP insurance cover was raised** to Institute Cargo Clauses (A) as the minimum, or equivalent all-risks. CIF was deliberately left at Clauses (C), because CIF is dominated by bulk commodity trades where minimum cover is the market norm.
- **FCA gained an optional on-board bill of lading mechanism.** Under FCA, delivery happens before the vessel loads, so historically no on-board bill existed — which broke letters of credit demanding one. A6/B6 now let the parties agree that the buyer instructs the carrier to issue an on-board bill to the seller.
- **Own means of transport is expressly permitted** under FCA, DAP, DPU and DDP. The earlier drafting assumed a third-party carrier was always used.
- **Security-related obligations** — screening, advance manifest filing, chain of custody — were given explicit treatment in A4 and A7, and their costs in A9/B9.
- **Costs were consolidated** into A9/B9, so a party can see their whole cost exposure in one article instead of hunting through the rule.`,
  },
  {
    title: "4. The E and F Rules: EXW, FCA, FAS, FOB",
    content: `**EXW (Ex Works) — named place of delivery. Any mode.**

The seller places the goods at the buyer's disposal at their own premises or another named place, not loaded onto the collecting vehicle and not cleared for export. This is the seller's minimum obligation and the buyer's maximum exposure.

Two traps. First, the seller is not obliged to load, yet in practice the seller's forklift and the seller's staff do the loading — and if the goods are dropped, risk has already passed to the buyer. Second, the buyer must handle export clearance, which a foreign buyer frequently cannot do in South Africa because they are not a registered exporter with SARS.

For most export sales, FCA seller's premises does the job EXW is being asked to do, and does it properly: the seller loads, and the seller export-clears.

**Group F — main carriage unpaid.** The buyer contracts and pays for the main carriage. The seller delivers to a point, and export-clears.

**FCA (Free Carrier) — named place. Any mode.**

The most flexible rule in the set and the correct default for containerised cargo. It has two variants, and the named place decides which applies:

- *Named place is the seller's premises*: delivery occurs when the goods are loaded onto the buyer's collecting vehicle. Risk passes on loading.
- *Named place is anywhere else* — a container terminal, a forwarder's depot: delivery occurs when the goods arrive at the named place on the seller's vehicle, ready for unloading but not unloaded. Risk passes on arrival, before unloading.

Get the named place wrong and you have moved the risk line by hundreds of kilometres.

**FAS (Free Alongside Ship) — named port of shipment. Sea and inland waterway only.**

The seller delivers when the goods are placed alongside the nominated vessel, on the quay or in a lighter, at the named port. Risk passes at that moment. The seller export-clears. FAS suits break-bulk and bulk commodities loaded by the vessel's own gear or by shore cranes under the buyer's charter: project cargo, chrome ore, timber. It does not suit containers, because a container is never "alongside" in any meaningful sense.

**FOB (Free on Board) — named port of shipment. Sea and inland waterway only.**

The seller delivers when the goods are placed **on board** the vessel at the named port. The ship's rail was abolished as a transfer point in the 2010 edition; anyone still teaching or drafting "risk passes at the ship's rail" is working from a pre-2011 text.

FOB is the most misused rule in the trade. It is written for cargo the seller can physically place on board. For a container the seller cannot — the box is handed to the terminal days before loading, and from that moment the seller has lost control of goods that remain at their risk until the crane sets them down on the vessel. If the box is damaged or lost in the stack, or the vessel rolls the booking, the seller carries it.

**For containerised cargo, use FCA, not FOB.** This is the single most valuable rule of thumb in the course, and it applies equally to the C-rule pairs in the next module.`,
  },
  {
    title: "5. The C Rules: CFR, CIF, CPT, CIP",
    content: `Under all four C rules the seller contracts and pays for main carriage to a named destination, **but risk passes at origin**. Cost and risk part company, and the gap between them is the length of the voyage.

This is deliberate, and it is the most common source of confusion in the whole system. A seller who has sold CIF Rotterdam has paid the freight to Rotterdam and bought insurance to Rotterdam, but is no longer at risk once the goods are on board in Durban. If the vessel is lost mid-ocean the loss falls on the buyer, who claims on the policy the seller took out for their benefit.

Note also that the named destination in a C rule is **not** the delivery point. It is the point to which the seller has paid carriage. Delivery already happened at origin.

**CFR (Cost and Freight) — named port of destination.** Seller pays freight to the destination port. Risk passes when the goods are placed on board at the port of shipment. No insurance obligation on either party — which means that unless the buyer insures, the goods travel uninsured. Sea and inland waterway only.

**CIF (Cost, Insurance and Freight) — named port of destination.** CFR plus a cargo insurance obligation. The seller must insure for the buyer's benefit, for the price plus 10 percent, in the contract currency, to the named destination. Minimum cover under CIF remains Institute Cargo Clauses (C) in the 2020 edition — a restricted, named-perils cover that will not respond to many ordinary losses. A buyer who wants all-risks cover must say so in the contract. Sea and inland waterway only.

**CPT (Carriage Paid To) — named place of destination.** Seller pays carriage to the named destination. Risk passes when the goods are handed to the **first carrier** — not at destination, and not at the port. If a road haulier collects in Johannesburg for onward shipment from Durban, risk passed in Johannesburg. No insurance obligation.

**CIP (Carriage and Insurance Paid To) — named place of destination.** CPT plus insurance. Since the 2020 edition the seller must obtain **Institute Cargo Clauses (A)** cover, or equivalent all-risks, again for price plus 10 percent to the named destination. This is a materially higher standard than CIF, and one of the few points where the two "matching" pairs diverge.

**Choosing within the group.** The sea-only pair and the any-mode pair are functional equivalents separated only by mode. The test is the same as for the F rules: **containerised or multimodal, use CPT or CIP; bulk or break-bulk loaded on board at a port, use CFR or CIF.**

Selling a container CIF Ngqura puts the seller at risk for the terminal stack period and the loading operation while giving them no control over either. Selling it CIP Ngqura moves the risk line to the point where the seller actually hands over control.

**Two named places.** C rules can carry two geographical references — the place where risk passes and the place to which carriage is paid. If the risk point matters commercially, name it: "CIP Hamburg, risk passing at Kempton Park (Incoterms 2020)".`,
  },
  {
    title: "6. The D Rules: DAP, DPU, DDP",
    content: `Under the three D rules the seller bears both cost **and** risk to the named destination. Cost and risk travel together and arrive together. These are arrival contracts: the seller has not performed until the goods reach the agreed place in the buyer's country. All three work with any mode of transport.

**DAP (Delivered at Place) — named place of destination.** The seller delivers when the goods are placed at the buyer's disposal at the named place, on the arriving means of transport, **ready for unloading but not unloaded**. The seller bears everything up to that point. The buyer import-clears and pays duties and import VAT.

If the buyer fails to clear the goods and they sit accruing demurrage and storage at the port, those costs fall on the buyer — but the seller's goods are the ones sitting there, so this is a commercial exposure worth managing regardless of where the cost formally lands.

**DPU (Delivered at Place Unloaded) — named place of destination.** Identical to DAP with one addition: the seller must unload. This is the **only** rule of the eleven that obliges the seller to unload at destination.

DPU replaced DAT (Delivered at Terminal) in the 2020 edition. The change of name matters — under DAT the destination had to be a terminal; under DPU it can be any place, including an inland factory or a mine site. Before naming a DPU place, confirm that unloading is actually possible there: agreeing DPU at a site with no crane, no ramp and no hardstand creates an obligation the seller cannot discharge.

**DDP (Delivered Duty Paid) — named place of destination.** The seller's maximum obligation. The seller delivers at the named place ready for unloading, having borne all cost and risk, **and** having cleared the goods for import and paid all duties, taxes and import VAT.

**The DDP trap.** DDP requires the seller to act as importer in a country where they may have no legal standing to do so. In South Africa an importer must be registered with SARS under the Customs and Excise Act. A foreign seller who is not registered cannot lodge a bill of entry, cannot pay the duty, and cannot recover the import VAT — because they are not a South African VAT vendor. The result is import VAT that becomes an unrecoverable cost buried in the price, and a shipment stuck at the port. The same logic applies in reverse to a South African exporter selling DDP into a country where they hold no registration.

The workable alternative is almost always DAP, with the buyer as importer of record. If the commercial intent is genuinely a landed, all-in price, price it as DAP and quote the duty and VAT separately as an estimate rather than absorbing an obligation you cannot lawfully discharge.

**The symmetry worth remembering.** EXW is the seller's minimum and the buyer's maximum. DDP is the seller's maximum and the buyer's minimum. Both are extremes, and both are chosen far more often than they should be — usually because one party wanted a simple quote rather than the right allocation.`,
  },
  {
    title: "7. Risk and Cost: Reading the Two Lines",
    content: `Draw the journey from the seller's factory to the buyer's warehouse as a horizontal line. Every Incoterm places two marks on it: a **risk line** and a **cost line**. In the E, F and D groups the two coincide. In the C group they never do.

**Risk transfer**

| Rule | Risk passes when |
| --- | --- |
| EXW | Goods placed at buyer's disposal at named place, not loaded |
| FCA | At seller's premises: on loading onto buyer's vehicle. Elsewhere: on arrival at named place on seller's vehicle, ready for unloading |
| FAS | Goods placed alongside the vessel at the named port |
| FOB | Goods placed on board the vessel at the named port |
| CFR | Goods placed on board the vessel at the port of shipment |
| CIF | Goods placed on board the vessel at the port of shipment |
| CPT | Goods handed to the first carrier |
| CIP | Goods handed to the first carrier |
| DAP | At named destination, on arriving transport, ready for unloading |
| DPU | At named destination, once unloaded |
| DDP | At named destination, ready for unloading, import cleared |

**Cost transfer**

| Rule | Seller's cost ends |
| --- | --- |
| EXW | At their own premises |
| FCA / FAS / FOB | At the delivery point, including export clearance |
| CFR / CPT | At the named destination — carriage paid |
| CIF / CIP | At the named destination — carriage and insurance paid |
| DAP / DPU | At the named destination (DPU including unloading) |
| DDP | At the named destination, including import duty and taxes |

**Clearance.** EXW: buyer does both. FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU: seller export-clears, buyer import-clears. DDP: seller does both.

**Insurance.** Only two rules oblige anyone to insure. **CIF** requires the seller to hold minimum Institute Cargo Clauses (C). **CIP** requires Clauses (A) or equivalent. Under the other nine, neither party is obliged to insure — which means uninsured cargo unless someone takes commercial initiative. Whoever holds the risk should insure.

**Method for answering a transfer question**

1. Identify the rule and confirm the edition cited.
2. Identify the named place or port, precisely.
3. Ask: has the physical act described in A2 occurred yet?
4. If yes, risk sits with the buyer. If no, risk sits with the seller.
5. Answer the cost question separately — never assume it follows the risk answer.

**Worked example.** A container is sold **CFR Rotterdam (Incoterms 2020)**, loaded at Durban, and the vessel suffers a fire off Madagascar. Risk passed when the box was placed on board at Durban, so the loss falls on the buyer. The seller has already paid freight to Rotterdam and does not get it back. Neither party had an insurance obligation, so if the buyer did not insure, the buyer bears the full loss and must still pay the price. That last consequence surprises people, and it is exactly why CFR on a container is a poor choice.`,
  },
  {
    title: "8. Carriage, Insurance and Transport Documents",
    content: `The Incoterm determines what proof of delivery the seller must produce, and that document is usually what triggers payment.

- **Sea rules (FAS, FOB, CFR, CIF)**: a bill of lading, typically with an on-board notation. The bill is a document of title and can be negotiated.
- **Any-mode rules (FCA, CPT, CIP, DAP, DPU, DDP)**: whatever the mode produces — a sea waybill, an air waybill, a road consignment note under CMR, a rail note, or a multimodal transport document. Most of these are receipts, not documents of title.
- **EXW**: no transport document obligation at all. The seller need only make the goods available; proof of collection is a practical matter between the parties.

**The FCA letter of credit problem.** FCA is the correct rule for containers, but it creates a documentary difficulty. Under FCA the seller delivers before the vessel loads, so at the moment of delivery no on-board bill of lading exists. If the letter of credit demands an on-board bill — as most do — the seller cannot present conforming documents and does not get paid.

The 2020 edition addresses this directly. A6/B6 allow the parties to agree that the buyer will instruct the carrier to issue an on-board bill of lading to the seller once loading occurs. It must be **agreed in the sale contract**; it is optional, not automatic. If you are structuring an FCA sale under a documentary credit, this clause is not a nicety.

**What cargo insurance does.** A marine cargo policy covers physical loss of or damage to the goods. It does not cover delay, consequential loss, or the failure of the buyer to pay.

**Institute Cargo Clauses (C)** is a restricted named-perils cover: broadly, major casualty events such as fire, explosion, stranding, sinking, collision and general average sacrifice. It does not respond to theft, non-delivery of an individual package, or handling damage. This is the CIF minimum.

**Institute Cargo Clauses (A)** is all-risks cover subject to exclusions. It responds to handling damage, theft and pilferage. This is the CIP minimum since 2020.

**Institute Cargo Clauses (B)** sits between the two and appears in neither rule as a minimum, but is commonly agreed by negotiation.

War and strikes risks are excluded from all three and must be added by separate clauses — a live consideration on Red Sea and Gulf of Aden routings.

**The insurable interest question.** Insurance follows risk, not cost. Under CIF and CIP the seller buys the policy but the **buyer** holds the insurable interest during the voyage, because the buyer holds the risk. The policy must therefore be assignable, and the seller must give the buyer the policy or certificate so the buyer can claim.

Under CFR and CPT nobody is obliged to insure. A buyer on those terms who does not arrange their own cover is carrying an uninsured voyage. This is a recurring and expensive gap.

**General average.** If a vessel casualty triggers a general average declaration, every cargo owner contributes proportionally to the sacrifice, whether or not their own goods were damaged. Contributions are secured before cargo is released, and an uninsured cargo owner must post a cash deposit or bond to get their container back. Cargo cover, including Clauses (C), responds to the general average contribution. This is a strong practical argument for insuring even on the restricted terms.`,
  },
  {
    title: "9. South African Application: Customs Valuation and VAT",
    content: `The rule you choose has two distinct South African tax consequences: it affects the **customs value** declared on import, and it affects whether an export can be **zero-rated for VAT**. These are governed by different statutes and must be worked separately.

**Import valuation — the FOB basis.** South Africa values imported goods on an **FOB basis** under the Customs and Excise Act 91 of 1964. Customs value is broadly the price actually paid or payable, adjusted to the free-on-board equivalent at the place of export.

This has a direct practical effect. If you buy **CIF Durban**, the invoice price includes ocean freight and insurance. Those are **not** part of the customs value in South Africa and must be stripped out before duty is calculated. Declaring the CIF price as the customs value overstates duty on every consignment. Conversely, if you buy **EXW**, inland transport in the country of export up to the place of export must be **added** to reach the FOB equivalent.

Many countries value on a CIF basis. South Africa does not. This catches importers who have applied a foreign template.

**Added tax value for import VAT.** Import VAT is charged not on the customs value but on the added tax value (ATV):

    ATV = customs value + 10% uplift + any non-rebated customs duty
    Import VAT = ATV x 15%

The 10 percent uplift does **not** apply to goods imported from BLNS/SACU countries (Botswana, Lesotho, Namibia, Eswatini). Worth checking on any Beitbridge or Lebombo movement.

**Export zero-rating — direct versus indirect.** The VAT Act 89 of 1991, section 11(1)(a), read with the Export Regulation, distinguishes two categories, and the Incoterm is usually what decides which one you are in.

*Direct export.* The vendor (seller) is contractually responsible for delivering the goods to an address outside South Africa and pays for that delivery. Zero-rating at 0% applies, subject to holding the documentary proof within the prescribed period.

*Indirect export.* The recipient (buyer) or their agent removes the goods from South Africa. The default position is that the vendor charges VAT at the standard **15%**, and the buyer may claim a refund through the VAT Refund Administrator. In defined circumstances the vendor may elect to zero-rate, but only on strict conditions.

As a working guide — not a rule — **EXW, FCA, FAS and FOB** usually fall on the indirect side, because the buyer arranges removal. **CFR, CIF, CPT, CIP, DAP, DPU and DDP** usually fall on the direct side, because the seller contracts for carriage to a foreign destination. The test in the regulation is who is contractually responsible for delivery and who pays, not which letter group the term belongs to.

**The documentary burden.** Zero-rating is not a matter of intention. It has to be proved, and if the documents are not held within the prescribed period SARS will assess the vendor for the output tax at 15% — from the vendor's own pocket, since the buyer has long since paid and gone. Records typically required include the commercial invoice and order, the transport document, the customs declaration, proof of payment, and proof of delivery outside South Africa.

VAT has stood at 15% since 1 April 2018. Verify the current documentary requirements and prescribed periods against the SARS Export Regulation and Interpretation Note 30, which are amended from time to time.

**Ports and practice.** For consignments through Durban, Richards Bay, Cape Town, Saldanha Bay and Ngqura, the practical failure points are consistent: FOB agreed on containerised cargo when FCA was correct; CIF invoice values declared as customs values; DDP agreed by a foreign seller with no SARS importer registration; and named places written as a city rather than a terminal.`,
  },
  {
    title: "10. Choosing and Recommending a Rule",
    content: `**The eight-question method.** Work these in order. The answers narrow eleven rules to one or two.

1. **What is the mode?** Containerised, multimodal, air or road eliminates FAS, FOB, CFR and CIF immediately. Bulk or break-bulk loaded at a port keeps them in play.
2. **Who has the better freight rate?** Whichever party holds volume with the carriers should contract for carriage. That points to a C or D rule if the seller does, an F rule if the buyer does.
3. **Can each party clear in its own country?** A buyer who is not a registered exporter in the seller's country rules out EXW. A seller who is not a registered importer in the buyer's country rules out DDP.
4. **Who can actually control the goods at each stage?** Do not accept risk over goods you cannot see or influence. This is the argument against FOB and CIF on containers.
5. **What does the payment method demand?** A documentary credit calling for an on-board bill of lading needs a sea rule, or FCA with the A6/B6 mechanism agreed in writing.
6. **Who is insuring, and to what level?** If neither party is obliged to insure under the chosen rule, decide expressly who will and record it.
7. **What are the tax consequences?** Zero-rating on export, customs valuation basis, and recoverability of import VAT.
8. **Is the named place written precisely enough to be enforced?** Terminal, berth or street address — not a country, and usually not just a city.

**Comparing alternatives.** A recommendation must be developed against alternatives, with advantages and disadvantages identified. Structure the comparison across four dimensions for each candidate rule: **control** (who directs the goods and when), **cost exposure** (what each party pays and what is uncertain), **risk exposure** (the length of the uncontrolled risk window), and **compliance** (clearance capability, tax treatment, documentary fit).

A recommendation is justified when you can state what it protects against and what it gives up. Every choice trades something. A seller moving from CIF to CIP gives up the familiarity of a sea rule and gains a shorter risk window and better insurance cover. A buyer moving from DDP to DAP takes on import clearance and gains recoverable VAT and a shipment that is not stuck at the port.

**Worked recommendation**

*Scenario.* A South African manufacturer in Isando sells 4 x 40ft containers of mining consumables to a buyer in Antwerp. The buyer asked for FOB Durban. Payment is by documentary credit requiring an on-board bill of lading.

*Analysis.* FOB is a sea rule written for cargo the seller places on board. The seller cannot place a container on board. It will be handed to Durban Container Terminal days before loading, and under FOB the seller carries risk through the stack period and the loading operation with no control over either. That is the flaw.

*Recommendation.* **FCA Durban Container Terminal, Pier 2 (Incoterms 2020)**, with the A6/B6 on-board bill of lading mechanism expressly agreed in the sale contract.

*Advantages.* Risk ends where the seller's control ends, at the terminal gate. The documentary credit is still satisfied, because the buyer instructs the carrier to issue an on-board bill to the seller. Export clearance stays with the seller, who is the registered exporter, so it can actually be done. The buyer keeps control of the freight rate and the carrier, which is what they wanted from FOB.

*Disadvantages.* The on-board bill mechanism must be negotiated and drafted; it is not automatic, and a buyer unfamiliar with the 2020 edition may resist. Neither party is obliged to insure, so cover must be arranged separately. The buyer takes risk earlier than under FOB and may seek a price concession for it.

*Justification.* The recommendation moves the risk line to the point of actual control without disturbing either the freight arrangement or the payment mechanism. The trade-off — drafting effort, and an earlier risk transfer for the buyer — is smaller than the exposure it removes.`,
  },
  {
    title: "11. Legacy Annex: Incoterms 2000 and 2010",
    content: `Incoterms editions do not expire. Long-term supply agreements, standard purchase order templates and internal procedure manuals written before 2011 are still in circulation, and some still cite Incoterms 2000. If a contract cites the 2000 edition, the 2000 definitions govern that contract — you must be able to read them.

**The 13 terms of Incoterms 2000**

| Group | Terms |
| --- | --- |
| E — Departure | EXW |
| F — Main carriage unpaid | FCA, FAS, FOB |
| C — Main carriage paid | CFR, CIF, CPT, CIP |
| D — Arrival | DAF, DES, DEQ, DDU, DDP |

- **DAF** (Delivered at Frontier) — delivery at a named frontier point, export cleared, before the customs border of the adjoining country. Primarily rail and road.
- **DES** (Delivered Ex Ship) — delivery on board at the destination port, not import cleared and not discharged.
- **DEQ** (Delivered Ex Quay) — DES plus discharge to the quay.
- **DDU** (Delivered Duty Unpaid) — delivery at destination, seller bearing all cost and risk except import duties and taxes.

**What changed in 2010.** The edition cut 13 terms to 11. **DAF, DES, DEQ and DDU were deleted** and replaced by two new rules, **DAT** (Delivered at Terminal) and **DAP** (Delivered at Place) — four overlapping arrival terms became two clean ones. **The ship's rail was abolished**: under FOB, CFR and CIF risk now passes when the goods are placed on board. And **the rules were reorganised by mode** — a group usable with any mode, and a group for sea and inland waterway only — replacing E/F/C/D as the primary structure. The old group letters remain a useful teaching device, which is why this course still uses them.

**What changed in 2020.** DAT was renamed **DPU** and widened to any place, not only a terminal. CIP insurance rose to Clauses (A). FCA gained the optional on-board bill of lading mechanism. Own means of transport was expressly permitted. Costs were consolidated into A9/B9.

**Migration map**

| Incoterms 2000 | Nearest 2020 equivalent | Note |
| --- | --- | --- |
| DAF | DAP (named frontier point) | Risk and cost still transfer at the frontier |
| DES | DAP (named port, on board) | Seller does not discharge |
| DEQ | DPU (named port, quay) | DPU obliges the seller to unload |
| DDU | DAP | Buyer import-clears in both |
| DDP | DDP | Unchanged in substance |
| FOB / CFR / CIF | Same codes | Risk point moved from ship's rail to on board |

**Reading a legacy contract.** Check three things. Which edition is cited — and if none is cited, which edition was current when the contract was concluded, since that is the usual inference. Whether the term still exists in the current edition. Whether the named place is precise enough to apply either definition.

When renewing a legacy agreement, migrate it to the 2020 edition rather than preserving the old citation. Migration is a drafting exercise, not a commercial renegotiation, and it removes a category of dispute that has no upside for either party.`,
  },
];

export const us252437Quiz = [
  {
    q: "Which organisation publishes the Incoterms rules, and in what year was the first edition released?",
    options: [
      "The World Trade Organization, 1995",
      "The International Chamber of Commerce, 1936",
      "The International Maritime Organization, 1948",
      "The United Nations Conference on Trade and Development, 1964",
    ],
    answer: 1,
  },
  {
    q: "How many rules are there in Incoterms 2020?",
    options: ["9", "11", "13", "14"],
    answer: 1,
  },
  {
    q: "What legal force do the Incoterms rules carry?",
    options: [
      "They are international law binding on all WTO member states",
      "They are South African legislation under the Customs and Excise Act",
      "They bind the parties only when incorporated into their contract of sale",
      "They are binding on the carrier as well as on the buyer and seller",
    ],
    answer: 2,
  },
  {
    q: "Which of the following does an Incoterm NOT determine?",
    options: [
      "The point at which risk of loss or damage passes",
      "The point at which ownership of the goods passes",
      "Which party arranges export clearance",
      "Which party pays for main carriage",
    ],
    answer: 1,
  },
  {
    q: "Under FOB (Incoterms 2020), at what point does risk pass from seller to buyer?",
    options: [
      "When the goods cross the ship's rail",
      "When the goods are placed on board the vessel",
      "When the goods are delivered to the container terminal",
      "When the bill of lading is issued",
    ],
    answer: 1,
  },
  {
    q: "Which two Incoterms 2020 rules impose an insurance obligation on the seller?",
    options: ["CFR and CPT", "CIF and CIP", "DAP and DDP", "FCA and FOB"],
    answer: 1,
  },
  {
    q: "What is the minimum level of insurance cover the seller must obtain under CIP in Incoterms 2020?",
    options: [
      "Institute Cargo Clauses (C)",
      "Institute Cargo Clauses (B)",
      "Institute Cargo Clauses (A), or equivalent all-risks cover",
      "No minimum is specified",
    ],
    answer: 2,
  },
  {
    q: "A container is sold CFR Rotterdam (Incoterms 2020), loaded at Durban. The vessel suffers a fire off Madagascar and the cargo is destroyed. Who bears the loss?",
    options: [
      "The seller, because they contracted and paid for carriage to Rotterdam",
      "The buyer, because risk passed when the goods were placed on board at Durban",
      "The carrier, in all circumstances",
      "It is shared equally, as the loss occurred mid-voyage",
    ],
    answer: 1,
  },
  {
    q: "Why is FOB generally the wrong rule for containerised cargo?",
    options: [
      "FOB cannot lawfully be used for containers",
      "The seller retains risk through the terminal stack period and loading, over goods they no longer control",
      "FOB requires the seller to pay ocean freight",
      "Container lines will not issue a bill of lading on FOB terms",
    ],
    answer: 1,
  },
  {
    q: "Under FCA, where the named place is NOT the seller's premises, when is delivery complete?",
    options: [
      "When the goods are loaded onto the buyer's collecting vehicle at the seller's premises",
      "When the goods arrive at the named place on the seller's vehicle, ready for unloading but not unloaded",
      "When the goods are unloaded at the named place by the seller",
      "When the goods are placed on board the vessel",
    ],
    answer: 1,
  },
  {
    q: "Which single Incoterms 2020 rule obliges the seller to unload the goods at destination?",
    options: ["DAP", "DPU", "DDP", "DEQ"],
    answer: 1,
  },
  {
    q: "Under which rule does the buyer carry responsibility for BOTH export and import clearance?",
    options: ["EXW", "FCA", "DAP", "DDP"],
    answer: 0,
  },
  {
    q: "A foreign seller with no SARS importer registration agrees to sell DDP Johannesburg. What is the principal problem?",
    options: [
      "DDP may only be used for sea freight",
      "The seller cannot lodge a bill of entry or recover import VAT, so the shipment stalls and the VAT becomes an unrecoverable cost",
      "DDP requires the seller to insure at Clauses (A) level",
      "DDP is not recognised in South African law",
    ],
    answer: 1,
  },
  {
    q: "On what basis does South Africa determine the customs value of imported goods?",
    options: [
      "CIF basis, including ocean freight and insurance",
      "FOB basis, at the place of export",
      "DDP basis, including duty and import VAT",
      "The invoice total, whatever the Incoterm",
    ],
    answer: 1,
  },
  {
    q: "How is the added tax value (ATV) for import VAT calculated on goods imported from outside SACU?",
    options: [
      "Customs value x 15%",
      "Customs value, plus a 10% uplift, plus non-rebated duty, then x 15%",
      "Invoice value, plus freight and insurance, then x 15%",
      "Customs value plus duty, then x 14%",
    ],
    answer: 1,
  },
  {
    q: "In South African VAT terms, what distinguishes a direct export from an indirect export?",
    options: [
      "Direct exports go by sea; indirect exports go by road or air",
      "Direct exports use C and D rules and indirect exports use E and F rules, without exception",
      "In a direct export the vendor is contractually responsible for delivering the goods to an address outside South Africa and pays for that delivery",
      "Direct exports are zero-rated; indirect exports are exempt from VAT",
    ],
    answer: 2,
  },
  {
    q: "What is the standard rate of South African VAT?",
    options: ["12%", "14%", "15%", "16%"],
    answer: 2,
  },
  {
    q: "Under CPT and CIP, at what point does risk pass to the buyer?",
    options: [
      "At the named place of destination",
      "When the goods are handed to the first carrier",
      "When the goods are placed on board the vessel",
      "When the goods are unloaded at destination",
    ],
    answer: 1,
  },
  {
    q: "Which four rules may be used ONLY for sea and inland waterway transport?",
    options: [
      "EXW, FCA, CPT, CIP",
      "FAS, FOB, CFR, CIF",
      "DAP, DPU, DDP, EXW",
      "FCA, FOB, CIF, DAP",
    ],
    answer: 1,
  },
  {
    q: "A seller sells FCA under a documentary credit requiring an on-board bill of lading. What does Incoterms 2020 provide?",
    options: [
      "Nothing — FCA cannot be used under such a credit",
      "The rule automatically requires the carrier to issue an on-board bill to the seller",
      "The parties may agree in the sale contract that the buyer instructs the carrier to issue an on-board bill to the seller",
      "The seller must switch to FOB",
    ],
    answer: 2,
  },
  {
    q: "Which of these named places is drafted correctly for a container export?",
    options: [
      "FCA South Africa",
      "FOB Durban",
      "FCA Durban Container Terminal, Pier 2 (Incoterms 2020)",
      "FCA Durban 2020",
    ],
    answer: 2,
  },
  {
    q: "Which four terms existed in Incoterms 2000 but were deleted in the 2010 edition?",
    options: [
      "EXW, FCA, FAS, FOB",
      "DAF, DES, DEQ, DDU",
      "CFR, CIF, CPT, CIP",
      "DAT, DAP, DPU, DDP",
    ],
    answer: 1,
  },
  {
    q: "A general average is declared after a vessel casualty. What is the position of a cargo owner whose goods were undamaged and uninsured?",
    options: [
      "They owe nothing, as their cargo was not damaged",
      "They must contribute proportionally to the sacrifice and post security before their cargo is released",
      "The carrier must indemnify them in full",
      "The Incoterm determines whether they contribute",
    ],
    answer: 1,
  },
  {
    q: "Which pair correctly identifies the seller's minimum and maximum obligation under Incoterms 2020?",
    options: [
      "FCA minimum, DAP maximum",
      "EXW minimum, DDP maximum",
      "FAS minimum, DPU maximum",
      "EXW minimum, CIF maximum",
    ],
    answer: 1,
  },
];

export const us252437Practical = {
  title: "Incoterm Selection and Recommendation",
  description: `Learners are issued three consignment scenarios drawn from live Southern African trade lanes: a containerised export through Durban, a bulk commodity movement through Richards Bay or Saldanha Bay, and a cross-border road movement through Beitbridge or Lebombo.

For each scenario the learner applies the eight-question selection method from Module 10, compares at least two candidate rules across control, cost exposure, risk exposure and compliance, states a recommendation with the fully drafted term and named place including the edition, and justifies it — including the trade-offs accepted.

Assessed against SO3 AC1 to AC4. Evidence retained in the learner's portfolio.`,
};

export const us252437Outcomes = [
  "Explain the origin, purpose and legal status of the Incoterms rules, and what they do and do not govern",
  "Identify all eleven Incoterms 2020 rules by code, group and permitted mode of transport",
  "Locate the exact risk transfer point and the exact cost transfer point for any given rule",
  "Distinguish buyer and seller obligations for carriage, insurance, clearance and documentation",
  "Apply the correct rule to sea, air, road and multimodal consignments through South African ports",
  "Determine the VAT and customs valuation consequences that follow from the rule chosen",
  "Recommend a rule for a given transaction, justify the recommendation, and state its trade-offs",
  "Read and migrate legacy contracts written on Incoterms 2000 and 2010 terms",
];

export const us252437Summary =
  "Interpret and apply the Incoterms 2020 rules with confidence. A practitioner-led programme covering all eleven rules, the exact points at which risk and cost transfer, buyer and seller obligations, and how the chosen rule drives South African customs valuation and VAT treatment. Aligned to SAQA US 252437 (3 credits, NQF 3), a core unit standard within SAQA ID 59365.";

export const us252437 = {
  code: "US-252437",
  title: "Interpret & Apply International Commercial Terms (Incoterms)",
  summary: us252437Summary,
  outcomes: us252437Outcomes,
  modules: us252437Modules,
  quiz: us252437Quiz,
  practical: us252437Practical,
  passMark: 70, // 17 of 24 — see note below, Course has no passMark column
};

/**
 * SAQA alignment — reference only, not seeded. Kept here so the moderator's
 * pack can be generated from source rather than maintained separately.
 *
 * SO1 Identify international commercial terms
 *   AC1 History and origin explained with examples ......... modules 1, 11
 *   AC2 Impact on trade explained ......................... modules 1, 2, 4, 5, 6
 *   AC3 Legality identified with examples ................. modules 1, 2
 *   AC4 Scope and limits identified with examples ......... module 2
 *
 * SO2 Explain buyers' and sellers' responsibilities
 *   AC1 Responsibilities identified using examples ........ modules 3, 4, 5, 6, 7
 *   AC2 Risks identified using examples ................... modules 4, 5, 6, 7, 8
 *   AC3 Carriage responsibilities explained ............... modules 4, 5, 6, 8
 *   AC4 Costs identified with examples .................... modules 7, 9
 *
 * SO3 Make recommendations
 *   AC1 Recommendations developed to compare to others .... module 10 + practical
 *   AC2 Advantages and disadvantages identified ........... modules 4, 6, 10
 *   AC3 Recommendations made and identified ............... modules 8, 10
 *   AC4 Recommendations justified with examples ........... module 10 + practical
 *
 * NOTE ON THE SOURCE: the learner manual lists SO1 AC3 and AC4 with identical
 * wording ("The legality of the international commercial terms is identified
 * with examples"). AC4 is treated here as scope and limits, which is what the
 * SO1 heading implies. Confirm against the SAQA text before moderation.
 *
 * NOTE ON passMark: the Course model has no passMark column. It is exported
 * here for parity with auk-spm-015.ts, but it will not be written by the
 * updateMany below. Worth checking how SPM 015's passMark of 75 is currently
 * reaching the player, if at all.
 *
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Incoterms 2020 risk and cost transfer chart (A3 landscape, PDF)
 *   2. Mode of transport matrix (PDF)
 *   3. A1-A10 / B1-B10 obligations matrix (PDF)
 *   4. SA VAT direct vs indirect export decision tree (PDF)
 *   5. Landed cost worksheet — CIF to FOB customs value (XLSX)
 *   6. Incoterms 2000 to 2020 migration map (PDF)
 *   7. Recommendation template for the practical (DOCX)
 * Items 1, 2 and 5 carry the most teaching weight; the course reads coherently
 * without the rest.
 */
