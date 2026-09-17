/**
 * AUK-499 — HELM Management Level
 * Human Element, Leadership & Management · IMO Model Course 1.40
 * STCW Tables A-II/2 (Master / Chief Mate) & A-III/2 (Chief Engineer / 2nd Engineer)
 *
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCE
 * Derived from "HELM — Management Level Facilitator Guide", AUK Marine & Mining,
 * v1.0 2026, prepared by Capt. Ashwani Pathak. AUK's own material.
 *
 * PREREQUISITE: HELM Operational Level (AUK S 40) or equivalent. This is the
 * capstone leadership qualification for senior officers and a mandatory
 * prerequisite for a Management Level CoC.
 *
 * FACILITATOR MATERIAL STRIPPED — as with AUK S 40. Removed: all FACILITATOR NOTE
 * blocks (including those directing the facilitator to draw on surveyor, auditor
 * and Training Assessor experience), session timing tables, activity debrief
 * answers, and the assessment competency matrix. Two removals worth naming
 * because they are the point of their exercises:
 *   - "Steps 1, 2 and 8 are the most commonly missed" (Kotter debrief answer)
 *   - the completed 5 Whys chain for the sea valve near-miss (Module 7 answer key)
 * A learner who reads either one first has nothing left to discover.
 */

export const auk499Modules = [
  {
    title: "1. From Operational to Management: Strategic Leadership at Sea",
    content: `**Who this course is for**

HELM Management Level is the capstone leadership qualification for senior maritime officers. It is a mandatory prerequisite for a Management Level Certificate of Competency under STCW 2010.

**Regulatory basis**

- STCW Regulation II/2 — Master and Chief Mate on ships of 500 GT or more
- STCW Regulation III/2 — Chief Engineer and Second Engineer on ships of 3,000 kW or more
- STCW Tables A-II/2 and A-III/2 — leadership and management competencies
- IMO Model Course 1.40
- MCA and SAMSA both require HELM(M) as a prerequisite for a management-level CoC

HELM Operational Level is the prerequisite. Operational covers leading a watch; Management covers running a department, a vessel, and a relationship with the shore.

**The transition nobody prepares you for**

There is a point in every senior officer's career that is rarely acknowledged and even more rarely supported: the moment you stop being the best operator in the room and start being responsible for the people who are.

As an OOW your competence was individual. You navigated, you kept the watch, you acted. As a Master your competence is relational — you achieve results through the capability of the people around you. **The skills that got you here are not the skills you need now.** That sentence is uncomfortable and it is the foundation of this entire course.

The most common failure mode for newly promoted Masters and Chief Engineers is continuing to operate at the level they came from. The Master who takes the con at every difficult manoeuvre. Who second-guesses the Chief Mate's cargo plan. Who cannot resist intervening in the engine room. That officer is not leading — he is preventing his officers from developing, and he is exhausting himself doing it.

The transition from **doing** to **enabling** is the central challenge of management-level leadership. Your job is to make your officers better, not to do their jobs for them.

Worth asking yourself before going further: when you were promoted to your current rank, what was the hardest thing to let go of? Most officers answer with the conn, or direct control over technical decisions, or the simple certainty of doing something yourself rather than watching someone else do it less well. Every one of those answers is the transition problem.

**Transactional and transformational leadership**

*Transactional leadership* is management through exchange. You do the job, I pay you, I protect your employment. It is compliance-based, and it works — to a point. A transactional Master gets a compliant crew. They follow the rules. They don't take risks. They also don't take initiative, they don't innovate, and **they don't tell you something is wrong before it becomes a problem.**

*Transformational leadership* inspires people to exceed what is required — to care about the vessel, the work and each other. Transformational leaders articulate a vision, model the values they expect, invest in their people's development, and build an environment where people bring their best to work.

The research is consistent: transformational leadership produces better safety outcomes, lower turnover, higher crew satisfaction and better commercial performance. It is not a shore-based executive style. The best Masters in the world are transformational leaders.

**Two Masters**

Consider two officers with comparable experience and comparable safety records.

*Master A* takes the con personally for every port entry. Master-officer meetings are brief and formal. His officers are technically competent but passive — they wait for direction. Crew turnover on his vessel is high.

*Master B* delegates port entries to qualified Chief Mates under oversight. He holds open-agenda weekly meetings and actively develops officers for command. His officers are proactive and confident. He has retained 60% of his officers across three or more contracts.

The useful question is not which one is right. It is what happens to each vessel when the Master is incapacitated — and what each approach costs and returns to the company over a five-year horizon. Both approaches have predictable consequences. Management-level officers choose between them consciously or by default, and the default is almost always Master A.

**Organisational culture**

Culture on a vessel is not set by the company handbook. It is set by what the senior officers do, tolerate and reward — daily, visibly, and whether or not they are paying attention to the fact that everyone else is.`,
  },
  {
    title: "2. Change Management on Board",
    content: `Every Master and Chief Engineer is required to implement change: new SMS procedures, new equipment, new company policies, revised emergency procedures. Most change efforts on ships fail — not because the change was wrong, but because it was managed badly.

**Kotter's eight steps, applied at sea**

**1. Create urgency.** People need to understand why the change is necessary *now*. Not "the company has decided" — but "here is the accident that happened because this procedure didn't exist, and here is what it would have prevented."

**2. Build a guiding coalition.** Identify the real influencers on board — the experienced AB, the Chief Officer, the senior rating — who can champion the change from inside. You cannot impose culture by instruction.

**3. Develop a vision.** What does success look like? How will you know the change has worked?

**4. Communicate the vision.** Repeatedly, through multiple channels: muster, toolbox talk, posted procedure, one-to-one conversation. Once is not communication.

**5. Empower others to act.** Remove the barriers. If the old procedure is still posted next to the new one, you have created a barrier and you have signalled that you don't take the new one seriously either.

**6. Create short-term wins.** Acknowledge publicly when the new approach works. Small visible successes build belief.

**7. Build on the change.** Don't declare victory early. Embed the new behaviour before moving to the next thing.

**8. Anchor it in the culture.** The change must be built into training, induction, and the way people talk about the job. Until it is in the induction, it depends entirely on the people who happen to be aboard.

**Where shipboard change actually breaks**

Think of a change that was badly implemented on a vessel you served on — a new watchkeeping system, new equipment with inadequate training, an SMS revision that arrived as a circular and nothing else. Then work back through the eight steps and identify which ones were skipped.

Officers who do this exercise honestly usually find the failure was near the beginning or near the end, not in the middle. Ships are reasonably good at the mechanics of communicating a change. They are much weaker at establishing why it matters before it lands, and at embedding it once the initial attention has moved on.

**Resistance**

Resistance is information, not insubordination. "We've done it differently for twenty years" is worth hearing properly before it is overruled. Sometimes it means the person has not understood why the change matters — which is a step 1 failure. Sometimes it means they know something about the operation that whoever wrote the procedure did not. Distinguishing the two is a leadership judgement, and getting it wrong in either direction is costly: overrule a legitimate objection and you lose a safety input; accept an illegitimate one and you have no change.

**A worked situation**

Your company has issued a new enclosed space entry procedure following a fatality on a sister vessel. It adds three steps to the existing checklist and a new communication protocol with the engine room. Crew reaction is mixed — some see it as box-ticking, and two experienced ratings have said they've done it their own way for twenty years.

Design the implementation across all eight steps: who delivers each one, through what channel, on what timeline, and how the resistance gets managed rather than suppressed. The fatality is your step 1, and it is the most powerful thing you have — but only if the crew understand what actually happened and how close it maps to what they do every week.`,
  },
  {
    title: "3. Crew Appraisal & Development Planning",
    content: `Most seafarers have experienced crew appraisal as form-filling at the end of a contract — a box checked for the company, signed by someone who barely knows them, forgotten before the vessel sails. That is not appraisal. It is administration.

**What appraisal is actually for**

A properly conducted appraisal does four things: it recognises achievement, identifies development needs, aligns the individual's goals with the vessel's operational requirements, and creates a record that protects both the officer and the company.

The conversation should be private, uninterrupted, two-way, specific, forward-looking and documented. **The officer being appraised should do at least half the talking.** The best outcomes come when the appraisee arrives having already reflected on their own performance — which means telling them in advance what the conversation is for.

Consider the senior officer who has never received a meaningful appraisal in a thirty-year career. Nobody ever told them what excellent performance looked like. They guessed, and they have been guessing ever since — and they are now appraising other people using the same absence of a standard. A department head who conducts structured appraisals changes careers, not just contracts.

**Structure**

1. **Recognition.** Three specific examples of strong performance, in AID format — the action, its impact, and why it mattered. Specific beats generous: "you handled the Rotterdam berthing well" lands, "you're a good officer" does not.
2. **Development area.** One, occasionally two. Specific behaviour, concrete impact, required standard. More than two and nothing gets acted on.
3. **Agreed action.** What will be done, by whom, by when. Agreed, not imposed — if the appraisee does not believe in the action it will not happen once you are off watch.
4. **Their comments.** In their words, recorded.
5. **Documentation.** Training Record Book reference, signatures, review date.

**Giving developmental feedback to a peer is the hard part**

Appraising a 2nd Officer who is technically strong, well-liked by the crew, and reluctant to give critical feedback themselves — while they are six months into a nine-month contract and hoping for promotion — is genuinely uncomfortable. The temptation is to soften the development point until it disappears, and both parties leave the room relieved and none the wiser.

The officer who is never told about the delegation problem does not get promoted, and never finds out why.

**The department training plan**

Every department head is responsible for the training and development of their team, and STCW requires this to be planned and documented. Most vessels satisfy the requirement with a drill schedule and a Training Record Book. That is the minimum, not the standard.

A genuine department training plan contains: a **skills matrix** (who can do what, to what level), a **gap analysis** (what needs developing), a **training schedule** (how and when gaps get addressed), **OJT session records**, **assessment records**, and a **review date**.

Building the skills matrix is itself a leadership act. Most department heads have never consciously assessed their team this way, and the exercise routinely surfaces two things: a task that only one person can actually do, and a person who is more capable than the department has been using them for. Both are risks and both are invisible until someone maps them.

**Succession planning**

The test of a department head is what happens to the department when they leave. If the answer is that it degrades, the officer has been operating rather than developing. Preparing your replacement is not a threat to your position — it is the substance of the job at this level.`,
  },
  {
    title: "4. ISM Code & Safety Management Culture",
    content: `The ISM Code — Resolution A.741(18) as amended, mandatory under SOLAS Chapter IX — establishes the framework for a Safety Management System on every vessel over 500 GT in international trade. At management level your obligations under it are substantive and personal.

**Who holds what**

The **Designated Person Ashore** holds management-level ISM responsibility from the company side, with direct access to the highest level of management. The **Master** holds it on board. Between them they must ensure the SMS is not merely a document but a living system the crew understands, follows and contributes to improving.

**The Master's ISM responsibilities**

- Implementing the company safety and environmental protection policy
- Motivating the crew in applying that policy
- Issuing orders and instructions in a clear and simple manner
- Verifying that specified requirements are observed
- Reviewing the SMS and reporting deficiencies to shore-based management

That last one is frequently treated as optional. It is not. A Master who identifies an SMS deficiency and does not report it has failed an ISM obligation, whatever the operational reason.

**The certification-compliant, operationally hollow vessel**

The most dangerous SMS is the one that looks correct on paper and is ignored at sea. An experienced auditor or PSC inspector can tell the difference inside twenty minutes — not from the documents, but from what the crew say when asked an open question about a procedure they should know.

More importantly, the crew already know. They can tell whether the Master takes the system seriously, and they calibrate their own behaviour to that. A Master who signs off a checklist he knows was not completed has taught the entire vessel exactly how much the SMS is worth.

**Non-conformances**

A non-conformance is an observed situation where objective evidence indicates a specified requirement has not been met. A *major* non-conformance is an identifiable deviation posing a serious threat to personnel or vessel safety, or a serious risk to the environment, requiring immediate corrective action.

How a management-level officer responds to a raised non-conformance determines whether the next one gets raised at all.

**Near-miss reporting and just culture**

Near-miss reporting is the single most powerful safety tool available on a vessel. Every near-miss reported and investigated is an accident that was prevented. Every near-miss hidden is a future accident waiting for its conditions.

Crew will not report unless they believe reporting is safe. If a report leads to blame, if investigation becomes interrogation, if the reporter becomes the subject — reporting stops. It stops for the whole vessel, not just that individual, because everyone watches what happened to the first person who tried.

**Just culture** is the balance between accountability and learning. Not all errors are equal: an honest mistake inside a complex system is handled differently from reckless disregard for a known risk. The framework has to allow people to report and contribute to learning without fear of unjust punishment — while still holding genuine recklessness to account. Collapse it in either direction and you lose either safety or fairness.

At management level, unlike operational level, you are not merely responding to this culture. You are creating it.`,
  },
  {
    title: "5. Masters' Legal Responsibilities",
    content: `The Master's authority on board is absolute, and their personal liability is substantial. Those two facts are the same fact viewed from different sides.

**Authority and liability**

Under **SOLAS**, the Master has an overriding obligation to take whatever action is necessary for the safety of the ship, crew and passengers, even where this conflicts with instructions from the shipowner or charterer. This is not a discretionary power. It is a legal obligation, and failing to exercise it is itself a failure.

The **Maritime Labour Convention 2006** establishes the Master's responsibilities for crew welfare: working hours, accommodation, food, medical care, repatriation and access to seafarer welfare services. A Master who allows MLC violations on board — including under commercial pressure — is personally liable.

**UNCLOS Article 94** places the duty of care for all persons on board on the flag State, implemented through the Master. Every decision a Master makes is, in law, made on behalf of the flag State.

The Master is simultaneously the most powerful person on the vessel and the most legally exposed. Every management decision carries a legal dimension. Failure to document, to protest, to seek advice, to record — these are not administrative lapses. They are legal failures with commercial and sometimes criminal consequences.

**Letters of Protest**

A Letter of Protest is a formal written notice from the Master to a third party — port authority, stevedores, terminal, charterer — recording that an event has occurred that may lead to a claim, or that instructions have been received which the Master considers potentially harmful to vessel, cargo or crew.

Issue one for: a rough berth causing vessel movement during cargo operations; damage during berthing or unberthing; cargo presented in unsatisfactory condition; dangerous cargo loaded without proper documentation; instructions to deviate from a safe route; and any event where a claim may reasonably follow.

The pattern that costs owners money is the Master who does not protest damage because he does not want to upset the charterer. The commercial relationship he was protecting is not his to protect, and the evidence he did not create is not recoverable later.

**Sea Protest**

A Sea Protest, or Marine Protest, is a formal sworn statement made before a Notary Public or other appropriate authority, describing adverse weather or other exceptional circumstances encountered during a voyage. It is evidence that loss or damage was caused by perils of the sea rather than by negligence, and **it must be noted within the time limits specified by the country of arrival.**

Timing is the whole point. A Sea Protest noted late is frequently worth nothing.

**In loco parentis and crew welfare**

The Master stands in a position of care toward the crew that has no clean shore-side equivalent. Medical decisions, repatriation, welfare, discipline, and the handling of a death on board all fall to the Master, often without immediate professional support and always under time pressure. MLC sets the framework; judgement fills the rest.

**Port State Control**

The Master's obligations during a PSC inspection are to cooperate, to provide accurate documentation, to accompany or nominate a senior officer to accompany the inspector, and to address deficiencies within the timeframes specified. Detention decisions rest with the port State. What the Master controls is whether the vessel presents as a well-run ship — and that judgement is formed in the first twenty minutes, largely from crew responses rather than paperwork.

**Documentation as legal act**

The through-line of this module: the Master's protection is the record. A decision that was correct but undocumented is, two years later in a claim, indistinguishable from a decision that was never made.`,
  },
  {
    title: "6. The Shore-Vessel Management Interface",
    content: `**The DPA relationship**

The Designated Person Ashore is the Master's primary management interface under the ISM Code. In theory the DPA provides a direct link to the highest level of management for any safety issue. In practice the quality of this relationship varies enormously — from a DPA who is a genuine safety champion to one who is a claims-management officer with a different job title.

You do not choose your DPA. You do influence the relationship. An effective Master manages it proactively: reporting beyond the minimum required, raising safety concerns before they become incidents, seeking written clarification on instructions that create conflict, and documenting key decisions and the instructions behind them.

The Masters who get good support from shore are usually the ones who built the relationship before they needed it.

**Commercial pressure against safety obligation**

This is the most common ethical conflict in a senior officer's career. You are instructed to do something commercially beneficial that you believe creates a safety risk. Depart in deteriorating weather. Exceed cargo limits. Proceed through ice without the class endorsement. Accept deck cargo stowed to the charterer's standard rather than yours.

The law is unambiguous — the Master's safety obligation overrides commercial instruction. The practical reality is that Masters who exercise their overriding authority readily sometimes find their contracts not renewed. That tension is real, and pretending it is not is the reason this conversation usually happens badly.

It is not resolved by legal principle alone. It is resolved by documentation, by the DPA relationship, and by an officer who has thought it through in advance.

**Decide your line before you need it.** In the middle of a commercial dispute, under time pressure, with an agent quoting demurrage figures at you, you will not have the clarity to reason it out from first principles. Know in advance what you will and will not do.

**A situation worth thinking through now**

You are Master of a bulk carrier. The charterer has instructed you to depart within four hours. Your Chief Officer reports that the deck cargo securing is marginally compliant with the Code of Practice but, in your professional judgement, inadequate for the forecast sea state over the first twenty-four hours.

The charterer's agent tells you any delay costs USD 45,000 per day in demurrage and could damage the company's relationship with this charterer. Your DPA says: *"Use your judgment, Master."*

Work out your legal position; what you write to the agent; what you write to the DPA; what documentation you create before any departure; and your actual decision, defended.

Note what the DPA's response does. "Use your judgment" sounds like support and is, functionally, the transfer of the entire decision and its consequences to you. Recognising that at the time — and responding in writing in a way that puts the position back on the record — is the management-level skill this scenario is really testing.

**Managing upward**

Influencing decisions you do not control is a core management-level competence. The tools are limited but real: the written record, the early warning, the specific request rather than the general complaint, and the professional relationship built during the periods when nothing is going wrong.`,
  },
  {
    title: "7. Incident Investigation & Post-Incident Review",
    content: `Root cause analysis is the practice of going past the immediate cause of an incident — what physically happened — to the underlying system failures that made it possible. Without it you fix symptoms. With it you fix systems.

**The 5 Whys**

The most accessible RCA tool for shipboard use. Start with the incident and ask why repeatedly until you reach something systemic rather than something local.

The discipline is in not stopping early. "A seaman fell on a wet deck" produces the corrective action "clean up spills" — which is true, useless, and will not prevent the next fall. Keep asking and you typically arrive somewhere quite different: a defect report that was never actioned, a priority system nobody was inducted into, a workload that guaranteed something would be dropped.

The test of whether you have reached a root cause: **can you write a corrective action that would prevent a whole class of future incidents, not just this one?** If your corrective action only prevents an exact repeat, you have stopped at a surface cause.

**The cost of stopping early**

The pattern that recurs across investigations is a surface cause identified and correctly fixed, root cause left intact, and the same accident occurring eighteen months later on a sister vessel. The second investigation is more expensive than the first, and it is not the same accident to the family involved.

**A near-miss worth investigating properly**

During routine maintenance an engineer discovers a sea valve partially open, for an unknown period. No flooding occurred. The bilge alarm had activated twice in the preceding week — acknowledged and silenced both times, without investigation.

Work the 5 Whys on this before reading further in the course. Then note that there are two separate investigation threads here, not one: how the valve came to be open, and why two bilge alarms were silenced without anyone asking a question. The second thread is the more serious of the two, and it is the one most investigations miss because the first thread produces a satisfying answer and everyone stops.

Then write the non-conformance report in your SMS format, three corrective actions addressing root causes rather than symptoms, the responsible person for each, and a timeline.

**Post-Incident Review**

A PIR is a structured, facilitated review conducted after an incident or near-miss, with the people involved. It is not a disciplinary hearing and the distinction has to be visible from the first minute or the review produces nothing usable.

Structure: establish the timeline factually before any interpretation; identify decision points and what was known at each; identify system factors; agree corrective actions with owners and dates; and close the loop by confirming the actions were completed and worked.

**Reporting obligations**

Flag State notification requirements, company reporting, and where applicable the obligations under the IMO Casualty Investigation Code. Know your flag's thresholds before you need them — a serious marine casualty carries notification duties that begin immediately, not once the vessel is alongside.

**Closing the loop**

The most common failure in shipboard incident management is not the investigation. It is that corrective actions are agreed, recorded, and never verified as implemented. An action closed on paper and not in fact leaves the system exactly where it was, plus a document asserting otherwise — which is worse than having done nothing, because the next investigation will assume the gap was fixed.`,
  },
  {
    title: "8. Resource Management & Competing Priorities",
    content: `A department head manages three resources at once: people, budget and time. At operational level the focus is people and time. At management level budget enters — maintenance allocation, stores requisitions, crew overtime, equipment repairs. These are management decisions with direct safety implications.

**The most common resource failure at sea**

The department head who cannot say no to additional tasks when the team is already at capacity. The result is a department spread too thin — cutting corners on maintenance, skipping pre-departure checks, working tired. Every one of those cuts is a potential incident, and none of them appears in any report until one of them does.

**Saying no to an unreasonable demand on your department is a safety act. Documenting the refusal — or documenting agreement to proceed with reduced resources — is a legal act.** Both require a department head who understands their responsibility. Neither requires anyone's permission.

That second half matters as much as the first. Sometimes you cannot refuse. What you can always do is put on record that the task was accepted with resources you assessed as insufficient, and what you did to mitigate. That record is the difference between a judgement call and an unexplained failure.

**Prioritisation under real conditions**

Twelve things arrive simultaneously for a Chief Engineer on day two of a voyage:

- Planned maintenance on No. 2 generator — three engineers, six hours
- Owner's superintendent inspecting the engine room at next port, report due tomorrow
- Chief Officer requesting help with a ballast calculation
- A junior engineer reporting symptoms of illness, needing assessment
- Company instruction for all crew to complete a new online safety module, two hours each
- Bilge alarm activated in No. 3 hold, cause unknown
- Fuel consumption higher than expected, DPA has requested investigation
- Two ratings' overtime has exceeded the monthly limit, instructions needed
- Urgent maintenance on a steering gear hydraulic seal — classification-critical
- Crew appraisals due for three engine department officers
- New SMS procedure requiring a departmental briefing this week
- Main engine running slightly warm, monitoring only

Sort all twelve into four tiers — Immediate, Today, This voyage, Defer — and write the reasoning for each.

The exercise looks like time management and is not. Two of these items are safety-critical and unambiguous. One is a human welfare matter that outranks most of the engineering. One is a legal compliance issue with MLC implications. Several look urgent because someone senior asked, which is not the same as urgent. Where officers differ is almost always on which of the middle items they are willing to let slip — and articulating the criterion driving that choice is the actual competence being tested.

**Delegation at management level**

Delegation at this level is not task allocation. It is the transfer of responsibility with the authority to discharge it, and it is how officers develop. The common error is delegating the task while retaining the decisions — which gives the subordinate the work, none of the growth, and no way to succeed on their own terms.

Delegate the outcome, agree the constraints, make the reporting points explicit, and then do not intervene unless a constraint is breached or safety requires it.

**Managing upward**

Influencing what you do not control: the early written warning, the specific request rather than the general complaint, the documented constraint, and the relationship built before it was needed.`,
  },
  {
    title: "9. Integration: The Management-Level Officer",
    content: `The preceding eight modules are not eight separate subjects. In practice they arrive together, tangled, usually at an inconvenient moment.

**How the failures compound**

A vessel under commercial pressure to meet an arrival window. A Chief Engineer's maintenance backlog because costs were cut. A near-miss during departure that never got reported. Crew rest hours drifting into MLC violation. A cargo damage dispute with the charterer where no protest was issued. A new safety procedure that was circulated and never implemented. Two crew performance problems nobody has formally addressed. And a Master whose response to crew concerns has become steadily more authoritarian as the pressure has built.

Every one of those is a module in this course. None of them is independent.

The unreported near-miss is a safety culture failure (Module 4), created by the Master's response to concerns (Module 1), under pressure transmitted from shore (Module 6). The maintenance backlog is a resource management decision (Module 8) with ISM implications (Module 4). The unaddressed performance issues are an appraisal failure (Module 3) that is now a competence risk. The missing Letter of Protest (Module 5) has already cost the owner a claim that cannot be recovered.

**Deterioration is rarely a single decision.** It is a sequence of individually defensible compromises, each one making the next slightly easier. The management-level skill is recognising the sequence while you are inside it — which is considerably harder than recognising it in a case study, because inside it every step has a reason.

**Working an integrated problem**

The method:

1. **Establish the facts** before interpreting them. Timeline first.
2. **Separate symptoms from causes.** Most of what presents as a problem is a symptom of two or three underlying failures.
3. **Identify the non-conformances** specifically, against the SMS and the ISM Code.
4. **Find the root causes** — usually fewer than the symptom count suggests.
5. **Design interventions** addressing causes, with owners and dates.
6. **Draft the communications** that have to happen, to shore and to third parties.
7. **Decide what you do differently tomorrow**, not just what should have been done.

**Your personal management philosophy**

Every senior officer operates from a philosophy. Most have never written it down, which means they have never tested it and cannot articulate it to the people it affects.

Write yours. What do you believe about how people should be led? What will you not compromise on? What do you owe your officers, and what do you require from them? Where is your line on commercial pressure, decided now rather than at 0300 with an agent on the phone?

**The Personal Development Plan**

The point of this course is not the certificate. It is a small number of specific commitments you will act on in your next contract.

Your current rank and where you intend to be in three years. Your dominant leadership strength. Your most important development area. **One specific behaviour you will change** — observable, not aspirational. One relationship you will invest in: a peer, a subordinate, or a shore manager. One formal development activity in the next twelve months. And how you will know you have improved — what will actually be different, and who would notice.

Vague intentions produce nothing. Specific ones occasionally produce a different officer.`,
  },
];

