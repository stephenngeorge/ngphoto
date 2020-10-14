import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';

import Modal from '../Modal';
// import '../_forms.scss';

const ContactForm = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [modalStatus, setModalStatus] = useState('info');
  const [modalTitle, setModalTitle] = useState('');

  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');

  
  useEffect(() => {
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
    validateForm();
  }, [name, emailAddress, message]);

  const resetForm = () => {
    setName('');
    setEmailAddress('');
    setMessage('');
  }
  
  const closeModal = () => {
    setModalTitle('');
    setModalMessage('');
    setModalStatus(null);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('ng_photography', 'template_sq5g11f', e.target, 'user_rzaXBokHim2lKG3uVtjrm')
      .then(result => {
        setLoading(false);
        setModalMessage('Your message has been sent! Neil will get back to you soon.');
        setModalStatus('success');
        setModalTitle('Thanks for getting in touch,');
        resetForm();
        console.log(result);
      })
      .catch(err => {
        setLoading(false);
        setModalMessage('Sorry, we couldn\'t send your message. Please try again, or contact Neil with one of the social icons below.' )
        setModalTitle('Oh no!');
        setModalStatus('error');
        console.log(err);
      });
  }

  return (
    <form className="form--contact-form text-container--very-narrow" onSubmit={handleSubmit}>
      {
        modalMessage.length > 0 &&
        <Modal
          handleClose={closeModal}
          message={modalMessage}
          status={modalStatus}
          title={modalTitle}
        />
      }

      <div className="form--contact-form__form-field">
        <input
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required={true}
        />
        <label htmlFor="name">Your name:</label>
      </div>

      <div className="form--contact-form__form-field">
        <input
          name="email"
          id="email"
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)}
          required={true}
        />
        <label htmlFor="email">Your email address:</label>
      </div>

      <div className="form--contact-form__form-field">
        <textarea
          name="message"
          id="message"
          value={message}
          data-message={message}
          rows={7}
          onChange={e => setMessage(e.target.value)}
          required={true}
        ></textarea>
        <label htmlFor="message">Your message:</label>
      </div>
      
      {
        !loading &&
        <input type="submit" value="Send your message" disabled={!validForm} />
      }
    </form>
  )
}

export default ContactForm;