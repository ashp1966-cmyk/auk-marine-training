/**
 * US-252414 — Calculate Customs Values
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * SAQA US 252414 · elective within SAQA ID 59365
 * (FETC: Freight Forwarding and Customs Compliance, NQF 3)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCE AND CORRECTIONS
 * Built from the learner manual for US 252414 "Calculate customs values"
 * (release 01/07/2009, registration ended 30/06/2012). The statutory framework —
 * sections 65, 66, 67 and 73 of the Customs and Excise Act 91 of 1964, the six
 * methods, the additions and deductions, the place-of-export rules, factoring and
 * the VPB and ATV formulae — is unchanged and is taught as the manual sets it out.
 *
 * Corrected here, each reversing something the manual states:
 *
 *   1. VAT RATE. The manual's ATV worked example applies 14%. The rate has been
 *      15% since 1 April 2018. Every VAT figure in this course uses 15%.
 *   2. "ACTUAL TAX VALUE". The manual calls the ATV the "actual tax value"
 *      throughout. It is the ADDED tax value, under section 13 of the VAT Act.
 *      This was wrong when written, and learners repeating it in an assessment
 *      will be marked down.
 *   3. GATT → WTO. The manual refers to the GATT Valuation Code. GATT was
 *      subsumed into the WTO in 1995; the instrument is the WTO Agreement on
 *      Customs Valuation (the Agreement on Implementation of Article VII of
 *      GATT 1994). The article numbering the manual cites is unchanged.
 *   4. CURRENCY LIST. The manual lists the Italian lira and Netherlands guilder,
 *      both replaced by the euro in 2002, and the Zimbabwe dollar, which has been
 *      abandoned and re-denominated repeatedly since 2009.
 *   5. VAT REGISTRATION THRESHOLD. The manual gives R150,000. That figure is
 *      long superseded — check current SARS guidance.
 *   6. CARGO DUES. The manual says cargo dues are payable to "SAPO". They are
 *      payable to Transnet National Ports Authority.
 *   7. PAPER WORKSHEETS. The manual contemplates calculator strips and manual
 *      calculations on the invoice. Declarations are now submitted electronically;
 *      the worksheet discipline remains, the medium does not.
 *
 * One further defect is flagged inside Module 13: the manual's mark-up worked
 * example states a rate of exchange of 0,225544 and then calculates with
 * 0,224455. Learners who reproduce that example will not reconcile it.
 */

