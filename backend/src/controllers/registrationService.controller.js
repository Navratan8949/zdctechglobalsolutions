const RegistrationService = require("../models/RegistrationService");

const defaultRegistrationServices = [
    // ----------------------------------------------------
    // NGO REGISTRATION SERVICES
    // ----------------------------------------------------
    {
        title: "Trust Registration Certificate",
        slug: "trust-registration",
        category: "NGO Registration",
        shortDescription: "Legal establishment of a charitable or religious public trust under the Indian Trusts Act with registration at the Sub-Registrar office.",
        fullDescription: "A Trust is one of the most respected non-profit structures in India, established for religious, educational, medical, or social welfare causes. It requires a minimum of 2 trustees and a registered Trust Deed outlining objectives, governance rules, and beneficiary criteria.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Sub-Registrar Office / State Charity Commissioner",
        processingTime: "7 - 10 Working Days",
        fee: "Starting from ₹5,999 + Stamp Duty",
        benefits: [
            "Lifetime legal validity across India with no mandatory annual deed renewal",
            "Eligible to apply for Income Tax 12AB exemption and 80G donor tax benefits",
            "Can acquire immovable property, receive public donations and CSR grants",
            "High public credibility for operating schools, hospitals, and relief centers"
        ],
        documentsRequired: [
            "Aadhar Card & PAN Card of all Trustees (Minimum 2 required)",
            "Passport size photographs of Settlor and Trustees",
            "Electricity Bill or Water Bill of the Registered NGO Office Address",
            "NOC (No Objection Certificate) from the property owner / Rent Agreement",
            "Trust Objectives, Name, and Initial Trust Corpus Fund amount"
        ],
        processSteps: [
            "Free Legal Consultation & Drafting of customized Trust Deed",
            "Payment of State Stamp Duty based on Trust Corpus",
            "Appointment scheduling with the Sub-Registrar Office",
            "Physical/Biometric verification of Settlor & Trustees with 2 witnesses",
            "Handover of Registered Trust Deed & Government Certificate of Registration"
        ],
        popular: true,
        order: 1,
        isActive: true
    },
    {
        title: "Society Registration Certificate",
        slug: "society-registration",
        category: "NGO Registration",
        shortDescription: "Formation of a democratic social welfare organization under the Societies Registration Act XXI of 1860 with Governing Body.",
        fullDescription: "A Society is a member-governed organization formed by a group of at least 7 individuals committed to social, literary, educational, cultural, or scientific welfare. It functions through a democratic Governing Body governed by a Memorandum of Association (MOA) and Bylaws.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Registrar of Societies (State Government)",
        processingTime: "15 - 20 Working Days",
        fee: "Starting from ₹6,999",
        benefits: [
            "Elected management committee with democratic voting rights for all members",
            "Recognized legal status under Societies Act 1860 across all Indian states",
            "Eligible for State and Central Government developmental welfare schemes",
            "Separate legal entity capable of entering contracts and holding assets"
        ],
        documentsRequired: [
            "PAN Card & Aadhar Card of minimum 7 Founding Members",
            "Passport-size photos of President, Secretary, and Treasurer",
            "Address proof of Registered Office (Electricity bill / Rent deed with NOC)",
            "Draft Memorandum of Association (MOA) and Rules & Regulations (Bylaws)",
            "Affidavit & Consent letters from all governing council members"
        ],
        processSteps: [
            "Name availability check & reservation with Registrar of Societies",
            "Drafting of MOA, Aim & Objectives, and Bylaws Rules",
            "Documentation signing and submission to the District Registrar office",
            "Scrutiny and verification by government registrar officials",
            "Issuance of official Certificate of Registration under Societies Act 1860"
        ],
        popular: true,
        order: 2,
        isActive: true
    },
    {
        title: "Section 8 Company Registration",
        slug: "section-8-company",
        category: "NGO Registration",
        shortDescription: "Premier corporate NGO structure incorporated under Companies Act 2013 with MCA, granting the highest national & international prestige.",
        fullDescription: "A Section 8 Company is established for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, or protection of environment. It enjoys the credibility of a corporate entity while operating on zero-dividend non-profit principles.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Corporate Affairs (MCA), Govt of India",
        processingTime: "10 - 14 Working Days",
        fee: "Starting from ₹8,999 (Includes SPICe+ Filing)",
        benefits: [
            "Highest credibility among corporate CSR donors and international foundations",
            "Pan-India jurisdiction without requiring separate state approvals",
            "No minimum capital requirement and exemption from using 'Limited' in name",
            "Easier access to institutional loans, national tenders, and large grants"
        ],
        documentsRequired: [
            "Aadhar Card, PAN Card, and Voter ID/Passport of minimum 2 Directors",
            "Passport photographs & Bank Statements (with current address)",
            "Digital Signature Certificate (DSC) for all directors (Included)",
            "Registered office electricity bill + Rent agreement + Owner NOC",
            "Detailed non-profit vision, projected activities, and 3-year budget"
        ],
        processSteps: [
            "Director Digital Signature (DSC) issuance",
            "Name Approval through MCA RUN / SPICe+ Part A",
            "Filing Section 8 License application (Form INC-12) with Central Govt",
            "Filing SPICe+ Part B, AGILE-PRO, MOA & AOA with MCA",
            "Issuance of Certificate of Incorporation (COI), PAN, and TAN"
        ],
        popular: true,
        order: 3,
        isActive: true
    },
    {
        title: "12A & 12AB Income Tax Exemption",
        slug: "12a-12ab-registration",
        category: "NGO Registration",
        shortDescription: "Lifetime exemption on surplus donation income for NGOs under Section 12AB of the Income Tax Act with Form 10AC Certificate.",
        fullDescription: "Section 12AB registration exempts all surplus income, grants, and voluntary donations of an NGO from income tax liability. Without 12A/12AB, an NGO's surplus funds are taxed at commercial corporate rates (up to 30%+ surcharge).",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Income Tax Department, Ministry of Finance",
        processingTime: "10 - 15 Working Days",
        fee: "Starting from ₹4,999",
        benefits: [
            "100% Tax exemption on voluntary donations, corpus funds, and grants",
            "Accumulation of up to 15% income every year without any tax liability",
            "Mandatory prerequisite before applying for Section 80G tax benefit",
            "Eligible to receive institutional funding, CSR grants, and foreign aid"
        ],
        documentsRequired: [
            "NGO Registration Certificate (Trust Deed / Society Certificate / Section 8 COI)",
            "PAN Card of the NGO entity",
            "Audited balance sheets & ITRs for the past 3 years (or activity note for new NGOs)",
            "KYC (PAN & Aadhar) of all Trustees / Directors / Governing Body",
            "Detailed note on charitable activities carried out since inception"
        ],
        processSteps: [
            "Preparation of activity report, asset schedules, and accounts summary",
            "Online filing of Form 10A / Form 10AB on Income Tax e-filing portal",
            "Verification and digital signature validation by authorized signatory",
            "Response to Income Tax Commissioner queries / document scrutiny",
            "Issuance of Form 10AC Registration Order with Unique Registration Number (URN)"
        ],
        popular: true,
        order: 4,
        isActive: true
    },
    {
        title: "80G Tax Deduction Certificate",
        slug: "80g-registration",
        category: "NGO Registration",
        shortDescription: "Empower donors to claim 50% income tax deduction on their contributions, accelerating fundraising and individual donations.",
        fullDescription: "An 80G certificate is the most powerful fundraising incentive for non-profits. When an individual, business, or philanthropist donates to an 80G registered NGO, they receive an official receipt allowing them to deduct 50% of the donated amount from their taxable income.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Income Tax Department (Exemption Wing)",
        processingTime: "10 - 15 Working Days",
        fee: "Starting from ₹4,999 (Combo with 12A available)",
        benefits: [
            "Donors receive 50% direct tax deduction under Section 80G",
            "Dramatically increases willingness of corporates and individuals to donate",
            "Nationwide recognition on the official Income Tax portal for public trust",
            "Enables digital Form 10BD donation receipt issuance with instant 10BE tax slips"
        ],
        documentsRequired: [
            "Registered Trust Deed / Society Registration / Section 8 COI",
            "12A / 12AB Registration Order copy (or simultaneous application)",
            "NGO PAN Card & Registered address electricity bill",
            "Past 3 years activity report, bank statements, and audited financial statements",
            "List of Governing Council members with PAN & contact details"
        ],
        processSteps: [
            "Filing Form 10A / Form 10AB on the Income Tax Portal",
            "Submission of non-profit expenditure proofs and activity photos",
            "Scrutiny review by Principal Commissioner of Income Tax (Exemptions)",
            "Clarification response submission if any notice is issued",
            "Issuance of 80G Approval Order with 16-digit alphanumeric URN"
        ],
        popular: true,
        order: 5,
        isActive: true
    },
    {
        title: "NGO Darpan Registration (NITI Aayog)",
        slug: "ngo-darpan-registration",
        category: "NGO Registration",
        shortDescription: "Mandatory enrollment on the Central Government NITI Aayog portal to obtain unique Darpan ID for central ministry grants.",
        fullDescription: "NGO Darpan is a flagship initiative managed by NITI Aayog to create a unified database of non-government organizations across India. Having a verified NGO Darpan ID is legally mandatory before receiving any government department grant or CSR funding.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "NITI Aayog, Government of India",
        processingTime: "3 - 5 Working Days",
        fee: "Starting from ₹1,999",
        benefits: [
            "Generates a verified NITI Aayog Unique Registration ID (e.g. RJ/2026/0123456)",
            "Mandatory requirement for bidding on Government portal tenders and scheme grants",
            "Official public recognition on India's central civil society directory",
            "Seamless integration with Ministry of Corporate Affairs for CSR-1 approval"
        ],
        documentsRequired: [
            "Registration Certificate of the NGO (Trust, Society, or Section 8)",
            "PAN Card of the NGO",
            "PAN Card & Aadhar Card of all Trustees / Board Members",
            "Mobile number and Email ID linked with Aadhar for OTP verification",
            "Key operational sectors (e.g., Education, Healthcare, Women Empowerment, Rural Dev)"
        ],
        processSteps: [
            "Account creation on NITI Aayog NGO Darpan portal",
            "Profile setup with registration details, address, and committee members",
            "Aadhar-based mobile OTP authentication of 3 key governing members",
            "Uploading PAN card and Registration Certificate PDF",
            "Instant verification and issuance of NITI Aayog Darpan Certificate of Enrollment"
        ],
        popular: true,
        order: 6,
        isActive: true
    },
    {
        title: "CSR-1 Registration (Corporate Social Responsibility)",
        slug: "csr-1-registration",
        category: "NGO Registration",
        shortDescription: "Ministry of Corporate Affairs (MCA) registration enabling NGOs to receive corporate CSR funds from India's top companies.",
        fullDescription: "Under Section 135 of the Companies Act, large corporates must spend 2% of net profits on CSR. By law, corporates can ONLY disburse these funds to NGOs that possess a verified Form CSR-1 Registration Number from the Ministry of Corporate Affairs.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Corporate Affairs (MCA)",
        processingTime: "2 - 4 Working Days",
        fee: "Starting from ₹2,499",
        benefits: [
            "Unlocks access to India's ₹25,000+ Crore annual corporate CSR spending pool",
            "MCA-issued Unique CSR Registration Number (e.g. CSR00012345)",
            "Elevates NGO credibility with blue-chip corporates, banks, and PSUs",
            "Fast-track automated approval when backed by valid 12A and Darpan IDs"
        ],
        documentsRequired: [
            "NGO Registration Certificate (Trust / Society / Section 8)",
            "PAN Card of the NGO",
            "Copy of 12A / 12AB Registration Order",
            "NGO Darpan Unique ID from NITI Aayog",
            "Class-3 Digital Signature Certificate (DSC) of President/Director",
            "CA / CS / CMA certification on the e-form"
        ],
        processSteps: [
            "Verification of 12A and NITI Aayog Darpan credentials",
            "Preparation of Form CSR-1 on the MCA V3 Portal",
            "Professional certification by practicing Chartered Accountant or Company Secretary",
            "Digital Signature signing and online portal submission",
            "Instant MCA automated approval letter with official CSR Registration Number"
        ],
        popular: true,
        order: 7,
        isActive: true
    },
    {
        title: "FCRA Registration & Prior Permission",
        slug: "fcra-registration",
        category: "NGO Registration",
        shortDescription: "License under the Foreign Contribution Regulation Act granted by Ministry of Home Affairs to receive foreign grants and donations.",
        fullDescription: "The Foreign Contribution (Regulation) Act, 2010 mandates that any Indian non-profit seeking donations or grants from foreign citizens, international foundations, UN bodies, or global charities must hold FCRA registration or Prior Permission from the Ministry of Home Affairs (MHA).",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Home Affairs (MHA), Government of India",
        processingTime: "60 - 90 Working Days",
        fee: "Consult for Assessment & Filing",
        benefits: [
            "Legal authorization to receive international donations and foreign grants",
            "Empowers NGO to open dedicated FCRA Account with SBI Main Branch, New Delhi",
            "Unlocks collaboration with international philanthropic bodies like Gates Foundation, UNICEF, etc.",
            "Valid for 5 years with straightforward renewal"
        ],
        documentsRequired: [
            "Certified copies of Trust Deed / Society MOA / Section 8 COI",
            "Past 3 years audited financial statements and annual activity reports",
            "NGO PAN Card & 12A/80G Registration orders",
            "Affidavit in Form FC-1 from all Governing Board Members",
            "Documented proof of spending at least ₹15 Lakh on charitable objectives over past 3 years"
        ],
        processSteps: [
            "Comprehensive pre-filing compliance audit and activity proof collection",
            "Filing Form FC-3A online on the MHA FCRA portal",
            "Opening of zero-balance designated FCRA bank account with SBI New Delhi branch",
            "Intelligence and security verification by Home Ministry officials",
            "Issuance of 5-year FCRA Registration Certificate"
        ],
        popular: false,
        order: 8,
        isActive: true
    },

    // ----------------------------------------------------
    // COMPANY REGISTRATION SERVICES
    // ----------------------------------------------------
    {
        title: "Private Limited Company Registration",
        slug: "private-limited-company",
        category: "Company Registration",
        shortDescription: "Most popular legal structure for startups and growing businesses in India with limited liability, investor credibility and MCA incorporation.",
        fullDescription: "A Private Limited Company (Pvt Ltd) is India's most popular business structure for startups, tech firms, and expanding enterprises. It offers limited liability protection, a separate legal identity, effortless equity funding from angel investors & VCs, and 100% foreign direct investment (FDI) via automatic route.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Corporate Affairs (MCA), Govt of India",
        processingTime: "5 - 7 Working Days",
        fee: "Starting from ₹6,499 (All Govt Fees Included for 2 Directors)",
        benefits: [
            "Shields directors' personal assets with complete limited liability protection",
            "Preferred structure for venture capital (VC) funding and angel investments",
            "Perpetual succession — company continues to exist independently of share transfers",
            "Includes PAN, TAN, GSTIN, Bank Account, EPFO, ESIC, and MCA Incorporation in 1 filing"
        ],
        documentsRequired: [
            "PAN Card & Aadhar Card of minimum 2 Directors",
            "Passport / Voter ID / Driving License (as identity proof)",
            "Latest Bank Statement (not older than 2 months with current address)",
            "Electricity Bill / Water Bill / Gas Bill of the Registered Office Address",
            "NOC (No Objection Certificate) from the property owner + Rent Agreement"
        ],
        processSteps: [
            "Digital Signature Certificate (DSC) processing for all directors",
            "Company name reservation through MCA RUN / SPICe+ Part A",
            "Drafting of customized e-MOA (Charter) and e-AOA (Articles)",
            "Submission of SPICe+ Part B, AGILE-PRO, and INC-9 declarations",
            "Issuance of official Certificate of Incorporation (COI), PAN, TAN, and DIN"
        ],
        popular: true,
        order: 9,
        isActive: true
    },
    {
        title: "Limited Liability Partnership (LLP) Registration",
        slug: "llp-registration",
        category: "Company Registration",
        shortDescription: "Combines flexibility of a traditional partnership with limited liability of a company. Low compliance, no statutory audit requirement below ₹40L.",
        fullDescription: "An LLP is ideal for professional service firms, consultants, and family businesses that want limited liability protection without the rigorous compliance burden of a private limited company. There is no mandatory audit requirement unless turnover exceeds ₹40 Lakh or capital exceeds ₹25 Lakh.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Corporate Affairs (MCA)",
        processingTime: "7 - 10 Working Days",
        fee: "Starting from ₹5,499",
        benefits: [
            "Partners are not personally liable for another partner's negligence or misconduct",
            "Zero minimum capital contribution requirement",
            "No requirement for compulsory statutory audit up to ₹40 Lakh turnover",
            "Much lower annual ROC compliance costs compared to private limited companies"
        ],
        documentsRequired: [
            "PAN Card & Aadhar Card of minimum 2 Designated Partners",
            "Proof of Residence: Latest Bank Statement / Electricity Bill / Telephone Bill",
            "Passport-size photographs of all designated partners",
            "Registered Office address proof (Electricity bill + Owner NOC + Rent deed)"
        ],
        processSteps: [
            "Class-3 Digital Signature Certificate (DSC) creation for partners",
            "Name reservation through MCA FiLLiP / RUN-LLP form",
            "Filing FiLLiP incorporation form with MCA registrar",
            "Issuance of Certificate of Incorporation with LLPIN, PAN, and TAN",
            "Drafting, stamp duty payment, and filing of official LLP Agreement (Form 3)"
        ],
        popular: true,
        order: 10,
        isActive: true
    },
    {
        title: "One Person Company (OPC) Registration",
        slug: "one-person-company",
        category: "Company Registration",
        shortDescription: "Enables solo entrepreneurs and single founders to build a 100% owned corporate entity with complete limited liability.",
        fullDescription: "Introduced under the Companies Act 2013, One Person Company (OPC) allows a single Indian citizen founder to incorporate a corporate entity with 100% shareholding, eliminating the legal requirement of having a co-founder or second partner.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of Corporate Affairs (MCA)",
        processingTime: "5 - 7 Working Days",
        fee: "Starting from ₹5,999",
        benefits: [
            "Solo ownership with 100% equity control in your hands",
            "Limited liability protection safeguarding personal savings and properties",
            "Exempted from mandatory Annual General Meetings (AGM)",
            "Effortless conversion to multi-shareholder Private Limited Company as you scale"
        ],
        documentsRequired: [
            "PAN Card & Aadhar Card of the Sole Founder & Nominee",
            "Voter ID / Passport / Driving License as identity proof",
            "Bank Statement of Founder & Nominee (under 2 months old)",
            "Nominee consent letter in Form INC-3",
            "Registered office electricity bill + NOC + Rent agreement"
        ],
        processSteps: [
            "DSC procurement for the sole director",
            "Name reservation through SPICe+ Part A",
            "Preparation of MOA, AOA, and Nominee INC-3 documents",
            "Filing SPICe+ Part B with MCA",
            "Issuance of Certificate of Incorporation, PAN, TAN, and DIN"
        ],
        popular: false,
        order: 11,
        isActive: true
    },
    {
        title: "GST Registration & GSTIN Certificate",
        slug: "gst-registration",
        category: "Company Registration",
        shortDescription: "Mandatory Goods and Services Tax 15-digit GSTIN identification number for businesses, e-commerce sellers and service providers.",
        fullDescription: "GST registration is legally mandatory for businesses exceeding turnover thresholds (₹40L for goods, ₹20L for services) and all inter-state suppliers or e-commerce marketplace sellers. It provides an official 15-digit GSTIN and enables input tax credit (ITC) claims.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Central Board of Indirect Taxes and Customs (CBIC)",
        processingTime: "3 - 5 Working Days",
        fee: "Starting from ₹1,499",
        benefits: [
            "Enables inter-state trade and selling on Amazon, Flipkart, Blinkit, and GeM",
            "Avail Input Tax Credit (ITC) on all business purchases and capital equipment",
            "High business trust among corporate vendors, distributors, and B2B clients",
            "Government GSTIN Certificate (Form GST REG-06) issued with zero renewal hassle"
        ],
        documentsRequired: [
            "PAN Card and Aadhar Card of Proprietor / Partners / Directors",
            "Passport-size photograph of authorized signatory",
            "Bank proof: Cancelled Cheque / Bank Passbook / Statement",
            "Business address proof: Electricity Bill / Property Tax Receipt",
            "Rent Agreement + Owner NOC (if rented premise)"
        ],
        processSteps: [
            "TRN generation on GST Common Portal using PAN, Email, and Mobile",
            "Detailed online application filing in Form GST REG-01",
            "Aadhar-based biometric/OTP authentication of authorized signatory",
            "Department verification & query response (if any clarification is sought)",
            "Instant issuance of 15-digit GSTIN & Form GST REG-06 Certificate"
        ],
        popular: true,
        order: 12,
        isActive: true
    },
    {
        title: "MSME / Udyam Registration",
        slug: "msme-udyam-registration",
        category: "Company Registration",
        shortDescription: "Official Ministry of Micro, Small and Medium Enterprises certification unlocking collateral-free bank loans and government subsidies.",
        fullDescription: "Udyam Registration is the official recognition provided by the Ministry of MSME, Government of India. It classifies your enterprise as Micro, Small, or Medium, unlocking government priority sector loans (CGTMSE), lower bank interest rates, and patent subsidies.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1520607164069-c5b0ab227652?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Ministry of MSME, Government of India",
        processingTime: "1 - 2 Working Days",
        fee: "Starting from ₹999",
        benefits: [
            "Eligible for collateral-free bank loans under Credit Guarantee Fund Scheme (CGTMSE)",
            "1% Interest rate subsidy on bank overdrafts and business credit facilities",
            "50% Government fee concession on Trademark, Patent, and Design registrations",
            "Protection against delayed payments with mandatory interest penalties under MSME Samadhaan"
        ],
        documentsRequired: [
            "Aadhar Card of the business owner / authorized director (linked with mobile)",
            "PAN Card of the business / proprietor",
            "Business bank account number and IFSC code",
            "Number of employees and approximate plant & machinery investment"
        ],
        processSteps: [
            "Verification of Aadhar and PAN on National Udyam Portal",
            "Entry of business activities, NIC manufacturing/service codes, and bank details",
            "Aadhar OTP authentication",
            "Instant issuance of government Udyam Registration Certificate with QR Code"
        ],
        popular: true,
        order: 13,
        isActive: true
    },
    {
        title: "Startup India DPIIT Recognition",
        slug: "startup-india-recognition",
        category: "Company Registration",
        shortDescription: "Premier government certificate for innovative startups granting 3-year income tax exemption (80-IAC) and angel tax relief.",
        fullDescription: "The Department for Promotion of Industry and Internal Trade (DPIIT) recognizes innovative companies under the Startup India scheme. Recognized startups enjoy complete tax holidays, fast-tracked patent examination, and direct entry into government procurement tenders.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "DPIIT, Ministry of Commerce & Industry",
        processingTime: "5 - 7 Working Days",
        fee: "Starting from ₹3,999",
        benefits: [
            "Eligible to apply for 3 consecutive years 100% Income Tax Exemption under Section 80-IAC",
            "Complete Angel Tax exemption on funds raised from domestic and international investors",
            "Exemption from prior turnover and experience criteria in Government GeM tenders",
            "80% Rebate on patent application fees and fast-tracked intellectual property grants"
        ],
        documentsRequired: [
            "Certificate of Incorporation (Pvt Ltd or LLP)",
            "PAN Card of the Company",
            "Brief pitch deck or note detailing the innovation, product uniqueness, and scalability",
            "Website URL or product demo link",
            "Director / Partner profiles and contact details"
        ],
        processSteps: [
            "Creation of Startup India profile and National Incubator link",
            "Drafting of product innovation narrative and economic impact thesis",
            "Filing DPIIT Recognition application form on the National Single Window System",
            "Review by Inter-Ministerial Board & DPIIT committee",
            "Issuance of Startup India Certificate of Recognition with unique DIPP number"
        ],
        popular: true,
        order: 14,
        isActive: true
    },
    {
        title: "Trademark Registration (™ & ®)",
        slug: "trademark-registration",
        category: "Company Registration",
        shortDescription: "Protect your brand name, logo, slogan and identity from competitors and counterfeiters across all 45 classes in India.",
        fullDescription: "A Trademark registration gives you exclusive nationwide ownership over your brand name, logo, or tagline. Once filed, you can instantly start using the ™ symbol, and upon government approval, you earn the prestigious registered ® mark, legally preventing unauthorized infringement.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Controller General of Patents, Designs and Trademarks (CGPDTM)",
        processingTime: "1 Day for ™ Filing | 6 - 8 Months for ® Certificate",
        fee: "Starting from ₹3,499 + Govt Fees",
        benefits: [
            "Exclusive legal monopoly over brand name and logo across all Indian states",
            "Start using the ™ symbol within 24 hours of filing Form TM-A",
            "Blocks copycats, Amazon counterfeiters, and unauthorized brand hijacking",
            "Valuable intangible corporate asset that can be franchised, licensed, or sold"
        ],
        documentsRequired: [
            "Brand Name, Wordmark, or Logo Artwork in high resolution",
            "PAN Card and Aadhar Card of Applicant / Director",
            "MSME / Udyam Certificate (to claim 50% discount on Government filing fees)",
            "Signed Power of Attorney (Form TM-48) authorizing our trademark attorney",
            "Date of first use in commerce (User Affidavit with invoice proof if already in use)"
        ],
        processSteps: [
            "Comprehensive Trademark Public Search to ensure zero conflicting brand marks",
            "Appropriate trademark class selection (Class 1 to 45)",
            "Drafting and online submission of Form TM-A with Registrar of Trademarks",
            "Immediate receipt generation allowing legal use of ™ symbol",
            "Tracking through Trademark Journal publication to issuance of ® Registration Certificate"
        ],
        popular: true,
        order: 15,
        isActive: true
    },
    {
        title: "Import Export Code (IEC) License",
        slug: "import-export-code",
        category: "Company Registration",
        shortDescription: "Directorate General of Foreign Trade (DGFT) 10-digit lifetime license required for cross-border international imports and exports.",
        fullDescription: "An Import Export Code (IEC) is a 10-digit identification number issued by the DGFT under the Ministry of Commerce. It is mandatory for any commercial entity importing goods into India or exporting digital services and physical products worldwide.",
        sampleCertificateImage: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
        },
        governmentBody: "Directorate General of Foreign Trade (DGFT)",
        processingTime: "1 - 2 Working Days",
        fee: "Starting from ₹1,999",
        benefits: [
            "Mandatory clearance at Indian Customs for foreign air and sea freight",
            "Lifetime validity with zero renewal fees (requires simple yearly annual validation)",
            "Enables smooth international wire transfer payment remittances via authorized banks",
            "Eligible to claim export incentive subsidies under Foreign Trade Policy schemes"
        ],
        documentsRequired: [
            "PAN Card of the Business Entity / Proprietor",
            "Aadhar Card & Passport-size photo of the business owner / director",
            "Cancelled Cheque of the active Business Bank Current Account",
            "Registered office electricity bill or property deed + Owner NOC"
        ],
        processSteps: [
            "Registration on the DGFT digital platform",
            "Online application filling on DGFT IEC module with Bank Validation",
            "Digital Signature (DSC) or Aadhar OTP authentication",
            "Instant automated verification and issuance of DGFT IEC e-Certificate"
        ],
        popular: false,
        order: 16,
        isActive: true
    }
];