export const auk499Quiz = [
  {
    q: "HELM Management Level satisfies the leadership and management requirement for which STCW tables?",
    options: [
      "A-II/1 and A-III/1",
      "A-II/2 and A-III/2",
      "A-VI/1 and A-VI/2",
      "A-IV/2 only",
    ],
    answer: 1,
  },
  {
    q: "STCW Regulation III/2 applies to Chief Engineer and Second Engineer Officers on ships of what propulsion power or more?",
    options: ["750 kW", "1,500 kW", "3,000 kW", "10,000 kW"],
    answer: 2,
  },
  {
    q: "What is described as the central challenge of the transition to management-level leadership?",
    options: [
      "Learning new technical systems",
      "Moving from doing to enabling — achieving results through others rather than personally",
      "Managing a larger budget",
      "Adapting to longer contracts",
    ],
    answer: 1,
  },
  {
    q: "A newly promoted Master takes the con at every difficult manoeuvre and second-guesses the Chief Mate's cargo planning. What is the principal problem?",
    options: [
      "He is exercising appropriate oversight of critical operations",
      "He is preventing his officers from developing, and exhausting himself",
      "He is in breach of STCW rest hour requirements",
      "There is no problem provided the vessel operates safely",
    ],
    answer: 1,
  },
  {
    q: "A transactional Master gets a compliant crew. What does that crew characteristically NOT do?",
    options: [
      "Follow the rules",
      "Complete assigned tasks",
      "Tell you something is wrong before it becomes a problem",
      "Attend drills",
    ],
    answer: 2,
  },
  {
    q: "In Kotter's model, which step involves identifying influential crew members who can champion a change from within?",
    options: [
      "Step 1 — Create urgency",
      "Step 2 — Build a guiding coalition",
      "Step 4 — Communicate the vision",
      "Step 6 — Create short-term wins",
    ],
    answer: 1,
  },
  {
    q: "A new procedure is introduced but the superseded procedure remains posted alongside it. Which Kotter step has failed?",
    options: [
      "Step 3 — Develop a vision",
      "Step 5 — Empower others to act, by removing barriers",
      "Step 7 — Build on the change",
      "Step 8 — Anchor in the culture",
    ],
    answer: 1,
  },
  {
    q: "In a properly conducted crew appraisal, roughly how much of the talking should the appraisee do?",
    options: [
      "Very little — the appraiser delivers the assessment",
      "About a quarter",
      "At least half",
      "It does not matter provided the form is completed",
    ],
    answer: 2,
  },
  {
    q: "Which set of elements constitutes a genuine department training plan, as opposed to the minimum?",
    options: [
      "A drill schedule and a Training Record Book",
      "A skills matrix, gap analysis, training schedule, OJT records, assessment records and a review date",
      "A list of certificates held by each crew member",
      "The company's annual training budget allocation",
    ],
    answer: 1,
  },
  {
    q: "Which is NOT among the Master's stated ISM Code responsibilities?",
    options: [
      "Implementing the company safety and environmental protection policy",
      "Motivating the crew in applying that policy",
      "Appointing the Designated Person Ashore",
      "Reviewing the SMS and reporting deficiencies to shore-based management",
    ],
    answer: 2,
  },
  {
    q: "The ISM Code was made mandatory under which instrument?",
    options: [
      "SOLAS Chapter IX",
      "MARPOL Annex VI",
      "MLC 2006, Title 4",
      "UNCLOS Article 94",
    ],
    answer: 0,
  },
  {
    q: "What is described as the most dangerous form of Safety Management System?",
    options: [
      "One that is overly detailed and difficult to follow",
      "One that looks correct on paper and is ignored at sea",
      "One that has not been audited within twelve months",
      "One written in a language other than the working language",
    ],
    answer: 1,
  },
  {
    q: "A crew member reports a near-miss and is informally criticised for creating paperwork. What is the predictable consequence?",
    options: [
      "Only that individual stops reporting",
      "Reporting stops across the vessel, because everyone observes what happened to the reporter",
      "Reporting quality improves as crew become more careful",
      "No effect, provided no formal disciplinary action follows",
    ],
    answer: 1,
  },
  {
    q: "Under SOLAS, what is the status of the Master's obligation to take action necessary for the safety of ship, crew and passengers where it conflicts with owner instructions?",
    options: [
      "A discretionary power the Master may choose to exercise",
      "An overriding legal obligation",
      "Subject to prior approval from the flag State",
      "Applicable only where the vessel is in port",
    ],
    answer: 1,
  },
  {
    q: "Which convention establishes the Master's responsibilities for crew working hours, accommodation, medical care and repatriation?",
    options: ["SOLAS", "MARPOL", "MLC 2006", "COLREG"],
    answer: 2,
  },
  {
    q: "What is a Letter of Protest?",
    options: [
      "A sworn statement before a Notary Public regarding perils of the sea",
      "A formal written notice to a third party recording an event that may lead to a claim, or instructions the Master considers potentially harmful",
      "A report to the flag State following a marine casualty",
      "A grievance submitted by crew under MLC procedures",
    ],
    answer: 1,
  },
  {
    q: "What distinguishes a Sea Protest from a Letter of Protest?",
    options: [
      "A Sea Protest is issued to the charterer; a Letter of Protest to the port authority",
      "A Sea Protest is a formal sworn statement before a Notary Public regarding perils of the sea, and must be noted within the time limits of the country of arrival",
      "A Sea Protest may only be issued by the Chief Officer",
      "They are alternative names for the same document",
    ],
    answer: 1,
  },
  {
    q: "Under UNCLOS Article 94, on whose behalf is every decision by the Master made, in law?",
    options: [
      "The shipowner",
      "The classification society",
      "The flag State",
      "The charterer",
    ],
    answer: 2,
  },
  {
    q: "A Master decides not to issue a Letter of Protest for berthing damage because he does not want to upset the charterer. What is the principal consequence?",
    options: [
      "None, provided the damage is recorded in the deck log",
      "The evidence is not created, and cannot be recovered later when a claim arises",
      "The classification society must be notified instead",
      "The charterer becomes automatically liable",
    ],
    answer: 1,
  },
  {
    q: "Under commercial pressure to depart, a DPA responds to the Master's safety concern with \"Use your judgment, Master.\" What has functionally occurred?",
    options: [
      "The DPA has provided appropriate support and delegated authority",
      "The entire decision and its consequences have been transferred to the Master",
      "The DPA has issued a formal instruction to depart",
      "The Master is relieved of liability for the outcome",
    ],
    answer: 1,
  },
  {
    q: "What is the stated test for whether a 5 Whys analysis has reached a genuine root cause?",
    options: [
      "Exactly five questions have been asked",
      "You can write a corrective action that would prevent a whole class of future incidents, not just an exact repeat",
      "The responsible individual has been identified",
      "The analysis reaches a decision made ashore",
    ],
    answer: 1,
  },
  {
    q: "A sea valve is found partially open. The bilge alarm had activated twice in the previous week and was silenced each time without investigation. How many investigation threads does this present?",
    options: [
      "One — how the valve came to be open",
      "Two — how the valve came to be open, and why two alarms were silenced without question",
      "One — the alarm activations are explained by the open valve",
      "Three — including the maintenance schedule",
    ],
    answer: 1,
  },
  {
    q: "What is the most common failure in shipboard incident management after the investigation itself?",
    options: [
      "Failing to notify the flag State",
      "Corrective actions agreed and recorded, but never verified as implemented",
      "Investigating too many near-misses",
      "Excluding the crew involved from the review",
    ],
    answer: 1,
  },
  {
    q: "A department head cannot refuse an additional task despite the team being at capacity. What is the described management-level response?",
    options: [
      "Accept the task without comment, since refusal is not possible",
      "Document that the task was accepted with resources assessed as insufficient, and what was done to mitigate",
      "Escalate to the flag State",
      "Delegate the task to another department",
    ],
    answer: 1,
  },
  {
    q: "What is described as the common error in delegation at management level?",
    options: [
      "Delegating to officers who are insufficiently senior",
      "Delegating the task while retaining the decisions",
      "Delegating without a written record",
      "Delegating more than three tasks at once",
    ],
    answer: 1,
  },
  {
    q: "How is the deterioration of shipboard management characterised?",
    options: [
      "A single catastrophic decision",
      "A sequence of individually defensible compromises, each making the next slightly easier",
      "The inevitable result of long contracts",
      "Primarily a consequence of inadequate equipment",
    ],
    answer: 1,
  },
];

