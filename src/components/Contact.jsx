import React, { useCallback, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { OWNER } from "../data/portfolio";
import { EMAILJS_CONFIG, isEmailjsConfigured } from "../config/emailjs"; // Make sure this path is correct
import "./Contact.css";

const STATUS_LABEL = {
  idle:    "Send message",
  sending: "Sending",
  sent:    "Sent — talk soon",
  error:   "Try again",
};

// Normalizes whatever shape EmailJS (or a network failure) throws
// into a single readable string. EmailJS errors can arrive as
// { status, text }, a plain Error, or a bare string depending on
// the failure point, so every shape is checked explicitly.
function extractErrorMessage(err) {
  if (!err) return "Something went wrong. Please try again.";
  if (typeof err === "string") return err;
  if (err.text) return err.text;
  if (err.message) return err.message;
  return "Something went wrong. Please try again, or email me directly.";
}

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize EmailJS with your public key
  React.useEffect(() => {
    if (isEmailjsConfigured) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Fail fast and visibly if credentials were never filled in
    if (!isEmailjsConfigured) {
      setStatus("error");
      setErrorMsg(
        "Email isn't set up yet — add your EmailJS keys to .env and restart the dev server."
      );
      return;
    }

    setStatus("sending");

    try {
      // The correct way to use sendForm with v3+
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current
      );
      
      console.log("Email sent successfully:", result);
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setErrorMsg(extractErrorMessage(err));
      setStatus("error");
    }
  }, []);

  const isDisabled = status === "sending" || status === "sent";

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="hairline" />

        <div className="contact__grid">
          <div className="contact__intro">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-heading" className="contact__heading">
              Have a project in mind?
            </h2>
            <p className="contact__paragraph">
              Tell me what you&rsquo;re building. I read every message and
              reply within a day or two.
            </p>

            <div className="contact__direct">
              <a href={`mailto:${OWNER.email}`} className="contact__email">
                {OWNER.email}
              </a>
              <span className="contact__phone">{OWNER.phone}</span>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="contact__form" noValidate>
            <div className="contact__field">
              <label htmlFor="from_name">Name</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                aria-required="true"
                disabled={isDisabled}
                autoComplete="name"
              />
            </div>

            <div className="contact__field">
              <label htmlFor="from_email">Email</label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                aria-required="true"
                disabled={isDisabled}
                autoComplete="email"
              />
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                disabled={isDisabled}
              />
            </div>

            {status === "error" && errorMsg && (
              <p className="contact__alert contact__alert--error" role="alert" aria-live="assertive">
                {errorMsg}
              </p>
            )}
            {status === "sent" && (
              <p className="contact__alert contact__alert--success" role="status" aria-live="polite">
                Message received — I&rsquo;ll get back to you soon.
              </p>
            )}

            <button
              type="submit"
              className={`contact__submit${status === "sent" ? " is-sent" : ""}${status === "error" ? " is-error" : ""}`}
              disabled={isDisabled}
              aria-busy={status === "sending"}
            >
              {status === "sending" && <span className="contact__spinner" aria-hidden="true" />}
              <span>{STATUS_LABEL[status]}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);