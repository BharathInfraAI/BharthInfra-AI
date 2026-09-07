# AGENTS.md — Bharath Infra AI

## 1. Project Overview

Bharath Infra AI is a Smart India Hackathon 2026 project.

The goal is to build an AI-powered infrastructure monitoring and transparency platform for government authorities.

The platform combines:

- Government/project data
- Site engineer progress updates
- Construction-site photographs
- Satellite/geospatial data
- AI/ML predictive analytics
- Computer vision
- Citizen complaints and feedback
- Contractor performance analysis

Core idea:

> Don't just report infrastructure progress — verify it and predict what happens next.

System flow:

Project Data
→ Engineer Updates
→ Site Images + Satellite Data
→ AI Analysis
→ Progress Verification + Risk Prediction
→ Authority Dashboard
→ Early Warning
→ Authority Action
→ Citizen Transparency


## 2. User Roles

The application has three major roles.

### Authority

Authorities can:

- Monitor infrastructure projects
- View project progress
- View AI predictions
- Analyze historical performance
- View satellite intelligence
- Monitor contractor performance
- Receive AI alerts
- Review citizen complaints
- Track project and financial information

Authority-sensitive information must NOT be exposed to citizens.

### Site Engineer

Engineers can:

- View assigned projects
- Submit progress updates
- Upload construction-site photographs
- Report field issues
- Respond to complaints/issues
- Receive notifications

### Citizen

Citizens can:

- View public infrastructure projects
- View project location
- View public project information
- View reported progress
- View public budget/tender information
- Submit infrastructure complaints
- Upload photographs
- Track complaint status

Citizens must not see:

- Internal AI risk scores
- Internal authority remarks
- Sensitive project information
- Internal investigation information


## 3. Technology Stack

Use the following stack unless explicitly instructed otherwise.

### Frontend

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Lucide React
- Recharts

### Authentication

- Clerk

### Backend / Database

- Convex

DO NOT introduce Supabase.

DO NOT introduce Firebase unless explicitly requested.

### Maps

- Leaflet
- OpenStreetMap

### AI / ML

Python
FastAPI
scikit-learn
OpenCV

### Satellite

Sentinel-2 / Copernicus data where appropriate.

Satellite imagery should primarily be used for:

- Large construction areas
- Roads/highways
- Before/after comparison
- Construction activity/change detection
- Large-scale progress verification

Do not claim that satellite imagery can reliably detect small potholes, cracks, or tiny defects.

Citizen/site photographs should be used for detailed visual inspection.


## 4. Current Application Structure

The project uses Next.js App Router.

Current major routes:

### Authority

/dashboard
/dashboard/projects
/dashboard/prediction
/dashboard/analytics
/dashboard/satellite
/dashboard/contractors
/dashboard/alerts
/dashboard/complaints
/dashboard/settings

### Engineer

/engineer
/engineer/projects
/engineer/progress
/engineer/site-images
/engineer/issues
/engineer/notifications
/engineer/profile

### Citizen

/citizen
/citizen/projects
/citizen/map
/citizen/report
/citizen/complaints
/citizen/profile


## 5. Module Ownership Strategy

The development team uses PAGE/MODULE OWNERSHIP.

Do NOT divide work into:

- frontend developer
- backend developer
- AI developer

Instead, each technical team member owns a complete feature/module.

A module owner is responsible for:

- UI
- frontend logic
- Convex/database integration
- backend logic
- AI integration when required
- validation
- testing
- error handling

One shared application and one shared Convex backend/database are used.

Principle:

> One application. One shared data layer. Independent feature ownership.


## 6. Current Module Ownership

### Main developer / project integrator

Responsible for:

- Application structure
- Landing page
- Authentication structure
- Common layout
- Navigation
- Shared components
- Authority dashboard shell
- Engineer dashboard shell
- Citizen dashboard shell
- Routing
- General UI consistency
- Final integration

### AI Prediction Module

Route:

/dashboard/prediction

Responsible for:

- Delay prediction
- Cost overrun prediction
- Completion prediction
- Project risk score
- Risk classification
- Early-warning information
- Prediction charts
- AI/ML integration
- Convex integration

### Project Analytics Module

Route:

/dashboard/analytics

Responsible for:

- Historical project analysis
- Progress trends
- Cost trends
- Time trends
- Project comparisons
- Regional benchmarking
- Contractor/project benchmarking
- Analytics charts
- Convex integration

### Satellite Intelligence Module

Route:

/dashboard/satellite

Responsible for:

- Satellite map
- Sentinel-2 integration
- Before/after imagery
- Construction change detection
- Geo-spatial visualization
- Project location analysis
- Convex integration

### Contractor Performance Module

Route:

/dashboard/contractors

Responsible for:

