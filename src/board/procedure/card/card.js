import React from 'react';

export default ({ info }) => (
  <div class="card m-1">
    <div class="card-body">
      <h5 class="card-title">{info.dest}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{info.pos} {info.date}</h6>
      <p class="card-text">{info.contact.recruiter} / {info.contact.phone} / {info.contact.email}</p>
      <a href="#" class="card-link">{info.resume}</a>
      <a href="#" class="card-link">原投递链接</a>
    </div>
  </div>
);
