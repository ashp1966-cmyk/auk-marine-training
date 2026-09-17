/**
 * AUK SPM 015 — ISM, MLC & ISPS Auditor
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. `modules` and `quiz` are stored as JSON on the
 * Course record, matching the shapes the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * v2 — adds Module 13 (audit process protocol: notification, meetings, report
 * timelines, close-out evidence), 14 further quiz questions including the five
 * finding-classification scenarios, and the summary / outcomes / practical
 * exports that were previously missing, so the seed block can populate those
 * columns.
 */

export const aukSpm015Modules = [
  {
    title: "1. The Auditor's Place in the IMO Framework",
    content: `An auditor is not an inspector looking for faults. An auditor gathers objective evidence and compares it against a stated requirement, then reports what that comparison shows. Everything else in this course rests on that distinction.

The requirements you audit against come from the International Maritime Organization (IMO). SOLAS 1974 (Safety of Life at Sea) is the parent convention for two of your three codes: Chapter IX makes the ISM Code mandatory, and Chapter XI-2 makes the ISPS Code mandatory. MARPOL 73/78 governs pollution prevention across six Annexes, and although you do not audit MARPOL directly, the ISM Code obliges a company to comply with it — so MARPOL breaches surface as ISM findings. MLC 2006 stands on its own as an International Labour Organization convention, but it is inspected and certified in much the same rhythm as the SOLAS codes.

Three ideas carry across all three instruments. First, the flag State (the Administration) carries legal responsibility and may delegate verification to a Recognised Organisation, usually a classification society. Second, the IMO Instruments Implementation Code (the III Code) sets expectations for how flag, port and coastal States discharge those duties. Third, port State control (PSC) is the enforcement backstop: what you fail to find as an internal auditor, a PSC officer may find instead — and their finding can detain the ship.

That is the practical argument for auditing well. An internal audit is the company's own chance to find a problem while it is still cheap. A PSC detention in Durban or Richards Bay costs berth time, charter hire and reputation.

Throughout this course, keep asking the auditor's core question: what requirement applies here, and what evidence would show me whether it is being met?`,
  },
  {
    title: "2. The ISM Code: Structure and Intent",
    content: `The International Safety Management Code is the shortest of the three instruments and the most demanding to audit, because it asks about a system rather than a list of items.

Its objectives are stated in section 1.2: ensure safety at sea, prevent human injury or loss of life, and avoid damage to the environment and to property. It achieves this by requiring every company to establish and maintain a Safety Management System (SMS) — a documented set of procedures that turns policy into daily practice.

The Code has sixteen sections. Sections 1 to 12 are the functional requirements you audit; sections 13 to 16 deal with certification and forms. Committing the list to memory pays off, because every finding you write should reference a section:

1 General and definitions · 2 Safety and environmental protection policy · 3 Company responsibilities and authority · 4 Designated Person Ashore · 5 Master's responsibility and authority · 6 Resources and personnel · 7 Shipboard operations · 8 Emergency preparedness · 9 Reports and analysis of non-conformities, accidents and hazardous occurrences · 10 Maintenance of the ship and equipment · 11 Documentation · 12 Company verification, review and evaluation.

Certification runs in two parts. The Document of Compliance (DOC) is issued to the company for each ship type it operates, valid five years, subject to annual verification. The Safety Management Certificate (SMC) is issued to the individual ship, valid five years, subject to at least one intermediate verification between the second and third anniversary dates. A copy of the DOC must be carried aboard. Interim certificates exist for new companies, new ships or new ship types: an Interim DOC is valid twelve months, an Interim SMC six months.

The word to hold onto is *effective*. A shelf of procedures nobody follows is not an SMS. Your evidence must show the system working.`,
  },
  {
    title: "3. Auditing the System Ashore: Policy, Responsibility and the DPA",
    content: `Sections 2 to 6 of the ISM Code describe the shore-side spine of the system. Weakness here shows up later as recurring shipboard problems, so audit it first.

**Section 2 — Policy.** The company must have a safety and environmental protection policy, and must ensure it is implemented and maintained at all levels. Evidence is not the framed poster in the alleyway; it is whether crew can connect the policy to something they actually do.

**Section 3 — Responsibility and authority.** Responsibilities must be defined and documented, and the company must provide adequate resources and shore-based support. Look at the organisational chart, then test it: ask who authorises an unbudgeted spare part and see whether the answer matches the document.

**Section 4 — Designated Person Ashore.** The DPA is the Code's most distinctive feature. This person must have direct access to the highest level of management, monitor the safety and pollution-prevention aspects of each ship's operation, and ensure adequate resources and shore support are applied. As an auditor, verify three things: the DPA is formally appointed and identified to the ships, crew know who the DPA is and how to reach them, and the access to top management is real. If every DPA communication is routed through a fleet manager who filters it, section 4 is not met, however good the appointment letter looks.

**Section 5 — Master's responsibility and authority.** The SMS must contain a clear statement emphasising the master's overriding authority to make decisions for safety and pollution prevention and to request the company's assistance. The master must also periodically review the SMS and report deficiencies ashore. Ask for the master's review and check the company responded to it.

**Section 6 — Resources and personnel.** Covers qualification, familiarisation for newly assigned personnel, a working language understood by all, and training needs identification. Familiarisation records for the most recently joined rating are one of the fastest ways to test whether this section is alive.`,
  },
  {
    title: "4. Auditing Operations: Sections 7 to 12",
    content: `**Section 7 — Shipboard operations.** The company must establish procedures, plans and instructions for key shipboard operations concerning the safety of personnel, the ship and protection of the environment. This is where MARPOL bites: garbage management, oil record book entries, sewage and Annex VI fuel changeover all sit here. Enclosed-space entry, hot work, bunkering, mooring and navigation in restricted visibility are the operations that most often reveal gaps between the written procedure and the practice on deck.

**Section 8 — Emergency preparedness.** Identify potential emergency shipboard situations, establish procedures to respond, and establish programmes for drills and exercises. Check the drill matrix against the identified emergencies. A ship that drills fire and abandon ship faithfully but has never drilled a scenario its own risk assessment identified — steering gear failure, cargo shift, piracy — has a gap.

**Section 9 — Reports and analysis of non-conformities, accidents and hazardous occurrences.** The SMS must ensure these are reported, investigated and analysed with the objective of improving safety and pollution prevention, and that corrective action is taken. Near-miss reporting sits here. Zero reports in twelve months is a finding, not a triumph — it almost always means the reporting culture has failed.

**Section 10 — Maintenance.** Inspections at appropriate intervals, reporting and correction of non-conformities, and records kept. Critically, the company must identify equipment and technical systems the sudden operational failure of which may result in hazardous situations — *critical equipment* — and provide specific measures to promote reliability, including regular testing of stand-by arrangements. Ask for the critical equipment list and evidence the tests actually happen.

**Section 11 — Documentation.** Valid documents at all relevant locations, obsolete documents promptly removed, changes reviewed and approved by authorised personnel.

**Section 12 — Company verification, review and evaluation.** The company must carry out internal safety audits aboard and ashore at intervals not exceeding twelve months (exceptionally extendable by no more than three), periodically evaluate the SMS's effectiveness, and ensure personnel auditing an area are independent of it unless impracticable due to the size and nature of the company.`,
  },
  {
    title: "5. MLC 2006: Structure, Certification and the DMLC",
    content: `The Maritime Labour Convention 2006 is often called the fourth pillar of international maritime regulation, alongside SOLAS, MARPOL and STCW. It consolidates dozens of earlier ILO instruments into one convention covering seafarers' living and working conditions.

Its structure is unusual and worth learning properly. There are **Articles** and **Regulations** setting out broad rights and obligations, and then the **Code**, which has two parts: **Part A** contains mandatory Standards, and **Part B** contains non-mandatory Guidelines. A country must give due consideration to Part B but is not bound by it. When you write a finding, cite Part A — a deviation from Part B alone is at most an observation.

The material is organised into five Titles:

- **Title 1** — Minimum requirements for seafarers to work on a ship (minimum age, medical certificate, training, recruitment and placement services).
- **Title 2** — Conditions of employment (seafarers' employment agreements, wages, hours of work and rest, leave, repatriation, manning levels, career development).
- **Title 3** — Accommodation, recreational facilities, food and catering.
- **Title 4** — Health protection, medical care, welfare and social security protection.
- **Title 5** — Compliance and enforcement.

Certification mirrors the ISM pattern: a **Maritime Labour Certificate** valid for a maximum of five years, with an intermediate inspection between the second and third anniversary dates. Alongside it sits the **Declaration of Maritime Labour Compliance (DMLC)**. Part I is drawn up by the flag State and lists the national requirements covering the fourteen inspectable areas. Part II is drawn up by the shipowner and describes the measures adopted to ensure ongoing compliance.

That two-part structure is the auditor's lever. Part II is the shipowner's own written promise. Audit the ship against it: if Part II says galley temperature logs are kept daily and they are not, you have a clean, evidenced finding with no interpretation required.`,
  },
  {
    title: "6. Auditing MLC Onboard: What to Sample and How",
    content: `MLC audits are document-heavy, and the documents are unusually easy to falsify — which is exactly why sampling technique matters.

**Seafarers' Employment Agreements (SEAs).** Every seafarer must have an SEA signed by both the seafarer and the shipowner or representative, with the seafarer having had an opportunity to review and seek advice before signing. An original signed copy must be held onboard. Sample across ranks, not just officers.

**Hours of work and rest.** Minimum rest is 10 hours in any 24-hour period and 77 hours in any seven-day period. Rest may be divided into no more than two periods, one of which must be at least six hours, and the interval between consecutive rest periods must not exceed 14 hours. Records must be maintained and the seafarer given a copy endorsed by the master or authorised person. The classic finding is not a missing record but a *too-perfect* one: rest hours that never breach, on a ship running short-sea port calls with a small crew, deserve cross-checking against the deck logbook, cargo operations records and port arrival times.

**Repatriation.** Seafarers are entitled to repatriation at no cost to themselves, and the maximum continuous period of service onboard before entitlement arises is less than twelve months. Check crew lists for anyone approaching that limit and confirm financial security documentation is posted.

**Accommodation, food and catering.** Verify potable water testing, provisions in suitable quantity and quality, and that the ship's cook is trained and qualified. Inspect physically — this is one area where walking the space beats reading the file.

**Onboard complaint procedures.** The ship must have fair, effective and expeditious procedures allowing complaint without victimisation, and every seafarer must be given a copy. Ask a rating to explain the procedure in their own words. If they cannot, the requirement to inform is not met regardless of what is posted.`,
  },
  {
    title: "7. The ISPS Code: Structure, Roles and Security Levels",
    content: `The International Ship and Port Facility Security Code was adopted in 2002 and made mandatory through SOLAS Chapter XI-2. Like MLC, it splits into a mandatory **Part A** and a recommendatory **Part B** — and again, findings should cite Part A.

ISPS is risk-based, not prescriptive. It works through three **security levels**:

- **Level 1** — normal; minimum appropriate protective measures maintained at all times.
- **Level 2** — heightened; additional measures maintained for a period of time due to heightened risk.
- **Level 3** — exceptional; further specific measures for a limited period when an incident is probable or imminent, even if the specific target cannot be identified.

The flag Administration or contracting government sets the level; the ship implements it. A ship must always operate at the higher of its own level and that of the port facility it enters.

Three roles carry the system. The **Company Security Officer (CSO)** ensures the Ship Security Assessment is carried out and the Ship Security Plan is developed, approved and maintained. The **Ship Security Officer (SSO)** is accountable to the master for shipboard security, implements and maintains the plan, and liaises with the CSO and PFSO. The **Port Facility Security Officer (PFSO)** holds the equivalent role ashore.

The key documents: the **Ship Security Assessment (SSA)** identifies threats and vulnerabilities; the **Ship Security Plan (SSP)** sets out measures for each security level and is approved by the Administration; the **International Ship Security Certificate (ISSC)** certifies compliance, valid five years with an intermediate verification. The SSP is confidential and protected from unauthorised access — a PSC officer's right to inspect it is limited.

Two related items often confused with ISPS proper: the **Continuous Synopsis Record**, required by SOLAS XI-1, provides an onboard history of the ship; and the **Ship Security Alert System**, required by SOLAS XI-2 Regulation 6, transmits a covert alert ashore — not to the ship's own bridge alarm panel and not to other ships.`,
  },
  {
    title: "8. Auditing ISPS: Access Control, Drills and Records",
    content: `An ISPS audit tests whether the approved plan is being implemented, not whether you would have written a better plan.

**Start with the SSP and work outward.** Read the measures the plan specifies for the current security level, then go and see them. If the plan requires a manned gangway watch with an ID check and visitor log at Level 1, stand at the gangway and observe. Access control failures are the single most common ISPS finding and the easiest to evidence.

**Restricted areas.** The plan identifies them — typically the bridge, engine control room, steering gear compartment, radio room and spaces containing security equipment. Verify they are marked and that the control measures described actually operate.

**Drills and exercises.** Security drills should be conducted at least once every three months, and additionally within one week whenever more than 25 percent of the crew has changed and has not previously participated in a drill aboard that ship within the last three months. Exercises, which are larger and may involve the company, port facilities and other authorities, should be carried out at least once each calendar year with no more than eighteen months between them. Check the records against the crew change list — the 25 percent trigger is routinely missed.

**Declaration of Security (DoS).** A DoS is completed when the ship and a port facility (or another ship) agree on the security measures each will undertake during an interface — typically at higher security levels, or where a security risk exists to people, property or the environment. Verify retention against the plan's stated period.

**Records.** SSP-specified records must be kept for the minimum period the Administration specifies — commonly covering the last ten port calls for security level changes, drills, threats and breaches.

**Internal audits.** The SSP must provide for internal audits of security activities. Verify they occur, that the auditor was independent of the activities audited where practicable, and that findings were closed out.`,
  },
  {
    title: "9. Audit Technique: Planning, Sampling and Objective Evidence",
    content: `Technique is what separates an auditor from someone walking round with a clipboard. ISO 19011 provides the generally accepted framework, and its principles map cleanly onto ISM, MLC and ISPS work.

**Objective evidence** is defined in the ISM Code as quantitative or qualitative information, records or statements of fact pertaining to safety or to the existence and implementation of an SMS element, which is based on observation, measurement or test and which can be verified. Three consequences follow. Evidence must be verifiable — "the chief engineer said maintenance is up to date" is not evidence unless you saw the records. Evidence must be specific — record the document number, the date, the equipment tag. And evidence must be reproducible — another auditor looking at the same material should reach the same conclusion.

**Plan before you board.** Review the previous audit report and its open findings, the ship's PSC history, the certificate status, recent incident and near-miss reports, and the master's review. This tells you where to spend your limited hours.

**Sample deliberately.** You cannot check everything, so choose to defeat your own assumptions. Vertical sampling follows one thread all the way through: pick a single near-miss report and trace it from the initial report, to the investigation, to root cause, to corrective action, to verification of effectiveness, to whether the lesson reached the rest of the fleet. Horizontal sampling checks one requirement across many instances: pull twelve rest-hour records across six ranks.

**Interview well.** Open questions produce evidence; closed questions produce yes. Ask "show me what you would do if…" rather than "do you know the procedure?" Interview at the workplace, not in the ship's office. Talk to ratings, not only officers.

**Stay in scope and stay professional.** You audit against the requirement, not against your own preferences. And you never audit your own work — independence is a Code requirement, not a courtesy.`,
  },
  {
    title: "10. The Shipboard Audit Thread: Running It in Order",
    content: `A shipboard internal audit is not a random walk through a checklist. It runs in a deliberate sequence, because each stage tells you where to aim the next one. Learn the thread and you will audit faster and find more.

**1. Certification status.** Start with the Document of Compliance copy and the ship's Safety Management Certificate, and confirm the endorsements are current. Confirm too that the company named on the DOC is the entity actually managing the ship. A mismatch here is not paperwork pedantry — it means the certificate may not cover the operation in front of you.

**2. Statutory certificates and records.** Class and statutory certificates, survey records, cargo gear registers. Check the ship's own certificate validity list and confirm the Master is genuinely tracking expiries rather than discovering them at survey.

**3. Manning and competency.** Compare the crew list against the Minimum Safe Manning Document. Then verify certificates of competency against STCW, flag State endorsements where the certificate was issued by another country, medical certificates, and watchkeeping certification for ratings. Where a collective bargaining agreement applies, confirm it and the employment agreements are held onboard.

**4. SMS documentation.** Which version of the manual is aboard, where the controlled copies are held, whether revisions are recorded, whether superseded versions have actually been removed, and whether the documents are in a language the crew can read — the last of which you test by asking a rating, not by reading the cover.

**5. The previous audit.** Its findings, the corrective actions, and whether those actions were effective. Anything still open here reshapes your plan for the rest of the day.

**6. Master's responsibility and authority.** Does the Master know his overriding authority and where it is written? Has he conducted his periodic SMS review and reported deficiencies ashore? Did the company respond?

**7. Training, familiarisation and drills.** Familiarisation for newly joined crew within the SOLAS timeframe, the drill programme against the emergencies the ship itself identified, and lifeboat launching intervals.

**8. Emergency preparedness and deficiency history.** Emergency contact information posted and current; any casualty, near miss or port State control intervention since the last audit, and how each was reported, investigated and closed.

**9. The tour.** Only now do you walk the ship — bridge, engine room, deck, accommodation, galley. By this point the documents have told you exactly what to look at. A ship with a thick file of hardware deficiencies from recent PSC inspections gets a maintenance-focused tour; a ship with weak drill records gets its muster list, life-saving appliances and emergency equipment examined closely.

The discipline to hold onto: paperwork points, the tour confirms. Never audit only one.`,
  },
  {
    title: "11. Findings: Grading, Writing and Closing Out",
    content: `A finding is a product. It should be clear enough that a superintendent reading it six months later, with no memory of the audit, knows exactly what was wrong and why it mattered.

**The three grades.**

A **non-conformity** is an observed situation where objective evidence indicates the non-fulfilment of a specified requirement.

A **major non-conformity** is an identifiable deviation that poses a serious threat to personnel or the ship or a serious risk to the environment, requiring immediate corrective action. Critically, it also includes the lack of effective and systematic implementation of a requirement of the Code. That second limb is what turns a pattern of small failures into a major: one missing rest-hour record is a non-conformity, but no rest-hour records for any rating for four months is systemic, and therefore major.

An **observation** is a statement of fact substantiated by objective evidence that does not constitute a non-conformity — a weakness that could become one, or a Part B guideline not followed.

**Writing a finding.** Use three components: the requirement (which Code, which section), the evidence (what you saw, where, when, with identifiers), and the deviation (the gap between them). Write facts, never opinions or solutions. "Crew are careless with enclosed spaces" is an opinion. "SMS procedure OP-14 requires atmosphere testing immediately before entry and at intervals during occupancy; the permit for No.2 ballast tank dated 14 March records a single test at 0810 for an entry lasting until 1150" is a finding.

**Closing out.** The ship or company proposes corrective action, and the auditor's job is to test whether it addresses the *cause* rather than the instance. Retraining one seafarer who filled in a form incorrectly is a correction; revising the form, the procedure and the verification step is corrective action. Major non-conformities must be downgraded or closed before the certificate is endorsed, within the agreed timescale. Verify effectiveness at the next audit — a finding that recurs was never closed.`,
  },
  {
    title: "12. Practical Demonstration: A Real Car Carrier Audit",
    content: `This module is the assessed practical demonstration for AUK SPM 015. It is built on an actual combined ISM, ISPS and MLC internal audit. Vessel, company and personnel details have been removed; the findings, timings and conditions are as recorded.

**The audit.** A pure car carrier of roughly 3,500 standard car capacity, built 2010, ten car decks plus a garage deck. Alongside a RoRo berth in Durban, loading vehicles. Opening meeting 1845–1915 on day one with the Master, Chief Officer, Chief Engineer, Second Engineer and Third Officer; audit work 1845–2100 that evening and 0600–1545 the following day; closing meeting 1500–1530 with the Master, Chief Engineer, Chief Officer and Third Officer. Twelve hours of audit time across two days, covering document checks, a tour of deck, bridge, accommodation, cargo bays, engine room and steering gear, safety equipment checks, and interviews.

**The ship's condition going in.** No pending conditions of class. No deficiencies at the last port State control inspection, and none at the class and flag annual surveys. Planned maintenance running in a computerised system, with some non-critical items overdue in the current month but nothing carried over from the previous month. Security measures appropriate to level 1. Crew motivated, carrying stop-work cards, aware of emergency duties. Lifeboat engines, emergency generator and oily water separator tested satisfactorily; bilge, boiler, incinerator, water treatment plant and fire alarms simulated satisfactorily. Against that background, a weak audit finds nothing.

**What it actually found — eight items, all graded Observation, no non-conformities:**

1. Cardboard packaging cartons stored inside the provision reefer chamber; provisions not properly shelved.
2. Two randomly selected cargo deck fire hydrants could not be opened — handwheels seized.
3. I-beams and T-beams used for lifting in the engine room carried no Safe Working Load markings.
4. The anti-bullying and sexual harassment policy was not posted, and crew awareness of it was limited.
5. Loose cotton rags in the engine room.
6. A soft patch on the emergency air compressor exhaust pipe indicating a leak.
7. The Medical Chest Certificate could not be produced.
8. Crew were hesitant and lacked confidence during audit interviews.

**Your tasks.**

**Task 1 — Map each finding to its requirement.** For all eight, name the instrument and section: ISM Code, MLC 2006 Title and Standard, ISPS Part A, or the SOLAS chapter. Some map to more than one. Item 4 in particular rewards knowing what the 2018 MLC amendments introduced on harassment and bullying.

**Task 2 — Test the grading.** All eight were graded Observation. Take item 2 — two fire hydrants that cannot be opened — and argue both cases: that it is an Observation, and that it is a non-conformity under ISM 10.1. Then state which you would issue and why. There is no single marked answer; the marks are in the reasoning, and specifically in whether you address the sampling question. Two hydrants failed out of a random sample. What would you have needed to establish before you could grade it either way?

**Task 3 — Distinguish finding from cause.** Item 8 is not really a finding about the crew. Explain what it is evidence of, and why an auditor who writes it up as a crew shortcoming has misread it.

**Task 4 — Write two findings properly.** Choose any two of the eight and rewrite them in the requirement/evidence/deviation structure from Module 11. The originals name the problem but do not always cite the requirement or fix the evidence with enough specificity — closing that gap is the exercise.

**Task 5 — The report itself.** The report as issued carried a report date preceding the date of the audit it describes. Explain, in two or three sentences, what such an error costs an auditor when the report reaches a superintendent, a flag State or a court — and what it implies about the review step before issue.

**How it is assessed.** Marks go to correct instrument mapping, defensible grading with the sampling logic made explicit, and the requirement/evidence/deviation discipline. Task 2 carries the most weight.

Complete the quiz and this demonstration to be issued your certificate.`,
  },
  {
    title: "13. Running the Audit: Notification, Meetings and Close-Out",
    content: `Modules 9 to 11 covered how to audit. This one covers the procedural discipline around it — the part that determines whether your findings survive contact with a superintendent, a flag State or a court.

**Notification.** Give the vessel at least two weeks. The notification states the scope (ISM, ISPS, MLC or combined), the dates and expected duration, the auditor's name and the authority under which they audit, and the documents to be made available. A vessel that is ambushed produces defensive answers and hastily assembled paperwork, which is worse evidence, not better.

**Announced or unannounced.** Both are legitimate and the annual programme should contain both. Announced audits get you depth — the records are out, the people are available, you cover more ground. Unannounced audits get you reality, and are particularly worth doing where rest hours are the concern, because a rest-hour system that is real looks the same on any day of the week and one that is manufactured does not.

**The opening meeting.** Brief, with the master and relevant heads of department. Confirm the scope, the process, the expected duration, and that the vessel will see the findings before the report is issued. Say plainly that the audit is a quality review rather than a disciplinary exercise, and then behave as though it is.

The tone of this meeting sets the tone of the audit. An auditor who opens confrontationally gets a defensive crew, guarded answers and documents produced one at a time. An auditor who opens as a professional colleague gets shown the things that are actually wrong. Your attitude determines the quality of the evidence you receive, which means it determines the quality of the audit.

**Evidence by three methods, always all three.** Document review tells you what should happen. Interview tells you what people believe happens — ask "walk me through what happens when you need to enter the void space under number two hold", never "is the enclosed space procedure followed?". Observation tells you what actually happens: a toolbox talk, a watch handover, a drill. The gaps between the three are where the findings are.

**The closing meeting.** Present the draft findings and their grades to the master before you leave, and give him the opportunity to produce evidence or context you did not have. Correct genuine factual errors. Do not change a grading because the room is uncomfortable — a grade you softened under social pressure is a grade you will have to defend later without the pressure to explain it. Record the master's comments in the report whether or not you agree with them.

**The report.** Within five working days. Every non-conformity and major non-conformity carries a Non-Conformance Report stating the requirement not met with its specific Code reference, the objective evidence, the agreed corrective action, the responsible person and the target close-out date. An NCR missing any one of those cannot be closed out, because there is nothing definite to verify against.

**Close-out.** The audit is not finished when the report is issued. It is finished when the findings are closed, and closure requires objective evidence that the action was implemented — not that it was planned. A revised procedure with signatures. A training record. A maintenance entry. A photograph of the physical repair. "Confirmed complete by the master" is not close-out evidence.

**Why the timelines matter commercially.** An open non-conformity from your own internal audit, found by port State control before you closed it, becomes a PSC deficiency and possibly a detention. You identified the problem, documented it, and then left it sitting where an inspector could find it. That is a worse position than never having audited, because the record shows you knew.

**The four-stage cycle, documented at each stage.**

| Stage | Activities | Output |
| --- | --- | --- |
| Plan | Scope, criteria, checklist, notification | Audit plan and notification letter |
| Conduct | Opening meeting, documents, interviews, observation, closing meeting | Completed checklist, finding notes |
| Report | Grade findings, write NCRs, issue report | Audit report, NCR forms |
| Follow-up | Corrective action, evidence review, verification | Corrective action record, close-out sign-off |

A stage without its output document did not happen, as far as anyone reading the file afterwards is concerned.

---

## Working a full audit on the AUK audit platform

This course has taught the method. The complete question set — ISM, ISPS, MLC and Q-SET scopes, structured the way an audit actually runs — sits on the AUK ship internal audit platform, together with the findings register, non-conformity classification and report generation described in Modules 11 and 13.

Access is available to learners on request.

**To request access:** email **info@auk-maritime.com**

**Platform:** https://audit.auk-maritime.com/

**Cost:** R950 per month. Cancel at any time.

Running a full audit through the question set, grading the findings and producing the report is the closest thing to a real audit short of boarding a ship. If you intend to audit, this is the tool the work is done in, and knowing it before your first audit is worth considerably more than the monthly cost.`,
  },
];

