# Al Noor Hospital Management — Submission

## Live application
https://oracleapex.com/ords/r/alnoor_hms/alnoor-hospital-management/login

Workspace: `alnoor_hms`  
App: Alnoor Hospital Management (App ID **105653**)  
Alias: `alnoor-hospital-management`

## Demo account
Use your APEX workspace credentials (`alsubhia980@gmail.com`).

## What’s in this branch
| Path | Contents |
|------|----------|
| `sql/` | Schema, sample data, views, triggers (incl. patient cascade delete) |
| `apex/` | Exported APEX application (`f105653_alnoor_hospital.sql`) |
| `docs/` | Build guide + demo script |

## Install order (SQL Workshop)
1. `sql/01_schema.sql`
2. `sql/03_views.sql`
3. `sql/04_triggers.sql`
4. `sql/02_sample_data.sql`
5. Import `apex/f105653_alnoor_hospital.sql` via App Builder → Import

## Demo video
Upload the short flow demo to the ClickUp ticket (see ticket instructions).