export const auk499Practical = {
  title: "MV Stellenbosch: Integrated Management Case Study",
  description: `A single integrated case study assessed across all eight taught modules, followed by a personal development commitment.

**The case.** MV Stellenbosch is a 28,000 DWT bulk carrier, South African flag, operating between Richards Bay and Rotterdam. The Master, on his fourth contract with the company, has been under sustained commercial pressure from the charterer to meet a tight arrival window.

Candidates receive the full voyage dossier and must:

1. Conduct a leadership audit of the Master's and Chief Engineer's management
2. Identify all ISM Code non-conformances, classified as major or minor with reasoning
3. Design an intervention plan covering every key issue, with owners and timelines
4. Draft two priority communications — one to the DPA, one to the charterer's agent
5. Identify the root causes of the overall deterioration in shipboard management

Assessors look for candidates who recognise that the failures are interdependent rather than a list of separate problems, and who reach systemic root causes rather than attributing the deterioration to individual failings.

**Supporting assessment.** Drafting a formal maritime document — a Letter of Protest or Sea Protest — to a legally compliant standard and correct format.

**Personal Development Plan.** A required output, submitted before certification. Current rank and three-year goal; dominant leadership strength; most important development area; one specific observable behaviour to change in the next contract; one relationship to invest in; one formal development activity within twelve months; and a stated test of improvement.

The PDP is not graded. It is required, because a leadership qualification that produces a certificate and no change in behaviour has not done its job.`,
};

