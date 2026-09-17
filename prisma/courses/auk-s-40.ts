/**
 * AUK S 40 — HELM (Ships): Human Element, Leadership & Management
 * Operational Level · IMO Model Course 1.39 · STCW Tables A-II/1 & A-III/1
 *
 * Course content for AUK Marine Training (training.auk-maritime.com)
 *
 * Drop-in for prisma/seed.ts. Shapes match what the course player already reads:
 *   modules:   { title: string; content: string }[]
 *   quiz:      { q: string; options: string[]; answer: number }[]  // answer = 0-based index
 *   practical: { title: string; description: string }
 *
 * SOURCE
 * Derived from "HELM — Operational Level Facilitator Guide", AUK Marine & Mining,
 * v1.0 2026, prepared by Capt. Ashwani Pathak. AUK's own material, so no
 * third-party reproduction constraint applies.
 *
 * IMPORTANT — facilitator material has been stripped. The source guide is marked
 * "Confidential — Internal Use Only" and contains delivery scripts, timing tables,
 * activity answer keys and FACILITATOR NOTE blocks that prompt the facilitator to
 * draw on personal sea-going experience. None of that belongs in learner-facing
 * content: it would expose the assessment design and read oddly to a learner.
 * What follows is the learner's course. The guide remains the facilitator's.
 *
 * SCOPE NOTE
 * This is HELM OPERATIONAL only (IMO 1.39). HELM Management (IMO 1.40, Tables
 * A-II/2 & A-III/2, 35 hrs, HELM Operational as prerequisite) is a separate STCW
 * course leading to a different certificate and needs its own course row.
 */

