# INTRO
The purpose of this document is to showcase an working flow of the project

*Additional Changes*:
- Created Sign up page for Technician (Pharmacist)
- Added axios for better api calling mechanism
- Added Zustand for light weight global state management solution
- Fixed verify email page content
- Added DispensedBy and CheckedBy as optional for all incidents

## Homepage

As there was no homepage defined for the project, a demo home page is created. This component serves as the landing page with four main action cards for signing up and logging in as either a Technician/Pharmacist or Pharmacy Premise.

Then we might proceed with creating a Technician (Pharmacist) account. The flow is:

1. Signup Page (api integrated)
2. Verify Email Page
3. Manager's Info page (api integrated)
4. Login Page (api integrated. Should show Invalid credentials for wrong creds)
5. OTP Page
6. Technician dashboard (all data from api)
7. Incident creation page (api integrated)
8. Reports Page (api integrated)