export const auk499Outcomes = [
  "Apply strategic leadership frameworks to the management of shipboard departments",
  "Lead organisational change on board using a structured change management model",
  "Manage crew performance, appraisal and development at department head level",
  "Apply ISM Code requirements to build and maintain a safety management culture",
  "Manage the shore-vessel interface, including owner, manager and flag State relationships",
  "Apply legal frameworks for Masters' responsibilities, including in loco parentis, Letters of Protest and Sea Protest",
  "Conduct and document a structured crew appraisal",
  "Design and implement a department training plan",
  "Lead a Post-Incident Review and near-miss investigation",
  "Manage resource constraints and competing priorities at management level",
];

export const auk499Summary =
  "The capstone leadership qualification for senior maritime officers, and a mandatory prerequisite for a Management Level Certificate of Competency under STCW 2010. Delivered to IMO Model Course 1.40, covering STCW Tables A-II/2 and A-III/2. Strategic leadership, change management, crew appraisal and development, ISM Code obligations, Masters' legal responsibilities, the shore-vessel interface, incident investigation, and resource management — integrated through the MV Stellenbosch case study. Prerequisite: HELM Operational Level (AUK S 40) or equivalent.";

export const auk499 = {
  code: "AUK-499",
  title: "HELM (Ships) — Management Level",
  summary: auk499Summary,
  outcomes: auk499Outcomes,
  modules: auk499Modules,
  quiz: auk499Quiz,
  practical: auk499Practical,
  durationLabel: "5 days", // IMO 1.40 = 35 contact hours
  passMark: 70, // per the facilitator guide's assessment criteria
};