export const aukSpm015Quiz = [
  {
    q: "Under the ISM Code, internal safety audits must be carried out aboard and ashore at intervals not exceeding:",
    options: [
      "Six months",
      "Twelve months, exceptionally extendable by no more than three months",
      "Twenty-four months",
      "Five years, aligned with the Safety Management Certificate",
    ],
    answer: 1,
  },
  {
    q: "Which statement best describes the Designated Person Ashore under ISM section 4?",
    options: [
      "A senior officer aboard the ship who reports directly to the master",
      "A surveyor appointed by the flag Administration to verify the SMS",
      "A shore-based person with direct access to the highest level of management who monitors safety and pollution-prevention aspects of each ship's operation",
      "The company's insurance representative, contacted only after an incident",
    ],
    answer: 2,
  },
  {
    q: "Under MLC 2006, what is the minimum rest requirement?",
    options: [
      "8 hours in any 24-hour period and 70 hours in any seven-day period",
      "10 hours in any 24-hour period and 77 hours in any seven-day period",
      "12 hours in any 24-hour period and 84 hours in any seven-day period",
      "10 hours in any 24-hour period and 72 hours in any seven-day period",
    ],
    answer: 1,
  },
  {
    q: "Who draws up Part II of the Declaration of Maritime Labour Compliance?",
    options: [
      "The flag State Administration",
      "The shipowner",
      "The port State control authority",
      "The seafarers' representative organisation",
    ],
    answer: 1,
  },
  {
    q: "Under the ISPS Code, security level 2 means:",
    options: [
      "The level at which minimum protective measures are maintained at all times",
      "The level at which additional protective measures are maintained for a period of time due to heightened risk",
      "The level at which further specific measures are maintained for a limited period when an incident is probable or imminent",
      "The level applied only while a ship is in international waters",
    ],
    answer: 1,
  },
  {
    q: "Security drills under the ISPS Code should be conducted at least:",
    options: [
      "Once every month",
      "Once every three months",
      "Once every six months",
      "Once each calendar year",
    ],
    answer: 1,
  },
  {
    q: "Which of the following would most properly be graded a MAJOR non-conformity?",
    options: [
      "One rest-hour record in a sample of twelve is missing a signature",
      "A Part B guideline of the ISPS Code has not been followed, although Part A is met",
      "No rest-hour records have been maintained for any rating over the past four months",
      "A fire-drill entry records the drill as lasting 25 minutes rather than the 30 minutes stated in the SMS",
    ],
    answer: 2,
  },
  {
    q: "In both the MLC 2006 and the ISPS Code, what is the status of Part B?",
    options: [
      "Mandatory, with the same legal force as Part A",
      "Guidance which must be given due consideration but is not itself mandatory",
      "Applicable only to ships below 500 gross tonnage",
      "Superseded by the III Code",
    ],
    answer: 1,
  },
  {
    q: "Which of these qualifies as objective evidence for an audit finding?",
    options: [
      "The chief engineer's assurance that planned maintenance is fully up to date",
      "The auditor's professional judgement that the crew appear poorly trained",
      "A permit to work dated 14 March for No.2 ballast tank recording a single atmosphere test at 0810 for an entry lasting until 1150",
      "A general impression that the engine room is untidier than on comparable vessels",
    ],
    answer: 2,
  },
  {
    q: "During a shipboard audit you find the company named on the Document of Compliance is not the entity actually managing the ship, and no management agreement is held onboard. Why does this matter?",
    options: [
      "It does not — the DOC is a company document and only the SMC applies to the ship",
      "It suggests the certified safety management system may not cover the operation actually being conducted",
      "It is a MARPOL matter rather than an ISM one",
      "It only matters if the ship is registered under a flag that requires it",
    ],
    answer: 1,
  },
  {
    q: "In what order should a shipboard internal audit normally be conducted?",
    options: [
      "Physical tour first, so findings can be confirmed against documents afterwards",
      "Documents and records first, then the physical tour, which the document review has told you where to target",
      "Crew interviews only, since documents can be reviewed ashore",
      "Whichever order the Master's schedule permits — sequence has no bearing on audit quality",
    ],
    answer: 1,
  },
  {
    q: "Cardboard packaging cartons are found stored inside a provision refrigerated chamber. Which requirement does this most directly engage?",
    options: [
      "ISPS Part A, because provision spaces are restricted areas",
      "MLC 2006 Title 3, covering food and catering and the hygienic storage of provisions",
      "SOLAS Chapter V, on navigational safety",
      "MARPOL Annex V, because cardboard is garbage",
    ],
    answer: 1,
  },
  {
    q: "During a tour, two randomly selected cargo deck fire hydrants cannot be opened because the handwheels are seized. Before grading this, what does an auditor most need to establish?",
    options: [
      "Whether the Master agrees the hydrants are seized",
      "Whether the failure is isolated or indicates that the maintenance regime for hydrants across the ship is not being implemented",
      "Whether the vessel has been detained for this previously",
      "Whether the hydrants are listed on the ship's critical equipment list",
    ],
    answer: 1,
  },
  {
    q: "An audit records that crew were hesitant and lacked confidence when answering questions. How should this best be understood?",
    options: [
      "As a competence finding against the individual crew members interviewed",
      "As evidence bearing on familiarisation, training and the ship's safety culture, rather than a shortcoming of the individuals",
      "As grounds to extend the audit until the crew answer correctly",
      "As outside the scope of an ISM audit entirely",
    ],
    answer: 1,
  },
  {
    q: "A vessel has nil deficiencies at its last port State control inspection, nil at the flag annual, and nil at the last class audit. What does this imply for the internal auditor?",
    options: [
      "The internal audit can be reduced in scope, as external bodies have already verified compliance",
      "A clean external record raises rather than lowers the standard of evidence the internal auditor must gather before reporting nothing",
      "Any finding raised would contradict the external inspections and should be downgraded",
      "The internal audit interval may be extended beyond twelve months",
    ],
    answer: 1,
  },
  {
    q: "A near-miss report is closed by retraining the individual seafarer who filled in the form incorrectly. As an auditor, how should you assess this?",
    options: [
      "Acceptable — the immediate problem has been addressed and the finding may be closed",
      "It is a correction rather than corrective action, because the underlying cause has not been addressed",
      "Unacceptable, because ISM section 9 prohibits training as a response to a near miss",
      "Acceptable only if the seafarer subsequently passes a written test",
    ],
    answer: 1,
  },
  {
    q: "How far in advance should a vessel normally be notified of a planned internal audit?",
    options: ["24 hours", "At least two weeks", "Three months", "Notification is not required for internal audits"],
    answer: 1,
  },
  {
    q: "Which is the strongest argument for including unannounced audits in the annual programme?",
    options: [
      "They are cheaper, because no notification has to be prepared",
      "A rest-hour system that is genuine looks the same on any day, and one that is manufactured does not",
      "Flag States require at least one unannounced audit per year",
      "They produce more findings, which demonstrates auditor diligence",
    ],
    answer: 1,
  },
  {
    q: "At the closing meeting the master argues strongly that a non-conformity should be downgraded to an observation. He offers no new evidence. What should the auditor do?",
    options: [
      "Downgrade it, since the master knows the vessel better than the auditor",
      "Hold the grading, record the master's comments in the report, and let the evidence stand",
      "Defer the decision to the DPA without recording the finding",
      "Remove the finding and raise it at the next audit if it recurs",
    ],
    answer: 1,
  },
  {
    q: "Within what period should the audit report normally be completed after the audit?",
    options: ["Same day", "Five working days", "One month", "Before the next scheduled audit"],
    answer: 1,
  },
  {
    q: "Which of these is acceptable close-out evidence for a non-conformity about an out-of-date procedure?",
    options: [
      "An email from the master confirming the matter has been dealt with",
      "The revised procedure, with the crew acknowledgement signatures",
      "A note in the audit file recording that corrective action was agreed",
      "The vessel's assurance that the procedure will be revised at the next SMS review",
    ],
    answer: 1,
  },
  {
    q: "An NCR is raised without a target close-out date. Why is this a problem?",
    options: [
      "It is not a problem provided the responsible person is named",
      "There is nothing definite to verify against, so the finding cannot be closed",
      "The flag State will reject the audit report",
      "The NCR automatically escalates to a major non-conformity",
    ],
    answer: 1,
  },
  {
    q: "The vessel's SMS requires a weekly safety meeting. The log shows meetings held in 8 of the last 12 weeks, with no recorded reason for the four missed. How should this be graded?",
    options: [
      "Observation — the meetings were mostly held",
      "Non-conformity — a specific failure to meet a stated SMS requirement",
      "Major non-conformity — safety meetings are a critical safety function",
      "No finding — meeting frequency is guidance, not a requirement",
    ],
    answer: 1,
  },
  {
    q: "The International Ship Security Certificate expired three weeks ago and the vessel has continued in international trade. The renewal audit is booked for next month. Grade this finding.",
    options: [
      "Observation — the renewal is already arranged",
      "Non-conformity — a certificate administration failure",
      "Major non-conformity — the vessel is trading in breach of SOLAS Chapter XI-2",
      "No finding — a booked renewal audit maintains validity",
    ],
    answer: 2,
  },
  {
    q: "Rest-hour records show every crew member at exactly the minimum compliant figure every day for three months, with no exceptions recorded. Interviews with ratings reveal they regularly work through rest periods in port. Grade this.",
    options: [
      "Observation — the records are compliant on their face",
      "Non-conformity — some individual records are inaccurate",
      "Major non-conformity — systemic falsification of rest-hour records",
      "No finding — ratings' recollections are not objective evidence",
    ],
    answer: 2,
  },
  {
    q: "The medicine chest inventory was last checked 14 months ago against a 12-month company requirement, and three medications are two months past expiry. Grade this.",
    options: [
      "Observation — the overrun is small",
      "Non-conformity — an overdue inspection and expired medications against a stated requirement",
      "Major non-conformity — expired medication is an immediate threat to life",
      "No finding — medicine chest checks are a flag State matter, not an audit item",
    ],
    answer: 1,
  },
  {
    q: "The Security Log has not been updated for six weeks. The SSO explains that nothing happened, so there was nothing to write. The SSP requires weekly entries. Grade this.",
    options: [
      "No finding — the SSO's explanation is reasonable",
      "Observation — a documentation habit that could improve",
      "Non-conformity — the SSP requires weekly entries and they were not made",
      "Major non-conformity — security record failures are always major",
    ],
    answer: 2,
  },
  {
    q: "Which combination of evidence-gathering methods should a competent audit use?",
    options: [
      "Document review alone, since records are the only verifiable evidence",
      "Document review and interview, with observation reserved for follow-up audits",
      "Document review, interview and observation — all three, in every audit",
      "Observation alone, since records can be prepared in advance",
    ],
    answer: 2,
  },
  {
    q: "A Ship Security Plan was approved by the flag State four years ago. The vessel has since changed trade routes and ownership, and the SSP has not been amended. What is this?",
    options: [
      "No finding — SSP approval is valid for five years",
      "An observation, pending the next renewal",
      "A non-conformity — the SSP must reflect the vessel's actual operating environment",
      "A matter for the CSO alone, outside internal audit scope",
    ],
    answer: 2,
  },
  {
    q: "Why does an open internal-audit non-conformity found later by port State control leave the company worse off than if no audit had been done?",
    options: [
      "PSC penalties are doubled where an internal audit exists",
      "The record shows the company identified the problem and left it uncorrected",
      "Internal audit reports must be surrendered to PSC on request",
      "It invalidates the Safety Management Certificate automatically",
    ],
    answer: 1,
  },
];