export const aukS40Modules = [
  {
    title: "1. What HELM Is, and Why It Is Mandatory",
    content: `Every officer reading this has been trained to navigate, to keep an engineering watch, to fight a fire and to abandon ship. Almost none has been formally trained in how to lead the people standing next to them.

That gap is what HELM exists to close. The 2010 Manila Amendments to STCW made leadership and teamworking a mandatory competence rather than something officers were expected to absorb by osmosis over a career. The reasoning was simple and evidence-driven: when marine casualties are investigated, the technical failure is rarely the whole story. Communication that broke down, a junior who saw the danger and said nothing, a team that had never resolved an underlying conflict — these appear again and again in the causal chain.

**Regulatory basis**

HELM Operational Level satisfies the STCW 2010 requirement for leadership and teamworking training at the operational level. It is mandatory for:

- Officers of the Watch (Deck) — STCW Table A-II/1, on vessels of 500 GT or more
- Officers in Charge of an Engineering Watch — STCW Table A-III/1, on vessels of 750 kW propulsion or more
- Any officer revalidating an operational-level Certificate of Competency after 1 January 2017

The course follows IMO Model Course 1.39. It is distinct from HELM Management Level (IMO Model Course 1.40), which covers Tables A-II/2 and A-III/2 and is the prerequisite for a management-level CoC. Operational comes first.

**How HELM relates to BRM and ERM**

Bridge Resource Management and Engine Room Resource Management deal with the technical management of resources — the equipment, the information, the procedures, the closed-loop communication that keeps a watch safe. HELM deals with the people. The two are complementary and are best taken together or in sequence. BRM teaches you to run the bridge. HELM teaches you to lead the team running it.

**What this course asks of you**

The most valuable material in this course is not the theory. It is your own sea-going experience examined against a framework that gives it structure and language. You already know what a bad leader looks like — you have worked for one. What you may not have is a way to describe precisely what they were doing wrong, and therefore a way to avoid doing it yourself.

Every module asks you to test a model against something you have actually lived. Do that work honestly and the frameworks stop being academic.

**Course outcomes**

On completion you will be able to apply situational leadership to watchkeeping team management; communicate effectively in multicultural teams; give and receive constructive feedback; apply motivation principles to crew performance; manage conflict using structured techniques; deliver on-the-job training to develop junior crew; and contribute to safety culture through your own leadership behaviour.`,
  },
  {
    title: "2. Leadership Foundations & Self-Awareness",
    content: `**Three myths worth killing first**

*Leaders are born, not made.* False. Leadership behaviours are learnable. Some people have more natural aptitude, just as some people are naturally better shiphandlers — but training, experience and honest reflection develop leadership exactly the way they develop watchkeeping.

*Leadership means being in charge.* Leadership is influence, and you can lead from any position. An AB who consistently models safe behaviour leads. A junior engineer who speaks up when something is wrong leads. Rank gives you authority. What you do with people gives you leadership. They are not the same thing, and confusing them is the most common error of newly promoted officers.

*Good leadership looks the same everywhere.* It does not. The way you lead a new ordinary seaman through a berthing operation is nothing like the way you lead an experienced Chief Mate through cargo planning. The skill is reading the situation and adapting to it.

**Leadership = influence + direction + support.** Not rank. Not fear. Not compliance.

**The Hersey-Blanchard situational model**

This is the most practical leadership framework for the maritime environment, because it starts with the follower rather than the leader. The central question is not "what kind of leader am I?" It is "what does this person need from me right now?"

The model uses two variables: task competence (can they do the job?) and psychological commitment (do they want to do it?). The combination gives four development levels, each needing a different response.

**D1 — Low competence, high commitment.** The enthusiastic beginner. New cadet, first time on the bridge, keen and dangerous in equal measure. Needs a **Directing** style: clear instructions, close supervision, frequent feedback. This person needs to know exactly what to do.

**D2 — Some competence, low commitment.** The disillusioned learner. They have been aboard long enough to understand how hard the job actually is, and confidence has dropped. Needs a **Coaching** style: direction plus genuine two-way dialogue, explanation, encouragement.

**D3 — High competence, variable commitment.** The capable but cautious performer. Technically able but lacking confidence, or motivation, or both. Needs a **Supporting** style: minimal direction, maximum encouragement, collaborative problem-solving.

**D4 — High competence, high commitment.** The self-reliant achiever. Experienced, capable, motivated. Needs a **Delegating** style: assign responsibility and step back. Over-managing a D4 is actively demotivating and is one of the fastest ways to lose a good officer.

Most stories about terrible leaders at sea turn out, on examination, to be stories about mismatched styles — a Directing leader applied to a D4, or a Delegating leader applied to a D1 who then had an accident nobody prevented.

**The Johari Window**

Developed by Luft and Ingham in 1955, the Johari Window maps what you know about yourself against what others know about you. Four quadrants:

**Open Area** — known to you and to others. Your visible behaviour, your communication style, your reputation aboard. This is what you lead with.

**Blind Spot** — known to others, not to you. How you come across under pressure. The way you dismiss ideas without noticing you are doing it. The tone you use when frustrated. **This is the most dangerous quadrant for a leader**, because you cannot manage what you cannot see, and nobody junior to you is going to volunteer the information.

**Hidden Area** — known to you, not to others. Your doubts, your fears, your real assessment of a difficult situation. Leaders who operate entirely from here create environments that feel unpredictable and inconsistent to the people around them.

**Unknown Area** — known to nobody. Potential you have not discovered, and responses to situations you have not yet faced.

The practical work of leadership development is shrinking the blind spot. That requires actively asking for feedback from people who have no incentive to give it to you, and then not punishing them for what they say.`,
  },
  {
    title: "3. Communication & Multicultural Teams",
    content: `**Beyond closed-loop**

BRM teaches closed-loop communication — the mechanics of accurate message transfer, the read-back, the confirmation. Leadership communication goes further. It is about creating shared understanding, managing the emotional dynamics of a team, and ensuring people will tell you what you need to hear even when it is uncomfortable to say.

Active listening is the most underdeveloped skill in maritime leadership. Most of us, while someone is speaking, are already assembling our reply. Active listening means suspending your own agenda, reflecting back what you heard, asking clarifying questions, and noticing what is *not* being said.

Three communication failures specific to people in authority:

1. Talking too much and listening too little.
2. Using rank to close down a conversation.
3. Rewarding agreement and punishing challenge — often subtly, through tone and body language rather than anything explicit.

**A leader who creates psychological safety reduces accidents.** This is not a soft skill and it is not optional. Where a team believes it can speak honestly without penalty, hazards get raised while they are still cheap to fix. Where it cannot, they get raised in the incident report.

**Multicultural crew dynamics**

A modern merchant vessel is one of the most culturally diverse workplaces in any industry. A single ship might carry a Ukrainian Master, a Greek Chief Engineer, an Indian Chief Mate, a Filipino crew, and take aboard a South African pilot. Every one of them arrives with different assumptions about hierarchy, directness, and what it means to question a superior.

Geert Hofstede's research identified six cultural dimensions affecting workplace behaviour. Two matter most at sea.

**Power Distance Index.** In high-PDI cultures, hierarchy is deeply respected and challenging a superior reads as disrespect. In low-PDI cultures, flat communication is normal and challenging upward is expected — even required. A rating from a high-PDI culture and an officer from a low-PDI one are standing on the same bridge with fundamentally incompatible assumptions about whether it is acceptable to say "Sir, I think that's the wrong course."

The officer thinks silence means agreement. It may mean nothing of the kind.

**Uncertainty Avoidance.** Cultures high in uncertainty avoidance prefer clear rules, defined procedures and known outcomes. Cultures low in it are more comfortable with ambiguity and improvisation. This directly affects how crew follow — or quietly deviate from — standard operating procedures when circumstances get unusual.

Neither end of either dimension is better. What matters is knowing that the assumptions differ, and building a watch where the differences are managed rather than discovered during an emergency.

**The practical implication for you**

If you are leading a multicultural watch, you cannot rely on people volunteering concerns. You have to actively extract them: ask direct questions, name the fact that you want to be challenged, and respond well the first time someone does it — because the whole team is watching what happens to that person.

**Giving feedback: the AID model**

AID stands for Action, Impact, Desired outcome. It works at sea because it is specific, observable and forward-looking, and because it describes behaviour rather than character.

**Action** — the specific behaviour. Not a generalisation about the person. Not *"You're always late"* but *"At the 0400 watch handover on Tuesday you arrived on the bridge eight minutes after the scheduled time."*

**Impact** — the concrete consequence. *"This meant the officer coming off watch could not complete their rest period before breakfast duties began."*

**Desired** — what you need instead, stated plainly. *"Going forward I need you on the bridge five minutes before handover, ready to take the watch."*

Three sentences. No character assassination, no accumulated grievance, nothing the other person can reasonably dispute — because you described what happened rather than what you concluded about them.`,
  },
  {
    title: "4. Motivation & Team Performance",
    content: `Motivation is what gets people to perform beyond the minimum required to avoid consequences. A merely compliant crew will follow orders. A motivated crew will actively prevent problems, support each other and take initiative. The difference in safety outcomes between the two is very large.

**Maslow's hierarchy in the maritime context**

Maslow's insight was that people cannot be motivated by higher-order needs until lower-order ones are met. Aboard ship this is immediately, practically relevant.

A seafarer worried about whether they will be paid, whether the contract will be extended without their consent, or whether the food will remain edible for another six weeks — that person cannot be motivated by appeals to team spirit or professional pride. The appeal will land as noise, or as insult.

Fix the lower needs first. Some of them are within your authority to fix. Where they are not, escalating them is itself a leadership act.

**Herzberg's two-factor theory**

Herzberg distinguished hygiene factors from motivators, and the distinction is sharper than it first appears.

**Hygiene factors** — pay, working conditions, safety, relationships with supervisors, company policy. These do not motivate when present. They demotivate powerfully when absent. Nobody ever went the extra mile because the accommodation was adequate. Plenty of people have disengaged entirely because it was not.

**Motivators** — achievement, recognition, the work itself, responsibility, advancement. These create genuine engagement.

The single most powerful motivator Herzberg identified was **achievement** — the feeling of having accomplished something that mattered. As an officer of the watch you can give this to your team almost daily, and it costs nothing. After a difficult berthing, after a well-executed drill, after a junior officer handles a tricky passage competently: say so, specifically, and say what they did well.

Ask yourself what most motivated and most demotivated you across your own sea career. The demotivators are almost always hygiene factors — poor management, unfair treatment, bad conditions. The motivators are almost always achievement-based.

**Tuckman's team development stages**

Bruce Tuckman identified four stages every team passes through. Ships create a distinctive challenge, because the team changes at every crew rotation — it is entirely possible to run through all four stages inside a three-month contract, then start again.

**Forming.** The team assembles. People are polite, cautious, unsure of roles and of each other. *Leadership need: high direction.* Set expectations explicitly, establish communication norms, define roles rather than assuming they are obvious.

**Storming.** Personalities clash, authority gets tested, conflict emerges over roles and methods. Aboard ship this typically surfaces in weeks two to four of a voyage. *Leadership need: coaching.* Acknowledge the tension rather than pretending it is not there, facilitate resolution, reinforce the shared goal.

**Norming.** Shared working practices develop, trust builds, collaboration improves. *Leadership need: supporting.* Step back from direction, consult more, reinforce the norms that are working.

**Performing.** High-functioning, autonomous, mutually accountable. *Leadership need: delegating.* Assign and trust. Over-managing a Performing team is the most common leadership error at this stage, and it will push the team backwards.

Storming is not a sign of failure. It is a stage. The teams that never storm are usually the ones where disagreement has been suppressed rather than resolved — and that suppression will surface later, under pressure, at the worst possible moment.

**Managing poor performance**

This is among the hardest things an officer of the watch has to do and among the least trained. Most officers either ignore poor performance — which breeds resentment in everyone who is pulling their weight — or handle it so harshly that it escalates into a disciplinary matter that need never have been one.

The structured approach:

1. **Observe and document.** Specific behaviour, specific occasions, specific dates.
2. **Private conversation.** Use AID. Describe the behaviour and its impact.
3. **Agree a clear standard and a timeline.** Both parties must leave knowing what "fixed" looks like.
4. **Provide support.** Training, mentoring, closer supervision — whatever the gap actually requires.
5. **Review.** Acknowledge improvement, or escalate if there is none.

One distinction matters more than any other here. A **performance problem** is a skill or motivation gap and is manageable by the methods above. A **conduct problem** is deliberate non-compliance and is a disciplinary matter. Officers frequently confuse the two and select the wrong intervention — disciplining someone who simply was never trained, or coaching someone who is knowingly refusing to comply.`,
  },
  {
    title: "5. Conflict Management",
    content: `Conflict aboard ship is inevitable. Closed environment, hierarchical culture, extended time in each other's company, cultural diversity, physical and psychological stress, high-stakes decisions. If you have never experienced conflict on a vessel, you either have not been to sea or you have not been paying attention.

**Three types, three prognoses**

**Task conflict** — disagreement about how to do the job. At moderate levels this is *productive*: it surfaces assumptions and generates better decisions. At high levels it degrades performance. A watch where nobody ever disagrees about method is not a harmonious watch; it is one where someone has stopped thinking.

**Process conflict** — disagreement about who should do what, and how. Almost always dysfunctional, and needs resolving quickly. It is usually a symptom of unclear roles, which is a leadership failure rather than a personality one.

**Relationship conflict** — personal friction, distrust, animosity. Always damaging. Needs early intervention, because it does not resolve itself and it contaminates everything around it.

**Unresolved conflict is a safety issue.** A team that cannot communicate honestly because of what is festering underneath will not function in an emergency. The cost of not managing conflict is eventually measured in incidents.

**The Thomas-Kilmann conflict modes**

Thomas and Kilmann identified five ways of handling conflict, plotted on two axes: assertiveness (how strongly you pursue your own interests) and cooperativeness (how strongly you consider the other party's).

**Competing** — high assertiveness, low cooperativeness. Pursuing your position at the other's expense. Appropriate in a genuine emergency, or where you hold formal authority and immediate action is essential. Overused, it destroys relationships and teaches people not to bring you problems.

**Accommodating** — low assertiveness, high cooperativeness. Yielding. Appropriate when the issue genuinely matters more to them than to you, or when the relationship is the priority. Overused, it enables poor performance and poor decisions.

**Avoiding** — low on both. Withdrawing. Occasionally appropriate when the timing is wrong or the stakes are trivial. As a default, it produces a vessel full of unresolved issues that everyone can feel and nobody will name.

**Compromising** — moderate on both. Each party gives something. Fast, but rarely produces the best outcome. Useful when time is genuinely short and good-enough will do.

**Collaborating** — high on both. Working together toward a solution that satisfies both parties fully. Time-consuming, and it produces the best outcomes. This should be the default for most maritime leadership conflicts.

**The pattern in this industry**

Maritime officers systematically over-use Competing and Avoiding, and under-use Collaborating. The reasons are structural rather than personal: hierarchy rewards Competing or encourages Avoiding, and the operational tempo discourages the time investment Collaborating requires.

Knowing this about your profession — and checking which of the five you reach for by default — is most of the work.

**Interests, not positions**

The single most useful move in resolving a conflict is to stop arguing about positions and start identifying interests. A position is *what* someone says they want. An interest is *why* they want it.

Two officers arguing about whether deck cargo securing is adequate hold opposing positions. Their interests may be almost identical: neither wants the cargo to shift, neither wants to be responsible for a casualty, both want to depart on time. Once the shared interest is on the table, the conversation changes from a contest into a problem to be solved jointly.

**Escalation**

Know when a conflict has moved beyond your authority to resolve. Anything involving a safety refusal, an allegation of harassment or discrimination, an MLC matter, or a breakdown between officers that is affecting watchkeeping — these go to the Master, through the procedure your SMS specifies. Escalating appropriately is not a failure of leadership. Failing to escalate something that needed it is.`,
  },
  {
    title: "6. On-the-Job Training & Mentoring",
    content: `On-the-job training is how the overwhelming majority of seafaring skill is actually acquired. Formal college training supplies the framework. Sea time teaches the trade. Which means every experienced officer is a trainer, whether or not they think of themselves as one — and whether or not they are any good at it.

**The most common OJT failure aboard ship**

The trainer demonstrates the task once, at full speed, without explanation, and then expects the trainee to perform it correctly.

"Watch me once, then you do it" is not training. It is display. It teaches the trainee that asking questions is unwelcome, and it produces someone who can approximate the task without understanding why any of it matters — which is precisely the person who will improvise badly the first time conditions differ.

**Tell — Show — Do — Review**

**Tell.** Explain the task clearly: what it is, why it matters, what the standard is, what can go wrong. Then check understanding — not by asking "understood?", which reliably produces a yes, but by asking them to tell you what they are about to do. STCW requires this be done in the working language of the vessel.

**Show.** Demonstrate slowly and deliberately, narrating each step and explaining the reason for it. Then do it again at normal speed so they see what it should look like in practice. Invite questions. Check understanding again.

**Do.** The trainee performs while you observe. **Do not take over unless safety requires it.** Let them work through the difficulty — that is where the learning actually happens. Taking the tool out of someone's hands the moment they hesitate is the fastest way to produce an officer who cannot function unsupervised.

**Review.** Give immediate feedback using AID. Acknowledge what was done well before addressing what needs improvement. Agree the next step, and record it.

**The best trainers stay curious**

The most productive question at the review stage is "what would you do differently?" It routinely surfaces things the experienced officer stopped noticing years ago. A trainee's confusion is often accurate information about a procedure that does not quite make sense.

**Mentoring and coaching are not the same thing**

*Coaching* is task-focused and short-cycle: helping someone improve a specific skill, usually with a defined endpoint. *Mentoring* is relationship-based and long-cycle: helping someone navigate a career, understand the industry, and develop judgement. A cadet needs both, usually from different people.

**Common OJT errors aboard ship**

- **Assuming competence.** Training a task the trainee already knows well, or assuming they know it without checking.
- **Training in unsafe conditions.** Conducting OJT during high-traffic transits or demanding navigational situations, where the trainee's error has consequences and neither of you has attention to spare.
- **Inconsistency.** Several officers training the same task differently, so the trainee learns three conflicting methods and trusts none of them.
- **No documentation.** Completing training without a Training Record Book entry, so it is invisible to the next officer and to the company.
- **Correcting harshly in front of others.** This ends the trainee's willingness to attempt anything unsupervised.
- **One-and-done.** Training a task once and treating it as complete, with no follow-up assessment.

**Documentation is not bureaucracy**

The Training Record Book entry is what makes training visible to the next officer, to the company, and to a flag State or port State inspector. Undocumented training is, for every practical purpose, training that did not happen. It also leaves the trainee unable to evidence competence they genuinely hold.`,
  },
  {
    title: "7. Safety Culture & Personal Leadership",
    content: `Safety culture is not a poster in the mess room. It is the sum of what the leaders aboard do every day — what they notice, what they reward, what they ignore, and what they let pass.

**If you walk past an unsafe act without saying anything, you have just trained your crew that the unsafe act is acceptable.** That is the whole mechanism. It operates whether or not you intended it, and it operates on everyone watching.

**The Swiss Cheese model**

James Reason's model describes accidents as the alignment of holes across multiple layers of defence. Aboard a vessel those layers are the safety management system, the procedures, the training, the equipment, and the people.

As an officer of the watch you are the last layer — the final defence before an incident becomes a casualty. You are also, through your daily behaviour, one of the most powerful influences on every other layer. You decide whether procedures are followed or quietly worked around. You decide whether training happens properly. You decide whether a defect gets reported or absorbed.

**Active failures and latent conditions**

An *active failure* is the unsafe act at the sharp end — the missed check, the wrong lever. A *latent condition* is the pre-existing weakness that made the active failure likely — the procedure nobody could follow, the induction that never happened, the workload that guaranteed corners would be cut.

Latent conditions are created by decisions, often taken far from the incident and long before it. Some of those decisions are yours. Recognising which of your own habits are quietly building latent conditions is uncomfortable and useful in roughly equal measure.

**Near-miss reporting**

Every near-miss reported and investigated is an accident that was prevented. Every near-miss hidden is an accident waiting for its moment.

Crew will not report unless they believe reporting is safe. If a report leads to blame, if investigation becomes interrogation, if the reporter becomes the subject — reporting stops. It stops permanently, and it stops for everyone, because the whole ship learns from what happened to the first person who tried.

At operational level you may not control the company's reporting culture. You entirely control your own response to the person who brings you something, and that response is what your watch will calibrate against.

**Just culture**

Just culture is the balance between accountability and learning. It recognises that not all errors are equal. An honest mistake inside a complex system is not the same thing as reckless disregard for a known risk, and treating them identically destroys either safety or fairness — usually both.

The practical test: could a competent, well-intentioned person in the same circumstances, with the same information and the same pressures, have made the same error? If yes, you are looking at a system problem wearing a person's face.

**Safety culture is the product of a thousand small decisions**

Every time you conduct a thorough watch handover rather than a rushed one, you build safety culture. Every time you acknowledge a rating who raises a concern, you build safety culture. Every time you decline to cut a corner that nobody would have noticed, you build safety culture.

None of these is dramatic. The cumulative effect is a vessel where people speak up before things go wrong instead of explaining afterwards why they did not.

**Your personal leadership commitment**

The purpose of this course is not the certificate. It is that you leave with a small number of specific behavioural changes you intend to make on your next contract — not aspirations, but actions someone else could observe you doing or failing to do.

Identify your dominant leadership style and the development level it serves worst. Identify one blind spot you suspect you have. Name one specific behaviour you will change, and how you will know whether it worked. Vague intentions produce no change at all; specific ones occasionally produce quite a lot.`,
  },
];