export const us252414Modules = [
  {
    title: "1. Cost, Price and Value",
    content: `Three words that get used interchangeably in conversation and mean different things on a bill of entry.

**Price** is what the seller asks and the buyer agrees to pay. **Cost** is what the goods actually end up costing the buyer once everything is added — and in international trade the two are rarely the same number. **Value** is a perception: the same commodity is worth one thing in one place and something quite different in another. Value arises where the seller's need to sell at a price meets the buyer's perception of what the goods are worth to him, and when those two merge, a transaction value is stated.

**Why customs needs its own number**

Most customs administrations set duty as a percentage of a customs value, or value for duty purposes — the **VDP**. In South Africa the VDP is the basis on which most customs duties are calculated. It also determines:

- the amount of **VAT** payable on imports
- the **cargo dues** payable to the port authority
- the value against which **import permits** are measured

So a VDP that is wrong is not one error. It is four.

**Everything has a value**

This is the point learners most often resist. Goods supplied free of charge have a customs value. Samples have a customs value. Goods replaced under warranty have a customs value. Nothing is made for nothing, and the fact that no money changed hands on this particular movement does not mean the goods are worth nothing.

That is precisely why there are six valuation methods rather than one. Method 1 handles the ordinary sale. The other five exist to put a number on everything else.

**The agent's position**

A clearing agent who understands section 67 properly is a genuine asset to an importer. Importers routinely pay duty on values that are too high because dutiable and non-dutiable charges were not separated correctly — and are penalised when goods are undervalued because something that should have been added was not.

Both errors come from the same place: treating the supplier's invoice total as the answer. It almost never is.`,
  },
  {
    title: "2. The Legal Framework",
    content: `**The international instrument**

Most trading nations belong to the World Trade Organization, which promotes trade between members on a fair and equitable basis by standardising tariffs, valuation methods and trading procedures.

The valuation instrument is the **Agreement on Implementation of Article VII of GATT 1994** — commonly the **WTO Agreement on Customs Valuation**, or the Valuation Code. Older material, including the manual this course is built from, calls it the GATT Valuation Code; GATT was subsumed into the WTO in 1995, but the article numbering is unchanged, so a reference to Article 1 or Article 8 still points at the same text.

South Africa implemented the agreement on **1 July 1983**, embodying its first 17 articles in Chapter IX of the Customs and Excise Act.

The Code prescribes that **the price actually paid or payable shall be the basis for value for customs purposes** — the transaction value. It recognises that the seller's invoice may not by itself reflect the full transaction value, and that outside influences may increase the price actually paid or payable. And it prescribes **six methods, applied in strict hierarchical order.**

**The three sections that do the work**

**Section 65 — Value for customs duty purposes.** The VDP of imported goods shall, at the time of entry for home consumption, be the transaction value within the meaning of section 66.

**Section 66 — Transaction value.** The transaction value is the price actually paid or payable for the goods when sold for export to the Republic, adjusted in terms of section 67.

**Section 67 — Adjustments.** In ascertaining transaction value there shall be additions under 67(1) and deductions under 67(2).

Put together, that is the formula the whole course runs on:

    VDP (s.65) = Transaction Value (s.66) + Adjustments (s.67)

Learn it as a chain. Section 65 tells you the VDP *is* the transaction value. Section 66 tells you the transaction value *is* the price paid or payable, adjusted. Section 67 tells you what the adjustments *are*.

**Declaration is compulsory**

Section 74(1) requires that the customs value of any imported goods shall be declared by the importer. That applies **regardless of whether the goods attract ad valorem duty, specific duty, or are free of duty** under the tariff.

A learner who assumes duty-free goods need no value has misunderstood the section. The value is declared for every consignment.

**The other statutes in play**

The **VAT Act 89 of 1991**, section 13, for the added tax value and import VAT. **Schedule 1 Part 2B** to the Customs and Excise Act for ad valorem duties and the VPB.

The **Customs Control Act 31 of 2014** and **Customs Duty Act 30 of 2014** have been enacted but their implementation has been phased and partly deferred. Confirm the operative position before relying on either.`,
  },
  {
    title: "3. Incoterms and the Point of Valuation",
    content: `Incoterms state the responsibilities, risks and expenses of seller and buyer in an international trade transaction. Under Incoterms 2020 there are eleven rules, running from EXW at one end to DDP at the other.

**Whatever term is chosen, the buyer ultimately pays everything.** The seller or his agent simply passes on the expenses he was responsible for, either by invoicing them separately or by building them into the price of the goods. Parties choose terms for financial and logistical reasons, not to change who bears the total cost.

**Somewhere between EXW and DDP there has to be a customs value.**

**Where South Africa draws the line**

Article 8 paragraph 2 of the Valuation Code permits member countries to choose **FOB or CIF** as the basis for customs valuation.

**South Africa values on an FOB basis.**

Many countries value on CIF. If you have worked with a foreign template, or with a supplier used to a CIF jurisdiction, this is the first thing that will trip you.

**FOB (Incoterms) is not FOB (Customs)**

This distinction is the single most important idea in the course, and it is where most errors originate.

**FOB (Incoterms)** is a sea-only trade term meaning the goods are placed on board the vessel at the named port of shipment.

**FOB (Customs)** is a point of valuation defined by section 67(4) of the Act. It is dictated by the **place of export** and the **type of cargo** — FCL, LCL, air freight or break bulk — and it frequently sits somewhere quite different from the ship's side.

They coincide only in one case: break-bulk cargo shipped by sea from a port in the country of exportation. In every other case they do not, and Module 9 works through each mode.

**What this means in practice**

When an invoice says "FOB Shanghai", that tells you the commercial term. It does not tell you the customs valuation point. To find that, you ask: where were these goods packed into the container, or handed to the airline, or loaded onto the vehicle that crossed the border?

**A trap worth knowing now.** On shipments from the USA it is widely accepted that the term **"FOB"** or **"FOB Plant"** on an American invoice is equivalent to **EX WORKS** under Incoterms — not to FOB. An agent who reads a US invoice marked FOB and treats the inland charges as already included will understate the value on every American consignment.`,
  },
  {
    title: "4. Method 1: Transaction Value",
    content: `Approximately **90% of all goods imported into South Africa** are valued under Method 1. Learn it thoroughly; the other five are for what is left.

Valuation always **commences** with Method 1. If it fails, you move to Method 2, and so on in strict order — with one exception noted in Module 6.

**What Method 1 is**

The transaction value is the **price actually paid or payable for the goods when sold for export to the Republic, adjusted in terms of section 67** — provided the circumstances in section 66(1)(a) to (d) are satisfied.

Method 1 works because most buyers and sellers deal at arm's length on a strictly business basis. They are unrelated apart from doing business, nothing present influences the agreed price, and the seller would offer the same goods to other customers at the same level for the same price. A proper sale has taken place.

**The four provisos — section 66(1)**

**(a) No restrictions on the buyer's disposal or use of the goods**, other than restrictions which:

- are imposed or required by law — safety or health controls, permit conditions
- limit the geographical area in which the goods may be resold — for example, reselling rights in Gauteng only
- do not substantially affect the value of the goods

and the sale or price is not subject to any term or condition for which a value cannot be determined.

**(b) No part of the proceeds of any disposal, use or subsequent resale accrues to the seller**, directly or indirectly, unless an appropriate adjustment can be made under section 67.

What that means practically: the seller may not earn more after the initial sale. He may not be paid more if the goods are resold, and he may not earn a commission on goods manufactured from the imported item.

**(c) The seller and buyer must not be related** within the meaning of section 66(2)(a) — subject to section 66(3), which Module 5 covers.

**Where it fails**

Method 1 requires a sale. Section 66(1) says "when sold for export to the Republic", and that means a bona fide sale between seller and buyer.

So Method 1 cannot apply where there is no sale, no money passes, or payment comes only later. That happens more often than people expect:

- goods supplied free of charge — samples, advertising matter
- goods replaced, or replacing goods incorrectly supplied
- barter transactions
- goods imported on consignment
- goods hired or leased
- goods supplied on loan
- temporary imports
- personal effects of people immigrating to the Republic

None of these has a transaction value under Method 1. All of them still have a customs value. That is what Methods 2 to 6 are for.`,
  },
  {
    title: "5. Related Parties",
    content: `A relationship between seller and buyer does not automatically exclude Method 1. But it triggers scrutiny, and the agent needs to know when it exists and what the importer must prove.

**The eight categories — section 66(2)(a)**

Two persons are deemed related **only if**:

1. they are officers or directors of one another's businesses
2. they are legally recognised partners in business
3. the one is employed by the other
4. any person directly or indirectly owns, controls or holds **five per cent or more** of the equity share capital of both of them
5. one of them directly or indirectly controls the other
6. both of them are directly or indirectly controlled by a third person
7. together they directly or indirectly control a third person
8. they are members of the same family

The list is closed. A commercial closeness that does not fall into one of the eight is not a relationship for valuation purposes.

**Why it matters**

Any one of these relationships may influence the price, so that the selling price no longer reflects an open market price such as would be charged between unrelated parties.

There is a second and subtler effect: the relationship may mean **other payments pass between them which are not reflected in the invoice price** for the goods. Management fees, intercompany charges, offsets. The invoice looks clean and is incomplete.

**Where a related party can still use Method 1 — section 66(3)**

A relationship may exist and yet the price may be exactly what the supplier would charge anyone else. Section 66(3) allows Method 1 in that case, on either of two grounds:

**(a)** In the Commissioner's opinion, the relationship did not influence the price paid or payable.

**(b)** The importer proves satisfactorily that the transaction value **approximates closely** to one of:
- the transaction value of identical or similar goods sold at comparable trade and quantity levels to unrelated buyers
- the value ascertained by the **deductive** method
- the value ascertained by the **computed** method

These are test values. The burden sits on the importer, and the agent's role is to get the evidence assembled.

**If the tests fail**

Valuation must be concluded under one of the superseding methods, 2 to 6.

**The commercial reality**

Intercompany imports are common, and so are intercompany pricing arrangements that have nothing to do with the open market. Where you act for a group importer, establish the relationship position at the outset rather than discovering it during a customs query. A value determination issued after the fact — with a mark-up imposed, as Module 13 covers — is considerably more expensive than getting the evidence right the first time.`,
  },
  {
    title: "6. Methods 2 to 6",
    content: `Applied in strict hierarchical order, each only once the one before it has been fully explored and failed.

**Method 2 — Transaction value of identical goods** (section 66(4))

The price actually paid or payable for **identical goods** in a sale for export to the Republic, at the same commercial level, in substantially the same quantity, and exported at or about the same time as the goods being valued — adjusted under section 67.

**Identical goods** means goods produced in the same country, by the same or a different producer, and the same in all respects apart from minor differences in appearance.

Where no sale on those terms is found, a sale at a different commercial level or quantity level, or both, may be used subject to prescribed adjustments.

**If more than one transaction value is established, the lowest is adopted.**

**Method 3 — Transaction value of similar goods** (section 66(5))

Same structure, applied to **similar goods**: produced in the same country, by the same or a different producer, and although not alike in all respects, having — with due regard to quality, reputation and the existence of a trade mark — like characteristics and like component materials which enable them to be used for the same purposes and to be **commercially interchangeable**.

Everything else about the application is as for Method 2.

**Method 4 — Deductive value** (section 66(7))

Used typically for goods supplied **on consignment** by a foreign supplier to an agent in South Africa. There is no sale, so Method 1 cannot apply. The only known factor is the predetermined price the supplier wants the goods sold for in South Africa.

You start from that domestic selling price and **work backwards**, deducting non-dutiable charges until you reach the price at the place of export.

Three approaches are prescribed:

1. The unit price at which the imported, identical or similar goods are sold in the Republic **in the greatest aggregate quantity**, at or about the time of importation, to persons **not related** to the sellers. Deductions are then made for profit, commissions, marketing costs, transportation, loading, unloading, handling, insurance, associated costs incurred after the place of export, and any duties and taxes payable in the Republic on importation or sale.

2. If the goods are not sold at or about the time of importation, the earliest date after importation is used — **but not later than 90 days**.

3. If the goods are not sold in the same condition as imported, the importer may request in writing that the value be based on the unit price after further processing, with an allowance for the value added by processing plus the deductions in (1).

*Worked example.* Unit price sold to an unrelated person in South Africa: R5,000.

    Less profit                                    R1,500
    Less commission                                  R200
    Less advertising                                 R100
    Less other charges after delivery to importer    R100
                                                 = R3,100   (DDP value)
    Less port and handling                            R50
    Less transport                                    R50
    Less customs duties and taxes                    R100
                                                 = R2,900   (CIF value)
    Less insurance and freight                       R300
                                                 = R2,600   FOB — the transaction value

Note that the final FOB figure depends on the type of cargo movement, per Module 9.

**Method 5 — Computed value** (section 66(8))

The exact opposite of deductive. You start at the manufacturer's premises and **build forwards**: cost or value of materials and processing, packing, containers, labour, and the value of goods and services supplied by the importer. To that is added the costs incidental to delivery at the place of export, plus an amount for profit and general expenses equal to that generally applicable in sales of the same class of goods.

The practical difficulty is obvious. It depends entirely on the producer disclosing his costs and margins, and **it is not common for a seller to tell a buyer what mark-up he is applying** — particularly where the parties are unrelated.

**Reversing 4 and 5.** Importers may, under section 66(6), request in writing that the application of Methods 4 and 5 be reversed. This is the one exception to strict hierarchical order.

**Method 6 — Fall-back** (section 66(9))

The last resort. The Commissioner may determine a value by reference to a previous determination for identical or similar goods, or by reasonable and more flexible application of the principles in Methods 1 to 5.

**What the Commissioner may NOT do.** The Act protects importers by specifically precluding a determination based on:

(a) the selling price in the Republic of goods produced in the Republic
(b) a system providing for acceptance of the **higher** of two alternative values
(c) the selling price on the domestic market of the country of origin or exportation
(d) the cost of production, other than computed values determined for identical or similar goods under subsection (8)
(e) the price of the goods for export to a country other than the Republic
(f) a system of minimum customs values
(g) arbitrary or fictitious values

If a determination appears to rest on any of those, it is challengeable.`,
  },
  {
    title: "7. Discounts",
    content: `The price actually paid or payable may include a discount agreed between the parties. **It does not matter how a seller and buyer negotiate their price.** If the seller offers a discount, that discounted price is accepted as the price actually paid or payable.

Customs is nonetheless at liberty to investigate the nature of any discount — particularly between related persons, where it may be distorting the price.

**Which discounts are acceptable**

| Discount | Accepted | Condition |
| --- | --- | --- |
| Cash / settlement / advance payment | **Yes** | The importer must prove the goods were paid for **before time of entry** and the discount earned |
| Sample | **Yes** | Quantities no more than reasonable for the purpose, and s.66(1) satisfied. Often as much as 50% |
| Trade | **Yes** | Granted at different levels of a specific trade — wholesale, retail, export |
| Quantity | **Yes** | Must be granted **at the time of purchase**, fixing the price of the goods to be imported |
| Loyalty / fidelity | **Yes** | For a long-standing customer; may be additional to normal discounts. s.66(1) must be satisfied |
| Special | **Yes, subject to approval** | Usually intercompany. Almost certain to be scrutinised for s.66(1) compliance |
| Turnover | **No** | |
| Retrospective / progressive | **No** | Granted for achieving turnover or quantity over a period — not accepted |
| Unrelated | **No** | Any discount, debit or credit not relating directly to the specific shipment |

**The pattern.** A discount is accepted where it fixes the price of *this* consignment at the time of purchase. It is refused where it is earned by something outside this consignment — later turnover, a subsequent volume target, an unrelated credit.

**Amended invoices — section 41(4)(b)**

An importer must produce any amended invoice reflecting a debit or credit **within one month of receipt** to Customs, and either bring additional duty to account (debit) or claim a refund of duty (credit).

This is a live obligation that agents forget. A credit note arriving two months after clearance is not a matter for the next shipment; it triggers a duty adjustment on the one it relates to.

**Where the discount is calculated matters**

A discount may only be calculated **to the point at which it was granted.** If the invoice price includes costs beyond the valuation point — up to FOB or CIF — you must work back to the price the discount was actually granted on before applying it.

Module 13 works this through with numbers.`,
  },
  {
    title: "8. Additions: Section 67(1)",
    content: `Section 67(1) reads: in ascertaining the transaction value there shall be added to the price actually paid or payable, **to the extent that they are incurred by the buyer but are not included in the price actually paid or payable** —

Read that qualification carefully. Two conditions, both required. The buyer must have incurred the cost, **and** it must not already be in the price. Adding something that is already in the invoice price is double-counting.

These costs are frequently **not** on the normal shipping documents, and the importer is responsible for making the information available.

**67(1)(a)(i) — Commission, other than a buying commission**

Commissions are treated according to the function they serve. If a commission is tied to the sale — raised by the seller himself, or directly beneficial to him — it forms part of the transaction value and is dutiable. Dutiable commissions also include those earned in delivering the goods to the place of export as part of associated costs.

Commissions incurred **after** the goods are delivered ready for loading at the place of export are not dutiable. Nor are commissions incidental to payment — bank charges, financing charges, interest expense for financial accommodation, confirming commission.

    Selling commission      →  include
    Buying commission       →  exclude
    Confirming commission   →  exclude

**67(1)(a)(ii) — Brokerage**

A broker puts buyer and seller in touch with each other. His remuneration is brokerage, usually a percentage of the value of the business transacted. If the buyer is responsible for the fee, or part of it, it is added.

**67(1)(a)(iii) — Cost of packing, including labour and materials**

Normally already in the price of the goods. If a separate charge is raised for the buyer's account it is added — which happens where the buyer demands extra protective packaging to withstand a long journey and frequent handling.

**67(1)(a)(iv) — Cost of containers dealt with as being one with the goods**

This means **immediate containers** — bottles, boxes, drums. It does **not** mean reusable international transport containers such as TEU.

**67(1)(b)(i)–(iv) — Assists**

Where the buyer furnishes assistance to the supplier or manufacturer by contributing goods and services for use in producing the imported goods. Added if supplied directly or indirectly, free of charge or at reduced cost:

(i) materials, components, parts
(ii) tools, dies, moulds used in production
(iii) materials consumed in production — catalysts, lubricants, abrasives
(iv) engineering, development work, art work, design work, plans and sketches **undertaken outside the Republic**

Note that fourth one. Design work done inside South Africa is not an assist.

**67(1)(c) — Royalties and licence fees**

Payments for the use of a patent, trade mark or copyright. Usually dutiable and added to the invoiced price if not already included — **provided they are a condition of sale** of the goods for export to the Republic.

**67(1)(d) — Proceeds accruing to the seller**

The value of any part of the proceeds of any subsequent resale, disposal or use of the imported goods that accrues directly or indirectly to the seller. If the importer agrees to pay the supplier a 5% gratuity based on his resale price, that amount is added.

**67(1)(e) — Costs incidental to delivery at the place of export**

Added if not already included: transportation, loading, unloading, handling and insurance — **but not marine insurance for the main carriage** — to the extent they are incurred **before and up to** the port or place of export in the country of exportation.

This is the addition agents deal with daily, and it depends entirely on where the place of export is. Module 9.`,
  },
  {
    title: "9. The Place of Export by Mode",
    content: `Your understanding of "place of export" dictates which of the section 67(1)(e) costs are added. Get it wrong and every consignment on that lane is valued incorrectly.

**Section 67(3) — Country of export through transit**

Where goods pass in transit through other countries on their way to South Africa, the country of export remains the **first mentioned** country.

*Example.* Goods are loaded in Switzerland, transported in transit through Germany, then loaded on a vessel in a Dutch port for carriage to South Africa. **Switzerland is the country of export.**

**Section 67(4) — The place of export defined**

The port or place of export is where the goods are:

- **packed in a container** (FCL, or LCL/groupage) in the country of export; **or**
- if not packed in a container, **placed on board ship** (break bulk) or on any vehicle — truck, rail wagon, aircraft — in the country of exportation ready for export to the Republic; **and**
- placed on the vehicle which conveys them **across the border** of the country from which they are exported.

**By mode — what to include up to FOB (Customs)**

**Break-bulk by sea**, from a port within the country of exportation. The FOB value applies, and here **FOB (Customs) equates to FOB (Incoterms)**. This is the only case where they coincide.

**Containerised cargo.** The value of the goods including all costs and charges **up to the loading of the goods into the container.**

This is where the money is. The container may be loaded at the **supplier's works** or at a **container depot** in the country of exportation. Where a container is loaded at the supplier's premises, **the transport to the port and the supplementary charges are not dutiable** — because the place of export was the supplier's yard, not the quay.

The same FCL shipment valued as though the port were the place of export would be overvalued by the entire inland leg.

**Airfreight.** All costs and expenses up to the point at which the goods are handed into the **custody of the carrying airline** at the airport of departure in the country of export.

**Road.** All costs and expenses up to the **loading of the vehicle which will convey them across the border** of the country of export.

**Rail.** All expenses up to the point at which the goods are **finally loaded by the railways into the truck** that will convey them across the border of the exporting country.

**The dutiable / non-dutiable summary**

Dutiable to the valuation point, across all modes: commissions (except buying), brokerage, packing, immediate containers, assists, royalties, licence fees, proceeds to seller, export duties, documentation, postage and petties, handling, loading, inland transport, inland insurance, storage and warehousing before the valuation point.

**Not dutiable, all modes:** analysis fees, inspection fees, cost of strike action, letter of credit charges, interest, finance fees, bank charges, ocean or air freight, marine insurance, commissioning in South Africa.

**And the mode-specific rule that follows from all of this:** on an FCL loaded at the supplier's premises, **any charge raised after the container is loaded is not dutiable**. On an LCL, any charge raised after the container is loaded at the depot is not dutiable. On break bulk and air, the cut is at the ship or the airline's custody.

Inland transport is dutiable **except on FCLs loaded at the supplier's works**. That single exception accounts for a large share of customs valuation errors in practice.`,
  },
  {
    title: "10. Deductions: Section 67(2)",
    content: `Importers frequently buy on terms such as CIF. The invoiced price then includes non-dutiable costs reaching well beyond the customs valuation point, and those must be deducted to arrive at a VDP.

**What may be deducted**

**(a)** Transportation, loading, unloading, handling, insurance and other associated costs involved in moving the goods **from the port or place of export in the country of exportation to the port or place of importation in the Republic.**

**(b)** The following, **if identifiable separately** from the balance of the invoiced price:

(i) expenditure on construction, erection, assembly or maintenance of, or technical assistance provided in respect of, the goods **after they are imported**
(ii) costs of transport and insurance of the goods **within the Republic**
(iii) any duties or taxes paid or payable by reason of the importation, or the sale of the goods in the Republic
(iv) any duty or tax applicable in the country of exportation from which the goods have been or will be relieved by refund, drawback, rebate or remission
(v) **buying commission**
(vi) **interest** charged in respect of the price payable for the goods
(vii) any charge for the **right to reproduce** the imported goods in the Republic

**The condition that catches people: "identifiable separately"**

The deductions under (b) are only available if the amount can be identified separately from the invoice price. A CIF invoice showing one figure, with freight and insurance bundled into it and no breakdown, gives you nothing to deduct.

The practical consequence: **ask the supplier for the breakdown before clearance, not after.** An importer who buys CIF and cannot evidence the freight component pays duty on his freight.

**Reading the invoice to find the term**

The supplier's invoice normally states the term. Where it does not, you can establish it fairly accurately from what other charges the importer is paying:

- If overseas inland transport, handling and documentation are all on a **"collect"** basis, the invoice is invariably **EX WORKS**.
- If those charges are **prepaid** by the supplier, the invoice is usually **FOB**.
- If freight is **collect**, it is not normally included in the invoice price.
- If freight is **prepaid** by the supplier, it is normally included — and would have to be deducted.

**And the American exception again.** On shipments from the USA, "FOB" or "FOB Plant" on the invoice is widely accepted as equivalent to EX WORKS. Treat a US invoice marked FOB as ex works unless you have evidence otherwise.

**The method**

Establish the term. Establish the place of export for the mode. Then add what section 67(1) requires and deduct what section 67(2) permits, so that the result sits **exactly at the customs valuation point** — not at the Incoterm, and not at the invoice total.`,
  },
  {
    title: "11. Currency Conversion",
    content: `Customs values must be expressed in Rand on bills of entry. Because exchange rates move constantly, the Act fixes both the **rate** and the **date** so that every importer is treated identically.

**Section 73(1)**

Where the value or price paid or payable is expressed in a foreign currency, it shall for the purpose of calculating the customs value be converted into Rand **at the selling rate at the date of shipment of the goods as determined by the Commissioner**, in consultation with the South African Reserve Bank — or, if no rate is determined for that date, **the latest rate determined before that date.**

**"Selling rate."** The major commercial banks publish daily buying and selling rates and, competing with one another, their rates differ slightly.

**"Determined by the Commissioner."** The Commissioner determines the **average daily selling rate** of the major banks and publishes it. That published rate is used **solely for customs purposes**. The importer's actual payment goes through his own bank at his own bank's rate on the day it falls due — the two are different numbers and are meant to be.

**"No rate for such date."** No rates are published on public holidays; the latest determined rate is used.

**The rates are divisible**

Customs rates are determined to **six decimal places** and are **divisible**. You **divide** the foreign amount by the quoted rate to get Rand.

    USD 2,500.00 ÷ 0,144444 = ZAR 17,307.75

Multiplying instead of dividing is the most common arithmetic error in this course, and it produces a figure so wrong it should be obvious — but under time pressure it is not.

**Date of shipment — section 73(2)**

**(a) Non-containerised goods:** the date of the bill of lading, air waybill, consignment note, or such other document as the Commissioner may require.

**(b) Containerised goods:** the date on which the **container is taken on board ship**, as endorsed on the bill of lading or arrival notification — or, if imported otherwise than by sea, the date of the air waybill or consignment note.

**In practice, by mode**

**Break bulk by sea** — the bill of lading date is accepted as the date of shipment.

**Containerised by sea** — **not** the "place and date of issue" field, which is when the bill was prepared. In the body of the B/L is an endorsement giving the date the container was taken on board, and **that** is the conversion date. The "shipped on board" date appears in different places on different bill types: direct B/L, combined transport B/L, received-for-shipment B/L, house B/L, master B/L, arrival notification, forwarder's cargo receipt, or a shipped-on-board fax from the overseas groupage agent.

**Airfreight** — the date endorsed on the **master** air waybill by airline date stamp, machine print, or manual signature and date in the "Executed on" field. For consolidation cargo under a house air waybill, it is the date on the **master** AWB — so either a copy of the MAWB accompanies the HAWB, or the HAWB is endorsed with the MAWB details.

**Rail** — the date of the consignment note or goods invoice waybill.

**Road** — the customs date stamp of the **country of export** reflected on the consignment note, load list, manifest or inventory.

**A note on currencies**

Older material carries currency lists that have not aged well — the Italian lira and Netherlands guilder were replaced by the euro in 2002, and the Zimbabwe dollar has been abandoned and re-denominated repeatedly since 2009. Work from the Commissioner's **current** published list. Where a rate is needed for a currency not on the list, the Commissioner will obtain it for the importer.`,
  },
  {
    title: "12. Rounding and the Customs Worksheet",
    content: `**Rounding — section 65(2)**

Where the value of imported goods of a single denomination is:

- **in excess of one rand** — the value shall, for the purpose of assessing duty, be calculated **to the nearest rand**, an amount of **50 cents being regarded as less than one half of one rand**
- **less than one rand** — the value shall be calculated as **one rand**

That parenthetical about 50 cents is the part people get wrong. **50 cents rounds down**, not up.

    R 1,563.75  →  R 1,564
    R    96.50  →  R    96      ← rounds DOWN
    R   614.51  →  R   615
    R   135.42  →  R   135
    R     0.35  →  R     1      ← minimum is one rand

**Three values are rounded this way** on the customs declaration: **value for duty purposes**, **statistical value**, and **value details** (CIF & C).

**The customs worksheet**

Under section 39(1)(c) — "such other documents relating to such goods as the Controller may require" — the Controller requires a neat and accurate worksheet to accompany bills of entry.

A customs worksheet shows **how the individual customs values and actual price are calculated, and how the CIF & C value is calculated.** It must be set out so Customs can easily and clearly check the arithmetic.

There is no prescribed format. What matters is that every element is annotated so it is clear what it represents — "foreign amount", "total", and so on.

**Minimum content for valuation purposes:**

- invoice number
- amount in the foreign currency
- the terms of purchase — ex works, FOB, and so on
- discounts, if applicable
- the nature of charges added or deducted to arrive at the FOB contract / customs value
- the official exchange rate and the date applicable
- all calculations, including establishing a conversion factor where necessary

**The method — work the invoice first**

The document the whole task revolves around is the **supplier's commercial invoice.** Start by scrutinising it fully.

1. Establish the **term** — from the invoice, or from what charges are collect versus prepaid.
2. Establish the **place of export** for the mode. If the invoice shows EX WORKS Birmingham and the air waybill shows Heathrow as the place of export, the charges for moving the shipment Birmingham to Heathrow must be added.
3. Work out which charges are **added** and which **deducted** to reach the customs valuation point.
4. **Examine every supporting document** — bills of lading, air waybills, forwarder's statements — for other charges falling within "incidental to delivery". Some are tucked into a corner of the document or buried in text. Look carefully.
5. Establish the **official rate of exchange** for the applicable date and apply it.

**Worked example — airfreight, Birmingham to Johannesburg**

Supplier and buyer unrelated, normal trade transaction. Invoice: 500 wrist watches at £4.00 = £2,000.00 ex works, plus export packing £25.00 = **£2,025.00**.

Air waybill shows, collect: insurance £8.75 · freight London–Johannesburg £105.00 · handling at airport £10.00 · inland transport to Heathrow £45.00 · UK documents £7.50. Total collect £176.25.

    Ex works                    £ 2,000.00
    Packing                     £    25.00
    Total invoice amount        £ 2,025.00

    Add dutiable charges:
      Handling                  £    10.00
      Inland transport          £    45.00
      UK documents              £     7.50
    FOB Heathrow                £ 2,087.50

    ÷ exchange rate 0,097074  =  R 21,504.21
    Customs value             =  R 21,504

Note what was **not** added: insurance and air freight. Both fall beyond the place of export — the airline's custody at Heathrow.

**And the CIF & c:**

    Total invoice               £ 2,025.00
    FOB charges                 £    62.50
    Insurance                   £     8.75
    Air freight                 £   105.00
    Total                       £ 2,201.25

    ÷ 0,097074                =  R 22,675.99
    CIF & c                   =  R 22,676`,
  },
  {
    title: "13. Discounts, Commission and Mark-ups in Calculation",
    content: `Three calculations that share one principle: **an adjustment can only be applied at the point it was granted or incurred, and never beyond the valuation point.**

**Discounts**

A discount can only be calculated to the point at which it was granted. If the invoice price includes costs beyond that point — up to FOB or CIF — you must work back before applying the percentage.

*Worked example — LCL groupage.*

    Invoice CFR                            $ 5,000.00
    Less 2% cash discount (paid in time)   $   100.00
    Costs included: packing $100 · storage at packing depot $50 · ocean freight $250
    ROE 0,155555

The valuation point is where the goods were loaded into the groupage container in the country of export. Ocean freight sits beyond it, so it comes out first — and the discount is then applied to what remains.

    5,000.00 − 250.00 (non-dutiable freight)  = 4,750.00
    4,750.00 × 2%                             =    95.00
    4,750.00 − 95.00                          = 4,655.00
    4,655.00 ÷ 0,155555                       = R 29,925.1068
    Customs value                             = R 29,925

Note the discount is R95, not the R100 shown on the invoice — because R100 was 2% of a figure that included freight.

If instead the supplier granted the discount on the **ex works** value, you would apply it there and then **add** the dutiable charges up to the valuation point.

**Commission and brokerage**

The calculation is identical to discounts, with one difference: **commission is added, not subtracted.**

Two limits apply. Commission and brokerage may not be calculated **beyond the FOB valuation point**, and may not be calculated **beyond the value on which it is calculated on the invoice**.

**Mark-ups**

A mark-up is imposed where the Commissioner issues a value determination — typically on related-party imports, as Module 5 covers.

**Mark-ups are calculated on the ex works price.** That means the dutiable charges under section 67(1) are **not** added before calculating it, and the non-dutiable costs under 67(2) **are** deducted.

Three steps:

1. Establish the **ex works price** in Rand, and calculate the mark-up on that amount.
2. Establish the **valuation point** for the cargo type. This gives you the **actual price** (statistical value) in Rand.
3. **Actual price + mark-up = customs value.**

*Worked example — LCL, ex works Geneva.*

    Ex works value                      SF 5,000.00
    Inland transport to pack depot      SF   100.00
    Loading of groupage container       SF    59.50
    Freight and insurance               USD  250.00
    Mark-up 10%, per value determination

    Step 1 — mark-up on ex works:
      5,000.00 ÷ ROE = R 22,276.180
      × 10%          = R  2,227.62

    Step 2 — valuation point:
      (5,000.00 + 100.00 + 59.50) ÷ ROE
      = 5,159.50 ÷ ROE = R 23,147.178
      Statistical value  = R 23,147

    Step 3 — unrounded actual price + mark-up:
      23,147.178 + 2,227.62 = R 25,374.798
      Customs value          = R 25,375

Note that step 3 uses the **unrounded** actual price. Rounding at step 2 and then adding would give a different answer.

**A defect in the source material worth knowing about.** The version of this example in the 2009 learner manual states a rate of exchange of 0,225544 and then calculates with 0,224455 — the digits transposed. A learner reproducing that example will not reconcile it, and will assume the error is theirs. It is not.

The wider lesson: check the arithmetic in any worked example you are given, including this one. Customs valuation is a discipline where a transposed digit produces a plausible-looking number that is wrong.`,
  },
  {
    title: "14. Statistical Value, CIF & C, and Factoring",
    content: `**Statistical value (actual price)**

Where the Commissioner imposes a mark-up via a value determination, the customs value and the actual price diverge. The **statistical value** is the actual price — what was really paid — and it is required by Customs for statistics and for measuring **import permits**.

Other cases where statistical value differs from customs value:

- goods supplied free of charge
- recorded computer programs (games excluded)
- goods repaired or processed under rebate items 409.04 and 409.07

Statistical value is rounded as in Module 12 and entered in **block 46** of the declaration.

**CIF & C value (value details)**

The **Cost, Insurance, Freight and Commission** value, entered in **block 12** of the declaration.

Its significance: the CIF & C value is used in calculating payments to the **BLNS countries** under the Customs Union agreement with South Africa. Rounded to the nearest rand as everywhere else.

**Where CIF & C is measured, by mode:**

- **Ocean** — up to the port of discharge
- **Air** — up to the airport of destination. If the destination airport is Cape Town but the goods are offloaded at OR Tambo and road-freighted to Cape Town, **all charges to get the goods to Cape Town** are included
- **Rail** — the place of destination, not the first rail stop within the country
- **Post** — all costs up to the post office of final destination
- **Road** — the place at which the cargo is customs cleared

**Factoring multi-line declarations**

Where an invoice carries several items and dutiable charges apply to the whole consignment, those charges must be apportioned **pro rata across the lines** on the basis of each line's invoice price.

**What a factor is.** A factor is always based on the figure 1, increasing or decreasing from there. Add 30% to 1 and you get 1.3. Take 20% off and you get 0.8.

Put simply: if something weighing 70 units gains 10 units, dividing 80 by 70 gives 1.1428571 — it is now 1.1428571 of its old self. That ratio, applied to any part of the original, apportions the increase correctly.

**The formula**

    Gross (converted to Rand) ÷ Net = FACTOR

**Net** is the invoice total before dutiable charges. **Gross** is the total that must be declared, after additions and deductions. Calculate the factor to **a minimum of six decimal places** for accuracy.

*Worked example — simple.*

    Item 1                    3,500.00
    Item 2                    2,735.00
    Item 3                    4,165.00
    Total EXW    DEM         10,400.00   (NET)

    Packing                     450.00
    Inland transport            600.00
    Documentation                80.00
    Total FOB    DEM         11,530.00   (GROSS)

    ROE 0,313300

    Step 1:  11,530.00 ÷ 0,313300 = R 36,801.787
    Step 2:  R 36,801.787 ÷ DEM 10,400.00 = 3,5386333  FACTOR
    Step 3:  Item 1  3,500.00 × F = R 12,385.22 → R 12,385
             Item 2  2,735.00 × F = R  9,678.16 → R  9,678
             Item 3  4,165.00 × F = R 14,738.41 → R 14,738
                                                  R 36,801

Cross-check the total against the gross converted to Rand — R36,801.787 against R36,801. Slight variance from rounding is expected; a large variance means an error.

*Worked example — with a discount on one line only.*

Where a discount applies to a single item, adjust **that line** in the Net before calculating the factor.

    Item A   25,975.00
    Item B    9,940.00
    Item C   40,364.00  less 5% = 38,345.80
    Item D   10,447.00
    Net      AUD 84,707.80

    Add packing 500.00 · inland freight 1,500.00 · dockside storage 250.00
    Gross    AUD 86,957.80      (ocean freight excluded — non-dutiable)

    86,957.80 ÷ 0,243100 = R 357,703.82
    R 357,703.82 ÷ 84,707.80 = 4,2227967  FACTOR

    Item A  25,975.00 × F = R 109,687
    Item B   9,940.00 × F = R  41,975
    Item C  38,345.80 × F = R 161,927
    Item D  10,447.00 × F = R  44,116
                            R 357,705

*With a mark-up.* Establish the ex works price first — FOB less the included charges — calculate the mark-up on that, then add the charges back to reach the Gross. The **actual price excludes the mark-up**, so it is calculated separately: Net ÷ ROE.

**The check that catches most errors.** Add the customs values of every line and compare to the Gross converted to Rand. They should match within a rand or two. If they do not, the factor is wrong, and re-running the lines will not find it — go back to the Net and Gross figures.`,
  },
  {
    title: "15. VPB, ATV and Import VAT",
    content: `Two further values calculated from the customs value, on almost every declaration.

**Value for ad valorem customs duty — VPB**

**Schedule 1 Part 2 Section B** deals with ad valorem excise duties on goods manufactured in South Africa, and a corresponding ad valorem customs duty on imported goods of the same class or kind.

The list is extensive: perfumes, beauty, hair and shaving preparations, photographic film, furs, air conditioning machines, dishwashing machines, printing and office machines, recording media, radios, television receivers, motor vehicles, motor cycles, water scooters, optical goods, binoculars, cameras, photocopying apparatus, clocks, firearms, articles for funfair and casino games, and golf balls.

These duties are payable **together with** Schedule 1 Part 1, Schedule 1 Part 2A, and Schedule 2 duties.

**The VPB formula — section 65(8)(a)**

    VPB = customs value + 15% of customs value + any non-rebated customs duty
          payable under Part 1 and Section A of Part 2 of Schedule 1

*Worked example.*

    Customs value                        R 156,750
    Duty, Schedule 1 Part 1 @ 15%        R  23,512.50
    
    156,750 + 15% + non-rebated duty
    = 156,750 + 23,512.50 + 23,512.50
    = R 203,775.00
    VPB                                  = R 203,775

Note that the 15% uplift in the VPB formula is a **statutory percentage of the customs value**, and has nothing to do with the VAT rate. They happen to be the same number now, which makes confusing them easy. Keep them separate.

**Added tax value — ATV**

**This is the "added tax value", not the "actual tax value."** Older training material — including the manual this course derives from — calls it the actual tax value throughout. That is wrong, and repeating it in an assessment will be marked down.

VAT is collected under the **VAT Act 89 of 1991**. Inland Revenue is responsible for VAT, but stationing Inland Revenue staff at every place of entry is not economically feasible, so Customs and Excise — which controls all places of entry — collects import VAT. It is also simpler to collect duty and VAT together on the same documentation.

**Why an uplift exists.** The VAT Act is designed to ensure VAT is collected on the **total cost** of imported goods — the price paid, plus all duties, plus an element for freight. But the customs value is on an **FOB** basis, and actual freight and insurance are not always known at the time of clearance. So **section 13 of the VAT Act uplifts the customs value by a notional 10%** to cover them.

**The formula**

    ATV = customs value + 10% uplift + all duties
    Import VAT = ATV × 15%

**VAT has been 15% since 1 April 2018.** Older worked examples use 14%; they are not wrong for their date and are wrong now.

*Worked example.*

    Customs value                         R 2,345
    Duty, 1st Sch. Pt. 1 @ 20%            R   469.00
    Duty, 1st Sch. Pt. 2B @ 10%           R   234.50

    2,345 + 10% uplift                  = R 2,579.50
    + 469.00 + 234.50                   = R 3,283.00   (ATV)

    ATV × 15%                           = R   492.45   VAT payable

The ATV goes into **block 47** of the customs declaration.

**Input tax and the end user**

Entry of imported goods for home consumption is regarded as a supply, and VAT is due. **Unless the importer is himself the end user**, a registered vendor may claim the import VAT back on his VAT return as **input tax**.

That distinction matters commercially. For a registered vendor importing trading stock, import VAT is a cash-flow item. For an end user, or an unregistered importer, it is a cost. An agent who does not know which their client is cannot advise properly on the landed cost.

**A note on the registration threshold.** Older material gives R150,000 as the turnover above which registration as a vendor is compulsory. That figure has been superseded several times. Check current SARS guidance rather than any number in a training manual, this one included.`,
  },
];

