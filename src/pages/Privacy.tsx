import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { privacyData, contactInfo } from "../Data/TermsData";
import { MdOutlinePrivacyTip } from "react-icons/md";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((p, i) => (
        <p
          key={i}
          className="leading-relaxed mb-4 text-base"
          style={{ color: "var(--color-gray80)" }}
        >
          {p}
        </p>
      ));
    }
    return (
      <p className="leading-relaxed mb-4 text-base" style={{ color: "var(--color-gray80)" }}>
        {content}
      </p>
    );
  };

  const renderSubsections = (sub: { title: string; content: string | string[] }[]) =>
    sub.map((s, idx) => (
      <div key={idx} className="mb-6">
        <h3
          className="text-lg font-semibold mb-3"
          style={{
            color: "var(--color-gray95)",
            borderLeft: "4px solid var(--color-brown60)",
            paddingLeft: "0.9rem",
          }}
        >
          {s.title}
        </h3>
        {renderContent(s.content)}
      </div>
    ));

  return (
    <div
      style={{ background: "var(--color-black06)", color: "var(--color-gray95)" }}
      className="min-h-screen py-32"
    >
      {/* Header */}
      <div className="w-full border-b" style={{ borderColor: "var(--color-black20)" }}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div
              className="mx-auto w-16 h-16 rounded-full mb-2 flex items-center justify-center bg-black20 border-2  border-brown60">
              <MdOutlinePrivacyTip size={40} color="#ae9b84" />
            </div>

            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-gray99)", fontFamily: "Roboto, sans-serif" }}
            >
              Privacy Policy — Style.loom
            </h1>

            <div
              className="w-24 h-1 mx-auto mb-4 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--color-brown60), var(--color-brown70))" }}
            />

            <p className="text-base" style={{ color: "var(--color-gray80)" }}>
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "var(--color-black12)",
            border: "1px solid var(--color-black20)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="space-y-10">
            {(privacyData || []).map((section: any) => (
              <section key={section.id}>
                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(174,155,132,0.08)" }}
                  >
                    <span className="text-sm font-semibold" style={{ color: "var(--color-brown60)" }}>
                      {(privacyData || []).indexOf(section) + 1}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-gray99)" }}>
                      {section.title}
                    </h2>

                    {renderContent(section.content)}
                    {section.subsections && renderSubsections(section.subsections)}

                    {section.id === "cookies" && (
                      <div
                        className="mt-4 p-4 rounded-lg"
                        style={{ background: "var(--color-black15)", border: "1px solid var(--color-black20)" }}
                      >
                        <p style={{ color: "var(--color-gray80)" }}>
                          We use cookies and similar tracking technologies to improve your experience. You can manage
                          cookie settings in your browser.
                        </p>
                      </div>
                    )}

                    {section.id === "third-parties" && (
                      <div className="mt-4 p-4 rounded-lg" style={{ background: "var(--color-black15)", border: "1px solid var(--color-black20)" }}>
                        <p style={{ color: "var(--color-gray80)" }}>
                          For details about our Terms of Use, please see the{" "}
                          <Link to="/terms" style={{ color: "var(--color-brown60)", textDecoration: "underline", fontWeight: 500 }}>
                            Terms of Use
                          </Link>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}

            {/* Contact */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "linear-gradient(135deg, var(--color-black15), var(--color-black12))",
                border: "1px solid var(--color-black20)",
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-black20">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "var(--color-brown60)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--color-gray99)" }}>
                  Contact Information
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold" style={{ color: "var(--color-gray99)" }}>
                    {contactInfo.company}
                  </p>
                  <p style={{ color: "var(--color-gray80)" }} className="mt-2">
                    {contactInfo.email}
                  </p>
                  <p style={{ color: "var(--color-gray80)" }}>{contactInfo.phone}</p>
                </div>
                <div>
                  <p style={{ color: "var(--color-gray80)" }}>{contactInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="text-center pt-6 border-t" style={{ borderColor: "var(--color-black20)" }}>
              <Link
                to="/terms"
                className="inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow"
                style={{
                  background: "linear-gradient(90deg,var(--color-brown60),var(--color-brown65))",
                  color: "var(--color-gray97)",
                }}
              >
                Back to Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