export const aukS40Quiz = [
  {
    q: "HELM Operational Level training became mandatory under which instrument?",
    options: [
      "The ISM Code, Resolution A.741(18)",
      "The STCW 2010 Manila Amendments",
      "MLC 2006, Title 3",
      "SOLAS Chapter IX",
    ],
    answer: 1,
  },
  {
    q: "HELM Operational Level satisfies the leadership and teamworking requirement for which STCW tables?",
    options: [
      "A-II/2 and A-III/2",
      "A-II/1 and A-III/1",
      "A-VI/1 and A-VI/2",
      "A-V/1 only",
    ],
    answer: 1,
  },
  {
    q: "Under the Hersey-Blanchard model, which style suits a development level 1 (D1) team member — low competence, high commitment?",
    options: ["Delegating", "Supporting", "Directing", "Coaching"],
    answer: 2,
  },
  {
    q: "An experienced, capable and motivated Chief Mate (D4) is given detailed step-by-step instructions for a routine task. What is the likely effect?",
    options: [
      "Improved performance, since clarity always helps",
      "Demotivation, because the style is mismatched to the development level",
      "No effect — leadership style is irrelevant to experienced officers",
      "Improved safety, since supervision reduces error",
    ],
    answer: 1,
  },
  {
    q: "In the Johari Window, which quadrant is described as the most dangerous for a leader?",
    options: [
      "Open Area — known to self and others",
      "Hidden Area — known to self, not to others",
      "Blind Spot — known to others, not to self",
      "Unknown Area — known to nobody",
    ],
    answer: 2,
  },
  {
    q: "Which of these correctly applies the AID feedback model?",
    options: [
      "\"You're always late for watch and it's becoming a real problem.\"",
      "\"At the 0400 handover on Tuesday you arrived eight minutes late. The off-going officer could not complete rest before breakfast duties. I need you on the bridge five minutes before handover.\"",
      "\"Your attitude to timekeeping needs to improve or I'll have to speak to the Master.\"",
      "\"Everyone has noticed you're not pulling your weight on watch handovers.\"",
    ],
    answer: 1,
  },
  {
    q: "A rating from a high Power Distance culture says nothing when they observe the OOW standing into danger. What does Hofstede's model suggest is happening?",
    options: [
      "The rating has not noticed the hazard",
      "The rating's cultural norms treat challenging a superior as disrespectful, so silence does not indicate agreement",
      "The rating is deliberately withholding information",
      "Power Distance affects only shore-based organisations",
    ],
    answer: 1,
  },
  {
    q: "Under Herzberg's two-factor theory, how do hygiene factors such as pay and accommodation behave?",
    options: [
      "They motivate strongly when present and have no effect when absent",
      "They do not motivate when present, but demotivate powerfully when absent",
      "They are identical in effect to motivators such as achievement",
      "They affect only junior ratings, not officers",
    ],
    answer: 1,
  },
  {
    q: "According to Herzberg, which was the single most powerful motivator?",
    options: ["Salary", "Job security", "Achievement", "Working conditions"],
    answer: 2,
  },
  {
    q: "A crew member is preoccupied with unpaid wages and an unconsented contract extension. What does Maslow's hierarchy predict about appeals to team spirit and professional pride?",
    options: [
      "They will be effective, since professional identity overrides material concerns",
      "They will not motivate, because lower-order needs are unmet and must be addressed first",
      "They will work if repeated frequently enough",
      "Maslow's hierarchy does not apply in a shipboard environment",
    ],
    answer: 1,
  },
  {
    q: "In weeks two to four of a voyage, personalities clash and authority is tested. Which Tuckman stage is this, and what does the team need?",
    options: [
      "Forming — high direction",
      "Storming — coaching",
      "Norming — supporting",
      "Performing — delegating",
    ],
    answer: 1,
  },
  {
    q: "What is the most common leadership error with a team that has reached Tuckman's Performing stage?",
    options: [
      "Failing to set clear expectations",
      "Over-managing, when the team needs delegation",
      "Avoiding conflict between members",
      "Providing too much encouragement",
    ],
    answer: 1,
  },
  {
    q: "Which distinction most affects the choice of intervention when dealing with a crew member who is not meeting the standard?",
    options: [
      "Whether they are deck or engine department",
      "Whether it is a performance problem (skill or motivation gap) or a conduct problem (deliberate non-compliance)",
      "Whether they are on their first or a subsequent contract",
      "Whether the Master has been informed",
    ],
    answer: 1,
  },
  {
    q: "Which type of conflict is described as productive at moderate levels?",
    options: [
      "Relationship conflict",
      "Process conflict",
      "Task conflict",
      "All conflict is damaging and should be eliminated",
    ],
    answer: 2,
  },
  {
    q: "In the Thomas-Kilmann model, which mode is high in both assertiveness and cooperativeness?",
    options: ["Competing", "Compromising", "Accommodating", "Collaborating"],
    answer: 3,
  },
  {
    q: "Which Thomas-Kilmann mode is appropriate in a genuine emergency requiring immediate action?",
    options: ["Competing", "Collaborating", "Avoiding", "Accommodating"],
    answer: 0,
  },
  {
    q: "Which two conflict modes do maritime officers characteristically over-use?",
    options: [
      "Collaborating and Compromising",
      "Competing and Avoiding",
      "Accommodating and Collaborating",
      "Compromising and Accommodating",
    ],
    answer: 1,
  },
  {
    q: "In conflict resolution, what is the difference between a position and an interest?",
    options: [
      "A position is held by the senior officer; an interest by the junior",
      "A position is what someone says they want; an interest is why they want it",
      "They are interchangeable terms",
      "A position is written; an interest is verbal",
    ],
    answer: 1,
  },
  {
    q: "What are the four stages of structured on-the-job training?",
    options: [
      "Plan, Do, Check, Act",
      "Tell, Show, Do, Review",
      "Brief, Execute, Debrief, Record",
      "Observe, Instruct, Assess, Certify",
    ],
    answer: 1,
  },
  {
    q: "During the 'Do' stage of OJT the trainee hesitates and is working slowly but safely. What should the trainer do?",
    options: [
      "Take over to demonstrate the correct pace",
      "Observe without intervening, since working through difficulty is where learning happens",
      "Stop the session and reschedule",
      "Complete the task jointly to save time",
    ],
    answer: 1,
  },
  {
    q: "Why is a Training Record Book entry more than an administrative formality?",
    options: [
      "It is required for the vessel's Safety Management Certificate",
      "Undocumented training is invisible to the next officer, the company and inspectors, and leaves the trainee unable to evidence competence",
      "It determines the trainee's rate of pay",
      "It is only needed for cadets, not for rated crew",
    ],
    answer: 1,
  },
  {
    q: "In Reason's Swiss Cheese model, what distinguishes a latent condition from an active failure?",
    options: [
      "Latent conditions occur in the engine room; active failures on the bridge",
      "An active failure is the unsafe act at the sharp end; a latent condition is a pre-existing system weakness that made it likely",
      "Latent conditions are always equipment defects",
      "Active failures are deliberate; latent conditions are accidental",
    ],
    answer: 1,
  },
  {
    q: "A near-miss is reported and the reporter is informally criticised for causing paperwork. What is the predictable consequence?",
    options: [
      "Reporting quality improves as crew become more careful",
      "Reporting stops across the vessel, because the whole crew observes what happened to the reporter",
      "Only that individual stops reporting",
      "No effect, provided no formal disciplinary action follows",
    ],
    answer: 1,
  },
  {
    q: "What is the practical test at the centre of a just culture approach to an error?",
    options: [
      "Whether the individual has a prior record of errors",
      "Whether a competent, well-intentioned person in the same circumstances, with the same information and pressures, could have made the same error",
      "Whether the error resulted in damage or injury",
      "Whether the error was reported voluntarily",
    ],
    answer: 1,
  },
  {
    q: "An OOW walks past an unsafe act without comment. What has occurred, in safety culture terms?",
    options: [
      "Nothing, since no instruction was given",
      "The crew have been taught that the unsafe act is acceptable",
      "A non-conformance requiring a written report",
      "An active failure under Reason's model",
    ],
    answer: 1,
  },
];

