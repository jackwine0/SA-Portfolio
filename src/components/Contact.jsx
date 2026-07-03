import React, { useCallback, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { OWNER } from "../data/portfolio";
import { EMAILJS_CONFIG, isEmailjsConfigured } from "../config/emailjs";
import "./Contact.css";

const STATUS_LABEL = {
  idle:    "Send message",
  sending: "Sending",
  sent:    "Sent — talk soon",
  error:   "Try again",
};

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
  
  // Track individual field errors
  const [fieldErrors, setFieldErrors] = useState({
    from_name: "",
    from_email: "",
    message: ""
  });

  // Initialize EmailJS with your public key
  React.useEffect(() => {
    if (isEmailjsConfigured) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  // Clears a field's error message as soon as the user starts correcting it
  const handleInputChange = useCallback((e) => {
    const { name } = e.target;
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [fieldErrors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    // 1. Reset and Validate Fields Individual Boxes
    const errors = { from_name: "", from_email: "", message: "" };
    let hasErrors = false;

    const form = formRef.current;
    
    // Check Name
    if (!form.from_name.value.trim()) {
      errors.from_name = "Please enter your name.";
      hasErrors = true;
    }
    
    // Check Email
    if (!form.from_email.value.trim()) {
      errors.from_email = "Please enter your email address.";
      hasErrors = true;
    } else if (!form.from_email.checkValidity()) {
      errors.from_email = "Please enter a valid email address (e.g., name@example.com).";
      hasErrors = true;
    }
    
    // Check Message
    if (!form.message.value.trim()) {
      errors.message = "Please enter a message.";
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(errors);
      return;
    }

    // 2. Fail fast if backend credentials are missing
    if (!isEmailjsConfigured) {
      setStatus("error");
      setErrorMsg(
        "Email isn't set up yet — add your EmailJS keys to .env and restart the dev server."
      );
      return;
    }

    setStatus("sending");

    try {
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form
      );
      
      console.log("Email sent successfully:", result);
      setStatus("sent");
      form.reset();
      setFieldErrors({ from_name: "", from_email: "", message: "" });
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
            
            {/* NAME FIELD */}
            <div className={`contact__field${fieldErrors.from_name ? " has-error" : ""}`}>
              <label htmlFor="from_name">Name</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                aria-required="true"
                aria-describedby={fieldErrors.from_name ? "from_name_error" : undefined}
                disabled={isDisabled}
                autoComplete="name"
                onChange={handleInputChange}
              />
              {fieldErrors.from_name && (
                <p id="from_name_error" className="contact__field-error" role="alert">
                  {fieldErrors.from_name}
                </p>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className={`contact__field${fieldErrors.from_email ? " has-error" : ""}`}>
              <label htmlFor="from_email">Email</label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                aria-required="true"
                aria-describedby={fieldErrors.from_email ? "from_email_error" : undefined}
                disabled={isDisabled}
                autoComplete="email"
                onChange={handleInputChange}
              />
              {fieldErrors.from_email && (
                <p id="from_email_error" className="contact__field-error" role="alert">
                  {fieldErrors.from_email}
                </p>
              )}
            </div>

            {/* MESSAGE FIELD */}
            <div className={`contact__field${fieldErrors.message ? " has-error" : ""}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-describedby={fieldErrors.message ? "message_error" : undefined}
                disabled={isDisabled}
                onChange={handleInputChange}
              />
              {fieldErrors.message && (
                <p id="message_error" className="contact__field-error" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* GENERAL FORM STATUS ALERTS */}
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