export const aukSpm015Practical = {
  title: "Combined ISM, ISPS and MLC Audit — Car Carrier Case Study",
  description: `Built on an actual combined internal audit of a pure car carrier alongside in Durban. Vessel, company and personnel details removed; findings, timings and conditions as recorded.

Eight findings were raised, all graded Observation, against a vessel with no pending conditions of class, no PSC deficiencies and a motivated crew. Candidates map each finding to its instrument and section, test the grading of the seized fire hydrants by arguing both cases and resolving the sampling question, distinguish the crew-hesitancy finding from the cause it actually evidences, rewrite two findings in requirement/evidence/deviation structure, and account for the report-date error in the original.

Assessed on correct instrument mapping, defensible grading with sampling logic made explicit, and the requirement/evidence/deviation discipline. The fire hydrant grading carries the most weight.

Full brief and tasks in Module 12.`,
};

export const aukSpm015Outcomes = [
  "Explain the purpose, scope and legal basis of internal audit under the ISM Code, ISPS Code and MLC 2006",
  "Plan an audit from certificate status, PSC history, previous findings and incident records",
  "Apply ISO 19011 principles to maritime audit: objective evidence, independence, vertical and horizontal sampling",
  "Conduct audit interviews that produce evidence rather than agreement",
  "Grade findings as observation, non-conformity or major non-conformity, including the systemic-implementation limb",
  "Write findings in requirement, evidence and deviation structure that survive external scrutiny",
  "Run the audit process from notification through opening and closing meetings to report and close-out",
  "Distinguish correction from corrective action, and verify close-out against objective evidence",
  "Audit the ISM Code's sixteen sections, the ISPS Part A security requirements, and the five MLC Titles",
];

