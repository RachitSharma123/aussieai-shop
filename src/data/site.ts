export const services = [
  { title: 'AI Chat Agents', does: 'Answers website and message enquiries, qualifies leads, collects details and books appointments.', matters: 'Customers get fast replies and your team gets cleaner enquiries.', useCases: ['Website enquiries', 'Social messages', 'Booking requests'], bestFor: 'Service businesses, clinics, cafes and local operators.' },
  { title: 'AI Voice Agents', does: 'Answers calls, captures caller details and sends urgent requests to the right person.', matters: 'Fewer callers are left waiting when your team is busy.', useCases: ['Call answering', 'Caller intake', 'Urgent routing'], bestFor: 'Tradies, clinics, real estate and appointment based businesses.' },
  { title: 'Inbox Agents', does: 'Sorts emails, summarises threads, drafts replies and flags urgent messages.', matters: 'Important messages move faster without adding inbox pressure.', useCases: ['Email sorting', 'Reply drafts', 'Daily summaries'], bestFor: 'Busy teams with shared inboxes or high enquiry volume.' },
  { title: 'Workflow Automation', does: 'Connects forms, emails, spreadsheets, calendars, CRMs and alerts so updates happen automatically.', matters: 'Less manual copying means fewer missed steps and cleaner handovers.', useCases: ['Lead routing', 'Calendar updates', 'Internal alerts'], bestFor: 'Teams that use several tools to manage the same work.' },
  { title: 'AI Receptionist', does: 'Answers common questions, captures details, books appointments and routes important conversations.', matters: 'Your business can respond even when staff are busy or unavailable.', useCases: ['Front desk enquiries', 'Appointment requests', 'Customer triage'], bestFor: 'Clinics, service businesses, agencies and local operators.' },
  { title: 'Missed Call Text Back', does: 'Texts missed callers, collects job details and helps recover leads before they contact someone else.', matters: 'A missed call does not have to become a missed customer.', useCases: ['Missed calls', 'Job details', 'Lead recovery'], bestFor: 'Tradies, home services, clinics and appointment based teams.' },
  { title: 'Google Review Booster', does: 'Requests reviews, monitors feedback and drafts professional replies for Google Business reviews.', matters: 'Your reputation stays active without another manual follow up task.', useCases: ['Review requests', 'Feedback monitoring', 'Reply drafts'], bestFor: 'Local businesses that rely on trust and repeat customers.' },
  { title: 'NDIS Progress Note Assistant', does: 'Turns rough support notes into cleaner draft notes that are easier to review and organise.', matters: 'Staff spend less time rewriting notes and more time focused on support.', useCases: ['Draft notes', 'Cleaner handover', 'Admin support'], bestFor: 'NDIS providers and care teams that need clearer internal notes.' },
  { title: 'CRM and Tool Integrations', does: 'Connects forms, calendars, inboxes, spreadsheets, CRMs, alerts and reporting tools.', matters: 'Your existing systems work together with less manual admin.', useCases: ['CRM updates', 'Tool syncing', 'Reporting workflows'], bestFor: 'Businesses with leads or tasks moving across several systems.' },
  { title: 'Custom Website and AI Automation', does: 'Builds modern websites with AI chat, smart forms, booking flows, lead capture and automation built in.', matters: 'Your website becomes part of your operations, not just a brochure.', useCases: ['Smart forms', 'Lead capture', 'Booking flows'], bestFor: 'Businesses that need a better website and cleaner follow up.' },
];

export const industries = [
  { title: 'Tradies', problem: 'Calls and quote requests arrive while the team is on site.', automate: 'Missed call follow up, job intake, quote details, bookings and reminders.', outcome: 'More enquiries are captured and staff get clearer job details.' },
  { title: 'Cafes and restaurants', problem: 'Messages arrive after hours or during service.', automate: 'Opening hours, menu questions, booking enquiries, social messages and review requests.', outcome: 'Customers get faster answers and the team has fewer repeated messages.' },
  { title: 'NDIS providers', problem: 'Enquiries, notes and admin tasks can pile up quickly.', automate: 'Intake details, follow ups, progress note drafts, reminders and staff handovers.', outcome: 'Admin becomes easier to review and organise.' },
  { title: 'Clinics and allied health', problem: 'Reception teams answer repeated questions and appointment requests.', automate: 'FAQs, intake forms, bookings, reminders and handover summaries.', outcome: 'Patients get clearer replies and staff have less repetitive admin.' },
  { title: 'Retail and local shops', problem: 'Customers ask the same product, stock and opening hour questions.', automate: 'Product questions, stock enquiries, delivery updates and review requests.', outcome: 'Customers get useful answers and staff stay focused in store.' },
  { title: 'Real estate', problem: 'Buyer, renter and vendor enquiries need fast follow up.', automate: 'Lead capture, inspection details, enquiry summaries and CRM updates.', outcome: 'More enquiries are organised and easier to action.' },
  { title: 'Consultants', problem: 'New enquiries need triage before a useful conversation can happen.', automate: 'Brief collection, call booking, follow up and preparation summaries.', outcome: 'Calls start with better context and less back and forth.' },
  { title: 'Agencies', problem: 'Client requests, leads and reporting tasks spread across tools.', automate: 'Lead intake, client updates, reporting reminders and internal task alerts.', outcome: 'Teams get cleaner workflows and fewer manual updates.' },
  { title: 'Service businesses', problem: 'Slow replies and manual follow up can cost local operators work.', automate: 'Lead response, bookings, reminders, CRM updates and staff summaries.', outcome: 'More work is handled without adding more admin.' },
];

