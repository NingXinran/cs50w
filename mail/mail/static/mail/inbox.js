document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send email
  document.querySelector('#compose-button').addEventListener('click', (event) => send_email(event));

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Fetch the mail
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(function(mail) {
      const element = document.createElement('div');
      element.className = "mx-2 my-2 py-2 px-4 row"
      element.style.border = "thin solid #000000";
      element.style.cursor = "pointer";
      element.addEventListener('click', () => show_email(mail, mailbox));
      // Color by 'read' status
      if (mail.read) {
        element.style.backgroundColor = "lightgrey"
      }
      // Create sender
      const sender = document.createElement('div');
      sender.className = "col-3";
      sender.innerText = mail.sender;
      sender.style.fontWeight = "700";
      element.append(sender);
      // Create subject
      const subject = document.createElement('div');
      subject.className = "col-5";
      subject.innerText = mail.subject;
      element.append(subject);
      // Create timestamp
      const timestamp = document.createElement('div');
      timestamp.className = "col-4";
      timestamp.innerText = mail.timestamp;
      timestamp.style.color = "grey";
      timestamp.style.textAlign = "right";
      element.append(timestamp);

      document.querySelector('#emails-view').append(element);
    })
  });
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function send_email(event) {
  event.preventDefault();

  recipients = document.querySelector('#compose-recipients').value;
  subject = document.querySelector('#compose-subject').value;
  body = document.querySelector('#compose-body').value;

  // POST the email
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
  });

  load_mailbox('sent');
}

function show_email(mail, mailbox) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'block';

  // Update mail as read
  fetch(`/emails/${mail.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })

  // Show mail details
  const div = document.querySelector('#single-email-view');
  div.className = "mx-4 p-2"
  div.innerHTML = "";  // Clear the div
  // Create sender
  const sender = document.createElement('h3');
  sender.className = "";
  sender.innerText = `From: ${mail.sender}`;
  sender.style.fontWeight = "700";
  div.append(sender);
  // Create subject
  const subject = document.createElement('h5');
  subject.className = "";
  subject.innerText = `Subject: ${mail.subject}`;
  div.append(subject);
  // Create reply button
  const reply = document.createElement('button');
  reply.innerText = "Reply";
  reply.className = "btn btn-primary mp-2 px-4";
  reply.addEventListener('click', () => reply_email(mail));
  div.append(reply);
  // Create body
  const body = document.createElement('div');
  body.className = "p-2 my-4";
  body.style.minHeight = "500px";
  body.style.border = "thin solid #000000";
  body.innerText = mail.body;
  div.append(body);
  // Create timestamp
  const timestamp = document.createElement('div');
  timestamp.className = "my-2";
  timestamp.innerText = `Sent ${mail.timestamp}`;
  timestamp.style.color = "grey";
  timestamp.style.textAlign = "right"
  div.append(timestamp);
  // Create archive/unarchive button
  if (mailbox !== 'sent') {
    const archive = document.createElement('div');
    const button = document.createElement('button');
    button.id = "archive-button"
    if (!mail.archived) {
      button.innerText = "Archive";
      button.className = "btn btn-success float-right";
      button.addEventListener('click', () => archive_email(mail.id));
    } else {
      button.innerText = "Unarchive";
      button.className = "btn btn-secondary float-right";
      button.addEventListener('click', () => unarchive_email(mail.id));
    } 
    archive.append(button);
    div.append(archive);
  }

}

function archive_email(mail_id) {
  // Update archive attribute
  fetch(`/emails/${mail_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: true
    })
  });
  location.reload();  // reload brings to index page, prevents loading inbox twice
}

function unarchive_email(mail_id) {
  // Update archive attribute
  fetch(`/emails/${mail_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: false
    })
  })
  location.reload();
}

function reply_email(mail) {
  console.log('replying email');
  compose_email();
  document.querySelector('#compose-recipients').value = mail.sender;
  document.querySelector('#compose-subject').value = `Re: ${mail.subject}`;
  document.querySelector('#compose-body').value = `On ${mail.timestamp} ${mail.sender} wrote:\n${mail.body}`;
}