export const us252414Quiz = [
  {
    q: "In South Africa, what does the value for duty purposes determine, besides customs duty?",
    options: [
      "Customs duty alone",
      "VAT on imports, cargo dues payable to the port authority, and the value against which import permits are measured",
      "Only the ad valorem duties in Schedule 1 Part 2B",
      "The rate of exchange applied to the invoice",
    ],
    answer: 1,
  },
  {
    q: "Which statement correctly expresses the relationship between sections 65, 66 and 67?",
    options: [
      "VDP = invoice total + duty",
      "VDP (s.65) = Transaction Value (s.66) + Adjustments (s.67)",
      "VDP = CIF value less freight and insurance",
      "VDP (s.67) = Transaction Value (s.65) + Additions (s.66)",
    ],
    answer: 1,
  },
  {
    q: "When did South Africa implement the international valuation agreement, and where is it embodied?",
    options: [
      "1 July 1983, in Chapter IX of the Customs and Excise Act",
      "1 January 1995, in the VAT Act",
      "1 July 2009, in the Customs Control Act",
      "21 December 1971, in Schedule 1",
    ],
    answer: 0,
  },
  {
    q: "Under section 74(1), for which goods must the customs value be declared?",
    options: [
      "Only goods attracting ad valorem duty",
      "Only goods attracting specific duty",
      "All imported goods, regardless of whether they attract ad valorem duty, specific duty, or are free of duty",
      "Only goods valued above R1,000",
    ],
    answer: 2,
  },
  {
    q: "On what basis does South Africa value imported goods, and what does the Valuation Code permit?",
    options: [
      "CIF basis; the Code permits only CIF",
      "FOB basis; the Code permits members to choose FOB or CIF",
      "DDP basis; the Code permits any Incoterm",
      "Ex works basis; the Code is silent",
    ],
    answer: 1,
  },
  {
    q: "In which single case does FOB (Customs) coincide with FOB (Incoterms)?",
    options: [
      "Containerised cargo loaded at a depot",
      "Break-bulk cargo shipped by sea from a port within the country of exportation",
      "Airfreight handed to the carrier",
      "Road freight crossing a border",
    ],
    answer: 1,
  },
  {
    q: "An invoice from a US supplier is marked \"FOB Plant\". How should this be read?",
    options: [
      "As FOB under Incoterms — inland charges are included",
      "As equivalent to EX WORKS — inland charges must be added",
      "As CIF, with freight to be deducted",
      "As DDP, with all duties included",
    ],
    answer: 1,
  },
  {
    q: "Approximately what proportion of goods imported into South Africa are valued under Method 1?",
    options: ["About 50%", "About 70%", "About 90%", "About 99%"],
    answer: 2,
  },
  {
    q: "Under section 66(2)(a), what equity shareholding makes two persons related?",
    options: [
      "Any shareholding at all",
      "Five per cent or more of the equity share capital of both of them",
      "Twenty-five per cent or more",
      "A controlling interest of over 50%",
    ],
    answer: 1,
  },
  {
    q: "Which is NOT one of the eight categories of relationship under section 66(2)(a)?",
    options: [
      "They are legally recognised partners in business",
      "They are members of the same family",
      "They have traded with each other for more than five years",
      "One of them directly or indirectly controls the other",
    ],
    answer: 2,
  },
  {
    q: "A relationship exists between seller and buyer. Under section 66(3), Method 1 may still be used if the importer proves the transaction value approximates closely to which of these?",
    options: [
      "The selling price of the goods in the country of origin",
      "The transaction value of identical or similar goods sold to unrelated buyers, or the deductive value, or the computed value",
      "The lowest value determined in the previous twelve months",
      "A minimum value set by the Commissioner",
    ],
    answer: 1,
  },
  {
    q: "Goods are supplied free of charge as samples. What is their customs value?",
    options: [
      "Nil, since no money changed hands",
      "They still have a customs value, determined under Methods 2 to 6",
      "The cost of freight only",
      "A nominal one rand",
    ],
    answer: 1,
  },
  {
    q: "Under Method 2, if more than one transaction value is established for identical goods, which is adopted?",
    options: ["The highest", "The lowest", "The average", "The most recent"],
    answer: 1,
  },
  {
    q: "What distinguishes \"similar goods\" from \"identical goods\"?",
    options: [
      "Similar goods are produced in a different country",
      "Similar goods are not alike in all respects, but have like characteristics and component materials and are commercially interchangeable",
      "Similar goods are sold at a different commercial level",
      "There is no difference in the Act",
    ],
    answer: 1,
  },
  {
    q: "Under Method 4, if the imported goods are not sold at or about the time of importation, what time limit applies?",
    options: ["30 days after importation", "60 days after importation", "The earliest date after importation, but not later than 90 days", "180 days after importation"],
    answer: 2,
  },
  {
    q: "Method 4 (deductive) and Method 5 (computed) differ in direction. Which describes Method 5?",
    options: [
      "Start from the domestic selling price and deduct backwards",
      "Start at the manufacturer's premises with cost of materials and build forwards to the place of export",
      "Start from the previous determination for identical goods",
      "Start from the CIF value and deduct freight and insurance",
    ],
    answer: 1,
  },
  {
    q: "Under section 66(6), what may an importer request in writing?",
    options: [
      "That Method 1 be applied despite a relationship",
      "That the application of Methods 4 and 5 be reversed",
      "That Method 6 be applied first",
      "That no value be declared for duty-free goods",
    ],
    answer: 1,
  },
  {
    q: "Under Method 6, which basis is the Commissioner specifically precluded from using?",
    options: [
      "A previous determination for identical or similar goods",
      "A flexible application of the principles in Methods 1 to 5",
      "A system providing for acceptance of the higher of two alternative values",
      "Computed values determined for identical goods under subsection (8)",
    ],
    answer: 2,
  },
  {
    q: "Which discount is NOT accepted by Customs for ascertaining transaction value?",
    options: ["Quantity discount granted at the time of purchase", "Trade discount", "Retrospective discount for achieving turnover over a period", "Loyalty discount"],
    answer: 2,
  },
  {
    q: "A cash or settlement discount is claimed. What must the importer prove?",
    options: [
      "That the supplier is unrelated",
      "That the goods were paid for before time of entry and the discount earned",
      "That the discount exceeds 2%",
      "That the goods were shipped within 30 days",
    ],
    answer: 1,
  },
  {
    q: "An importer receives an amended invoice reflecting a credit. Under section 41(4)(b), what must happen?",
    options: [
      "Nothing — it is adjusted on the next shipment",
      "It must be produced to Customs within one month of receipt, and a refund of duty claimed",
      "It must be produced within twelve months",
      "The credit is ignored for customs purposes",
    ],
    answer: 1,
  },
  {
    q: "Which commission is dutiable?",
    options: ["Buying commission", "Confirming commission", "Selling commission", "Bank charges on the payment"],
    answer: 2,
  },
  {
    q: "Section 67(1)(a)(iv) refers to the cost of containers dealt with as being one with the goods. What does this mean?",
    options: [
      "Reusable international transport containers such as TEU",
      "Immediate containers such as bottles, boxes and drums",
      "Both immediate containers and shipping containers",
      "Only containers supplied free of charge by the buyer",
    ],
    answer: 1,
  },
  {
    q: "Which of these is an \"assist\" added under section 67(1)(b)?",
    options: [
      "Design work undertaken in South Africa",
      "Tools, dies and moulds used in production, supplied by the buyer free of charge",
      "Marine insurance on the main carriage",
      "Bank charges on the letter of credit",
    ],
    answer: 1,
  },
  {
    q: "Royalties and licence fees are added to the price under section 67(1)(c) on what condition?",
    options: [
      "Always, without qualification",
      "Provided they are a condition of sale of the goods for export to the Republic",
      "Only where the parties are related",
      "Only where they exceed 5% of the invoice value",
    ],
    answer: 1,
  },
  {
    q: "Goods are loaded in Switzerland, transit through Germany, and are loaded on a vessel in a Dutch port for South Africa. What is the country of export?",
    options: ["Germany", "The Netherlands", "Switzerland", "Whichever country issued the bill of lading"],
    answer: 2,
  },
  {
    q: "An FCL container is packed at the supplier's premises in Germany and railed to Hamburg for shipment. How is the inland transport treated?",
    options: [
      "Dutiable — it is inland transport in the country of export",
      "Not dutiable — the place of export was the supplier's premises where the container was packed",
      "Half dutiable, apportioned by distance",
      "Dutiable only if separately invoiced",
    ],
    answer: 1,
  },
  {
    q: "For airfreight, up to what point are costs included in the customs value?",
    options: [
      "Up to the airport of destination",
      "Up to the point the goods are handed into the custody of the carrying airline at the airport of departure",
      "Up to the supplier's premises only",
      "Up to the point the aircraft departs",
    ],
    answer: 1,
  },
  {
    q: "For road traffic, what is the place of export?",
    options: [
      "The supplier's premises",
      "The point of loading of the vehicle which will convey the goods across the border of the country of export",
      "The first customs post inside South Africa",
      "The consignee's premises",
    ],
    answer: 1,
  },
  {
    q: "Which of these is NOT dutiable, across all modes?",
    options: ["Brokerage", "Inland insurance before the valuation point", "Bank charges and interest", "Export documentation"],
    answer: 2,
  },
  {
    q: "A CIF invoice shows a single figure with no breakdown of freight and insurance. What is the consequence under section 67(2)?",
    options: [
      "A standard 10% deduction is allowed",
      "Nothing can be deducted — the costs must be identifiable separately from the invoice price",
      "The importer may estimate the freight",
      "Customs will determine the deduction",
    ],
    answer: 1,
  },
  {
    q: "On an invoice where overseas inland transport, handling and documentation are all on a \"collect\" basis, what term is the invoice likely to be?",
    options: ["CIF", "FOB", "EX WORKS", "DDP"],
    answer: 2,
  },
  {
    q: "Under section 73(1), at what rate and date is foreign currency converted for customs purposes?",
    options: [
      "The importer's bank's rate on the date of payment",
      "The Commissioner's determined selling rate at the date of shipment",
      "The Reserve Bank's mid-rate on the date of entry",
      "The rate on the date the invoice was issued",
    ],
    answer: 1,
  },
  {
    q: "Customs rates of exchange are determined to six decimal places and are divisible. Convert USD 2,500.00 at 0,144444.",
    options: ["R 361.11", "R 17,307.75", "R 2,500.00", "R 1,730.78"],
    answer: 1,
  },
  {
    q: "For containerised sea cargo, which date is used for currency conversion?",
    options: [
      "The \"place and date of issue\" field on the bill of lading",
      "The date the container was taken on board ship, as endorsed on the bill of lading or arrival notification",
      "The date the container was packed",
      "The date of arrival in South Africa",
    ],
    answer: 1,
  },
  {
    q: "For consolidation airfreight under a house air waybill, which date applies?",
    options: [
      "The date on the house air waybill",
      "The date shown on the master air waybill",
      "The date the consolidation was closed",
      "The date of the commercial invoice",
    ],
    answer: 1,
  },
  {
    q: "Under section 65(2), how is a customs value of R96.50 rounded?",
    options: ["R97", "R96", "R96.50 — no rounding applies", "R100"],
    answer: 1,
  },
  {
    q: "A customs value calculates to R0.35. What value is declared?",
    options: ["R0.35", "R0", "R1", "The line is omitted"],
    answer: 2,
  },
  {
    q: "An invoice shows CFR $5,000, including ocean freight $250, with a 2% cash discount shown as $100. On a groupage LCL, what discount amount is applied for customs purposes?",
    options: [
      "$100 — as shown on the invoice",
      "$95 — 2% of $4,750, being the value after removing non-dutiable freight",
      "$110 — 2% of the gross including charges",
      "No discount is allowed on CFR terms",
    ],
    answer: 1,
  },
  {
    q: "On what price is a mark-up imposed under a value determination calculated?",
    options: ["The CIF price", "The FOB price at the valuation point", "The ex works price", "The domestic selling price in South Africa"],
    answer: 2,
  },
  {
    q: "In the mark-up calculation, what is added to the mark-up to give the customs value?",
    options: [
      "The rounded statistical value",
      "The unrounded actual price at the valuation point",
      "The ex works price",
      "The CIF & c value",
    ],
    answer: 1,
  },
  {
    q: "What is the formula for the multiplication factor used in apportioning charges across a multi-line declaration?",
    options: [
      "Net ÷ Gross",
      "Gross (converted to Rand) ÷ Net",
      "Gross × rate of exchange",
      "Net × rate of exchange ÷ number of lines",
    ],
    answer: 1,
  },
  {
    q: "To how many decimal places should a factor be calculated?",
    options: ["Two", "Four", "A minimum of six", "Rounded to the nearest whole number"],
    answer: 2,
  },
  {
    q: "Goods arrive by air at OR Tambo but the destination airport on the documents is Cape Town, and they are road-freighted there. What is included in the CIF & C value?",
    options: [
      "Costs up to OR Tambo only",
      "All charges to get the goods to Cape Town",
      "Costs up to the place of export only",
      "CIF & C does not apply to airfreight",
    ],
    answer: 1,
  },
  {
    q: "Why is the CIF & C value required on the declaration?",
    options: [
      "It is the basis for customs duty",
      "It is used in calculating payments to the BLNS countries under the Customs Union agreement",
      "It determines the rate of exchange",
      "It is the basis for VAT",
    ],
    answer: 1,
  },
  {
    q: "What is the formula for the value for ad valorem customs duty (VPB) under section 65(8)(a)?",
    options: [
      "Customs value + 10% + all duties",
      "Customs value + 15% of such value + any non-rebated customs duty under Part 1 and Section A of Part 2 of Schedule 1",
      "Customs value × 15%",
      "CIF & c value + 15%",
    ],
    answer: 1,
  },
  {
    q: "What does ATV stand for, and under which provision is it calculated?",
    options: [
      "Actual tax value, under section 65 of the Customs and Excise Act",
      "Added tax value, under section 13 of the VAT Act",
      "Adjusted transaction value, under section 67",
      "Ad valorem tax value, under Schedule 1 Part 2B",
    ],
    answer: 1,
  },
  {
    q: "Why does section 13 of the VAT Act apply a notional 10% uplift to the customs value?",
    options: [
      "To account for exchange rate movement between shipment and entry",
      "Because the customs value is on an FOB basis and actual freight and insurance are not always known at the time of clearance",
      "To cover the cost of customs clearance",
      "As a penalty for late entry",
    ],
    answer: 1,
  },
  {
    q: "Customs value R2,345; duty Sch.1 Pt.1 R469.00; duty Sch.1 Pt.2B R234.50. What is the ATV?",
    options: ["R2,579.50", "R3,048.50", "R3,283.00", "R3,048.50 plus VAT"],
    answer: 2,
  },
  {
    q: "What is the current rate of VAT applied to the ATV on imports?",
    options: ["12%", "14%", "15%", "16%"],
    answer: 2,
  },
  {
    q: "An importer is a registered vendor importing trading stock. How does import VAT affect him?",
    options: [
      "It is an absolute cost with no recovery",
      "It is a cash-flow item — he may claim it back as input tax on his VAT return",
      "It is exempt",
      "It is claimed back only on export of the finished goods",
    ],
    answer: 1,
  },
];