export const processSteps = [
  { title: 'Audit', happens: 'We review your workflow, tools, repetitive tasks and missed opportunities.', client: 'You share how enquiries, bookings, admin and follow up work today.', handles: 'Aussie AI identifies bottlenecks and practical automation options.', gets: 'A clear view of where automation can help first.' },
  { title: 'Automation Map', happens: 'We map what should be automated, what should stay human and where the value is.', client: 'You confirm priorities and any important business rules.', handles: 'Aussie AI designs the recommended workflow and handoff points.', gets: 'A simple roadmap before anything is built.' },
  { title: 'Build', happens: 'We build and connect the AI agent or automation with your existing tools.', client: 'You provide access to the tools needed for the workflow.', handles: 'Aussie AI handles setup, prompts, logic, testing and integrations.', gets: 'A working system ready for review.' },
  { title: 'Launch', happens: 'We launch the system and make sure your team knows how to use it.', client: 'You review the workflow and share final feedback.', handles: 'Aussie AI makes refinements and prepares the team handover.', gets: 'A live automation with clear usage guidance.' },
  { title: 'Improve', happens: 'We monitor, refine and improve the automation as your business grows.', client: 'You share feedback when your workflow changes.', handles: 'Aussie AI tunes the system and adds improvements when needed.', gets: 'An automation setup that can evolve with the business.' },
];

export const outcomes = ['Faster lead response', 'Fewer missed enquiries', 'Less repetitive admin', 'Cleaner staff handover', 'Better customer follow up', 'More after hours opportunities captured', 'Smoother customer experience'];

export const toolCategories = [
  ['Websites', 'Landing pages, smart forms and booking flows'],
  ['Forms', 'Enquiry forms, intake forms and request forms'],
  ['Email', 'Gmail, Outlook and shared inbox workflows'],
  ['Calendars', 'Google Calendar and appointment scheduling'],
  ['CRMs', 'HubSpot, GoHighLevel and lead pipelines'],
  ['Spreadsheets', 'Google Sheets and Airtable'],
  ['Messaging', 'WhatsApp, SMS, Instagram and Facebook'],
  ['Payments', 'Stripe, Xero and QuickBooks workflows'],
  ['Reporting', 'Dashboards, alerts and summary reports'],
  ['Custom APIs', 'Custom systems and business databases'],
];

export const faqs = [
  ['What does Aussie AI actually build?', 'Custom AI agents and automations for enquiries, calls, inboxes, bookings, CRM updates, reviews and admin workflows.'],
  ['Is this just a chatbot?', 'No. Chat can be one part of the system. The main value is connecting conversations to your tools and workflows.'],
  ['What is an AI agent?', 'An AI agent is a practical assistant that can collect details, follow rules, trigger workflows and hand over when needed.'],
  ['Can it answer calls?', 'Yes. Voice agents can answer calls, collect details, book appointments and escalate important matters.'],
  ['Can it work with my current website?', 'Usually, yes. We can add agents, smart forms, booking flows and lead capture to most modern websites.'],
  ['Can it connect with my CRM or calendar?', 'Yes. We commonly connect calendars, CRMs, forms, spreadsheets, inboxes, SMS and workflow tools.'],
  ['Do I need technical knowledge?', 'No. We handle the strategy, build, testing, launch and support in plain language.'],
  ['Will this replace my staff?', 'No. The goal is to reduce repetitive admin and missed enquiries while keeping people in control.'],
  ['What happens if the AI gets something wrong?', 'We add guardrails, approval steps, escalation paths and monitoring for important decisions.'],
  ['Can we start with one small automation?', 'Yes. Many businesses start with one useful workflow, then expand once it proves value.'],
  ['Do you maintain the system after launch?', 'Yes. Support, monitoring, refinements and improvements can be included after launch.'],
  ['How do we get started?', 'Book a free AI audit. We will review your workflow and show the simplest path forward.'],
  ['Why is there no public pricing?', 'Every workflow is different, so we start with an audit before recommending the right solution.'],
];

export const dashboard = [
  ['New lead captured', 'The system records the enquiry and keeps the lead details tidy.'],
  ['Missed call followed up', 'The caller receives a fast reply so the opportunity does not go cold.'],
  ['Website enquiry qualified', 'The agent asks useful questions and sends your team a cleaner summary.'],
  ['Inbox reply drafted', 'Important emails are summarised and a draft response is prepared.'],
  ['CRM updated', 'Lead details move into the right system without manual copying.'],
  ['Booking added to calendar', 'The confirmed booking is placed where your team already works.'],
  ['Google review reply drafted', 'New feedback is monitored and a professional reply is prepared.'],
  ['Workflow completed', 'The handover is clear and the next step is ready for your team.'],
];