- Contractor performance
- Delay history
- Project history
- Verified complaints
- Quality issues
- Contractor risk
- Contractor comparison
- Performance metrics

### Complaints + Alerts Module

Routes:

/dashboard/complaints
/dashboard/alerts

Responsible for:

- Citizen complaints
- AI complaint verification
- Complaint assignment
- Investigation status
- Action taken
- Resolution
- Before/after evidence
- AI-generated alerts
- Authority notification logic


## 7. Important Development Rule

Before editing any file:

1. Inspect the existing project.
2. Understand the current structure.
3. Reuse existing components where possible.
4. Avoid unnecessary rewrites.
5. Do not modify unrelated modules.

When asked to implement a specific module, modify only the files necessary for that module unless integration genuinely requires shared changes.


## 8. Preserve Existing Routes

Do not rename or remove existing routes unless explicitly instructed.

Do not change:

- route names
- folder structure
- application architecture

without first explaining why the change is necessary.


## 9. UI Design

The application should look like a modern government infrastructure intelligence platform.

Design principles:

- Professional
- Clean
- Modern
- Data-focused
- Responsive
- Accessible
- Consistent
- Suitable for government demonstrations

Prefer:

- Cards
- Tables
- Charts
- Status badges
- Risk indicators
- Maps
- Timeline components
- Search/filter controls
- Clear navigation
- Useful empty states
- Loading states
- Error states

Avoid:

- Excessive animations
- Unnecessary gradients
- Overly decorative UI
- Random colors
- Excessive dependencies


## 10. Shared Components

Create reusable components instead of duplicating UI.

Examples:

- Sidebar
- Header
- PageHeader
- StatCard
- StatusBadge
- RiskBadge
- DataTable
- ChartCard
- EmptyState
- LoadingState
- ErrorState
- Modal
- ConfirmDialog
- ProjectCard
- ProjectStatus
- ProgressBar

Before creating a new component, check whether an existing component can be reused.


## 11. Styling

Use Tailwind CSS.

Keep the visual language consistent across all roles.

Use a professional dashboard style.

Maintain:

- consistent spacing
- consistent typography
- consistent border radius
- consistent cards
- consistent status colors
- consistent icon usage

Do not create a completely different design language for each module.


## 12. Icons

Use Lucide React.

Do not manually create SVG icons unless necessary.

Prefer meaningful icons such as:

- LayoutDashboard
- Folder
- Brain
- BarChart3
- Satellite
- Users
- AlertTriangle
- MessageSquare
- Settings
- Map
- Camera
- CheckCircle
- Clock
- XCircle


## 13. Charts

Use Recharts where appropriate.

Charts should communicate useful information.

Examples:

- Progress over time
- Planned vs actual progress
- Cost trend
- Risk distribution
- Delay probability
- Regional performance
- Contractor performance

Do not add charts just for decoration.


## 14. Mock Data

During frontend development, mock data is acceptable.

Clearly structure mock data so it can later be replaced with Convex queries.

Do not hard-code mock data throughout UI components.

Prefer:

lib/
data/
or another appropriate data layer.

When using mock AI results, clearly treat them as demonstration data.

Never present fabricated AI results as real government data.


## 15. Convex

Convex is the shared backend/database.

All modules should eventually use the same Convex backend.

Do not create separate databases for individual modules.

Keep database schemas organized and reusable.

Avoid duplicate data models.

When creating Convex functions:

- Validate inputs
- Keep queries/mutations focused
- Avoid unnecessary duplication
- Use appropriate indexes
- Keep authorization in mind


## 16. Authentication and Authorization

Use Clerk for authentication.

Use role-based access control.

Roles:

- authority
- engineer
- citizen

Never rely only on frontend route protection for sensitive information.

Backend/Convex authorization must also be considered.

Authority-only data must remain authority-only.


## 17. AI Architecture

AI should provide useful intelligence rather than decorative "AI" labels.

Important AI outputs include:

- Delay probability
- Cost-overrun probability
- Completion prediction
- Risk score
- Risk level
- Early warning
- Driver analysis
- Progress mismatch
- Complaint verification
- Image-based issue classification

Example demonstration:

Reported progress: 72%

Observed/verified progress: 58%

Mismatch: 14 percentage points

Predicted delay probability: 81%

Cost overrun probability: 63%

Risk level: HIGH

These numbers are DEMO/MOCK values unless generated from actual project data.


## 18. Government Platform Positioning

Bharath Infra AI is NOT intended to replace government platforms.

The concept should be positioned as an AI verification and intelligence layer.

Example:

PAIMANA:
"What is the reported project status?"

Bharath Infra AI:
"Does the reported status match available evidence, and what is likely to happen next?"

The system should complement existing government monitoring infrastructure.