export const aukS40Practical = {
  title: "Leadership in Practice: OJT Delivery and Team Scenario Analysis",
  description: `Two assessed components, both drawing on the learner's own sea-going experience.

**Part 1 — Deliver a structured OJT session.** The learner selects a task they know well from sea — a navigational task, an engineering task, or an element of a safety drill — and prepares a Tell-Show-Do-Review plan. They deliver a ten-minute training session to an assessor or peer playing an unfamiliar cadet, who asks authentic questions. The session must include a check of understanding at both Tell and Show stages, non-intervention during Do unless safety requires it, AID-structured feedback at Review, and a completed Training Record Book entry.

Assessors look specifically for the four common failures: skipping Tell, rushing Show, taking over during Do, and giving vague feedback at Review.

**Part 2 — Team and conflict scenario analysis.** The learner analyses three scenarios drawn from real shipboard situations: a communication failure across a multicultural bridge team, a team exhibiting a specific Tuckman stage, and an unresolved conflict between watchkeeping officers. For each they identify the framework that applies, the leadership response required, and the likely safety consequence of inaction.

Learners also complete a personal leadership commitment: their dominant style, the development level it serves worst, one suspected blind spot, and one specific behaviour they will change on their next contract with a stated test of whether it worked.`,
};

export const aukS40Outcomes = [
  "Apply situational leadership principles to watchkeeping team management",
  "Demonstrate effective communication techniques for multicultural teams",
  "Give and receive constructive feedback in a professional maritime context",
  "Apply motivation principles to improve crew performance and engagement",
  "Manage conflict on board using structured resolution techniques",
  "Apply on-the-job training principles to develop junior crew",
  "Contribute to a positive safety culture through personal leadership behaviour",
];