export const us252414Practical = {
  title: "Build Customs Worksheets and Declarations",
  description: `Four assessed calculations, each producing a worksheet a Controller could check.

**Part 1 — Single-line airfreight, ex works.** Learners receive a supplier's invoice on ex works terms, an air waybill showing collect charges, and a shipment date. They identify the place of export, separate the dutiable from the non-dutiable charges, convert at the correct rate for the correct date, and produce a customs worksheet showing the customs value and the CIF & c value, both correctly rounded.

**Part 2 — Containerised sea, with a discount.** An LCL groupage shipment on CFR terms with a cash discount shown on the invoice. Learners must establish the valuation point, strip out the non-dutiable freight before applying the discount percentage, and show why the discount applied for customs purposes differs from the figure on the invoice.

**Part 3 — Multi-line declaration with factoring.** An invoice with four lines, dutiable charges applying to the consignment as a whole, and a quantity discount applying to one line only. Learners calculate the Net and Gross, derive a factor to six decimal places, apply it across the lines, round each, and run the cross-check against the Gross converted to Rand.

**Part 4 — Mark-up, VPB and ATV.** A related-party import carrying a value determination with an imposed mark-up. Learners calculate the mark-up on the ex works price, establish the statistical value at the valuation point, derive the customs value from the unrounded actual price, then calculate the VPB under section 65(8)(a) and the ATV and import VAT at 15%.

Assessed on: correct identification of the place of export for the mode; correct separation of dutiable and non-dutiable charges with the statutory basis cited; correct rate and date of conversion; correct rounding, including the 50-cent rule; arithmetic accuracy to the stated decimal places; and whether the worksheet is set out so a third party could follow it without explanation.

A worksheet that reaches the right answer by a route the assessor cannot follow does not pass. Customs must be able to check the calculation.`,
};