/**
 * MAPPING TO THE FACILITATOR GUIDE
 *
 * The guide runs 9 modules over 35 hours, of which Module 9 is assessment day.
 * This course keeps 9 modules but repurposes the last one: Module 9 here is a
 * synthesis module teaching how the preceding eight interact, and the MV
 * Stellenbosch case study moves to the practical where it belongs. A self-paced
 * learner needs the integration taught, not just examined.
 *
 *   Guide Modules 1-8 -> Modules 1-8, one to one
 *   Guide Module 9 (Integrated Case Study & Assessment) -> Module 9 + practical
 *
 * The regulatory basis from the guide's Course Overview is folded into Module 1,
 * as with AUK S 40.
 *
 * STRIPPED FROM THE LEARNER CONTENT
 * - All FACILITATOR NOTE blocks, including those directing the facilitator to
 *   draw on surveyor, auditor and Training Assessor experience, and the note on
 *   handling a room of participants with more sea-time than the facilitator.
 * - Session timing tables and materials columns.
 * - Two specific debrief answers, because they are the point of their exercises:
 *   the Kotter "steps 1, 2 and 8 are most commonly missed" reveal, and the
 *   completed 5 Whys chain for the sea valve near-miss. Both are reframed as
 *   questions the learner works rather than answers they read.
 * - The assessment competency matrix and pass standards.
 * - The paired appraisal role-play, which needs two live participants.
 *
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links. Appendices A, B and C
 * already exist as tables in the guide and need only extraction:
 *   1. Crew Appraisal Template (Guide Appendix A)
 *   2. Department Training Plan Template — skills matrix (Guide Appendix B)
 *   3. Personal Development Plan Template (Guide Appendix C)
 *   4. Letter of Protest template and worked example
 *   5. Sea Protest template with jurisdictional time limits note
 *   6. Kotter 8-step change plan worksheet
 *   7. 5 Whys / root cause analysis worksheet
 *   8. MV Stellenbosch case study dossier (assessment material — facilitator issue only)
 *
 * Item 8 must NOT be attached as a learner-downloadable material. It is the
 * assessment. Issue it at assessment time.
 */