export const aukS40Summary =
  "Human Element, Leadership & Management at operational level — mandatory under the STCW 2010 Manila Amendments for Officers of the Watch (Deck and Engineering) and for anyone revalidating an operational-level CoC. Delivered to IMO Model Course 1.39, covering STCW Tables A-II/1 and A-III/1. Situational leadership, multicultural communication, motivation and team performance, conflict management, on-the-job training, and the leadership behaviours that build safety culture.";

export const aukS40 = {
  code: "AUK S 40",
  title: "HELM (Ships) — Operational Level",
  summary: aukS40Summary,
  outcomes: aukS40Outcomes,
  modules: aukS40Modules,
  quiz: aukS40Quiz,
  practical: aukS40Practical,
  durationLabel: "3 days", // IMO 1.39 = 21 contact hours; the seed array currently says 2 days
  passMark: 70, // per the facilitator guide's assessment criteria
};

/**
 * MAPPING TO THE FACILITATOR GUIDE
 *
 * The guide runs 6 delivery modules over 21 hours. This course has 7 learner
 * modules — the guide's Course Overview (STCW basis, target participants,
 * relationship to BRM/ERM) is broken out as Module 1, because a self-paced
 * learner needs the regulatory context stated explicitly rather than delivered
 * as a facilitator's opening address.
 *
 *   Guide Module 1 (Leadership Foundations & Self-Awareness) -> Module 2
 *   Guide Module 2 (Communication & Multicultural Teams) ----> Module 3
 *   Guide Module 3 (Motivation & Team Performance) ----------> Module 4
 *   Guide Module 4 (Conflict Management) -------------------> Module 5
 *   Guide Module 5 (OJT & Mentoring) -----------------------> Module 6
 *   Guide Module 6 (Safety Culture & Assessment) -----------> Module 7 + practical
 *
 * STRIPPED FROM THE LEARNER CONTENT
 * - All FACILITATOR NOTE blocks, including those prompting the facilitator to
 *   draw on named personal experience (Richards Bay, Harbour Master and surveyor
 *   background). These are delivery cues, not learner material.
 * - Session timing tables and materials columns.
 * - Activity answer keys and "facilitator look for" guidance, which would expose
 *   the assessment design if a learner could read them.
 * - The Johari feedback exercise, which requires a live group and a facilitator
 *   judging whether the group dynamic is safe enough to run it. It stays in the
 *   guide as a classroom activity.
 *
 * MATERIALS still to produce and upload (Course.materials — [{name, url, ext, size}]).
 * Not seeded; empty URLs would render broken download links. All exist as
 * appendices or referenced handouts in the facilitator guide:
 *   1. Leadership Style Inventory — 10-statement self-assessment (Guide Appendix A)
 *   2. OJT Session Plan Template (Guide Appendix B)
 *   3. Hersey-Blanchard development level quick-reference card
 *   4. Hofstede dimensions handout — maritime application
 *   5. Thomas-Kilmann conflict mode self-assessment
 *   6. Team Performance Audit worksheet — 10 dimensions, scored 1-5
 *   7. Personal Development Plan template
 *
 * SCOPE — HELM MANAGEMENT IS A SEPARATE COURSE
 * The HELM Management facilitator guide (IMO Model Course 1.40, STCW Tables
 * A-II/2 & A-III/2, 35 hrs over 5 days, 9 modules) covers strategic leadership,
 * Kotter change management, crew appraisal, ISM management-level obligations,
 * Masters' legal responsibilities, the shore-vessel interface, incident
 * investigation, resource management, and the MV Stellenbosch integrated case
 * study. It carries HELM Operational as a prerequisite and leads to a different
 * certificate for a different rank band. It needs its own course row and its own
 * content file — it should not be folded into AUK S 40.
 */