## 19. Citizen Complaint Flow

Expected flow:

Citizen
→ Submit complaint
→ Upload photo
→ AI verification/classification
→ Complaint created
→ Authority/Engineer assignment
→ Investigation
→ Action taken
→ Before/after evidence
→ Resolution

Possible complaint categories:

- Road damage
- Pothole
- Construction quality
- Water leakage
- Drainage problem
- Structural damage
- Incomplete work
- Safety issue
- Other infrastructure issue


## 20. Contractor Accountability

Verified issues can contribute to contractor performance analysis.

Possible metrics:

- Number of projects
- Completed projects
- Delayed projects
- Average delay
- Verified complaints
- Quality issues
- Resolution time
- Risk level

Do not automatically accuse contractors based only on citizen complaints.

Use language such as:

- Reported issue
- AI-verified issue
- Under investigation
- Confirmed issue
- Performance indicator


## 21. Maps

Use Leaflet + OpenStreetMap.

Maps should support:

- Project locations
- Regional project distribution
- Project status
- Risk visualization
- Satellite imagery where available
- Complaint locations

Do not expose sensitive authority-only locations/data to citizens.


## 22. Error Handling

Every major page should consider:

- Loading state
- Empty state
- Error state
- Invalid data
- Missing image
- API failure
- Authentication failure

Do not leave users with blank screens.


## 23. Responsive Design

The application should work on:

- Desktop
- Laptop
- Tablet
- Mobile

Government authority dashboards can prioritize desktop but should remain usable on smaller screens.


## 24. Performance

Avoid unnecessary:

- API requests
- database queries
- rerenders
- dependencies
- large client-side computations

Use server components where appropriate.

Use client components only when interactivity requires them.


## 25. Code Quality

Use:

- TypeScript
- Clear naming
- Small reusable components
- Meaningful function names
- Meaningful variable names
- Minimal duplication
- Proper error handling

Avoid:

- `any` unless genuinely necessary
- huge components
- duplicated UI
- unused imports
- unused dependencies
- console spam


## 26. Git Workflow

Use feature branches.

Example:

feature/prediction
feature/analytics
feature/satellite
feature/contractors
feature/complaints

Workflow:

1. Pull latest main.
2. Create feature branch.
3. Implement module.
4. Test locally.
5. Commit changes.
6. Push branch.
7. Create Pull Request.
8. Review.
9. Merge into main.
10. Delete feature branch if appropriate.

Do not directly push unfinished feature work to main.


## 27. Testing Before Completion

Before declaring a task complete:

- Run the application.
- Check the affected route.
- Check TypeScript/build errors.
- Check console errors.
- Test important interactions.
- Check responsive behavior when relevant.

Use the project's existing scripts.

Do not add a large testing framework unless requested.


## 28. Dependencies

Do not install new packages automatically unless they are necessary.

Prefer existing dependencies.

Before installing a package:

1. Check package.json.
2. Check whether the functionality already exists.
3. Only add a dependency when it provides meaningful value.


## 29. Destructive Changes

Never delete or overwrite significant project files without checking first.

Before destructive operations:

- Explain what will be removed.
- Ask for confirmation if the operation is risky.

Do not delete:

- routes
- database schema
- configuration
- authentication
- modules

unless explicitly requested.


## 30. Working With Codex

When receiving a task:

1. Inspect the repository first.
2. Identify relevant files.
3. Explain the implementation plan briefly.
4. Make the smallest reasonable set of changes.
5. Run appropriate checks.
6. Report:
   - What changed
   - Files changed
   - Tests/checks performed
   - Any remaining issues

Do not make unrelated improvements during a focused task.


## 31. Important Project Principle

The application should be built as one integrated product.

Do not create isolated mini-applications.

All modules must eventually work together through:

- Shared authentication
- Shared Convex database
- Shared project IDs
- Shared contractor IDs
- Shared complaint IDs
- Shared geographic information
- Shared UI components

The final result should feel like one professional platform.


## 32. Current Development Phase

The current phase is:

FRONTEND STRUCTURE FIRST.

The initial goal is to establish:

- Routes
- Page structure
- Navigation
- Layout
- Shared components
- Mock data
- Role-based UI

After the structure is stable, modules can progressively integrate:

- Convex
- Clerk
- AI/ML
- Satellite data
- Computer vision
- Citizen complaint workflows

Do not over-engineer the initial frontend structure.


## 33. Final Rule

When uncertain:

- Preserve the existing architecture.
- Prefer simple solutions.
- Reuse components.
- Keep modules independent.
- Use shared Convex data.
- Do not introduce unnecessary technologies.
- Do not change unrelated code.
- Ask before making destructive architectural changes.

Build Bharath Infra AI as a credible, demo-ready Smart India Hackathon project.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