const slugify = (text) => {
    return (text || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

const normalizePayload = (body) => {
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    if (!body.slug && body.title) {
        body.slug = slugify(body.title);
    } else if (body.slug) {
        body.slug = slugify(body.slug);
    }

    if (typeof body.sampleCertificateImage === "string") {
        body.sampleCertificateImage = {
            public_id: "",
            url: body.sampleCertificateImage.trim()
        };
    } else if (body.sampleCertificateImage && typeof body.sampleCertificateImage === "object") {
        body.sampleCertificateImage = {
            public_id: (body.sampleCertificateImage.public_id || "").trim(),
            url: (body.sampleCertificateImage.url || body.sampleCertificateImage.secure_url || "").trim()
        };
    }

    if (Array.isArray(body.benefits)) {
        body.benefits = body.benefits.map((b) => (typeof b === "string" ? b.trim() : "")).filter(Boolean);
    }
    if (Array.isArray(body.documentsRequired)) {
        body.documentsRequired = body.documentsRequired.map((d) => (typeof d === "string" ? d.trim() : "")).filter(Boolean);
    }
    if (Array.isArray(body.processSteps)) {
        body.processSteps = body.processSteps.map((p) => (typeof p === "string" ? p.trim() : "")).filter(Boolean);
    }
};

const ensureInitialSeed = async () => {
    try {
        const count = await RegistrationService.countDocuments();
        if (count === 0) {
            await RegistrationService.insertMany(defaultRegistrationServices);
        }
    } catch (err) {
        console.error("RegistrationService seeding error:", err.message);
    }
};

// Public Read All (Active only, with category and search filter)
exports.getAll = async (req, res) => {
    try {
        await ensureInitialSeed();
        const { category, search } = req.query;
        const filter = { isActive: true };

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { title: regex },
                { shortDescription: regex },
                { fullDescription: regex },
                { governmentBody: regex },
                { benefits: regex },
                { documentsRequired: regex }
            ];
        }

        const items = await RegistrationService.find(filter).sort({ order: 1, createdAt: 1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read All (Includes inactive)
exports.getAllAdmin = async (req, res) => {
    try {
        await ensureInitialSeed();
        const items = await RegistrationService.find().sort({ order: 1, createdAt: 1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Public Read One by Slug
exports.getBySlug = async (req, res) => {
    try {
        await ensureInitialSeed();
        const item = await RegistrationService.findOne({ slug: req.params.slug });
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration service not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read One by ID
exports.getOne = async (req, res) => {
    try {
        const item = await RegistrationService.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration service not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Create
exports.create = async (req, res) => {
    try {
        normalizePayload(req.body);

        if (!req.body.title || !req.body.title.trim()) {
            return res.status(400).json({ success: false, message: "Service title is required" });
        }
        if (!req.body.shortDescription || !req.body.shortDescription.trim()) {
            return res.status(400).json({ success: false, message: "Short description is required" });
        }

        let finalSlug = req.body.slug || slugify(req.body.title);
        let existing = await RegistrationService.findOne({ slug: finalSlug });
        if (existing) {
            finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
        }
        req.body.slug = finalSlug;

        const item = await RegistrationService.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Update
exports.update = async (req, res) => {
    try {
        normalizePayload(req.body);
        const item = await RegistrationService.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration service not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Delete
exports.delete = async (req, res) => {
    try {
        const item = await RegistrationService.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration service not found" });
        }
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Seed Defaults
exports.seedDefaults = async (req, res) => {
    try {
        await RegistrationService.deleteMany({});
        const items = await RegistrationService.insertMany(defaultRegistrationServices);
        res.status(200).json({
            success: true,
            message: "Seeded all NGO & Company registration services",
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