export const us252414Outcomes = [
  "Distinguish cost, price and value, and explain what the value for duty purposes determines",
  "Apply sections 65, 66 and 67 of the Customs and Excise Act to establish a value for duty purposes",
  "Explain the WTO Agreement on Customs Valuation and its implementation in South African law",
  "Distinguish FOB (Incoterms) from FOB (Customs) and identify the point of valuation",
  "Apply Method 1 and test the four provisos in section 66(1)",
  "Identify related parties under section 66(2)(a) and apply the section 66(3) tests",
  "Apply Methods 2 to 6 in hierarchical order, including the deductive and computed methods",
  "Determine which discounts are acceptable for transaction value purposes",
  "Apply the additions under section 67(1) and the deductions under section 67(2)",
  "Establish the place of export for break bulk, FCL, LCL, air, road and rail consignments",
  "Convert foreign currency at the correct rate and date of shipment under section 73",
  "Round values correctly under section 65(2) and prepare a customs worksheet",
  "Calculate discounts, dutiable commission and mark-ups at the correct point",
  "Calculate statistical value, CIF & C value, and factor charges across multi-line declarations",
  "Calculate the VPB under section 65(8)(a) and the ATV and import VAT under section 13 of the VAT Act",
];

export const us252414Summary =
  "Calculate a value for duty purposes to the standard SARS requires. The statutory chain through sections 65, 66 and 67 of the Customs and Excise Act, all six valuation methods in hierarchical order, related-party tests, acceptable and unacceptable discounts, additions and deductions, the place of export by mode of transport, currency conversion under section 73, rounding, customs worksheets, mark-ups, factoring multi-line declarations, and the VPB and added tax value calculations. Aligned to SAQA US 252414, with every figure updated to the current statutory position.";