export const aukSpm015Summary =
  "Train as a competent internal auditor across the three frameworks that govern every ship in international trade — the ISM Code, the ISPS Code and MLC 2006. Built on ISO 19011 principles and taught from real audit practice, covering planning, sampling, objective evidence, interview technique, finding grading, report writing and close-out verification. The assessed practical is a genuine combined audit of a car carrier in Durban.";

export const aukSpm015 = {
  code: "AUK SPM 015",
  title: "ISM, MLC & ISPS Auditor",
  summary: aukSpm015Summary,
  outcomes: aukSpm015Outcomes,
  modules: aukSpm015Modules,
  quiz: aukSpm015Quiz,
  practical: aukSpm015Practical,
  passMark: 70, // 21 of 30
};

/**
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links. Items 1-5 exist as tables
 * in the source facilitator guide and need only extraction.
 *   1. ISM audit checklist — all 16 sections, evidence column, finding column
 *   2. ISPS audit checklist — Part A references, ISSC, SSP, SSO, drills, SSAS test
 *   3. MLC audit checklist — five Titles, rest hours, SEAs, accommodation, complaints
 *   4. Internal Audit Report template
 *   5. Non-Conformance Report (NCR) template
 *   6. Finding classification quick-reference — OBS / NC / MNC with required response
 *   7. Audit notification letter template
 *
 * Items 4 and 5 carry the most practical weight — candidates who leave with usable
 * templates will actually run audits; candidates who leave with theory will not.
 *
 * NOTE ON THE SOURCE GUIDE: the facilitator guide claims TETA accreditation in section
 * 1.1 and in the Appendix C certificate footer. That claim is not currently held and has
 * deliberately been kept out of this course content, the certificate template and the
 * verification page. Correct it in the participant handout before the next intake.
 */
