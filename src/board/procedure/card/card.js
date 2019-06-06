import React from 'react';

export default ({info}) => {
	function dragStart(e) {
		e.dataTransfer.setData('text/plain', e.target.id);
	}

	return (
		<div className="card m-1" draggable="true" onDragStart={dragStart} id={info.id}>
			<div className="card-body">
				<h5 className="card-title">{info.dest}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{info.pos} {info.date}</h6>
				<p className="card-text">{info.contact.recruiter} / {info.contact.phone} / {info.contact.email}</p>
				<button className="btn btn-outline-primary">简历</button>
				<a href={info.submittedUrl} className="card-link ml-2">投递网站</a>
			</div>
		</div>
	);
}
