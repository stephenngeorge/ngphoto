import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');

  const validateForm = () => {
    if (
      name.length > 0 &&
      emailAddress.length > 0 &&
      message.length > 0
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  useEffect(() => {
    validateForm();
  }, [name, emailAddress, message]);

  const resetForm = () => {
    setName('');
    setEmailAddress('');
    setMessage('');
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('ng_photography', 'template_sq5g11f', e.target, 'user_rzaXBokHim2lKG3uVtjrm')
      .then(result => {
        setLoading(false);
        console.log(result);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });

    resetForm();
  }

  return (
    <form className="form--contact-form" onSubmit={handleSubmit}>
      <div className="form--contact-form__form-field">
        <label htmlFor="name">Your name:</label>
        <input
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required={true}
        />
      </div>

      <div className="form--contact-form__form-field">
        <label htmlFor="email">Your email address:</label>
        <input
          name="email"
          id="email"
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)}
          required={true}
        />
      </div>

      <div className="form--contact-form__form-field">
        <label htmlFor="message">Your message:</label>
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required={true}
        ></textarea>
      </div>
      
      {
        !loading &&
        <input type="submit" value="Send your message" disabled={!validForm} />
      }
    </form>
  )
}

export default ContactForm;