export const us252414 = {
  code: "US-252414",
  title: "Calculate Customs Values",
  summary: us252414Summary,
  outcomes: us252414Outcomes,
  modules: us252414Modules,
  quiz: us252414Quiz,
  practical: us252414Practical,
  passMark: 70, // 36 of 51
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links.
 *   1. Customs worksheet template — the section 39(1)(c) minimum content, blank
 *   2. Dutiable / non-dutiable charge reference card, by mode of transport
 *   3. Place-of-export decision chart — break bulk, FCL, LCL, air, road, rail
 *   4. Six methods flowchart, with the section 66(6) reversal marked
 *   5. Discount acceptability table — s.66(1) conditions against each type
 *   6. Factoring worksheet — Net, Gross, factor, line apportionment, cross-check
 *   7. VPB / ATV calculation sheet with current VAT rate
 *   8. Worked example pack — one per mode, fully annotated
 *
 * Items 1, 3 and 6 carry the most weight: they are the three things a declarant
 * produces on every consignment.
 *
 * ── CORRECTIONS APPLIED TO THE SOURCE MANUAL ──────────────────────────────
 *
 * The learner manual (release 2009, registration ended 30/06/2012) states the
 * following incorrectly. Each is corrected in the course content:
 *
 *   1. VAT at 14% in the ATV worked example. The rate has been 15% since
 *      1 April 2018.
 *   2. "ATV (actual tax value)" throughout. It is the ADDED tax value, under
 *      section 13 of the VAT Act. This was wrong when written.
 *   3. "GATT Valuation Code" and "GATT agreement". GATT was subsumed into the
 *      WTO in 1995; the instrument is the WTO Agreement on Customs Valuation.
 *      Article numbering is unchanged, so cited articles still resolve.
 *   4. A currency list including the Italian lira and Netherlands guilder (both
 *      replaced by the euro in 2002) and the Zimbabwe dollar (abandoned and
 *      re-denominated repeatedly since 2009).
 *   5. VAT vendor registration threshold of R150,000 — long superseded.
 *   6. Cargo dues "payable to SAPO" — they are payable to Transnet National
 *      Ports Authority.
 *   7. Worksheets as calculator strips or manual calculations on the invoice.
 *      Declarations are now electronic; the worksheet discipline stands, the
 *      medium does not.
 *
 * ARITHMETIC DEFECT IN THE SOURCE: the mark-up worked example states a rate of
 * exchange of 0,225544 and then calculates using 0,224455 — the digits
 * transposed. Module 13 flags this explicitly, because a learner working from
 * the original will not reconcile it and will assume the error is theirs.
 *
 * ── CURRENCY: RE-CHECK BEFORE EACH INTAKE ─────────────────────────────────
 *   - VAT rate (15% since 1 April 2018)
 *   - VAT vendor registration threshold
 *   - The Commissioner's published currency list and rates
 *   - Status of the Customs Control Act 31 of 2014 and Customs Duty Act 30 of
 *     2014, whose implementation has been phased and partly deferred
 *   - Schedule 1 Part 2B ad valorem duty rates and the goods listed
 *   - Rebate items 409.04 and 409.07
 *   - Declaration block numbers (12, 46, 47) against the current SAD 500
 */
