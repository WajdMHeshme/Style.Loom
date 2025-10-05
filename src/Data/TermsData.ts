export type Subsection = { title: string; content: string | string[] };
export type Section = {
  id: string;
  title: string;
  content: string | string[];
  subsections?: Subsection[];
};

export const contactInfo = {
  company: "Style.loom",
  email: "support@styleloom.com",
  phone: "+1 (416) 555-0123",
  address: "123 Fashion Ave, Toronto, ON, Canada",
};

export const termsData: Section[] = [
  {
    id: "intro",
    title: "Introduction",
    content:
      "These Terms of Use govern your access to and use of the Style.loom website and services. By using or accessing our services you agree to be bound by these terms. If you do not agree, please do not use the service.",
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "We may update these Terms from time to time. Significant changes will be communicated via the website or by email.",
      "Your continued use of the Service after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and Security",
    content:
      "Some features require creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
    subsections: [
      {
        title: "User Obligations",
        content: [
          "Provide accurate, current and complete information when creating an account.",
          "Keep passwords secure and do not share account access with others.",
          "Notify us immediately if you suspect unauthorized use of your account.",
        ],
      },
    ],
  },
  {
    id: "purchases",
    title: "Purchases and Payment",
    content: [
      "All purchases are subject to product availability and acceptance of your payment.",
      "We or our third-party payment providers may collect and process payment information in accordance with their terms.",
    ],
    subsections: [
      {
        title: "Billing & Receipts",
        content: "Receipts and order confirmations will be available in your account and may be sent to the email address on file.",
      },
    ],
  },
  {
    id: "shipping_returns",
    title: "Shipping & Returns",
    content:
      "Shipping options, delivery times and return policies vary by product and shipping destination. Please review our Shipping & Returns page for full details before placing an order.",
    subsections: [
      {
        title: "Returns & Exchanges",
        content: [
          "Items eligible for return must be unused, in original condition, and returned within the specified return window.",
          "Return shipping fees may apply unless stated otherwise or required by law.",
        ],
      },
    ],
  },
  {
    id: "intellectual_property",
    title: "Intellectual Property",
    content:
      "All content on the Site, including text, images, designs, logos and code, is protected by copyright and other intellectual property laws and is owned by Style.loom or its licensors. You may not reproduce or redistribute our content without prior written permission.",
  },
  {
    id: "user_content",
    title: "User Content",
    content:
      "If you post or submit content (such as reviews, comments or photos), you represent that you own or have the right to use that content and grant Style.loom a license to use it. We may remove content that violates these Terms.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, Style.loom and its affiliates shall not be liable for indirect, incidental, consequential, or punitive damages arising from your use of the Site.",
  },
  {
    id: "privacy",
    title: "Privacy",
    content:
      "Our Privacy Policy explains how we collect, use, and share information. By using the Site, you agree to the practices described in the Privacy Policy.",
  },
  {
    id: "governing_law",
    title: "Governing Law & Dispute Resolution",
    content:
      "These Terms are governed by the laws applicable in the jurisdiction where Style.loom operates. Any disputes will be resolved in the competent courts of that jurisdiction unless otherwise required by law.",
  },
  {
    id: "changes",
    title: "Changes to the Service",
    content:
      "We reserve the right to modify or discontinue the Site or any part of it at any time. We will try to notify users of material changes through the Site or via email.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have any questions about these Terms, please contact our support team:",
      `Email: ${contactInfo.email}`,
      `Phone: ${contactInfo.phone}`,
      `Address: ${contactInfo.address}`,
    ],
  },
];

// PrivacyData.ts
export const privacyData = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "This Privacy Policy explains how Style.loom collects, uses, discloses, and protects your personal information when you use our Service.",
  },
  {
    id: "info-collected",
    title: "Information We Collect",
    content: [
      "Information you provide: name, email, username, profile information, and any content you upload.",
      "Automatically collected information: device type, IP address, browser type, cookies, and usage data.",
      "Third-party data: information from social networks or payment providers when you connect accounts or use third-party services.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      "To provide, maintain, and improve our Service.",
      "To communicate with you, send updates, and respond to requests.",
      "To personalize your experience and show relevant content or recommendations.",
      "For security, fraud prevention, and to comply with legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to collect information about how you use the Service.",
      "You can control cookies through your browser settings; disabling cookies may affect functionality.",
    ],
    subsections: [
      {
        title: "Types of Cookies",
        content: [
          "Essential cookies: necessary for basic site functions.",
          "Performance cookies: used to understand and improve how the site is used.",
          "Advertising cookies: used to deliver relevant ads and measure ad performance.",
        ],
      },
    ],
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    content: [
      "We may share data with service providers who perform services on our behalf (e.g., hosting, analytics, payment processing).",
      "Third-party integrations (like social logins) are subject to those providers' privacy policies.",
    ],
  },
  {
    id: "security",
    title: "Security",
    content:
      "We implement reasonable organizational and technical measures to protect personal data. However, no method of transmission or storage is completely secure.",
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content:
      "We retain personal data only as long as necessary to provide our Service and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.",
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      "Access: You can request a copy of your personal data.",
      "Correction: You can request correction of inaccurate information.",
      "Deletion: You can request deletion of your data, unless legally required to retain it.",
      "Objection: You can object to certain types of processing, such as direct marketing.",
    ],
  },
  {
    id: "children",
    title: "Children’s Privacy",
    content:
      "Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Significant changes will be communicated by updating the 'Last Updated' date or providing a notice.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at support@styleloom.com.",
  },
];

